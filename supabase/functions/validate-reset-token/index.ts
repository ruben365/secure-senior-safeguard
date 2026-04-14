import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// Phase 13 — server-side reset token validation.
//
// Before this function existed, ResetPassword.tsx queried the
// `password_reset_tokens` table DIRECTLY from the browser. That is unsafe
// because:
//   1. It depends entirely on RLS being set up perfectly to prevent enumeration
//      of valid tokens (a brute-force attacker could iterate token values).
//   2. The client could see schema details (timestamps, used flag, email)
//      that should never leak.
//   3. There was no rate limiting on token guessing.
//
// This edge function moves the validation server-side, with strict per-IP
// rate limiting and a generic response shape (never reveals whether the
// token was unknown vs expired vs already used).
// ============================================================================

const ALLOWED_ORIGINS = new Set([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
  "https://www.invisionnetwork.com",
  "https://invisionnetwork.com",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
]);
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : CANONICAL_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allowed,
    Vary: "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(
  req: Request,
  status: number,
  payload: unknown,
  extra: Record<string, string> = {},
) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeadersFor(req),
      "Content-Type": "application/json",
      ...extra,
    },
  });
}

// Per-IP rate limit (10 token validations per minute) — protects against
// brute-force iteration of token values. With 32-byte (64 hex char) tokens
// the search space is ~1.16 × 10^77, but we still rate-limit defensively.
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
let lastGc = Date.now();

function gcRateLimit() {
  const now = Date.now();
  if (now - lastGc < 5 * 60 * 1000) return;
  for (const [k, v] of rateLimitMap) {
    if (now > v.resetTime) rateLimitMap.delete(k);
  }
  lastGc = now;
}

function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  gcRateLimit();
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    };
  }
  record.count++;
  return { allowed: true };
}

// Tokens are 32-byte crypto.getRandomValues, hex-encoded → 64 chars
const TOKEN_RE = /^[a-f0-9]{64}$/i;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeadersFor(req) });
  }

  if (req.method !== "POST") {
    return json(req, 405, { error: "Method not allowed" });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return json(
      req,
      429,
      { error: "Too many requests. Please try again shortly." },
      { "Retry-After": String(rateCheck.retryAfter) },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[validate-reset-token] missing env vars");
      return json(req, 500, { error: "Server configuration error" });
    }

    let body: { token?: unknown };
    try {
      body = await req.json();
    } catch {
      return json(req, 400, { error: "Invalid request body" });
    }

    const token =
      typeof body.token === "string" ? body.token.trim() : "";

    // Reject malformed tokens BEFORE touching the database
    if (!TOKEN_RE.test(token)) {
      return json(req, 400, { valid: false });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // .maybeSingle so a missing token doesn't throw
    const { data, error } = await supabase
      .from("password_reset_tokens")
      .select("expires_at, used")
      .eq("token", token)
      .maybeSingle();

    if (error) {
      console.error("[validate-reset-token] DB error");
      return json(req, 500, { error: "Server error" });
    }

    // Generic response — never reveal "unknown" vs "expired" vs "used".
    // From the attacker's perspective every invalid case looks identical.
    if (!data) {
      return json(req, 200, { valid: false });
    }
    if (data.used === true) {
      return json(req, 200, { valid: false });
    }
    if (new Date(data.expires_at as string) < new Date()) {
      return json(req, 200, { valid: false });
    }

    return json(req, 200, { valid: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[validate-reset-token] fatal:", msg);
    return json(req, 500, { error: "Server error" });
  }
});

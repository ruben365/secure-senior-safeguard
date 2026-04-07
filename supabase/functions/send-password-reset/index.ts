import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// Phase 13 hardening:
//   1. Origin allow-list CORS (no more wildcard *)
//   2. Method check (POST only — non-POST returns 405)
//   3. GC for in-memory rate limit map
//   4. Generic 500 errors (already mostly done — kept "Server error" string)
//   5. Continued: hard-pinned canonical origin for the reset URL (no spoof)
//   6. Continued: per-IP rate limit 3/min
//   7. Continued: domain restriction to @invisionnetwork.org
// ============================================================================

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ALLOWED_ORIGINS = new Set([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
  "https://www.invisionnetwork.com",
  "https://invisionnetwork.com",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
]);

// Reset URL is HARD-PINNED to the canonical origin. The previous (pre-Phase
// 11) version trusted req.headers.get("origin"), which an attacker could
// spoof to make the reset link point at a phishing clone of the site.
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

// ============================================================================
// Per-IP rate limit (3 / min) — password reset is high-impact, kept strict.
// GC every 5 minutes to prevent unbounded growth on a long-running instance.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 1000;
let lastGc = Date.now();

function gcRateLimit() {
  const now = Date.now();
  if (now - lastGc < 5 * 60 * 1000) return;
  for (const [k, v] of rateLimitMap) {
    if (now > v.resetTime) rateLimitMap.delete(k);
  }
  lastGc = now;
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  gcRateLimit();
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeadersFor(req) });
  }

  if (req.method !== "POST") {
    return json(req, 405, { error: "Method not allowed" });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return json(
      req,
      429,
      {
        error:
          "Too many password reset requests. Please wait before trying again.",
      },
      { "Retry-After": String(rateCheck.retryAfter) },
    );
  }

  try {
    let body: { email?: unknown };
    try {
      body = await req.json();
    } catch {
      return json(req, 400, { error: "Invalid request body" });
    }

    const email = body.email;

    // Validate input shape
    if (typeof email !== "string") {
      return json(req, 400, { error: "Invalid email" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return json(req, 400, { error: "Invalid email format" });
    }

    // Domain restriction: only InVision Network staff get password reset
    if (!normalizedEmail.endsWith("@invisionnetwork.org")) {
      return json(req, 403, {
        error:
          "Password reset is only available for InVision Network email addresses",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Invalidate any existing unused tokens for this email so an attacker
    // who triggered an earlier reset can't reuse a stale token in parallel.
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("email", normalizedEmail)
      .eq("used", false);

    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const { error: insertError } = await supabase
      .from("password_reset_tokens")
      .insert({
        email: normalizedEmail,
        token,
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (insertError) {
      console.error("[send-password-reset] insert error");
      return json(req, 500, { error: "Server error" });
    }

    // CRITICAL: hard-pinned origin, NOT req.headers.get("origin")
    const resetUrl = `${CANONICAL_ORIGIN}/reset-password?token=${token}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "Password Reset - InVision Network",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #1a1a2e;">Reset Your Password</h1><p>Click the link below to reset your InVision Network password:</p><p><a href="${resetUrl}" style="display: inline-block; background: #4a90d9; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Reset Password</a></p><p style="color: #555; font-size: 14px;">This link expires in 1 hour.</p><p style="color: #999; font-size: 12px;">If you didn't request this reset, please ignore this email — your password will stay the same.</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      console.error("[send-password-reset] Resend error");
      return json(req, 500, { error: "Server error" });
    }

    return json(req, 200, { success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[send-password-reset] fatal:", msg);
    // Generic 500 — never leak error.message internals
    return json(req, 500, { error: "An error occurred. Please try again." });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// Phase 13 hardening:
//   1. Origin allow-list CORS (no more wildcard *)
//   2. Method check (POST only — non-POST returns 405)
//   3. GC for in-memory rate limit map
//   4. Generic 500 errors (no error.message leakage to caller)
//   5. .maybeSingle / typed errors throughout
//
// Continued from earlier hardening:
//   - JWT auth required (Bearer token)
//   - Caller must have admin role (has_role RPC)
//   - Per-admin rate limit 5/5min
//   - Min 12-char password
//   - Audit log to auth_audit_logs
// ============================================================================

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

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

// In-memory rate limiter — max 5 password resets per 5 minutes per admin.
// GC every 5 minutes to bound memory.
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase's built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 5 * 60 * 1000;
let lastGc = Date.now();

function gcRateLimit() {
  const now = Date.now();
  if (now - lastGc < 5 * 60 * 1000) return;
  for (const [k, v] of rateLimitMap) {
    if (now > v.resetTime) rateLimitMap.delete(k);
  }
  lastGc = now;
}

function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  gcRateLimit();
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW_MS });
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

  try {
    // ========================================================================
    // 1. AUTHENTICATION — require a valid JWT
    // ========================================================================
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json(req, 401, { error: "Authorization header required" });
    }

    const token = authHeader.replace("Bearer ", "");

    // Use anon key client to validate the user's JWT
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const {
      data: { user: caller },
      error: authError,
    } = await supabaseUser.auth.getUser(token);

    if (authError || !caller) {
      return json(req, 401, { error: "Invalid or expired token" });
    }

    // ========================================================================
    // 2. AUTHORIZATION — caller must have the 'admin' role
    // ========================================================================
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc(
      "has_role",
      { user_id: caller.id, role: "admin" },
    );

    if (roleError) {
      console.error("[admin-reset-password] role check failed");
      return json(req, 500, { error: "Server error" });
    }

    if (!isAdmin) {
      console.warn(
        `[admin-reset-password] FORBIDDEN attempt by ${caller.id}`,
      );
      return json(req, 403, { error: "Forbidden — admin role required" });
    }

    // ========================================================================
    // 3. RATE LIMITING — protect against runaway abuse
    // ========================================================================
    const rateKey = `admin-reset:${caller.id}`;
    const rateCheck = checkRateLimit(rateKey);
    if (!rateCheck.allowed) {
      return json(
        req,
        429,
        {
          error: "Too many password resets. Please slow down.",
          retryAfter: rateCheck.retryAfter,
        },
        { "Retry-After": String(rateCheck.retryAfter) },
      );
    }

    // ========================================================================
    // 4. INPUT VALIDATION
    // ========================================================================
    let body: { email?: unknown; newPassword?: unknown };
    try {
      body = await req.json();
    } catch {
      return json(req, 400, { error: "Invalid request body" });
    }

    const email = body.email;
    const newPassword = body.newPassword;

    if (typeof email !== "string" || typeof newPassword !== "string") {
      return json(req, 400, { error: "Email and newPassword are required" });
    }

    if (newPassword.length < 12) {
      return json(req, 400, {
        error: "Password must be at least 12 characters",
      });
    }
    if (newPassword.length > 128) {
      return json(req, 400, { error: "Password too long" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return json(req, 400, { error: "Invalid email format" });
    }

    // ========================================================================
    // 5. FIND TARGET USER
    //
    // NOTE: listUsers is O(N) on the user count. For InVision Network's
    // expected volume (<10k accounts) this is acceptable. If user count
    // grows, switch to a server-side RPC that does a SELECT by email.
    // ========================================================================
    const { data: userData, error: listError } =
      await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (listError) {
      console.error("[admin-reset-password] listUsers error");
      return json(req, 500, { error: "Server error" });
    }

    const targetUser = userData.users.find(
      (u) => u.email?.toLowerCase() === normalizedEmail,
    );

    if (!targetUser) {
      return json(req, 404, { error: "User not found" });
    }

    // ========================================================================
    // 6. UPDATE PASSWORD
    // ========================================================================
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        password: newPassword,
      });

    if (updateError) {
      console.error("[admin-reset-password] update error");
      return json(req, 500, { error: "Failed to update password" });
    }

    // ========================================================================
    // 7. AUDIT LOG — record who reset whose password (non-blocking)
    // ========================================================================
    try {
      await supabaseAdmin.from("auth_audit_logs").insert({
        user_id: caller.id,
        event_type: "admin_password_reset",
        success: true,
        ip_address:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
        metadata: {
          target_user_id: targetUser.id,
          target_email: targetUser.email,
          performed_by_email: caller.email,
        },
      });
    } catch (auditErr) {
      console.error("[admin-reset-password] audit log write failed:", auditErr);
    }

    console.log(
      `[admin-reset-password] ${caller.id} reset password for ${targetUser.id}`,
    );

    return json(req, 200, {
      success: true,
      message: "Password updated successfully",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[admin-reset-password] fatal:", msg);
    // Generic 500 — never leak error.message internals
    return json(req, 500, { error: "Server error" });
  }
});

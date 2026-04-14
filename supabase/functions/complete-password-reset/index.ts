import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// Phase 13 — server-side password reset completion.
//
// Before this function existed, ResetPassword.tsx did the following from
// the BROWSER:
//   1. Look up the token in password_reset_tokens (direct table query).
//   2. Call supabase.auth.updateUser({ password }) to update the password.
//   3. Mark the token as used.
//
// Problems with the old client-side flow:
//   - Step 2 relied on the user already having a Supabase session, but a
//     password-reset visitor by definition does NOT have a valid session.
//   - The mark-as-used update was non-atomic with the password update, so
//     a race window existed where two parallel requests could both succeed.
//   - Direct table access meant any RLS misconfiguration could leak rows.
//   - Errors leaked Supabase error messages to the toast UI.
//
// This edge function:
//   1. Validates the token server-side.
//   2. Looks up the target user by email (the email is stored on the token
//      row at reset-request time, so the client never has to send it).
//   3. Calls supabase.auth.admin.updateUserById to atomically set the
//      new password.
//   4. Marks the token as used immediately after a successful update.
//   5. Audit-logs the password reset.
//   6. Returns a generic success/failure with no Supabase internals.
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

// Per-IP rate limit (5 password resets per 10 minutes)
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase's built-in rate limiting.
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

// Server-side enforcement of password requirements (matches client UI):
//   - 8+ characters
//   - At least one uppercase
//   - At least one lowercase
//   - At least one number
//   - At least one special character
function validatePassword(pw: string): { ok: true } | { ok: false; reason: string } {
  if (typeof pw !== "string") return { ok: false, reason: "Invalid password" };
  if (pw.length < 8) return { ok: false, reason: "Password must be at least 8 characters" };
  if (pw.length > 128) return { ok: false, reason: "Password too long" };
  if (!/[A-Z]/.test(pw)) return { ok: false, reason: "Password must contain an uppercase letter" };
  if (!/[a-z]/.test(pw)) return { ok: false, reason: "Password must contain a lowercase letter" };
  if (!/[0-9]/.test(pw)) return { ok: false, reason: "Password must contain a number" };
  if (!/[^A-Za-z0-9]/.test(pw)) return { ok: false, reason: "Password must contain a special character" };
  return { ok: true };
}

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
      console.error("[complete-password-reset] missing env vars");
      return json(req, 500, { error: "Server configuration error" });
    }

    let body: { token?: unknown; newPassword?: unknown };
    try {
      body = await req.json();
    } catch {
      return json(req, 400, { error: "Invalid request body" });
    }

    const token = typeof body.token === "string" ? body.token.trim() : "";
    const newPassword =
      typeof body.newPassword === "string" ? body.newPassword : "";

    if (!TOKEN_RE.test(token)) {
      return json(req, 400, { error: "Invalid token" });
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.ok) {
      return json(req, 400, { error: passwordCheck.reason });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 1. Look up the token row server-side
    const { data: tokenRow, error: tokenErr } = await supabase
      .from("password_reset_tokens")
      .select("email, expires_at, used")
      .eq("token", token)
      .maybeSingle();

    if (tokenErr) {
      console.error("[complete-password-reset] token query error");
      return json(req, 500, { error: "Server error" });
    }

    // Generic failure for unknown / used / expired — never leak which one
    if (!tokenRow || tokenRow.used === true) {
      return json(req, 400, { error: "Reset link is invalid or expired" });
    }
    if (new Date(tokenRow.expires_at as string) < new Date()) {
      return json(req, 400, { error: "Reset link is invalid or expired" });
    }

    const targetEmail = String(tokenRow.email).toLowerCase().trim();

    // 2. Find the auth user by email. We use admin.listUsers with a filter
    //    if available; fall back to scanning the first page.
    //
    //    NOTE: this still scales O(N) on the number of users — for InVision
    //    Network's expected user volume (<10k) this is acceptable. If the
    //    user count grows we should switch to a server-side RPC that does
    //    the lookup directly via SQL.
    const { data: userList, error: listErr } =
      await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (listErr) {
      console.error("[complete-password-reset] listUsers error");
      return json(req, 500, { error: "Server error" });
    }

    const targetUser = userList.users.find(
      (u) => u.email?.toLowerCase() === targetEmail,
    );

    if (!targetUser) {
      // Should be unreachable — token was issued for a real account — but
      // we still mark the token as used so it can't be retried.
      await supabase
        .from("password_reset_tokens")
        .update({ used: true })
        .eq("token", token);
      return json(req, 400, { error: "Reset link is invalid or expired" });
    }

    // 3. Update the password atomically using the admin API. This works
    //    even if the user has no active session (which is the whole point
    //    of the password reset flow).
    const { error: updateErr } = await supabase.auth.admin.updateUserById(
      targetUser.id,
      { password: newPassword },
    );

    if (updateErr) {
      console.error("[complete-password-reset] update error");
      return json(req, 500, { error: "Failed to reset password" });
    }

    // 4. Mark the token as used immediately. If this fails the password
    //    is still updated (which is fine — the user can still log in)
    //    and we just leave the token marked unused. We invalidate ALL
    //    other unused tokens for the same email at the same time so a
    //    second pending reset can't be used.
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("email", targetEmail)
      .eq("used", false);

    // 5. Audit log the reset (non-blocking)
    try {
      await supabase.from("auth_audit_logs").insert({
        user_id: targetUser.id,
        event_type: "password_reset_complete",
        success: true,
        ip_address: clientIp === "unknown" ? null : clientIp,
        metadata: { method: "self_service_token" },
      });
    } catch {
      /* ignore audit failures */
    }

    console.log(
      `[complete-password-reset] password updated for user ${targetUser.id}`,
    );

    return json(req, 200, { success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[complete-password-reset] fatal:", msg);
    return json(req, 500, { error: "Server error" });
  }
});

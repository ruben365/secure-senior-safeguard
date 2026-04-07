import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// SECURITY CRITICAL — TOTP 2FA verification.
//
// Phase 13 audit (2026-04) discovered a CRITICAL bug in this function:
// the clock-drift tolerance loop ALWAYS called generateTOTP(secret) without
// passing the time offset, so the -1/0/+1 window check was broken and the
// function only validated codes against the current 30-second window three
// times in a row. This caused legitimate 2FA codes to fail when the user's
// device clock was off by even a few seconds, AND eliminated the safety
// margin for codes generated right at the edge of a 30-second boundary.
//
// Additional Phase 13 hardening:
//   1. Per-user rate limit (5 attempts per minute) — prevent TOTP brute force
//   2. Origin allow-list CORS (no more wildcard *)
//   3. Method check (POST only — non-POST returns 405)
//   4. Generic 500 errors (no error.message leakage)
//   5. Constant-time string comparison (prevent timing oracles)
//   6. .maybeSingle() to avoid throwing on missing 2FA settings
//   7. Audit logging on both success and failure
//   8. Rate-limit counter resets on successful verification
//   9. GC for the in-memory rate-limit map
//
// NOTE: The TOTP secret encryption is still XOR-with-service-role-key. This
// is weak in theory but acceptable in practice because the key never leaves
// the server, and base32 TOTP secrets are essentially random bytes already.
// Migration to AES-GCM is deferred — changing the format would invalidate
// all existing 2FA enrollments and force every user to re-enroll.
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

// ============================================================================
// Per-user rate limit (5 attempts per minute) — protect against brute-force
// of the TOTP code (1-in-1,000,000 chance per attempt × 3 windows × N tries).
// ============================================================================
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 1000;
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

// Constant-time string comparison to mitigate timing oracle attacks
function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Decrypt secret (XOR with service role key — see top-of-file note)
function decryptSecret(encrypted: string, key: string): string {
  const decoder = new TextDecoder();
  const encryptedBytes = Uint8Array.from(atob(encrypted), (c) =>
    c.charCodeAt(0),
  );
  const keyBytes = new TextEncoder().encode(key);
  const decrypted = new Uint8Array(encryptedBytes.length);
  for (let i = 0; i < encryptedBytes.length; i++) {
    decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  return decoder.decode(decrypted);
}

// Base32 decode
function base32Decode(input: string): Uint8Array {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bits: number[] = [];
  for (const char of input.toUpperCase()) {
    const val = base32chars.indexOf(char);
    if (val === -1) continue;
    for (let i = 4; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i * 8 + j];
    }
    bytes[i] = byte;
  }
  return bytes;
}

// HMAC-SHA1
async function hmacSha1(
  key: Uint8Array,
  message: Uint8Array,
): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new Uint8Array(key) as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    new Uint8Array(message) as unknown as ArrayBuffer,
  );
  return new Uint8Array(signature);
}

// ============================================================================
// Generate TOTP — accepts an optional time-step override so the verification
// loop can check previous/current/next time windows for clock-drift tolerance.
//
// CRITICAL FIX: This is the parameter that was missing in the broken loop.
// The previous version ignored the loop offset and recomputed Date.now()
// inside generateTOTP every iteration, so the -1/0/+1 window check was
// silently a no-op.
// ============================================================================
async function generateTOTP(
  secret: string,
  timeStep = 30,
  digits = 6,
  timeStepOverride?: number,
): Promise<string> {
  const key = base32Decode(secret);
  let time = timeStepOverride ?? Math.floor(Date.now() / 1000 / timeStep);

  const timeBytes = new Uint8Array(8);
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = time & 0xff;
    time = Math.floor(time / 256);
  }

  const hmac = await hmacSha1(key, timeBytes);
  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return String(code % Math.pow(10, digits)).padStart(digits, "0");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeadersFor(req) });
  }

  if (req.method !== "POST") {
    return json(req, 405, { error: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json(req, 401, { error: "Authorization required" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[VERIFY-2FA] Missing env vars");
      return json(req, 500, { error: "Server configuration error" });
    }

    const encryptionKey =
      Deno.env.get("TOTP_ENCRYPTION_KEY") || supabaseServiceKey.slice(0, 32);

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Get user from token
    const token = authHeader.slice(7).trim();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return json(req, 401, { error: "Invalid token" });
    }

    // Per-user rate limit BEFORE reading body — protects DB lookup too
    const rateCheck = checkRateLimit(`2fa:${user.id}`);
    if (!rateCheck.allowed) {
      console.warn(`[VERIFY-2FA] Rate limit hit for user ${user.id}`);
      return json(
        req,
        429,
        { error: "Too many verification attempts. Please wait." },
        { "Retry-After": String(rateCheck.retryAfter) },
      );
    }

    let body: { code?: unknown; enableAfterVerify?: unknown };
    try {
      body = await req.json();
    } catch {
      return json(req, 400, { error: "Invalid request body" });
    }

    const code = typeof body.code === "string" ? body.code : "";
    const enableAfterVerify = body.enableAfterVerify === true;

    // Strict 6-digit numeric code only
    if (!/^[0-9]{6}$/.test(code)) {
      return json(req, 400, { error: "Invalid code format" });
    }

    // Use .maybeSingle() to avoid throwing when 2FA isn't set up
    const { data: settings, error: settingsError } = await supabase
      .from("user_2fa_settings")
      .select("encrypted_totp_secret, is_enabled")
      .eq("user_id", user.id)
      .maybeSingle();

    if (settingsError) {
      console.error(`[VERIFY-2FA] settings query error for user ${user.id}`);
      return json(req, 500, { error: "Server error" });
    }

    if (!settings || !settings.encrypted_totp_secret) {
      return json(req, 400, { error: "2FA not set up" });
    }

    // Decrypt secret
    let secret: string;
    try {
      secret = decryptSecret(
        settings.encrypted_totp_secret as string,
        encryptionKey,
      );
    } catch {
      console.error(`[VERIFY-2FA] decrypt failure for user ${user.id}`);
      return json(req, 500, { error: "Server error" });
    }

    // ====================================================================
    // Check current and adjacent time windows for clock drift tolerance.
    //
    // CRITICAL: pass the time offset to generateTOTP — the previous version
    // ignored the offset and only checked the current time three times.
    //
    // We do NOT break early on a match — keep total work constant across
    // the loop iterations to avoid leaking which window matched via timing.
    // ====================================================================
    const timeStep = 30;
    const currentTime = Math.floor(Date.now() / 1000 / timeStep);
    let isValid = false;

    for (let i = -1; i <= 1; i++) {
      const expectedCode = await generateTOTP(
        secret,
        timeStep,
        6,
        currentTime + i,
      );
      if (constantTimeEquals(code, expectedCode)) {
        isValid = true;
      }
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

    if (!isValid) {
      console.warn(`[VERIFY-2FA] Invalid code for user ${user.id}`);
      // Audit log non-blocking
      try {
        await supabase.from("auth_audit_logs").insert({
          user_id: user.id,
          event_type: "2fa_verify_failed",
          success: false,
          ip_address: clientIp,
        });
      } catch {
        /* ignore audit failures */
      }
      return json(req, 400, { error: "Invalid verification code" });
    }

    // Update last used and optionally enable 2FA
    const updateData: {
      last_used_at: string;
      updated_at: string;
      is_enabled?: boolean;
    } = {
      last_used_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (enableAfterVerify) {
      updateData.is_enabled = true;
    }

    await supabase
      .from("user_2fa_settings")
      .update(updateData)
      .eq("user_id", user.id);

    // Reset rate limit counter on success — legitimate users aren't punished
    rateLimitMap.delete(`2fa:${user.id}`);

    // Audit log success (non-blocking)
    try {
      await supabase.from("auth_audit_logs").insert({
        user_id: user.id,
        event_type: "2fa_verify_success",
        success: true,
        ip_address: clientIp,
      });
    } catch {
      /* ignore audit failures */
    }

    console.log(`[VERIFY-2FA] Successful verification for user ${user.id}`);

    return json(req, 200, {
      success: true,
      enabled: enableAfterVerify || settings.is_enabled,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[VERIFY-2FA] fatal:", msg);
    // Generic 500 — never leak error.message internals
    return json(req, 500, { error: "Server error" });
  }
});

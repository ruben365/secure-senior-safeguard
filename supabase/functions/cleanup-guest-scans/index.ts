import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// SECURITY CRITICAL — internal cron-style cleanup processor.
//
// Before this hardening, the function had ZERO authentication. Any internet
// user could poll it to:
//   1. Force-flush expired guest_scans rows + storage objects on demand.
//   2. Burn Supabase storage delete API quota.
//   3. Race-trigger deletes during the (rare) brief window when a scan that
//      JUST expired was about to be re-fetched by a polling client, causing
//      flaky UX.
//
// Same lockdown pattern as send-automated-email / schedule-campaign-emails:
//   1. config.toml verify_jwt = true.
//   2. In-function constant-time check that the bearer token equals the
//      service role key (rejects anon key + authed user JWTs).
//   3. Per-IP rate limit defense in depth.
//
// Legitimate caller: scheduled cron task with the service role key in the
// Authorization header.
// ============================================================================

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60 * 1000;
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase's built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
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

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  let mismatch = 0;
  for (let i = 0; i < aBytes.length; i++) {
    mismatch |= aBytes[i] ^ bBytes[i];
  }
  return mismatch === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(rateCheck.retryAfter),
      },
    });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[cleanup-guest-scans] missing server configuration");
    return new Response(
      JSON.stringify({ error: "Server configuration missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Auth check: bearer token MUST equal the service role key. We do not
  // accept anon key (shipped in frontend bundles) or authed user JWTs.
  // This endpoint is internal-only.
  const authHeader = req.headers.get("Authorization") || "";
  const presentedToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (
    !presentedToken ||
    !constantTimeEqual(presentedToken, SUPABASE_SERVICE_ROLE_KEY)
  ) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    const now = new Date().toISOString();

    // Cap the batch size so a giant backlog can't blow the function timeout
    // and so a single invocation can't accidentally nuke unbounded rows.
    const { data: expiredScans, error } = await supabase
      .from("guest_scans")
      .select("id, file_path")
      .lt("expires_at", now)
      .is("deleted_at", null)
      .limit(500);

    if (error) throw error;

    const ids = expiredScans?.map((scan) => scan.id) || [];
    const filePaths =
      expiredScans?.map((scan) => scan.file_path).filter(Boolean) || [];

    if (filePaths.length) {
      const { error: removeError } = await supabase.storage
        .from("guest-scans")
        .remove(filePaths);
      if (removeError) {
        console.error(
          "[cleanup-guest-scans] storage remove error:",
          removeError.message,
        );
      }
    }

    if (ids.length) {
      const { error: deleteError } = await supabase
        .from("guest_scans")
        .delete()
        .in("id", ids);
      if (deleteError) throw deleteError;
    }

    console.log(
      `[cleanup-guest-scans] deleted ${ids.length} rows, ${filePaths.length} files`,
    );

    return new Response(
      JSON.stringify({ deleted: ids.length, filesRemoved: filePaths.length }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cleanup failed.";
    console.error("[cleanup-guest-scans] fatal:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface HeartbeatRequest {
  service_name: string;
  status?: "healthy" | "struggling" | "dead";
  error_log?: string;
}

// ============================================================================
// Per-IP rate limit (60 / min). Heartbeats are expected to land at most
// every minute per service, and there are only a handful of services. 60/min
// per IP comfortably absorbs cron jitter while blocking abuse.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60 * 1000;

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

// ============================================================================
// Hard caps on every customer-controlled field. Without caps, an attacker
// could spam huge service_name strings and explode the heartbeat table.
// ============================================================================
const MAX_SERVICE_NAME_LEN = 64;
const MAX_ERROR_LOG_LEN = 2000;
const ALLOWED_STATUS = new Set(["healthy", "struggling", "dead"]);
const SERVICE_NAME_RE = /^[a-zA-Z0-9_]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter),
        },
      },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const body = (await req.json().catch(() => null)) as
      | HeartbeatRequest
      | null;
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // ====================================================================
    // service_name: type check + length cap + format allow-list. Anything
    // outside [A-Za-z0-9_]+ is rejected outright (not silently scrubbed)
    // so callers know they sent something wrong.
    // ====================================================================
    if (typeof body.service_name !== "string") {
      return new Response(
        JSON.stringify({
          error: "service_name is required and must be a string",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const serviceName = body.service_name.trim();
    if (serviceName.length === 0 || serviceName.length > MAX_SERVICE_NAME_LEN) {
      return new Response(
        JSON.stringify({
          error: `service_name must be 1..${MAX_SERVICE_NAME_LEN} chars`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!SERVICE_NAME_RE.test(serviceName)) {
      return new Response(
        JSON.stringify({
          error:
            "service_name can only contain alphanumeric characters and underscores",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // status: optional, defaulted, allow-list checked
    const status = body.status || "healthy";
    if (!ALLOWED_STATUS.has(status)) {
      return new Response(
        JSON.stringify({
          error: "status must be one of: healthy, struggling, dead",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // error_log: optional, type-checked, length-capped
    let safeErrorLog: string | null = null;
    if (body.error_log !== undefined && body.error_log !== null) {
      if (typeof body.error_log !== "string") {
        return new Response(
          JSON.stringify({ error: "error_log must be a string" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      safeErrorLog = body.error_log.slice(0, MAX_ERROR_LOG_LEN);
    }

    // Update heartbeat using the security definer function
    const { error } = await supabase.rpc("update_service_heartbeat", {
      p_service_name: serviceName,
      p_status: status,
      p_error_log: safeErrorLog,
    });

    if (error) {
      console.error("Heartbeat update error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to update heartbeat",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        service: serviceName,
        status,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Heartbeat error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

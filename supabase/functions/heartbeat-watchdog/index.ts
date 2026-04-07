import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Constant-time string comparison. Used for comparing the bearer token
// against the service role key — `===` would short-circuit at the first
// mismatching byte and leak length / prefix information to a network
// timing observer.
// ============================================================================
function constantTimeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// ============================================================================
// Per-IP rate limit (10 / min). Even with auth, the watchdog issues queries
// against system_heartbeats and may send admin alert emails — that's a real
// cost and a moderate cap is appropriate.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
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

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
    const watchdogSecret = Deno.env.get("HEARTBEAT_WATCHDOG_SECRET");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // ====================================================================
    // AUTH: This endpoint reads the full system_heartbeats table (which
    // contains internal service names + error logs) and can fire admin
    // alert emails. It must NOT be callable by unauthenticated traffic.
    //
    // Accept either:
    //   1. Authorization: Bearer <SERVICE_ROLE_KEY>  (Supabase cron / scripts)
    //   2. X-Watchdog-Secret: <HEARTBEAT_WATCHDOG_SECRET>  (external monitor)
    //
    // Both compared in constant time. Fails closed.
    // ====================================================================
    let authorized = false;

    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice("Bearer ".length).trim();
      if (serviceRoleKey && constantTimeEqual(token, serviceRoleKey)) {
        authorized = true;
      }
    }

    if (!authorized) {
      const provided = req.headers.get("x-watchdog-secret") ?? "";
      if (
        watchdogSecret && provided && constantTimeEqual(provided, watchdogSecret)
      ) {
        authorized = true;
      }
    }

    if (!authorized) {
      console.warn(
        `[heartbeat-watchdog] unauthorized call from ${clientIP}`,
      );
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check for stale heartbeats using the security definer function
    const { data: staleServices, error: checkError } = await supabase.rpc(
      "check_stale_heartbeats",
    );

    if (checkError) {
      console.error("Error checking heartbeats:", checkError);
      return new Response(
        JSON.stringify({
          error: "Failed to check heartbeats",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get all current heartbeat statuses
    const { data: allHeartbeats, error: fetchError } = await supabase
      .from("system_heartbeats")
      .select("*")
      .order("service_name");

    if (fetchError) {
      console.error("Error fetching heartbeats:", fetchError);
    }

    // Log any dead or struggling services
    const deadServices =
      allHeartbeats?.filter((h) => h.status === "dead") || [];
    const strugglingServices =
      allHeartbeats?.filter((h) => h.status === "struggling") || [];

    if (deadServices.length > 0) {
      console.error(
        "CRITICAL: Dead services detected:",
        deadServices.map((s) => s.service_name),
      );

      // Log to activity_log for audit trail
      await supabase.from("activity_log").insert({
        action: "SYSTEM_ALERT",
        entity_type: "system_heartbeats",
        details: {
          alert_type: "service_dead",
          services: deadServices.map((s) => ({
            name: s.service_name,
            last_heartbeat: s.last_heartbeat,
            error_log: s.error_log,
          })),
          timestamp: new Date().toISOString(),
        },
      });

      // Send email alert if Resend is configured. Every interpolated value
      // is HTML-escaped because service_name and error_log come from the
      // heartbeat callers and would otherwise be a stored-XSS vector in
      // the admin's email client.
      if (resendApiKey) {
        try {
          const alertHtml = `
            <h2>InVision Network - Critical Service Alert</h2>
            <p>The following services are unresponsive:</p>
            <ul>
              ${
            deadServices
              .map(
                (s) => `
                <li>
                  <strong>${escapeHtml(String(s.service_name ?? ""))}</strong><br/>
                  Last heartbeat: ${escapeHtml(String(s.last_heartbeat ?? ""))}<br/>
                  ${
                  s.error_log
                    ? `Error: ${escapeHtml(String(s.error_log))}`
                    : ""
                }
                </li>
              `,
              )
              .join("")
          }
            </ul>
            <p>Please investigate immediately.</p>
          `;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
              from: "InVision Network <alerts@invisionnetwork.org>",
              to: ["admin@invisionnetwork.org"],
              subject: "CRITICAL: InVision Service Down",
              html: alertHtml,
            }),
          });

          console.log("Alert email sent for dead services");
        } catch (emailError) {
          console.error("Failed to send alert email:", emailError);
        }
      }
    }

    if (strugglingServices.length > 0) {
      console.warn(
        "WARNING: Struggling services:",
        strugglingServices.map((s) => s.service_name),
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        summary: {
          total: allHeartbeats?.length || 0,
          healthy:
            allHeartbeats?.filter((h) => h.status === "healthy").length || 0,
          struggling: strugglingServices.length,
          dead: deadServices.length,
        },
        stale_updates: staleServices,
        all_services: allHeartbeats,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Watchdog error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

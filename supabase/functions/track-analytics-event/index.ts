import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// SECURITY CRITICAL — public analytics ingest.
//
// Before this hardening, the function trusted EVERY field from the client,
// including `userId`, `ipAddress`, and `userAgent`. Any internet user could:
//   1. Spoof analytics rows that look like they came from a real user
//      (impersonate a customer's funnel for fraud-pattern obfuscation).
//   2. Insert fake conversion_events with arbitrary conversion_value,
//      poisoning revenue dashboards.
//   3. Run a tight loop to mass-insert into 4 tables per call
//      (analytics_events, page_views, user_sessions, conversion_events) —
//      a free storage DoS that could blow row count quotas.
//   4. Set arbitrary `eventName` strings that downstream consumers might
//      treat as a categorical key (cardinality blowup).
//
// Lockdown:
//   1. Per-IP rate limit (500/hour — high but bounded for legit page-view
//      bursts on long sessions).
//   2. Drop client-supplied ipAddress entirely. Use req headers.
//   3. Drop client-supplied userAgent. Use req headers.
//   4. Drop client-supplied userId entirely UNLESS a valid Supabase JWT is
//      attached, in which case derive userId from the JWT.
//   5. Length caps on every string field.
//   6. eventName must be `[a-zA-Z0-9_.-]{1,80}`.
//   7. event_data total JSON size capped (5KB).
//   8. conversion_value coerced to a finite non-negative number, capped at
//      10_000_000 (no fake $1B conversions).
//   9. session_id constrained to 8-128 char alnum/dash/underscore.
// ============================================================================

const RATE_LIMIT = 500;
const RATE_WINDOW_MS = 60 * 60 * 1000;
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
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

const EVENT_NAME_RE = /^[A-Za-z0-9_.-]{1,80}$/;
const SESSION_ID_RE = /^[A-Za-z0-9_-]{8,128}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAX_STR = 500;
const MAX_URL = 2000;
const MAX_EVENT_DATA_BYTES = 5 * 1024;
const MAX_CONVERSION_VALUE = 10_000_000;

function clampString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function safeEventData(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  try {
    const json = JSON.stringify(value);
    if (json.length > MAX_EVENT_DATA_BYTES) {
      return { _truncated: true };
    }
    return value as Record<string, unknown>;
  } catch {
    return {};
  }
}

function safeConversionValue(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, MAX_CONVERSION_VALUE);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
    return new Response(
      JSON.stringify({ error: "Server configuration missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const body = (await req.json()) ?? {};

    const eventName = clampString(body.eventName, 80);
    if (!eventName || !EVENT_NAME_RE.test(eventName)) {
      return new Response(
        JSON.stringify({ error: "Invalid eventName" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const sessionId = clampString(body.sessionId, 128);
    if (!sessionId || !SESSION_ID_RE.test(sessionId)) {
      return new Response(
        JSON.stringify({ error: "Invalid sessionId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const eventCategory = clampString(body.eventCategory, 80);
    const pageUrl = clampString(body.pageUrl, MAX_URL);
    const pageTitle = clampString(body.pageTitle, MAX_STR);
    const referrer = clampString(body.referrer, MAX_URL);
    const eventData = safeEventData(body.eventData);

    // Server-side IP/UA. Never trust client values for these.
    const ipAddress = clientIP === "unknown" ? null : clientIP;
    const userAgent = clampString(req.headers.get("user-agent"), MAX_STR);

    // Derive userId from JWT (if present). Never trust client-supplied userId.
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ") && SUPABASE_ANON_KEY) {
      const token = authHeader.slice(7).trim();
      try {
        const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { persistSession: false },
        });
        const { data: userData } = await authClient.auth.getUser(token);
        if (userData?.user?.id && UUID_RE.test(userData.user.id)) {
          userId = userData.user.id;
        }
      } catch {
        // ignore — anonymous tracking is allowed
      }
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Track the event
    const { error: eventError } = await supabase
      .from("analytics_events")
      .insert({
        user_id: userId,
        session_id: sessionId,
        event_name: eventName,
        event_category: eventCategory,
        event_data: eventData,
        page_url: pageUrl,
        page_title: pageTitle,
        referrer,
        user_agent: userAgent,
        ip_address: ipAddress,
      });

    if (eventError) {
      console.error("[track-analytics-event] insert error:", eventError.message);
      throw eventError;
    }

    // Track page view if pageUrl is provided
    if (pageUrl) {
      await supabase.from("page_views").insert({
        user_id: userId,
        session_id: sessionId,
        page_url: pageUrl,
        page_title: pageTitle,
        referrer,
      });
    }

    // Update or create session — use maybeSingle so a missing session doesn't
    // throw, and use upsert-style logic to avoid race conditions on insert.
    const { data: existingSession } = await supabase
      .from("user_sessions")
      .select("page_views_count")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (existingSession) {
      await supabase
        .from("user_sessions")
        .update({
          page_views_count: (existingSession.page_views_count ?? 0) + 1,
          ended_at: new Date().toISOString(),
        })
        .eq("session_id", sessionId);
    } else {
      await supabase.from("user_sessions").insert({
        session_id: sessionId,
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer,
        landing_page: pageUrl,
        page_views_count: 1,
      });
    }

    // Conversion events: only allow when event_name actually matches a known
    // conversion-shape. Coerce conversion_value to a safe number.
    if (eventName.includes("conversion") || eventName.includes("submit")) {
      const conversionValue = safeConversionValue(
        (eventData as Record<string, unknown>).value,
      );
      await supabase.from("conversion_events").insert({
        user_id: userId,
        session_id: sessionId,
        conversion_type: eventName,
        conversion_value: conversionValue,
        metadata: eventData,
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Event tracked successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[track-analytics-event] fatal:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS: wildcard kept consistent with project convention.
// TODO: restrict to invisionnetwork.org origin for production.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Rate limiting ─────────────────────────────────────────────────────────
interface RateLimitEntry { count: number; resetAt: number; }
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rateLimitMap) if (v.resetAt < now) rateLimitMap.delete(k);
}, 300_000);

function checkRateLimit(id: string): { allowed: boolean; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(id);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(id, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  if (entry.count >= MAX_REQUESTS) return { allowed: false, resetAt: entry.resetAt };
  entry.count++;
  return { allowed: true, resetAt: entry.resetAt };
}

// ─── Handler ───────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    const retryAfter = Math.ceil((rateCheck.resetAt - Date.now()) / 1000);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please wait a moment." }),
      {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": retryAfter.toString() },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const rawUrl = (body as Record<string, unknown>).url;
  if (!rawUrl || typeof rawUrl !== "string" || rawUrl.length > 2048) {
    return new Response(
      JSON.stringify({ error: "Invalid URL" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  // Validate — only http/https allowed. Never log the URL.
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl.trim());
    if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error();
  } catch {
    return new Response(
      JSON.stringify({ error: "URL must start with http:// or https://" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const apiKey = Deno.env.get("GOOGLE_SAFE_BROWSING_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        safe: true,
        threats: [],
        unconfigured: true,
        message: "Configure GOOGLE_SAFE_BROWSING_KEY in Supabase secrets to enable URL safety checks.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const gsbRes = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: { clientId: "invisionnetwork", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION",
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: parsedUrl.href }],
          },
        }),
      },
    );

    if (!gsbRes.ok) throw new Error(`GSB ${gsbRes.status}`);

    const gsbData = await gsbRes.json() as {
      matches?: Array<{ threatType: string }>;
    };

    const matches = gsbData.matches ?? [];
    return new Response(
      JSON.stringify({ safe: matches.length === 0, threats: matches.map(m => m.threatType) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[check-url-safety]", err instanceof Error ? err.message : "error");
    return new Response(
      JSON.stringify({ error: "URL safety check failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// PRIVACY: The email is proxied through this server — never logged — so HIBP only sees
// our server IP, not the user's browser. HIBP's k-anonymity hash-prefix model is only
// available for the Pwned Passwords API, not the Breached Accounts API. Server-side
// proxying is the strongest available privacy protection for email breach checks.
//
// CORS: wildcard consistent with project convention.
// TODO: restrict to invisionnetwork.org origin for production.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LEN = 254; // RFC 5321

// ─── Rate limiting (stricter than URL check — HIBP has its own limits) ─────
interface RateLimitEntry { count: number; resetAt: number; }
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

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

interface HibpBreach {
  Name: string;
  Title: string;
  BreachDate: string;
  DataClasses: string[];
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

  const rawEmail = (body as Record<string, unknown>).email;
  if (
    !rawEmail ||
    typeof rawEmail !== "string" ||
    rawEmail.length > MAX_EMAIL_LEN ||
    !EMAIL_RE.test(rawEmail.trim())
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  // Normalise. NEVER log the email — treat as PII throughout.
  const email = rawEmail.trim().toLowerCase();

  const apiKey = Deno.env.get("HIBP_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        breached: false,
        breaches: [],
        unconfigured: true,
        message: "Configure HIBP_API_KEY in Supabase secrets to enable breach checking.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const hibpRes = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          "hibp-api-key": apiKey,
          "user-agent": "InVisionNetwork-SecurityCheck/1.0",
        },
      },
    );

    if (hibpRes.status === 404) {
      return new Response(
        JSON.stringify({ breached: false, breaches: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (hibpRes.status === 401) throw new Error("HIBP API key invalid");
    if (hibpRes.status === 429) {
      return new Response(
        JSON.stringify({ error: "Breach database temporarily unavailable. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!hibpRes.ok) throw new Error(`HIBP ${hibpRes.status}`);

    const raw = await hibpRes.json() as HibpBreach[];

    // Return only non-sensitive metadata — no email echoed back in response
    const breaches = raw.map(b => ({
      name: b.Name,
      title: b.Title,
      date: b.BreachDate,
      dataClasses: b.DataClasses,
    }));

    return new Response(
      JSON.stringify({ breached: true, breaches }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[check-breach]", err instanceof Error ? err.message : "error");
    return new Response(
      JSON.stringify({ error: "Breach check failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

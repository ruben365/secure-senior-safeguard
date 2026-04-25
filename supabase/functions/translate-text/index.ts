import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS: wildcard consistent with project convention.
// TODO: restrict to invisionnetwork.org origin for production.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_CHARS = 500;

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

// Helsinki-NLP opus-mt models (source: English).
// Model warm-up may take ~20s on first call; HF Inference API returns 503 while loading.
const LANG_MODELS: Record<string, string> = {
  es: "Helsinki-NLP/opus-mt-en-es",   // Spanish
  fr: "Helsinki-NLP/opus-mt-en-fr",   // French
  de: "Helsinki-NLP/opus-mt-en-de",   // German
  zh: "Helsinki-NLP/opus-mt-en-zh",   // Chinese
  pt: "Helsinki-NLP/opus-mt-en-ROMANCE", // Portuguese (via Romance group)
  it: "Helsinki-NLP/opus-mt-en-it",   // Italian
  ru: "Helsinki-NLP/opus-mt-en-ru",   // Russian
  ar: "Helsinki-NLP/opus-mt-en-ar",   // Arabic
  ja: "Helsinki-NLP/opus-mt-en-jap",  // Japanese
  ko: "Helsinki-NLP/opus-mt-en-ko",   // Korean
  nl: "Helsinki-NLP/opus-mt-en-nl",   // Dutch
  pl: "Helsinki-NLP/opus-mt-en-pl",   // Polish
  tr: "Helsinki-NLP/opus-mt-en-tr",   // Turkish
  uk: "Helsinki-NLP/opus-mt-en-uk",   // Ukrainian
  vi: "Helsinki-NLP/opus-mt-en-vi",   // Vietnamese
};

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

  const rawText = (body as Record<string, unknown>).text;
  const rawLang = (body as Record<string, unknown>).targetLanguage;

  if (!rawText || typeof rawText !== "string") {
    return new Response(
      JSON.stringify({ error: "text is required" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const text = rawText.trim();
  if (text.length === 0 || text.length > MAX_CHARS) {
    return new Response(
      JSON.stringify({ error: `Text must be 1–${MAX_CHARS} characters` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  if (!rawLang || typeof rawLang !== "string") {
    return new Response(
      JSON.stringify({ error: "targetLanguage is required" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const lang = rawLang.toLowerCase().trim();
  const model = LANG_MODELS[lang];
  if (!model) {
    return new Response(
      JSON.stringify({ error: `Unsupported language: ${lang}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const apiKey = Deno.env.get("HUGGINGFACE_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        translated: null,
        unconfigured: true,
        message: "Configure HUGGINGFACE_API_KEY in Supabase secrets to enable translation.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const hfRes = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      },
    );

    if (hfRes.status === 503) {
      return new Response(
        JSON.stringify({ error: "Translation model is warming up. Please try again in 20 seconds." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!hfRes.ok) throw new Error(`HuggingFace ${hfRes.status}`);

    const result = await hfRes.json() as Array<{ translation_text?: string }>;
    const translated = result[0]?.translation_text ?? null;

    if (!translated) throw new Error("Empty translation");

    return new Response(
      JSON.stringify({ translated }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("[translate-text]", err instanceof Error ? err.message : "error");
    return new Response(
      JSON.stringify({ error: "Translation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

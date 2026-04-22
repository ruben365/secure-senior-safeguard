import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / min). Each call hits a paid LLM — cap protects
// against credit-burn DoS.
// NOTE: In-memory — resets on cold start. Replace with Upstash Redis for
// production multi-isolate rate limiting.
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
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    console.log(`[analyze-scam] Rate limit hit for ${ip}. Retry after ${retryAfter}s`);
    return { allowed: false, retryAfter };
  }
  record.count++;
  return { allowed: true };
}

// ============================================================================
// Hard caps on analyzed payload — prevents arbitrarily large prompt injection.
// ============================================================================
const MAX_CONTENT_CHARS = 10_000;
const ALLOWED_TYPES = new Set([
  "email",
  "sms",
  "message",
  "url",
  "phone",
  "text",
  "voicemail",
  "image",
  "other",
]);

const SYSTEM_PROMPT = `You are a scam detection specialist at InVision Network, a cybersecurity company protecting seniors and families.

Analyze the submitted content and respond with ONLY a valid JSON object — no extra text, no markdown, no code fences.

Required JSON schema:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "confidence": 0.0-1.0,
  "threats": ["array of specific threats identified"],
  "recommendations": ["array of actionable recommendations"],
  "summary": "brief 1-2 sentence summary"
}

Scam indicators to check:
- Urgency tactics and artificial time pressure
- Requests for personal information, passwords, or credentials
- Suspicious links, attachments, or unusual domains
- Grammar/spelling errors inconsistent with claimed sender
- Impersonation of banks, government agencies, or tech companies
- Too-good-to-be-true offers or prize claims
- Requests for gift cards, wire transfers, or cryptocurrency
- Emotional manipulation (fear, excitement, sympathy)
- Spoofed sender addresses or caller ID

Be thorough but concise. Focus on actionable insights for the recipient.`;

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
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter),
        },
      }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rawContent = (body as { content?: unknown }).content;
    const rawType = (body as { type?: unknown }).type;
    const rawTimestamp = (body as { timestamp?: unknown }).timestamp;

    if (typeof rawContent !== "string" || rawContent.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (typeof rawType !== "string") {
      return new Response(
        JSON.stringify({ error: "type is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const content = rawContent.slice(0, MAX_CONTENT_CHARS).trim();
    const type = rawType.slice(0, 50).trim().toLowerCase();
    if (!ALLOWED_TYPES.has(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Timestamp is logged only — never used for control flow.
    const timestamp = typeof rawTimestamp === "string"
      ? rawTimestamp.slice(0, 50)
      : "";

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      console.error("[analyze-scam] ANTHROPIC_API_KEY is not set");
      throw new Error("AI service is not configured");
    }

    console.log(`[analyze-scam] type=${type} chars=${content.length} ts=${timestamp}`);

    const userPrompt = `Analyze this ${type} for scam indicators and respond with JSON only:\n\n${content}`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userPrompt }],
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error(`[analyze-scam] Anthropic error ${anthropicRes.status}:`, errText);
      if (anthropicRes.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`Anthropic API error: ${anthropicRes.status}`);
    }

    const data = await anthropicRes.json();
    const analysisText = data?.content?.[0]?.text ?? "";

    // Extract JSON — Claude may occasionally wrap it in markdown fences
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    let analysis;
    try {
      analysis = JSON.parse(jsonMatch?.[0] ?? analysisText);
    } catch {
      console.error("[analyze-scam] Failed to parse Claude response:", analysisText);
      analysis = {
        riskLevel: "medium",
        confidence: 0.5,
        threats: ["Unable to fully analyze content"],
        recommendations: ["Contact InVision Network support for manual review"],
        summary: "Analysis incomplete. Please contact our security team for a detailed review.",
      };
    }

    console.log(
      `[analyze-scam] Done: riskLevel=${analysis.riskLevel} confidence=${Math.round((analysis.confidence ?? 0) * 100)}%`
    );

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("[analyze-scam] Error:", error);
    return new Response(
      JSON.stringify({ error: "Scam analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

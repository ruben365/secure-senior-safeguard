import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / min). The endpoint forwards every call to a paid
// LLM gateway, so the cap must be tight enough to prevent credit-burn DoS.
// ============================================================================
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase's built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 300_000);

function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetAt: entry.resetAt,
  };
}

// ============================================================================
// Hard caps on the LLM payload. These exist to prevent both prompt-injection
// amplification (10MB transcript) and pure cost burn — a free-tier abuser
// could otherwise jam the gateway with arbitrarily long histories.
// ============================================================================
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 4000;
const MAX_TOTAL_CHARS = 30_000;
const ALLOWED_ROLES = new Set(["system", "user", "assistant"]);
const ALLOWED_TYPES = new Set([
  "chat",
  "laura",
  "sentiment",
  "summary",
  "translation",
  "document_qa",
  "image_analysis",
]);

const LAURA_SYSTEM_PROMPT =
  `You are Laura, the professional AI assistant for InVision Network, a cybersecurity education company specializing in AI scam protection and business solutions.

PLATFORM KNOWLEDGE (current system):
- InVision Network sells 30+ digital eBooks through the Resources page. All books are read online only. There are no physical products, no downloads, and no shipping.
- After purchase, customers receive a 10-digit alphanumeric Access ID via email. They use this Access ID to log in at /reader and read their books in the browser.
- The Book Reader at /reader offers Day, Night, and Dimmed (sepia) reading themes, adjustable font sizes, and reading progress tracking.
- The Internal Library inside the reader lets users browse the full catalog with a 5% discount on in-reader purchases.
- Users who forget their Access ID use the "Forgot Access ID" feature to regenerate a new one using their purchase email.
- Books have shareable URLs that auto-fill credentials for cross-device access.
- Security measures include disabled right-click, text selection blocking, and print blocking.
- The Book Request feature lets users suggest new topics they want covered.
- Veterans receive a 10% discount on all purchases.
- Payment methods include credit/debit cards, Apple Pay, Google Pay, and QR code payments.
- Subscription plans: Starter ($39/mo), Family ($79/mo), Premium ($129/mo), and Custom ($229+/mo).
- AI Services Insurance tiers: Basic Care, Standard Care, and Premium Care.
- Training programs include workshops, the 60-Second Pause Protocol, and family safety courses.
- ScamShield provides AI-powered scam analysis and risk assessments.
- The platform has a 30-day money-back guarantee.

YOUR ROLE:
1. Help users navigate the website and understand all features listed above
2. Guide users to the correct pages: /resources for books, /reader for reading, /contact for help
3. Explain how Access IDs work, how to recover them, and how to use the reader
4. Answer questions about pricing, discounts, subscriptions, and services
5. Help users understand ScamShield, training programs, and insurance options

STRICT RULES:
1. You NEVER read or analyze files, open links, view images, access system information, share API keys, or execute code
2. You NEVER mention downloads, shipping, or physical products. Everything is digital and read online.
3. If asked anything outside InVision Network, respond: "I help with questions about InVision Network. For other assistance, please contact support@invisionnetwork.com"
4. Keep responses SHORT (2-3 sentences) and friendly
5. Always refer to the book access system as "Access ID" (not download link, not activation code)
6. When users ask about reading books, direct them to /reader with their Access ID`;

const LAURA_BRIEF_PROMPT = `You are Laura, the InVision Network AI assistant.

Your ONLY role is to help users navigate the website and answer questions about InVision Network services.

STRICT RULES:
1. You ONLY answer questions about:
   - How to use the website and book reader (/reader)
   - What InVision Network does
   - Pricing, services, and Access IDs
   - How the online reading system works
   - Privacy and security

2. You NEVER:
   - Read or analyze files
   - Open or visit links
   - View images or videos
   - Access system information
   - Share API keys or technical details
   - Execute code or commands
   - Mention downloads, shipping, or physical products

3. If asked anything outside your scope, respond:
   "I help with questions about InVision Network.
   For other assistance, please contact support@invisionnetwork.com"

4. Keep responses SHORT (2-3 sentences) and friendly.

5. Guide users to /reader with their Access ID if they ask about reading books.`;

function getSystemPrompt(type: string): string {
  switch (type) {
    case "laura":
      return LAURA_BRIEF_PROMPT;
    case "sentiment":
      return "You are a sentiment analysis expert. Analyze the emotional tone, sentiment (positive/negative/neutral), and key themes in the text provided. Be concise and clear.";
    case "summary":
      return "You are a summarization expert. Create clear, concise summaries that capture the main points and key information. Keep summaries brief but comprehensive.";
    case "translation":
      return "You are a professional translator. Translate text accurately while preserving tone, context, and cultural nuances. Always specify the target language.";
    case "document_qa":
      return "You are a document analysis expert. Answer questions about documents accurately and cite specific information when possible. If you don't know, say so.";
    case "image_analysis":
      return "You are an image analysis expert. Describe images in detail, identify objects, text, and context. Be thorough and precise.";
    default:
      return LAURA_SYSTEM_PROMPT;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(clientIp);

    if (!rateCheck.allowed) {
      const retryAfter = Math.ceil((rateCheck.resetAt - Date.now()) / 1000);
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again in a moment.",
          retryAfter: retryAfter,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(rateCheck.resetAt).toISOString(),
          },
        },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const rawType = (body as { type?: unknown }).type;
    const type = typeof rawType === "string" && ALLOWED_TYPES.has(rawType)
      ? rawType
      : "chat";

    const rawMessages = (body as { messages?: unknown }).messages;
    if (!Array.isArray(rawMessages)) {
      return new Response(
        JSON.stringify({ error: "messages must be an array" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (rawMessages.length === 0 || rawMessages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({
          error: `messages must contain between 1 and ${MAX_MESSAGES} entries`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Validate every message: shape, role allow-list, content length cap.
    let totalChars = 0;
    const sanitized: Array<{ role: string; content: string }> = [];
    for (const m of rawMessages) {
      if (!m || typeof m !== "object") {
        return new Response(
          JSON.stringify({ error: "Invalid message entry" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const role = (m as { role?: unknown }).role;
      const content = (m as { content?: unknown }).content;
      if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) {
        return new Response(
          JSON.stringify({ error: "Invalid message role" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (typeof content !== "string") {
        return new Response(
          JSON.stringify({ error: "Message content must be a string" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      const trimmed = content.slice(0, MAX_MESSAGE_CHARS);
      totalChars += trimmed.length;
      if (totalChars > MAX_TOTAL_CHARS) {
        return new Response(
          JSON.stringify({ error: "Message history too long" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      sanitized.push({ role, content: trimmed });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = getSystemPrompt(type);

    console.log(`Processing ${type} request with ${sanitized.length} messages`);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: systemPrompt }, ...sanitized],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Please try again later.",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI credits depleted. Please add credits to continue.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
        "X-RateLimit-Remaining": rateCheck.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateCheck.resetAt).toISOString(),
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({
        error: "AI chat request failed",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

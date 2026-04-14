import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-TESTIMONIAL-THANKYOU] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (5 / min) — gates abuse where an attacker could spam
// "thank you" emails to arbitrary addresses with our branding.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
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

interface TestimonialThankYouRequest {
  email: string;
  name: string;
  rating?: number;
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
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again shortly.",
      }),
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
    logStep("Function started");

    const body = (await req.json()) as TestimonialThankYouRequest;

    if (typeof body.email !== "string" || typeof body.name !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const normalizedEmail = body.email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const safeName = body.name.slice(0, 100).trim();
    if (!safeName) {
      return new Response(
        JSON.stringify({ error: "Missing name" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Validate rating: must be an integer 1-5, otherwise default to 5 stars
    const rawRating = body.rating;
    const safeRating =
      typeof rawRating === "number" &&
      Number.isInteger(rawRating) &&
      rawRating >= 1 &&
      rawRating <= 5
        ? rawRating
        : 5;

    const escName = escapeHtml(safeName);
    const stars = "&#11088;".repeat(safeRating);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "Thank You for Sharing Your Story - InVision Network",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank You, ${escName}!</h1>
            <p>We're incredibly grateful that you took the time to share your experience with InVision Network.</p>
            <div style="background: linear-gradient(135deg, #faf5ff, #ede9fe); padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
              <p style="font-size: 24px; margin: 0;">${stars}</p>
              <p style="color: #6D28D9; font-weight: bold; margin-top: 10px;">Your Rating</p>
            </div>
            <h3>What Happens Next?</h3>
            <p>Our team will review your testimonial, and once approved, it may be featured on:</p>
            <ul>
              <li>Our website's testimonials section</li>
              <li>Our social media channels</li>
              <li>Marketing materials (with your permission)</li>
            </ul>
            <p>Your story helps others trust InVision Network and makes a real difference in our community.</p>
            <p style="margin-top: 30px;">With appreciation,<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Email send failed:", error);
      throw new Error("Failed to send email");
    }

    logStep("Thank-you email sent");

    return new Response(
      JSON.stringify({ success: true, message: "Thank-you email sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: "Failed to send thank-you email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

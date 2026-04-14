import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (5 / min) — verification codes are high-volume but each
// successful issue gives an attacker a 1-in-1M shot at a 6-digit code.
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

// ============================================================================
// Generate cryptographically secure 6-digit code. Math.random() is NOT
// safe for security tokens — it's a predictable PRNG. crypto.getRandomValues
// is. We use rejection sampling to eliminate modulo bias entirely.
// ============================================================================
function generateSecureCode(): string {
  // 4 bytes = 2^32 = 4_294_967_296. The largest multiple of 1_000_000 below
  // 2^32 is 4_294_000_000. Reject anything above that for an unbiased draw.
  const buf = new Uint32Array(1);
  let n: number;
  do {
    crypto.getRandomValues(buf);
    n = buf[0];
  } while (n >= 4_294_000_000);
  return (n % 1_000_000).toString().padStart(6, "0");
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
        error:
          "Too many verification requests. Please wait before trying again.",
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
    const { email } = await req.json();

    if (typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Invalidate any prior unused codes so the user can't try-and-stack
    // multiple codes simultaneously.
    await supabase
      .from("verification_codes")
      .update({ used: true })
      .eq("email", normalizedEmail)
      .eq("used", false);

    const code = generateSecureCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { error: insertError } = await supabase
      .from("verification_codes")
      .insert({
        email: normalizedEmail,
        code,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
        used: false,
      });

    if (insertError) {
      throw new Error(
        `Failed to create verification code: ${insertError.message}`,
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <noreply@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "Your InVision Network Verification Code",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #1a1a2e;">Your Verification Code</h1><div style="background: #f7fafc; border: 2px dashed #4a90d9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;"><span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1a1a2e; font-family: monospace;">${code}</span></div><p style="color: #555;">This code expires in 10 minutes.</p><p style="color: #999; font-size: 12px;">If you didn't request this code, please ignore this email.</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      const text = await emailResponse.text();
      console.error("Resend error:", text);
      throw new Error("Failed to send verification email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-verification-code error:", msg);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

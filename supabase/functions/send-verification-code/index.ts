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
        html: `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f7f4f0;padding:32px 16px;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="background:#0D2137;border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
      <div style="color:#F97316;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">InVision Network</div>
      <div style="color:#ffffff;font-size:22px;font-weight:600;">Your Verification Code</div>
    </div>
    <div style="background:#ffffff;padding:40px;border-left:1px solid #e8e3dc;border-right:1px solid #e8e3dc;">
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 24px;">Enter the code below to verify your identity. This code is valid for <strong>10 minutes</strong>.</p>
      <div style="background:#f7f4f0;border:2px solid #F97316;border-radius:12px;padding:28px;text-align:center;margin:0 0 24px;">
        <span style="font-size:40px;font-weight:700;letter-spacing:12px;color:#0D2137;font-family:'Courier New',monospace;">${code}</span>
      </div>
      <p style="color:#6b7280;font-size:13px;text-align:center;margin:0;">If you didn't request this code, you can safely ignore this email.</p>
    </div>
    <div style="background:#0D2137;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
      <div style="color:rgba(255,255,255,0.45);font-size:12px;line-height:1.7;">
        &copy; 2024 InVision Network &middot; AI Scam Protection for Ohio Families<br>
        <a href="https://www.invisionnetwork.org" style="color:#F97316;text-decoration:none;">www.invisionnetwork.org</a>
      </div>
    </div>
  </div>
</div>`,
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

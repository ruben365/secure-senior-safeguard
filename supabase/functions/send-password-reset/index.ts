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
// Per-IP rate limit (3 / min) — password reset is high-impact, kept strict.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
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
// Reset URL is HARD-PINNED to the canonical origin. The previous version
// trusted req.headers.get("origin"), which an attacker could spoof to make
// the reset link point at a phishing clone of the site. Now the link is
// guaranteed to land on the real domain.
// ============================================================================
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

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
          "Too many password reset requests. Please wait before trying again.",
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

    // Validate input shape
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

    // Domain restriction: only InVision Network staff get password reset
    if (!normalizedEmail.endsWith("@invisionnetwork.org")) {
      return new Response(
        JSON.stringify({
          error:
            "Password reset is only available for InVision Network email addresses",
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Invalidate any existing unused tokens for this email so an attacker
    // who triggered an earlier reset can't reuse a stale token in parallel.
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("email", normalizedEmail)
      .eq("used", false);

    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const token = Array.from(tokenArray, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const { error: insertError } = await supabase
      .from("password_reset_tokens")
      .insert({
        email: normalizedEmail,
        token,
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (insertError) {
      throw new Error(`Failed to create reset token: ${insertError.message}`);
    }

    // CRITICAL: hard-pinned origin, NOT req.headers.get("origin")
    const resetUrl = `${CANONICAL_ORIGIN}/reset-password?token=${token}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "Password Reset - InVision Network",
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h1 style="color: #1a1a2e;">Reset Your Password</h1><p>Click the link below to reset your InVision Network password:</p><p><a href="${resetUrl}" style="display: inline-block; background: #4a90d9; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Reset Password</a></p><p style="color: #555; font-size: 14px;">This link expires in 1 hour.</p><p style="color: #999; font-size: 12px;">If you didn't request this reset, please ignore this email — your password will stay the same.</p></div>`,
      }),
    });

    if (!emailResponse.ok) {
      const text = await emailResponse.text();
      console.error("Resend error:", text);
      throw new Error("Failed to send reset email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-password-reset error:", msg);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

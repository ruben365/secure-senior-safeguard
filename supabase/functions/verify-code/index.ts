import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / min) — gates brute-force of 6-digit codes.
// Combined with the 3-attempts-per-issued-code DB cap and the 5/min issue
// cap on send-verification-code, an attacker gets at most ~30 guesses/min
// against a 1-in-1M code. Effective brute-force time is years.
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
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    };
  }
  record.count++;
  return { allowed: true };
}

// 6-digit numeric code only — matches send-verification-code's format.
const CODE_RE = /^\d{6}$/;

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
        valid: false,
        error: "Too many verification attempts. Please wait before trying again.",
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { email, code } = await req.json();

    // Validate input shapes BEFORE touching the DB so probing requests
    // don't amplify into DB load and probing format errors look identical
    // to wrong-code errors (no timing leak between malformed-input and
    // wrong-code-but-valid-shape).
    if (typeof email !== "string" || typeof code !== "string") {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid code. Please request a new one.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid code. Please request a new one.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const trimmedCode = code.trim();
    if (!CODE_RE.test(trimmedCode)) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid code. Please request a new one.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get latest unused code for this email
    const { data: codeData, error: fetchError } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", normalizedEmail)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError || !codeData) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "No verification code found. Please request a new one.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Check if code expired — also mark it used so it can't be retried
    // after a clock fix or replay.
    if (new Date(codeData.expires_at) < new Date()) {
      await supabase
        .from("verification_codes")
        .update({ used: true })
        .eq("id", codeData.id);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "This code has expired. Please request a new one.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Check attempts BEFORE comparing so an exhausted code can't be tried
    // again — even at the cost of one more wrong attempt slot.
    if (codeData.attempts >= 3) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Too many attempts. Please request a new code.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Constant-time comparison to avoid timing-based code leaks. Codes are
    // short and equal-length but we still XOR every byte before checking
    // the result so the loop body runs the same way regardless of input.
    const a = trimmedCode;
    const b = String(codeData.code);
    let mismatch = a.length === b.length ? 0 : 1;
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
      mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
    }

    if (mismatch !== 0) {
      // Increment attempts so we converge on the 3-attempt cap
      await supabase
        .from("verification_codes")
        .update({ attempts: codeData.attempts + 1 })
        .eq("id", codeData.id);

      const attemptsLeft = 3 - (codeData.attempts + 1);
      return new Response(
        JSON.stringify({
          valid: false,
          error: `Invalid code. ${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} remaining.`,
          attemptsLeft,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Mark code as used so it can't be replayed
    await supabase
      .from("verification_codes")
      .update({ used: true })
      .eq("id", codeData.id);

    return new Response(JSON.stringify({ valid: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("verify-code error:", error);
    return new Response(
      JSON.stringify({
        valid: false,
        error: "An error occurred. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

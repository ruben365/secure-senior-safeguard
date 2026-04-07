import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / 5 minutes) — credentials-stuffing defense for the
// email + access-id combo. Legit users only call this when they want to read
// their books, so a tight cap is appropriate.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 5 * 60 * 1000;

function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW_MS });
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

// access_id format from generate-book-access: 10 chars from 32-char alphabet
const ACCESS_ID_RE = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{10}$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Per-IP rate limit
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again shortly.",
        retryAfter: rateCheck.retryAfter,
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
    const { email, accessId } = await req.json();

    if (!email || !accessId) {
      return new Response(
        JSON.stringify({ valid: false, error: "Email and Access ID are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate input shapes BEFORE touching the database. This prevents
    // probing attacks from amplifying into DB load and gives a uniform
    // error so the response time can't tell legit-format-but-wrong-creds
    // from garbage-format apart.
    if (typeof email !== "string" || typeof accessId !== "string") {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid credentials. Please check your email and Access ID." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid credentials. Please check your email and Access ID." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedAccessId = accessId.toUpperCase().trim();
    if (!ACCESS_ID_RE.test(normalizedAccessId)) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid credentials. Please check your email and Access ID." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: purchase, error } = await supabase
      .from("book_purchases")
      .select("*")
      .eq("access_id", normalizedAccessId)
      .eq("customer_email", normalizedEmail)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!purchase) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid credentials. Please check your email and Access ID." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update last_accessed_at
    await supabase
      .from("book_purchases")
      .update({ last_accessed_at: new Date().toISOString() })
      .eq("id", purchase.id);

    return new Response(
      JSON.stringify({
        valid: true,
        bookIds: purchase.book_ids,
        customerName: purchase.customer_name,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("validate-book-access error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

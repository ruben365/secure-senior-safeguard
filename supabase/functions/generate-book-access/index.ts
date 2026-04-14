import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / 5 minutes) — gates session-id enumeration. The
// legitimate flow only calls this once per purchase; 10 attempts per 5 mins
// is generous for retries but blocks brute-force probes against Stripe.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
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

// Sanitize text that goes into HTML email
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SESSION_ID_RE = /^cs_[A-Za-z0-9_]+$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function generateAccessId(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

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
    const {
      customerEmail,
      customerName,
      bookIds,
      stripeSessionId,
    } = await req.json();

    if (!customerEmail || !customerName || !bookIds?.length) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate inputs
    if (typeof customerEmail !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid customerEmail" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const requestedEmail = customerEmail.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requestedEmail) || requestedEmail.length > 254) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof customerName !== "string" || customerName.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid customerName" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const safeCustomerName = customerName.slice(0, 100).trim();

    // bookIds must be an array of UUIDs (max 50)
    if (!Array.isArray(bookIds) || bookIds.length === 0 || bookIds.length > 50) {
      return new Response(
        JSON.stringify({ error: "Invalid bookIds (must be 1-50 items)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const safeBookIds: string[] = [];
    for (const id of bookIds) {
      if (typeof id !== "string" || !UUID_RE.test(id)) {
        return new Response(
          JSON.stringify({ error: "Invalid bookId format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      safeBookIds.push(id);
    }

    // ====================================================================
    // CRITICAL: This function used to accept any request and hand out
    // book access for free. Per the directive "nothing for free on this
    // website", we now REQUIRE a verified Stripe session and re-check
    // the payment status server-side every time.
    // ====================================================================
    if (
      !stripeSessionId ||
      typeof stripeSessionId !== "string" ||
      stripeSessionId.length > 100 ||
      !SESSION_ID_RE.test(stripeSessionId)
    ) {
      return new Response(
        JSON.stringify({
          error: "stripeSessionId is required and must be a valid Stripe checkout session id.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    // Verify the Stripe session is real, paid, and matches the email
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(stripeSessionId);
    } catch (stripeErr) {
      console.error("Stripe session lookup failed:", stripeErr);
      return new Response(
        JSON.stringify({ error: "Invalid Stripe session" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (session.payment_status !== "paid") {
      console.warn(
        `[generate-book-access] Refused: session ${stripeSessionId} status=${session.payment_status}`
      );
      return new Response(
        JSON.stringify({
          error: "Payment not completed. Cannot issue book access.",
          status: session.payment_status,
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sessionEmail = (
      session.customer_email || session.customer_details?.email || ""
    ).toLowerCase();

    if (sessionEmail && sessionEmail !== requestedEmail) {
      console.warn(
        `[generate-book-access] Email mismatch: session=${sessionEmail} requested=${requestedEmail}`
      );
      return new Response(
        JSON.stringify({
          error: "Email does not match the paid Stripe session.",
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Idempotency: if a purchase already exists for this stripe session,
    // return the existing access ID rather than creating a duplicate.
    const { data: existingPurchase } = await supabase
      .from("book_purchases")
      .select("access_id")
      .eq("stripe_session_id", stripeSessionId)
      .maybeSingle();

    if (existingPurchase?.access_id) {
      console.log(
        `[generate-book-access] Returning existing access for session ${stripeSessionId}`
      );
      return new Response(
        JSON.stringify({ accessId: existingPurchase.access_id, success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate unique access ID (retry up to 5 times for uniqueness)
    let accessId = "";
    for (let i = 0; i < 5; i++) {
      accessId = generateAccessId(10);
      const { data: existing } = await supabase
        .from("book_purchases")
        .select("id")
        .eq("access_id", accessId)
        .maybeSingle();
      if (!existing) break;
    }

    // Insert purchase record — amount comes from Stripe, NOT the client
    const verifiedAmount = (session.amount_total ?? 0) / 100;
    const { error: insertError } = await supabase.from("book_purchases").insert({
      access_id: accessId,
      customer_email: requestedEmail,
      customer_name: safeCustomerName,
      book_ids: safeBookIds,
      stripe_session_id: stripeSessionId,
      amount_paid: verifiedAmount,
    });

    if (insertError) {
      throw new Error(`Failed to save purchase: ${insertError.message}`);
    }

    // Send email with access ID via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const safeNameHtml = escapeHtml(safeCustomerName);
        const safeAccessIdHtml = escapeHtml(accessId);
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "InVision Network <noreply@invisionnetwork.org>",
            to: [requestedEmail],
            subject: "Your Book Access ID — InVision Network",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 30px; border-radius: 12px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0 0 10px;">Your Books Are Ready</h1>
                  <p style="color: #a0aec0; margin: 0;">Thank you for your purchase, ${safeNameHtml}!</p>
                </div>
                <div style="padding: 30px 20px; background: #ffffff;">
                  <p style="color: #333; font-size: 16px;">Your unique Access ID is:</p>
                  <div style="background: #f7fafc; border: 2px dashed #4a90d9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1a1a2e; font-family: monospace;">${safeAccessIdHtml}</span>
                  </div>
                  <p style="color: #555; font-size: 14px;">
                    <strong>How to read your books:</strong><br/>
                    1. Visit <a href="https://www.invisionnetwork.org/resources">www.invisionnetwork.org/resources</a><br/>
                    2. Click <strong>"Read Your Books"</strong><br/>
                    3. Enter your email and Access ID<br/>
                    4. Start reading
                  </p>
                  <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Keep this email safe — you'll need the Access ID each time you want to read your books.
                    Books can only be read online and cannot be downloaded or printed.
                  </p>
                </div>
                <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
                  © InVision Network • Department of Literature
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email send failed (non-blocking):", emailErr);
      }
    }

    return new Response(
      JSON.stringify({ accessId, success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("generate-book-access error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

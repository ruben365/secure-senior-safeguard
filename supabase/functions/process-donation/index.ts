import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / minute) — public endpoint that creates Stripe
// resources and DB rows. Cap to prevent flooding the donations table.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
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

// ============================================================================
// Origin allow-list. Stripe redirects users to these URLs after checkout, so
// an attacker who could spoof the Origin header would be able to point the
// post-payment redirect at a phishing site they control. We resolve only
// against this fixed list and never trust the request blindly.
// ============================================================================
const ALLOWED_ORIGINS = new Set<string>([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
]);
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

const resolveOrigin = (req: Request): string => {
  const requested = (req.headers.get("origin") || "").trim().toLowerCase();
  return ALLOWED_ORIGINS.has(requested) ? requested : CANONICAL_ORIGIN;
};

// ============================================================================
// Donation amount caps. Stripe charges in cents and rejects values <50; we
// also cap top-end to prevent absurdly large attempted charges (10k cap).
// ============================================================================
const MIN_DONATION = 1;
const MAX_DONATION = 10_000;

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[PROCESS-DONATION] ${step}${detailsStr}`);
};

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
      },
    );
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing required server configuration.");
    }

    const body = await req.json();
    const { donorName, email, amount, donationType, message } = body;

    // ====================================================================
    // Strict input validation. CRITICAL: amount is the basis for the
    // charge, so we have to refuse anything outside legal bounds. We
    // never trust the client to be honest about anything.
    // ====================================================================
    if (typeof email !== "string") {
      throw new Error("Email is required");
    }
    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      throw new Error("Invalid email format");
    }

    const amountNumber = Number(amount);
    if (
      !Number.isFinite(amountNumber) ||
      amountNumber < MIN_DONATION ||
      amountNumber > MAX_DONATION
    ) {
      throw new Error(
        `Donation amount must be between $${MIN_DONATION} and $${MAX_DONATION}.`,
      );
    }
    // Round to 2 decimal places (cents). Math.round avoids float drift on
    // amounts like 19.999999 that the client may try to send.
    const amountCents = Math.round(amountNumber * 100);
    if (amountCents < 50) {
      // Stripe minimum
      throw new Error("Donation amount is below the Stripe minimum.");
    }
    const amountDollars = amountCents / 100;

    const safeDonorName =
      typeof donorName === "string" ? donorName.slice(0, 100).trim() : "";

    const safeMessage =
      typeof message === "string" ? message.slice(0, 500).trim() : "";

    // donationType is restricted to two values; anything else falls back
    // to one-time so an attacker can't sneak in a third arbitrary mode.
    const safeDonationType =
      donationType === "monthly" ? "monthly" : "one-time";

    logStep("Request validated", {
      email: normalizedEmail,
      amountCents,
      donationType: safeDonationType,
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
    const supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Find or create the Stripe customer
    let customerId: string;
    const customers = await stripe.customers.list({
      email: normalizedEmail,
      limit: 1,
    });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: normalizedEmail,
        name: safeDonorName || undefined,
        metadata: { source: "donation" },
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Create donation record server-side using SERVER-VALIDATED values only
    const { data: donation, error: insertError } = await supabaseClient
      .from("donations")
      .insert({
        donor_name: safeDonorName,
        email: normalizedEmail,
        amount: amountDollars,
        donation_type: safeDonationType,
        message: safeMessage,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !donation) {
      logStep("Donation insert error", { message: insertError?.message });
      throw new Error("Failed to create donation record");
    }

    const donationId = donation.id;
    logStep("Created donation record", { donationId });

    const origin = resolveOrigin(req);

    let session;
    if (safeDonationType === "monthly") {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Monthly Donation",
                description: "Monthly recurring donation to InVision Network",
              },
              unit_amount: amountCents,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=donation`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: {
          donation_id: donationId,
          donation_type: "monthly",
          donor_name: safeDonorName.slice(0, 480),
          message: safeMessage.slice(0, 480),
          customer_email: normalizedEmail,
        },
      });
      logStep("Created subscription checkout session", {
        sessionId: session.id,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "One-Time Donation",
                description: "One-time donation to InVision Network",
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&type=donation`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: {
          donation_id: donationId,
          donation_type: "one-time",
          donor_name: safeDonorName.slice(0, 480),
          message: safeMessage.slice(0, 480),
          customer_email: normalizedEmail,
        },
      });
      logStep("Created payment checkout session", { sessionId: session.id });
    }

    await supabaseClient
      .from("donations")
      .update({
        stripe_payment_id: session.id,
        payment_status: "processing",
      })
      .eq("id", donationId);
    logStep("Updated donation record", { donationId });

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

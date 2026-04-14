import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-TRAINING-PAYMENT] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (15 / minute) — public endpoint that creates Stripe
// resources and runs DB lookups. Cap to prevent enumeration / spam.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60 * 1000;

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

interface TrainingPaymentRequest {
  // Either an exact courseId OR a slug. amount is IGNORED if sent.
  courseId?: string;
  courseSlug?: string;
  serviceTier?: string;
  customerEmail: string;
  customerName: string;
  isVeteran?: boolean;
  preferredDate?: string;
  phone?: string;
  message?: string;
  state?: string;
  checkoutMode?: boolean;
}

const ALLOWED_ORIGINS = new Set<string>([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
]);
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

const resolveOrigin = (req: Request): string => {
  const requested = (req.headers.get("origin") || "").trim().toLowerCase();
  return ALLOWED_ORIGINS.has(requested) ? requested : CANONICAL_ORIGIN;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const body: TrainingPaymentRequest = await req.json();
    const {
      courseId,
      courseSlug,
      serviceTier,
      customerEmail,
      customerName,
      isVeteran = false,
      preferredDate,
      phone,
      message,
      state,
      checkoutMode = false,
    } = body;

    if (!customerEmail || !customerName) {
      throw new Error("Missing required fields: customerEmail or customerName");
    }

    if (!courseId && !courseSlug) {
      throw new Error("courseId or courseSlug is required");
    }

    // Validate email
    const normalizedEmail = String(customerEmail).toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      throw new Error("Invalid email format");
    }

    // Cap customer-controlled string fields so they can't be used to flood
    // Stripe metadata or our DB later via webhook handlers.
    const safeCustomerName = String(customerName).slice(0, 100).trim();
    const safePhone = typeof phone === "string" ? phone.slice(0, 30).trim() : "";
    const safeMessage = typeof message === "string" ? message.slice(0, 480) : "";
    const safeState = typeof state === "string" ? state.slice(0, 50).trim() : "";
    const safeServiceTier =
      typeof serviceTier === "string" ? serviceTier.slice(0, 50).trim() : "";
    const safePreferredDate =
      typeof preferredDate === "string" ? preferredDate.slice(0, 50).trim() : "";

    // ====================================================================
    // CRITICAL SECURITY: server-side price lookup
    // The client used to send `amount` directly. We now ignore that and
    // look up the actual price from the courses table.
    // ====================================================================
    let courseQuery = supabaseAdmin
      .from("courses")
      .select("id, title, slug, price, status, category, level");

    if (courseId) {
      courseQuery = courseQuery.eq("id", courseId);
    } else if (courseSlug) {
      courseQuery = courseQuery.eq("slug", courseSlug);
    }

    const { data: course, error: courseErr } = await courseQuery
      .maybeSingle();

    if (courseErr || !course) {
      throw new Error(`Course not found`);
    }

    if (course.status !== "active" && course.status !== "published") {
      throw new Error(`Course is not available: ${course.title}`);
    }

    const baseAmount = Number(course.price);
    if (!Number.isFinite(baseAmount) || baseAmount <= 0) {
      throw new Error(
        `Course has no valid price (nothing for free): ${course.title}`,
      );
    }

    // Apply 10% veteran discount server-side
    const veteranDiscount = isVeteran ? baseAmount * 0.1 : 0;
    const finalAmount = baseAmount - veteranDiscount;
    const amountInCents = Math.round(finalAmount * 100);

    if (amountInCents < 50) {
      throw new Error("Order total must be at least $0.50");
    }

    logStep("Server-verified pricing", {
      courseId: course.id,
      title: course.title,
      baseAmount,
      veteranDiscount,
      finalAmount,
      amountInCents,
      checkoutMode: !!checkoutMode,
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    // Check if customer exists
    const customers = await stripe.customers.list({
      email: normalizedEmail,
      limit: 1,
    });
    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const newCustomer = await stripe.customers.create({
        email: normalizedEmail,
        name: safeCustomerName || undefined,
        phone: safePhone || undefined,
        metadata: {
          isVeteran: isVeteran ? "true" : "false",
          state: safeState,
        },
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    const paymentMetadata = {
      paymentType: "training",
      courseId: course.id,
      courseSlug: course.slug || "",
      courseTitle: String(course.title).slice(0, 480),
      serviceTier: safeServiceTier,
      isVeteran: isVeteran ? "true" : "false",
      veteranDiscountCents: Math.round(veteranDiscount * 100).toString(),
      baseAmountCents: Math.round(baseAmount * 100).toString(),
      preferredDate: safePreferredDate,
      customerName: safeCustomerName,
      customerEmail: normalizedEmail,
      phone: safePhone,
      message: safeMessage,
      state: safeState,
    };

    if (checkoutMode) {
      const origin = resolveOrigin(req);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        ...(customerId ? { customer: customerId } : { customer_email: normalizedEmail }),
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: String(course.title).slice(0, 120),
                description: safeServiceTier
                  ? `Training session • ${safeServiceTier}`
                  : "Training session",
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/payment-success?type=training&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: paymentMetadata,
        payment_intent_data: {
          metadata: paymentMetadata,
        },
      });

      logStep("Hosted training checkout session created", {
        sessionId: session.id,
        courseId: course.id,
      });

      return new Response(
        JSON.stringify({
          url: session.url,
          sessionId: session.id,
          customerId,
          amount: amountInCents,
          baseAmount,
          veteranDiscount,
          finalAmount,
          courseId: course.id,
          courseTitle: course.title,
          type: "checkout",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // Create payment intent with the SERVER-COMPUTED amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      customer: customerId,
      metadata: paymentMetadata,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Training: ${String(course.title).slice(0, 100)}${
        safeServiceTier ? ` - ${safeServiceTier}` : ""
      }`,
    });

    logStep("Created payment intent", {
      paymentIntentId: paymentIntent.id,
      amount: amountInCents,
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: amountInCents,
        baseAmount,
        veteranDiscount,
        finalAmount,
        courseId: course.id,
        courseTitle: course.title,
      }),
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

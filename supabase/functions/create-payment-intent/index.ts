import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-PAYMENT-INTENT] ${step}${detailsStr}`);
};

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
// Per-IP rate limit (15 / minute) — public endpoint that creates Stripe
// resources. Cap to prevent enumeration / customer-creation spam.
// ============================================================================
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

// ============================================================================
// Sanitize caller-supplied metadata so it can never overflow Stripe's
// 50-key / 500-char-per-value limit and can never include nested objects.
// ============================================================================
function sanitizeMetadata(
  raw: unknown,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  let count = 0;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= 40) break;
    if (typeof k !== "string" || k.length > 40) continue;
    if (v == null) continue;
    const stringified = typeof v === "string" ? v : JSON.stringify(v);
    if (stringified.length > 480) continue;
    out[k] = stringified.slice(0, 480);
    count++;
  }
  return out;
}

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
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const {
      priceId,
      mode,
      customerEmail,
      customerName,
      isVeteran = false,
      metadata = {},
      checkoutMode = false,
    } = body;

    // ====================================================================
    // Strict input validation
    // ====================================================================
    if (!priceId || typeof priceId !== "string") {
      throw new Error("priceId is required");
    }
    if (!/^price_[A-Za-z0-9]+$/.test(priceId) || priceId.length > 100) {
      throw new Error("Invalid priceId format");
    }

    if (mode !== "payment" && mode !== "subscription") {
      throw new Error("mode must be 'payment' or 'subscription'");
    }

    if (!customerEmail || typeof customerEmail !== "string") {
      throw new Error("customerEmail is required");
    }
    const normalizedEmail = customerEmail.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      throw new Error("Invalid email format");
    }

    const safeName = typeof customerName === "string"
      ? customerName.slice(0, 100).trim()
      : "";

    const safeMetadata = sanitizeMetadata(metadata);

    logStep("Request validated", {
      priceId,
      mode,
      email: normalizedEmail,
      isVeteran: !!isVeteran,
      checkoutMode: !!checkoutMode,
    });

    // ====================================================================
    // Pull the price from Stripe and verify it's active and non-zero.
    // The price.unit_amount returned here is the AUTHORITATIVE charge.
    // The client cannot override it.
    // ====================================================================
    const price = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });

    if (!price.active) {
      throw new Error("This price is no longer available");
    }

    // Verify the underlying product is also active
    const product = price.product as Stripe.Product | string;
    if (typeof product !== "string") {
      if (!product.active) {
        throw new Error("This product is no longer available");
      }
    }

    // Nothing for free on this site
    if (!price.unit_amount || price.unit_amount < 50) {
      throw new Error("Invalid price (must be at least $0.50)");
    }

    logStep("Price verified", {
      priceId,
      amount: price.unit_amount,
      currency: price.currency,
      active: price.active,
    });

    // Find or create the Stripe customer
    const customers = await stripe.customers.list({
      email: normalizedEmail,
      limit: 1,
    });
    let customerId: string;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const newCustomer = await stripe.customers.create({
        email: normalizedEmail,
        name: safeName || undefined,
        metadata: {
          ...safeMetadata,
          // Explicit fields LAST so they always win over caller-supplied
          // metadata of the same key.
          isVeteran: isVeteran ? "true" : "false",
        },
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    const stripeMetadata = {
      ...safeMetadata,
      priceId,
      customerEmail: normalizedEmail,
      customerName: safeName,
      isVeteran: isVeteran ? "true" : "false",
      paymentType: mode,
    };

    if (checkoutMode) {
      const origin = resolveOrigin(req);
      const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        ...(customerId
          ? { customer: customerId }
          : { customer_email: normalizedEmail }),
        line_items: [{ price: priceId, quantity: 1 }],
        mode: mode === "subscription" ? "subscription" : "payment",
        success_url: `${origin}/payment-success?type=${mode}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-canceled`,
        metadata: stripeMetadata,
      };

      if (mode === "payment") {
        sessionConfig.payment_intent_data = {
          metadata: stripeMetadata,
        };
      } else {
        sessionConfig.subscription_data = {
          metadata: stripeMetadata,
        };
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);
      logStep("Hosted checkout session created", {
        sessionId: session.id,
        mode,
      });

      return new Response(
        JSON.stringify({
          url: session.url,
          sessionId: session.id,
          customerId,
          amount: price.unit_amount,
          type: "checkout",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    if (mode === "subscription") {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
        metadata: stripeMetadata,
      });

      logStep("Subscription created", { subscriptionId: subscription.id });

      let clientSecret: string | null = null;
      let paymentIntentId: string | null = null;
      const invoice = subscription.latest_invoice as Stripe.Invoice | null;

      // Strategy 1: Try invoice's payment_intent
      if (
        invoice?.payment_intent &&
        typeof invoice.payment_intent !== "string"
      ) {
        const pi = invoice.payment_intent as Stripe.PaymentIntent;
        if (pi.client_secret) {
          clientSecret = pi.client_secret;
          paymentIntentId = pi.id;
          logStep("Got client_secret from invoice payment_intent", {
            paymentIntentId,
          });
        }
      }

      // Strategy 2: pending_setup_intent (for $0 trials / setup-only flows)
      if (!clientSecret && subscription.pending_setup_intent) {
        const setupIntent =
          typeof subscription.pending_setup_intent === "string"
            ? await stripe.setupIntents.retrieve(
                subscription.pending_setup_intent,
              )
            : (subscription.pending_setup_intent as Stripe.SetupIntent);

        if (setupIntent.client_secret) {
          clientSecret = setupIntent.client_secret;
          logStep("Got client_secret from pending_setup_intent", {
            setupIntentId: setupIntent.id,
          });

          return new Response(
            JSON.stringify({
              clientSecret,
              subscriptionId: subscription.id,
              customerId,
              amount: price.unit_amount,
              type: "setup",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            },
          );
        }
      }

      // Strategy 3: Manually create a PaymentIntent for the subscription's first invoice
      if (!clientSecret && invoice) {
        logStep("Creating manual PaymentIntent for subscription invoice", {
          invoiceId: invoice.id,
        });

        const manualPaymentIntent = await stripe.paymentIntents.create({
          customer: customerId,
          amount: price.unit_amount,
          currency: price.currency,
          automatic_payment_methods: { enabled: true },
          metadata: {
            ...stripeMetadata,
            subscriptionId: subscription.id,
            invoiceId: invoice.id,
          },
        });

        clientSecret = manualPaymentIntent.client_secret;
        paymentIntentId = manualPaymentIntent.id;
        logStep("Manual PaymentIntent created", { paymentIntentId });
      }

      if (!clientSecret) {
        logStep("ERROR: Could not obtain client_secret after all strategies", {
          subscriptionId: subscription.id,
          invoiceId: invoice?.id,
          invoiceStatus: invoice?.status,
        });
        throw new Error("Failed to create payment intent for subscription");
      }

      logStep("Returning subscription response", {
        subscriptionId: subscription.id,
        paymentIntentId,
        clientSecret: "present",
      });

      return new Response(
        JSON.stringify({
          clientSecret,
          subscriptionId: subscription.id,
          customerId,
          amount: price.unit_amount,
          type: "subscription",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // ====================================================================
    // One-time payment
    // ====================================================================
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customerId,
      amount: price.unit_amount,
      currency: price.currency,
      automatic_payment_methods: { enabled: true },
      metadata: stripeMetadata,
    });

    logStep("PaymentIntent created", {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret ? "present" : "missing",
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: price.unit_amount,
        type: "payment",
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

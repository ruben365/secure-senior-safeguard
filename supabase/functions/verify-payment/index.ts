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
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (30 / min) — this endpoint is polled by the payment-success
// page so legitimate clients call it more than once per checkout. Cap is
// generous but still blocks enumeration of session_id values against Stripe.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
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

// Stripe checkout session id format
const SESSION_ID_RE = /^cs_[A-Za-z0-9_]+$/;
// Stripe payment intent id format
const PAYMENT_INTENT_ID_RE = /^pi_[A-Za-z0-9_]+$/;

function isExpandedProduct(
  product: Stripe.Price["product"],
): product is Stripe.Product {
  return (
    typeof product === "object" &&
    product !== null &&
    "name" in product &&
    "metadata" in product
  );
}

// ============================================================================
// Trigger send-digital-download for an order. Used by both the checkout
// session and payment intent verification paths so they share the exact same
// hand-off semantics. Internal — caller has already authenticated and
// confirmed the payment was successful.
// ============================================================================
async function triggerDigitalDelivery(orderId: string): Promise<void> {
  try {
    const downloadResponse = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-digital-download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
          }`,
        },
        body: JSON.stringify({ order_id: orderId }),
      },
    );
    const downloadResult = await downloadResponse.json();
    logStep("Digital delivery result", downloadResult);
  } catch (deliveryError) {
    logStep("Warning: Digital delivery failed", {
      error: String(deliveryError),
    });
    // Never fail the verification just because delivery failed — the order
    // is paid and we can re-trigger delivery from cron / manual review.
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Per-IP rate limit
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again shortly.",
        retryAfter: rateCheck.retryAfter,
        verified: false,
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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body", verified: false }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const { session_id, payment_intent_id } = body as {
      session_id?: unknown;
      payment_intent_id?: unknown;
    };

    // Either a checkout session id OR a payment intent id may be presented.
    // Reject anything that doesn't match one of the two known shapes BEFORE
    // we burn Stripe API quota or leak existence info on random probes.
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    // ====================================================================
    // PATH B — payment_intent_id (cart flow via create-cart-payment-intent)
    // ====================================================================
    if (payment_intent_id !== undefined) {
      if (
        typeof payment_intent_id !== "string" ||
        payment_intent_id.length > 100 ||
        !PAYMENT_INTENT_ID_RE.test(payment_intent_id)
      ) {
        return new Response(
          JSON.stringify({ error: "Invalid payment_intent_id", verified: false }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      logStep("Verifying payment intent", {
        payment_intent_id: payment_intent_id.slice(0, 12) + "...",
      });

      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent_id,
      );

      logStep("PaymentIntent retrieved", { status: paymentIntent.status });

      if (paymentIntent.status !== "succeeded") {
        return new Response(
          JSON.stringify({
            verified: false,
            status: paymentIntent.status,
            message: "Payment not completed",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }

      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      );

      const md = paymentIntent.metadata || {};
      const orderId = typeof md.order_id === "string" ? md.order_id : null;
      const hasDigital = md.hasDigital === "true";
      const customerEmailMd = typeof md.customerEmail === "string"
        ? md.customerEmail
        : null;
      const customerNameMd = typeof md.customerName === "string"
        ? md.customerName
        : null;

      if (orderId) {
        // Backfill customer details on the row in case the create function
        // had to use a placeholder name. Stripe is the source of truth for
        // billing details once the payment is captured.
        const updates: Record<string, unknown> = {
          status: "confirmed",
          payment_status: "completed",
        };
        if (customerEmailMd) updates.customer_email = customerEmailMd;
        if (customerNameMd) updates.customer_name = customerNameMd;

        const { error: updateError } = await supabaseClient
          .from("partner_orders")
          .update(updates)
          .eq("id", orderId);

        if (updateError) {
          logStep("Error updating order (PI path)", {
            error: updateError.message,
          });
        } else {
          logStep("Order updated to paid (PI path)", { orderId });
        }

        // Hand off to send-digital-download. It will look up the order,
        // re-verify payment_status === completed, scan metadata.items for
        // digital products, and send the email. We pass-through whatever
        // hasDigital metadata says — but the delivery function will also
        // re-derive it from products, so a missing flag isn't fatal.
        if (hasDigital) {
          logStep("Triggering digital product delivery (PI path)", { orderId });
          await triggerDigitalDelivery(orderId);
        }
      } else {
        logStep("PaymentIntent has no order_id metadata, skipping order update");
      }

      return new Response(
        JSON.stringify({
          verified: true,
          status: "paid",
          mode: "payment",
          customer_email: customerEmailMd,
          customer_name: customerNameMd,
          product_type: hasDigital ? "digital" : "physical",
          is_subscription: false,
          amount_total: paymentIntent.amount,
          currency: paymentIntent.currency,
          digital_delivery_triggered: hasDigital && !!orderId,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // ====================================================================
    // PATH A — session_id (Stripe Checkout Session flows)
    // ====================================================================
    // Validate format BEFORE calling Stripe so we don't burn API quota
    // or leak existence info on probing requests against random session ids.
    if (
      typeof session_id !== "string" ||
      session_id.length > 100 ||
      !SESSION_ID_RE.test(session_id)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid session_id", verified: false }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    logStep("Verifying session", {
      session_id: session_id.slice(0, 12) + "...",
    });

    // Retrieve the checkout session with expanded line items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    logStep("Session retrieved", {
      status: session.payment_status,
      mode: session.mode,
    });

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({
          verified: false,
          status: session.payment_status,
          message: "Payment not completed",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // Determine product types from line items
    const lineItems = session.line_items?.data || [];
    let hasDigital = false;
    let hasPhysical = false;
    const isSubscription = session.mode === "subscription";
    const productNames: string[] = [];

    for (const item of lineItems) {
      const product = item.price?.product;
      if (isExpandedProduct(product)) {
        const productName = product.name || "Product";
        productNames.push(productName);

        // Check product metadata or name for type
        const metadata = product.metadata || {};
        const name = productName.toLowerCase();

        if (
          metadata.type === "digital" ||
          name.includes("guide") ||
          name.includes("training") ||
          name.includes("course") ||
          name.includes("book") ||
          name.includes("ebook")
        ) {
          hasDigital = true;
        } else if (
          metadata.type === "physical" ||
          name.includes("key") ||
          name.includes("wallet") ||
          name.includes("usb") ||
          name.includes("cover")
        ) {
          hasPhysical = true;
        }
      }
    }

    if (!productNames.length && session.metadata?.itemsDescription) {
      productNames.push(
        ...session.metadata.itemsDescription
          .split(",")
          .map((value: string) => value.trim())
          .filter(Boolean),
      );
    }

    if (!hasDigital && session.metadata?.hasDigital === "true") {
      hasDigital = true;
    }
    if (!hasPhysical && session.metadata?.hasPhysical === "true") {
      hasPhysical = true;
    }

    // Initialize Supabase client for database updates
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const customerEmail =
      session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name;

    // Update order status if we have an order_id in metadata. Backfill
    // customer details from Stripe (the create-* function may have stored
    // a placeholder name like the email's local-part — Stripe's
    // customer_details.name is the source of truth post-checkout).
    if (session.metadata?.order_id) {
      const updates: Record<string, unknown> = {
        // order_status enum: pending|confirmed|processing|shipped|delivered|cancelled
        status: "confirmed",
        // partner_payment_status enum: pending|processing|completed|failed
        payment_status: "completed",
      };
      if (customerEmail) updates.customer_email = customerEmail;
      if (customerName) updates.customer_name = customerName;
      if (session.payment_intent && typeof session.payment_intent === "string") {
        updates.payment_method = "stripe";
        updates.payment_transaction_id = session.payment_intent;
      }

      const { error: updateError } = await supabaseClient
        .from("partner_orders")
        .update(updates)
        .eq("id", session.metadata.order_id);

      if (updateError) {
        logStep("Error updating order", { error: updateError.message });
      } else {
        logStep("Order updated to paid", {
          orderId: session.metadata.order_id,
        });
      }
    }

    // Automatically trigger digital product delivery if there are digital
    // products and we actually have a real partner_orders.id to look up.
    // send-digital-download is locked down: it accepts ONLY an order_id
    // and looks up everything (customer email, products, file URLs)
    // server-side from the database. Call it with the service role key.
    if (hasDigital && customerEmail && session.metadata?.order_id) {
      logStep("Triggering digital product delivery", {
        order_id: session.metadata.order_id,
      });
      await triggerDigitalDelivery(session.metadata.order_id);
    }

    // Prepare response
    const response = {
      verified: true,
      status: "paid",
      mode: session.mode,
      customer_email: customerEmail,
      customer_name: customerName,
      product_type:
        hasPhysical && hasDigital
          ? "mixed"
          : hasDigital
            ? "digital"
            : hasPhysical
              ? "physical"
              : "subscription",
      is_subscription: isSubscription,
      products: productNames,
      amount_total: session.amount_total,
      currency: session.currency,
      digital_delivery_triggered: hasDigital,
    };

    logStep("Verification complete");

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage, verified: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

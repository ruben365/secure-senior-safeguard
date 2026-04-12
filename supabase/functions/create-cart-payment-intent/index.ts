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
  console.log(`[CREATE-CART-PAYMENT-INTENT] ${step}${detailsStr}`);
};

interface CartItem {
  id: string;
  productId?: string;
  name: string;
  price?: number;
  quantity: number;
}

// ============================================================================
// "House" sentinel partner. partner_orders.partner_id is NOT NULL but has no
// FK constraint and there is no `partners` table — direct InVision sales are
// represented by the nil UUID. Phase 4.12 documents this convention.
// ============================================================================
const HOUSE_PARTNER_ID = "00000000-0000-0000-0000-000000000000";

// Generate a human-readable, unique order_number. partner_orders.order_number
// is UNIQUE so the random suffix prevents collisions even if two carts land
// in the same millisecond.
function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV-${ts}-${rand}`;
}

// ============================================================================
// Per-IP rate limit (15 / minute) — public endpoint that creates Stripe
// resources and runs N database lookups per call. Cap to prevent
// enumeration / customer-creation spam and DB query amplification.
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

// ============================================================================
// Hard caps on cart shape. These prevent:
//   - DB query amplification (one .from('products').select per item)
//   - Integer overflow on lineCents = round(unitPrice*100) * quantity
//   - Charging implausibly large amounts
// ============================================================================
const MAX_ITEMS = 50;
const MAX_QUANTITY_PER_LINE = 100;
const MAX_LINE_CENTS = 10_000_000; // $100,000 per line
const MAX_TOTAL_CENTS = 50_000_000; // $500,000 total

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
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await req.json();
    const {
      customerEmail,
      customerName,
      isVeteran = false,
      items = [],
      metadata = {},
    } = body;

    // ====================================================================
    // Strict input validation
    // ====================================================================
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

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("A non-empty items array is required");
    }
    if (items.length > MAX_ITEMS) {
      throw new Error(`Cart cannot contain more than ${MAX_ITEMS} line items`);
    }

    const safeMetadata = sanitizeMetadata(metadata);

    logStep("Request validated", {
      email: normalizedEmail,
      isVeteran: !!isVeteran,
      itemCount: items.length,
    });

    // ====================================================================
    // CRITICAL SECURITY: server-side price verification
    // The client cannot be trusted to send the correct amount. Look up
    // every product in the database and recompute the cart total here.
    // We also capture product_type so the partner_orders.metadata.items
    // record knows which line items are digital — that's what
    // send-digital-download keys off later.
    // ====================================================================
    let computedTotalCents = 0;
    type Verified = {
      productId: string;
      name: string;
      qty: number;
      unitPriceCents: number;
      lineCents: number;
      productType: string;
    };
    const verified: Verified[] = [];
    let hasDigital = false;

    for (const raw of items as CartItem[]) {
      const productId = raw.productId || raw.id;
      const quantity = Number(raw.quantity);

      if (!productId || typeof productId !== "string") {
        throw new Error(`Invalid line item: missing productId`);
      }
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(`Invalid line item: quantity must be a positive integer`);
      }
      if (quantity > MAX_QUANTITY_PER_LINE) {
        throw new Error(
          `Invalid line item: quantity exceeds limit of ${MAX_QUANTITY_PER_LINE}`,
        );
      }

      const { data: product, error: productErr } = await supabase
        .from("products")
        .select("id, name, base_price, status, product_type")
        .eq("id", productId)
        .single();

      if (productErr || !product) {
        throw new Error(`Product not found: ${productId}`);
      }

      if (product.status !== "active") {
        throw new Error(`Product is not available: ${product.name}`);
      }

      const unitPrice = Number(product.base_price);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
        throw new Error(`Invalid price for product ${product.name}`);
      }

      const unitPriceCents = Math.round(unitPrice * 100);
      const lineCents = unitPriceCents * quantity;
      if (!Number.isFinite(lineCents) || lineCents <= 0) {
        throw new Error(`Invalid computed line amount for ${product.name}`);
      }
      if (lineCents > MAX_LINE_CENTS) {
        throw new Error(
          `Line item ${product.name} exceeds per-line maximum`,
        );
      }

      computedTotalCents += lineCents;
      if (computedTotalCents > MAX_TOTAL_CENTS) {
        throw new Error("Cart total exceeds maximum allowed");
      }

      const productType = String(product.product_type || "physical");
      if (productType === "digital") hasDigital = true;

      verified.push({
        productId: product.id,
        name: product.name,
        qty: quantity,
        unitPriceCents,
        lineCents,
        productType,
      });
    }

    // Backwards-compatible alias used later for the Stripe metadata description.
    const lineSummary = verified.map((v) => ({
      name: v.name,
      qty: v.qty,
      lineCents: v.lineCents,
    }));

    // Apply 10% veteran discount server-side (matches the rest of the platform)
    let discountCents = 0;
    if (isVeteran) {
      discountCents = Math.round(computedTotalCents * 0.1);
      computedTotalCents -= discountCents;
    }

    if (computedTotalCents < 50) {
      throw new Error("Order total must be at least $0.50");
    }
    if (computedTotalCents > MAX_TOTAL_CENTS) {
      // Belt-and-suspenders — already checked per-line above.
      throw new Error("Order total exceeds maximum allowed");
    }

    logStep("Server-verified amount", {
      computedTotalCents,
      discountCents,
      lineCount: lineSummary.length,
    });

    // Check if customer already exists
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
          isVeteran: isVeteran ? "true" : "false",
        },
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    const itemsDescription = lineSummary
      .map((l) => `${l.name} x${l.qty}`)
      .join(", ");

    // ====================================================================
    // Phase 4.12 — partner_orders bridge
    //
    // Insert a pending partner_orders row BEFORE creating the PaymentIntent.
    // The row's UUID is then passed into the PaymentIntent metadata as
    // `order_id`, which lets verify-payment confirm the order and trigger
    // send-digital-download once the customer completes payment.
    //
    // Without this row, cart purchases of digital products silently never
    // delivered — verify-payment / send-digital-download both key off the
    // partner_orders.id and metadata.items, and neither was ever populated.
    //
    // The line items are persisted under partner_orders.metadata.items in the
    // exact shape send-digital-download expects (productId, name, quantity,
    // type) so the delivery function needs no further changes.
    //
    // If the Stripe PaymentIntent creation fails AFTER this insert, we
    // delete the orphan row to keep the table clean.
    // ====================================================================
    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();
    const totalDollars = Number((computedTotalCents / 100).toFixed(2));

    const orderItemsForMetadata = verified.map((v) => ({
      productId: v.productId,
      name: v.name,
      quantity: v.qty,
      unitPriceCents: v.unitPriceCents,
      type: v.productType,
    }));

    const { error: insertOrderError } = await supabase
      .from("partner_orders")
      .insert({
        id: orderId,
        order_number: orderNumber,
        partner_id: HOUSE_PARTNER_ID,
        customer_name: safeName || normalizedEmail.split("@")[0] || "Customer",
        customer_email: normalizedEmail,
        customer_id: null,
        shipping_address: {},
        subtotal: totalDollars,
        total_amount: totalDollars,
        discount_amount: Number((discountCents / 100).toFixed(2)),
        status: "pending",
        payment_status: "pending",
        metadata: {
          source: "cart-payment-intent",
          isVeteran: !!isVeteran,
          items: orderItemsForMetadata,
          itemsDescription: itemsDescription.slice(0, 480),
          createdAtIso: new Date().toISOString(),
        },
      });

    if (insertOrderError) {
      logStep("ERROR: failed to create partner_orders row", {
        error: insertOrderError.message,
      });
      throw new Error("Failed to create order record");
    }

    logStep("partner_orders pending row created", {
      orderId,
      orderNumber,
      hasDigital,
    });

    // Create PaymentIntent with the SERVER-COMPUTED amount
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        customer: customerId,
        amount: computedTotalCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          // Caller-supplied metadata FIRST so explicit fields below win on conflict.
          ...safeMetadata,
          // Critical: lets verify-payment locate the partner_orders row.
          order_id: orderId,
          order_number: orderNumber,
          isVeteran: isVeteran ? "true" : "false",
          customerEmail: normalizedEmail,
          customerName: safeName,
          itemsDescription: itemsDescription.substring(0, 480),
          itemCount: lineSummary.length.toString(),
          veteranDiscountCents: discountCents.toString(),
          hasDigital: hasDigital ? "true" : "false",
          paymentType: "cart",
        },
      });
    } catch (stripeError) {
      // Stripe failed AFTER we wrote the partner_orders row. Delete it so
      // we don't accumulate orphan pending orders. Best-effort cleanup —
      // if the delete also fails we just leave it for the cron-cleanup
      // to handle later.
      logStep("Stripe paymentIntent creation failed, cleaning up partner_orders", {
        orderId,
        error: stripeError instanceof Error ? stripeError.message : String(stripeError),
      });
      try {
        await supabase
          .from("partner_orders")
          .delete()
          .eq("id", orderId);
      } catch (cleanupError) {
        logStep("WARNING: failed to clean up orphan partner_orders row", {
          orderId,
          error: cleanupError instanceof Error
            ? cleanupError.message
            : String(cleanupError),
        });
      }
      throw stripeError;
    }

    // Persist Stripe ids on the order so we can audit / reconcile later.
    await supabase
      .from("partner_orders")
      .update({
        payment_method: "stripe",
        payment_transaction_id: paymentIntent.id,
      })
      .eq("id", orderId);

    logStep("PaymentIntent created", {
      paymentIntentId: paymentIntent.id,
      orderId,
      amount: paymentIntent.amount,
      clientSecret: paymentIntent.client_secret ? "present" : "missing",
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        customerId,
        amount: paymentIntent.amount,
        veteranDiscountCents: discountCents,
        orderId,
        orderNumber,
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

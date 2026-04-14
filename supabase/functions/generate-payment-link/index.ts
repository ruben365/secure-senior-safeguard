import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[${timestamp}] [QR-PAYMENT-LINK] ${step}${detailsStr}`);
};

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function sanitizeMetadata(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  let count = 0;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= 40) break;
    if (typeof key !== "string" || key.length > 40) continue;
    if (value == null) continue;
    const stringified = typeof value === "string" ? value : JSON.stringify(value);
    if (!stringified || stringified.length > 480) continue;
    out[key] = stringified.slice(0, 480);
    count++;
  }
  return out;
}

// ============================================================================
// Per-IP rate limit (15 / minute) — public endpoint that creates Stripe
// payment-link resources. Cap to prevent enumeration / spam.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 15;
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
// Origin allow-list. Stripe redirects users to these URLs after the payment
// link completes. An attacker who could spoof Origin would be able to point
// the post-payment redirect at a phishing site they control. We resolve only
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
// Hard caps. Stripe payment-link totals max out around $999,999.99 but we
// don't sell anything that expensive. Cap aggressively at $10,000 / 50 line
// items so a buggy or malicious client can't create absurd links.
// ============================================================================
const MIN_AMOUNT_CENTS = 50; // Stripe minimum
const MAX_AMOUNT_CENTS = 1_000_000; // $10,000.00
const MAX_ITEMS = 50;
const MAX_ITEM_NAME = 200;
const MAX_QUANTITY = 1000;

const sanitizeText = (value: unknown, maxLen: number) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().slice(0, 8);
  logStep(`Request ${requestId} - Function invoked`, { method: req.method });

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
        requestId,
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep(`Request ${requestId} - ERROR: Missing STRIPE_SECRET_KEY`);
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const {
      amount,
      items: rawItems,
      customerEmail,
      customerName,
      paymentType,
      metadata,
    } = body;

    // ====================================================================
    // Validate amount (cents). Reject NaN, infinite, negative, non-integer
    // and over-cap values. The client is sending CENTS in `amount`, NOT
    // dollars — that's how the original function worked. Keep that.
    // ====================================================================
    const amountCents = Number(amount);
    if (
      !Number.isFinite(amountCents) ||
      !Number.isInteger(amountCents) ||
      amountCents < MIN_AMOUNT_CENTS ||
      amountCents > MAX_AMOUNT_CENTS
    ) {
      throw new Error(
        `Amount must be an integer between ${MIN_AMOUNT_CENTS} cents and $${MAX_AMOUNT_CENTS / 100}.`,
      );
    }

    // ====================================================================
    // Validate items if provided. Cap length, sanitize names, validate
    // numeric fields. CRITICAL: enforce that the items total matches the
    // requested amount (within 1 cent rounding) — the original function
    // only LOGGED the mismatch and accepted whatever the client sent, so
    // a malicious client could claim items worth $5 but charge $5000.
    // ====================================================================
    const items: CartItem[] = [];
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      if (rawItems.length > MAX_ITEMS) {
        throw new Error(`Too many items (max ${MAX_ITEMS}).`);
      }
      for (const raw of rawItems) {
        if (!raw || typeof raw !== "object") {
          throw new Error("Invalid item shape.");
        }
        const name = sanitizeText(raw.name, MAX_ITEM_NAME);
        const price = Number(raw.price);
        const quantity = Number(raw.quantity);
        if (!name) {
          throw new Error("Item name is required.");
        }
        if (
          !Number.isFinite(price) ||
          price <= 0 ||
          price > MAX_AMOUNT_CENTS / 100
        ) {
          throw new Error("Invalid item price.");
        }
        if (
          !Number.isFinite(quantity) ||
          !Number.isInteger(quantity) ||
          quantity <= 0 ||
          quantity > MAX_QUANTITY
        ) {
          throw new Error("Invalid item quantity.");
        }
        items.push({ name, price, quantity });
      }

      const calculatedTotalCents = items.reduce(
        (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
        0,
      );
      if (Math.abs(calculatedTotalCents - amountCents) > 1) {
        throw new Error(
          `Items total ${calculatedTotalCents} cents does not match requested amount ${amountCents} cents.`,
        );
      }
      if (calculatedTotalCents > MAX_AMOUNT_CENTS) {
        throw new Error("Items total exceeds maximum allowed.");
      }
    }

    const safeEmail = sanitizeText(customerEmail, 254).toLowerCase();
    if (safeEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(safeEmail)) {
        throw new Error("Invalid email format.");
      }
    }

    const safeName = sanitizeText(customerName, 100);
    const safeMetadata = sanitizeMetadata(metadata);

    logStep(`Request ${requestId} - Validated`, {
      amountCents,
      itemCount: items.length,
      email: safeEmail ? `${safeEmail.slice(0, 3)}***` : "(none)",
    });

    // Build Stripe line items. If no items provided, fall back to a single
    // generic "Order Total" line at the requested amount.
    const lineItems =
      items.length > 0
        ? items.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: { name: item.name },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          }))
        : [
            {
              price_data: {
                currency: "usd",
                product_data: { name: "Order Total" },
                unit_amount: amountCents,
              },
              quantity: 1,
            },
          ];

    const origin = resolveOrigin(req);

    const paymentLink = await stripe.paymentLinks.create({
      line_items: lineItems,
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&method=qr`,
        },
      },
      metadata: {
        request_id: requestId,
        customer_email: safeEmail.slice(0, 480),
        customer_name: safeName.slice(0, 480),
        item_count: String(items.length),
        amount_cents: String(amountCents),
        payment_method: "qr_code",
        payment_type: sanitizeText(paymentType, 40),
        ...safeMetadata,
      },
      payment_intent_data: {
        metadata: {
          customerEmail: safeEmail.slice(0, 480),
          customerName: safeName.slice(0, 480),
          paymentType: sanitizeText(paymentType, 40),
          ...safeMetadata,
        },
      },
    });

    logStep(`Request ${requestId} - Payment link created`, {
      paymentLinkId: paymentLink.id,
      active: paymentLink.active,
    });

    // Best-effort analytics log. Don't fail the request on logging errors.
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false },
        });
        await supabase.from("analytics_events").insert({
          event_name: "qr_payment_link_generated",
          event_category: "payment",
          event_data: {
            request_id: requestId,
            payment_link_id: paymentLink.id,
            amount_cents: amountCents,
            item_count: items.length,
            customer_email: safeEmail || null,
          },
          ip_address: clientIP,
        });
        logStep(`Request ${requestId} - Analytics event logged`);
      }
    } catch (analyticsError) {
      logStep(
        `Request ${requestId} - Analytics logging failed (non-critical)`,
        { error: String(analyticsError) },
      );
    }

    return new Response(
      JSON.stringify({
        url: paymentLink.url,
        id: paymentLink.id,
        paymentLinkId: paymentLink.id,
        requestId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep(`Request ${requestId} - FATAL ERROR`, { message: errorMessage });

    return new Response(
      JSON.stringify({ error: errorMessage, requestId }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

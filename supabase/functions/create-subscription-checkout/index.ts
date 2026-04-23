import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  console.log(
    `[CREATE-SUBSCRIPTION-CHECKOUT] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`,
  );
};

// ============================================================================
// Per-IP rate limit (10 / minute) — public endpoint that creates Stripe
// checkout sessions. Cap to prevent abuse / Stripe spend exhaustion.
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

const resolveReturnPath = (value: unknown) => {
  if (typeof value !== "string") return "/portal";
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/portal";
  }
  if (trimmed.length > 200) {
    return "/portal";
  }
  return trimmed;
};

// ============================================================================
// Plan tier allow-list. The list is small and known; restrict so the client
// can't write arbitrary values into Stripe metadata that downstream code
// might trust as a routing key.
// ============================================================================
const ALLOWED_PLAN_TIERS = new Set<string>([
  // Current tiers
  "basic",
  "pro",
  "enterprise",
  // Legacy tiers (kept for backward compatibility)
  "starter",
  "essential",
  "professional",
  "premium",
  "family",
]);

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
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!stripeKey || !supabaseUrl || !anonKey) {
      throw new Error("Missing required server configuration.");
    }

    // We use the anon client to call auth.getUser(token), which is the
    // ONLY supported way to verify the JWT in an edge function. We do NOT
    // use this client to write any state.
    const supabaseClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });

    const body = await req.json();
    const {
      priceId,
      serviceName,
      planTier,
      customerEmail,
      customerName,
      returnTo,
    } = body;

    // ====================================================================
    // Strict input validation. priceId is the AUTHORITATIVE source of the
    // amount that will be charged — we look it up directly in Stripe and
    // verify it's active before creating the session.
    // ====================================================================
    if (!priceId || typeof priceId !== "string") {
      throw new Error("priceId is required");
    }
    if (!/^price_[A-Za-z0-9]+$/.test(priceId) || priceId.length > 100) {
      throw new Error("Invalid priceId format");
    }

    const safePlanTier =
      typeof planTier === "string" && ALLOWED_PLAN_TIERS.has(planTier)
        ? planTier
        : "starter";

    const safeServiceName =
      typeof serviceName === "string" ? serviceName.slice(0, 100).trim() : "";

    const safeCustomerName =
      typeof customerName === "string" ? customerName.slice(0, 100).trim() : "";
    const safeReturnTo = resolveReturnPath(returnTo);

    // ====================================================================
    // Resolve the email. If a JWT is present, use the authenticated user's
    // email. Otherwise fall back to customerEmail (guest checkout).
    // ====================================================================
    let userEmail: string | null = null;
    let userId: string | null = null;

    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      const user = data.user;
      if (user?.email) {
        userEmail = user.email.toLowerCase().trim();
        userId = user.id;
        logStep("User authenticated", { userId, email: userEmail });
      }
    }

    if (!userEmail) {
      if (typeof customerEmail === "string" && customerEmail.trim()) {
        const normalized = customerEmail.toLowerCase().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalized) || normalized.length > 254) {
          throw new Error("Invalid email format");
        }
        userEmail = normalized;
      }
    }

    logStep("Using email for checkout", {
      email: userEmail || "stripe-checkout-collects-email",
    });

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    // ====================================================================
    // Pull the price from Stripe and verify it's active and non-zero. The
    // price.unit_amount returned here is the AUTHORITATIVE charge. The
    // client cannot override it.
    // ====================================================================
    const price = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });

    if (!price.active) {
      throw new Error("This price is no longer available");
    }
    const product = price.product as Stripe.Product | string;
    if (typeof product !== "string" && !product.active) {
      throw new Error("This product is no longer available");
    }
    if (!price.unit_amount || price.unit_amount < 50) {
      throw new Error("Invalid price (must be at least $0.50)");
    }
    if (price.recurring == null) {
      throw new Error("This price is not a subscription price");
    }

    logStep("Price verified", {
      priceId,
      amount: price.unit_amount,
      currency: price.currency,
    });

    // Find existing customer if any (don't create yet — Stripe Checkout
    // will create one as part of the session if customer_email is given)
    const customers = userEmail
      ? await stripe.customers.list({
          email: userEmail,
          limit: 1,
        })
      : { data: [] };
    let customerId: string | null = null;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    const origin = resolveOrigin(req);

    // ====================================================================
    // NOTE on discount codes: the previous version of this function looked
    // up codes in a `discount_codes` table that no longer exists. The
    // entire discount feature has been silently broken. Removing the dead
    // path here. If discount codes are needed in the future they should
    // be implemented via Stripe Coupon objects directly, OR via a
    // re-introduced `discount_codes` table with proper RLS and admin UI.
    // ====================================================================

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      ...(customerId
        ? { customer: customerId }
        : userEmail
          ? { customer_email: userEmail }
          : {}),
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/payment-success?type=subscription&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      metadata: {
        user_id: userId || "guest",
        service_name: safeServiceName.slice(0, 480),
        plan_tier: safePlanTier,
        customer_email: userEmail || "",
        customer_name: safeCustomerName.slice(0, 480),
        return_to: safeReturnTo,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);
    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

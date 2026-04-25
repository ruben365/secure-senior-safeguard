import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const ALLOWED_ORIGINS = new Set<string>([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
]);
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

const resolveOrigin = (req: Request): string => {
  const requested = (req.headers.get("origin") || "").trim().toLowerCase();
  return ALLOWED_ORIGINS.has(requested) ? requested : CANONICAL_ORIGIN;
};

const corsHeaders = (req: Request) => ({
  "Access-Control-Allow-Origin": resolveOrigin(req),
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const log = (step: string, details?: unknown) => {
  const d = details ? ` — ${JSON.stringify(details)}` : "";
  console.log(`[CREATE-WEBDESIGN-CHECKOUT] ${step}${d}`);
};

// Server-side price registry — never trust client-supplied amounts (issue 3)
const PACKAGE_PRICES: Record<string, { name: string; price: number }> = {
  landing:   { name: "Landing Page",     price: 1200 },
  business:  { name: "Business Website", price: 2900 },
  ecommerce: { name: "E-Commerce",       price: 6500 },
};

const ADDON_PRICES: Record<string, number> = {
  logo: 400, domain_setup: 100, email_setup: 150, chatbot: 950,
  seo_geo: 800, content: 200, extra_page: 250, revisions_30: 450,
  blog: 550, booking: 650, crm: 1200, automation: 700,
  maintenance: 80, ongoing_upd: 60, perf_opt: 400, security_mon: 40,
  enh_pages: 250, enh_redesign: 350, enh_speed: 450,
  enh_seo: 600, enh_integrations: 400,
};

interface AddOn {
  id: string;
  label: string;
  price: number;
  qty?: number;
}

interface RequestBody {
  packageName: string;
  packageType: string;
  addOns: AddOn[];
  orderId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}

serve(async (req: Request) => {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Missing STRIPE_SECRET_KEY");

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const body: RequestBody = await req.json();
    const {
      packageName,
      packageType,
      addOns,
      orderId,
      customerEmail,
      successUrl,
      cancelUrl,
    } = body;

    log("Received request", { packageType, addOnsCount: addOns?.length });

    if (!packageType || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: packageType, successUrl, cancelUrl" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } },
      );
    }

    // Derive amount server-side from registered prices (issue 3)
    const pkgData = PACKAGE_PRICES[packageType];
    if (!pkgData) {
      return new Response(
        JSON.stringify({ error: "Invalid package type" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } },
      );
    }

    let computedAmount = pkgData.price;
    const validAddOns: AddOn[] = [];
    if (Array.isArray(addOns)) {
      for (const addon of addOns) {
        const addonPrice = ADDON_PRICES[addon.id];
        if (addonPrice !== undefined) {
          const qty = Math.max(1, Math.min(50, addon.qty ?? 1));
          computedAmount += addonPrice * qty;
          validAddOns.push({ ...addon, price: addonPrice, qty });
        }
      }
    }

    if (computedAmount < 1 || computedAmount > 1_000_000) {
      return new Response(
        JSON.stringify({ error: "Computed amount out of range" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } },
      );
    }

    log("Server-side computed amount", { computedAmount, packageType });

    // Build description from add-ons
    const addOnsDesc =
      validAddOns.length > 0
        ? `Add-ons: ${validAddOns.map((a) => `${a.label} ($${a.price}${(a.qty ?? 1) > 1 ? ` x${a.qty}` : ""})`).join(", ")}`
        : "Base package — no add-ons selected";

    // Fix issue 10: properly append session_id without breaking existing query params
    const separator = successUrl.includes("?") ? "&" : "?";
    const successUrlWithSession = `${successUrl}${separator}session_id={CHECKOUT_SESSION_ID}`;

    // Create Stripe Checkout Session using inline price_data (issue 4)
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${packageName || pkgData.name} — Web Design`,
              description: addOnsDesc,
              metadata: { packageType: packageType ?? "" },
            },
            unit_amount: Math.round(computedAmount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: successUrlWithSession,
      cancel_url: cancelUrl,
      metadata: {
        order_id: orderId ?? "",
        package_type: packageType ?? "",
        add_ons_json: JSON.stringify(validAddOns).slice(0, 480),
        source: "web_design",
      },
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail.toLowerCase().trim();
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    log("Stripe session created", { sessionId: session.id });

    // Update order with session ID if one was provided
    if (orderId) {
      const { error: updateError } = await supabase
        .from("web_design_orders")
        .update({ stripe_session_id: session.id, status: "awaiting_payment" })
        .eq("id", orderId);

      if (updateError) {
        log("Order update warning", { orderId, error: updateError.message });
      }
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...headers, "Content-Type": "application/json" } },
    );
  } catch (err) {
    log("Error", { message: err instanceof Error ? err.message : String(err) });
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal error" }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } },
    );
  }
});

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

interface AddOn {
  id: string;
  label: string;
  price: number;
}

interface RequestBody {
  packageName: string;
  packageType: string;
  totalAmount: number;      // dollars
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
      totalAmount,
      addOns,
      orderId,
      customerEmail,
      successUrl,
      cancelUrl,
    } = body;

    log("Received request", { packageType, totalAmount, addOnsCount: addOns?.length });

    if (!packageName || !totalAmount || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: packageName, totalAmount, successUrl, cancelUrl" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } },
      );
    }

    if (totalAmount < 1 || totalAmount > 1_000_000) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } },
      );
    }

    // Build description from add-ons
    const addOnsDesc =
      Array.isArray(addOns) && addOns.length > 0
        ? `Add-ons: ${addOns.map((a) => `${a.label} ($${a.price})`).join(", ")}`
        : "Base package — no add-ons selected";

    // Create Stripe Checkout Session using inline price_data (no pre-created price required)
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${packageName} — Web Design`,
              description: addOnsDesc,
              metadata: { packageType: packageType ?? "" },
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        order_id: orderId ?? "",
        package_type: packageType ?? "",
        add_ons_json: JSON.stringify(addOns ?? []).slice(0, 480),
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

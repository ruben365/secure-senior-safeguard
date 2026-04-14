import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: Set STRIPE_WEBHOOK_SECRET in Supabase project secrets
// TODO: Set STRIPE_SECRET_KEY in Supabase project secrets
// supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
// supabase secrets set STRIPE_SECRET_KEY=sk_...

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.text();

    // Verify webhook signature using Stripe's library
    // NOTE: Deno-compatible Stripe signature verification
    const stripe = (await import("https://esm.sh/stripe@14?target=deno")).default;
    const stripeClient = stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
      apiVersion: "2024-04-10",
      httpClient: stripe.createFetchHttpClient(),
    });

    let event;
    try {
      event = await stripeClient.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Record<string, unknown>;
        const userId = (session.metadata as Record<string, string>)?.user_id;
        const productType = (session.metadata as Record<string, string>)?.product_type;

        if (userId) {
          await supabase.from("orders").insert({
            user_id: userId,
            stripe_session_id: session.id,
            amount: (session.amount_total as number) / 100,
            currency: session.currency,
            status: "completed",
            product_type: productType ?? "unknown",
          });
        }
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Record<string, unknown>;
        console.log("Payment intent succeeded:", paymentIntent.id);
        // TODO: Update order status for one-time payments
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Record<string, unknown>;
        const customerId = subscription.customer as string;
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase.from("subscriptions").upsert({
            user_id: profile.id,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Record<string, unknown>;
        await supabase
          .from("subscriptions")
          .update({ status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

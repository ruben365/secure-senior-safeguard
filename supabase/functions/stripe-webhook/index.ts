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
        const metadata = (session.metadata as Record<string, string>) ?? {};
        const orderId = metadata.order_id;

        if (orderId) {
          // Row was created by create-cart-payment-intent; promote it to confirmed.
          const updates: Record<string, unknown> = {
            status: "confirmed",
            payment_status: "completed",
          };
          if (session.payment_intent && typeof session.payment_intent === "string") {
            updates.payment_method = "stripe";
            updates.payment_transaction_id = session.payment_intent;
          }
          const { error } = await supabase
            .from("partner_orders")
            .update(updates)
            .eq("id", orderId);
          if (error) {
            console.error("Error updating partner_orders (checkout.session.completed):", error.message);
          } else {
            console.log("partner_orders confirmed via webhook", { orderId });
          }
        } else {
          // Subscription or payment-link checkout with no pre-created order row.
          console.log("checkout.session.completed: no order_id in metadata, skipping partner_orders update", { sessionId: session.id });
        }
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Record<string, unknown>;
        const piMetadata = (paymentIntent.metadata as Record<string, string>) ?? {};
        const orderId = piMetadata.order_id;

        if (orderId) {
          const { error } = await supabase
            .from("partner_orders")
            .update({ status: "confirmed", payment_status: "completed" })
            .eq("id", orderId);
          if (error) {
            console.error("Error updating partner_orders (payment_intent.succeeded):", error.message);
          } else {
            console.log("partner_orders confirmed via webhook (PI)", { orderId });
          }
        } else {
          console.log("payment_intent.succeeded: no order_id in metadata", { piId: paymentIntent.id });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Record<string, unknown>;
        const customerId = subscription.customer as string;

        // Fetch Stripe customer to get email — needed for both the email field
        // and as a fallback key to locate the matching profile row.
        let customerEmail: string | null = null;
        try {
          const customer = await stripeClient.customers.retrieve(customerId);
          if (customer && !("deleted" in customer) && customer.email) {
            customerEmail = customer.email;
          }
        } catch (err) {
          console.error("Error fetching Stripe customer:", err);
        }

        // 1. Try to find profile by stripe_customer_id.
        const { data: profileById } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        // 2. Fall back to email lookup if no profile found by customer ID.
        let userId = profileById?.id ?? null;
        if (!userId && customerEmail) {
          const { data: profileByEmail } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", customerEmail)
            .maybeSingle();
          userId = profileByEmail?.id ?? null;
        }

        const upsertPayload: Record<string, unknown> = {
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          status: subscription.status,
          updated_at: new Date().toISOString(),
        };
        if (userId) upsertPayload.user_id = userId;
        if (customerEmail) upsertPayload.email = customerEmail;

        const { error: upsertError } = await supabase
          .from("subscriptions")
          .upsert(upsertPayload, { onConflict: "stripe_subscription_id" });

        if (upsertError) {
          console.error("Error upserting subscription:", upsertError.message);
        } else {
          console.log("Subscription upserted", { subscriptionId: subscription.id, userId: userId ?? "unknown" });
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

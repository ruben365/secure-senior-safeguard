import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// TOMBSTONE — create-product-payment is permanently retired.
//
// This was a Stripe Checkout Session-based single-product purchase flow.
// A grep across src/ for "create-product-payment" returned ZERO callers.
// All single-product purchases now go through one of two live paths:
//
//   1. EnhancedCheckoutDialog / SmartPaymentDialog → create-cart-payment-intent
//      (cart with a single line item).
//   2. EmbeddedPaymentModal → create-payment-intent (Stripe priceId based,
//      used for service tiers and admin-created prices).
//
// Reasons to tombstone rather than maintain:
//   - It maintained its own product lookup, price verification, and Stripe
//      Checkout Session creation, none of which the live flows use.
//   - It never inserted a partner_orders row, so it could not participate in
//      the Phase 4.12 digital delivery hand-off — purchases through this
//      endpoint would have silently failed to deliver digital products.
//   - Carrying a redundant payment endpoint in production multiplies the
//      attack surface for Stripe quota abuse and DB query amplification with
//      no benefit to real users.
//
// Returning 410 Gone is the correct semantic. config.toml leaves verify_jwt
// = true so this tombstone is not reachable without a Supabase JWT.
// ============================================================================

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({
      error: "create-product-payment has been retired",
      replacement: "create-cart-payment-intent (cart) or create-payment-intent (priceId)",
    }),
    {
      status: 410,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

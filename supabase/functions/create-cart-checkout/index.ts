import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// TOMBSTONE — create-cart-checkout is permanently retired.
//
// This was a Stripe Checkout Session-based cart flow. The live cart flow now
// goes through create-cart-payment-intent (Stripe PaymentIntent + Elements),
// which is the path the EnhancedCheckoutDialog and SmartPaymentDialog actually
// call. A grep across src/ for "create-cart-checkout" returned ZERO callers,
// confirming this function had become dead code.
//
// Carrying two parallel cart endpoints in production is a security liability:
//   1. Bug fixes have to be replicated in two places (and weren't — the
//      partner_orders bridge added in Phase 4.12 only landed in
//      create-cart-payment-intent).
//   2. The dead path keeps a public attack surface for Stripe quota abuse,
//      product enumeration, and DB query amplification with no real users
//      benefiting from it.
//   3. Future audits would have to re-derive that the function is dead,
//      wasting effort and risking the wrong conclusion.
//
// Returning 410 Gone is the correct semantic — the resource existed and is
// permanently retired. config.toml leaves verify_jwt = true so this tombstone
// is not even reachable without a Supabase JWT.
//
// Replacement: create-cart-payment-intent (which inserts a partner_orders row
// before creating the PaymentIntent so verify-payment can hand off to
// send-digital-download after a successful confirmation).
// ============================================================================

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({
      error: "create-cart-checkout has been retired",
      replacement: "create-cart-payment-intent",
    }),
    {
      status: 410,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

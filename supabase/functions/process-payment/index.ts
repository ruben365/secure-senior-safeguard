import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// TOMBSTONE — process-payment is permanently retired.
//
// This was a Lovable-era cart checkout endpoint. The cart flow now goes
// through create-cart-payment-intent + complete-payment, which are
// hardened, rate-limited, and have proper customerInfo validation.
//
// The original process-payment had a number of unfixed issues:
//   1. No rate limit (Stripe quota DoS).
//   2. No customerInfo validation (length, email regex, address fields).
//   3. No max-items / max-quantity caps (DB query amplification + integer
//      overflow risk on lineSubtotalCents).
//   4. Old Stripe SDK (14.21.0) and old apiVersion (2023-10-16).
//   5. No idempotency key (double-charge on retry).
//
// Rather than carry forward a duplicate cart codepath, the function is
// returned as 410 Gone. The gateway still requires a JWT (verify_jwt=true)
// so the tombstone itself isn't a public surface.
//
// Audit trail: zero callers detected in src/, only stale comments in
// complete-payment/index.ts and send-booking-confirmation/index.ts that
// have been updated to remove the reference.
// ============================================================================

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({
      error: "process-payment has been retired",
      replacement: "create-cart-payment-intent + complete-payment",
    }),
    {
      status: 410,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

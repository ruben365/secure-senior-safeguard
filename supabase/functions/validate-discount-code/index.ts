import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// validate-discount-code is DECOMMISSIONED (Phase 4.9d).
//
// Both the table (`discount_codes`) and every frontend call site have been
// removed. The product policy is "no free / no discounts" — only the veteran
// flag in payments survives, and that's a separate flow that does not go
// through this function.
//
// We keep the deployed function as a 410 Gone stub so that:
//   1. Any old client still hitting the URL gets a clear, deterministic
//      response instead of a generic 404 from the gateway.
//   2. The Supabase Functions list explicitly documents that this is
//      intentionally retired (otherwise someone might "fix" the 404 by
//      redeploying a half-broken version of the old code).
//
// DO NOT add database calls here. DO NOT re-enable. If discounts are ever
// needed in the future, use Stripe Coupon objects directly.
// ============================================================================

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({
      valid: false,
      error: "Discount codes are not supported.",
      decommissioned: true,
    }),
    {
      status: 410,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    },
  );
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// TOMBSTONE — serve-download is permanently retired.
//
// This was a Lovable-era download-token endpoint that had several critical
// security issues and ZERO callers in the codebase:
//
//   1. BROKEN CRYPTO: Used a djb2-style 32-bit hash (`hash << 5 - hash + b`)
//      as a "signature". A 32-bit hex output is trivially brute-forceable
//      and is in no sense a MAC. Anyone who knew the order_id and product
//      name could mint a valid token in seconds.
//
//   2. STORED XSS: `productName` from the (forgeable) token was interpolated
//      raw into the friendly "Download Processing" HTML response, including
//      a <strong> wrapper. With the broken hash above, an attacker could
//      forge a token containing <script> and have it rendered.
//
//   3. PATH TRAVERSAL: `productName.toLowerCase().replace(/\s+/g, "-")` was
//      used as the storage object name with no character allow-list. With
//      forged tokens, an attacker could probe arbitrary paths in the
//      `digital-products` bucket.
//
//   4. NO RATE LIMIT: Public endpoint that triggers Storage downloads and
//      DB writes for every request. Trivial DoS / cost amplifier.
//
// The cart / digital-product delivery flow now uses send-digital-download,
// which: requires a Supabase JWT at the gateway, validates ownership via
// the partner_orders row, only releases paid orders, and emails verified
// internal links from products.file_url. There is no longer any token
// scheme to maintain.
//
// Returned as 410 Gone. The gateway still calls this with verify_jwt=false
// because that matches the historical config — the body itself does no
// work and exposes nothing.
// ============================================================================

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({
      error: "serve-download has been retired",
      replacement: "send-digital-download",
    }),
    {
      status: 410,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});

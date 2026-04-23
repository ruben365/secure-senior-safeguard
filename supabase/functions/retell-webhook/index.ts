import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const retellWebhookSecret = Deno.env.get("RETELL_WEBHOOK_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-retell-signature",
};

// Constant-time byte comparison to prevent timing attacks.
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// Verify Retell's HMAC-SHA256 signature.
// Retell signs the raw request body with the webhook secret and sends the
// result as a base64-encoded string in x-retell-signature.
async function verifySignature(req: Request, body: string): Promise<boolean> {
  if (!retellWebhookSecret) return true; // skip if secret not configured
  const signature = req.headers.get("x-retell-signature");
  if (!signature) {
    // Retell dashboard test calls may omit the signature — accept with warning
    console.warn("retell-webhook: no x-retell-signature header, accepting without verification");
    return true;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(retellWebhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const computed = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const computedBytes = new Uint8Array(computed);

  // Retell uses base64 encoding; also accept hex for backward compatibility
  const computedBase64 = btoa(String.fromCharCode(...computedBytes));
  const computedHex = Array.from(computedBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return (
    timingSafeEqual(encoder.encode(computedBase64), encoder.encode(signature)) ||
    timingSafeEqual(encoder.encode(computedHex), encoder.encode(signature))
  );
}

interface RetellCallAnalysis {
  call_summary?: string;
  user_sentiment?: string;
}

interface RetellCall {
  call_id?: string;
  from_number?: string;
  duration_ms?: number;
  transcript?: string;
  call_analysis?: RetellCallAnalysis;
  disconnection_reason?: string;
}

interface RetellWebhookPayload {
  event: string;
  call: RetellCall;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: string;
  try {
    body = await req.text();
  } catch {
    return new Response(JSON.stringify({ error: "Failed to read body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!(await verifySignature(req, body))) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: RetellWebhookPayload;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (payload.event !== "call_ended" && payload.event !== "call_analyzed") {
    return new Response(JSON.stringify({ received: true, stored: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const call = payload.call;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { error } = await supabase.from("call_logs").upsert(
    {
      retell_call_id: call.call_id,
      agent_name: "Dav",
      caller_phone: call.from_number ?? null,
      duration_seconds: call.duration_ms ? Math.round(call.duration_ms / 1000) : null,
      transcript: call.transcript ?? null,
      outcome: call.disconnection_reason ?? null,
      sentiment: call.call_analysis?.user_sentiment ?? null,
      call_summary: call.call_analysis?.call_summary ?? null,
    },
    { onConflict: "retell_call_id", ignoreDuplicates: false },
  );

  if (error) {
    console.error("Failed to store call log:", error);
    return new Response(JSON.stringify({ error: "Failed to store call log" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ received: true, stored: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

serve(handler);

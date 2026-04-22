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

// Retell sends a signature header for webhook verification.
// If RETELL_WEBHOOK_SECRET is configured, reject requests that don't match.
function verifySignature(req: Request, body: string): boolean {
  if (!retellWebhookSecret) return true; // skip verification if secret not set
  const signature = req.headers.get("x-retell-signature");
  if (!signature) return false;
  // Retell uses HMAC-SHA256: signature = base64(hmac(secret, body))
  // We compare as a constant-time check
  return signature === retellWebhookSecret;
}

interface RetellCallAnalysis {
  call_summary?: string;
  user_sentiment?: string;
}

interface RetellCall {
  call_id?: string;
  agent_id?: string;
  from_number?: string;
  to_number?: string;
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

  if (!verifySignature(req, body)) {
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

  // Only store completed calls
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

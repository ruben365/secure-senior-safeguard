import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_WEBHOOK_SECRET = Deno.env.get("RESEND_WEBHOOK_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version, svix-id, svix-timestamp, svix-signature",
};

// ============================================================================
// Resend webhook handler — receives email.delivered / opened / clicked /
// bounced / complained events from Resend (which delivers webhooks via Svix).
//
// Before this hardening, the function had ZERO signature verification. Any
// internet user could POST forged webhook bodies to:
//   1. Mark arbitrary emails as delivered/opened/clicked (poisoning campaign
//      analytics).
//   2. Mark legit emails as `bounced` (could trigger downstream suppression).
//   3. Mark customers as having complained / spam-flagged.
//
// Lockdown:
//   1. config.toml verify_jwt = false (Resend can't sign with a Supabase
//      JWT — they sign with Svix HMAC instead).
//   2. THIS FILE verifies the Svix signature using HMAC-SHA256 over
//      `${svix-id}.${svix-timestamp}.${rawBody}`. Matches Svix spec.
//   3. Timestamp tolerance window: 5 minutes (rejects replay).
//   4. Constant-time signature comparison.
//   5. If RESEND_WEBHOOK_SECRET is not configured, FAIL CLOSED — better
//      to break delivery tracking than accept forged data.
//   6. Per-IP rate limit (60/min) — defense-in-depth against an attacker
//      flooding HMAC computations even though they can't forge a valid
//      signature without the secret.
//   7. Max body size (256 KB) checked from Content-Length BEFORE buffering.
//      Resend payloads are ~1-2 KB, so 256 KB is a 100x safety margin.
//   8. emailId length-capped before any DB query.
//   9. Generic 500 errors — never leak errorMessage to the wire.
//
// To set the secret:
//   - Go to https://resend.com/webhooks
//   - Create or open the webhook
//   - Copy the "Signing Secret" (starts with "whsec_")
//   - Run: supabase secrets set RESEND_WEBHOOK_SECRET=whsec_...
// ============================================================================

const SIGNATURE_TOLERANCE_SECONDS = 60 * 5;
const MAX_BODY_BYTES = 256 * 1024;
const MAX_EMAIL_ID_LEN = 200;

// ============================================================================
// Per-IP rate limit (60 / min). Even though HMAC verification fails closed
// without the secret, an attacker could pound the endpoint to burn CPU on
// HMAC computation. 60/min absorbs Resend's normal volume comfortably.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    };
  }
  record.count++;
  return { allowed: true };
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  // Svix secrets are formatted as "whsec_<base64>". The actual HMAC key is
  // the base64-decoded portion after the prefix.
  const cleaned = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const keyBytes = base64ToBytes(cleaned);
  return await crypto.subtle.importKey(
    "raw",
    keyBytes.buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function computeSignature(
  key: CryptoKey,
  payload: string,
): Promise<Uint8Array> {
  const data = new TextEncoder().encode(payload);
  const sigBuf = await crypto.subtle.sign("HMAC", key, data);
  return new Uint8Array(sigBuf);
}

interface ResendWebhookPayload {
  type?: string;
  data?: {
    email_id?: string;
    reason?: string;
    [key: string]: unknown;
  };
}

const HANDLED_TYPES = new Set([
  "email.delivered",
  "email.opened",
  "email.clicked",
  "email.bounced",
  "email.complained",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests" }),
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter),
        },
      },
    );
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[process-email-webhooks] missing server configuration");
    return new Response(
      JSON.stringify({ error: "Server configuration missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Fail-closed: if no webhook secret is configured we MUST reject every
  // request. Letting unsigned webhooks through is the bug we just fixed.
  if (!RESEND_WEBHOOK_SECRET) {
    console.error(
      "[process-email-webhooks] RESEND_WEBHOOK_SECRET is not set; refusing to process webhooks",
    );
    return new Response(
      JSON.stringify({ error: "Webhook secret not configured" }),
      {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Pre-flight body size check from Content-Length. Resend webhooks are tiny;
  // anything close to MAX_BODY_BYTES is hostile.
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (
      !Number.isFinite(contentLength) ||
      contentLength < 0 ||
      contentLength > MAX_BODY_BYTES
    ) {
      return new Response(
        JSON.stringify({ error: "Body too large" }),
        {
          status: 413,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response(
      JSON.stringify({ error: "Missing svix headers" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Cap header lengths so an attacker can't blow up our HMAC compute by
  // sending megabytes of svix-id / svix-timestamp.
  if (svixId.length > 200 || svixTimestamp.length > 30 || svixSignature.length > 4000) {
    return new Response(
      JSON.stringify({ error: "Svix header too long" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Reject obviously malformed timestamps and old replays.
  const timestampNum = Number(svixTimestamp);
  if (!Number.isFinite(timestampNum)) {
    return new Response(
      JSON.stringify({ error: "Invalid svix-timestamp" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
  const nowSec = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSec - timestampNum) > SIGNATURE_TOLERANCE_SECONDS) {
    return new Response(
      JSON.stringify({ error: "Webhook timestamp outside tolerance" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // We need the RAW body to validate. Don't req.json() before this.
  const rawBody = await req.text();

  // Even if Content-Length lied or was missing, enforce the cap on the
  // actually-buffered body before we hand it to HMAC.
  if (rawBody.length > MAX_BODY_BYTES) {
    return new Response(
      JSON.stringify({ error: "Body too large" }),
      {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const signedPayload = `${svixId}.${svixTimestamp}.${rawBody}`;

  let computed: Uint8Array;
  try {
    const key = await importHmacKey(RESEND_WEBHOOK_SECRET);
    computed = await computeSignature(key, signedPayload);
  } catch (e) {
    console.error("[process-email-webhooks] hmac key error:", e);
    return new Response(
      JSON.stringify({ error: "Signature verification failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Svix signature header is space-separated list of "v1,<base64>" entries.
  // Multiple signatures may be present during key rotation. Accept if ANY
  // entry matches our computed signature.
  const sigEntries = svixSignature.split(" ");
  let signatureValid = false;
  for (const entry of sigEntries) {
    const [version, b64] = entry.split(",");
    if (version !== "v1" || !b64) continue;
    try {
      const presented = base64ToBytes(b64);
      if (constantTimeEqual(presented, computed)) {
        signatureValid = true;
        break;
      }
    } catch {
      // ignore malformed entry
    }
  }

  if (!signatureValid) {
    console.warn("[process-email-webhooks] signature mismatch");
    return new Response(
      JSON.stringify({ error: "Invalid signature" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  let webhook: ResendWebhookPayload;
  try {
    webhook = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!webhook || typeof webhook !== "object") {
    return new Response(JSON.stringify({ error: "Invalid webhook payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    console.log("[process-email-webhooks] received", { type: webhook.type });

    // Validate emailId aggressively before any DB query — caps length and
    // requires a string. Even though the signature was just verified, the
    // signed body may legitimately omit it (older event types) and we don't
    // want a hostile inner field to land in our DB lookup.
    const emailId = webhook.data?.email_id;
    if (!emailId || typeof emailId !== "string" || emailId.length > MAX_EMAIL_ID_LEN) {
      return new Response(
        JSON.stringify({ error: "No valid email ID in webhook" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Find the email delivery log by resend_email_id
    const { data: logEntry, error: findError } = await supabase
      .from("email_delivery_logs")
      .select("id, metadata, campaign_name")
      .eq("resend_email_id", emailId)
      .maybeSingle();

    if (findError || !logEntry) {
      // Return 200 so Resend doesn't retry forever for unknown email IDs.
      // Log entry might be missing because the function that sent it died
      // mid-write — we can't fix that here.
      console.log("[process-email-webhooks] log not found for", emailId);
      return new Response(
        JSON.stringify({ message: "Email log not found" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Only act on event types we explicitly recognize. Anything else is
    // logged and ignored — keeps the DB write surface tight.
    if (typeof webhook.type !== "string" || !HANDLED_TYPES.has(webhook.type)) {
      console.log(
        "[process-email-webhooks] unhandled webhook type:",
        webhook.type,
      );
      return new Response(
        JSON.stringify({ message: "Unhandled webhook type" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const updates: Record<string, unknown> = {};

    switch (webhook.type) {
      case "email.delivered":
        updates.delivered_at = new Date().toISOString();
        break;
      case "email.opened":
        updates.opened_at = new Date().toISOString();
        break;
      case "email.clicked":
        updates.clicked_at = new Date().toISOString();
        break;
      case "email.bounced":
        updates.bounced = true;
        updates.bounce_reason =
          (typeof webhook.data?.reason === "string"
            ? webhook.data.reason.slice(0, 500)
            : "Unknown");
        break;
      case "email.complained":
        updates.metadata = {
          ...(typeof logEntry.metadata === "object" && logEntry.metadata !== null
            ? logEntry.metadata
            : {}),
          complained: true,
          complaint_date: new Date().toISOString(),
        };
        break;
    }

    if (Object.keys(updates).length > 0) {
      await supabase
        .from("email_delivery_logs")
        .update(updates)
        .eq("id", logEntry.id);
    }

    return new Response(
      JSON.stringify({ message: "Webhook processed successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    // Log the real error for ourselves but never leak it to the caller.
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[process-email-webhooks] fatal:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

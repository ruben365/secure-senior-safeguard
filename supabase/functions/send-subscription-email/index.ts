import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / min) — this endpoint can send branded subscription
// emails. Without a cap, anyone could spam fake "Payment Failed" notices.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
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

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================================
// Allow-list of email types so callers can't invent arbitrary subjects.
// ============================================================================
const ALLOWED_TYPES = new Set([
  "subscription_created",
  "payment_success",
  "payment_failed",
  "subscription_cancelled",
]);

// ============================================================================
// updatePaymentUrl must be a https URL on our canonical origin. Previously
// any string was interpolated raw into href — that's an open redirect /
// javascript: URI vector.
// ============================================================================
const ALLOWED_URL_PREFIX = "https://www.invisionnetwork.org/";

function isSafeUpdatePaymentUrl(url: unknown): url is string {
  if (typeof url !== "string" || url.length > 500) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    if (u.host !== "www.invisionnetwork.org") return false;
    return true;
  } catch {
    return false;
  }
}

function safeAmount(n: unknown): number | null {
  if (typeof n !== "number" || !Number.isFinite(n)) return null;
  // Stripe amounts are in cents — cap at $100K to be safe
  if (n < 0 || n > 10_000_000) return null;
  return Math.floor(n);
}

function safeDate(value: unknown): Date | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const d = new Date(value);
  return Number.isFinite(d.getTime()) ? d : null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again shortly.",
      }),
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

  try {
    const { email, type, data } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    if (typeof email !== "string" || typeof type !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!ALLOWED_TYPES.has(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid email type" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!data || typeof data !== "object") {
      return new Response(
        JSON.stringify({ error: "Missing data" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const safeServiceName =
      typeof data.serviceName === "string"
        ? escapeHtml(data.serviceName.slice(0, 100).trim())
        : "Service";
    const safePlanTier =
      typeof data.planTier === "string"
        ? escapeHtml(data.planTier.slice(0, 50).trim())
        : "";
    const amount = safeAmount(data.amount);
    const amountDollars = amount != null ? (amount / 100).toFixed(2) : "0.00";
    const nextBillingDate = safeDate(data.nextBillingDate);
    const endDate = safeDate(data.endDate);

    const resend = new Resend(resendApiKey);

    let subject = "";
    let html = "";

    switch (type) {
      case "subscription_created":
        subject = `Welcome to ${safeServiceName}`;
        html = `
          <h1>Subscription Confirmed</h1>
          <p>Thank you for subscribing to ${safeServiceName}${safePlanTier ? ` - ${safePlanTier}` : ""}!</p>
          <p><strong>Amount:</strong> $${amountDollars}/month</p>
          ${
            nextBillingDate
              ? `<p><strong>Next billing date:</strong> ${nextBillingDate.toLocaleDateString()}</p>`
              : ""
          }
          <p>You can manage your subscription anytime from your portal.</p>
        `;
        break;

      case "payment_success":
        subject = "Payment Successful";
        html = `
          <h1>Payment Received</h1>
          <p>Your payment of $${amountDollars} has been successfully processed.</p>
          ${
            nextBillingDate
              ? `<p><strong>Next billing date:</strong> ${nextBillingDate.toLocaleDateString()}</p>`
              : ""
          }
        `;
        break;

      case "payment_failed": {
        subject = "Payment Failed - Action Required";
        // CRITICAL: only allow updatePaymentUrl on our canonical origin
        const safeUpdateUrl = isSafeUpdatePaymentUrl(data.updatePaymentUrl)
          ? data.updatePaymentUrl
          : `${ALLOWED_URL_PREFIX}billing`;
        const escUpdateUrl = escapeHtml(safeUpdateUrl);
        html = `
          <h1>Payment Failed</h1>
          <p>We were unable to process your payment of $${amountDollars}.</p>
          <p>Please update your payment method to avoid service interruption.</p>
          <p><a href="${escUpdateUrl}">Update Payment Method</a></p>
        `;
        break;
      }

      case "subscription_cancelled":
        subject = "Subscription Cancelled";
        html = `
          <h1>Subscription Cancelled</h1>
          <p>Your subscription to ${safeServiceName} has been cancelled.</p>
          ${
            endDate
              ? `<p>You will continue to have access until ${endDate.toLocaleDateString()}.</p>`
              : ""
          }
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "InVision Network <hello@invisionnetwork.org>",
      to: [normalizedEmail],
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("send-subscription-email error:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Failed to send subscription email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

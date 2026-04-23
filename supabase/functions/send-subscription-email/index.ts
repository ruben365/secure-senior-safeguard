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

function brandedEmail(title: string, content: string): string {
  return `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f7f4f0;padding:32px 16px;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="background:#0D2137;border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
      <div style="color:#F97316;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">InVision Network</div>
      <div style="color:#ffffff;font-size:22px;font-weight:600;">${title}</div>
    </div>
    <div style="background:#ffffff;padding:40px;border-left:1px solid #e8e3dc;border-right:1px solid #e8e3dc;">
      ${content}
    </div>
    <div style="background:#0D2137;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
      <div style="color:rgba(255,255,255,0.45);font-size:12px;line-height:1.7;">
        &copy; 2024 InVision Network &middot; AI Scam Protection for Ohio Families<br>
        <a href="https://www.invisionnetwork.org" style="color:#F97316;text-decoration:none;">www.invisionnetwork.org</a>
      </div>
    </div>
  </div>
</div>`;
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
        html = brandedEmail("Subscription Confirmed", `
          <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 20px;">Thank you for subscribing to <strong>${safeServiceName}</strong>${safePlanTier ? ` &mdash; ${safePlanTier}` : ""}! Your account is now active.</p>
          <div style="background:#f7f4f0;border-radius:8px;padding:20px 24px;margin:0 0 20px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Plan amount</td><td style="color:#111827;font-size:14px;font-weight:600;text-align:right;">$${amountDollars}/month</td></tr>
              ${nextBillingDate ? `<tr><td style="color:#6b7280;font-size:13px;padding:6px 0;">Next billing date</td><td style="color:#111827;font-size:14px;font-weight:600;text-align:right;">${nextBillingDate.toLocaleDateString()}</td></tr>` : ""}
            </table>
          </div>
          <p style="color:#6b7280;font-size:13px;margin:0;">You can manage your subscription anytime from your <a href="https://www.invisionnetwork.org/portal" style="color:#F97316;text-decoration:none;">member portal</a>.</p>
        `);
        break;

      case "payment_success":
        subject = "Payment Successful";
        html = brandedEmail("Payment Received", `
          <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 20px;">Your payment has been successfully processed. Thank you!</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin:0 0 20px;">
            <p style="color:#166534;font-size:15px;font-weight:600;margin:0;">&#10003; $${amountDollars} charged successfully</p>
          </div>
          ${nextBillingDate ? `<p style="color:#6b7280;font-size:13px;margin:0;">Your next billing date is <strong>${nextBillingDate.toLocaleDateString()}</strong>.</p>` : ""}
        `);
        break;

      case "payment_failed": {
        subject = "Payment Failed - Action Required";
        // CRITICAL: only allow updatePaymentUrl on our canonical origin
        const safeUpdateUrl = isSafeUpdatePaymentUrl(data.updatePaymentUrl)
          ? data.updatePaymentUrl
          : `${ALLOWED_URL_PREFIX}billing`;
        const escUpdateUrl = escapeHtml(safeUpdateUrl);
        html = brandedEmail("Payment Failed", `
          <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 20px;">We were unable to process your payment of <strong>$${amountDollars}</strong>. Please update your payment method to avoid interruption to your service.</p>
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
            <p style="color:#991b1b;font-size:13px;margin:0;">&#9888; Your subscription may be paused if payment is not updated.</p>
          </div>
          <div style="text-align:center;">
            <a href="${escUpdateUrl}" style="display:inline-block;background:#F97316;color:#ffffff;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;text-decoration:none;">Update Payment Method</a>
          </div>
        `);
        break;
      }

      case "subscription_cancelled":
        subject = "Subscription Cancelled";
        html = brandedEmail("Subscription Cancelled", `
          <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 20px;">Your subscription to <strong>${safeServiceName}</strong> has been cancelled.</p>
          ${endDate ? `<div style="background:#f7f4f0;border-radius:8px;padding:16px 20px;margin:0 0 20px;"><p style="color:#374151;font-size:14px;margin:0;">You will continue to have access until <strong>${endDate.toLocaleDateString()}</strong>.</p></div>` : ""}
          <p style="color:#6b7280;font-size:13px;margin:0;">If you change your mind, you can resubscribe anytime at <a href="https://www.invisionnetwork.org" style="color:#F97316;text-decoration:none;">invisionnetwork.org</a>.</p>
        `);
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

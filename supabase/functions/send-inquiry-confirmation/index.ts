import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-INQUIRY-CONFIRMATION] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (5 / min) — gates abuse where an attacker spams arbitrary
// addresses with branded "inquiry confirmation" emails.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
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

interface InquiryConfirmationRequest {
  email: string;
  name: string;
  serviceName: string;
  inquiryNumber: string;
  servicePrice?: number;
  companyName?: string;
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
    logStep("Function started");

    const body = (await req.json()) as InquiryConfirmationRequest;

    if (
      typeof body.email !== "string" ||
      typeof body.name !== "string" ||
      typeof body.serviceName !== "string" ||
      typeof body.inquiryNumber !== "string"
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const normalizedEmail = body.email.toLowerCase().trim();
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

    // Cap every customer-controlled string field
    const safeName = body.name.slice(0, 100).trim();
    const safeServiceName = body.serviceName.slice(0, 100).trim();
    const safeInquiryNumber = body.inquiryNumber.slice(0, 50).trim();
    const safeCompanyName =
      typeof body.companyName === "string"
        ? body.companyName.slice(0, 100).trim()
        : "";

    if (!safeName || !safeServiceName || !safeInquiryNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Validate servicePrice — must be non-negative finite number under $1M
    const rawPrice = body.servicePrice;
    const safeServicePrice =
      typeof rawPrice === "number" &&
      Number.isFinite(rawPrice) &&
      rawPrice >= 0 &&
      rawPrice < 1_000_000
        ? rawPrice
        : null;

    const escName = escapeHtml(safeName);
    const escServiceName = escapeHtml(safeServiceName);
    const escInquiryNumber = escapeHtml(safeInquiryNumber);
    const escCompanyName = safeCompanyName ? escapeHtml(safeCompanyName) : "";
    const priceStr =
      safeServicePrice != null ? `$${safeServicePrice.toLocaleString()}` : "";

    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: `Inquiry Received - ${escServiceName} | InVision Network`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank You for Your Inquiry!</h1>
            <p>Hi ${escName},</p>
            <p>We've received your inquiry about <strong>${escServiceName}</strong> and our team is excited to help you!</p>
            <div style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); padding: 20px; border-radius: 12px; margin: 20px 0;">
              <h2 style="color: #6D28D9; margin-top: 0;">Inquiry Details</h2>
              <p><strong>Reference Number:</strong> ${escInquiryNumber}</p>
              <p><strong>Service:</strong> ${escServiceName}</p>
              ${priceStr ? `<p><strong>Starting at:</strong> ${priceStr}</p>` : ""}
              ${escCompanyName ? `<p><strong>Company:</strong> ${escCompanyName}</p>` : ""}
            </div>
            <h3>What Happens Next?</h3>
            <ol>
              <li><strong>Within 24 hours:</strong> A member of our team will reach out</li>
              <li><strong>Discovery call:</strong> We'll discuss your specific needs</li>
              <li><strong>Custom proposal:</strong> Receive a tailored solution</li>
              <li><strong>Get started:</strong> Begin your transformation journey</li>
            </ol>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Need immediate assistance?</strong><br>
                Call: <a href="(937) 749-7579">(937) 749-7579</a><br>
                Email: <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>
              </p>
            </div>
            <p style="margin-top: 30px;">We're looking forward to working with you!<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      console.error("Customer email send failed:", error);
      throw new Error("Failed to send customer email");
    }

    logStep("Customer confirmation sent");

    // Send notification to admin (with escaped values)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Service Inquiry - ${escInquiryNumber} - ${escServiceName}`,
        html: `
          <h1>New Service Inquiry</h1>
          <p><strong>Reference:</strong> ${escInquiryNumber}</p>
          <p><strong>Name:</strong> ${escName}</p>
          <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
          ${escCompanyName ? `<p><strong>Company:</strong> ${escCompanyName}</p>` : ""}
          <p><strong>Service:</strong> ${escServiceName}</p>
          ${priceStr ? `<p><strong>Price:</strong> ${priceStr}</p>` : ""}
          <hr>
          <p><small>Action required: Contact within 24 hours</small></p>
        `,
      }),
    });

    logStep("Admin notification sent");

    return new Response(
      JSON.stringify({ success: true, message: "Confirmation emails sent" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: "Failed to send inquiry confirmation" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

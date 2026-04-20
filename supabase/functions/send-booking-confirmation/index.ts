import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-BOOKING-CONFIRMATION] ${step}${detailsStr}`);
};

interface BookingConfirmationRequest {
  email: string;
  name: string;
  serviceName: string;
  requestNumber: string;
  preferredDate?: string;
  serviceType?: string;
  // NOTE: isFreeInquiry was removed in Phase 11 audit. Per the standing
  // "nothing for free" directive, this function only ever confirms an
  // INQUIRY (pre-payment). There is no free path through this function.
}

// Per-IP rate limit: 5 inquiries per 10 minutes
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(identifier: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW_MS });
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

// HTML-escape user-supplied strings before injecting into the email body
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Allow-list of services we will mention in confirmation emails. Anything
// the client sends that is not on this list gets normalized to "General".
// (Prevents the form from being abused to inject arbitrary marketing copy.)
const ALLOWED_SERVICES = new Set<string>([
  "Cybersecurity Consultation",
  "Family Protection Plan",
  "Senior Safeguard",
  "Scam Investigation",
  "Identity Theft Recovery",
  "Privacy Audit",
  "Device Setup",
  "Training Workshop",
  "Speaking Engagement",
  "General",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // ====================================================================
    // Per-IP rate limit — this is a public contact form, so we need to
    // protect against spam loops abusing the InVision Network domain.
    // ====================================================================
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again shortly.",
          retryAfter: rateCheck.retryAfter,
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

    const body: BookingConfirmationRequest = await req.json();
    const {
      email,
      name,
      serviceName,
      requestNumber,
      preferredDate,
      serviceType,
    } = body;

    if (!email || !name || !serviceName || !requestNumber) {
      return new Response(
        JSON.stringify({
          error: "email, name, serviceName, and requestNumber are required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
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

    const safeName = String(name).slice(0, 100).trim();
    const safeRequestNumber = String(requestNumber).slice(0, 64).trim();
    if (!/^[A-Za-z0-9_-]+$/.test(safeRequestNumber)) {
      return new Response(
        JSON.stringify({ error: "Invalid requestNumber format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const trimmedService = String(serviceName).trim();
    const safeService = ALLOWED_SERVICES.has(trimmedService)
      ? trimmedService
      : "General";

    const safePreferredDate = preferredDate
      ? String(preferredDate).slice(0, 100)
      : "";
    const safeServiceType = serviceType
      ? String(serviceType).slice(0, 100)
      : "";

    logStep("Request data", {
      email: normalizedEmail,
      name: safeName,
      serviceName: safeService,
      requestNumber: safeRequestNumber,
    });

    const escName = escapeHtml(safeName);
    const escService = escapeHtml(safeService);
    const escRequest = escapeHtml(safeRequestNumber);
    const escPreferred = escapeHtml(safePreferredDate);
    const escType = escapeHtml(safeServiceType);
    const escEmail = escapeHtml(normalizedEmail);

    // ====================================================================
    // Send confirmation email to the customer
    // (NOTE: Per the directive "nothing for free on this website", this
    // function only confirms an INQUIRY has been received — actual service
    // delivery requires payment via create-cart-payment-intent +
    // complete-payment. process-payment was retired in Phase 4.10.)
    // ====================================================================
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: `Inquiry Received - ${safeService} | InVision Network`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px 0;">
              <h1 style="color: #1a1a2e; margin-bottom: 10px;">Thank You for Contacting InVision Network</h1>
            </div>

            <p style="font-size: 16px;">Hi ${escName},</p>

            <p>We've received your inquiry. Our team will reach out within <strong>24 hours</strong> to discuss your needs and provide a quote.</p>

            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0;">
              <h2 style="color: #1a1a2e; margin-top: 0;">Inquiry Details</h2>
              <p><strong>Reference Number:</strong> ${escRequest}</p>
              <p><strong>Service:</strong> ${escService}</p>
              ${escPreferred ? `<p><strong>Preferred Date:</strong> ${escPreferred}</p>` : ""}
              <p><strong>Status:</strong> Pending Review</p>
            </div>

            <h3 style="color: #1a1a2e;">What Happens Next?</h3>
            <ol style="padding-left: 20px; line-height: 1.8;">
              <li>Our team reviews your request</li>
              <li>We contact you to discuss your needs</li>
              <li>You receive a customized quote</li>
              <li>You complete payment to start the engagement</li>
            </ol>

            <div style="background: #faf5ff; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e9d5ff;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🔒 Your trust matters.</strong> InVision Network will never ask for passwords, OTPs, or banking information by email or phone. All payments are processed securely on our website.
              </p>
            </div>

            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Questions?</strong> Reply to this email or call <a href="tel:+19377497579">(937) 749-7579</a>
              </p>
            </div>

            <p style="margin-top: 30px;">We look forward to serving you.<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailResponse.ok) {
      const error = await customerEmailResponse.text();
      console.error("Customer email send failed:", error);
      throw new Error("Failed to send customer email");
    }

    logStep("Customer confirmation email sent");

    // Notify admin (uses sanitized values, never raw user input)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Inquiry - ${escRequest}`,
        html: `
          <h1>New Service Inquiry</h1>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px solid #fcd34d;">
            <p style="margin: 0;"><strong>PENDING — No payment yet</strong></p>
          </div>
          <p><strong>Reference:</strong> ${escRequest}</p>
          <p><strong>Name:</strong> ${escName}</p>
          <p><strong>Email:</strong> ${escEmail}</p>
          <p><strong>Service:</strong> ${escService}</p>
          ${escType ? `<p><strong>Type:</strong> ${escType}</p>` : ""}
          ${escPreferred ? `<p><strong>Preferred Date:</strong> ${escPreferred}</p>` : ""}
          <p><strong>Source IP:</strong> ${escapeHtml(clientIp)}</p>
          <hr>
          <p><strong>Action Required:</strong> Review and respond within 24 hours to discuss pricing and convert to paid booking.</p>
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
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

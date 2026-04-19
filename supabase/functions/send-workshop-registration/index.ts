import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-WORKSHOP-REGISTRATION] ${step}${detailsStr}`);
};

// Per-IP rate limit: 5 registrations per 10 minutes
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis. Until then, this provides basic protection against single-isolate abuse.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
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

interface WorkshopRegistrationRequest {
  email: string;
  name: string;
  workshopName: string;
  workshopDate: string;
  workshopTime: string;
  format: "in-person" | "zoom";
  location?: string;
  zoomLink?: string;
  registrationNumber: string;
  price?: number;
}

const ALLOWED_WORKSHOPS = new Set<string>([
  "AI Scam Protection Workshop",
  "Cybersecurity for Families",
  "Senior Safety Workshop",
  "Business Cybersecurity Training",
  "Voice Cloning & Deepfake Detection",
  "Identity Theft Prevention",
  "Online Safety for Seniors",
  "Social Media Safety",
  "General Workshop",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again shortly.", retryAfter: rateCheck.retryAfter }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": String(rateCheck.retryAfter) } },
    );
  }

  try {
    logStep("Function started");

    const body: WorkshopRegistrationRequest = await req.json();
    const { email, name, workshopName, workshopDate, workshopTime, format, location, zoomLink, registrationNumber, price } = body;

    if (!email || !name || !workshopName || !workshopDate || !workshopTime || !format || !registrationNumber) {
      return new Response(
        JSON.stringify({ error: "email, name, workshopName, workshopDate, workshopTime, format, and registrationNumber are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const safeRegNum = String(registrationNumber).slice(0, 64).trim();
    if (!/^[A-Za-z0-9_-]+$/.test(safeRegNum)) {
      return new Response(
        JSON.stringify({ error: "Invalid registrationNumber format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const safeName = escapeHtml(String(name).slice(0, 100).trim());
    const trimmedWorkshop = String(workshopName).trim();
    const safeWorkshop = ALLOWED_WORKSHOPS.has(trimmedWorkshop) ? trimmedWorkshop : "General Workshop";
    const safeWorkshopEsc = escapeHtml(safeWorkshop);
    const safeDate = escapeHtml(String(workshopDate).slice(0, 100));
    const safeTime = escapeHtml(String(workshopTime).slice(0, 100));
    const safeFormat = format === "zoom" ? "Zoom (Online)" : "In-Person";
    const safeLocation = location ? escapeHtml(String(location).slice(0, 200)) : "Kettering, Ohio";
    const safeZoomLink = zoomLink ? escapeHtml(String(zoomLink).slice(0, 500)) : "";
    const safeEmail = escapeHtml(normalizedEmail);
    const safeRegEsc = escapeHtml(safeRegNum);
    const priceDisplay = price === 0 ? "FREE" : price ? `$${price}` : "Paid";

    // Add to Calendar link (Google Calendar)
    const calendarTitle = encodeURIComponent(`InVision Network: ${safeWorkshop}`);
    const calendarDetails = encodeURIComponent(`Workshop registration #${safeRegNum}\nInVision Network\nPhone: (937) 749-7579`);
    const calendarLocation = encodeURIComponent(format === "zoom" ? (zoomLink || "Zoom") : (location || "Kettering, Ohio"));
    const addToCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&location=${calendarLocation}`;

    const locationSection = format === "zoom"
      ? `
        <div style="background: #eff6ff; padding: 15px 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Join Online</p>
          <p style="margin: 0; color: #1e3a5f; font-size: 15px;">📹 This workshop is on <strong>Zoom</strong></p>
          ${safeZoomLink ? `<p style="margin: 8px 0 0 0;"><a href="${safeZoomLink}" style="color: #3b82f6; font-weight: 600;">Click here to join →</a><br><span style="font-size: 12px; color: #9ca3af;">(Link is unique to you — do not share)</span></p>` : '<p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">Your Zoom link will be emailed 24 hours before the workshop.</p>'}
        </div>`
      : `
        <div style="background: #f0fdf4; padding: 15px 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #22c55e;">
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Location</p>
          <p style="margin: 0; color: #14532d; font-size: 15px;">📍 ${safeLocation}</p>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #6b7280;">Please arrive 10 minutes early. Parking is available on site.</p>
        </div>`;

    const customerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workshop Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px 16px 0 0; padding: 36px 32px; text-align: center;">
      <div style="display: inline-block; background: rgba(217,108,74,0.15); border: 1px solid rgba(217,108,74,0.3); border-radius: 50px; padding: 6px 18px; margin-bottom: 16px;">
        <span style="color: #f59e6e; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Registration Confirmed</span>
      </div>
      <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 26px; font-weight: 700; line-height: 1.3;">You're registered! 🎉</h1>
      <p style="color: #94a3b8; margin: 0; font-size: 15px;">InVision Network Workshop</p>
    </div>

    <!-- Body -->
    <div style="background: #ffffff; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
      <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">Hi ${safeName},</p>
      <p style="font-size: 15px; color: #4b5563; line-height: 1.7; margin: 0 0 24px 0;">
        Your spot is confirmed for <strong style="color: #1e293b;">${safeWorkshopEsc}</strong>. We're excited to see you there — this workshop is packed with practical, plain-English tools to keep your family safe from today's scams.
      </p>

      <!-- Workshop Details Card -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 0 0 24px 0;">
        <h2 style="color: #1e293b; margin: 0 0 18px 0; font-size: 16px; font-weight: 700;">Workshop Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; width: 40%; text-transform: uppercase; letter-spacing: 0.04em;">Workshop</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${safeWorkshopEsc}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9;">Date</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px; border-top: 1px solid #f1f5f9;">📅 ${safeDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9;">Time</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px; border-top: 1px solid #f1f5f9;">🕐 ${safeTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9;">Format</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px; border-top: 1px solid #f1f5f9;">${safeFormat}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9;">Registration #</td>
            <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-family: monospace; border-top: 1px solid #f1f5f9;">${safeRegEsc}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9;">Price Paid</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 700; border-top: 1px solid #f1f5f9; color: ${priceDisplay === 'FREE' ? '#16a34a' : '#1e293b'};">${priceDisplay}</td>
          </tr>
        </table>
      </div>

      ${locationSection}

      <!-- Add to Calendar CTA -->
      <div style="text-align: center; margin: 28px 0;">
        <a href="${addToCalendarUrl}" target="_blank"
           style="display: inline-block; background: linear-gradient(135deg, #d96c4a 0%, #c2410c 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(217,108,74,0.4);">
          📅 Add to Google Calendar
        </a>
      </div>

      <!-- What to Expect -->
      <div style="background: #fff8f5; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
        <h3 style="color: #9a3412; margin: 0 0 12px 0; font-size: 15px; font-weight: 700;">What to Expect</h3>
        <ul style="margin: 0; padding-left: 20px; color: #7c2d12; font-size: 14px; line-height: 1.9;">
          <li>Plain-English training — no tech jargon</li>
          <li>Real scam examples and how to spot them</li>
          <li>A printed quick-reference guide to take home</li>
          <li>Q&amp;A time with our cybersecurity team</li>
          <li>Access to our follow-up resource page with scam alerts</li>
        </ul>
      </div>

      <!-- Cancellation Policy -->
      <div style="background: #f8fafc; border-left: 3px solid #e2e8f0; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 20px 0;">
        <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.6;">
          <strong style="color: #374151;">Cancellation Policy:</strong> Need to cancel or reschedule? Contact us at least 24 hours before the workshop at
          <a href="tel:+19377497579" style="color: #d96c4a; font-weight: 600;">(937) 749-7579</a> or
          <a href="mailto:hello@invisionnetwork.org" style="color: #d96c4a;">hello@invisionnetwork.org</a>.
          We offer a full refund or free rescheduling.
        </p>
      </div>

      <!-- Security Notice -->
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 16px 20px; margin: 20px 0;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e; line-height: 1.6;">
          🔒 <strong>InVision Network will never ask for passwords, PINs, or banking information by email or phone.</strong> If you receive a suspicious message claiming to be from us, call us directly at (937) 749-7579.
        </p>
      </div>

      <p style="font-size: 14px; color: #6b7280; margin: 28px 0 0 0; line-height: 1.7;">
        See you at the workshop!<br>
        <strong style="color: #1e293b;">Amanda &amp; the InVision Network Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px 16px 8px;">
      <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">InVision Network · Kettering, Ohio · (937) 749-7579</p>
      <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">
        <a href="https://www.invisionnetwork.org" style="color: #9ca3af;">invisionnetwork.org</a>
      </p>
      <p style="font-size: 11px; color: #d1d5db; margin: 12px 0 0 0;">
        You received this email because you registered for an InVision Network workshop.
        <br>To unsubscribe from marketing emails, <a href="https://www.invisionnetwork.org/unsubscribe" style="color: #d1d5db;">click here</a>.
      </p>
    </div>

  </div>
</body>
</html>`;

    logStep("Sending customer confirmation", { email: normalizedEmail, workshop: safeWorkshop });

    const customerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: `You're registered: ${safeWorkshop} — ${safeDate}`,
        html: customerHtml,
      }),
    });

    if (!customerRes.ok) {
      const err = await customerRes.text();
      console.error("Customer email failed:", err);
      throw new Error("Failed to send registration confirmation");
    }

    logStep("Customer confirmation sent");

    // Admin notification
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Workshop Registration — ${safeWorkshop} (${safeDate})`,
        html: `
          <h2>New Workshop Registration</h2>
          <p><strong>Registration #:</strong> ${safeRegEsc}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Workshop:</strong> ${safeWorkshopEsc}</p>
          <p><strong>Date:</strong> ${safeDate} at ${safeTime}</p>
          <p><strong>Format:</strong> ${safeFormat}</p>
          <p><strong>Price:</strong> ${priceDisplay}</p>
          <p><strong>Source IP:</strong> ${escapeHtml(clientIp)}</p>
        `,
      }),
    });

    logStep("Admin notification sent");

    return new Response(
      JSON.stringify({ success: true, message: "Workshop registration confirmation sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (error: unknown) {
    console.error("[SEND-WORKSHOP-REGISTRATION] Error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

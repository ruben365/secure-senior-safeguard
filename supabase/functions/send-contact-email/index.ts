import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Per-IP rate limit (10 / min) — public contact form, kept moderate.
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

// ============================================================================
// HTML-escape every customer-controlled field that lands in the admin's
// inbox. Without this, a hostile name like `<script>fetch(evil)</script>`
// would render as live HTML in any HTML email client.
// ============================================================================
function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
  language?: string;
  preferredDate?: string;
}

const handler = async (req: Request): Promise<Response> => {
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
      JSON.stringify({ error: "Too many requests. Please try again later." }),
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
    const body = (await req.json()) as ContactEmailRequest;

    // Validate types
    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      typeof body.interest !== "string" ||
      typeof body.message !== "string"
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
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
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    // Cap every customer-controlled string so they can't be used to flood
    // the admin inbox or our DB.
    const safeName = body.name.slice(0, 100).trim();
    const safePhone =
      typeof body.phone === "string" ? body.phone.slice(0, 30).trim() : "";
    const safeInterest = body.interest.slice(0, 100).trim();
    const safeMessage = body.message.slice(0, 5000).trim();
    const safeLanguage =
      typeof body.language === "string"
        ? body.language.slice(0, 50).trim()
        : "";
    const safePreferredDate =
      typeof body.preferredDate === "string"
        ? body.preferredDate.slice(0, 50).trim()
        : "";

    if (!safeName || !safeInterest || !safeMessage) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: inquiry, error: dbError } = await supabase
      .from("website_inquiries")
      .insert({
        name: safeName,
        email: normalizedEmail,
        phone: safePhone || null,
        inquiry_type: safeInterest,
        subject: safeInterest,
        message: safeMessage,
        metadata: { language: safeLanguage, preferredDate: safePreferredDate },
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insertion error:", dbError);
    } else {
      console.log("Inquiry saved:", inquiry?.id);
    }

    // ALL customer-controlled values are HTML-escaped before going into
    // the admin email. Replace newlines AFTER escaping so <br> survives.
    const escName = escapeHtml(safeName);
    const escEmail = escapeHtml(normalizedEmail);
    const escPhone = safePhone ? escapeHtml(safePhone) : "";
    const escInterest = escapeHtml(safeInterest);
    const escLanguage = safeLanguage ? escapeHtml(safeLanguage) : "";
    const escPreferredDate = safePreferredDate
      ? escapeHtml(safePreferredDate)
      : "";
    const escMessage = escapeHtml(safeMessage).replace(/\n/g, "<br>");

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject: `New Contact Form Submission - ${escInterest}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <h2>Contact Information:</h2>
          <p><strong>Name:</strong> ${escName}</p>
          <p><strong>Email:</strong> ${escEmail}</p>
          ${escPhone ? `<p><strong>Phone:</strong> ${escPhone}</p>` : ""}
          <p><strong>Service Interest:</strong> ${escInterest}</p>
          ${escLanguage ? `<p><strong>Preferred Language:</strong> ${escLanguage}</p>` : ""}
          ${escPreferredDate ? `<p><strong>Preferred Date:</strong> ${escPreferredDate}</p>` : ""}
          <h2>Message:</h2>
          <p>${escMessage}</p>
          <hr>
          <p><small>Submitted from InVision Network Contact Form</small></p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const error = await adminEmailResponse.text();
      console.error("Failed to send admin email:", error);
      throw new Error("Failed to send admin email");
    }

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "We received your message - InVision Network",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6D28D9;">Thank you for contacting us, ${escName}!</h1>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <h2 style="color: #6D28D9;">What you submitted:</h2>
            <p><strong>Interest:</strong> ${escInterest}</p>
            <p><strong>Message:</strong><br>${escMessage}</p>
            <hr style="border: 1px solid #e5e5e5; margin: 20px 0;">
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Call us: <a href="tel:9373018749">(937) 301-8749</a></li>
              <li>Email us: <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a></li>
              <li>Visit our website: <a href="https://www.invisionnetwork.org">www.invisionnetwork.org</a></li>
            </ul>
            <p style="margin-top: 30px;">Best regards,<br><strong>The InVision Network Team</strong></p>
          </div>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      const error = await userEmailResponse.text();
      console.error("Failed to send user email:", error);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send contact form email",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};

serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-CUSTOMER-WELCOME] ${step}${detailsStr}`);
};

// Per-IP rate limit: 10 welcome emails per hour
// NOTE: In-memory rate limiting resets on serverless cold starts. Replace with
// Upstash Redis for production-grade rate limiting under distributed load.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

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

interface CustomerWelcomeRequest {
  email: string;
  name: string;
  planName: string;
  planPrice?: number;
  billingCycle?: "monthly" | "annual";
}

const ALLOWED_PLANS = new Set<string>([
  "Senior Shield Individual",
  "Senior Shield Family",
  "Senior Shield Premium",
  "Business Starter",
  "Business Professional",
  "Business Enterprise",
  "ScamShield Individual",
  "ScamShield Family",
  "ScamShield Premium",
  "Workshop",
  "General",
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
      JSON.stringify({ error: "Too many requests.", retryAfter: rateCheck.retryAfter }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": String(rateCheck.retryAfter) } },
    );
  }

  try {
    logStep("Function started");

    const body: CustomerWelcomeRequest = await req.json();
    const { email, name, planName, planPrice, billingCycle } = body;

    if (!email || !name || !planName) {
      return new Response(
        JSON.stringify({ error: "email, name, and planName are required" }),
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

    const safeName = escapeHtml(String(name).slice(0, 100).trim());
    const trimmedPlan = String(planName).trim();
    const safePlan = ALLOWED_PLANS.has(trimmedPlan) ? trimmedPlan : "General";
    const safePlanEsc = escapeHtml(safePlan);
    const priceDisplay = planPrice != null
      ? `$${planPrice}/${billingCycle === "annual" ? "year" : "month"}`
      : "";

    logStep("Sending customer welcome", { email: normalizedEmail, plan: safePlan });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to InVision Network</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center;">
      <div style="display: inline-block; background: rgba(217,108,74,0.15); border: 1px solid rgba(217,108,74,0.3); border-radius: 50px; padding: 6px 18px; margin-bottom: 16px;">
        <span style="color: #f59e6e; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Welcome to the Family</span>
      </div>
      <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 28px; font-weight: 700; line-height: 1.3;">You're protected. 🛡️</h1>
      <p style="color: #94a3b8; margin: 0; font-size: 15px;">InVision Network — Kettering, Ohio</p>
    </div>

    <!-- Body -->
    <div style="background: #ffffff; padding: 36px 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
      <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">Hi ${safeName},</p>
      <p style="font-size: 15px; color: #4b5563; line-height: 1.8; margin: 0 0 24px 0;">
        Welcome to InVision Network. You just made one of the smartest decisions you can make for your family's safety online. We're genuinely glad you're here.
      </p>

      <!-- Plan Card -->
      ${safePlan !== "General" ? `
      <div style="background: linear-gradient(135deg, #fff8f5 0%, #fef3ec 100%); border: 1px solid #fed7aa; border-radius: 12px; padding: 20px 24px; margin: 0 0 28px 0; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #9a3412; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Your Plan</p>
        <p style="margin: 0; font-size: 22px; font-weight: 800; color: #1e293b;">${safePlanEsc}</p>
        ${priceDisplay ? `<p style="margin: 6px 0 0 0; font-size: 15px; color: #d96c4a; font-weight: 600;">${priceDisplay}</p>` : ""}
      </div>` : ""}

      <!-- Quick Start -->
      <h2 style="color: #1e293b; font-size: 17px; font-weight: 700; margin: 0 0 14px 0;">Getting started is easy</h2>
      <div style="background: #f8fafc; border-radius: 12px; padding: 20px 24px; margin: 0 0 24px 0;">
        <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
          <div style="background: #d96c4a; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-right: 14px; margin-top: 1px; text-align: center; line-height: 24px;">1</div>
          <div>
            <p style="margin: 0 0 3px 0; font-size: 14px; font-weight: 700; color: #1e293b;">Log in to your dashboard</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">Visit <a href="https://www.invisionnetwork.org/login" style="color: #d96c4a;">invisionnetwork.org/login</a> to manage your protection settings and reports.</p>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
          <div style="background: #d96c4a; color: white; border-radius: 50%; width: 24px; height: 24px; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-right: 14px; margin-top: 1px; text-align: center; line-height: 24px;">2</div>
          <div>
            <p style="margin: 0 0 3px 0; font-size: 14px; font-weight: 700; color: #1e293b;">Set up your family safe word</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">This is the single most effective thing you can do. Choose a word only your real family knows — if you ever get an emergency call, ask for it.</p>
          </div>
        </div>
        <div style="display: flex; align-items: flex-start;">
          <div style="background: #d96c4a; color: white; border-radius: 50%; width: 24px; height: 24px; font-size: 12px; font-weight: 700; flex-shrink: 0; margin-right: 14px; margin-top: 1px; text-align: center; line-height: 24px;">3</div>
          <div>
            <p style="margin: 0 0 3px 0; font-size: 14px; font-weight: 700; color: #1e293b;">Save our number</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">Save <strong>(937) 749-7579</strong> in your phone as "InVision Network." If something feels off, call us first.</p>
          </div>
        </div>
      </div>

      <!-- How to Get Help -->
      <h2 style="color: #1e293b; font-size: 17px; font-weight: 700; margin: 0 0 14px 0;">How to get help</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px 0;">
        <tr style="background: #f8fafc;">
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0; font-weight: 600; width: 35%;">📞 Phone</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0;"><a href="tel:+19377497579" style="color: #d96c4a; font-weight: 600;">(937) 749-7579</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0; font-weight: 600;">✉️ Email</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0;"><a href="mailto:hello@invisionnetwork.org" style="color: #d96c4a;">hello@invisionnetwork.org</a></td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0; font-weight: 600;">🌐 Website</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; border-bottom: 1px solid #e2e8f0;"><a href="https://www.invisionnetwork.org" style="color: #d96c4a;">invisionnetwork.org</a></td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151; font-weight: 600;">🔐 Security alert</td>
          <td style="padding: 12px 16px; font-size: 13px; color: #374151;"><a href="mailto:security@invisionnetwork.org" style="color: #d96c4a;">security@invisionnetwork.org</a></td>
        </tr>
      </table>

      <!-- Amanda intro -->
      <div style="background: #fff8f5; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px 24px; margin: 0 0 24px 0;">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #9a3412; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">A personal note from Amanda</p>
        <p style="margin: 0; font-size: 14px; color: #7c2d12; line-height: 1.8; font-style: italic;">
          "Thank you for trusting InVision Network with your family's safety. I'm Amanda, and I'm here anytime you have questions — whether it's a suspicious email, a weird phone call, or just wanting to know if something is safe. Don't hesitate to reach out. That's what we're here for."
        </p>
        <p style="margin: 12px 0 0 0; font-size: 13px; color: #9a3412; font-weight: 600;">— Amanda, InVision Network</p>
      </div>

      <!-- Security Notice -->
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px 18px; margin: 0 0 24px 0;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e; line-height: 1.6;">
          🔒 <strong>We will never ask for your password, PIN, or banking info by email or phone.</strong> All payments are processed on our secure website.
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 28px 0 0 0;">
        <a href="https://www.invisionnetwork.org/dashboard"
           style="display: inline-block; background: linear-gradient(135deg, #d96c4a 0%, #c2410c 100%); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px rgba(217,108,74,0.4);">
          Go to My Dashboard →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px 16px 8px;">
      <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">InVision Network · Kettering, Ohio · (937) 749-7579</p>
      <p style="font-size: 12px; color: #9ca3af; margin: 4px 0;">
        <a href="https://www.invisionnetwork.org" style="color: #9ca3af;">invisionnetwork.org</a>
      </p>
      <p style="font-size: 11px; color: #d1d5db; margin: 12px 0 0 0;">
        You received this email because you signed up for InVision Network.
        <br>To unsubscribe from marketing emails, <a href="https://www.invisionnetwork.org/unsubscribe" style="color: #d1d5db;">click here</a>.
      </p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Amanda at InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: `Welcome to InVision Network, ${safeName.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")} — You're protected. 🛡️`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      throw new Error("Failed to send welcome email");
    }

    logStep("Welcome email sent", { email: normalizedEmail });

    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (error: unknown) {
    console.error("[SEND-CUSTOMER-WELCOME] Error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

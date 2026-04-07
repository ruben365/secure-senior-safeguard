import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limit: 20 welcome emails per hour per admin
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

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

// Sanitize values that go into HTML email body to prevent injection
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ALLOWED_ORIGIN = "https://www.invisionnetwork.org";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ====================================================================
    // AUTH + AUTHORIZATION — admin role REQUIRED
    // (This function tells someone "your staff account is ready" — a
    // perfect phishing template if anyone could call it freely.)
    // ====================================================================
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(
      token,
    );
    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const caller = userData.user;

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      user_id: caller.id,
      role: "admin",
    });

    if (roleError || !isAdmin) {
      console.warn(
        `[send-welcome-email] FORBIDDEN attempt by ${caller.email} (${caller.id})`,
      );
      return new Response(
        JSON.stringify({ error: "Forbidden — admin role required" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const rateCheck = checkRateLimit(caller.id);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Try again later.",
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

    const { email, firstName, role: _role, roleDisplayName } = await req
      .json();

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({ error: "Email and firstName are required" }),
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

    // Verify the email actually corresponds to a real user account
    const { data: targetUser, error: lookupErr } = await supabase
      .from("profiles")
      .select("id, email")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (lookupErr || !targetUser) {
      console.warn(
        `[send-welcome-email] Refused: no profile found for ${normalizedEmail}`,
      );
      return new Response(
        JSON.stringify({
          error: "Cannot send welcome email — no matching user account.",
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const safeName = escapeHtml(String(firstName).slice(0, 100));
    const safeRole = escapeHtml(
      String(roleDisplayName || "Staff Member").slice(0, 100),
    );
    const safeEmail = escapeHtml(normalizedEmail);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to InVision Network</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to InVision Network!</h1>
          </div>

          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Hi ${safeName},</p>

            <p style="font-size: 16px; color: #374151;">
              Your staff account has been created by an administrator. Welcome to the InVision Network team!
            </p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4a90d9;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Your Role:</strong></p>
              <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px; font-weight: 600;">${safeRole}</p>

              <p style="margin: 15px 0 0 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></p>
              <p style="margin: 5px 0 0 0; color: #111827; font-size: 16px;">${safeEmail}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${ALLOWED_ORIGIN}/login"
                 style="display: inline-block; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Sign In to Your Dashboard
              </a>
            </div>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>🔐 Security Tip:</strong> Keep your password secure and never share your login credentials with anyone.
                InVision Network will <strong>never</strong> ask for your password by email or phone.
              </p>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              Questions? Contact us at
              <a href="mailto:support@invisionnetwork.org" style="color: #4a90d9; text-decoration: none;">support@invisionnetwork.org</a>
            </p>

            <p style="font-size: 14px; color: #6b7280;">
              Best regards,<br>
              <strong>The InVision Network Team</strong>
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
              © ${new Date().getFullYear()} InVision Network. All rights reserved.
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
              You received this email because a staff account was created for you by an administrator.
            </p>
          </div>
        </body>
      </html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: [normalizedEmail],
        subject: "Welcome to InVision Network — Your Account is Ready",
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await response.json();
    console.log(
      `[send-welcome-email] ${caller.email} sent welcome email to ${normalizedEmail}`,
    );

    // Audit log
    try {
      await supabase.from("auth_audit_logs").insert({
        user_id: caller.id,
        email: caller.email,
        event_type: "admin_action",
        action: "welcome_email_sent",
        success: true,
        metadata: { recipient: normalizedEmail, role: roleDisplayName },
      });
    } catch (auditErr) {
      console.error("Audit log write failed (non-blocking):", auditErr);
    }

    return new Response(JSON.stringify({ success: true, messageId: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending welcome email:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

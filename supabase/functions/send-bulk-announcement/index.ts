import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limit: 3 bulk-broadcasts per hour per admin user
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    // ====================================================================
    // AUTH + AUTHORIZATION — admin role REQUIRED
    // (Bulk-email-to-everyone is a serious capability. Only admins.)
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
        `[send-bulk-announcement] FORBIDDEN attempt by ${caller.email} (${caller.id})`,
      );
      return new Response(
        JSON.stringify({ error: "Forbidden — admin role required" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Per-admin rate limit
    const rateCheck = checkRateLimit(caller.id);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error:
            "Rate limit exceeded. Bulk announcements are capped at 3 per hour.",
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

    const { subject, content } = await req.json();
    if (!subject?.trim() || !content?.trim()) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (subject.length > 200 || content.length > 50_000) {
      return new Response(
        JSON.stringify({ error: "Subject or content too long" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Pull confirmed newsletter subscribers only — no leaked sources.
    const { data: subscribers, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("email");

    if (subError) {
      throw new Error(`Failed to load subscribers: ${subError.message}`);
    }

    const emailSet = new Set<string>();
    (subscribers ?? []).forEach((s: { email: string | null }) => {
      if (s.email) emailSet.add(s.email.toLowerCase().trim());
    });

    const allEmails = Array.from(emailSet);

    if (allEmails.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          sent: 0,
          message: "No recipients found",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    const safeSubject = subject.trim();
    const safeContent = content.trim();
    const senderEmail = Deno.env.get("SENDER_EMAIL") ??
      "noreply@invisionnetwork.org";

    // Send in batches of 50 (Resend per-second limits)
    let sentCount = 0;
    const batchSize = 50;

    for (let i = 0; i < allEmails.length; i += batchSize) {
      const batch = allEmails.slice(i, i + batchSize);

      const emailPromises = batch.map((email) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `InVision Network <${senderEmail}>`,
            to: [email],
            subject: safeSubject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 30px; border-radius: 12px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0 0 10px; font-size: 24px;">${safeSubject}</h1>
                  <p style="color: #a0aec0; margin: 0; font-size: 13px;">From InVision Network — Cybersecurity for Everyone</p>
                </div>
                <div style="padding: 30px 20px; background: #ffffff;">
                  <div style="color: #333; font-size: 15px; line-height: 1.7;">
                    ${safeContent.replace(/\n/g, "<br />")}
                  </div>
                </div>
                <div style="text-align: center; padding: 20px; color: #999; font-size: 11px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 4px 0;">© InVision Network — Kettering, Ohio</p>
                  <p style="margin: 4px 0;">
                    You received this because you subscribed to InVision Network updates.
                    <br />
                    Questions? <a href="mailto:hello@invisionnetwork.org" style="color: #4a90d9;">hello@invisionnetwork.org</a>
                  </p>
                </div>
              </div>
            `,
          }),
        }).then(async (r) => {
          await r.text(); // consume body
          return r.ok;
        }).catch((err) => {
          console.error("Resend send failed:", err);
          return false;
        })
      );

      const results = await Promise.all(emailPromises);
      sentCount += results.filter(Boolean).length;
    }

    // Audit log so we know who sent what to whom
    try {
      await supabase.from("auth_audit_logs").insert({
        user_id: caller.id,
        email: caller.email,
        event_type: "admin_action",
        action: "bulk_announcement_sent",
        success: true,
        metadata: {
          subject: safeSubject,
          recipient_count: allEmails.length,
          sent_count: sentCount,
        },
      });
    } catch (auditErr) {
      console.error("Audit log write failed (non-blocking):", auditErr);
    }

    console.log(
      `[send-bulk-announcement] ${caller.email} sent to ${sentCount}/${allEmails.length} recipients`,
    );

    return new Response(
      JSON.stringify({
        success: true,
        sent: sentCount,
        total: allEmails.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : String(error);
    console.error("Error sending bulk announcement:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

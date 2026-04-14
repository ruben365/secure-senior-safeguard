import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// SECURITY CRITICAL — internal cron-style processor.
//
// This function flushes the `scheduled_emails` queue. Before this hardening
// it was deployed with `verify_jwt = false` and had ZERO authentication, so
// any internet user could poll the endpoint to:
//   1. Force-flush the queue (Resend quota DoS / billing spike).
//   2. Cause email_delivery_logs to spam.
//   3. Force premature delivery of campaigns scheduled for a future time.
//
// The fix has THREE layers:
//   1. config.toml `verify_jwt = true` — gateway rejects anything without
//      a valid Supabase JWT (anon, authed user, or service role).
//   2. In-function constant-time check that the bearer token EQUALS the
//      service role key. This rejects anon key calls (the anon key is
//      shipped in the public frontend bundle), and rejects authenticated
//      user JWTs. Only the service role can trigger this.
//   3. Per-IP rate limit as defense-in-depth in case a service-role key
//      ever leaked, an attacker can't burn the queue in a tight loop.
//
// Callers (legitimate):
//   - `schedule-campaign-emails` (sends Authorization: Bearer <service_role>)
//   - Scheduled cron tasks (must include the service role key)
// ============================================================================

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60 * 1000;
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

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
// Constant-time string comparison to prevent timing attacks against the
// service role key. Bails early on length mismatch (length is not a secret),
// then xor-compares every byte without short-circuiting.
// ============================================================================
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  let mismatch = 0;
  for (let i = 0; i < aBytes.length; i++) {
    mismatch |= aBytes[i] ^ bBytes[i];
  }
  return mismatch === 0;
}

// ============================================================================
// HTML escape for template variable substitution. The previous version did
// a raw string replace, which means anyone able to write to scheduled_emails
// (today: only service role) could inject arbitrary HTML/JS into the rendered
// email body. Locking down NOW so a future bug that lets less-privileged
// code write to scheduled_emails can't escalate to stored XSS in inboxes.
// ============================================================================
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"'/]/g, (ch) => HTML_ESCAPES[ch]);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface ScheduledEmailRow {
  id: string;
  recipient_email: string;
  template_id: string;
  template_data: Record<string, unknown> | null;
  campaign_id: string | null;
  attempts: number;
  email_templates: {
    name: string | null;
    subject: string | null;
    html_body: string | null;
    text_body: string | null;
  } | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Rate limit BEFORE auth — auth has cost, and we don't want a DoS to
  // be able to repeatedly trigger key comparison even if it would fail.
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
    console.error("[send-automated-email] missing server configuration");
    return new Response(
      JSON.stringify({ error: "Server configuration missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Auth check: bearer token MUST equal the service role key. We do not
  // accept the anon key (shipped in frontend bundles), and we do not accept
  // authenticated user JWTs. This endpoint is internal-only.
  const authHeader = req.headers.get("Authorization") || "";
  const presentedToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (
    !presentedToken ||
    !constantTimeEqual(presentedToken, SUPABASE_SERVICE_ROLE_KEY)
  ) {
    // Generic 401 — no information about whether the header was present,
    // empty, or wrong. Don't help an attacker enumerate.
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!RESEND_API_KEY) {
    console.error("[send-automated-email] missing RESEND_API_KEY");
    return new Response(
      JSON.stringify({ error: "Email provider not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Fetch pending emails scheduled for now or earlier. Cap at 50 per
    // invocation so a giant backlog can't blow the function timeout.
    const { data: pendingEmails, error: fetchError } = await supabase
      .from("scheduled_emails")
      .select(
        "id, recipient_email, template_id, template_data, campaign_id, attempts, email_templates(name, subject, html_body, text_body)",
      )
      .eq("status", "pending")
      .lte("scheduled_for", new Date().toISOString())
      .lt("attempts", 3)
      .limit(50);

    if (fetchError) throw fetchError;

    const emails = (pendingEmails ?? []) as unknown as ScheduledEmailRow[];

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ message: "No emails to send", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`[send-automated-email] processing ${emails.length} emails`);

    let successCount = 0;
    let failureCount = 0;

    for (const email of emails) {
      try {
        const template = email.email_templates;
        if (!template || !template.html_body || !template.subject) {
          throw new Error("Template not found or incomplete");
        }

        let htmlBody = template.html_body;
        let subject = template.subject;
        let textBody = template.text_body || "";

        // Render template variables. HTML body gets escaped values; text
        // body and subject use the raw stringified value (no markup risk
        // in plaintext, and the subject line is rendered as a header by
        // the email client, not as HTML).
        if (email.template_data && typeof email.template_data === "object") {
          for (const [key, value] of Object.entries(email.template_data)) {
            // Only allow simple word-character keys to avoid regex injection
            if (!/^[A-Za-z0-9_]+$/.test(key)) continue;
            const safeKey = escapeRegex(key);
            const placeholder = new RegExp(`{{\\s*${safeKey}\\s*}}`, "g");
            const rawValue = String(value ?? "");
            htmlBody = htmlBody.replace(placeholder, escapeHtml(rawValue));
            subject = subject.replace(placeholder, rawValue);
            textBody = textBody.replace(placeholder, rawValue);
          }
        }

        // Send email via Resend
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "InVision Network <noreply@invisionnetwork.org>",
            to: [email.recipient_email],
            subject,
            html: htmlBody,
            text: textBody,
          }),
        });

        const resendData = await resendResponse.json();

        if (!resendResponse.ok) {
          throw new Error(resendData?.message || "Failed to send email");
        }

        await supabase
          .from("scheduled_emails")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .eq("id", email.id);

        await supabase.from("email_delivery_logs").insert({
          scheduled_email_id: email.id,
          recipient_email: email.recipient_email,
          template_name: template.name,
          campaign_name: email.campaign_id ? "Campaign" : "Automated",
          sent_at: new Date().toISOString(),
          resend_email_id: resendData.id,
          metadata: { resend_response: resendData },
        });

        successCount++;
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : String(error);
        console.error(
          `[send-automated-email] failed email ${email.id}: ${message}`,
        );

        await supabase
          .from("scheduled_emails")
          .update({
            status: "failed",
            error_message: message || "Unknown error",
            attempts: (email.attempts ?? 0) + 1,
          })
          .eq("id", email.id);

        failureCount++;
      }
    }

    return new Response(
      JSON.stringify({
        message: "Email processing complete",
        processed: emails.length,
        success: successCount,
        failed: failureCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[send-automated-email] fatal:", message);
    return new Response(
      JSON.stringify({ error: message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

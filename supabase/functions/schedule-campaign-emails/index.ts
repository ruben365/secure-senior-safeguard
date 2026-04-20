import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

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
// Same hardening pattern as send-automated-email. Before this fix the
// function had ZERO authentication and could be polled by anyone on the
// internet to:
//   1. Force-schedule recurring campaigns (premature delivery).
//   2. Drain newsletter_subscribers / booking_requests into scheduled_emails.
//   3. Then immediately invoke send-automated-email to flush the queue.
//
// Lockdown:
//   1. config.toml verify_jwt = true.
//   2. In-function constant-time check that the bearer token equals the
//      service role key (rejects anon key + authed user JWTs).
//   3. Per-IP rate limit defense in depth.
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

// deno-lint-ignore no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseClient = any;

type Campaign = {
  id: string;
  campaign_type: string;
  schedule_config?: {
    frequency?: string;
    day_of_month?: number;
  } | null;
  target_audience?: string | null;
  template_id?: string | null;
  sent_count?: number | null;
};

type EmailRow = {
  email: string;
};

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
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(rateCheck.retryAfter),
      },
    });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[schedule-campaign-emails] missing server configuration");
    return new Response(
      JSON.stringify({ error: "Server configuration missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const authHeader = req.headers.get("Authorization") || "";
  const presentedToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (
    !presentedToken ||
    !constantTimeEqual(presentedToken, SUPABASE_SERVICE_ROLE_KEY)
  ) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const { data: activeCampaigns, error: campaignsError } = await supabase
      .from("email_campaigns")
      .select("*")
      .eq("status", "active");

    if (campaignsError) throw campaignsError;

    if (!activeCampaigns || activeCampaigns.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active campaigns", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const campaigns = activeCampaigns as Campaign[];

    console.log(
      `[schedule-campaign-emails] processing ${campaigns.length} campaigns`,
    );

    let scheduledCount = 0;

    for (const campaign of campaigns) {
      try {
        if (campaign.campaign_type === "recurring") {
          const scheduleConfig = campaign.schedule_config ?? {};
          const now = new Date();

          if (scheduleConfig.frequency === "monthly") {
            const dayOfMonth = now.getDate();
            const scheduledDay = scheduleConfig.day_of_month || 1;

            if (dayOfMonth === scheduledDay) {
              const { data: recentSends } = await supabase
                .from("scheduled_emails")
                .select("id")
                .eq("campaign_id", campaign.id)
                .gte(
                  "created_at",
                  new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
                )
                .limit(1);

              if (!recentSends || recentSends.length === 0) {
                await scheduleForCampaign(supabase, campaign);
                scheduledCount++;
              }
            }
          }
        } else if (campaign.campaign_type === "one-time") {
          const { data: existingSends } = await supabase
            .from("scheduled_emails")
            .select("id")
            .eq("campaign_id", campaign.id)
            .limit(1);

          if (!existingSends || existingSends.length === 0) {
            await scheduleForCampaign(supabase, campaign);
            scheduledCount++;

            await supabase
              .from("email_campaigns")
              .update({ status: "completed" })
              .eq("id", campaign.id);
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error(
          `[schedule-campaign-emails] campaign ${campaign.id} error: ${msg}`,
        );
      }
    }

    // Trigger send-automated-email function. Same auth scheme — service
    // role key in Authorization header.
    if (scheduledCount > 0) {
      try {
        await fetch(`${SUPABASE_URL}/functions/v1/send-automated-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
        });
      } catch (triggerError) {
        const msg =
          triggerError instanceof Error
            ? triggerError.message
            : String(triggerError);
        console.error(
          `[schedule-campaign-emails] downstream trigger failed: ${msg}`,
        );
      }
    }

    return new Response(
      JSON.stringify({
        message: "Campaign scheduling complete",
        campaigns_processed: campaigns.length,
        emails_scheduled: scheduledCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[schedule-campaign-emails] fatal:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

async function scheduleForCampaign(
  supabase: SupabaseClient,
  campaign: Campaign,
) {
  let recipients: string[] = [];

  if (campaign.target_audience === "all_subscribers") {
    const { data: subscribers } = await supabase
      .from("newsletter_subscribers")
      .select("email");
    recipients = (subscribers as EmailRow[] | null)?.map((s) => s.email) || [];
  } else if (campaign.target_audience === "new_customers") {
    const { data: newCustomers } = await supabase
      .from("booking_requests")
      .select("email")
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      );
    recipients =
      (newCustomers as EmailRow[] | null)?.map((c) => c.email) || [];
  }

  // De-dupe so we never schedule two emails for the same recipient in the
  // same batch (defends against newsletter_subscribers having dupes).
  const uniqueRecipients = Array.from(
    new Set(recipients.filter((r) => typeof r === "string" && r.includes("@"))),
  );

  const emailsToInsert = uniqueRecipients.map((email) => ({
    recipient_email: email,
    template_id: campaign.template_id,
    campaign_id: campaign.id,
    scheduled_for: new Date().toISOString(),
    template_data: {},
  }));

  if (emailsToInsert.length > 0) {
    await supabase.from("scheduled_emails").insert(emailsToInsert);

    await supabase
      .from("email_campaigns")
      .update({
        sent_count: (campaign.sent_count ?? 0) + emailsToInsert.length,
      })
      .eq("id", campaign.id);
  }
}

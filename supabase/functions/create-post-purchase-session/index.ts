import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[POST-PURCHASE-SESSION] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (3 per 5 minutes) — this endpoint mints magic links and
// auto-creates accounts. Tight cap to make session-id replay attacks
// expensive.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 5 * 60 * 1000;

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

// ============================================================================
// HTML escape for the magic link email body
// ============================================================================
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================================
// Allow-list of plan tiers we'll honor from session metadata. Anything else
// gets normalized to "starter".
// ============================================================================
const ALLOWED_PLAN_TIERS = new Set([
  "starter",
  "essential",
  "professional",
  "premium",
  "family",
  "enterprise",
]);

const resolveDashboardPath = (value: unknown) => {
  if (typeof value !== "string") return "/portal";
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/portal";
  }
  if (trimmed.length > 200) {
    return "/portal";
  }
  return trimmed;
};

async function emailMagicLink(
  resendApiKey: string,
  toEmail: string,
  toName: string,
  magicLink: string,
  planTier: string,
) {
  const escName = escapeHtml(toName || "Customer");
  const escTier = escapeHtml(planTier);
  const escLink = escapeHtml(magicLink);

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "InVision Network <hello@invisionnetwork.org>",
      to: [toEmail],
      subject: "Your InVision Network Account is Ready",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #1a1a2e; margin-bottom: 10px;">Welcome to InVision Network</h1>
          </div>

          <p style="font-size: 16px;">Hi ${escName},</p>

          <p>Your payment has been confirmed and your account is ready. Click the secure sign-in link below to access your member portal:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${escLink}" style="display: inline-block; padding: 14px 28px; background: #1a1a2e; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">Sign In to Your Account</a>
          </div>

          <p style="font-size: 14px; color: #555;">This link is single-use and will expire in 1 hour. If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="font-size: 12px; word-break: break-all; color: #777;">${escLink}</p>

          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 14px;"><strong>Plan:</strong> ${escTier}</p>
          </div>

          <div style="background: #faf5ff; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9d5ff;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Security note:</strong> InVision Network will never ask for your password by email. If you didn't request this account, contact us immediately at <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a>.
            </p>
          </div>

          <p style="margin-top: 30px;">Welcome aboard.<br><strong>The InVision Network Team</strong></p>
        </div>
      `,
    }),
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Per-IP rate limit
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { session_id } = await req.json();

    if (!session_id || typeof session_id !== "string") {
      return new Response(
        JSON.stringify({ success: false, error: "session_id is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Stripe checkout session IDs are prefixed `cs_` and are alphanumeric/_
    if (!/^cs_[A-Za-z0-9_]+$/.test(session_id) || session_id.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid session_id format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    logStep("Processing session", { session_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ success: false, message: "Payment not completed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    // ====================================================================
    // CRITICAL SECURITY: Time-bound check. Stripe sessions with a paid
    // status that are more than 30 minutes old should not still be
    // generating magic links — that would let an attacker who scraped a
    // session ID from any source mint a passwordless login forever after.
    // ====================================================================
    const sessionAgeMs = Date.now() - session.created * 1000;
    const MAX_SESSION_AGE_MS = 30 * 60 * 1000;
    if (sessionAgeMs > MAX_SESSION_AGE_MS) {
      logStep("Session is stale - refusing to mint magic link", {
        sessionAgeMs,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: "This checkout session has expired. Please sign in normally or request a password reset.",
        }),
        {
          status: 410,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const customerEmail = (
      session.customer_email || session.customer_details?.email || ""
    )
      .toLowerCase()
      .trim();
    const customerName = (
      session.customer_details?.name || session.metadata?.customer_name || ""
    )
      .slice(0, 100)
      .trim();
    const isSubscription = session.mode === "subscription";
    const dashboardPath = resolveDashboardPath(session.metadata?.return_to);

    // Plan tier from session metadata, allow-list-bounded
    const rawTier = (session.metadata?.plan_tier || "starter").toLowerCase();
    const planTier = ALLOWED_PLAN_TIERS.has(rawTier) ? rawTier : "starter";

    if (!customerEmail) {
      throw new Error("No customer email found in session");
    }

    logStep("Customer details", {
      email: customerEmail,
      isSubscription,
      planTier,
    });

    // ====================================================================
    // Look up existing user by email via the profiles table (faster and
    // safer than scanning auth.admin.listUsers, which is paginated and
    // would silently miss users beyond page 1).
    // ====================================================================
    let userId: string | null = null;
    let isNewUser = false;
    let existingProfile: { id: string; metadata: Record<string, unknown> | null } | null = null;

    const { data: profileLookup } = await supabaseAdmin
      .from("profiles")
      .select("id, metadata")
      .eq("email", customerEmail)
      .maybeSingle();

    if (profileLookup) {
      userId = profileLookup.id;
      existingProfile = profileLookup as {
        id: string;
        metadata: Record<string, unknown> | null;
      };
      logStep("Found existing user", { userId });
    }

    // ====================================================================
    // CRITICAL: Idempotency. If this session_id has already been processed
    // for this user, refuse to mint a fresh magic link. This makes
    // session-id replay attacks impossible — the very first call to this
    // endpoint with a given session_id is the only one that can produce a
    // login link.
    // ====================================================================
    if (existingProfile?.metadata) {
      const md = existingProfile.metadata as Record<string, unknown>;
      const processedIds = Array.isArray(md.processed_session_ids)
        ? (md.processed_session_ids as string[])
        : [];
      if (processedIds.includes(session_id)) {
        logStep("Session already processed - returning success without new link", {
          session_id,
        });
        return new Response(
          JSON.stringify({
            success: true,
            user_id: userId,
            is_new_user: false,
            // No magic link returned on replay
            magic_link: null,
            dashboard_path: isSubscription ? "/portal" : "/portal",
            customer_email: customerEmail,
            customer_name: customerName,
            is_subscription: isSubscription,
            plan_tier: planTier,
            message: "Already processed. Check your email for the sign-in link.",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    }

    // ====================================================================
    // No existing user — create one. The new account is auto-confirmed
    // because Stripe verified the email via successful payment, but the
    // password is a random unrecoverable value so the customer must use
    // the magic link to access the account.
    // ====================================================================
    if (!userId) {
      logStep("Creating new user account");

      const tempPassword = crypto.randomUUID() + crypto.randomUUID();

      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email: customerEmail,
          password: tempPassword,
          email_confirm: true,
          user_metadata: {
            full_name: customerName,
            subscription_tier: planTier,
            created_via: "post_purchase",
          },
        });

      if (createError) {
        logStep("Error creating user", { error: createError.message });
        throw new Error("Failed to provision account");
      }

      if (newUser?.user) {
        userId = newUser.user.id;
        isNewUser = true;
        logStep("Created new user", { userId });

        const nameParts = customerName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .upsert(
            {
              id: userId,
              email: customerEmail,
              first_name: firstName,
              last_name: lastName,
              full_name: customerName || null,
              account_status: "active",
              subscription_tier: planTier,
              email_verified: true,
            },
            { onConflict: "id" },
          );

        if (profileError) {
          logStep("Warning: Profile creation failed", {
            error: profileError.message,
          });
        }

        // ================================================================
        // CRITICAL: Use the `customer` role from the actual app_role enum.
        // The previous code used "senior" / "user" — neither of which
        // exist in the enum, so every assignment silently failed and new
        // post-purchase users ended up with NO role at all.
        // The unique constraint on user_roles is (user_id, role), so we
        // must use the composite key for onConflict.
        // ================================================================
        const { error: roleError } = await supabaseAdmin
          .from("user_roles")
          .upsert(
            {
              user_id: userId,
              role: "customer",
            },
            { onConflict: "user_id,role" },
          );

        if (roleError) {
          logStep("Warning: Role assignment failed", {
            error: roleError.message,
          });
        }
      }
    }

    // ====================================================================
    // Mint a single-use magic link
    // ====================================================================
    let magicLinkUrl: string | null = null;

    if (userId) {
      const origin = req.headers.get("origin") || "https://www.invisionnetwork.org";
      // Only allow our own origin to be used as the redirect base
      const allowedOrigins = new Set([
        "https://www.invisionnetwork.org",
        "https://invisionnetwork.org",
      ]);
      const safeOrigin = allowedOrigins.has(origin)
        ? origin
        : "https://www.invisionnetwork.org";

      const redirectTo = `${safeOrigin}${dashboardPath}`;

      const { data: linkData, error: linkError } =
        await supabaseAdmin.auth.admin.generateLink({
          type: "magiclink",
          email: customerEmail,
          options: {
            redirectTo,
          },
        });

      if (linkError) {
        logStep("Warning: Magic link generation failed", {
          error: linkError.message,
        });
      } else if (linkData?.properties?.action_link) {
        magicLinkUrl = linkData.properties.action_link;
        logStep("Magic link generated", { redirectTo });

        // ============================================================
        // Persist the processed session_id BEFORE returning the link, so
        // even if the response is intercepted and replayed, the second
        // call gets the cached "already processed" branch.
        // ============================================================
        const md = (existingProfile?.metadata || {}) as Record<string, unknown>;
        const processedIds = Array.isArray(md.processed_session_ids)
          ? ([...(md.processed_session_ids as string[]), session_id] as string[])
          : [session_id];

        await supabaseAdmin
          .from("profiles")
          .update({
            metadata: {
              ...md,
              processed_session_ids: processedIds.slice(-20), // cap history
              last_post_purchase_at: new Date().toISOString(),
            },
          })
          .eq("id", userId);

        // ============================================================
        // Email the magic link as a backup. If Resend isn't configured we
        // skip silently — the response still contains the link for the
        // immediate redirect.
        // ============================================================
        if (resendApiKey) {
          try {
            await emailMagicLink(
              resendApiKey,
              customerEmail,
              customerName,
              magicLinkUrl,
              planTier,
            );
            logStep("Magic link email sent");
          } catch (e) {
            logStep("Magic link email failed (non-fatal)", { error: String(e) });
          }
        }
      }
    }

    const response = {
      success: true,
      user_id: userId,
      is_new_user: isNewUser,
      magic_link: magicLinkUrl,
      dashboard_path: dashboardPath,
      customer_email: customerEmail,
      customer_name: customerName,
      is_subscription: isSubscription,
      plan_tier: planTier,
    };

    logStep("Session processing complete", {
      userId,
      isNewUser,
      hasMagicLink: !!magicLinkUrl,
    });

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

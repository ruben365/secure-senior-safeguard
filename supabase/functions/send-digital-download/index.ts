import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[SEND-DIGITAL-DOWNLOAD] ${step}${detailsStr}`);
};

interface DownloadRequest {
  // Server-side identifier — we look the rest up.
  order_id: string;
}

// Sanitize text that goes into HTML
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================================================
// Constant-time string comparison. Service role key checks MUST NOT use ===
// because that short-circuits on the first mismatch byte and leaks the
// length-prefix of the secret to a network-timing observer.
// ============================================================================
function constantTimeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// ============================================================================
// Per-IP rate limit. Defense-in-depth against UUID-enumeration probes against
// the order_id parameter. Service-role internal calls bypass this limit so
// the verify-payment hand-off and any future cron triggers stay unbounded.
// 20 deliveries per 10 minutes per IP is generous for legit retries but
// blocks brute-force order_id scanning.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) throw new Error("RESEND_API_KEY is not set");

    // ====================================================================
    // SECURITY: This function used to accept caller-supplied download_url
    // values and email them out from our domain. That's a phishing kit.
    // It now ONLY accepts an order_id and looks up everything from the
    // database, and ONLY proceeds if the order is paid.
    //
    // Authorization: caller must present the service role key (cron /
    // internal calls), an admin token, or own the order being delivered.
    // ====================================================================
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

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

    const callerToken = authHeader.replace("Bearer ", "").trim();
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    let callerUserId: string | null = null;
    let isInternal = false;
    let isAdmin = false;

    // Service-role token = internal/cron call. Constant-time compare to
    // prevent timing-side-channel leaks of the service role key.
    if (serviceRoleKey && constantTimeEqual(callerToken, serviceRoleKey)) {
      isInternal = true;
    } else {
      const { data: userData, error: userError } = await supabaseClient.auth
        .getUser(callerToken);
      if (userError || !userData?.user) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired token" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      callerUserId = userData.user.id;

      const { data: adminCheck } = await supabaseClient.rpc("has_role", {
        user_id: callerUserId,
        role: "admin",
      });
      isAdmin = !!adminCheck;
    }

    // ====================================================================
    // Per-IP rate limit. Skipped for internal/service-role calls so the
    // verify-payment hand-off (and future cron triggers) stay unbounded.
    // ====================================================================
    if (!isInternal) {
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
    }

    const body: DownloadRequest = await req.json();
    const { order_id } = body;

    if (!order_id || typeof order_id !== "string") {
      return new Response(
        JSON.stringify({ error: "order_id is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // partner_orders.id is a UUID — reject anything else without touching
    // the database. Stops UUID-pattern probing from amplifying into DB load.
    const UUID_RE =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!UUID_RE.test(order_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid order_id format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Look up the order — single source of truth
    const { data: order, error: orderErr } = await supabaseClient
      .from("partner_orders")
      .select(
        "id, customer_id, customer_email, customer_name, payment_status, status, metadata",
      )
      .eq("id", order_id)
      .maybeSingle();

    if (orderErr || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Authorization rules: internal/cron OK, admin OK, otherwise must own
    if (!isInternal && !isAdmin) {
      const ownsOrder = callerUserId && order.customer_id &&
        callerUserId === order.customer_id;
      if (!ownsOrder) {
        console.warn(
          `[send-digital-download] FORBIDDEN: caller=${callerUserId} order_owner=${order.customer_id}`,
        );
        return new Response(
          JSON.stringify({ error: "Forbidden" }),
          {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    }

    // Hard rule per directive "nothing for free": only paid orders ship.
    if (order.payment_status !== "completed") {
      return new Response(
        JSON.stringify({
          error:
            "Order is not paid. Digital products cannot be released until payment is confirmed.",
          payment_status: order.payment_status,
        }),
        {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Line items live in partner_orders.metadata.items (no order_items table).
    type MetaItem = {
      productId?: string;
      product_id?: string;
      name?: string;
      quantity?: number;
    };
    const meta = (order.metadata ?? {}) as { items?: MetaItem[] };
    const metaItems: MetaItem[] = Array.isArray(meta.items) ? meta.items : [];

    if (metaItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Order has no items to deliver" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Look up each line item product to verify it is actually digital
    const deliverables: Array<{ name: string; url: string | null }> = [];
    for (const li of metaItems) {
      const productId = li.productId || li.product_id;
      if (!productId) continue;

      const { data: product } = await supabaseClient
        .from("products")
        .select("id, name, product_type, file_url")
        .eq("id", productId)
        .maybeSingle();

      if (!product) {
        console.warn(
          `[send-digital-download] Product ${productId} not found, skipping`,
        );
        continue;
      }

      if (product.product_type !== "digital") {
        // Physical / service items do not get a download link
        continue;
      }

      deliverables.push({
        name: product.name || li.name || "Digital Product",
        url: product.file_url ?? null,
      });
    }

    if (deliverables.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No digital products in this order",
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const customerEmail = order.customer_email;
    const customerName = order.customer_name || "there";

    if (!customerEmail) {
      throw new Error("Order has no customer_email");
    }

    logStep("Delivering digital order", {
      order_id: order.id,
      to: customerEmail,
      productCount: deliverables.length,
    });

    const resend = new Resend(resendKey);

    // NOTE: The file_url values are direct links to the products bucket /
    // marketing host and are NOT time-bound. We deliberately do not promise
    // expiry in the email body — claiming expiry without enforcing it would
    // be a misleading claim. Future enhancement: switch products.file_url to
    // a Storage path and mint short-lived signed URLs at delivery time.
    const deliveredAt = new Date().toISOString();

    const productListHtml = deliverables
      .map((p) => {
        const safeName = escapeHtml(p.name);
        // Only emit links for verified internal URLs (https + our own domains)
        let downloadButton = `<p style="color: #666;">Download link will be sent separately for: ${safeName}</p>`;
        if (p.url) {
          let parsed: URL | null = null;
          try {
            parsed = new URL(p.url);
          } catch {
            parsed = null;
          }
          const allowedHosts = [
            "invisionnetwork.org",
            "www.invisionnetwork.org",
            "qexeqdpejhacbhewuvbd.supabase.co",
          ];
          const isHttps = parsed?.protocol === "https:";
          const isAllowedHost = parsed
            ? allowedHosts.some(
              (h) => parsed!.host === h || parsed!.host.endsWith("." + h),
            )
            : false;
          if (isHttps && isAllowedHost) {
            downloadButton =
              `<a href="${parsed!.toString()}" style="display: inline-block; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 8px 0;">Download ${safeName}</a>`;
          } else {
            console.warn(
              `[send-digital-download] Refused unsafe URL for ${safeName}: ${p.url}`,
            );
          }
        }

        return `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #1a1a2e;">
          <h3 style="margin: 0 0 12px 0; color: #1a1a2e;">${safeName}</h3>
          ${downloadButton}
        </div>
      `;
      })
      .join("");

    const safeCustomerName = escapeHtml(customerName);
    const safeOrderId = escapeHtml(order.id);

    const emailResponse = await resend.emails.send({
      from: "InVision Network <hello@invisionnetwork.org>",
      to: [customerEmail],
      subject: "Your Digital Products Are Ready",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

          <div style="text-align: center; margin-bottom: 32px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 24px; border-radius: 16px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Purchase</h1>
            </div>
          </div>

          <p style="font-size: 16px;">Hi ${safeCustomerName},</p>

          <p style="font-size: 16px;">Your digital products are ready. Click the buttons below to access your purchases:</p>

          ${productListHtml}

          <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin: 24px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Important:</strong> Please download and save your purchases to your own device. Keep this email as your receipt &mdash; the download buttons above are tied to your order and should be treated like a personal receipt.
            </p>
          </div>

          <p style="font-size: 14px; color: #666;">Order Reference: ${safeOrderId}</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">

          <div style="text-align: center;">
            <p style="font-size: 14px; color: #666;">Need help? Contact us at</p>
            <a href="mailto:hello@invisionnetwork.org" style="color: #1a1a2e; text-decoration: none; font-weight: bold;">hello@invisionnetwork.org</a>
          </div>

          <div style="text-align: center; margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              © ${new Date().getFullYear()} InVision Network — Cybersecurity for Everyone
            </p>
          </div>

        </body>
        </html>
      `,
    });

    logStep("Email sent successfully", { response: emailResponse });

    // Mark the order as delivered (order_status enum has no "completed")
    const { error: updateError } = await supabaseClient
      .from("partner_orders")
      .update({
        status: "delivered",
        delivered_at: new Date().toISOString(),
        notes:
          `Digital products delivered via email at ${new Date().toISOString()}`,
      })
      .eq("id", order.id);

    if (updateError) {
      logStep("Warning: Could not update order status", {
        error: updateError.message,
      });
    } else {
      logStep("Order status updated to completed", { order_id: order.id });
    }

    return new Response(
      JSON.stringify({
        success: true,
        deliveredAt,
        delivered: deliverables.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage, success: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

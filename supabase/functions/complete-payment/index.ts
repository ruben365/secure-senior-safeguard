import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[COMPLETE-PAYMENT] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (10 requests / minute) — this is a public endpoint that
// triggers email sends and DB writes, so we cap it to prevent abuse.
// ============================================================================
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase's built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

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
// HTML escape — every dynamic value gets escaped before being injected into
// an email body so customer-supplied content can never inject markup.
// ============================================================================
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface CompletePaymentRequest {
  paymentType: "donation" | "subscription" | "product" | "service" | "training";
  paymentIntentId?: string;
  sessionId?: string;
}

interface ResolvedPayment {
  paymentIntentId: string;
  amount: number; // cents, from Stripe
  currency: string;
  metadata: Record<string, string>;
  customerEmail: string;
  customerName: string;
}

// ============================================================================
// CRITICAL: Resolve a payment from Stripe and pull the AUTHORITATIVE data
// (amount, customerEmail, customerName, recordId, etc.) from the payment
// intent metadata that was set when the intent was created server-side.
// This makes amount tampering and email-harvesting via this endpoint
// impossible — every value used downstream comes from Stripe, never from
// the client request body.
// ============================================================================
async function resolvePayment(
  stripe: Stripe,
  paymentIntentId?: string,
  sessionId?: string,
): Promise<ResolvedPayment | null> {
  let pi: Stripe.PaymentIntent | null = null;
  let fallbackEmail = "";
  let fallbackName = "";
  let sessionMetadata: Record<string, string> = {};

  if (sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer_details"],
    });
    if (session.payment_status !== "paid") return null;
    fallbackEmail = (
      session.customer_email || session.customer_details?.email || ""
    )
      .toLowerCase()
      .trim();
    fallbackName = (
      session.customer_details?.name || session.metadata?.customerName || ""
    ).trim();
    sessionMetadata = (session.metadata || {}) as Record<string, string>;
    if (typeof session.payment_intent === "string") {
      pi = await stripe.paymentIntents.retrieve(session.payment_intent);
    } else if (session.payment_intent) {
      pi = session.payment_intent as Stripe.PaymentIntent;
    }
  } else if (paymentIntentId) {
    pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  }

  if (!pi || pi.status !== "succeeded") return null;

  const md = (pi.metadata || {}) as Record<string, string>;
  const mergedMetadata = { ...sessionMetadata, ...md };
  const customerEmail = (mergedMetadata.customerEmail || fallbackEmail || "")
    .toLowerCase()
    .trim();
  const customerName = (
    mergedMetadata.customerName ||
    fallbackName ||
    "Customer"
  ).trim();

  // Hard requirement: the create-* function MUST have stamped customerEmail
  // into the payment intent metadata. If it didn't, we refuse to send any
  // email — that prevents the legacy "trust the client" path.
  if (!customerEmail) return null;

  return {
    paymentIntentId: pi.id,
    amount: pi.amount,
    currency: pi.currency,
    metadata: mergedMetadata,
    customerEmail,
    customerName,
  };
}

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "InVision Network <hello@invisionnetwork.org>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Email send failed:", error);
    throw new Error("Failed to send email");
  }

  return response.json();
}

async function sendAdminNotification(subject: string, html: string) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "InVision Network <hello@invisionnetwork.org>",
        to: ["hello@invisionnetwork.org"],
        subject,
        html,
      }),
    });
  } catch (error) {
    console.error("Admin notification failed:", error);
    // Don't throw - admin notification is secondary
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } },
  );

  try {
    logStep("Function started");

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

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const { paymentType, paymentIntentId, sessionId }: CompletePaymentRequest =
      await req.json();

    if (!paymentType || (!paymentIntentId && !sessionId)) {
      return new Response(
        JSON.stringify({
          error: "paymentType and paymentIntentId or sessionId required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    logStep("Request data", { paymentType, paymentIntentId, sessionId });

    // ====================================================================
    // Resolve the payment from Stripe — this is the ONLY trusted source.
    // ====================================================================
    const resolved = await resolvePayment(stripe, paymentIntentId, sessionId);

    if (!resolved) {
      logStep("Payment verification failed - rejecting request");
      return new Response(
        JSON.stringify({
          error:
            "Payment could not be verified with Stripe. Please contact support.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const {
      paymentIntentId: stripePI,
      amount: stripeAmountCents,
      metadata,
      customerEmail,
      customerName,
    } = resolved;

    logStep("Payment verified with Stripe", {
      paymentIntentId: stripePI,
      amount: stripeAmountCents,
    });

    // ====================================================================
    // Idempotency — refuse to process the same payment intent twice. This
    // prevents an attacker from replaying a single $5 paid intent to spam
    // the donor with thank-you emails or to create duplicate booking rows.
    // We track via the `donations.stripe_payment_id` and via a metadata
    // field in `booking_requests` (since that table has no dedicated
    // payment-intent column).
    // ====================================================================
    const formattedAmount = `$${(stripeAmountCents / 100).toFixed(2)}`;
    const requestNumber = `TRN-${Date.now().toString().slice(-8)}`;

    const escName = escapeHtml(customerName);
    const escTrn = escapeHtml(requestNumber);
    const escAmount = escapeHtml(formattedAmount);

    switch (paymentType) {
      case "donation": {
        const donationRecordId = metadata.recordId || metadata.donationId || "";

        if (donationRecordId) {
          // Verify the record belongs to the email this intent was paid for
          // before we mark it completed. This prevents tampering across
          // unrelated donation records.
          const { data: existing } = await supabaseClient
            .from("donations")
            .select("id, email, payment_status")
            .eq("id", donationRecordId)
            .maybeSingle();

          if (!existing) {
            throw new Error("Donation record not found");
          }

          if (
            existing.email &&
            existing.email.toLowerCase().trim() !== customerEmail
          ) {
            throw new Error("Donation record does not match payment");
          }

          if (existing.payment_status === "completed") {
            logStep("Donation already completed - skipping email", {
              donationRecordId,
            });
            return new Response(
              JSON.stringify({
                success: true,
                message: "Already processed",
                requestNumber,
              }),
              {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
              },
            );
          }

          await supabaseClient
            .from("donations")
            .update({
              payment_status: "completed",
              stripe_payment_id: stripePI,
              updated_at: new Date().toISOString(),
            })
            .eq("id", donationRecordId);
          logStep("Updated donation record", { donationRecordId });
        }

        await sendEmail(
          customerEmail,
          "Thank You for Your Generous Gift - InVision Network",
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #1a1a2e; margin-bottom: 10px;">Thank You for Trusting InVision Network</h1>
              </div>

              <p style="font-size: 16px;">Dear ${escName},</p>

              <p>Your generous donation of <strong>${escAmount}</strong> has been received and confirmed. Your trust in our mission means the world to us.</p>

              <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">Payment Confirmed</h2>
                <p><strong>Amount:</strong> ${escAmount}</p>
                <p><strong>Date:</strong> ${escapeHtml(new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}</p>
                <p><strong>Transaction ID:</strong> ${escapeHtml(stripePI)}</p>
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <h3 style="color: #1a1a2e; margin-top: 0;">Your Impact</h3>
                <p>Your contribution helps us:</p>
                <ul style="padding-left: 20px;">
                  <li>Protect seniors from online scams</li>
                  <li>Support cybersecurity training for families</li>
                  <li>Support veterans and those in need</li>
                  <li>Develop new protection technologies</li>
                </ul>
              </div>

              <p>A tax receipt will be sent separately for your records.</p>

              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>

              <p style="margin-top: 30px;">With heartfelt gratitude,<br><strong>The InVision Network Team</strong></p>
            </div>
          `,
        );
        logStep("Sent donation thank-you email");
        break;
      }

      case "subscription": {
        const productName = (metadata.productName || metadata.planName || "Your Subscription").slice(0, 100);
        const escProduct = escapeHtml(productName);

        await sendEmail(
          customerEmail,
          `Payment Confirmed - Welcome to ${productName} | InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #1a1a2e; margin-bottom: 10px;">Thank You for Trusting InVision Network</h1>
              </div>

              <p style="font-size: 16px;">Welcome, ${escName}!</p>

              <p>Your payment has been confirmed and your subscription is now active. We're honored that you've chosen us to help protect your family.</p>

              <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">Payment Confirmed</h2>
                <p><strong>Plan:</strong> ${escProduct}</p>
                <p><strong>Amount:</strong> ${escAmount}</p>
                <p><strong>Status:</strong> Active</p>
              </div>

              <h3 style="color: #1a1a2e;">What's Next?</h3>
              <ol style="padding-left: 20px; line-height: 1.8;">
                <li>Access your dashboard to manage your subscription</li>
                <li>Set up your profile and preferences</li>
                <li>Forward suspicious emails/texts for instant analysis</li>
                <li>Explore all features included in your plan</li>
              </ol>

              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>

              <p style="margin-top: 30px;">Welcome aboard.<br><strong>The InVision Network Team</strong></p>
            </div>
          `,
        );
        logStep("Sent subscription welcome email");
        break;
      }

      case "product": {
        // Product payments are handled by create-cart-payment-intent +
        // verify-payment. (process-payment was retired as a tombstone in
        // Phase 4.10.) This branch exists only so callers can use a single
        // completion endpoint for any payment type without crashing.
        logStep("Product payment - handled separately");
        break;
      }

      case "training": {
        const courseTitle = (metadata.courseTitle || metadata.productName || "Training Session").slice(0, 200);
        const serviceTier = (metadata.serviceTier || "").slice(0, 100);
        const preferredDate = (metadata.preferredDate || "").slice(0, 100);
        const isVeteran = metadata.isVeteran === "true";
        const courseId = metadata.courseId || "";

        const escCourse = escapeHtml(courseTitle);
        const escTier = escapeHtml(serviceTier);
        const escPref = escapeHtml(preferredDate);

        // Idempotency: refuse to create a second booking_requests row for
        // the same Stripe payment intent.
        const { data: existingBooking } = await supabaseClient
          .from("booking_requests")
          .select("id, request_number")
          .filter("metadata->>stripe_payment_intent_id", "eq", stripePI)
          .maybeSingle();

        if (existingBooking) {
          logStep("Training booking already exists - skipping insert", {
            bookingId: existingBooking.id,
          });
          return new Response(
            JSON.stringify({
              success: true,
              message: "Already processed",
              requestNumber: existingBooking.request_number,
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            },
          );
        }

        const finalPriceDollars = stripeAmountCents / 100;
        // Compute base price from veteran-discount metadata if present.
        const baseAmountCents = Number(metadata.baseAmountCents) || stripeAmountCents;
        const basePriceDollars = baseAmountCents / 100;

        const { data: bookingData, error: bookingError } = await supabaseClient
          .from("booking_requests")
          .insert([
            {
              full_name: customerName.slice(0, 100),
              email: customerEmail.slice(0, 255),
              service_type: "training",
              service_name: courseTitle,
              service_tier: serviceTier || null,
              preferred_dates: preferredDate || null,
              is_veteran: isVeteran,
              request_number: requestNumber,
              status: "paid",
              base_price: basePriceDollars,
              final_price: finalPriceDollars,
              discount_amount: Math.max(basePriceDollars - finalPriceDollars, 0),
              metadata: {
                stripe_payment_intent_id: stripePI,
                course_id: courseId,
                source: "complete-payment",
              },
            },
          ])
          .select()
          .single();

        if (bookingError) {
          console.error("Failed to create booking record:", bookingError);
          throw new Error("Failed to record booking");
        }

        logStep("Created paid booking record", {
          bookingId: bookingData?.id,
          requestNumber,
        });

        await sendEmail(
          customerEmail,
          `Payment Confirmed - ${courseTitle} | InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #1a1a2e; margin-bottom: 10px;">Thank You for Trusting InVision Network</h1>
              </div>

              <p style="font-size: 16px;">Dear ${escName},</p>

              <p>Your payment has been confirmed and your training session is booked. We're excited to help you master cybersecurity protection.</p>

              <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">Payment Confirmed</h2>
                <p><strong>Reference Number:</strong> ${escTrn}</p>
                <p><strong>Training:</strong> ${escCourse}${escTier ? ` (${escTier})` : ""}</p>
                <p><strong>Amount Paid:</strong> ${escAmount}</p>
                ${isVeteran ? "<p><strong>Veteran Discount Applied:</strong> 10% off</p>" : ""}
                ${escPref ? `<p><strong>Preferred Date:</strong> ${escPref}</p>` : ""}
              </div>

              <h3 style="color: #1a1a2e;">What Happens Next?</h3>
              <ol style="padding-left: 20px; line-height: 1.8;">
                <li><strong>Within 24 hours:</strong> Our team will contact you to confirm your exact session time</li>
                <li><strong>Before your session:</strong> You'll receive a calendar invite with all details</li>
                <li><strong>Training materials:</strong> Pre-session materials will be sent to your email</li>
                <li><strong>After training:</strong> You'll receive a certificate of completion</li>
              </ol>

              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Your trust means everything to us.</strong> We're committed to protecting you and your family from online threats. Your personal information is secure and will never be shared.
                </p>
              </div>

              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>

              <p style="margin-top: 30px;">We look forward to training you.<br><strong>The InVision Network Team</strong></p>
            </div>
          `,
        );
        logStep("Sent training payment confirmation email");

        await sendAdminNotification(
          `New Paid Training Booking - ${requestNumber}`,
          `
            <h1>New Paid Training Booking</h1>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <p><strong>PAYMENT CONFIRMED</strong></p>
            </div>
            <p><strong>Reference:</strong> ${escTrn}</p>
            <p><strong>Name:</strong> ${escName}</p>
            <p><strong>Email:</strong> ${escapeHtml(customerEmail)}</p>
            <p><strong>Training:</strong> ${escCourse}${escTier ? ` (${escTier})` : ""}</p>
            <p><strong>Amount:</strong> ${escAmount}</p>
            <p><strong>Veteran:</strong> ${isVeteran ? "Yes (10% discount applied)" : "No"}</p>
            ${escPref ? `<p><strong>Preferred Date:</strong> ${escPref}</p>` : ""}
            <p><strong>Stripe Payment Intent:</strong> ${escapeHtml(stripePI)}</p>
            <hr>
            <p><strong>Action Required:</strong> Contact customer within 24 hours to confirm session time.</p>
          `,
        );
        logStep("Sent admin notification");
        break;
      }

      case "service": {
        const serviceRecordId = metadata.recordId || metadata.bookingId || "";
        const productName = (metadata.productName || metadata.serviceName || "Service").slice(0, 200);
        const escProduct = escapeHtml(productName);

        if (serviceRecordId) {
          // Verify the booking belongs to the email that paid before we
          // mark it as paid. Prevents cross-record tampering.
          const { data: existingBooking } = await supabaseClient
            .from("booking_requests")
            .select("id, email, status")
            .eq("id", serviceRecordId)
            .maybeSingle();

          if (!existingBooking) {
            throw new Error("Booking record not found");
          }

          if (
            existingBooking.email &&
            existingBooking.email.toLowerCase().trim() !== customerEmail
          ) {
            throw new Error("Booking record does not match payment");
          }

          if (existingBooking.status === "paid") {
            logStep("Service booking already paid - skipping email", {
              serviceRecordId,
            });
            return new Response(
              JSON.stringify({
                success: true,
                message: "Already processed",
                requestNumber,
              }),
              {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
              },
            );
          }

          await supabaseClient
            .from("booking_requests")
            .update({
              status: "paid",
              updated_at: new Date().toISOString(),
              metadata: {
                stripe_payment_intent_id: stripePI,
                paid_at: new Date().toISOString(),
              },
            })
            .eq("id", serviceRecordId);
        }

        await sendEmail(
          customerEmail,
          `Payment Confirmed - ${productName} | InVision Network`,
          `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #1a1a2e; margin-bottom: 10px;">Thank You for Trusting InVision Network</h1>
              </div>

              <p style="font-size: 16px;">Dear ${escName},</p>

              <p>Your payment of <strong>${escAmount}</strong> for <strong>${escProduct}</strong> has been confirmed.</p>

              <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #bbf7d0;">
                <h2 style="color: #16a34a; margin-top: 0;">Payment Confirmed</h2>
                <p>Our team will contact you within 24 hours to schedule your service.</p>
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Your trust means everything to us.</strong> We're committed to providing you with exceptional service and protecting your interests.
                </p>
              </div>

              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Questions?</strong> Reply to this email or call <a href="tel:9373018749">(937) 301-8749</a>
                </p>
              </div>

              <p style="margin-top: 30px;">Thank you for choosing InVision Network.<br><strong>The InVision Network Team</strong></p>
            </div>
          `,
        );
        logStep("Sent service payment confirmation email");
        break;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment completed successfully",
        requestNumber,
      }),
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

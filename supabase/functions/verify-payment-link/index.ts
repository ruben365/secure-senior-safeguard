import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[${timestamp}] [VERIFY-PAYMENT-LINK] ${step}${detailsStr}`);
};

// ============================================================================
// Per-IP rate limit (30 / minute) — this endpoint is polled by the QR
// payment success page so legitimate clients hit it more than once. Cap is
// generous but still blocks enumeration of session_id values against Stripe.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
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

// Stripe ID prefixes — anything not matching these patterns is a probe.
const SESSION_ID_RE = /^cs_[A-Za-z0-9_]+$/;
const PAYMENT_LINK_ID_RE = /^plink_[A-Za-z0-9]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID().slice(0, 8);
  logStep(`Request ${requestId} - Verification started`);

  // Per-IP rate limit
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
        requestId,
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

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep(`Request ${requestId} - ERROR: Missing STRIPE_SECRET_KEY`);
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const body = await req.json();
    const { paymentLinkId, sessionId } = body;

    if (!paymentLinkId && !sessionId) {
      throw new Error("paymentLinkId or sessionId required");
    }

    // Validate ID formats before sending anything to Stripe so we don't burn
    // API quota / leak existence info on probing requests.
    if (sessionId !== undefined && sessionId !== null) {
      if (
        typeof sessionId !== "string" ||
        sessionId.length > 100 ||
        !SESSION_ID_RE.test(sessionId)
      ) {
        throw new Error("Invalid sessionId format");
      }
    }
    if (paymentLinkId !== undefined && paymentLinkId !== null) {
      if (
        typeof paymentLinkId !== "string" ||
        paymentLinkId.length > 100 ||
        !PAYMENT_LINK_ID_RE.test(paymentLinkId)
      ) {
        throw new Error("Invalid paymentLinkId format");
      }
    }

    logStep(`Request ${requestId} - Checking payment`, {
      paymentLinkId: paymentLinkId?.slice(0, 10) + "...",
      sessionId: sessionId?.slice(0, 10) + "...",
    });

    // If we have a session ID, check it directly
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        logStep(`Request ${requestId} - Session retrieved`, {
          status: session.payment_status,
          amount: session.amount_total,
        });

        return new Response(
          JSON.stringify({
            paid: session.payment_status === "paid",
            status: session.payment_status,
            amount: session.amount_total,
            customerEmail: session.customer_details?.email,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      } catch (err) {
        logStep(`Request ${requestId} - Session check failed`, {
          error: String(err),
        });
      }
    }

    // Check payment link sessions
    if (paymentLinkId) {
      const sessions = await stripe.checkout.sessions.list({
        payment_link: paymentLinkId,
        limit: 5,
      });

      logStep(`Request ${requestId} - Found sessions`, {
        count: sessions.data.length,
      });

      const paidSession = sessions.data.find(
        (s: { payment_status: string }) => s.payment_status === "paid",
      );

      if (paidSession) {
        logStep(`Request ${requestId} - Payment confirmed`, {
          sessionId: paidSession.id,
          amount: paidSession.amount_total,
        });

        return new Response(
          JSON.stringify({
            paid: true,
            status: "paid",
            amount: paidSession.amount_total,
            customerEmail: paidSession.customer_details?.email,
            sessionId: paidSession.id,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    }

    logStep(`Request ${requestId} - Payment not found yet`);

    return new Response(
      JSON.stringify({
        paid: false,
        status: "pending",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep(`Request ${requestId} - ERROR`, { message: errorMessage });

    return new Response(
      JSON.stringify({
        error: errorMessage,
        paid: false,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

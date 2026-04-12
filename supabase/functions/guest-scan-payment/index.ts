import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MB = 1024 * 1024;
const PER_UPLOAD_PRICE = 1;
const MAX_FILE_MB = 500;
const MIN_FILE_BYTES = 1;
const MAX_FILE_BYTES = MAX_FILE_MB * MB;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".mp4",
  ".mp3",
  ".wav",
]);

const EXTENSION_MIME_MAP: Record<string, string> = {
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

// ============================================================================
// Per-IP rate limit (10 file scan intents / 10 minutes). Each call also
// creates a Stripe payment intent so this caps Stripe spend from abuse.
// ============================================================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
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

const sanitizeFileName = (name: string) =>
  name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 120);

const getExtension = (name: string) =>
  name.slice(Math.max(0, name.lastIndexOf("."))).toLowerCase();

const calculateAmount = () => PER_UPLOAD_PRICE;

const ALLOWED_ORIGINS = new Set<string>([
  "https://www.invisionnetwork.org",
  "https://invisionnetwork.org",
]);
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";

const resolveOrigin = (req: Request): string => {
  const requested = (req.headers.get("origin") || "").trim().toLowerCase();
  return ALLOWED_ORIGINS.has(requested) ? requested : CANONICAL_ORIGIN;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing required server configuration.");
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Per-IP rate limit
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Too many scan requests. Please try again shortly.",
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

    const body = await req.json();
    const { fileName, fileSize, fileType, checkoutMode = false } = body;
    const fileSizeNumber = Number(fileSize);

    // ====================================================================
    // Strict input validation. CRITICAL: fileSize is the basis for the
    // charge, so we have to refuse anything outside legal bounds. We
    // cannot trust the client to be honest about file size, but the
    // upload bucket has a server-side 500MB cap and the actual analyze
    // step reads the file from storage, so any underreporting will be
    // caught at analyze time when the file's true size is checked.
    // ====================================================================
    if (
      !fileName ||
      typeof fileName !== "string" ||
      fileName.length === 0 ||
      fileName.length > 255
    ) {
      return new Response(JSON.stringify({ error: "Invalid file name." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (
      !Number.isFinite(fileSizeNumber) ||
      !Number.isInteger(fileSizeNumber) ||
      fileSizeNumber < MIN_FILE_BYTES ||
      fileSizeNumber > MAX_FILE_BYTES
    ) {
      return new Response(
        JSON.stringify({
          error: `File size must be between ${MIN_FILE_BYTES} byte and ${MAX_FILE_MB}MB.`,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const extension = getExtension(fileName);
    const normalizedType = (typeof fileType === "string" ? fileType : "")
      .toLowerCase()
      .slice(0, 100);
    const storedType =
      normalizedType || EXTENSION_MIME_MAP[extension] || extension;

    if (
      !ALLOWED_MIME_TYPES.has(normalizedType) &&
      !ALLOWED_EXTENSIONS.has(extension)
    ) {
      return new Response(JSON.stringify({ error: "Unsupported file type." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const cost = calculateAmount();
    const scanId = crypto.randomUUID();
    const sanitized = sanitizeFileName(fileName);

    if (!sanitized) {
      return new Response(
        JSON.stringify({ error: "File name produced no usable characters." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const filePath = `guest/${scanId}/${sanitized}`;
    const paymentMetadata = {
      paymentType: "guest_scan",
      scan_id: scanId,
      file_name: sanitized,
      file_type: storedType,
      file_size: fileSizeNumber.toString(),
    };

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // ====================================================================
    // Insert into guest_scans using the restored file-scan columns.
    // scan_type='file' tells the RLS policy this is the paid file path.
    // ====================================================================
    const { error: insertError } = await supabase.from("guest_scans").insert({
      id: scanId,
      scan_type: "file",
      file_name: sanitized,
      file_size: fileSizeNumber,
      file_type: storedType,
      file_path: filePath,
      stripe_session_id: paymentIntent.id,
      amount_paid: cost,
      payment_status: "pending",
      scan_status: "pending",
      ip_address: clientIp,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    if (checkoutMode) {
      const origin = resolveOrigin(req);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "AI Scam Analysis Upload",
                description: "One secure upload scan",
              },
              unit_amount: Math.round(cost * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/training/ai-analysis?session_id={CHECKOUT_SESSION_ID}#guest-scanner`,
        cancel_url: `${origin}/training/ai-analysis#guest-scanner`,
        metadata: paymentMetadata,
        payment_intent_data: {
          metadata: paymentMetadata,
        },
      });

      await supabase
        .from("guest_scans")
        .update({
          stripe_session_id: session.id,
        })
        .eq("id", scanId);

      return new Response(
        JSON.stringify({
          checkoutUrl: session.url,
          sessionId: session.id,
          scanId,
          amount: cost,
          filePath,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cost * 100),
      currency: "usd",
      payment_method_types: ["card"],
      metadata: paymentMetadata,
    });

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        scanId,
        amount: cost,
        filePath,
        paymentIntentId: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Payment initialization failed.";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

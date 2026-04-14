import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limit: 3 requests per 15 minutes per (IP + email)
// NOTE: In-memory rate limiting resets on serverless cold starts and provides no
// protection under distributed load. For production rate limiting, replace with
// Upstash Redis (https://upstash.com) or Supabase built-in rate limiting.
// Until then, this provides basic protection against single-isolate abuse only.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

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

function generateAccessId(length = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ====================================================================
    // RATE LIMIT — keyed on IP + email so you can't loop on a single
    // address from many IPs without burning all of them.
    // ====================================================================
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateKey = `${clientIp}:${normalizedEmail}`;
    const rateCheck = checkRateLimit(rateKey);

    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Too many reset attempts. Please wait before trying again.",
          retryAfter: rateCheck.retryAfter,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(rateCheck.retryAfter),
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Find existing purchase
    const { data: purchases, error: findError } = await supabase
      .from("book_purchases")
      .select("*")
      .eq("customer_email", normalizedEmail);

    if (findError) throw new Error(findError.message);

    // SECURITY: Always return the same generic response whether or not the
    // email exists. This prevents enumeration attacks where a caller could
    // discover which emails have valid book purchases.
    const GENERIC_RESPONSE = JSON.stringify({
      success: true,
      message:
        "If a purchase exists for this email, a new Access ID has been sent.",
    });

    if (!purchases || purchases.length === 0) {
      console.log(
        `[reset-book-access] No purchase found for ${normalizedEmail} (returning generic response)`
      );
      return new Response(GENERIC_RESPONSE, {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate new access IDs for all purchases under this email
    const results: { purchaseId: string; newAccessId: string }[] = [];
    for (const purchase of purchases) {
      let newAccessId = "";
      for (let i = 0; i < 5; i++) {
        newAccessId = generateAccessId(10);
        const { data: existing } = await supabase
          .from("book_purchases")
          .select("id")
          .eq("access_id", newAccessId)
          .maybeSingle();
        if (!existing) break;
      }

      await supabase
        .from("book_purchases")
        .update({ access_id: newAccessId })
        .eq("id", purchase.id);

      results.push({ purchaseId: purchase.id, newAccessId });
    }

    // Send email with new access ID via Resend (only to the verified
    // purchase email — never echo the new ID in the HTTP response).
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && results.length > 0) {
      const newId = results[0].newAccessId;
      const customerName = purchases[0].customer_name;
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "InVision Network <noreply@invisionnetwork.org>",
            to: [normalizedEmail],
            subject: "Your New Book Access ID — InVision Network",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 30px; border-radius: 12px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0 0 10px;">🔑 Access ID Reset</h1>
                  <p style="color: #a0aec0; margin: 0;">Hi ${customerName}, your Access ID has been reset.</p>
                </div>
                <div style="padding: 30px 20px; background: #ffffff;">
                  <p style="color: #333; font-size: 16px;">Your new Access ID is:</p>
                  <div style="background: #f7fafc; border: 2px dashed #4a90d9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1a1a2e; font-family: monospace;">${newId}</span>
                  </div>
                  <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Your previous Access ID has been deactivated. Use this new one to access your books at <a href="https://www.invisionnetwork.org/reader">www.invisionnetwork.org/reader</a>.
                  </p>
                  <p style="color: #d97706; font-size: 12px; margin-top: 12px;">
                    If you did not request this reset, please contact <a href="mailto:hello@invisionnetwork.org">hello@invisionnetwork.org</a> immediately.
                  </p>
                </div>
                <div style="text-align: center; padding: 20px; color: #999; font-size: 11px;">
                  © InVision Network • Department of Literature
                </div>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email send failed (non-blocking):", emailErr);
      }
    }

    // SECURITY: Do NOT include count or any data that confirms a purchase
    // exists. Same generic response either way.
    return new Response(GENERIC_RESPONSE, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("reset-book-access error:", msg);
    return new Response(
      JSON.stringify({ error: "Reset failed. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

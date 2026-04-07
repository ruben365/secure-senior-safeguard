import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In-memory rate limiter — max 5 password resets per 5 minutes per admin IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // 1. AUTHENTICATION — require a valid JWT
    // ========================================================================
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

    const token = authHeader.replace("Bearer ", "");

    // Use anon key client to validate the user's JWT
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });

    const {
      data: { user: caller },
      error: authError,
    } = await supabaseUser.auth.getUser(token);

    if (authError || !caller) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // ========================================================================
    // 2. AUTHORIZATION — caller must have the 'admin' role
    // ========================================================================
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc(
      "has_role",
      { user_id: caller.id, role: "admin" },
    );

    if (roleError) {
      console.error("Role check failed:", roleError);
      return new Response(
        JSON.stringify({ error: "Authorization check failed" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!isAdmin) {
      console.warn(
        `[admin-reset-password] FORBIDDEN attempt by ${caller.email} (${caller.id})`,
      );
      return new Response(
        JSON.stringify({ error: "Forbidden — admin role required" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // ========================================================================
    // 3. RATE LIMITING — protect against runaway abuse
    // ========================================================================
    const rateKey = `admin-reset:${caller.id}`;
    const rateCheck = checkRateLimit(rateKey);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Too many password resets. Please slow down.",
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

    // ========================================================================
    // 4. INPUT VALIDATION
    // ========================================================================
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return new Response(
        JSON.stringify({ error: "Email and newPassword are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 12) {
      return new Response(
        JSON.stringify({
          error: "Password must be at least 12 characters",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // ========================================================================
    // 5. FIND TARGET USER
    // ========================================================================
    const { data: userData, error: listError } =
      await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return new Response(JSON.stringify({ error: listError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const targetUser = userData.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );

    if (!targetUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ========================================================================
    // 6. UPDATE PASSWORD
    // ========================================================================
    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        password: newPassword,
      });

    if (updateError) {
      console.error("Error updating password:", updateError);
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ========================================================================
    // 7. AUDIT LOG — record who reset whose password
    // ========================================================================
    try {
      await supabaseAdmin.from("auth_audit_logs").insert({
        user_id: caller.id,
        event_type: "admin_password_reset",
        success: true,
        ip_address:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
        metadata: {
          target_user_id: targetUser.id,
          target_email: targetUser.email,
          performed_by_email: caller.email,
        },
      });
    } catch (auditErr) {
      console.error("Audit log write failed (non-blocking):", auditErr);
    }

    console.log(
      `[admin-reset-password] ${caller.email} reset password for ${targetUser.email}`,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Password updated successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

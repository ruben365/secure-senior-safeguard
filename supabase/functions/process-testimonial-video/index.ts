import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ============================================================================
// Admin-only video testimonial processor.
//
// Before this hardening, the function had ZERO authentication and accepted
// arbitrary `videoUrl` / `thumbnailUrl` strings from any client. An
// unauthenticated attacker could:
//   1. Forge testimonial_media rows pointing at attacker-controlled URLs.
//   2. Mark any testimonial as `has_video = true` and overwrite its
//      `primary_media_url` with a phishing/malware link.
//   3. Cause stored XSS / link-spam in the public testimonials carousel.
//
// Lockdown:
//   1. config.toml verify_jwt = true (gateway requires a Supabase JWT).
//   2. Function calls auth.getUser(token) and verifies the caller is admin
//      via the has_role() RPC (matches send-bulk-announcement / etc).
//   3. testimonialId must be a valid UUID.
//   4. videoUrl/thumbnailUrl must point at our own Supabase storage origin
//      (rejects arbitrary external URLs).
//   5. Numeric fields capped (duration, fileSize, width, height).
//   6. mimeType restricted to known video formats.
// ============================================================================

const STORAGE_HOST_PREFIXES = [
  "https://qexeqdpejhacbhewuvbd.supabase.co/storage/v1/object/",
];

const ALLOWED_MIME_TYPES = new Set<string>([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
  "video/ogg",
]);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAX_FILE_BYTES = 200 * 1024 * 1024; // 200 MB hard cap (frontend caps 100)
const MAX_DURATION_SECONDS = 60 * 60; // 1 hour
const MAX_DIMENSION = 8000;

function isFromOurStorage(url: unknown): url is string {
  if (typeof url !== "string") return false;
  if (url.length > 2000) return false;
  return STORAGE_HOST_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function clampPositiveInt(value: unknown, max: number): number | null {
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0 || n > max) {
    return null;
  }
  return n;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      throw new Error("Missing required server configuration.");
    }

    // Verify the caller. We use the anon client to validate the JWT, then
    // a service-role client for the actual writes (testimonials/RLS would
    // otherwise block this).
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });
    const { data: userData, error: userError } =
      await authClient.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      user_id: userData.user.id,
      role: "admin",
    });
    if (roleError || !isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      testimonialId,
      videoUrl,
      thumbnailUrl,
      duration,
      fileSize,
      mimeType,
      width,
      height,
    } = body ?? {};

    if (typeof testimonialId !== "string" || !UUID_RE.test(testimonialId)) {
      throw new Error("Invalid testimonialId.");
    }

    if (!isFromOurStorage(videoUrl)) {
      throw new Error(
        "videoUrl must point at our Supabase storage bucket.",
      );
    }

    let safeThumbnailUrl: string | null = null;
    if (thumbnailUrl != null) {
      if (!isFromOurStorage(thumbnailUrl)) {
        throw new Error(
          "thumbnailUrl must point at our Supabase storage bucket.",
        );
      }
      safeThumbnailUrl = thumbnailUrl;
    }

    let safeMimeType: string | null = null;
    if (mimeType != null) {
      if (typeof mimeType !== "string" || !ALLOWED_MIME_TYPES.has(mimeType)) {
        throw new Error("Unsupported mimeType.");
      }
      safeMimeType = mimeType;
    }

    const safeDuration =
      duration == null ? null : clampPositiveInt(duration, MAX_DURATION_SECONDS);
    if (duration != null && safeDuration === null) {
      throw new Error("Invalid duration.");
    }

    const safeFileSize =
      fileSize == null ? null : clampPositiveInt(fileSize, MAX_FILE_BYTES);
    if (fileSize != null && safeFileSize === null) {
      throw new Error("Invalid fileSize.");
    }

    const safeWidth =
      width == null ? null : clampPositiveInt(width, MAX_DIMENSION);
    if (width != null && safeWidth === null) {
      throw new Error("Invalid width.");
    }

    const safeHeight =
      height == null ? null : clampPositiveInt(height, MAX_DIMENSION);
    if (height != null && safeHeight === null) {
      throw new Error("Invalid height.");
    }

    // Verify the testimonial actually exists before we update it. Avoids
    // creating an orphan testimonial_media row pointing at a missing parent.
    const { data: existing, error: existingError } = await supabase
      .from("testimonials")
      .select("id")
      .eq("id", testimonialId)
      .maybeSingle();
    if (existingError || !existing) {
      return new Response(JSON.stringify({ error: "Testimonial not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: mediaData, error: mediaError } = await supabase
      .from("testimonial_media")
      .insert({
        testimonial_id: testimonialId,
        media_type: "video",
        file_url: videoUrl,
        thumbnail_url: safeThumbnailUrl,
        duration_seconds: safeDuration,
        file_size_bytes: safeFileSize,
        mime_type: safeMimeType,
        width: safeWidth,
        height: safeHeight,
        processing_status: "completed",
      })
      .select()
      .single();

    if (mediaError) {
      console.error(
        "[process-testimonial-video] insert error:",
        mediaError.message,
      );
      throw new Error("Failed to insert media record.");
    }

    const { error: updateError } = await supabase
      .from("testimonials")
      .update({
        has_video: true,
        primary_media_url: videoUrl,
      })
      .eq("id", testimonialId);

    if (updateError) {
      console.error(
        "[process-testimonial-video] update error:",
        updateError.message,
      );
      throw new Error("Failed to update testimonial.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Video processed successfully",
        media: mediaData,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[process-testimonial-video] fatal:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

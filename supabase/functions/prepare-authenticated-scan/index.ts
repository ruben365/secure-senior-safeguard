import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  createServiceRoleClient,
  getAccountScanAccess,
  getAuthenticatedScanUser,
  hasActiveScamShieldSubscription,
} from "../_shared/scanAccess.ts";

const MB = 1024 * 1024;
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

const sanitizeFileName = (name: string) =>
  name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 120);

const getExtension = (name: string) =>
  name.slice(Math.max(0, name.lastIndexOf("."))).toLowerCase();

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const user = await getAuthenticatedScanUser(req);
    const supabase = createServiceRoleClient();
    const body = await req.json();
    const { fileName, fileSize, fileType } = body;
    const fileSizeNumber = Number(fileSize);

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

    const hasSubscription = await hasActiveScamShieldSubscription(user.email);
    const accountAccess = await getAccountScanAccess(supabase, user.id);

    let accessType: "subscription" | "balance" | "metered" | null = null;
    let amountPaid = 0;

    if (hasSubscription) {
      accessType = "subscription";
    } else if (accountAccess?.canScan) {
      accessType = accountAccess.accessType;
      amountPaid = accountAccess.perScanAmount;
    }

    if (!accessType) {
      return new Response(
        JSON.stringify({
          error:
            "This account does not have active ScamShield or account-linked scan access.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 403,
        },
      );
    }

    const scanId = crypto.randomUUID();
    const filePath = `account/${user.id}/${scanId}/${sanitized}`;

    const { error: insertError } = await supabase.from("guest_scans").insert({
      id: scanId,
      scan_type: "file",
      file_name: sanitized,
      file_size: fileSizeNumber,
      file_type: storedType,
      file_path: filePath,
      amount_paid: amountPaid,
      payment_status:
        accessType === "subscription" ? "included" : "account_pending",
      scan_status: "pending",
      user_id: user.id,
      access_mode: accessType,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return new Response(
      JSON.stringify({
        scanId,
        filePath,
        accessType,
        scanBalance:
          accessType === "balance" ? accountAccess?.scanBalance ?? null : null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to prepare this upload scan.";

    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status:
        message.startsWith("Authentication error") ||
        message.startsWith("Please log in")
          ? 401
          : 500,
    });
  }
});

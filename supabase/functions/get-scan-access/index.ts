import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import {
  createServiceRoleClient,
  getAccountScanAccess,
  getAuthenticatedScanUser,
} from "../_shared/scanAccess.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const user = await getAuthenticatedScanUser(req);
    const supabase = createServiceRoleClient();
    const access = await getAccountScanAccess(supabase, user.id);

    if (!access) {
      return new Response(
        JSON.stringify({
          accessType: "none",
          accessStatus: "none",
          canScan: false,
          scanBalance: null,
          perScanAmount: 1,
          usageCount: 0,
          usageTotal: 0,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    return new Response(JSON.stringify(access), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load scan access.";

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

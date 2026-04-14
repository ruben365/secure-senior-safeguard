import Stripe from "https://esm.sh/stripe@18.5.0";
import {
  createClient,
  type SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.57.2";

export type AccountScanAccessType = "balance" | "metered";

export interface AuthenticatedScanUser {
  id: string;
  email: string;
}

export interface AccountScanAccessSummary {
  accessType: AccountScanAccessType;
  accessStatus: "active" | "disabled" | "paused";
  canScan: boolean;
  scanBalance: number | null;
  perScanAmount: number;
  usageCount: number;
  usageTotal: number;
}

export function createServiceRoleClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing required server configuration.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export async function getAuthenticatedScanUser(
  req: Request,
): Promise<AuthenticatedScanUser> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !anonKey) {
    throw new Error("Missing required auth configuration.");
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Please log in to continue.");
  }

  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    throw new Error("Please log in to continue.");
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await authClient.auth.getUser(token);
  if (error) {
    throw new Error(`Authentication error: ${error.message}`);
  }

  if (!data.user?.id || !data.user.email) {
    throw new Error("Authenticated user information is incomplete.");
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
}

export async function hasActiveScamShieldSubscription(email: string) {
  if (!email) return false;

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (customers.data.length === 0) return false;

  const subscriptions = await stripe.subscriptions.list({
    customer: customers.data[0].id,
    status: "active",
    limit: 1,
  });

  return subscriptions.data.length > 0;
}

export async function getAccountScanAccess(
  supabase: SupabaseClient,
  userId: string,
): Promise<AccountScanAccessSummary | null> {
  const { data, error } = await supabase
    .from("scan_access_accounts")
    .select(
      "access_mode, access_status, scan_balance, per_scan_amount, usage_count, usage_total",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  const accessStatus =
    data.access_status === "active" ||
    data.access_status === "disabled" ||
    data.access_status === "paused"
      ? data.access_status
      : "disabled";
  const accessType =
    data.access_mode === "metered" ? "metered" : "balance";
  const scanBalance =
    typeof data.scan_balance === "number" ? data.scan_balance : null;
  const perScanAmountValue = Number(data.per_scan_amount);
  const perScanAmount = Number.isFinite(perScanAmountValue)
    ? perScanAmountValue
    : 1;
  const usageCount = typeof data.usage_count === "number" ? data.usage_count : 0;
  const usageTotalValue = Number(data.usage_total);
  const usageTotal = Number.isFinite(usageTotalValue) ? usageTotalValue : 0;
  const canScan =
    accessStatus === "active" &&
    (accessType === "metered" || (scanBalance ?? 0) > 0);

  return {
    accessType,
    accessStatus,
    canScan,
    scanBalance,
    perScanAmount,
    usageCount,
    usageTotal,
  };
}

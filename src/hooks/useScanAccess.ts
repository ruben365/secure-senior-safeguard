import { useCallback, useEffect, useState } from "react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export type AccountScanAccessType = "none" | "balance" | "metered";
export type AuthorizedScanAccessType = "subscription" | "balance" | "metered";

export interface AccountScanAccessSummary {
  accessType: AccountScanAccessType;
  accessStatus: "active" | "disabled" | "paused" | "none";
  canScan: boolean;
  scanBalance: number | null;
  perScanAmount: number;
  usageCount: number;
  usageTotal: number;
}

export interface AuthorizedScanPayload {
  scanId: string;
  filePath: string;
  accessType: AuthorizedScanAccessType;
  scanBalance: number | null;
}

const DEFAULT_ACCESS: AccountScanAccessSummary = {
  accessType: "none",
  accessStatus: "none",
  canScan: false,
  scanBalance: null,
  perScanAmount: 1,
  usageCount: 0,
  usageTotal: 0,
};

async function extractFunctionError(
  err: unknown,
  fallback: string,
): Promise<string> {
  if (err instanceof FunctionsHttpError) {
    const response = (err.context as Response | undefined) ?? undefined;
    if (response) {
      try {
        const text = await response.clone().text();
        if (text) {
          try {
            const parsed = JSON.parse(text);
            if (parsed && typeof parsed === "object") {
              const message =
                (parsed as { error?: string; message?: string }).error ??
                (parsed as { message?: string }).message;

              if (message) return message;
            }
          } catch {
            if (text.length < 500) return text;
          }
        }
      } catch {
        return fallback;
      }
    }

    return fallback;
  }

  if (err instanceof Error) return err.message || fallback;
  if (typeof err === "string") return err;
  return fallback;
}

export function useScanAccess() {
  const { user } = useAuth();
  const [accountAccess, setAccountAccess] =
    useState<AccountScanAccessSummary>(DEFAULT_ACCESS);
  const [loading, setLoading] = useState(true);
  const [preparing, setPreparing] = useState(false);

  const refreshAccess = useCallback(async () => {
    if (!user) {
      setAccountAccess(DEFAULT_ACCESS);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("get-scan-access");
      if (error) {
        const message = await extractFunctionError(
          error,
          "Unable to load scan access.",
        );
        throw new Error(message);
      }

      setAccountAccess({
        accessType: data?.accessType ?? "none",
        accessStatus: data?.accessStatus ?? "none",
        canScan: data?.canScan === true,
        scanBalance:
          typeof data?.scanBalance === "number" ? data.scanBalance : null,
        perScanAmount:
          typeof data?.perScanAmount === "number" ? data.perScanAmount : 1,
        usageCount: typeof data?.usageCount === "number" ? data.usageCount : 0,
        usageTotal: typeof data?.usageTotal === "number" ? data.usageTotal : 0,
      });
    } catch {
      setAccountAccess(DEFAULT_ACCESS);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void refreshAccess();
  }, [refreshAccess]);

  const prepareAuthorizedScan = useCallback(
    async (file: File): Promise<AuthorizedScanPayload> => {
      if (!user) {
        throw new Error("Please log in to use account-linked scan access.");
      }

      setPreparing(true);

      try {
        const { data, error } = await supabase.functions.invoke(
          "prepare-authenticated-scan",
          {
            body: {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type,
            },
          },
        );

        if (error) {
          const message = await extractFunctionError(
            error,
            "Unable to prepare your upload scan.",
          );
          throw new Error(message);
        }

        if (!data?.scanId || !data?.filePath || !data?.accessType) {
          throw new Error("Scan authorization is incomplete. Please try again.");
        }

        return {
          scanId: data.scanId,
          filePath: data.filePath,
          accessType: data.accessType,
          scanBalance:
            typeof data?.scanBalance === "number" ? data.scanBalance : null,
        };
      } finally {
        setPreparing(false);
      }
    },
    [user],
  );

  return {
    accountAccess,
    loading,
    preparing,
    refreshAccess,
    prepareAuthorizedScan,
  };
}

export default useScanAccess;

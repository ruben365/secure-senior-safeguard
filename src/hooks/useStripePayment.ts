import { useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FunctionsHttpError } from "@supabase/supabase-js";

interface GuestScanPaymentResponse {
  clientSecret: string;
  scanId: string;
  amount: number;
  filePath: string;
  paymentIntentId: string;
}

/**
 * Extract the real error from a Supabase FunctionsHttpError.
 *
 * When an edge function returns a non-2xx status, Supabase wraps it in a
 * FunctionsHttpError whose `.message` is literally the string
 * "Edge Function returned a non-2xx status code". The actual error JSON
 * that our functions send (e.g. `{ error: "Unsupported file type." }`)
 * is sitting on `err.context`, which is a Response object we have to
 * read ourselves. Without this, users only ever see the meaningless
 * wrapper message and have no idea what went wrong.
 */
async function extractEdgeFunctionError(
  err: unknown,
  fallback: string,
): Promise<string> {
  if (err instanceof FunctionsHttpError) {
    const response = (err.context as Response | undefined) ?? undefined;
    if (response) {
      try {
        // Clone because the body can only be read once and Supabase may
        // have already started reading it internally.
        const cloned = response.clone();
        const text = await cloned.text();
        if (text) {
          try {
            const parsed = JSON.parse(text);
            if (parsed && typeof parsed === "object") {
              const fromField = (parsed as { error?: string; message?: string })
                .error ?? (parsed as { message?: string }).message;
              if (fromField) return fromField;
            }
          } catch {
            // Body wasn't JSON — return the raw text if it looks useful
            if (text.length < 500) return text;
          }
        }
      } catch {
        // fall through
      }
    }
    return fallback;
  }
  if (err instanceof Error) return err.message || fallback;
  if (typeof err === "string") return err;
  return fallback;
}

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGuestScanPayment = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "guest-scan-payment",
        {
          body: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          },
        },
      );

      if (fnError) {
        const real = await extractEdgeFunctionError(
          fnError,
          "Failed to initialize payment.",
        );
        throw new Error(real);
      }

      if (!data?.clientSecret || !data?.scanId || !data?.filePath) {
        throw new Error("Incomplete payment response. Please try again.");
      }

      return data as GuestScanPaymentResponse;
    } catch (err: any) {
      const message = err?.message || "Payment setup failed.";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createGuestScanPayment,
    loading,
    error,
    clearError: () => setError(null),
  };
};

export default useStripePayment;

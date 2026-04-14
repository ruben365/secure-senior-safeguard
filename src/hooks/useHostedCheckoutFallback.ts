import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HostedCheckoutInitResult<TMeta = unknown> {
  url: string;
  sessionId?: string | null;
  paymentLinkId?: string | null;
  meta?: TMeta;
}

interface HostedCheckoutPaidResult<TMeta = unknown> {
  sessionId?: string | null;
  paymentIntentId?: string | null;
  paymentLinkId?: string | null;
  meta?: TMeta;
}

interface UseHostedCheckoutFallbackOptions<TMeta = unknown> {
  onPaid?: (result: HostedCheckoutPaidResult<TMeta>) => Promise<void> | void;
  pollIntervalMs?: number;
}

type HostedCheckoutStatus = "idle" | "creating" | "opened" | "paid";

export function useHostedCheckoutFallback<TMeta = unknown>({
  onPaid,
  pollIntervalMs = 4000,
}: UseHostedCheckoutFallbackOptions<TMeta> = {}) {
  const onPaidRef = useRef(onPaid);
  const [status, setStatus] = useState<HostedCheckoutStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  const [meta, setMeta] = useState<TMeta | undefined>(undefined);

  useEffect(() => {
    onPaidRef.current = onPaid;
  }, [onPaid]);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setUrl(null);
    setSessionId(null);
    setPaymentLinkId(null);
    setMeta(undefined);
  }, []);

  const openHostedCheckout = useCallback(
    async (
      factory: () => Promise<HostedCheckoutInitResult<TMeta> | null | undefined>,
    ) => {
      setStatus("creating");
      setError(null);

      try {
        const result = await factory();
        if (!result?.url) {
          throw new Error("No checkout URL was returned.");
        }
        if (!result.sessionId && !result.paymentLinkId) {
          throw new Error("No checkout reference was returned.");
        }

        setUrl(result.url);
        setSessionId(result.sessionId ?? null);
        setPaymentLinkId(result.paymentLinkId ?? null);
        setMeta(result.meta);
        setStatus("opened");

        const popup = window.open(result.url, "_blank", "noopener,noreferrer");
        if (popup) {
          popup.focus();
        }
      } catch (err) {
        setStatus("idle");
        setError(
          err instanceof Error
            ? err.message
            : "Unable to open hosted checkout right now.",
        );
      }
    },
    [],
  );

  useEffect(() => {
    if (status !== "opened" || (!sessionId && !paymentLinkId)) {
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const body = sessionId ? { sessionId } : { paymentLinkId };
        const { data, error: fnError } = await supabase.functions.invoke(
          "verify-payment-link",
          { body },
        );

        if (cancelled) return;

        if (fnError) {
          throw new Error(fnError.message || "Unable to verify hosted payment.");
        }

        if (data?.paid) {
          setStatus("paid");
          await onPaidRef.current?.({
            sessionId: data.sessionId ?? sessionId,
            paymentIntentId: data.paymentIntentId ?? null,
            paymentLinkId,
            meta,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to verify hosted payment.",
          );
        }
      }
    };

    void poll();
    const interval = window.setInterval(() => {
      void poll();
    }, pollIntervalMs);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [meta, paymentLinkId, pollIntervalMs, sessionId, status]);

  return {
    hostedCheckoutActive: status === "opened",
    hostedCheckoutLoading: status === "creating",
    hostedCheckoutError: error,
    hostedCheckoutUrl: url,
    openHostedCheckout,
    resetHostedCheckout: reset,
  };
}

export default useHostedCheckoutFallback;

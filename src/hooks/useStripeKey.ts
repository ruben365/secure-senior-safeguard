import { useState, useEffect, useCallback } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";

let stripePromiseCache: Promise<Stripe | null> | null = null;
let cachedKey: string | null = null;
let loadStripeModule:
  | (typeof import("@stripe/stripe-js"))["loadStripe"]
  | null = null;

async function getLoadStripe() {
  if (!loadStripeModule) {
    const module = await import("@stripe/stripe-js");
    loadStripeModule = module.loadStripe;
  }
  return loadStripeModule;
}

async function fetchPublishableKey(forceRemote = false) {
  const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();

  if (!forceRemote && envKey) {
    return envKey;
  }

  if (!forceRemote && cachedKey) {
    return cachedKey;
  }

  const { data, error: fnError } = await supabase.functions.invoke(
    "get-stripe-key",
  );

  if (fnError) {
    throw fnError;
  }

  const remoteKey =
    typeof data?.publishableKey === "string" ? data.publishableKey.trim() : "";

  if (!remoteKey) {
    throw new Error("No publishable key returned");
  }

  cachedKey = remoteKey;
  return remoteKey;
}

async function ensureStripePromise(forceRemote = false): Promise<Promise<Stripe | null>> {
  if (stripePromiseCache) {
    return stripePromiseCache;
  }

  const loadStripe = await getLoadStripe();
  const publishableKey = await fetchPublishableKey(forceRemote);
  stripePromiseCache = loadStripe(publishableKey);
  return stripePromiseCache;
}

/**
 * Hook for Stripe initialization - DEMAND-DRIVEN
 */
export function useStripeKey() {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeStripe = useCallback(
    async ({ forceRemote = false }: { forceRemote?: boolean } = {}) => {
      if (stripePromiseCache && !forceRemote) {
        setStripePromise(stripePromiseCache);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      if (forceRemote) {
        stripePromiseCache = null;
      }

      try {
        const promise = await ensureStripePromise(forceRemote);
        setStripePromise(promise);
        setError(null);
      } catch (err) {
        setStripePromise(null);
        setError(err?.message || "Failed to initialize payment system");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (stripePromiseCache && !stripePromise) {
      setStripePromise(stripePromiseCache);
    }
  }, [stripePromise]);

  return { stripePromise, loading, error, initializeStripe };
}

export async function getStripePromise(): Promise<Promise<Stripe | null> | null> {
  return ensureStripePromise();
}

export async function prefetchStripeKey() {
  try {
    await ensureStripePromise();
  } catch (err) {
    console.error("[Stripe] Pre-fetch failed:", err);
  }
}

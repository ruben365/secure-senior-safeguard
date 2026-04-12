import { useState, useEffect, useCallback } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";

let stripePromiseCache: Promise<Stripe | null> | null = null;
let cachedKey: string | null = null;
let stripeInitPromise: Promise<Stripe | null> | null = null;
let loadStripeModule:
  | (typeof import("@stripe/stripe-js"))["loadStripe"]
  | null = null;

/**
 * Dynamically load the Stripe.js module - this prevents the ~240KB library
 * from being included in the main bundle
 */
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

async function ensureStripePromise(forceRemote = false) {
  if (stripePromiseCache) {
    return stripePromiseCache;
  }

  if (!stripeInitPromise) {
    stripeInitPromise = (async () => {
      const loadStripe = await getLoadStripe();
      const publishableKey = await fetchPublishableKey(forceRemote);
      const stripePromise = loadStripe(publishableKey);
      stripePromiseCache = stripePromise;
      return stripePromise;
    })();
  }

  try {
    return await stripeInitPromise;
  } catch (error) {
    stripePromiseCache = null;
    stripeInitPromise = null;
    throw error;
  } finally {
    stripeInitPromise = null;
  }
}

/**
 * Hook for Stripe initialization - NOW DEMAND-DRIVEN
 * Stripe is only loaded when initializeStripe() is called, not on mount.
 * This prevents ~240KB of unused JavaScript on pages that don't need payments.
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
      } catch (err: any) {
        setStripePromise(null);
        setError(err?.message || "Failed to initialize payment system");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Auto-initialize if cache already exists (fast path for subsequent uses)
  useEffect(() => {
    if (stripePromiseCache && !stripePromise) {
      setStripePromise(stripePromiseCache);
    }
  }, [stripePromise]);

  return { stripePromise, loading, error, initializeStripe };
}

// Synchronous getter for components that can't use hooks
export async function getStripePromise(): Promise<Promise<Stripe | null> | null> {
  return ensureStripePromise();
}

// Lazy pre-fetch - only triggered when user shows intent to pay
export async function prefetchStripeKey() {
  try {
    await ensureStripePromise();
  } catch (err) {
    console.error("[Stripe] Pre-fetch failed:", err);
  }
}

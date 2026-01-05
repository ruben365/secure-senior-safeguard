import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

let stripePromiseCache: Promise<Stripe | null> | null = null;
let cachedKey: string | null = null;

export function useStripeKey() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Defer Stripe initialization until after page load to avoid blocking LCP
    const initStripe = async () => {
      // First try VITE env variable (fastest)
      const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      
      if (envKey && envKey.trim() !== '') {
        if (!stripePromiseCache) {
          stripePromiseCache = loadStripe(envKey);
        }
        setStripePromise(stripePromiseCache);
        setLoading(false);
        return;
      }

      // If cached key exists, use it
      if (cachedKey) {
        if (!stripePromiseCache) {
          stripePromiseCache = loadStripe(cachedKey);
        }
        setStripePromise(stripePromiseCache);
        setLoading(false);
        return;
      }

      // Fetch key from edge function - only when actually needed
      try {
        const { data, error: fnError } = await supabase.functions.invoke('get-stripe-key');
        
        if (fnError) throw fnError;
        
        if (data?.publishableKey) {
          cachedKey = data.publishableKey;
          stripePromiseCache = loadStripe(data.publishableKey);
          setStripePromise(stripePromiseCache);
        } else {
          throw new Error('No publishable key returned');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to initialize payment system');
      } finally {
        setLoading(false);
      }
    };

    // Use requestIdleCallback for non-critical initialization (defers until browser is idle)
    let timeoutId: ReturnType<typeof setTimeout>;
    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(initStripe, { timeout: 5000 });
      return () => (window as any).cancelIdleCallback(idleId);
    } else {
      // Fallback: defer by 2 seconds to avoid blocking LCP
      timeoutId = setTimeout(initStripe, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return { stripePromise, loading, error };
}

// Synchronous getter for components that can't use hooks
export function getStripePromise(): Promise<Stripe | null> | null {
  const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (envKey && envKey.trim() !== '') {
    if (!stripePromiseCache) {
      stripePromiseCache = loadStripe(envKey);
    }
    return stripePromiseCache;
  }
  
  if (cachedKey && !stripePromiseCache) {
    stripePromiseCache = loadStripe(cachedKey);
  }
  
  return stripePromiseCache;
}

// Lazy pre-fetch - only triggered when user shows intent to pay
export async function prefetchStripeKey() {
  const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (envKey && envKey.trim() !== '') {
    if (!stripePromiseCache) {
      stripePromiseCache = loadStripe(envKey);
    }
    return;
  }
  
  if (!cachedKey) {
    try {
      const { data } = await supabase.functions.invoke('get-stripe-key');
      if (data?.publishableKey) {
        cachedKey = data.publishableKey;
        stripePromiseCache = loadStripe(data.publishableKey);
      }
    } catch (err) {
      console.error('[Stripe] Pre-fetch failed:', err);
    }
  }
}

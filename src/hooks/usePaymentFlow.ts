import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCheckout } from "@/contexts/CheckoutContext";
import { toast } from "@/components/ui/sonner";

interface CreatePaymentIntentOptions {
  amount: number;
  customerEmail: string;
  customerName: string;
  isVeteran?: boolean;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  customerId: string;
  amount: number;
  type: string;
}

interface CreateSubscriptionCheckoutOptions {
  priceId: string;
  serviceName: string;
  planTier?: string;
  customerEmail?: string;
  customerName?: string;
  returnTo?: string;
  // discountCode field removed Phase 4.9d — `discount_codes` table was dropped
  // and the create-subscription-checkout edge function no longer reads it.
}

interface SubscriptionCheckoutResponse {
  url: string;
}

// Timeout wrapper for edge function calls
const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number = 15000,
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error("Request timed out. Please try again.")),
        timeoutMs,
      ),
    ),
  ]);
};

export const usePaymentFlow = () => {
  const { setPaymentDetails, setLoading, setError, setStep } = useCheckout();

  const createPaymentIntent = useCallback(
    async (
      options: CreatePaymentIntentOptions,
    ): Promise<PaymentIntentResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        // Convert amount to cents for Stripe
        const amountInCents = Math.round(options.amount * 100);

        const { data, error } = await withTimeout(
          supabase.functions.invoke("create-cart-payment-intent", {
            body: {
              amount: amountInCents,
              customerEmail: options.customerEmail,
              customerName: options.customerName,
              isVeteran: options.isVeteran || false,
              items: options.items || [],
              metadata: options.metadata || {},
            },
          }),
          15000,
        );

        if (error) {
          throw new Error(error.message || "Failed to create payment intent");
        }

        if (!data?.clientSecret) {
          throw new Error("No client secret received from payment service");
        }

        setPaymentDetails(data.paymentIntentId, data.clientSecret);
        setStep("payment");
        setLoading(false);

        return data as PaymentIntentResponse;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Payment initialization failed";
        console.error("Payment intent creation failed:", err);
        setError(message);
        toast.error(message);
        setLoading(false);
        return null;
      }
    },
    [setPaymentDetails, setLoading, setError, setStep],
  );

  // ============================================================================
  // verifyPayment hand-off (Phase 4.12).
  //
  // Accepts either a Stripe Checkout Session id (`cs_...`) OR a Stripe
  // PaymentIntent id (`pi_...`). The verify-payment edge function detects
  // which one was passed by prefix and dispatches to the matching path:
  //
  //   - cs_*  → Path A (Checkout Session lookup)
  //   - pi_*  → Path B (PaymentIntent lookup, partner_orders confirmation
  //                     and digital delivery hand-off)
  //
  // The pre-Phase-4.12 implementation called the server with `{ sessionId }`,
  // which the hardened verify-payment rejects (it expects snake_case
  // `session_id` / `payment_intent_id`). That bug is fixed here.
  // ============================================================================
  const verifyPayment = useCallback(
    async (paymentRef: string): Promise<boolean> => {
      try {
        const isPaymentIntent = paymentRef.startsWith("pi_");
        const body = isPaymentIntent
          ? { payment_intent_id: paymentRef }
          : { session_id: paymentRef };

        const { data, error } = await supabase.functions.invoke(
          "verify-payment",
          { body },
        );

        if (error) {
          throw new Error(error.message || "Payment verification failed");
        }

        return data?.verified === true || data?.status === "paid";
      } catch (err) {
        console.error("Payment verification failed:", err);
        return false;
      }
    },
    [],
  );

  // ============================================================================
  // sendDigitalDownload was removed in Phase 4.11d. The send-digital-download
  // edge function now requires a partner_orders.id (UUID) and authorization
  // by the order owner / admin / service-role. The client-side cart flow never
  // produces a partner_orders row, so this hook only ever called the function
  // with a Stripe paymentIntent.id (wrong type) and with the camelCase shape
  // the hardened function rejects. Server-side verify-payment is the only
  // legitimate trigger today. Phase 4.12 will close the cart-flow digital
  // delivery architectural gap.
  // ============================================================================

  // Create a Stripe Checkout Session for SUBSCRIPTION products.
  // Returns a hosted Stripe Checkout URL the caller should redirect to.
  // The in-dialog Stripe Elements (PaymentIntent) flow does NOT support recurring
  // billing, so subscriptions must use a hosted Checkout Session.
  const createSubscriptionCheckout = useCallback(
    async (
      options: CreateSubscriptionCheckoutOptions,
    ): Promise<SubscriptionCheckoutResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await withTimeout(
          supabase.functions.invoke("create-subscription-checkout", {
            body: {
              priceId: options.priceId,
              serviceName: options.serviceName,
              planTier: options.planTier ?? options.serviceName,
              customerEmail: options.customerEmail,
              customerName: options.customerName,
              returnTo: options.returnTo ?? null,
            },
          }),
          15000,
        );

        if (error) {
          throw new Error(
            error.message || "Failed to create subscription checkout",
          );
        }

        if (!data?.url) {
          throw new Error("No checkout URL received from subscription service");
        }

        setLoading(false);
        return data as SubscriptionCheckoutResponse;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Subscription initialization failed";
        console.error("Subscription checkout creation failed:", err);
        setError(message);
        toast.error(message);
        setLoading(false);
        return null;
      }
    },
    [setLoading, setError],
  );

  return {
    createPaymentIntent,
    createSubscriptionCheckout,
    verifyPayment,
  };
};

export default usePaymentFlow;

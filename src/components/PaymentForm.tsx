import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, CheckCircle, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaymentFormProps {
  /** Display name for the product / plan */
  productName: string;
  /** Amount in USD dollars (e.g. 9.99) */
  amount: number;
  /** Stripe Price ID — used to create the PaymentIntent server-side */
  priceId: string;
  /** 'payment' for one-time, 'subscription' for recurring */
  mode?: "payment" | "subscription";
  /** Customer email pre-filled (optional) */
  customerEmail?: string;
  /** Customer name pre-filled (optional) */
  customerName?: string;
  /** Called when payment succeeds */
  onSuccess?: () => void;
  /** Called when the user dismisses (modal only) */
  onClose?: () => void;
}

export interface PaymentFormModalProps extends PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ─── Stripe publishable key ───────────────────────────────────────────────────

let _stripePromise: ReturnType<typeof loadStripe> | null = null;

function getStripePromise() {
  if (!_stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
    if (key) {
      _stripePromise = loadStripe(key);
    }
  }
  return _stripePromise;
}

// ─── CardElement styles ───────────────────────────────────────────────────────

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1a1a1a",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: "15px",
      lineHeight: "1.5",
      "::placeholder": { color: "#9ca3af" },
      iconColor: "#d96c4a",
    },
    invalid: { color: "#ef4444", iconColor: "#ef4444" },
  },
  hidePostalCode: false,
};

// ─── Inner form (must be inside Elements) ────────────────────────────────────

function CardForm({
  productName,
  amount,
  mode = "payment",
  customerEmail = "",
  customerName = "",
  clientSecret,
  onSuccess,
  onClose,
}: PaymentFormProps & { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cardReady, setCardReady] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements || !cardReady) return;
    setStatus("processing");
    setErrorMsg("");

    const cardEl = elements.getElement(CardElement);
    if (!cardEl) { setStatus("idle"); return; }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardEl,
        billing_details: {
          email: customerEmail || undefined,
          name: customerName || undefined,
        },
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message ?? "Payment failed. Please try again.");
      return;
    }

    if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
      setStatus("success");
      toast.success("Payment successful!");
      onSuccess?.();
      return;
    }

    setStatus("error");
    setErrorMsg("Payment could not be confirmed. Please try again.");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">Payment successful!</p>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "subscription" ? "Your subscription is now active." : "Your purchase is confirmed."}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 rounded-full bg-[#d96c4a] text-white text-sm font-medium hover:bg-[#c25e3e] transition-colors"
          >
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Amount */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-orange-50 border border-orange-100">
        <div>
          <p className="text-sm font-semibold text-gray-900">{productName}</p>
          {mode === "subscription" && (
            <p className="text-xs text-gray-500">Recurring · cancel anytime</p>
          )}
        </div>
        <p className="text-lg font-bold text-[#d96c4a]">
          ${amount.toFixed(2)}{mode === "subscription" ? "/mo" : ""}
        </p>
      </div>

      {/* Card input */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Card details</label>
        <div
          className="px-3.5 py-3 rounded-xl border border-gray-200 bg-white focus-within:border-[#d96c4a] focus-within:ring-2 focus-within:ring-[#d96c4a]/20 transition-all"
        >
          <CardElement
            options={CARD_ELEMENT_OPTIONS}
            onReady={() => setCardReady(true)}
            onChange={e => { if (e.error) { setErrorMsg(e.error.message ?? ""); } else { setErrorMsg(""); } }}
          />
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-xs text-red-500 -mt-2">{errorMsg}</p>
      )}

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={status === "processing" || !stripe || !cardReady}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#d96c4a] hover:bg-[#c25e3e] disabled:opacity-60 text-white font-semibold text-sm transition-colors"
      >
        {status === "processing" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
        ) : (
          <><Lock className="w-4 h-4" /> Pay ${amount.toFixed(2)}</>
        )}
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400">
        Secure payments via Stripe · {mode === "subscription" ? "Cancel anytime" : "256-bit encryption"}
      </p>
    </div>
  );
}

// ─── Loader — fetches clientSecret then mounts Elements ──────────────────────

function PaymentFormLoader(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: {
            priceId: props.priceId,
            mode: props.mode ?? "payment",
            customerEmail: props.customerEmail ?? "guest@invisionnetwork.org",
            customerName: props.customerName ?? "Guest",
          },
        });
        if (error) throw new Error(error.message);
        if (!data?.clientSecret) throw new Error("No client secret returned");
        setClientSecret(data.clientSecret);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unable to start checkout";
        setLoadError(msg);
        toast.error(msg);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loadError) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-red-500">{loadError}</p>
        <button onClick={() => { fetchedRef.current = false; setLoadError(null); }}
          className="mt-3 text-xs text-[#d96c4a] underline">
          Retry
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Preparing secure checkout…</span>
      </div>
    );
  }

  const stripePromise = getStripePromise();
  if (!stripePromise) {
    return <p className="text-sm text-red-500 text-center py-6">Stripe key not configured.</p>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe" as const,
          variables: { colorPrimary: "#d96c4a", borderRadius: "12px", fontFamily: "Inter, system-ui, sans-serif" },
        },
      }}
    >
      <CardForm {...props} clientSecret={clientSecret} />
    </Elements>
  );
}

// ─── Inline form (drop anywhere on a page) ───────────────────────────────────

export function PaymentForm(props: PaymentFormProps) {
  return (
    <div
      className="w-full max-w-sm mx-auto bg-white rounded-[20px] shadow-xl border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-1 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center">
          <Lock className="w-5 h-5 text-[#d96c4a]" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">Secure Checkout</h3>
      </div>

      <PaymentFormLoader {...props} />
    </div>
  );
}

// ─── Modal version ────────────────────────────────────────────────────────────

export function PaymentFormModal({
  open,
  onOpenChange,
  onClose,
  ...props
}: PaymentFormModalProps) {
  const handleClose = () => {
    onOpenChange(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-none bg-transparent max-w-[400px]">
        <div className="bg-white rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#d96c4a]" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Secure Checkout</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            <PaymentFormLoader {...props} onClose={handleClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

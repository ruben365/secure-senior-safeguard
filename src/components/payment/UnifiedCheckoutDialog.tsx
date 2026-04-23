import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Check,
  Loader2,
  AlertCircle,
  Star,
  ShieldCheck,
  PartyPopper,
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Lock,
  X,
} from "lucide-react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCheckout } from "@/contexts/CheckoutContext";
import { useStripeKey } from "@/hooks/useStripeKey";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import useStripeElementLifecycle from "@/hooks/useStripeElementLifecycle";
import useHostedCheckoutFallback from "@/hooks/useHostedCheckoutFallback";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import confetti from "canvas-confetti";
import { PaymentElementPanel } from "./PaymentElementPanel";

/* ═══════════════════════════════════════════════════════════════════
   DESIGN TOKENS — white / light checkout
   Payment dialogs are always white for readability and trust.
   ═══════════════════════════════════════════════════════════════════ */
const T = {
  // Surfaces
  glass: "#ffffff",
  glassCard: "rgba(0, 0, 0, 0.03)",
  glassCardBorder: "#e5e5e5",
  glassInput: "#f5f5f7",
  glassInputBorder: "#d0d0d5",
  // Text
  white: "#1a1a1c",
  white70: "#3a3a3c",
  white50: "#6b6b70",
  white30: "#aeaeb2",
  // Accents (primary — uses CSS custom property)
  copper: "hsl(var(--primary))",
  copperDark: "hsl(var(--primary))",
  copperGlow: "hsl(var(--primary) / 0.3)",
  copperSoft: "hsl(var(--primary) / 0.15)",
  // Status
  success: "#22C55E",
  successBg: "rgba(34, 197, 94, 0.12)",
  error: "#EF4444",
  errorBg: "rgba(239, 68, 68, 0.12)",
} as const;

/* ── Shared input class ────────────────────────────────────────── */
const inputClass =
  "w-full h-[44px] rounded-lg border px-3 text-[14px] placeholder:text-[#aeaeb2] transition-colors duration-200 focus:outline-none focus:ring-0";
const inputStyle = {
  background: T.glassInput,
  borderColor: T.glassInputBorder,
  color: T.white,
};
const inputFocusStyle = {
  borderColor: "#D96C4A",
  boxShadow: "0 0 0 3px rgba(217, 108, 74, 0.15)",
};

/* ── Progress Bar ──────────────────────────────────────────────── */
const ProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div className="flex items-center justify-center gap-0 px-4 py-3">
    {[1, 2, 3].map((n, i) => (
      <React.Fragment key={n}>
        {i > 0 && (
          <div
            className="flex-1 h-px mx-1"
            style={{
              background:
                step >= n
                  ? `linear-gradient(90deg, ${T.copper}, ${T.copperDark})`
                  : T.glassInputBorder,
            }}
          />
        )}
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300"
          style={{
            background: step >= n ? T.copper : "transparent",
            border: `2px solid ${step >= n ? T.copper : T.white30}`,
            color: step >= n ? "#fff" : T.white50,
            boxShadow: step === n ? `0 0 12px ${T.copperGlow}` : "none",
          }}
        >
          {n}
        </div>
      </React.Fragment>
    ))}
  </div>
);

/* ── Order Summary Card ────────────────────────────────────────── */
const OrderSummaryCard: React.FC = () => {
  const { state, subtotal, discount, total } = useCheckout();
  const item = state.items[0];
  if (!item) return null;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: T.glassCard,
        border: `1px solid ${T.glassCardBorder}`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold truncate" style={{ color: T.white }}>
            {item.product.name}
          </p>
          <p className="text-[12px] mt-1 line-clamp-2" style={{ color: T.white50 }}>
            {item.product.description || "Digital product"}
          </p>
        </div>
        <span className="text-[20px] font-bold flex-shrink-0" style={{ color: T.copper }}>
          ${total.toFixed(2)}
        </span>
      </div>

      {discount > 0 && (
        <div className="flex items-center gap-1.5 mt-2 text-[11px]" style={{ color: T.success }}>
          <Star className="w-3 h-3" />
          Veteran discount: -${discount.toFixed(2)}
        </div>
      )}

      {state.items.length > 1 && (
        <div className="mt-3 pt-3 space-y-1" style={{ borderTop: `1px solid ${T.glassCardBorder}` }}>
          {state.items.slice(1).map((i) => (
            <div key={i.productId} className="flex justify-between text-[12px]" style={{ color: T.white70 }}>
              <span className="truncate flex-1">{i.product.name}</span>
              <span>${i.discountedPrice.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-[13px] font-semibold pt-1" style={{ color: T.white }}>
            <span>Total</span>
            <span style={{ color: T.copper }}>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Step 1: Customer Info ─────────────────────────────────────── */
const CustomerInfoStep: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { state, setCustomerInfo, total } = useCheckout();
  const { createPaymentIntent, createSubscriptionIntent } = usePaymentFlow();
  const { customerInfo, items, isLoading } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.email || !customerInfo.name) {
      toast.error("Please enter your name and email to continue.");
      return;
    }

    if (state.type === "subscription") {
      const sub = items[0];
      if (!sub?.product.stripePriceId) {
        toast.error("This subscription is not available for direct checkout.");
        return;
      }
      await createSubscriptionIntent({
        priceId: sub.product.stripePriceId,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
      });
      return;
    }

    const paymentItems = items.map((item) => ({
      id: item.productId,
      name: item.product.name,
      price: item.discountedPrice,
      quantity: item.quantity,
    }));
    const result = await createPaymentIntent({
      amount: total,
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      isVeteran: customerInfo.isVeteran,
      items: paymentItems,
    });
    if (result) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <OrderSummaryCard />

      <div className="space-y-3">
        <div>
          <label className="block text-[12px] font-medium mb-1.5" style={{ color: T.white70 }}>
            Email Address
          </label>
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ email: e.target.value })}
            placeholder="your@email.com"
            required
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: T.glassInputBorder, boxShadow: "none" })}
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium mb-1.5" style={{ color: T.white70 }}>
            Full Name
          </label>
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ name: e.target.value })}
            placeholder="Your full name"
            required
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: T.glassInputBorder, boxShadow: "none" })}
          />
        </div>
      </div>

      {/* Veteran toggle — compact inline */}
      <label
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
        style={{ background: T.glassCard, border: `1px solid ${T.glassCardBorder}` }}
      >
        <Checkbox
          id="veteran-checkout"
          checked={customerInfo.isVeteran}
          onCheckedChange={(c) => setCustomerInfo({ isVeteran: !!c })}
          className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <div className="flex-1 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" style={{ color: T.copper }} />
          <span className="text-[13px] font-medium" style={{ color: T.white70 }}>
            Veteran / First Responder — save 10%
          </span>
        </div>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-[48px] rounded-xl text-[15px] font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${T.copper}, ${T.copperDark})`,
          boxShadow: `0 4px 14px ${T.copperGlow}`,
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Preparing checkout...
          </>
        ) : (
          <>
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

/* ── QR Code step (reused from original) ───────────────────────── */
const QRCodePaymentStep: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { state, total } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(240);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQrCodeUrl(null);
      setSessionId(null);
    }
  }, [qrCodeUrl, timeLeft]);

  useEffect(() => {
    if (!sessionId || !qrCodeUrl) return;
    const interval = setInterval(async () => {
      setChecking(true);
      try {
        const { data } = await supabase.functions.invoke(
          "verify-payment-link",
          { body: { sessionId } },
        );
        if (data?.paid) {
          try {
            await supabase.functions.invoke("verify-payment", {
              body: { session_id: data.sessionId ?? sessionId },
            });
          } catch {
            // Non-blocking
          }
          clearInterval(interval);
          onSuccess();
        }
      } catch {
        // Silently retry
      } finally {
        setChecking(false);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [sessionId, qrCodeUrl, onSuccess]);

  const generateQR = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-cart-payment-intent",
        {
          body: {
            checkoutMode: true,
            items: state.items.map((item) => ({
              id: item.productId,
              name: item.product.name,
              price: item.discountedPrice,
              quantity: item.quantity,
            })),
            customerEmail: state.customerInfo.email,
            customerName: state.customerInfo.name,
            isVeteran: state.customerInfo.isVeteran,
          },
        },
      );
      if (error) throw error;
      if (data?.url && data?.sessionId) {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url)}`;
        setQrCodeUrl(qrUrl);
        setSessionId(data.sessionId);
        setTimeLeft(240);
      }
    } catch {
      toast.error("Couldn't create the QR code. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-center py-2">
      {!qrCodeUrl ? (
        <button
          onClick={generateQR}
          disabled={loading}
          className="w-full h-[44px] rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2"
          style={{
            background: T.glassCard,
            border: `1px solid ${T.glassCardBorder}`,
            color: T.white,
          }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      ) : (
        <>
          <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48 mx-auto rounded-xl bg-white p-3" loading="lazy" decoding="async" width={192} height={192} />
          <p className="text-[12px]" style={{ color: T.white50 }}>
            Scan with your phone camera · Expires in {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </p>
          {checking && (
            <p className="text-[11px] flex items-center justify-center gap-1.5" style={{ color: T.copper }}>
              <Loader2 className="w-3 h-3 animate-spin" /> Checking payment...
            </p>
          )}
        </>
      )}
    </div>
  );
};

/* ── Step 2: Payment Form (Stripe Elements) ────────────────────── */
const PaymentFormStep: React.FC<{
  onSuccess: () => void;
  onBack: () => void;
}> = ({ onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { state, setError, setOrderId, total } = useCheckout();
  const [processing, setProcessing] = useState(false);
  const {
    hostedCheckoutActive,
    hostedCheckoutError,
    hostedCheckoutLoading,
    hostedCheckoutUrl,
    openHostedCheckout,
  } = useHostedCheckoutFallback({
    onPaid: async ({ sessionId }) => {
      if (!sessionId) {
        throw new Error("Hosted checkout finished without a session reference.");
      }

      try {
        await supabase.functions.invoke("verify-payment", {
          body: { session_id: sessionId },
        });
      } catch {
        // Non-blocking
      }

      setOrderId(sessionId);
      onSuccess();
    },
  });
  const { isReady, timedOut, mountKey, handleReady, retry } =
    useStripeElementLifecycle({
      enabled: true,
      resetKeys: [state.clientSecret],
      timeoutMs: 15000,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
            receipt_email: state.customerInfo.email,
          },
          redirect: "if_required",
        });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent?.status === "succeeded") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        if (paymentIntent.id) {
          try {
            await supabase.functions.invoke("verify-payment", {
              body: { payment_intent_id: paymentIntent.id },
            });
          } catch {
            // Non-blocking
          }
        }
        setOrderId(paymentIntent.id);
        onSuccess();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment didn't go through. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] font-medium transition-colors"
        style={{ color: T.white50 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to details
      </button>

      <PaymentElementPanel
        isReady={isReady}
        timedOut={timedOut}
        onRetry={retry}
        onOpenHostedCheckout={async () => {
          await openHostedCheckout(async () => {
            const { data, error } = await supabase.functions.invoke(
              "create-cart-payment-intent",
              {
                body: {
                  checkoutMode: true,
                  customerEmail: state.customerInfo.email,
                  customerName: state.customerInfo.name,
                  isVeteran: state.customerInfo.isVeteran,
                  items: state.items.map((item) => ({
                    id: item.productId,
                    name: item.product.name,
                    price: item.discountedPrice,
                    quantity: item.quantity,
                  })),
                },
              },
            );

            if (error) {
              throw new Error(error.message || "Unable to open hosted checkout.");
            }

            if (!data?.url || !data?.sessionId) {
              throw new Error("Hosted checkout did not return a valid session.");
            }

            return {
              url: data.url,
              sessionId: data.sessionId,
            };
          });
        }}
        hostedCheckoutLoading={hostedCheckoutLoading}
        hostedCheckoutError={hostedCheckoutError}
        hostedCheckoutUrl={hostedCheckoutUrl}
        hostedCheckoutActive={hostedCheckoutActive}
        loadingLabel="Preparing secure payment form..."
      >
        <PaymentElement
          key={mountKey}
          onReady={handleReady}
          options={{
            layout: "tabs",
          }}
        />
      </PaymentElementPanel>

      {state.error && (
        <div
          className="flex items-center gap-2 p-3 rounded-lg text-[13px]"
          style={{ background: T.errorBg, color: T.error }}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing || !isReady}
        className="w-full h-[48px] rounded-xl text-[15px] font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${T.copper}, ${T.copperDark})`,
          boxShadow: `0 4px 14px ${T.copperGlow}`,
        }}
      >
        {processing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </button>

      <p className="text-center text-[11px]" style={{ color: T.white30 }}>
        <Lock className="inline w-3 h-3 mr-1 -mt-px" />
        Secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

/* ── Step 3: Success ───────────────────────────────────────────── */
const SuccessStep: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state, hasDigitalProducts, total } = useCheckout();

  return (
    <div className="text-center space-y-4 py-2">
      <div
        className="w-10 h-10 mx-auto rounded-2xl flex items-center justify-center"
        style={{ background: T.successBg }}
      >
        <PartyPopper className="w-5 h-5" style={{ color: T.success }} />
      </div>

      <div>
        <h3 className="text-[20px] font-semibold" style={{ color: T.white }}>
          Payment Successful!
        </h3>
        <p className="text-[13px] mt-1" style={{ color: T.white50 }}>
          Thank you for your purchase
        </p>
      </div>

      <div className="rounded-xl p-4 space-y-2 text-[13px]" style={{ background: T.glassCard, border: `1px solid ${T.glassCardBorder}` }}>
        <div className="flex justify-between">
          <span style={{ color: T.white50 }}>Order ID</span>
          <span className="font-mono" style={{ color: T.white70 }}>
            {state.orderId?.slice(0, 8)}...
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: T.white50 }}>Amount Paid</span>
          <span className="font-semibold" style={{ color: T.copper }}>
            ${total.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: T.white50 }}>Email</span>
          <span style={{ color: T.white70 }}>{state.customerInfo.email}</span>
        </div>
      </div>

      {hasDigitalProducts && (
        <div
          className="flex items-center justify-center gap-2 p-3 rounded-lg text-[13px]"
          style={{ background: T.successBg, color: T.success }}
        >
          <Check className="w-4 h-4" />
          Digital products sent to your email
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full h-[44px] rounded-xl text-[14px] font-semibold transition-all duration-200 hover:-translate-y-[1px]"
        style={{
          background: T.glassCard,
          border: `1px solid ${T.glassCardBorder}`,
          color: T.white,
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN DIALOG
   ═══════════════════════════════════════════════════════════════════ */
const UnifiedCheckoutDialog = React.forwardRef<HTMLDivElement>(
  function UnifiedCheckoutDialog(_props, _ref) {
    const { state, closeCheckout, setStep, resetCheckout } = useCheckout();
    const { stripePromise, initializeStripe } = useStripeKey();

    useEffect(() => {
      if (state.isOpen) initializeStripe();
    }, [state.isOpen, initializeStripe]);

    const handleClose = () => {
      if (state.step === "success") resetCheckout();
      closeCheckout();
    };

    const stepNum = state.step === "info" ? 1 : state.step === "payment" ? 2 : 3;

    return (
      <Dialog open={state.isOpen} onOpenChange={handleClose}>
        {/* Custom dark glass overlay with bokeh effect */}
        <DialogContent
          className="border-0 p-0 gap-0 overflow-hidden text-[#1a1a1c] backdrop-blur-none"
          style={{
            background: T.glass,
            border: `1px solid ${T.glassCardBorder}`,
            borderRadius: "1.25rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 4px 16px -4px rgba(0, 0, 0, 0.08)",
            maxWidth: "440px",
            width: "92%",
          }}
        >
          {/* ── Header ─────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-5 pt-5 pb-2"
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5" style={{ color: T.copper }} />
              <h2 className="text-[20px] font-semibold" style={{ color: T.white }}>
                Secure Checkout
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px]"
                style={{
                  background: T.glassCard,
                  border: `1px solid ${T.glassCardBorder}`,
                  color: T.white50,
                }}
              >
                <Lock className="w-2.5 h-2.5" />
                Stripe
              </span>
            </div>
          </div>

          <p className="px-5 text-[13px]" style={{ color: T.white50 }}>
            Complete your purchase securely.
          </p>

          {/* ── Progress Bar ───────────────────────────────── */}
          <ProgressBar step={stepNum} />

          {/* ── Body ───────────────────────────────────────── */}
          <div className="px-5 pb-5">
            {state.step === "info" && (
              <CustomerInfoStep onNext={() => {}} />
            )}

            {state.step === "payment" && (
              <Tabs defaultValue="card" className="w-full">
                <TabsList
                  className="grid w-full grid-cols-2 mb-4 rounded-lg h-6 p-0.5"
                  style={{ background: T.glassCard }}
                >
                  <TabsTrigger
                    value="card"
                    className="flex items-center gap-1.5 text-[12px] rounded-md data-[state=active]:bg-black/8 data-[state=active]:text-[#1a1a1c] text-[#6b6b70] h-5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger
                    value="qr"
                    className="flex items-center gap-1.5 text-[12px] rounded-md data-[state=active]:bg-black/8 data-[state=active]:text-[#1a1a1c] text-[#6b6b70] h-5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    QR Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="card">
                  {stripePromise && state.clientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret: state.clientSecret,
                        appearance: {
                          theme: "night",
                          variables: {
                            colorPrimary: "#D96C4A",
                            colorBackground: "rgba(15, 15, 25, 0.6)",
                            colorText: "rgba(255, 255, 255, 0.9)",
                            colorTextSecondary: "rgba(255, 255, 255, 0.5)",
                            borderRadius: "10px",
                            fontFamily: "inherit",
                          },
                          rules: {
                            ".Input": {
                              backgroundColor: T.glassInput,
                              border: `1px solid ${T.glassInputBorder}`,
                              color: T.white,
                            },
                            ".Input:focus": {
                              borderColor: "#D96C4A",
                              boxShadow: "0 0 0 3px rgba(217, 108, 74, 0.15)",
                            },
                            ".Tab": {
                              backgroundColor: T.glassCard,
                              border: `1px solid ${T.glassCardBorder}`,
                              color: T.white70,
                            },
                            ".Tab--selected": {
                              backgroundColor: "rgba(217, 108, 74, 0.15)",
                              borderColor: "#D96C4A",
                              color: T.white,
                            },
                            ".Label": {
                              color: T.white70,
                              fontSize: "12px",
                            },
                          },
                        },
                      }}
                    >
                      <PaymentFormStep
                        onSuccess={() => setStep("success")}
                        onBack={() => setStep("info")}
                      />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center py-5 gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" style={{ color: T.copper }} />
                      <span className="text-[13px]" style={{ color: T.white50 }}>
                        Loading payment...
                      </span>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="qr">
                  <QRCodePaymentStep onSuccess={() => setStep("success")} />
                </TabsContent>
              </Tabs>
            )}

            {state.step === "success" && <SuccessStep onClose={handleClose} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  },
);

export default UnifiedCheckoutDialog;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { QuickVeteranToggle } from "./QuickVeteranToggle";
import { TrustIndicators } from "./TrustIndicators";
import { useStripeKey } from "@/hooks/useStripeKey";
import useStripeElementLifecycle from "@/hooks/useStripeElementLifecycle";

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  isDigital?: boolean;
}

interface SmartPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaymentItem[];
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

interface PaymentFormProps {
  items: PaymentItem[];
  onSuccess?: () => void;
  onClose: () => void;
}

function SmartPaymentForm({ items, onSuccess, onClose }: PaymentFormProps) {
  const {
    stripePromise,
    loading: stripeLoading,
    error: stripeError,
    initializeStripe,
  } = useStripeKey();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Stripe when component mounts (dialog opens)
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail =
      localStorage.getItem("user_email") ||
      localStorage.getItem("checkout_email");
    const savedName =
      localStorage.getItem("user_name") ||
      localStorage.getItem("checkout_name");
    const savedVeteran =
      localStorage.getItem("is_veteran") ||
      localStorage.getItem("checkout_veteran");
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === "true") setIsVeteran(true);

    // Try to get user info from Supabase session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email && !savedEmail) {
        setEmail(data.user.email);
      }
    });
  }, []);

  // Calculate pricing with veteran discount
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const veteranDiscount = isVeteran ? subtotal * 0.1 : 0;
  const finalAmount = subtotal - veteranDiscount;
  const amountInCents = Math.round(finalAmount * 100);

  const handleInfoSubmit = async () => {
    if (!email || !name) {
      toast.error("Please enter your name and email to continue.");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions to continue.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Save to localStorage for future
      localStorage.setItem("user_email", email);
      localStorage.setItem("checkout_email", email);
      localStorage.setItem("user_name", name);
      localStorage.setItem("checkout_name", name);
      localStorage.setItem("is_veteran", isVeteran.toString());
      localStorage.setItem("checkout_veteran", isVeteran.toString());

      // Call edge function to create payment intent
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-cart-payment-intent",
        {
          body: {
            amount: amountInCents,
            customerEmail: email,
            customerName: name,
            isVeteran,
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1,
            })),
            metadata: { source: "smart_payment" },
          },
        },
      );

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      if (!data?.clientSecret) {
        throw new Error("Failed to get payment client secret");
      }

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: unknown) {
      console.error("Error creating payment intent:", err);
      const message =
        err instanceof Error ? err.message : "Couldn't start checkout";
      setError(message);
      toast.error("Couldn't start checkout. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setStep("success");
    toast.success("Payment successful!");
    onSuccess?.();
  };

  const isDigital = items.some((item) => item.isDigital);

  return (
    <div className="space-y-3.5">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        {["info", "payment", "success"].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : ["info", "payment", "success"].indexOf(step) > i
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {["info", "payment", "success"].indexOf(step) > i ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div
                className={`w-8 h-0.5 rounded ${
                  ["info", "payment", "success"].indexOf(step) > i
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Customer Info */}
        {step === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {/* Order Summary */}
            <div className="bg-muted/50 rounded-lg p-3 border">
              <h4 className="font-semibold text-xs mb-2 text-muted-foreground uppercase tracking-wide">Order Summary</h4>
              <div className="space-y-1 mb-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-muted-foreground truncate pr-2">
                      {item.name}{" "}
                      {item.quantity &&
                        item.quantity > 1 &&
                        `× ${item.quantity}`}
                    </span>
                    <span className="font-medium flex-shrink-0">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              {isVeteran && veteranDiscount > 0 && (
                <div className="flex justify-between text-xs text-green-600 border-t pt-1.5">
                  <span>Veteran Discount (10%)</span>
                  <span>-${veteranDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm mt-1.5 pt-1.5 border-t">
                <span>Total</span>
                <span className="text-primary">${finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-2.5">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>

              {/* Veteran Discount Toggle */}
              <QuickVeteranToggle
                isVeteran={isVeteran}
                onVeteranChange={setIsVeteran}
                discountPercent={10}
              />

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked === true)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I agree to the{" "}
                  <a href="/terms-of-service" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleInfoSubmit}
              disabled={isLoading || !email || !name || !termsAccepted}
              className="w-full h-9 text-sm"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && clientSecret && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {/* Order Summary */}
            <div className="bg-muted/50 rounded-lg px-3 py-2 border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Order Total
                </span>
                <span className="text-base font-bold text-primary">
                  ${finalAmount.toFixed(2)}
                </span>
              </div>
              {isVeteran && (
                <Badge className="bg-green-500/20 text-green-600 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Veteran discount applied
                </Badge>
              )}
            </div>

            {/* Stripe Payment Element */}
            <div className="bg-background rounded-lg p-3 border">
              {stripeLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Initializing payment...
                  </span>
                </div>
              ) : !stripePromise || stripeError ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Payment system unavailable</p>
                  <p className="text-sm mt-1">
                    {stripeError || "Please refresh the page and try again."}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Page
                  </Button>
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        borderRadius: "8px",
                        colorPrimary: "#d96c4a",
                        fontSizeBase: "14px",
                        spacingUnit: "3px",
                      },
                    },
                  }}
                >
                  <PaymentElementWrapper
                    onSuccess={handlePaymentSuccess}
                    amount={finalAmount}
                    email={email}
                    onBack={() => setStep("info")}
                  />
                </Elements>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-7 h-7 text-green-500" />
              </motion.div>
            </div>

            <h3 className="text-lg font-bold mb-1">Payment Successful!</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Thank you for your purchase!
              <br />A confirmation email has been sent to {email}.
            </p>

            {isDigital && (
              <div className="bg-green-500/10 text-green-600 p-4 rounded-xl text-sm mb-4">
                <Sparkles className="w-5 h-5 mx-auto mb-2" />
                <p className="font-medium">
                  Check your email for your Access ID
                </p>
                <p className="text-xs mt-1">Use it to read your books online at /reader</p>
              </div>
            )}

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Wrapper component to use hooks inside Elements provider
function PaymentElementWrapper({
  onSuccess,
  amount,
  email,
  onBack,
}: {
  onSuccess: () => void;
  amount: number;
  email: string;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isReady, timedOut, mountKey, handleReady, retry } =
    useStripeElementLifecycle({
      enabled: true,
      resetKeys: [amount, email],
    });

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
            receipt_email: email,
          },
          redirect: "if_required",
        });

      if (confirmError) throw confirmError;

      if (
        paymentIntent?.status === "succeeded" ||
        paymentIntent?.status === "processing"
      ) {
        // ================================================================
        // Phase 4.12 — close the cart digital delivery hand-off.
        //
        // create-cart-payment-intent inserts a partner_orders row before
        // creating the PaymentIntent and stamps order_id onto its
        // metadata. After confirmPayment succeeds we ping verify-payment
        // with the payment_intent_id so it can mark partner_orders paid
        // and (when hasDigital === "true") trigger send-digital-download
        // with the partner_orders.id. Non-blocking — verify-payment is
        // idempotent and a webhook would catch a missed delivery on a
        // slower path. Happy path = "delivery within seconds".
        // ================================================================
        if (paymentIntent.id) {
          try {
            await supabase.functions.invoke("verify-payment", {
              body: { payment_intent_id: paymentIntent.id },
            });
          } catch (verifyError) {
            console.error(
              "verify-payment hand-off failed (non-blocking):",
              verifyError,
            );
          }
        }

        onSuccess();
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Payment didn't go through. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-white/85 p-3 shadow-sm">
        {timedOut ? (
          <div className="space-y-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <div className="flex items-start gap-2">
              <RefreshCw className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-destructive">
                  Payment form failed to load
                </p>
                <p className="text-xs leading-relaxed text-destructive/85">
                  Retry the secure card form or switch to the QR payment option if your device prefers hosted checkout.
                </p>
              </div>
            </div>
            <Button type="button" variant="outline" size="sm" className="w-full h-9 text-sm" onClick={retry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry payment form
            </Button>
          </div>
        ) : (
          <div className="relative min-h-[180px]">
            {!isReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-lg bg-white/90 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Loading payment form...
              </div>
            )}
            <div className={isReady ? "opacity-100" : "pointer-events-none opacity-[0.02]"}>
              <PaymentElement
                key={mountKey}
                onReady={handleReady}
                options={{
                  layout: "tabs",
                  paymentMethodOrder: ["card", "apple_pay", "google_pay"],
                }}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 h-9 text-sm"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !stripe || !elements || !isReady}
          className="flex-1 h-9 text-sm"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay ${amount.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function SmartPaymentDialog({
  open,
  onOpenChange,
  items,
  title = "Complete Your Purchase",
  description,
  onSuccess,
}: SmartPaymentDialogProps) {
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px] overflow-hidden p-4 gap-2">
        <DialogHeader className="space-y-0 pb-2.5">
          <DialogTitle className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#d96c4a]/12 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-4 h-4 text-[#d96c4a]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-semibold leading-none">{title}</span>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 h-[18px]">
                  <Lock className="w-2.5 h-2.5 mr-1" />
                  Powered by Stripe
                </Badge>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-[11px] mt-1">
            {description ||
              `${itemCount} ${itemCount === 1 ? "item" : "items"} in your order`}
          </DialogDescription>
        </DialogHeader>

        <SmartPaymentForm
          items={items}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess?.();
          }}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  Star,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useStripeKey } from "@/hooks/useStripeKey";
import useStripeElementLifecycle from "@/hooks/useStripeElementLifecycle";
import useHostedCheckoutFallback from "@/hooks/useHostedCheckoutFallback";
import { QRCodePaymentSection } from "./QRCodePaymentSection";
import { CheckoutCard, CheckoutDialogFrame, CheckoutTrustFooter } from "./CheckoutFrame";
import { PaymentElementPanel } from "./PaymentElementPanel";

export interface EmbeddedPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "subscription" | "payment";
  priceId: string;
  productName: string;
  amount: number; // in cents
  description?: string;
  features?: string[];
  onSuccess?: () => void;
}

interface PaymentFormProps {
  mode: "subscription" | "payment";
  priceId: string;
  productName: string;
  amount: number;
  description?: string;
  features?: string[];
  onSuccess?: () => void;
  onClose: () => void;
}

function PaymentForm({
  mode,
  priceId,
  productName,
  amount,
  description,
  features,
  onSuccess,
  onClose,
}: PaymentFormProps) {
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
  const {
    hostedCheckoutActive,
    hostedCheckoutError,
    hostedCheckoutLoading,
    hostedCheckoutUrl,
    openHostedCheckout,
    resetHostedCheckout,
  } = useHostedCheckoutFallback({
    onPaid: async ({ paymentIntentId, sessionId }) => {
      await finalizeSuccess({ paymentIntentId, sessionId });
    },
  });

  // Initialize Stripe when component mounts (dialog opens)
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  useEffect(() => {
    if (step !== "payment") {
      resetHostedCheckout();
    }
  }, [resetHostedCheckout, step]);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    const savedName = localStorage.getItem("user_name");
    const savedVeteran = localStorage.getItem("is_veteran");
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === "true") setIsVeteran(true);
  }, []);

  // Calculate pricing with veteran discount
  const veteranDiscount = isVeteran ? Math.round(amount * 0.1) : 0;
  const finalAmount = amount - veteranDiscount;

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
      localStorage.setItem("user_name", name);
      localStorage.setItem("is_veteran", isVeteran.toString());

      // Call edge function to create payment intent
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-payment-intent",
        {
          body: {
            priceId,
            mode,
            customerEmail: email,
            customerName: name,
            isVeteran,
            metadata: { productName },
          },
        },
      );

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: unknown) {
      console.error("Error creating payment intent:", err);
      const message = err instanceof Error ? err.message : "Couldn't start checkout";
      setError(message);
      toast.error("Couldn't start checkout. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const finalizeSuccess = async ({
    paymentIntentId,
    sessionId,
  }: {
    paymentIntentId?: string | null;
    sessionId?: string | null;
  }) => {
    setStep("success");
    toast.success("Payment successful!");

    // Call complete-payment to update records and send emails
    try {
      await supabase.functions.invoke("complete-payment", {
        body: {
          paymentType: mode === "subscription" ? "subscription" : "product",
          paymentIntentId: paymentIntentId ?? undefined,
          sessionId: sessionId ?? undefined,
        },
      });
    } catch (err) {
      console.error("Failed to complete payment processing:", err);
    }

    onSuccess?.();
  };

  const openHostedCheckoutPage = async () => {
    await openHostedCheckout(async () => {
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-payment-intent",
        {
          body: {
            priceId,
            mode,
            customerEmail: email,
            customerName: name,
            isVeteran,
            metadata: {
              productName,
            },
            checkoutMode: true,
          },
        },
      );

      if (fnError) {
        throw new Error(fnError.message || "Unable to open hosted checkout.");
      }

      if (!data?.url || !data?.sessionId) {
        throw new Error("Hosted checkout did not return a valid session.");
      }

      return {
        url: data.url,
        sessionId: data.sessionId,
      };
    });
  };

  return (
    <div className="space-y-3.5 max-sm:space-y-2">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1.5 mb-1 max-sm:mb-0">
        {["info", "payment", "success"].map((s, i) => (
          <div key={s} className="flex items-center gap-2 max-sm:gap-1">
            <div
              className={`w-6 h-6 max-sm:w-4 max-sm:h-4 rounded-full flex items-center justify-center text-[11px] max-sm:text-[9px] font-bold transition-all ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : ["info", "payment", "success"].indexOf(step) > i
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {["info", "payment", "success"].indexOf(step) > i ? (
                <CheckCircle className="w-3 h-3 max-sm:w-2 max-sm:h-2" />
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div
                className={`w-8 max-sm:w-5 h-0.5 rounded ${
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
            {/* Product Summary */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-3 max-sm:p-2 border border-primary/20">
              <div className="flex items-center justify-between gap-3 max-sm:gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm max-sm:text-xs truncate">{productName}</h3>
                  {description && (
                    <p className="text-xs max-sm:text-[10px] text-muted-foreground line-clamp-1">
                      {description}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg max-sm:text-sm font-bold text-primary">
                    ${(finalAmount / 100).toFixed(2)}
                  </div>
                  {mode === "subscription" && (
                    <span className="text-xs max-sm:text-[10px] text-muted-foreground">
                      /month
                    </span>
                  )}
                </div>
              </div>
              {isVeteran && veteranDiscount > 0 && (
                <div className="mt-2 max-sm:mt-1 pt-2 max-sm:pt-1 border-t border-primary/20">
                  <Badge className="bg-success/20 text-success border-success/30 max-sm:text-[10px] max-sm:h-5">
                    <Shield className="w-3 h-3 mr-1" />
                    Veteran: -${(veteranDiscount / 100).toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Features List — collapsed to single line on mobile */}
            {features && features.length > 0 && (
              <>
                <div className="space-y-2 hidden sm:block">
                  {features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground sm:hidden leading-snug">
                  <span className="font-medium text-foreground">Includes:</span>{" "}
                  {features.slice(0, 4).join(" · ")}
                </p>
              </>
            )}

            {/* Form Fields */}
            <div className="space-y-2.5 max-sm:space-y-1.5">
              <div>
                <Label htmlFor="email" className="max-sm:text-[11px]">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1 max-sm:mt-0.5 max-sm:h-9 max-sm:text-[13px]"
                />
              </div>

              <div>
                <Label htmlFor="name" className="max-sm:text-[11px]">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1 max-sm:mt-0.5 max-sm:h-9 max-sm:text-[13px]"
                />
              </div>

              {/* Veteran Discount Toggle */}
              <div className="flex items-center justify-between p-3 max-sm:py-1.5 max-sm:px-3 bg-muted/50 rounded-xl border max-sm:h-9">
                <div className="flex items-center gap-3 max-sm:gap-2">
                  <Shield className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-primary" />
                  <div>
                    <p className="text-sm max-sm:text-[11px] font-medium">Veteran Discount</p>
                    <p className="text-xs text-muted-foreground max-sm:hidden">
                      10% off for veterans & military
                    </p>
                  </div>
                </div>
                <Switch checked={isVeteran} onCheckedChange={setIsVeteran} className="max-sm:scale-90" />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 max-sm:gap-2 max-sm:items-center">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked === true)
                  }
                  className="mt-1 max-sm:mt-0"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm max-sm:text-[10px] max-sm:leading-[1.3] text-muted-foreground"
                >
                  I agree to the{" "}
                  <a href="/terms-of-service" className="text-primary hover:underline">
                    Terms
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
            <div className="bg-muted/50 rounded-lg px-3 py-2 max-sm:py-1.5 border">
              <div className="flex items-center justify-between">
                <span className="text-xs max-sm:text-[11px] text-muted-foreground">
                  Service Total
                </span>
                <span className="text-base max-sm:text-sm font-bold text-primary">
                  ${(finalAmount / 100).toFixed(2)}
                  {mode === "subscription" && (
                    <span className="text-sm max-sm:text-xs font-normal">/mo</span>
                  )}
                </span>
              </div>
              {isVeteran && (
                <Badge className="bg-success/20 text-success text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Veteran discount applied
                </Badge>
              )}
            </div>

            {/* Payment Method Tabs — QR hidden on mobile */}
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1 mb-2 h-9 max-sm:h-7">
                <TabsTrigger value="card" className="flex items-center gap-2 max-sm:text-[11px] max-sm:h-6">
                  <CreditCard className="w-4 h-4 max-sm:w-3 max-sm:h-3" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="qr" className="items-center gap-2 hidden sm:flex">
                  <Smartphone className="w-4 h-4" />
                  QR Code
                </TabsTrigger>
              </TabsList>

              {/* Card Payment Tab */}
              <TabsContent value="card" className="mt-0">
                <div className="bg-background rounded-lg p-3 max-sm:p-2 border">
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
                        {stripeError ||
                          "Please refresh the page and try again."}
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
                        onSuccess={(paymentIntentId) =>
                          finalizeSuccess({ paymentIntentId })
                        }
                        amount={finalAmount / 100}
                        email={email}
                        onBack={() => setStep("info")}
                        onOpenHostedCheckout={openHostedCheckoutPage}
                        hostedCheckoutLoading={hostedCheckoutLoading}
                        hostedCheckoutError={hostedCheckoutError}
                        hostedCheckoutUrl={hostedCheckoutUrl}
                        hostedCheckoutActive={hostedCheckoutActive}
                      />
                    </Elements>
                  )}
                </div>
              </TabsContent>

              {/* QR Code Payment Tab */}
              <TabsContent value="qr" className="mt-0">
                <div className="bg-background rounded-lg p-3 border">
                  <QRCodePaymentSection
                    amount={finalAmount}
                    productName={productName}
                    customerEmail={email}
                    customerName={name}
                    paymentType={mode === "subscription" ? "subscription" : "product"}
                    checkoutFactory={async () => {
                      const { data, error: fnError } = await supabase.functions.invoke(
                        "create-payment-intent",
                        {
                          body: {
                            priceId,
                            mode,
                            customerEmail: email,
                            customerName: name,
                            isVeteran,
                            metadata: {
                              productName,
                            },
                            checkoutMode: true,
                          },
                        },
                      );

                      if (fnError) {
                        throw new Error(fnError.message || "Unable to start hosted checkout.");
                      }

                      if (!data?.url || !data?.sessionId) {
                        throw new Error("Hosted checkout did not return a valid session.");
                      }

                      return {
                        url: data.url,
                        sessionId: data.sessionId,
                      };
                    }}
                    onSuccess={() => {
                      setStep("success");
                      toast.success("Payment successful!");
                      onSuccess?.();
                    }}
                    onBack={() => setStep("info")}
                  />
                </div>
              </TabsContent>
            </Tabs>

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
            <div className="w-14 h-14 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-7 h-7 text-success" />
              </motion.div>
            </div>

            <h3 className="text-lg font-bold mb-1">Payment Successful!</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Thank you for your{" "}
              {mode === "subscription" ? "subscription" : "purchase"}!
              <br />A confirmation email has been sent to {email}.
            </p>

            <div className="space-y-2">
              <div className="bg-success/10 text-success p-2.5 rounded-lg text-xs">
                <Sparkles className="w-4 h-4 mx-auto mb-1" />
                <p className="font-medium">
                  You now have access to {productName}
                </p>
              </div>

              <Button onClick={onClose} className="w-full h-9 text-sm" size="sm">
                Close
              </Button>
            </div>
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
  onOpenHostedCheckout,
  hostedCheckoutLoading,
  hostedCheckoutError,
  hostedCheckoutUrl,
  hostedCheckoutActive,
}: {
  onSuccess: (paymentIntentId?: string | null) => void;
  amount: number;
  email: string;
  onBack: () => void;
  onOpenHostedCheckout: () => Promise<void> | void;
  hostedCheckoutLoading: boolean;
  hostedCheckoutError: string | null;
  hostedCheckoutUrl: string | null;
  hostedCheckoutActive: boolean;
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
        onSuccess(paymentIntent?.id);
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
      <PaymentElementPanel
        isReady={isReady}
        timedOut={timedOut}
        onRetry={retry}
        onOpenHostedCheckout={onOpenHostedCheckout}
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
            paymentMethodOrder: ["card", "apple_pay", "google_pay"],
          }}
        />
      </PaymentElementPanel>

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

export function EmbeddedPaymentModal({
  open,
  onOpenChange,
  mode,
  priceId,
  productName,
  amount,
  description,
  features,
  onSuccess,
}: EmbeddedPaymentModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto border border-border/70 bg-transparent p-0 shadow-[0_28px_80px_rgba(15,23,42,0.24)] w-[calc(100vw-32px)] sm:w-full sm:max-w-4xl max-h-[85svh]">
        <CheckoutDialogFrame
          icon={<CreditCard className="h-5 w-5" />}
          title="Secure checkout"
          description={`Complete your ${mode === "subscription" ? "subscription" : "purchase"} with a polished, encrypted payment flow.`}
          badgeLabel="Encrypted by Stripe"
          aside={
            <CheckoutCard
              eyebrow="Order summary"
              title={productName}
              description={description || "Instant access after payment confirmation."}
            >
              <div className="space-y-3">
                <div className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {mode === "subscription" ? "Subscription" : "One-time purchase"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mode === "subscription" ? "Recurring access and support" : "Immediate payment confirmation"}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-[#b75539]">
                      ${(amount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {features && features.length > 0 ? (
                  <div className="space-y-2">
                    {features.slice(0, 4).map((feature, index) => (
                      <div key={`${feature}-${index}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b75539]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </CheckoutCard>
          }
          footer={
            <CheckoutTrustFooter>
              <Lock className="h-3.5 w-3.5" />
              Instant digital delivery where applicable. Secure encrypted payment across phone and desktop.
            </CheckoutTrustFooter>
          }
        >
          <PaymentForm
            mode={mode}
            priceId={priceId}
            productName={productName}
            amount={amount}
            description={description}
            features={features}
            onSuccess={onSuccess}
            onClose={handleClose}
          />
        </CheckoutDialogFrame>
      </DialogContent>
    </Dialog>
  );
}

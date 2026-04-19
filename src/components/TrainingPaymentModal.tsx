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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Phone,
  Sparkles,
  Smartphone,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { QRCodePaymentSection } from "@/components/payment/QRCodePaymentSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useStripeKey } from "@/hooks/useStripeKey";
import useStripeElementLifecycle from "@/hooks/useStripeElementLifecycle";
import useHostedCheckoutFallback from "@/hooks/useHostedCheckoutFallback";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { TermsCheckbox } from "@/components/payment/TermsCheckbox";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { PaymentElementPanel } from "@/components/payment/PaymentElementPanel";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { US_STATES, formatPhoneNumber } from "@/utils/formValidation";

interface TrainingPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceType: string;
  serviceTier?: string;
  basePrice: number; // in dollars
  features?: string[];
  duration?: string;
  onSuccess?: () => void;
}

function PaymentFormContent({
  clientSecret,
  onSuccess,
  onClose,
  customerEmail,
  customerName,
  serviceName,
  serviceTier,
  preferredDate,
  isVeteran,
  finalAmount,
  onOpenHostedCheckout,
  hostedCheckoutLoading,
  hostedCheckoutError,
  hostedCheckoutUrl,
  hostedCheckoutActive,
}: {
  clientSecret: string;
  onSuccess?: () => void;
  onClose: () => void;
  customerEmail: string;
  customerName: string;
  serviceName: string;
  serviceTier?: string;
  preferredDate?: string;
  isVeteran: boolean;
  finalAmount: number;
  onOpenHostedCheckout: () => Promise<void> | void;
  hostedCheckoutLoading: boolean;
  hostedCheckoutError: string | null;
  hostedCheckoutUrl: string | null;
  hostedCheckoutActive: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isReady, timedOut, mountKey, handleReady, retry } =
    useStripeElementLifecycle({
      enabled: true,
      resetKeys: [clientSecret],
      timeoutMs: 15000,
    });

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Payment submission failed");
        setIsProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/training?payment=success`,
            receipt_email: customerEmail,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        setError(confirmError.message || "Payment confirmation failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Call complete-payment to create booking and send email
        await supabase.functions.invoke("complete-payment", {
          body: {
            paymentType: "training",
            paymentIntentId: paymentIntent.id,
            customerEmail,
            customerName,
            amount: finalAmount * 100, // Convert to cents
            productName: serviceName,
            serviceTier,
            preferredDate,
            isVeteran,
          },
        });

        toast.success("Payment Confirmed! Check your email for details.");
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
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
        loadingLabel="Preparing secure training checkout..."
      >
        <PaymentElement
          key={mountKey}
          onReady={handleReady}
          options={{
            layout: "tabs",
          }}
        />
      </PaymentElementPanel>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!stripe || !isReady || isProcessing}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Pay ${finalAmount.toFixed(2)} Now
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <Shield className="w-4 h-4" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </div>
  );
}

export function TrainingPaymentModal({
  open,
  onOpenChange,
  serviceName,
  serviceType,
  serviceTier,
  basePrice,
  features = [],
  duration,
  onSuccess,
}: TrainingPaymentModalProps) {
  const {
    stripePromise,
    loading: stripeLoading,
    initializeStripe,
  } = useStripeKey();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
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
      try {
        await supabase.functions.invoke("complete-payment", {
          body: {
            paymentType: "training",
            paymentIntentId: paymentIntentId ?? undefined,
            sessionId: sessionId ?? undefined,
          },
        });
      } catch (err) {
        console.error("Training hosted checkout completion failed:", err);
      }

      toast.success("Payment Confirmed! Check your email for details.");
      onSuccess?.();
      handleClose();
    },
  });

  // Initialize Stripe when dialog opens
  useEffect(() => {
    if (open) {
      initializeStripe();
    }
  }, [open, initializeStripe]);


  // Calculate pricing with veteran discount
  const veteranDiscount = isVeteran ? basePrice * 0.1 : 0;
  const finalAmount = basePrice - veteranDiscount;

  const handleInfoSubmit = async () => {
    if (!email || !name) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Save for future auto-fill
      localStorage.setItem("checkout_email", email);
      localStorage.setItem("checkout_name", name);
      if (isVeteran) {
        localStorage.setItem("is_veteran", "true");
      }

      const { data, error: fnError } = await supabase.functions.invoke(
        "create-training-payment",
        {
          body: {
            serviceType,
            serviceName,
            serviceTier,
            amount: basePrice, // Send in dollars, function handles conversion
            customerEmail: email,
            customerName: name,
            isVeteran,
            preferredDate: selectedDate
              ? format(selectedDate, "PPP")
              : undefined,
            phone: phone ? formatPhoneNumber(phone) : undefined,
            state,
          },
        },
      );

      if (fnError) throw new Error(fnError.message);
      if (!data?.clientSecret) throw new Error("No client secret received");

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to initialize payment",
      );
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep("info");
    setClientSecret(null);
    setError(null);
    resetHostedCheckout();
    onOpenChange(false);
  };

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirmed" },
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[380px] overflow-hidden p-0 rounded-2xl gap-0">
        {/* Header — glass panel with coral accent */}
        <div className="bg-gradient-to-r from-[#d96c4a]/8 via-white to-[#d96c4a]/5 px-5 py-3.5 border-b border-gray-100">
          <DialogHeader className="space-y-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-[#d96c4a]/15 rounded-md text-[#d96c4a]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              {serviceTier && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0 h-[18px]">
                  {serviceTier}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-base font-bold leading-tight">
              {serviceName}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Complete the payment for {serviceName} training
            </DialogDescription>
            {duration && (
              <p className="text-[11px] text-gray-400 mt-0.5">{duration}</p>
            )}
          </DialogHeader>

          {/* Step Indicator — small */}
          <div className="flex items-center justify-between mt-2.5 max-w-[220px]">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-colors ${
                    (step === "info" && s.num === 1) ||
                    (step === "payment" && s.num <= 2) ||
                    (step === "success" && s.num <= 3)
                      ? "bg-[#d96c4a] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {(step === "payment" && s.num === 1) ||
                  (step === "success" && s.num <= 2) ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`ml-1.5 text-[10px] font-medium hidden sm:block ${
                    (step === "info" && s.num === 1) ||
                    (step === "payment" && s.num <= 2) ||
                    step === "success"
                      ? "text-[#d96c4a]"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-5 sm:w-8 h-0.5 mx-1.5 ${
                      (step === "payment" && s.num === 1) ||
                      (step === "success" && s.num <= 2)
                        ? "bg-[#d96c4a]"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2.5"
              >
                {/* Features — compact glass panel */}
                {features.length > 0 && (
                  <div className="px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <h4 className="font-bold mb-2 text-[10px] uppercase tracking-widest text-gray-400">
                      What's Included
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {features.slice(0, 4).map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-gray-700"
                        >
                          <CheckCircle className="w-3 h-3 text-[#d96c4a] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info — glass inputs */}
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#d96c4a]"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#d96c4a]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <Input
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-9 pl-8 text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#d96c4a]"
                      />
                    </div>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="h-9 text-sm bg-white border-gray-200 text-gray-900">
                        <SelectValue placeholder="State" className="text-gray-400" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preferred Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-8 justify-start text-left font-normal text-sm",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Preferred date (optional)"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-background"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Veteran Discount */}
                <QuickVeteranToggle
                  isVeteran={isVeteran}
                  onVeteranChange={setIsVeteran}
                  discountPercent={10}
                />

                {/* Terms */}
                <TermsCheckbox
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                />

                {/* Price Summary — glass total bar */}
                <div className="px-3.5 py-2.5 bg-gray-50 rounded-xl border border-[#d96c4a]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</span>
                    <div className="text-right flex items-baseline gap-2">
                      {isVeteran && (
                        <span className="text-xs line-through text-gray-400">
                          ${basePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-[#d96c4a] leading-none">
                        ${finalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {isVeteran && (
                    <div className="text-right mt-0.5">
                      <Badge
                        variant="outline"
                        className="text-[9px] text-emerald-400 border-emerald-500/50 px-1.5 py-0 h-[16px] bg-emerald-500/10"
                      >
                        Veteran: -${veteranDiscount.toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleInfoSubmit}
                  disabled={!email || !name || !termsAccepted || isLoading}
                  className="w-full h-9 text-sm font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Preparing Payment...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>

                <TrustIndicators compact />
              </motion.div>
            )}

            {step === "payment" && clientSecret && stripePromise && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-2.5"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("info")}
                  className="h-7 text-xs px-2"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back
                </Button>

                <div className="px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{serviceName}</p>
                      <p className="text-[11px] text-gray-500 truncate">{email}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-base font-bold text-[#d96c4a] leading-none">
                        ${finalAmount.toFixed(2)}
                      </p>
                      {isVeteran && (
                        <Badge
                          variant="outline"
                          className="text-[9px] text-emerald-400 border-emerald-500/50 mt-0.5 px-1 py-0 h-[14px] bg-emerald-500/10"
                        >
                          10% Veteran
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-2 h-8">
                    <TabsTrigger
                      value="card"
                      className="flex items-center gap-1.5 text-xs h-6"
                    >
                      <CreditCard className="w-3 h-3" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="flex items-center gap-1.5 text-xs h-6">
                      <Smartphone className="w-3 h-3" />
                      QR Code
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card">
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            // Coral to match site primary (was purple #6D28D9)
                            colorPrimary: "#d96c4a",
                            fontSizeBase: "14px",
                            spacingUnit: "3px",
                            borderRadius: "8px",
                          },
                        },
                      }}
                    >
                      <PaymentFormContent
                        clientSecret={clientSecret}
                        onSuccess={onSuccess}
                        onClose={handleClose}
                        customerEmail={email}
                        customerName={name}
                        serviceName={serviceName}
                        serviceTier={serviceTier}
                        preferredDate={
                          selectedDate ? format(selectedDate, "PPP") : undefined
                        }
                        isVeteran={isVeteran}
                        finalAmount={finalAmount}
                        onOpenHostedCheckout={async () => {
                          await openHostedCheckout(async () => {
                            const { data, error: fnError } = await supabase.functions.invoke(
                              "create-training-payment",
                              {
                                body: {
                                  courseSlug: serviceType,
                                  serviceTier,
                                  customerEmail: email,
                                  customerName: name,
                                  isVeteran,
                                  preferredDate: selectedDate
                                    ? format(selectedDate, "PPP")
                                    : undefined,
                                  phone: phone ? formatPhoneNumber(phone) : undefined,
                                  state,
                                  checkoutMode: true,
                                },
                              },
                            );

                            if (fnError) {
                              throw new Error(
                                fnError.message ||
                                  "Unable to open hosted training checkout.",
                              );
                            }

                            if (!data?.url || !data?.sessionId) {
                              throw new Error(
                                "Hosted training checkout did not return a valid session.",
                              );
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
                      />
                    </Elements>
                  </TabsContent>

                  <TabsContent value="qr">
                    <QRCodePaymentSection
                      amount={Math.round(finalAmount * 100)}
                      productName={serviceName}
                      customerEmail={email}
                      customerName={name}
                      paymentType="training"
                      checkoutFactory={async () => {
                        const { data, error: fnError } = await supabase.functions.invoke(
                          "create-training-payment",
                          {
                            body: {
                              courseSlug: serviceType,
                              serviceTier,
                              customerEmail: email,
                              customerName: name,
                              isVeteran,
                              preferredDate: selectedDate
                                ? format(selectedDate, "PPP")
                                : undefined,
                              phone: phone ? formatPhoneNumber(phone) : undefined,
                              state,
                              checkoutMode: true,
                            },
                          },
                        );

                        if (fnError) {
                          throw new Error(
                            fnError.message ||
                              "Unable to open hosted training checkout.",
                          );
                        }

                        if (!data?.url || !data?.sessionId) {
                          throw new Error(
                            "Hosted training checkout did not return a valid session.",
                          );
                        }

                        return {
                          url: data.url,
                          sessionId: data.sessionId,
                        };
                      }}
                      onSuccess={() => {
                        toast.success(
                          "Payment Confirmed! Check your email for booking details.",
                        );
                        onSuccess?.();
                        handleClose();
                      }}
                      onBack={() => setStep("info")}
                    />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrainingPaymentModal;

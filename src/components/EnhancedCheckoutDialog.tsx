import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Loader2,
  CreditCard,
  Smartphone,
  Shield,
  Lock,
  CheckCircle,
  Package,
  ChevronRight,
  Zap,
  RefreshCw,
  Mail,
  User,
  PartyPopper,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { motion, AnimatePresence } from "framer-motion";
import { useCartFeedback } from "@/contexts/CartFeedbackContext";
import { useStripeKey } from "@/hooks/useStripeKey";
import { useConfetti } from "@/hooks/useConfetti";

interface EnhancedCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// QR Code Payment Component
function QRCodePayment({
  total,
  onSuccess,
}: {
  total: number;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(240);
  const { items } = useCart();

  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQrCodeUrl(null);
    }
  }, [qrCodeUrl, timeLeft]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-payment-link",
        {
          body: {
            amount: Math.round(total * 100),
            items: items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      );

      if (error) throw error;

      if (data?.url) {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url)}`;
        setQrCodeUrl(qrUrl);
        setTimeLeft(240);
      }
    } catch (error: any) {
      toast.error("Failed to generate QR code");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center space-y-5 py-4">
      {!qrCodeUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-muted/50 rounded-xl">
            <Smartphone className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold mb-2">Pay with Your Phone</h4>
            <p className="text-sm text-muted-foreground">
              Scan a QR code to pay with Apple Pay, Google Pay, or any mobile
              wallet
            </p>
          </div>
          <Button
            onClick={generateQRCode}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Smartphone className="mr-2 h-5 w-5" />
            )}
            Generate QR Code
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="bg-white p-4 rounded-xl inline-block">
            <img
              src={qrCodeUrl}
              alt="Payment QR Code — scan with your phone to complete payment"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant={timeLeft < 60 ? "destructive" : "secondary"}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Expires in {formatTime(timeLeft)}
            </Badge>
          </div>
          <p className="text-sm text-white/70">
            Scan to pay{" "}
            <strong className="text-white font-bold">${total.toFixed(2)}</strong>
          </p>
          <Button variant="outline" onClick={generateQRCode} size="sm">
            Generate New Code
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Card Payment Form with PaymentElement
function CardPaymentForm({
  onSuccess,
  clientSecret,
  isVeteran,
  customerEmail,
  items,
}: {
  onSuccess: () => void;
  clientSecret: string;
  isVeteran: boolean;
  customerEmail: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    isDigital?: boolean;
  }>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const { triggerThankYou } = useCartFeedback();
  const { fireCelebration } = useConfetti();
  const [loading, setLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Timeout for PaymentElement loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!elementReady) {
        setLoadingTimeout(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [elementReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    try {
      // Submit the payment element first
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(submitError.message);
        setLoading(false);
        return;
      }

      // Confirm the payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
          },
          redirect: "if_required",
        });

      if (confirmError) {
        toast.error(confirmError.message);
        setLoading(false);
        return;
      }

      // ====================================================================
      // Phase 4.12 — close the cart digital delivery hand-off.
      //
      // create-cart-payment-intent inserts a partner_orders row BEFORE
      // creating the PaymentIntent and stamps the order_id (UUID) onto
      // PaymentIntent.metadata.order_id. After Stripe Elements confirms
      // the payment client-side, we ping verify-payment with the
      // payment_intent_id so it can:
      //   1. Re-verify with Stripe that the PI actually succeeded.
      //   2. Mark the partner_orders row paid + backfill customer details.
      //   3. If hasDigital === "true", invoke send-digital-download with
      //      the partner_orders.id so the customer gets their files.
      //
      // We never block the success UX on this — verify-payment is also
      // idempotent and safe to retry, and a Stripe webhook would catch
      // the missed delivery on a slower path. But the happy path is
      // "hit verify-payment immediately" so customers get their digital
      // products within seconds of confirming payment.
      // ====================================================================
      if (paymentIntent?.id) {
        try {
          await supabase.functions.invoke("verify-payment", {
            body: { payment_intent_id: paymentIntent.id },
          });
        } catch (verifyError) {
          // Don't block the success UI — the order is paid and the
          // server has the data it needs to retry delivery later.
          console.error(
            "verify-payment hand-off failed (non-blocking):",
            verifyError,
          );
        }
      }

      fireCelebration();
      toast.success("Payment successful!");
      clearCart("purchase");
      triggerThankYou();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTimeout) {
    return (
      <div className="text-center p-6 space-y-4">
        <div className="text-destructive">
          <Lock className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="font-medium">Payment form failed to load</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please refresh the page or try again later.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border border-white/10 rounded-xl p-3 bg-white/[0.04] min-h-[180px]">
        {!elementReady && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading payment form...
            </span>
          </div>
        )}
        <div className={elementReady ? "block" : "hidden"}>
          <PaymentElement
            onReady={() => setElementReady(true)}
            options={{
              layout: "tabs",
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading || !elementReady}
        className="w-full h-10 text-[14px] font-semibold bg-gradient-to-b from-orange-600 to-orange-700 text-white rounded-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Complete Payment
          </>
        )}
      </Button>
    </form>
  );
}

// Wrapper to handle Stripe Elements initialization
function CardPaymentWrapper({
  total,
  onSuccess,
  isVeteran,
  formData,
  setFormData,
}: {
  total: number;
  onSuccess: () => void;
  isVeteran: boolean;
  formData: { name: string; email: string };
  setFormData: (data: { name: string; email: string }) => void;
}) {
  const { items } = useCart();
  const {
    stripePromise,
    loading: stripeLoading,
    error: stripeError,
    initializeStripe,
  } = useStripeKey();
  const [step, setStep] = useState<"contact" | "payment">("contact");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize Stripe when component mounts (dialog opens)
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("checkout_email");
    const savedName = localStorage.getItem("checkout_name");
    if (savedEmail) setFormData({ ...formData, email: savedEmail });
    if (savedName) setFormData({ ...formData, name: savedName });
  }, []);

  const handleContinue = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }

    // Save for auto-fill
    localStorage.setItem("checkout_email", formData.email);
    localStorage.setItem("checkout_name", formData.name);

    setLoading(true);
    try {
      // Calculate total with veteran discount
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const discount = isVeteran ? subtotal * 0.1 : 0;
      const finalAmount = Math.round((subtotal - discount) * 100); // Convert to cents

      // Create payment intent via edge function using raw amount
      const { data, error } = await supabase.functions.invoke(
        "create-cart-payment-intent",
        {
          body: {
            amount: finalAmount,
            customerEmail: formData.email,
            customerName: formData.name,
            isVeteran,
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              price: i.price,
              quantity: i.quantity,
            })),
            metadata: {
              source: "cart_checkout",
            },
          },
        },
      );

      if (error) throw error;

      if (!data?.clientSecret) {
        throw new Error("Failed to get payment client secret");
      }

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast.error(error.message || "Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {step === "contact" && (
        <motion.div
          key="contact"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-[14px] font-semibold text-white">Contact Information</h3>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <Input
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="pl-9 h-9"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <Input
              type="email"
              placeholder="Email * (for receipt)"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="pl-9 h-9"
              required
            />
          </div>

          <Button
            type="button"
            onClick={handleContinue}
            disabled={!formData.name || !formData.email || loading}
            className="w-full h-10 bg-gradient-to-b from-orange-600 to-orange-700 text-white text-[14px] font-semibold rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              <>
                Continue to Payment
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      )}

      {step === "payment" && clientSecret && (
        <motion.div
          key="payment"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setStep("contact")}
              className="text-[13px] text-orange-400 hover:underline"
            >
              ← Back
            </button>
            <div className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center font-bold ml-auto">
              2
            </div>
            <h3 className="text-[14px] font-semibold text-white">Payment</h3>
          </div>

          <div className="p-2.5 bg-white/[0.04] rounded-lg text-[13px] flex items-center gap-2 text-white/70 border border-white/8">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Paying as <strong className="text-white">{formData.email}</strong>
            </span>
          </div>

          {stripeLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">
                Initializing payment...
              </span>
            </div>
          ) : stripePromise && !stripeError ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    borderRadius: "8px",
                  },
                },
              }}
            >
              <CardPaymentForm
                onSuccess={onSuccess}
                clientSecret={clientSecret}
                isVeteran={isVeteran}
                customerEmail={formData.email}
                items={items}
              />
            </Elements>
          ) : (
            <div className="text-center p-6 space-y-3">
              <Lock className="w-10 h-10 mx-auto text-destructive opacity-50" />
              <p className="text-destructive font-medium">
                Payment system unavailable
              </p>
              <p className="text-sm text-muted-foreground">
                {stripeError || "Please contact support for assistance."}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EnhancedCheckoutDialog({
  open,
  onOpenChange,
}: EnhancedCheckoutDialogProps) {
  const { items, total } = useCart();
  const [isVeteran, setIsVeteran] = useState(false);
  const veteranDiscount = isVeteran ? total * 0.1 : 0;
  const finalTotal = total - veteranDiscount;
  const [paymentMethod, setPaymentMethod] = useState<"card" | "qr">("card");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const hasDigitalItems = items.some((item) => item.isDigital);
  const hasPhysicalItems = items.some((item) => !item.isDigital);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] overflow-hidden p-0 gap-0" style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textRendering: "optimizeLegibility" }}>
        {/* Header */}
        <div className="px-3 sm:px-5 py-2.5 border-b border-white/8">
          <DialogHeader className="space-y-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="p-1.5 bg-orange-500/15 rounded-md">
                <Package className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <Badge variant="secondary" className="text-[10px] px-2 py-0 h-[18px]">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            </div>
            <DialogTitle className="text-[13px] font-semibold leading-tight">Secure Checkout</DialogTitle>
          </DialogHeader>

          {/* Delivery Info */}
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            {hasDigitalItems && (
              <Badge variant="outline" className="gap-1 text-xs">
                <Zap className="w-3 h-3" />
                Instant digital delivery
              </Badge>
            )}
            {hasPhysicalItems && (
              <Badge variant="outline" className="gap-1 text-xs">
                <Package className="w-3 h-3" />
                Ships in 2-3 days
              </Badge>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-5 grid md:grid-cols-5 gap-3 sm:gap-4">
          {/* Main Form */}
          <div className="md:col-span-3">
            <Tabs
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as "card" | "qr")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="qr" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Pay
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <CardPaymentWrapper
                  total={finalTotal}
                  onSuccess={() => onOpenChange(false)}
                  isVeteran={isVeteran}
                  formData={formData}
                  setFormData={setFormData}
                />
              </TabsContent>

              <TabsContent value="qr">
                <QRCodePayment
                  total={finalTotal}
                  onSuccess={() => onOpenChange(false)}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary Sidebar - Compact */}
          <div className="md:col-span-2">
            <div className="space-y-3">
              <div className="p-3 bg-white/[0.04] rounded-xl border border-white/8">
                <h4 className="font-semibold text-sm mb-2 text-white">Order Summary</h4>
                <div className="space-y-1 mb-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-white/60 truncate max-w-[120px]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-xs text-white/50">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <QuickVeteranToggle
                  isVeteran={isVeteran}
                  onVeteranChange={setIsVeteran}
                  discountPercent={10}
                />

                <div className="border-t border-white/8 pt-2 mt-2">
                  {veteranDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400 mb-1">
                      <span>Veteran Discount</span>
                      <span>-${veteranDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-white">
                    <span>Total</span>
                    <span className="text-orange-400">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <TrustIndicators compact />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

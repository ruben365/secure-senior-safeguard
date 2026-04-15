import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, CreditCard, FileText, Loader2, AlertCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { useStripeKey } from "@/hooks/useStripeKey";
import useStripePayment from "@/hooks/useStripePayment";
import useStripeElementLifecycle from "@/hooks/useStripeElementLifecycle";
import useHostedCheckoutFallback from "@/hooks/useHostedCheckoutFallback";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatFileSize, getFileTypeLabel } from "@/lib/guestScannerUtils";
import { toast } from "@/components/ui/sonner";
import { CheckoutCard, CheckoutDialogFrame, CheckoutTrustFooter } from "@/components/payment/CheckoutFrame";
import { PaymentElementPanel } from "@/components/payment/PaymentElementPanel";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  amount: number;
  onPaymentSuccess: (payload: {
    scanId: string;
    filePath: string;
    paymentIntentId: string;
  }) => void;
}

interface GuestPaymentFormProps {
  amount: number;
  disabled: boolean;
  elementResetKey: string;
  onSuccess: (paymentIntentId: string) => void;
  onOpenHostedCheckout: () => Promise<void> | void;
  hostedCheckoutLoading: boolean;
  hostedCheckoutError: string | null;
  hostedCheckoutUrl: string | null;
  hostedCheckoutActive: boolean;
}

const GuestPaymentForm = ({
  amount,
  disabled,
  elementResetKey,
  onSuccess,
  onOpenHostedCheckout,
  hostedCheckoutLoading,
  hostedCheckoutError,
  hostedCheckoutUrl,
  hostedCheckoutActive,
}: GuestPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const { isReady, timedOut, mountKey, handleReady, retry } =
    useStripeElementLifecycle({
      enabled: true,
      resetKeys: [elementResetKey],
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || disabled) return;

    setProcessing(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/training/ai-analysis#guest-scanner`,
          },
          redirect: "if_required",
        });

      if (confirmError) throw confirmError;

      if (
        paymentIntent?.status === "succeeded" ||
        paymentIntent?.status === "processing"
      ) {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      toast.error(err?.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElementPanel
        isReady={isReady}
        timedOut={timedOut}
        onRetry={retry}
        onOpenHostedCheckout={onOpenHostedCheckout}
        hostedCheckoutLoading={hostedCheckoutLoading}
        hostedCheckoutError={hostedCheckoutError}
        hostedCheckoutUrl={hostedCheckoutUrl}
        hostedCheckoutActive={hostedCheckoutActive}
        loadingLabel="Preparing secure scan payment..."
        timeoutDescription="Retry the embedded card form or open the secure checkout page if this phone or browser prefers hosted payment."
      >
        <PaymentElement
          key={mountKey}
          onReady={handleReady}
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card"],
          }}
        />
      </PaymentElementPanel>
      <Button
        type="submit"
        size="lg"
        className="w-full text-white"
        disabled={!stripe || !elements || processing || disabled || !isReady}
      >
        {processing ? (
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
    </form>
  );
};

export const PaymentDialog = ({
  open,
  onOpenChange,
  file,
  amount,
  onPaymentSuccess,
}: PaymentDialogProps) => {
  const {
    stripePromise,
    loading: stripeLoading,
    error: stripeError,
    initializeStripe,
  } = useStripeKey();
  const {
    createGuestScanPayment,
    createGuestScanCheckout,
    loading: paymentLoading,
    error: paymentError,
  } = useStripePayment();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [serverAmount, setServerAmount] = useState<number | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  const fileMeta = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      size: formatFileSize(file.size).formatted,
      type: getFileTypeLabel(file),
    };
  }, [file]);

  // Count retries so a clicking Retry re-triggers the effect without
  // closing/reopening the dialog.
  const [retryTick, setRetryTick] = useState(0);

  const {
    hostedCheckoutActive,
    hostedCheckoutError,
    hostedCheckoutLoading,
    hostedCheckoutUrl,
    openHostedCheckout,
    resetHostedCheckout,
  } = useHostedCheckoutFallback<{
    scanId: string;
    filePath: string;
  }>({
    onPaid: async (result) => {
      const activeScanId = result.meta?.scanId ?? scanId;
      const activeFilePath = result.meta?.filePath ?? filePath;
      const referenceId = result.paymentIntentId || result.sessionId || paymentIntentId;

      if (!activeScanId || !activeFilePath || !referenceId) {
        throw new Error("Hosted payment finished, but the scan could not be restored.");
      }

      onPaymentSuccess({
        scanId: activeScanId,
        filePath: activeFilePath,
        paymentIntentId: referenceId,
      });
    },
  });

  useEffect(() => {
    if (!open || !file) return;
    let isMounted = true;

    const initPayment = async () => {
      initializeStripe();
      try {
        const data = await createGuestScanPayment(file);
        if (!isMounted) return;
        setClientSecret(data.clientSecret);
        setScanId(data.scanId);
        setFilePath(data.filePath);
        setPaymentIntentId(data.paymentIntentId);
        setServerAmount(data.amount ?? null);
      } catch (err: any) {
        // Don't fire a toast — the in-dialog error panel is clearer.
        // The hook already writes the real server message into paymentError.
        if (!isMounted) return;
      }
    };

    initPayment();

    return () => {
      isMounted = false;
    };
  }, [createGuestScanPayment, file, initializeStripe, open, retryTick]);

  useEffect(() => {
    if (!open) {
      setClientSecret(null);
      setScanId(null);
      setFilePath(null);
      setPaymentIntentId(null);
      setServerAmount(null);
      setAcknowledged(false);
      resetHostedCheckout();
    }
  }, [open, resetHostedCheckout]);

  const displayAmount = serverAmount ?? amount;

  const handleSuccess = (confirmedPaymentIntentId: string) => {
    if (!scanId || !filePath || !paymentIntentId) return;
    onPaymentSuccess({
      scanId,
      filePath,
      paymentIntentId: confirmedPaymentIntentId || paymentIntentId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border border-border/70 bg-transparent p-0 shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:max-w-3xl">
        <CheckoutDialogFrame
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Secure upload checkout"
          description="Pay once for this upload. After payment, your file is analyzed immediately and then deleted from the scanner."
          badgeLabel="Encrypted by Stripe"
          aside={
            file && fileMeta ? (
              <>
                <CheckoutCard
                  eyebrow="Order summary"
                  title="1 secure scan"
                  description="One file, screenshot, or supported upload counts as one paid scan."
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/35 px-3 py-3">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#d96c4a]/12 text-[#b75539]">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {fileMeta.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {fileMeta.type} · {fileMeta.size}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-white/80 px-4 py-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total due</span>
                        <span className="text-xl font-semibold text-[#b75539]">
                          ${displayAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CheckoutCard>

                <CheckoutCard
                  title="Privacy and deletion"
                  description="Your file is analyzed once and permanently deleted from our guest scanner within 10 minutes."
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="delete-ack"
                      checked={acknowledged}
                      onCheckedChange={(checked) =>
                        setAcknowledged(checked === true)
                      }
                    />
                    <Label
                      htmlFor="delete-ack"
                      className="text-sm leading-relaxed text-foreground"
                    >
                      I understand my upload will be deleted after analysis.
                    </Label>
                  </div>
                </CheckoutCard>
              </>
            ) : null
          }
          footer={
            <CheckoutTrustFooter>
              <Lock className="h-3.5 w-3.5" />
              Secure and encrypted payment. Scan access stays tied to this upload.
            </CheckoutTrustFooter>
          }
        >
          {!file || !fileMeta ? (
            <CheckoutCard
              title="No file selected"
              description="Choose a file before starting payment."
            >
              <p className="text-sm text-muted-foreground">
                Select a file to continue.
              </p>
            </CheckoutCard>
          ) : (
            <>
              {(stripeError || paymentError) && !paymentLoading && !stripeLoading ? (
                <CheckoutCard className="border-destructive/25 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-destructive">
                        Unable to start payment
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-destructive/85 break-words">
                        {paymentError || stripeError}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-destructive/35 text-destructive hover:bg-destructive/10"
                      onClick={() => setRetryTick((n) => n + 1)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Try again
                    </Button>
                  </div>
                </CheckoutCard>
              ) : null}

              {(stripeLoading || paymentLoading) && !stripeError && !paymentError ? (
                <CheckoutCard title="Preparing checkout" description="Loading the secure payment tools for this upload.">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing secure payment form...
                  </div>
                </CheckoutCard>
              ) : null}

              {stripePromise &&
                clientSecret &&
                !stripeLoading &&
                !paymentLoading &&
                !stripeError &&
                !paymentError && (
                  <CheckoutCard
                    eyebrow="Payment details"
                    title="Card checkout"
                    description="Use the embedded form below, or switch to the hosted checkout page if your device has trouble loading embedded fields."
                  >
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#d96c4a",
                            fontSizeBase: "14px",
                            spacingUnit: "3px",
                            borderRadius: "12px",
                          },
                        },
                      }}
                    >
                      <GuestPaymentForm
                        amount={displayAmount}
                        disabled={!acknowledged}
                        elementResetKey={clientSecret}
                        onSuccess={handleSuccess}
                        onOpenHostedCheckout={async () => {
                          if (!file) return;
                          await openHostedCheckout(async () => {
                            const result = await createGuestScanCheckout(file);
                            return {
                              url: result.checkoutUrl,
                              sessionId: result.sessionId,
                              meta: {
                                scanId: result.scanId,
                                filePath: result.filePath,
                              },
                            };
                          });
                        }}
                        hostedCheckoutLoading={hostedCheckoutLoading}
                        hostedCheckoutError={hostedCheckoutError}
                        hostedCheckoutUrl={hostedCheckoutUrl}
                        hostedCheckoutActive={hostedCheckoutActive}
                      />
                    </Elements>
                  </CheckoutCard>
                )}
            </>
          )}
        </CheckoutDialogFrame>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;

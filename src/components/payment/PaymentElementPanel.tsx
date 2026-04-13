import type { ReactNode } from "react";
import { AlertCircle, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaymentElementPanelProps {
  isReady: boolean;
  timedOut: boolean;
  onRetry: () => void;
  onOpenHostedCheckout?: () => void | Promise<void>;
  hostedCheckoutLoading?: boolean;
  hostedCheckoutError?: string | null;
  hostedCheckoutUrl?: string | null;
  hostedCheckoutActive?: boolean;
  loadingLabel?: string;
  timeoutTitle?: string;
  timeoutDescription?: string;
  retryLabel?: string;
  hostedCheckoutLabel?: string;
  hostedCheckoutNotice?: string;
  className?: string;
  children: ReactNode;
}

export function PaymentElementPanel({
  isReady,
  timedOut,
  onRetry,
  onOpenHostedCheckout,
  hostedCheckoutLoading = false,
  hostedCheckoutError = null,
  hostedCheckoutUrl = null,
  hostedCheckoutActive = false,
  loadingLabel = "Preparing secure payment form...",
  timeoutTitle = "Payment form failed to load",
  timeoutDescription = "Retry the embedded form or use the secure checkout page if this device prefers hosted payment.",
  retryLabel = "Retry payment form",
  hostedCheckoutLabel = "Open secure checkout page",
  hostedCheckoutNotice = "The secure checkout page opened in a separate tab. Finish payment there and this screen will update automatically.",
  className,
  children,
}: PaymentElementPanelProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="rounded-[22px] border border-border/70 bg-white/96 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        {timedOut ? (
          <div className="space-y-3 rounded-[18px] border border-[#d96c4a]/18 bg-[#fff7f4] p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-[#d96c4a]/10 text-[#b75539]">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {timeoutTitle}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {timeoutDescription}
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={onRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {retryLabel}
              </Button>
              {onOpenHostedCheckout ? (
                <Button
                  type="button"
                  onClick={() => {
                    void onOpenHostedCheckout();
                  }}
                  disabled={hostedCheckoutLoading}
                  className="text-white"
                >
                  {hostedCheckoutLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  {hostedCheckoutLabel}
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="relative min-h-[190px]">
            {!isReady ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-[18px] bg-white/92 text-sm text-muted-foreground backdrop-blur-sm">
                <Loader2 className="h-5 w-5 animate-spin text-[#d96c4a]" />
                {loadingLabel}
              </div>
            ) : null}
            <div
              className={cn(
                "transition-opacity duration-200",
                isReady ? "opacity-100" : "pointer-events-none opacity-[0.02]",
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>

      {hostedCheckoutError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {hostedCheckoutError}
        </div>
      ) : null}

      {hostedCheckoutActive ? (
        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700">
          <p className="font-medium">Hosted checkout ready</p>
          <p className="mt-1 leading-relaxed text-emerald-700/85">
            {hostedCheckoutNotice}
          </p>
          {hostedCheckoutUrl ? (
            <a
              href={hostedCheckoutUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-medium text-[#b75539] hover:underline"
            >
              Open checkout page
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

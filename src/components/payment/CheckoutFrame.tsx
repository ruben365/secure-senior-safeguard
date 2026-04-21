import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface CheckoutDialogFrameProps {
  icon: ReactNode;
  title: string;
  description: string;
  badgeLabel?: string;
  badgeTone?: "default" | "outline" | "secondary";
  children: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function CheckoutDialogFrame({
  icon,
  title,
  description,
  badgeLabel = "Secure checkout",
  badgeTone = "outline",
  children,
  aside,
  footer,
  className,
  bodyClassName,
}: CheckoutDialogFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,246,242,0.98))]",
        className,
      )}
    >
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(217,108,74,0.14),transparent_62%)]" />

      <div className="relative border-b border-border/60 px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d96c4a]/15 bg-[#d96c4a]/10 text-[#b75539] shadow-sm">
              {icon}
            </div>
            <div className="min-w-0 space-y-1">
              <h2 className="text-[1.4rem] font-semibold leading-tight tracking-tight text-foreground sm:text-[1.55rem]">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          {badgeLabel ? (
            <Badge
              variant={badgeTone}
              className="h-8 flex-shrink-0 rounded-full border-[#d96c4a]/20 bg-white/70 px-3 text-[11px] font-medium text-[#8e462f] shadow-sm"
            >
              {badgeLabel}
            </Badge>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          "relative max-h-[calc(90svh-108px)] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5",
          bodyClassName,
        )}
      >
        {aside ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(260px,0.88fr)] lg:items-start">
            <div className="min-w-0 space-y-4">{children}</div>
            <aside className="min-w-0 space-y-4">{aside}</aside>
          </div>
        ) : (
          <div className="space-y-4">{children}</div>
        )}
      </div>

      {footer ? (
        <div className="relative border-t border-border/60 bg-white/75 px-5 py-3 text-xs text-muted-foreground sm:px-6">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

interface CheckoutCardProps {
  title?: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function CheckoutCard({
  title,
  description,
  eyebrow,
  action,
  children,
  className,
}: CheckoutCardProps) {
  return (
    <section
      className={cn(
        "pay-card p-4 sm:p-5",
        className,
      )}
    >
      {title || description || eyebrow || action ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b75539]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h3 className="text-base font-semibold leading-tight text-foreground">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function CheckoutTrustFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

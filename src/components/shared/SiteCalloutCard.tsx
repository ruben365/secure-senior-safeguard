import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SiteCalloutTone = "brand" | "neutral";
type SiteCalloutAlign = "left" | "center";

interface SiteCalloutCardProps {
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  iconClassName?: string;
  align?: SiteCalloutAlign;
  tone?: SiteCalloutTone;
}

const toneStyles: Record<
  SiteCalloutTone,
  {
    shell: string;
    accent: string;
    glow: string;
    eyebrow: string;
    icon: string;
  }
> = {
  brand: {
    shell:
      "ui-premium-panel--soft border-primary/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,247,242,0.82))]",
    accent: "from-primary/60 via-accent/45 to-transparent",
    glow: "bg-primary/14",
    eyebrow: "border-primary/12 bg-white/72 text-primary",
    icon:
      "bg-gradient-to-br from-primary to-accent text-white shadow-[0_18px_34px_-22px_hsl(var(--primary)/0.7)]",
  },
  neutral: {
    shell:
      "ui-premium-panel--soft border-border/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,249,252,0.8))]",
    accent: "from-[hsl(var(--foreground)/0.18)] via-primary/20 to-transparent",
    glow: "bg-slate-900/10",
    eyebrow: "border-border/50 bg-white/72 text-muted-foreground",
    icon:
      "bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)]",
  },
};

export function SiteCalloutCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  contentClassName,
  iconClassName,
  align = "left",
  tone = "brand",
}: SiteCalloutCardProps) {
  const isCentered = align === "center";
  const styles = toneStyles[tone];

  return (
    <div
      className={cn(
        "ui-premium-panel relative isolate overflow-hidden rounded-[30px] md:rounded-[34px] border backdrop-blur-xl",
        styles.shell,
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r",
          styles.accent,
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl",
          styles.glow,
        )}
      />

      <div
        className={cn(
          "relative z-10 p-5 sm:p-6 md:p-8",
          isCentered && "text-center",
          contentClassName,
        )}
      >
        {(eyebrow || Icon || title) && (
          <div
            className={cn(
              "mb-5 flex gap-4",
              isCentered ? "flex-col items-center" : "items-start",
            )}
          >
            {Icon && (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  styles.icon,
                  iconClassName,
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}

            <div className={cn("space-y-2", isCentered && "max-w-2xl")}>
              {eyebrow && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em]",
                    styles.eyebrow,
                  )}
                >
                  {eyebrow}
                </span>
              )}

              {title && (
                <h3 className="text-[1.65rem] font-black tracking-tight text-foreground md:text-[1.78rem]">
                  {title}
                </h3>
              )}
            </div>
          </div>
        )}

        {description && (
          <div className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
            {description}
          </div>
        )}

        {children && <div className="mt-5">{children}</div>}

        {action && (
          <div
            className={cn(
              "mt-6 flex flex-wrap gap-3",
              isCentered ? "justify-center" : "justify-start",
            )}
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

export default SiteCalloutCard;

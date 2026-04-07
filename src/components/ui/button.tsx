import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none relative overflow-hidden tracking-wide transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-primary to-primary/85 text-white",
          "border border-primary/60",
          "shadow-[0_2px_0_0_hsl(var(--primary)/0.5),0_4px_12px_-2px_hsl(var(--primary)/0.3),inset_0_1px_0_0_hsl(0_0%_100%/0.25),inset_0_-2px_0_0_hsl(0_0%_0%/0.15)]",
          "hover:translate-y-[-1px] hover:shadow-[0_3px_0_0_hsl(var(--primary)/0.5),0_6px_16px_-2px_hsl(var(--primary)/0.35),inset_0_1px_0_0_hsl(0_0%_100%/0.3),inset_0_-2px_0_0_hsl(0_0%_0%/0.15)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_4px_hsl(0_0%_0%/0.2),inset_0_1px_2px_hsl(0_0%_0%/0.15)]",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-accent to-[hsl(308_23%_51%)] text-white",
          "border border-accent/60",
          "shadow-[0_2px_0_0_hsl(308_23%_51%/0.5),0_4px_12px_-2px_hsl(var(--accent)/0.3),inset_0_1px_0_0_hsl(0_0%_100%/0.25),inset_0_-2px_0_0_hsl(0_0%_0%/0.12)]",
          "hover:translate-y-[-1px] hover:shadow-[0_3px_0_0_hsl(308_23%_51%/0.5),0_6px_16px_-2px_hsl(var(--accent)/0.35),inset_0_1px_0_0_hsl(0_0%_100%/0.3)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_4px_hsl(0_0%_0%/0.2),inset_0_1px_2px_hsl(0_0%_0%/0.15)]",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
        ].join(" "),
        outline: [
          "bg-gradient-to-b from-white to-muted/60 text-foreground",
          "border-2 border-border",
          "shadow-[0_2px_0_0_hsl(0_0%_0%/0.04),0_4px_8px_-2px_hsl(0_0%_0%/0.06),inset_0_1px_0_0_hsl(0_0%_100%/0.95),inset_0_-1px_0_0_hsl(0_0%_0%/0.04)]",
          "hover:translate-y-[-1px] hover:border-primary/40 hover:text-primary hover:shadow-[0_3px_0_0_hsl(0_0%_0%/0.05),0_6px_12px_-2px_hsl(var(--primary)/0.1),inset_0_1px_0_0_hsl(0_0%_100%/1)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_3px_hsl(0_0%_0%/0.08)]",
        ].join(" "),
        outlineGold: [
          "bg-gradient-to-b from-[hsl(335_45%_96%)] to-coral-100/60 text-coral-600",
          "border border-coral-200",
          "shadow-[0_2px_0_0_hsl(var(--coral-200)/0.4),inset_0_1px_0_0_hsl(0_0%_100%/0.9),inset_0_-1px_0_0_hsl(var(--coral-200)/0.15)]",
          "hover:translate-y-[-1px] hover:border-coral-300 hover:shadow-[0_3px_0_0_hsl(var(--coral-200)/0.4),0_4px_12px_-2px_hsl(var(--coral-400)/0.12)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_3px_hsl(var(--coral-400)/0.1)]",
        ].join(" "),
        outlineLight: [
          "bg-gradient-to-b from-primary/5 to-primary/10 text-primary",
          "border border-primary/20",
          "shadow-[0_2px_0_0_hsl(var(--primary)/0.06),inset_0_1px_0_0_hsl(0_0%_100%/0.8),inset_0_-1px_0_0_hsl(var(--primary)/0.05)]",
          "hover:translate-y-[-1px] hover:border-primary/30 hover:shadow-[0_3px_0_0_hsl(var(--primary)/0.08),0_4px_12px_-2px_hsl(var(--primary)/0.1)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_3px_hsl(var(--primary)/0.08)]",
        ].join(" "),
        heroOutline: [
          // Homepage hero secondary — subtle glass with white border
          "bg-white/[0.04] backdrop-blur-sm text-white/95 font-semibold",
          "border border-white/[0.18]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
          "hover:-translate-y-[2px] hover:bg-white/[0.08] hover:border-white/[0.35]",
          "hover:shadow-[0_4px_20px_rgba(249,115,22,0.12),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "active:translate-y-[1px] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.4)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          // Homepage hero primary — glass with warm orange accent
          "bg-gradient-to-br from-[rgba(249,115,22,0.2)] to-[rgba(255,255,255,0.08)] backdrop-blur-sm",
          "text-white/95 font-semibold",
          "border border-[rgba(249,115,22,0.35)]",
          "shadow-[0_0_20px_rgba(249,115,22,0.12),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
          "hover:-translate-y-[2px] hover:from-[rgba(249,115,22,0.3)] hover:to-[rgba(255,255,255,0.12)] hover:border-[rgba(249,115,22,0.5)]",
          "hover:shadow-[0_4px_24px_rgba(249,115,22,0.25),0_0_40px_rgba(249,115,22,0.1),inset_0_1px_0_0_rgba(255,255,255,0.15)]",
          "active:translate-y-[1px] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.4)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        destructive: [
          "bg-gradient-to-b from-destructive to-destructive/85 text-destructive-foreground",
          "border border-destructive/60",
          "shadow-[0_2px_0_0_hsl(var(--destructive)/0.5),0_4px_12px_-2px_hsl(var(--destructive)/0.3),inset_0_1px_0_0_hsl(0_0%_100%/0.2),inset_0_-2px_0_0_hsl(0_0%_0%/0.15)]",
          "hover:translate-y-[-1px] hover:shadow-[0_3px_0_0_hsl(var(--destructive)/0.5),0_6px_16px_-2px_hsl(var(--destructive)/0.35)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_4px_hsl(0_0%_0%/0.2)]",
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-secondary to-secondary/80 text-secondary-foreground",
          "border border-border/60",
          "shadow-[0_2px_0_0_hsl(0_0%_0%/0.03),0_3px_8px_-2px_hsl(0_0%_0%/0.06),inset_0_1px_0_0_hsl(0_0%_100%/0.9),inset_0_-1px_0_0_hsl(0_0%_0%/0.04)]",
          "hover:translate-y-[-1px] hover:shadow-[0_3px_0_0_hsl(0_0%_0%/0.04),0_5px_12px_-2px_hsl(var(--lavender-400)/0.1)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_3px_hsl(0_0%_0%/0.06)]",
        ].join(" "),
        ghost: "hover:bg-muted/50 hover:text-foreground hover:shadow-[inset_0_1px_0_hsl(0_0%_100%/0.6),0_1px_3px_hsl(0_0%_0%/0.04)] active:shadow-[inset_0_1px_2px_hsl(0_0%_0%/0.06)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[52px] px-5 py-2.5 text-base",
        sm: "h-[44px] rounded-md px-4 text-sm",
        lg: "h-[52px] rounded-lg px-6 text-base",
        xl: "h-[56px] rounded-lg px-8 text-lg",
        icon: "h-[52px] w-[52px]",
        heroPill: "h-[50px] rounded-full px-9 text-sm tracking-wide gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

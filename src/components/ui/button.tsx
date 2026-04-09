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
          // Solid warm orange with a whisper of top-to-bottom gradient
          "bg-gradient-to-b from-[#e07a55] to-[#d05f3a] text-white",
          // Crisp border keyed to the bottom of the gradient
          "border border-[#b8552f]",
          // Prominent drop shadow + warm ambient glow so buttons POP on any background
          "shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_14px_32px_-8px_rgba(217,108,74,0.7),0_0_28px_-6px_rgba(249,115,22,0.4),0_4px_12px_-2px_rgba(15,23,42,0.15)]",
          // Hover — noticeable lift, warmer tone, bigger glow halo
          "hover:-translate-y-[2px] hover:from-[#e88560] hover:to-[#d96847]",
          "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_20px_44px_-8px_rgba(217,108,74,0.8),0_0_44px_-6px_rgba(249,115,22,0.55),0_6px_16px_-2px_rgba(15,23,42,0.18)]",
          // Active — micro-press
          "active:translate-y-[0.5px] active:shadow-[0_1px_0_0_rgba(255,255,255,0.14)_inset,0_6px_16px_-4px_rgba(217,108,74,0.55)]",
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
          "bg-gradient-to-b from-white to-slate-50 text-slate-800",
          "border-2 border-slate-300",
          "shadow-[0_2px_0_0_hsl(0_0%_0%/0.05),0_4px_8px_-2px_hsl(0_0%_0%/0.08),inset_0_1px_0_0_hsl(0_0%_100%/0.95)]",
          "hover:translate-y-[-1px] hover:border-primary/50 hover:text-primary hover:bg-gradient-to-b hover:from-white hover:to-orange-50/40 hover:shadow-[0_3px_0_0_hsl(0_0%_0%/0.05),0_6px_14px_-2px_hsl(var(--primary)/0.15),inset_0_1px_0_0_hsl(0_0%_100%/1)]",
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
          // Hero secondary — visible glass with clear white border
          "bg-white/[0.12] backdrop-blur-sm text-white font-semibold",
          "border border-white/[0.30]",
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          "hover:-translate-y-[1px] hover:bg-white/[0.20] hover:border-white/[0.50]",
          "hover:shadow-[0_4px_20px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          "active:translate-y-[0.5px] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.4)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          // Hero primary — SOLID orange, high visibility on any dark background
          "bg-gradient-to-b from-[#F97316] to-[#EA580C]",
          "text-white font-semibold",
          "border border-[#c2410c]",
          "shadow-[0_4px_14px_rgba(249,115,22,0.35),inset_0_1px_0_0_rgba(255,255,255,0.18)]",
          "hover:-translate-y-[1px] hover:from-[#fb923c] hover:to-[#F97316]",
          "hover:shadow-[0_8px_24px_rgba(249,115,22,0.45),0_0_40px_rgba(249,115,22,0.15),inset_0_1px_0_0_rgba(255,255,255,0.22)]",
          "active:translate-y-[0.5px] active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.3)]",
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
          "bg-gradient-to-b from-slate-100 to-slate-200/80 text-slate-800",
          "border border-slate-300/80",
          "shadow-[0_2px_0_0_hsl(0_0%_0%/0.04),0_3px_8px_-2px_hsl(0_0%_0%/0.08),inset_0_1px_0_0_hsl(0_0%_100%/0.9)]",
          "hover:translate-y-[-1px] hover:border-slate-400/70 hover:shadow-[0_3px_0_0_hsl(0_0%_0%/0.05),0_5px_12px_-2px_hsl(0_0%_0%/0.1)]",
          "active:translate-y-[1px] active:shadow-[inset_0_2px_3px_hsl(0_0%_0%/0.08)]",
        ].join(" "),
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:shadow-[inset_0_1px_0_hsl(0_0%_100%/0.6),0_1px_3px_hsl(0_0%_0%/0.06)] active:shadow-[inset_0_1px_2px_hsl(0_0%_0%/0.08)]",
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

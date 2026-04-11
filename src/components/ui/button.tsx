import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "button-link inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none relative overflow-hidden tracking-wide transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        default: [
          // Primary — high contrast orange gradient with drop shadow
          "bg-gradient-to-b from-[#c2410c] to-[#9a3412] text-white",
          "border border-[#7c2d12]",
          "shadow-[0_2px_8px_rgba(194,65,12,0.25),0_1px_0_rgba(255,255,255,0.15)_inset]",
          "hover:-translate-y-[1px] hover:from-[#ea580c] hover:to-[#c2410c] hover:shadow-[0_4px_12px_rgba(194,65,12,0.35),0_1px_0_rgba(255,255,255,0.2)_inset]",
          "active:translate-y-[0.5px] active:shadow-[0_1px_4px_rgba(194,65,12,0.2)]",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-accent to-[hsl(308_23%_51%)] text-white",
          "border border-accent/60",
          "shadow-[0_2px_8px_hsl(var(--accent)/0.25),0_1px_0_rgba(255,255,255,0.15)_inset]",
          "hover:translate-y-[-1px] hover:shadow-[0_4px_12px_hsl(var(--accent)/0.35)]",
          "active:translate-y-[1px]",
        ].join(" "),
        outline: [
          // Strong outline — thicker border, visible hover
          "bg-white text-slate-900",
          "border-2 border-slate-400",
          "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          "hover:translate-y-[-1px] hover:border-primary hover:text-primary hover:bg-orange-50/50 hover:shadow-[0_4px_10px_rgba(194,65,12,0.15)]",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineGold: [
          "bg-white text-coral-600",
          "border-2 border-coral-300",
          "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          "hover:translate-y-[-1px] hover:border-coral-500 hover:shadow-[0_4px_10px_rgba(251,146,60,0.2)]",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineLight: [
          "bg-primary/10 text-primary",
          "border-2 border-primary/40",
          "shadow-[0_1px_3px_rgba(194,65,12,0.08)]",
          "hover:translate-y-[-1px] hover:border-primary hover:bg-primary/15 hover:shadow-[0_4px_10px_rgba(194,65,12,0.15)]",
          "active:translate-y-[1px]",
        ].join(" "),
        heroOutline: [
          // Hero secondary — visible glass with clear white border
          "bg-white/[0.15] backdrop-blur-sm text-white hover:text-white font-semibold",
          "border border-white/[0.40]",
          "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
          "hover:-translate-y-[1px] hover:bg-white/[0.22] hover:border-white/[0.60] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          // Hero primary — matches hero-home__cta exactly (135deg diagonal gradient)
          "bg-[linear-gradient(135deg,#c2410c,#9a3412)]",
          "text-white font-semibold",
          "border border-[#7c2d12]",
          "shadow-[0_2px_10px_rgba(194,65,12,0.35),0_1px_0_rgba(255,255,255,0.2)_inset]",
          "hover:-translate-y-[1px] hover:bg-[linear-gradient(135deg,#ea580c,#c2410c)] hover:shadow-[0_4px_14px_rgba(234,88,12,0.45),0_1px_0_rgba(255,255,255,0.25)_inset]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        destructive: [
          "bg-gradient-to-b from-destructive to-destructive/85 text-destructive-foreground",
          "border border-destructive/60",
          "shadow-[0_2px_8px_hsl(var(--destructive)/0.25)]",
          "hover:translate-y-[-1px] hover:shadow-[0_4px_12px_hsl(var(--destructive)/0.35)]",
          "active:translate-y-[1px]",
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900",
          "border-2 border-slate-300",
          "shadow-[0_1px_3px_rgba(0,0,0,0.08)]",
          "hover:translate-y-[-1px] hover:border-slate-500 hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]",
          "active:translate-y-[1px]",
        ].join(" "),
        ghost: "text-slate-800 border border-transparent hover:bg-slate-100 hover:text-slate-900 hover:border-slate-200",
        link: "text-primary underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-[38px] px-4 py-1.5 text-[13px]",
        sm: "h-[34px] rounded-md px-3 text-[12px]",
        lg: "h-[42px] rounded-lg px-5 text-[14px]",
        xl: "h-[46px] rounded-lg px-6 text-[15px]",
        icon: "h-[38px] w-[38px]",
        heroPill: "h-[40px] rounded-full px-6 text-[13px] tracking-[0.02em] gap-2",
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

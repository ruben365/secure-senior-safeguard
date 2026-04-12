import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "button-link inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[1rem] font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none relative overflow-hidden tracking-[0.015em] transition-[transform,box-shadow,background-color,border-color,color,filter] duration-200 ease-out",
  {
    variants: {
      variant: {
        default: [
          "bg-[linear-gradient(135deg,#d96c4a_0%,#c2410c_52%,#8f3415_100%)] text-white",
          "border border-[#8a3a1f]",
          "shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_16px_32px_-18px_rgba(194,65,12,0.52),0_10px_20px_-18px_rgba(15,23,42,0.34)]",
          "hover:-translate-y-[1px] hover:brightness-[1.04] hover:shadow-[0_1px_0_rgba(255,255,255,0.24)_inset,0_20px_38px_-18px_rgba(194,65,12,0.56),0_14px_24px_-18px_rgba(15,23,42,0.34)]",
          "active:translate-y-[0.5px] active:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_20px_-18px_rgba(194,65,12,0.38)]",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-accent to-[hsl(308_23%_51%)] text-white",
          "border border-accent/60",
          "shadow-[0_2px_8px_hsl(var(--accent)/0.25),0_1px_0_rgba(255,255,255,0.15)_inset]",
          "hover:translate-y-[-1px] hover:shadow-[0_4px_12px_hsl(var(--accent)/0.35)]",
          "active:translate-y-[1px]",
        ].join(" "),
        outline: [
          "bg-white/92 text-slate-900",
          "border border-white/85",
          "shadow-[0_1px_0_rgba(255,255,255,0.92)_inset,0_14px_28px_-22px_rgba(15,23,42,0.18)]",
          "hover:-translate-y-[1px] hover:border-primary/30 hover:text-primary hover:bg-white hover:shadow-[0_1px_0_rgba(255,255,255,0.94)_inset,0_20px_38px_-22px_rgba(217,108,74,0.2)]",
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
          "bg-primary/[0.09] text-primary",
          "border border-primary/24",
          "shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_14px_26px_-24px_rgba(217,108,74,0.24)]",
          "hover:-translate-y-[1px] hover:border-primary/36 hover:bg-primary/[0.13] hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_32px_-22px_rgba(217,108,74,0.28)]",
          "active:translate-y-[1px]",
        ].join(" "),
        heroOutline: [
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.1))] backdrop-blur-md text-white hover:text-white",
          "border border-white/[0.34]",
          "shadow-[0_1px_0_rgba(255,255,255,0.24)_inset,0_14px_28px_-22px_rgba(0,0,0,0.34)]",
          "hover:-translate-y-[1px] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.14))] hover:border-white/[0.52] hover:shadow-[0_1px_0_rgba(255,255,255,0.28)_inset,0_20px_34px_-22px_rgba(0,0,0,0.4)]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          "bg-[linear-gradient(135deg,#d96c4a_0%,#c2410c_50%,#8f3415_100%)] text-white",
          "border border-[#8a3a1f]",
          "shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_18px_34px_-18px_rgba(194,65,12,0.56),0_10px_20px_-18px_rgba(15,23,42,0.34)]",
          "hover:-translate-y-[1px] hover:brightness-[1.05] hover:shadow-[0_1px_0_rgba(255,255,255,0.26)_inset,0_24px_40px_-18px_rgba(234,88,12,0.56),0_14px_24px_-18px_rgba(15,23,42,0.36)]",
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
        default: "h-11 px-5 py-2 text-[13px]",
        sm: "h-10 rounded-[0.95rem] px-4 text-[12.5px]",
        lg: "h-12 rounded-[1rem] px-6 text-[13.5px]",
        xl: "h-[54px] rounded-[1.1rem] px-7 text-[14.5px]",
        icon: "h-11 w-11",
        heroPill: "h-12 rounded-full px-6 text-[13px] tracking-[0.02em] gap-2 sm:h-[50px] sm:px-7 sm:text-[13.5px]",
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

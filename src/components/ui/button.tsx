import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d96c4a] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none relative overflow-hidden tracking-wide transition-all duration-150 ease-out",
  {
    variants: {
      variant: {
        default: [
          // Brand orange primary button
          "bg-gradient-to-b from-[#e07b52] to-[#d96c4a] text-white",
          "border border-[#c45e3b]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_12px_-4px_rgba(217,108,74,0.4)]",
          "hover:-translate-y-[1px] hover:from-[#ea8560] hover:to-[#e07b52]",
          "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_8px_20px_-4px_rgba(217,108,74,0.5)]",
          "active:translate-y-[0.5px]",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-[#e07b52] to-[#d96c4a] text-white",
          "border border-[#c45e3b]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_12px_-4px_rgba(217,108,74,0.4)]",
          "hover:translate-y-[-1px] hover:from-[#ea8560] hover:to-[#e07b52]",
          "active:translate-y-[1px]",
        ].join(" "),
        outline: [
          "bg-gradient-to-b from-white to-slate-50 text-slate-800",
          "border-2 border-slate-300",
          "hover:translate-y-[-1px] hover:border-[#d96c4a]/40 hover:text-[#c45e3b] hover:from-white hover:to-orange-50/40",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineGold: [
          "bg-gradient-to-b from-[hsl(335_45%_96%)] to-coral-100/60 text-coral-600",
          "border border-coral-200",
          "hover:translate-y-[-1px] hover:border-coral-300",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineLight: [
          "bg-white/[0.08] backdrop-blur-md text-white",
          "border border-white/[0.22]",
          "hover:translate-y-[-1px] hover:bg-white/[0.14] hover:border-white/[0.32]",
          "active:translate-y-[1px]",
        ].join(" "),
        heroOutline: [
          // Hero secondary — glass with backdrop-blur-md (12 px) for visible glassmorphism
          "bg-white/10 backdrop-blur-md text-white font-semibold",
          "border border-white/[0.30]",
          "hover:-translate-y-[1px] hover:bg-white/[0.20] hover:border-white/[0.50]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(124,58,237,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          // Hero primary — brand orange accent
          "bg-gradient-to-b from-[#e07b52] to-[#d96c4a]",
          "text-white font-semibold",
          "border border-[#c45e3b]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_16px_-4px_rgba(217,108,74,0.45)]",
          "hover:-translate-y-[1px] hover:from-[#ea8560] hover:to-[#e07b52]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(217,108,74,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        destructive: [
          "bg-gradient-to-b from-destructive to-destructive/85 text-destructive-foreground",
          "border border-destructive/60",
          "hover:translate-y-[-1px]",
          "active:translate-y-[1px]",
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-slate-100 to-slate-200/80 text-slate-800",
          "border border-slate-300/80",
          "hover:translate-y-[-1px] hover:border-slate-400/70",
          "active:translate-y-[1px]",
        ].join(" "),
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[28px] sm:h-[38px] px-3 sm:px-5 py-1 text-[11px] sm:text-[13px]",
        sm: "h-[30px] sm:h-[34px] rounded-md px-2.5 sm:px-3 text-[11px] sm:text-[12px]",
        lg: "h-[32px] sm:h-[44px] rounded-xl px-3.5 sm:px-4 text-[12px] sm:text-[15px]",
        xl: "h-[36px] sm:h-[52px] rounded-xl px-5 sm:px-6 text-[12px] sm:text-[16px]",
        icon: "h-[38px] w-[38px]",
        heroPill: "h-[28px] sm:h-[40px] rounded-full px-3.5 sm:px-4 text-[10px] sm:text-[13px] tracking-wide gap-1",
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

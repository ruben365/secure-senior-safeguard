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
          // Purple primary button
          "bg-gradient-to-b from-[#7C3AED] to-[#6D28D9] text-white",
          "border border-[#5B21B6]",
          "hover:-translate-y-[1px] hover:from-[#8B5CF6] hover:to-[#7C3AED]",
          "active:translate-y-[0.5px]",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-[#7C3AED] to-[#6D28D9] text-white",
          "border border-[#5B21B6]",
          "hover:translate-y-[-1px] hover:from-[#8B5CF6] hover:to-[#7C3AED]",
          "active:translate-y-[1px]",
        ].join(" "),
        outline: [
          "bg-gradient-to-b from-white to-slate-50 text-slate-800",
          "border-2 border-slate-300",
          "hover:translate-y-[-1px] hover:border-primary/50 hover:text-primary hover:bg-gradient-to-b hover:from-white hover:to-purple-50/40",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineGold: [
          "bg-gradient-to-b from-[hsl(335_45%_96%)] to-coral-100/60 text-coral-600",
          "border border-coral-200",
          "hover:translate-y-[-1px] hover:border-coral-300",
          "active:translate-y-[1px]",
        ].join(" "),
        outlineLight: [
          "bg-gradient-to-b from-primary/5 to-primary/10 text-primary",
          "border border-primary/20",
          "hover:translate-y-[-1px] hover:border-primary/30",
          "active:translate-y-[1px]",
        ].join(" "),
        heroOutline: [
          // Hero secondary — visible glass with clear white border
          "bg-white/[0.12] backdrop-blur-sm text-white font-semibold",
          "border border-white/[0.30]",
          "hover:-translate-y-[1px] hover:bg-white/[0.20] hover:border-white/[0.50]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(124,58,237,0.7)]",
          "[transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
        ].join(" "),
        heroPrimary: [
          // Hero primary — purple accent
          "bg-gradient-to-b from-[#7C3AED] to-[#6D28D9]",
          "text-white font-semibold",
          "border border-[#5B21B6]",
          "hover:-translate-y-[1px] hover:from-[#8B5CF6] hover:to-[#7C3AED]",
          "active:translate-y-[0.5px] active:scale-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(124,58,237,0.7)]",
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
        default: "h-[38px] px-4 py-1.5 text-[13px]",
        sm: "h-[34px] rounded-md px-3 text-[12px]",
        lg: "h-[42px] rounded-lg px-5 text-[14px]",
        xl: "h-[46px] rounded-lg px-6 text-[15px]",
        icon: "h-[38px] w-[38px]",
        heroPill: "h-[40px] rounded-full px-6 text-[13px] tracking-wide gap-1.5",
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

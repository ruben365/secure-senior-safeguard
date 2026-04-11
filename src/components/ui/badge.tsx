import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-[0.01em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-primary/25 bg-primary/10 text-primary shadow-[0_1px_2px_rgba(13,33,55,0.04)]",
        secondary: "border border-secondary/40 bg-secondary/70 text-secondary-foreground shadow-[0_1px_2px_rgba(13,33,55,0.04)]",
        destructive:
          "border border-destructive/25 bg-destructive/10 text-destructive shadow-[0_1px_2px_rgba(13,33,55,0.04)]",
        outline: "border border-border/70 text-foreground bg-white shadow-[0_1px_2px_rgba(13,33,55,0.04)]",
        success: "border border-success/25 bg-success/10 text-success shadow-[0_1px_2px_rgba(13,33,55,0.04)]",
        premium:
          "border border-primary/25 bg-gradient-to-r from-primary/10 to-accent/10 text-primary shadow-[0_1px_3px_rgba(217,108,74,0.12)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

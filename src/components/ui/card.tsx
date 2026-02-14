import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-2xl bg-card/90 text-card-foreground backdrop-blur-xl",
      "border border-border/40",
      "shadow-[0_2px_8px_hsl(var(--coral-400)/0.06),0_8px_24px_-8px_hsl(var(--lavender-400)/0.08),0_16px_40px_-16px_hsl(258_25%_25%/0.07)]",
      "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:bg-gradient-to-br before:from-white/80 before:via-transparent before:to-transparent before:opacity-60",
      "after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:border after:border-white/50 after:border-b-transparent after:border-r-transparent",
      "transition-all duration-300",
      "hover:shadow-[0_4px_12px_hsl(var(--coral-400)/0.1),0_12px_32px_-8px_hsl(var(--lavender-400)/0.12),0_20px_48px_-16px_hsl(258_25%_25%/0.1)]",
      "hover:border-primary/20",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-10 flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative z-10 p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-10 flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

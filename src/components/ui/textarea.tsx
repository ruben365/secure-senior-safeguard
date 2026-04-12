import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.8)]",
          "placeholder:text-muted-foreground/60",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_3px_hsl(var(--primary)/0.08)]",
          "hover:border-primary/30",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          "ring-offset-background",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

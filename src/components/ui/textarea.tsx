import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-foreground",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
          "placeholder:text-muted-foreground/70",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_4px_hsl(var(--primary)/0.1)]",
          "hover:border-slate-400",
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

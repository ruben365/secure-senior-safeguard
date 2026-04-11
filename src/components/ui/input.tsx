import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm text-foreground",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
          "placeholder:text-muted-foreground/70",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_0_0_4px_hsl(var(--primary)/0.1)]",
          "hover:border-slate-400",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
          "file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-primary",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-7 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.8)]",
          "placeholder:text-muted-foreground/60",
          "transition-all duration-150 ease-out",
          "focus-visible:outline-[#d96c4a] focus-visible:outline-2 focus-visible:border-[#d96c4a] focus-visible:ring-2 focus-visible:ring-[#d96c4a] focus-visible:ring-offset-0",
          "hover:border-[#d96c4a]/25",
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

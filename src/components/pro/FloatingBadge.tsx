import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  children: ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  delay?: number;
}

const positionClasses = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
};

export function FloatingBadge({
  children,
  position = "top-right",
  className,
  delay = 0,
}: FloatingBadgeProps) {
  return (
    <div
      className={cn(
        "floating-badge",
        positionClasses[position],
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

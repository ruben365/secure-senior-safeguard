import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MeshBackgroundProps {
  children: ReactNode;
  variant?: "subtle" | "vibrant" | "dark";
  withDots?: boolean;
  withOrbs?: boolean;
  className?: string;
}

export function MeshBackground({
  children,
  variant = "subtle",
  withDots = false,
  withOrbs = false,
  className,
}: MeshBackgroundProps) {
  return (
    <div
      className={cn(
        "relative",
        variant === "subtle" && "mesh-gradient",
        variant === "vibrant" && "mesh-gradient-animated",
        variant === "dark" && "bg-[hsl(var(--navy-900))]",
        withDots && "dot-grid-bg",
        withOrbs && "floating-orbs",
        className,
      )}
    >
      {children}
    </div>
  );
}

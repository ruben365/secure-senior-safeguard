import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: "brand" | "electric" | "fire" | "warm" | "animated";
  className?: string;
}

const variantClasses = {
  brand: "gradient-text-brand",
  electric: "gradient-text-electric",
  fire: "gradient-text-fire",
  warm: "gradient-text-warm",
  animated: "gradient-text-animated",
};

export function GradientHeading({
  children,
  as: Tag = "h2",
  variant = "brand",
  className,
}: GradientHeadingProps) {
  return (
    <Tag className={cn(variantClasses[variant], "font-bold", className)}>
      {children}
    </Tag>
  );
}

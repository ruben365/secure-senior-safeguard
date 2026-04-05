import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "success" | "coral";
  hover?: boolean;
}

const glowColors = {
  primary: "hsl(var(--primary) / 0.15)",
  accent: "hsl(var(--accent) / 0.15)",
  success: "hsl(var(--success) / 0.15)",
  coral: "hsl(var(--coral-500) / 0.15)",
};

export function GlowCard({
  children,
  className,
  glowColor = "accent",
  hover = true,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "glow-card p-6",
        hover && "shine-hover",
        className,
      )}
      style={{
        "--glow-color": glowColors[glowColor],
      } as React.CSSProperties}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

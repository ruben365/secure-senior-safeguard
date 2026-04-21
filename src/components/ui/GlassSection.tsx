import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassSectionProps {
  children: ReactNode;
  className?: string;
  /** Whether to show the frosted-glass card wrapper */
  glass?: boolean;
  /** Use the new vibrance v2 glass styling */
  vibrant?: boolean;
  /** Nature image accent */
  accent?: ReactNode;
}

/**
 * A section wrapper that optionally adds glassmorphism card styling
 * and supports nature accent overlays.
 */
export const GlassSection = ({
  children,
  className,
  glass = false,
  vibrant = false,
  accent,
}: GlassSectionProps) => {
  if (!glass && !accent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {accent}
      {glass ? (
        <div
          className={cn(
            "relative z-10 mx-4 md:mx-8 lg:mx-12 my-4",
            vibrant
              ? "glass-vibe"
              : "rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-lg",
          )}
        >
          {children}
        </div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  );
};

export default GlassSection;

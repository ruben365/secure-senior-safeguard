import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MeshBackgroundProps {
  children: ReactNode;
  variant?: "subtle" | "vibrant" | "dark" | "aurora" | "sunset" | "ocean" | "mint" | "warm";
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
  const isVibe = ["aurora", "sunset", "ocean", "mint", "warm"].includes(variant);
  return (
    <div
      className={cn(
        "relative",
        variant === "subtle" && "mesh-gradient",
        variant === "vibrant" && "mesh-gradient-animated",
        variant === "dark" && "bg-[hsl(var(--navy-900))]",
        isVibe && `vibe-section vibe-section--${variant}`,
        withDots && "dot-grid-bg",
        withOrbs && "floating-orbs",
        className,
      )}
    >
      {withOrbs && isVibe && (
        <div className="vibe-orb-layer" aria-hidden="true">
          <span className="vibe-orb vibe-orb--lg vibe-orb--coral" style={{ top: "10%", left: "-5%" }} />
          <span className="vibe-orb vibe-orb--md vibe-orb--lavender" style={{ top: "60%", right: "5%", animationDelay: "-8s" }} />
          <span className="vibe-orb vibe-orb--xl vibe-orb--sky" style={{ bottom: "-10%", left: "40%", animationDelay: "-16s" }} />
        </div>
      )}
      {children}
    </div>
  );
}

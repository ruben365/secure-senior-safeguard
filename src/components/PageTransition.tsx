import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// Simplified - no animations, instant page loads
export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

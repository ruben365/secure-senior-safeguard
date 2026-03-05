import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = ({
  children,
  variant: _variant = "auto",
}: PageTransitionProps) => {
  return <div className="animate-fade-in">{children}</div>;
};

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  threshold?: number;
}

export const ScrollRevealSection = ({ 
  children, 
  className = "",
  staggerChildren = false,
  threshold = 0.2
}: ScrollRevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold,
    triggerOnce: true 
  });

  return (
    <div
      ref={ref}
      className={cn(
        "animate-on-scroll",
        staggerChildren && "stagger-children",
        isVisible && "visible",
        className
      )}
    >
      {children}
    </div>
  );
};

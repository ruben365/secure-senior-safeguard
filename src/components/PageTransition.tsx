import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "auto";
}

// Single fast transition for all pages
const transition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.05 } },
};

export const PageTransition = ({ 
  children, 
  variant = "fade" 
}: PageTransitionProps) => {
  // All variants use the same fast fade for consistency
  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
    >
      {children}
    </motion.div>
  );
};

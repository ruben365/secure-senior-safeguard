import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// Smooth page transition with loading overlay
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Reset state on route change
    setIsReady(false);
    setShowOverlay(true);

    // Give content time to mount, then fade out overlay
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 50);

    const overlayTimer = setTimeout(() => {
      setShowOverlay(false);
    }, 150);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(overlayTimer);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      {/* Page content - always rendered */}
      <div className={isReady ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 150ms ease-out" }}>
        {children}
      </div>

      {/* Loading overlay - covers content until ready */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-[9998] bg-background pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

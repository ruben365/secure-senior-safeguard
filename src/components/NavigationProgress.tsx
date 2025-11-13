import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const NavigationProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress bar on route change
    setIsVisible(true);
    setProgress(0);

    // Fast start: 0 to 70% in 0.3s
    const fastTimer = setTimeout(() => setProgress(70), 50);
    
    // Slow middle: 70 to 90% in 0.5s
    const slowTimer = setTimeout(() => setProgress(90), 350);

    // Complete and hide
    const completeTimer = setTimeout(() => {
      setProgress(100);
      
      // Fade out after completion
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 200);
    }, 500);

    return () => {
      clearTimeout(fastTimer);
      clearTimeout(slowTimer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#6D28D9] to-[#14B8A6]"
            style={{
              boxShadow: "0 2px 4px rgba(109, 40, 217, 0.3)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: progress < 70 ? 0.3 : progress < 90 ? 0.5 : 0.1,
              ease: progress < 70 ? "easeOut" : "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

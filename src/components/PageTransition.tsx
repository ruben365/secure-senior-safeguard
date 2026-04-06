import { ReactNode, forwardRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, variant: _variant = "auto" }, _ref) => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(false);
      // Scroll to top on route change
      window.scrollTo(0, 0);
      // Small delay for the fade to register
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }, [location.pathname]);

    return (
      <div
        className="page-transition"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(8px)",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    );
  }
);

PageTransition.displayName = "PageTransition";

import { ReactNode, forwardRef, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, variant: _variant = "auto" }, _ref) => {
    const location = useLocation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isFirst = useRef(true);

    useEffect(() => {
      const el = wrapperRef.current;
      if (!el) return;

      if (isFirst.current) {
        isFirst.current = false;
        return;
      }

      // Fade out
      el.style.transition = "opacity 0.12s ease-in";
      el.style.opacity = "0";

      const timer = setTimeout(() => {
        // Scroll to top while invisible
        window.scrollTo(0, 0);

        // Fade in
        el.style.transition = "opacity 0.25s ease-out";
        el.style.opacity = "1";
      }, 130);

      return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
      <div ref={wrapperRef} style={{ opacity: 1 }}>
        {children}
      </div>
    );
  }
);

PageTransition.displayName = "PageTransition";

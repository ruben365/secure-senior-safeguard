import { ReactNode, forwardRef, useEffect, useRef, useState } from "react";
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
    const [animKey, setAnimKey] = useState(0);

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
        window.scrollTo(0, 0);

        // Bump key to remount children — restarts CSS animations
        setAnimKey((k) => k + 1);

        // Fade in
        el.style.transition = "opacity 0.25s ease-out";
        el.style.opacity = "1";
      }, 130);

      return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
      <div ref={wrapperRef} style={{ opacity: 1 }} key={animKey}>
        {children}
      </div>
    );
  }
);

PageTransition.displayName = "PageTransition";

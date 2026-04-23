import { ReactNode, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, variant: _variant = "auto" }, externalRef) => {
    const location = useLocation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isFirst = useRef(true);
    const [animKey, setAnimKey] = useState(0);

    // Attach both the internal animation ref and any forwarded external ref.
    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof externalRef === "function") externalRef(node);
        else if (externalRef) (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [externalRef],
    );

    useEffect(() => {
      const el = wrapperRef.current;
      if (!el) return;

      if (isFirst.current) {
        isFirst.current = false;
        return;
      }

      // Fade + lift out
      el.style.transition = "opacity 0.12s ease-in, transform 0.12s ease-in";
      el.style.opacity = "0";
      el.style.transform = "translateY(6px)";

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        // Bump key to remount children — restarts CSS animations
        setAnimKey((k) => k + 1);

        // Reset position instantly, then fade in with upward drift
        el.style.transition = "none";
        el.style.transform = "translateY(-8px)";
        el.style.opacity = "0";

        // Trigger reflow so the "none" transition takes effect before re-animating
        void el.offsetHeight;

        el.style.transition = "opacity 0.28s ease-out, transform 0.28s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 130);

      return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
      <div ref={setRef} style={{ opacity: 1, transform: "translateY(0)" }} key={animKey}>
        {children}
      </div>
    );
  }
);

PageTransition.displayName = "PageTransition";

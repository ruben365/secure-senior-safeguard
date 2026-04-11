import { useEffect, forwardRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = forwardRef<HTMLDivElement>((_props, _ref) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    // Instant scroll on route change — smooth scroll causes visible jank
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
});

ScrollToTop.displayName = "ScrollToTop";

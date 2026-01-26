import { lazy, Suspense, useState, useEffect } from "react";

// Lazy load the heavy AIChat component
const AIChat = lazy(() => import("./AIChat").then(m => ({ default: m.AIChat })));

/**
 * Deferred AIChat loader - only loads after page is idle
 * This prevents the 622-line AIChat component from blocking initial render
 */
export const LazyAIChat = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading until browser is idle or after 2 seconds
    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 2000 }
      );
      return () => (window as any).cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(() => setShouldLoad(true), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <AIChat />
    </Suspense>
  );
};

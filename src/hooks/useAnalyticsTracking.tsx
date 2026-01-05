import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackScroll, getSessionId } from "@/utils/analyticsTracker";

export function useAnalyticsTracking() {
  const location = useLocation();

  useEffect(() => {
    // Initialize session
    getSessionId();
  }, []);

  useEffect(() => {
    // Defer tracking aggressively to avoid extending network dependency chain
    const deferTracking = () => {
      trackPageView(location.pathname + location.search, document.title);
    };
    
    // Wait for page to fully load before tracking analytics
    let scheduleTracking: number | ReturnType<typeof setTimeout>;
    
    const startTracking = () => {
      if ('requestIdleCallback' in window) {
        scheduleTracking = (window as any).requestIdleCallback(deferTracking, { timeout: 10000 });
      } else {
        scheduleTracking = setTimeout(deferTracking, 3000);
      }
    };
    
    // Only start tracking after load event (ensures LCP is complete)
    if (document.readyState === 'complete') {
      setTimeout(startTracking, 1000); // Additional 1s delay after load
    } else {
      window.addEventListener('load', () => setTimeout(startTracking, 1000), { once: true });
    }
    
    const cancelTracking = () => {
      if ('requestIdleCallback' in window && typeof scheduleTracking === 'number') {
        (window as any).cancelIdleCallback(scheduleTracking);
      } else {
        clearTimeout(scheduleTracking as ReturnType<typeof setTimeout>);
      }
    };

    // Track scroll depth
    let maxScroll = 0;
    let ticking = false;
    
    const updateScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      if (scrollPercent > maxScroll && [25, 50, 75, 100].includes(scrollPercent)) {
        maxScroll = scrollPercent;
        trackScroll(scrollPercent);
      }
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelTracking();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
}
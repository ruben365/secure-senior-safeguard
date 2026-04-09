import { useEffect } from "react";

/**
 * GlobalMotionProvider — mounted once in App.tsx.
 *
 * NOTE ON IMPLEMENTATION:
 * This project uses `#root { zoom: 0.75 }` globally. Chromium has a
 * long-standing bug where IntersectionObserver does not fire callbacks
 * for elements inside a `zoom`-transformed subtree. So instead of IO,
 * we use a throttled scroll/resize listener that reads
 * getBoundingClientRect() (which IS zoom-aware) and adds .is-visible
 * when an element enters the viewport.
 *
 * Behavior:
 *  - Respects prefers-reduced-motion — instantly reveals everything.
 *  - Uses rAF throttling so scroll stays smooth.
 *  - Re-scans the DOM when new nodes are added (lazy-loaded routes).
 */
export function GlobalMotionProvider() {
  useEffect(() => {
    (window as unknown as { __gmp_mounted?: boolean }).__gmp_mounted = true;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealAll = () => {
      document
        .querySelectorAll(
          "[data-reveal], .reveal-on-scroll, img[data-img-reveal]",
        )
        .forEach((el) => el.classList.add("is-visible"));
    };

    if (prefersReduced) {
      revealAll();
      return;
    }

    const SELECTOR =
      "[data-reveal]:not(.is-visible), .reveal-on-scroll:not(.is-visible), img[data-img-reveal]:not(.is-visible)";

    let pending: number | null = null;

    const check = () => {
      pending = null;
      const viewportH = window.innerHeight;
      const triggerLine = viewportH - 40; // 40px before the bottom
      const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Element is considered "entering" when its top crosses triggerLine
        // or it is already above/straddling the viewport bottom.
        if (rect.top < triggerLine && rect.bottom > 0) {
          el.classList.add("is-visible");
        }
      });
    };

    const schedule = () => {
      if (pending !== null) return;
      pending = requestAnimationFrame(check);
    };

    // Initial scan — reveal anything already in view on mount.
    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    // Re-scan when new nodes are added (lazy pages, dialogs, carousels).
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (pending !== null) cancelAnimationFrame(pending);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
    };
  }, []);

  return null;
}

export default GlobalMotionProvider;

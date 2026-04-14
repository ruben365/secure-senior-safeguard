import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 80;
const MAX_ALIGNMENT_DELTA = 24;

const getHashTarget = (hash: string) => {
  if (!hash) return null;

  const element = document.querySelector<HTMLElement>(hash);
  if (!element) return null;

  const elementTop = element.getBoundingClientRect().top;
  const top = Math.max(elementTop + window.pageYOffset - HEADER_OFFSET, 0);
  const aligned =
    Math.abs(element.getBoundingClientRect().top - HEADER_OFFSET) <=
    MAX_ALIGNMENT_DELTA;

  return { element, top, aligned };
};

const scrollToHash = (hash: string, behavior: ScrollBehavior) => {
  const target = getHashTarget(hash);
  if (!target) return false;

  window.scrollTo({
    top: target.top,
    behavior,
  });

  return target.aligned;
};

export const useSmoothAnchorScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor && anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          scrollToHash(href, "smooth");
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    if (!location.hash) return;

    let attempts = 0;
    let timeoutId: number | undefined;

    const tryScroll = () => {
      attempts += 1;

      const isAligned = scrollToHash(location.hash, "auto");
      if (isAligned || attempts >= 14) return;

      timeoutId = window.setTimeout(tryScroll, 140);
    };

    timeoutId = window.setTimeout(tryScroll, 0);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [location.hash, location.pathname]);
};

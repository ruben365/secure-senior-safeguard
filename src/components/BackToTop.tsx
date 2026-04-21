import { useState, useEffect, forwardRef } from "react";
import { ChevronUp } from "lucide-react";

export const BackToTop = forwardRef<HTMLButtonElement>((_props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 400);
        ticking = false;
      });
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={ref}
      onClick={scrollToTop}
      style={{ minHeight: "auto", minWidth: "auto" }}
      className={`gx-fab fixed bottom-24 right-4 md:bottom-8 md:right-8 z-fab w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
    >
      <ChevronUp className="w-4 h-4 md:w-6 md:h-6" />
    </button>
  );
});

BackToTop.displayName = "BackToTop";
export default BackToTop;

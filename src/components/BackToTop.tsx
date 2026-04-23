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
      className={[
        // Position + size
        "fixed bottom-24 right-4 md:bottom-20 md:right-8 z-fab",
        "w-10 h-10 md:w-12 md:h-12 rounded-full",
        // Glass + gold accent surface
        "bg-[rgba(255,200,120,0.12)] border border-[rgba(255,190,90,0.35)]",
        "backdrop-blur-[12px] backdrop-saturate-[1.4]",
        "shadow-[0_4px_24px_rgba(249,115,22,0.22),inset_0_1px_0_rgba(255,255,255,0.12)]",
        // Icon
        "flex items-center justify-center text-[#fbbf24]",
        // Interaction
        "hover:border-[rgba(255,190,90,0.65)] hover:shadow-[0_6px_32px_rgba(249,115,22,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]",
        "active:scale-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        // Smooth entrance/exit
        "transition-[opacity,transform,box-shadow] duration-300 ease-out",
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
    </button>
  );
});

BackToTop.displayName = "BackToTop";
export default BackToTop;

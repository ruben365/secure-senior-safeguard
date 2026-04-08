import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";

const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote:
      "We were about to send $5,000 to someone pretending to be our grandson. InVision's training taught us to use a family safe word — it saved us from devastation.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Grandparent Scam Prevented",
  },
  {
    name: "Maria T.",
    location: "Springfield, OH",
    quote:
      "As a small business owner, I didn't realize how vulnerable my team was. The workshop was eye-opening. We've since blocked 3 phishing attempts using what we learned.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Owner",
  },
  {
    name: "David & Linda W.",
    location: "Centerville, OH",
    quote:
      "The private family session was worth every penny. Our parents now know exactly what to do when they get suspicious calls. We sleep better knowing they're protected.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Session",
  },
];

/**
 * Dotted world map background — ultra-lightweight silhouette of all
 * seven continents painted as low-opacity purple-gray blobs. Sits
 * behind the testimonial cards so the grid feels like a network
 * reaching around the world without adding any new background color.
 */
function WorldMapBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 2000 1000"
        className="w-full h-full max-w-[1600px] opacity-[0.09]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          {/* Dot pattern that maps continents via mask */}
          <pattern id="map-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.8" fill="#6b5b8a" />
          </pattern>

          {/* Continent mask — all continents as a single composite path.
              Numbers chosen to look roughly world-like without being
              geographically precise. */}
          <mask id="continents-mask">
            <rect width="2000" height="1000" fill="black" />
            {/* North America */}
            <path
              d="M 140 180 Q 180 140 280 150 L 430 140 Q 520 160 540 220 L 560 300 Q 540 360 500 400 L 480 480 Q 440 520 380 520 L 300 500 Q 240 470 200 420 L 170 350 Q 140 280 140 180 Z"
              fill="white"
            />
            {/* Central America connector */}
            <path
              d="M 410 520 Q 440 560 460 610 L 470 650 Q 450 670 430 660 L 400 620 Q 390 570 410 520 Z"
              fill="white"
            />
            {/* South America */}
            <path
              d="M 490 660 Q 540 650 570 690 L 620 780 Q 640 860 600 910 L 560 950 Q 510 950 480 900 L 450 820 Q 440 740 490 660 Z"
              fill="white"
            />
            {/* Greenland */}
            <path
              d="M 650 100 Q 700 90 740 110 L 770 150 Q 760 200 720 210 L 680 200 Q 640 170 650 100 Z"
              fill="white"
            />
            {/* Europe */}
            <path
              d="M 900 220 Q 960 200 1030 220 L 1080 260 Q 1080 310 1040 330 L 970 340 Q 910 320 880 280 Q 870 250 900 220 Z"
              fill="white"
            />
            {/* Africa */}
            <path
              d="M 940 360 Q 1010 350 1080 390 L 1140 470 Q 1160 560 1130 640 L 1090 720 Q 1040 770 980 760 Q 910 720 890 640 L 870 530 Q 870 440 940 360 Z"
              fill="white"
            />
            {/* Middle East / West Asia */}
            <path
              d="M 1100 320 Q 1170 310 1220 340 L 1250 390 Q 1240 430 1200 440 L 1140 430 Q 1080 400 1080 360 Q 1080 330 1100 320 Z"
              fill="white"
            />
            {/* Asia main mass */}
            <path
              d="M 1180 180 Q 1320 150 1460 170 L 1600 180 Q 1680 220 1700 280 L 1680 350 Q 1620 390 1520 400 L 1380 390 Q 1260 360 1180 300 Q 1140 240 1180 180 Z"
              fill="white"
            />
            {/* India / SE Asia */}
            <path
              d="M 1360 400 Q 1420 410 1460 450 L 1470 510 Q 1440 540 1390 540 L 1350 520 Q 1320 470 1340 420 Q 1350 405 1360 400 Z"
              fill="white"
            />
            {/* SE Asia islands */}
            <path
              d="M 1550 470 Q 1620 470 1680 500 L 1710 540 Q 1690 570 1640 570 L 1580 550 Q 1540 520 1550 470 Z"
              fill="white"
            />
            {/* Australia */}
            <path
              d="M 1620 660 Q 1720 650 1810 680 L 1860 730 Q 1860 790 1810 810 L 1710 810 Q 1620 790 1590 740 Q 1580 690 1620 660 Z"
              fill="white"
            />
            {/* Japan */}
            <path
              d="M 1720 310 Q 1750 300 1770 330 L 1760 360 Q 1730 370 1710 350 Q 1700 325 1720 310 Z"
              fill="white"
            />
            {/* NZ */}
            <path
              d="M 1900 800 Q 1920 795 1930 815 L 1920 840 Q 1900 845 1890 825 Q 1885 810 1900 800 Z"
              fill="white"
            />
          </mask>
        </defs>

        <rect width="2000" height="1000" fill="url(#map-dots)" mask="url(#continents-mask)" />
      </svg>
    </div>
  );
}

export const TestimonialCarousel = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-reveal observer for [data-reveal] inside this section
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hss-testimonial-theater relative z-10 py-16 md:py-22 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="hss-testimonial-glow-left" />
      <div aria-hidden="true" className="hss-testimonial-glow-right" />

      {/* NEW — dotted world map backdrop in purple-gray at low opacity */}
      <WorldMapBackdrop />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10 lg:mb-14">
          <span
            data-reveal
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E293B]/12 bg-white/70 mb-5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d96c4a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#d96c4a]">
              Testimonials
            </span>
          </span>
          <h2
            id="testimonials-heading"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="text-4xl md:text-5xl lg:text-[3rem] font-extrabold text-[#1E293B] leading-[1.05] tracking-tight mb-3 mt-4"
          >
            What families are saying
          </h2>
          {/* Darker subtitle — reads clearly on the light mesh background */}
          <p
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            className="text-[#475569] text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium"
          >
            Real stories from Ohio families we&rsquo;ve helped protect.
          </p>
        </div>

        {/* Small fade-in cards grid — 3 cards, hover to reveal */}
        <div
          data-reveal
          style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => {
            const isHovered = hoveredIdx === i;
            const anyHovered = hoveredIdx !== null;
            return (
              <figure
                key={t.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={[
                  "group relative rounded-2xl p-5 md:p-6",
                  "bg-white/85 backdrop-blur-md border border-[#1E293B]/8",
                  "shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)]",
                  "transition-all duration-500 ease-out",
                  // Fade effect: idle state is slightly dimmed; hovered card
                  // pops to full clarity; other cards dim further.
                  anyHovered
                    ? isHovered
                      ? "opacity-100 scale-[1.02] shadow-[0_20px_48px_-12px_rgba(217,108,74,0.28),0_4px_16px_-4px_rgba(15,23,42,0.12)] border-[#d96c4a]/25 -translate-y-1"
                      : "opacity-40 scale-[0.98]"
                    : "opacity-85 hover:opacity-100",
                ].join(" ")}
              >
                {/* Floating quote badge */}
                <div
                  aria-hidden="true"
                  className={[
                    "absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#d96c4a] to-[#b8552f]",
                    "flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(217,108,74,0.45)] border border-white/30",
                    "transition-all duration-500",
                    isHovered ? "rotate-[-6deg] scale-110" : "rotate-0 scale-100",
                  ].join(" ")}
                >
                  <Quote className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3 mt-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#d96c4a] text-[#d96c4a]"
                    />
                  ))}
                </div>

                {/* Quote — clamped to keep cards the same small height */}
                <blockquote className="text-[0.8125rem] md:text-sm text-[#475569] leading-relaxed mb-4 italic font-light line-clamp-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author row */}
                <figcaption className="flex items-center gap-3 pt-3 border-t border-[#1E293B]/8">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-[#1E293B] text-xs truncate">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      {t.location}
                    </div>
                  </div>
                </figcaption>

                {/* Tag pill */}
                <div
                  className={[
                    "absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full",
                    "text-[9px] font-bold uppercase tracking-wider",
                    "bg-[#d96c4a]/10 text-[#d96c4a] border border-[#d96c4a]/20",
                    "transition-all duration-500",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-0.5",
                  ].join(" ")}
                >
                  {t.tag}
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

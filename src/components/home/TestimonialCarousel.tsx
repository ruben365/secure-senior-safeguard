import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

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
      className="hss-testimonial-theater relative z-10 py-16 md:py-22 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="hss-testimonial-glow-left" />
      <div aria-hidden="true" className="hss-testimonial-glow-right" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-5xl">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <span
            data-reveal
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/12 bg-white/[0.06] mb-5"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d96c4a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#fbab8e]">Testimonials</span>
          </span>
          <h2
            id="testimonials-heading"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="text-4xl md:text-5xl lg:text-[3rem] font-extrabold text-white leading-[1.05] tracking-tight mb-3 mt-4"
          >
            What families are saying
          </h2>
          <p
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Real stories from Ohio families we've helped protect.
          </p>
        </div>

        {/* Glass card */}
        <div
          data-reveal="scale"
          style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
          className="hss-testimonial-card"
        >
          {/* Orange accent top bar */}
          <div className="hss-card-accent-bar" />

          <div className="p-8 md:p-12 relative">
            {/* Giant decorative quote mark */}
            <div aria-hidden="true" className="hss-giant-quote">&ldquo;</div>

            <div key={current} className="animate-fade-in relative">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">

                {/* Avatar column */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="hss-avatar-ring rounded-2xl overflow-hidden">
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-24 h-24 md:w-[120px] md:h-[120px] object-cover"
                        loading="lazy"
                        decoding="async"
                        width={120}
                        height={120}
                      />
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] bg-[#d96c4a]/15 text-[#fbab8e] border border-[#d96c4a]/25">
                    {testimonials[current].tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  {/* Star rating */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d96c4a] text-[#d96c4a]" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl lg:text-[1.35rem] text-white/90 leading-relaxed mb-6 italic font-light">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>

                  <div>
                    <p className="font-bold text-white text-base">{testimonials[current].name}</p>
                    <p className="text-sm text-white/45 mt-0.5">{testimonials[current].location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation row */}
          <div
            className="flex items-center justify-between px-8 pb-7"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.25rem" }}
          >
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-7 h-2 bg-[#d96c4a] shadow-[0_0_10px_rgba(217,108,74,0.55)]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-[0_4px_12px_-2px_rgba(217,108,74,0.4)]"
                style={{ background: "#d96c4a" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#b8552f"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#d96c4a"; }}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

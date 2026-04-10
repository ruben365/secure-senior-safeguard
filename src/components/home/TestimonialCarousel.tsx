import { useEffect, useRef, useState } from "react";
import { Star, Quote, MapPin } from "lucide-react";

import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";

const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote:
      "We were about to send $5,000 to someone pretending to be our grandson. InVision's safe-word training saved us.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Grandparent Scam",
  },
  {
    name: "Maria T.",
    location: "Springfield, OH",
    quote:
      "The workshop was eye-opening. We've blocked 3 phishing attempts on our small business since.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Owner",
  },
  {
    name: "David & Linda W.",
    location: "Centerville, OH",
    quote:
      "Our parents now know exactly what to do when they get suspicious calls. We sleep better.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Session",
  },
  {
    name: "Harold P.",
    location: "Kettering, OH",
    quote:
      "I used to panic every time the phone rang. Now I know the tricks — even caught a deepfake call last week.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Deepfake Caught",
  },
  {
    name: "Jennifer R.",
    location: "Beavercreek, OH",
    quote:
      "Their team had our practice back up in under an hour after a payroll email got spoofed. Best insurance we ever bought.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Business Rescue",
  },
  {
    name: "Eleanor B.",
    location: "Oakwood, OH",
    quote:
      "I'm 78 and felt completely lost with technology. Their patience with me was incredible — I actually feel confident now.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Senior Training",
  },
  {
    name: "Thomas & Anne G.",
    location: "Miamisburg, OH",
    quote:
      "A romance scammer nearly took our life savings. InVision's team spotted it in minutes when nobody else would listen.",
    rating: 5,
    avatar: instructorJames,
    tag: "Romance Scam",
  },
  {
    name: "Patricia H.",
    location: "Fairborn, OH",
    quote:
      "My identity was stolen and I had no idea where to start. They walked me through every step until it was fully resolved.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Identity Theft",
  },
  {
    name: "Michael S.",
    location: "Huber Heights, OH",
    quote:
      "The AI receptionist they built for my barbershop pays for itself every week. Bookings are up 40%.",
    rating: 5,
    avatar: instructorJames,
    tag: "AI Receptionist",
  },
  {
    name: "Grace & Walter K.",
    location: "Vandalia, OH",
    quote:
      "My husband has dementia and scammers target him daily. InVision set up filters that catch 99% of them before he sees them.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Dementia Support",
  },
  {
    name: "Rev. Daniel F.",
    location: "Troy, OH",
    quote:
      "They trained my entire church congregation for free. A week later a parishioner avoided a $12,000 gift-card scam.",
    rating: 5,
    avatar: instructorJames,
    tag: "Community Outreach",
  },
  {
    name: "Susan & James M.",
    location: "Xenia, OH",
    quote:
      "After the breach at our kids' school we panicked. InVision had us locked down across every device in two evenings.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Lockdown",
  },
];

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

        {/* Mini fade-in cards grid — many testimonials, hover to reveal.
            4 per row on xl so we can pack 12 into a 3-row grid. */}
        <div
          data-reveal
          style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => {
            const isHovered = hoveredIdx === i;
            const anyHovered = hoveredIdx !== null;
            // Staggered rise delay so they don't all pop in at once
            const riseDelay = `${(i % 4) * 60 + Math.floor(i / 4) * 80}ms`;
            return (
              <figure
                key={t.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ transitionDelay: anyHovered ? "0ms" : riseDelay }}
                className={[
                  "group relative rounded-xl p-3 md:p-3.5",
                  "bg-white/85 backdrop-blur-md border border-[#1E293B]/8",
                  "shadow-[0_6px_18px_-10px_rgba(15,23,42,0.15)]",
                  "transition-all [transition-duration:600ms]",
                  "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                  // Smart appear/disappear: when any card is hovered,
                  // unhovered cards dim + shrink and slightly recede,
                  // hovered card floats forward with a warm glow.
                  anyHovered
                    ? isHovered
                      ? "opacity-100 scale-[1.04] -translate-y-1.5 shadow-[0_18px_44px_-14px_rgba(217,108,74,0.35),0_4px_14px_-4px_rgba(15,23,42,0.14)] border-[#d96c4a]/30 z-10"
                      : "opacity-25 scale-[0.97] blur-[0.5px]"
                    : "opacity-90 hover:opacity-100",
                ].join(" ")}
              >
                {/* Floating quote badge — very small */}
                <div
                  aria-hidden="true"
                  className={[
                    "absolute -top-2 -left-2 w-7 h-7 rounded-lg bg-gradient-to-br from-[#d96c4a] to-[#b8552f]",
                    "flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(217,108,74,0.5)] border border-white/30",
                    "transition-all [transition-duration:600ms] ease-out",
                    isHovered ? "rotate-[-8deg] scale-110" : "rotate-0 scale-100",
                  ].join(" ")}
                >
                  <Quote className="w-3 h-3 text-white" strokeWidth={2.5} />
                </div>

                {/* Stars row */}
                <div className="flex gap-0.5 mb-1.5 mt-0.5 ml-6">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-2.5 h-2.5 fill-[#d96c4a] text-[#d96c4a]"
                    />
                  ))}
                </div>

                {/* Quote — clamped to keep every card compact + uniform */}
                <blockquote className="text-[11px] md:text-[11.5px] text-[#475569] leading-snug mb-2.5 italic font-light line-clamp-3">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author row — tight */}
                <figcaption className="flex items-center gap-2 pt-2 border-t border-[#1E293B]/8">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-7 h-7 rounded-full object-cover border border-white shadow-sm flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E293B] text-[10px] leading-tight truncate">
                      {t.name}
                    </div>
                    <div className="text-[9px] text-[#64748B] truncate">
                      {t.location}
                    </div>
                  </div>
                </figcaption>

                {/* Tag pill — appears on hover */}
                <div
                  className={[
                    "absolute top-2 right-2 inline-flex items-center px-1.5 py-px rounded-full",
                    "text-[8px] font-bold uppercase tracking-wider whitespace-nowrap",
                    "bg-[#d96c4a]/12 text-[#d96c4a] border border-[#d96c4a]/25",
                    "transition-all [transition-duration:600ms] ease-out",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0.5",
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

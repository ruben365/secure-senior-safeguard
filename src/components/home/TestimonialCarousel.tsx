import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative z-10 py-14 md:py-20 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative">
        <div className="text-center mb-10">
          <span className="hss-overline mb-4">
            <span className="hss-overline-dot" />
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1E293B] leading-[1.05] tracking-tight mb-3 mt-4"
          >
            What families are saying
          </h2>
          <p className="text-[#6B7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real stories from Ohio families we've helped protect.
          </p>
        </div>

        <div className="hss-card relative rounded-3xl overflow-hidden">
          {/* Top accent strip — orange */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#d96c4a] to-transparent" />

          <div className="p-8 md:p-12">
            <div key={current} className="animate-fade-in">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden ring-1 ring-[#1E293B]/8 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.25)]">
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                        loading="lazy"
                        decoding="async"
                        width={128}
                        height={128}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#d96c4a] flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(217,108,74,0.5)]">
                      <Quote className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] bg-[#d96c4a]/15 text-[#fbab8e] border border-[#d96c4a]/30">
                    {testimonials[current].tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonials[current].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#d96c4a] text-[#d96c4a]"
                        />
                      ),
                    )}
                  </div>
                  <blockquote className="text-lg md:text-xl text-[#1E293B] leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-bold text-[#1E293B] text-lg">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-8 pb-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-[#d96c4a] w-8"
                      : "bg-[#1E293B]/15 hover:bg-[#1E293B]/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-[#1E293B]/12 bg-white hover:bg-[#1E293B]/[0.04] hover:border-[#1E293B]/22 flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-[#1E293B]" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl bg-[#d96c4a] hover:bg-[#b8552f] flex items-center justify-center transition-colors shadow-[0_4px_12px_-2px_rgba(217,108,74,0.4)]"
                aria-label="Next testimonial"
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

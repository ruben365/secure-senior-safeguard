import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";

const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote: "We were about to send $5,000 to someone pretending to be our grandson. InVision's training taught us to use a family safe word — it saved us from devastation.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Grandparent Scam Prevented",
  },
  {
    name: "Maria T.",
    location: "Springfield, OH",
    quote: "As a small business owner, I didn't realize how vulnerable my team was. The workshop was eye-opening. We've since blocked 3 phishing attempts using what we learned.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Owner",
  },
  {
    name: "David & Linda W.",
    location: "Centerville, OH",
    quote: "The private family session was worth every penny. Our parents now know exactly what to do when they get suspicious calls. We sleep better knowing they're protected.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Session",
  },
];

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Families Are <span className="font-display italic text-primary">Saying</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Real stories from Ohio families we've helped protect.
          </p>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card shadow-sm overflow-hidden">
          <div className="p-8 md:p-12">
            <div key={current} className="animate-fade-in">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-border/30">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-20 h-20 md:w-28 md:h-28 object-cover"
                    />
                  </div>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-border/60 bg-muted/50 text-muted-foreground">
                    {testimonials[current].tag}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic font-display">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-foreground text-lg">{testimonials[current].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
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
                    i === current ? "bg-foreground w-8" : "bg-border hover:bg-muted-foreground/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:bg-foreground/90 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-background" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

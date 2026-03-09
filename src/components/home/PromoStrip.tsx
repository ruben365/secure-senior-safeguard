import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "free security assessment",
    desc: "Personalized evaluation of your digital safety",
    date: "Available now",
    location: "Virtual or In-Person",
  },
  {
    num: "02",
    title: "custom protection plan",
    desc: "Tailored strategy for your family or business",
    date: "Within 24 hours",
    location: "Your personalized roadmap",
  },
  {
    num: "03",
    title: "hands-on training workshop",
    desc: "Learn to spot and stop AI-powered scams",
    date: "Weekly sessions",
    location: "Zoom or Dayton, OH",
  },
  {
    num: "04",
    title: "ongoing protection & support",
    desc: "24/7 monitoring and real-time threat alerts",
    date: "Always active",
    location: "Continuous coverage",
  },
];

export const PromoStrip = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Steps list - fitup "exhibition" event list style */}
        <div className="divide-y divide-border/40">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-8 group">
              {/* Number */}
              <span className="text-sm font-bold text-muted-foreground w-8 flex-shrink-0">
                {step.num}
              </span>

              {/* Title - serif lowercase like fitup */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight flex-1 font-display">
                {step.title}
              </h3>

              {/* Details */}
              <div className="text-xs text-muted-foreground flex-shrink-0 md:text-right leading-relaxed">
                <p>{step.date}</p>
                <p>{step.location}</p>
              </div>

              {/* CTA button */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full h-9 px-5 text-xs font-semibold border-foreground/20 hover:bg-foreground hover:text-background transition-all flex-shrink-0 w-fit"
              >
                <Link to="/training#pricing">
                  Reserve Your Spot
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;

import { Shield, Award, Clock, Heart, CheckCircle2, MapPin } from "lucide-react";
import { SITE } from "@/config/site";

const trustIndicators = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    description: "Built by veterans who understand the importance of protecting what matters.",
    stat: "Est. 2024",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    description: `Local, personalized cybersecurity for ${SITE.location.areaLabel}.`,
    stat: "Local Team",
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    description: "Real people ready to help when you need us. No bots, ever.",
    stat: "Always On",
  },
  {
    icon: Heart,
    title: "Family-First",
    description: "Every client is part of our extended family. Your safety is personal.",
    stat: "5,000+",
  },
];

const guarantees = [
  `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`,
  "Privacy-First Practices",
  `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`,
  "Same-Day Threat Response",
];

export const TrustBadgesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built on <span className="font-display italic text-primary">Trust</span> & Integrity
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            We're your neighbors, committed to keeping Ohio families safe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {trustIndicators.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-border/40 bg-card text-center shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="pt-3 border-t border-border/40">
                <p className="text-xl font-black text-foreground">{item.stat}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Bar */}
        <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

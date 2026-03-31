import { Shield, Award, Clock, Heart, CheckCircle2, MapPin } from "lucide-react";
import { SITE } from "@/config/site";

const trustIndicators = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    description: "Built by veterans who understand the importance of protecting what matters.",
    stat: "Est. 2024",
    color: "text-primary",
    bgColor: "bg-blue-50",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    description: `Local, personalized cybersecurity for ${SITE.location.areaLabel}.`,
    stat: "Local Team",
    color: "text-primary",
    bgColor: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    description: "Real people ready to help when you need us. No bots, ever.",
    stat: "Always On",
    color: "text-primary",
    bgColor: "bg-blue-50",
  },
  {
    icon: Heart,
    title: "Family-First",
    description: "Every client is part of our extended family. Your safety is personal.",
    stat: "5,000+",
    color: "text-primary",
    bgColor: "bg-blue-50",
  },
];

const guarantees = [
  { text: `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`, icon: Shield },
  { text: "Privacy-First Practices", icon: CheckCircle2 },
  { text: `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`, icon: Award },
  { text: "Same-Day Threat Response", icon: Clock },
];

export const TrustBadgesSection = () => {
  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex">
            <Shield className="w-3 h-3" />
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 mt-4">
            Built on Trust &amp; Integrity
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We're your neighbors, committed to keeping Ohio families safe.
          </p>
        </div>

        {/* Trust Grid — authority cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {trustIndicators.map((item) => (
            <div
              key={item.title}
              className="authority-card p-6 text-center group cursor-default"
            >
              {/* Background tint */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="credential-icon mx-auto mb-4 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.18)] transition-shadow duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xl font-black text-primary">{item.stat}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Bar — upgraded */}
        <div className="rounded-2xl border border-primary/12 bg-card p-6 md:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/4 via-transparent to-primary/4 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {guarantees.map(({ text, icon: Icon }) => (
              <div key={text} className="guarantee-item">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
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

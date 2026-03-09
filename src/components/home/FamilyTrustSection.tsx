import { Shield, Users, CheckCircle, Clock } from "lucide-react";
import familyTrustHero from "@/assets/family-trust-hero.jpg";
import seniorDeviceSafety from "@/assets/senior-device-safety.jpg";

const stats = [
  { value: "100+", label: "Ohio Families Protected" },
  { value: "24/7", label: "Monitoring & Alerts" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "30-Day", label: "Money-Back Guarantee" },
];

const trustPoints = [
  { text: "24/7 Real-time monitoring and alerts", icon: Clock },
  { text: "Dedicated Ohio-based support team", icon: Users },
  { text: "10% Veteran discount on all services", icon: Shield },
  { text: "30-day money-back guarantee", icon: CheckCircle },
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-20 md:py-28 relative" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card shadow-sm text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Real Protection, Real Results</span>
            <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-3">
              Why Families{" "}
              <span className="font-display italic text-primary">Trust Us</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg">
              Join Ohio families who rely on us for their digital safety every day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden border border-border/30 shadow-sm">
              <img src={familyTrustHero} alt="Happy multigenerational family using tablet together" width={600} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden border border-border/30 shadow-sm mt-8">
              <img src={seniorDeviceSafety} alt="Senior woman safely browsing online" width={600} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-2xl border border-border/30 bg-card shadow-sm">
              <div className="text-2xl md:text-3xl font-black text-foreground mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust points */}
        <div className="rounded-2xl border border-border/30 bg-card p-6 shadow-sm">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Trust guarantees">
            {trustPoints.map((point, i) => (
              <div key={i} role="listitem" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from "lucide-react";

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
    <section className="py-16 lg:py-24" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">Real Protection, Real Results</span>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-3">
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Join Ohio families who rely on us for their digital safety every day.
          </p>
        </div>

        {/* Stats row - numbers-focused */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl md:text-4xl font-black text-foreground mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust points - horizontal strip */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-border/40 p-6 lg:p-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Trust guarantees">
            {trustPoints.map((point, i) => (
              <div key={i} role="listitem" className="flex items-center gap-3 p-3 rounded-xl hover:bg-card/80 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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

import { Shield, Users, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Ohio Families Protected" },
  { icon: Shield, value: "99.2%", label: "Threat Detection Rate" },
  { icon: Award, value: "4.9/5", label: "Customer Rating" },
];

const trustPoints = [
  "24/7 Real-time monitoring & alerts",
  "Dedicated Ohio-based support team",
  "10% Veteran discount on all services",
  "30-day money-back guarantee",
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-br from-white via-lavender-50/30 to-coral-50/20" aria-labelledby="trust-heading">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg md:text-xl font-bold text-coral-500 mb-2">Real Protection, Real Results</p>
          <h2 id="trust-heading" className="text-3xl md:text-4xl font-black text-[#18305A] leading-tight mb-3"
            style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
            Why Families{" "}
            <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            Join thousands of Ohio families who trust us with their digital safety every day.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-5 mb-8" role="list" aria-label="Trust statistics">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              role="listitem"
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center" aria-hidden="true">
                <stat.icon className="w-5 h-5 text-coral-500" />
              </div>
              <div className="text-2xl font-black text-[#18305A] mb-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60" aria-label={`${stat.value} ${stat.label}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Points */}
        <div className="bg-gradient-to-r from-[#18305A] to-[#2a4a7a] rounded-xl p-5 lg:p-6" role="list" aria-label="Trust guarantees">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {trustPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-2" role="listitem">
                <CheckCircle className="w-4 h-4 text-coral-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-white/90 text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
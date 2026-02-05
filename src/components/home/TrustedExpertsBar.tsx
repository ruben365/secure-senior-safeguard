import { Star, Shield, Award, Users, Sparkles } from "lucide-react";

const stats = [
  { label: "Families Protected", value: "500+", icon: Users },
  { label: "Success Rate", value: "99.8%", icon: Shield },
  { label: "Client Rating", value: "5.0", icon: Star },
  { label: "Years Active", value: "4+", icon: Award },
];

export const TrustedExpertsBar = () => {
  return (
    <section className="relative py-8 bg-[#0a0a0a] border-y border-white/5">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-400/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Stats Grid */}
          <div className="flex items-center gap-8 lg:gap-16 overflow-x-auto pb-2 w-full justify-center lg:justify-start">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-none bg-white/5 flex items-center justify-center border border-white/10">
                  <stat.icon className="w-5 h-5 text-coral-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 font-medium">{stat.label}</div>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden lg:block w-px h-12 bg-white/10 ml-8" />
                )}
              </div>
            ))}
          </div>

          {/* CTA - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <div className="h-12 w-px bg-white/10" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-white/40 uppercase tracking-wider">Veteran Discount</div>
                <div className="text-xl font-black text-coral-400">10% OFF</div>
              </div>
              <div className="w-12 h-12 bg-coral-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0a0a0a]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender-500/20 to-transparent" />
    </section>
  );
};
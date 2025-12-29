import { Shield, Users, Award, Zap } from "lucide-react";

const stats = [
  { value: "500+", label: "Families Protected", icon: Shield },
  { value: "98%", label: "Success Rate", icon: Award },
  { value: "24/7", label: "AI Monitoring", icon: Zap },
  { value: "50+", label: "Partners", icon: Users },
];

const techPartners = [
  "OpenAI",
  "Google AI", 
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Meta AI",
  "NVIDIA",
  "Cloudflare",
  "Stripe"
];

const TrustedTechLogos = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-y border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Partners Marquee */}
      <div className="bg-slate-950 py-4 border-b border-white/5">
        <div className="relative overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll-left items-center">
            {[...techPartners, ...techPartners, ...techPartners].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                <span className="text-sm font-medium text-white/50 hover:text-white/80 transition-colors duration-300 whitespace-nowrap tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Badge */}
        <div className="text-center mt-3">
          <p className="text-[10px] text-white/30 tracking-widest uppercase">
            Enterprise Security • SOC 2 Compliant • Bank-Level Encryption
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;

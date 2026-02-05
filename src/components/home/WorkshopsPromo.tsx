import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target, GraduationCap, CheckCircle } from "lucide-react";

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Identify AI scams" },
  { icon: Shield, title: "4-Step Protection", desc: "Proven method" },
  { icon: Target, title: "Protection Tiers", desc: "Choose your level" },
  { icon: Eye, title: "Threat Analysis", desc: "Real-time alerts" },
];

const pricingTiers = [
  { name: "Group", price: "$79", desc: "per person" },
  { name: "Family", price: "$199", desc: "up to 4 people", featured: true },
  { name: "Private", price: "$299", desc: "1-on-1 session" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#faf9f7] overflow-hidden">
      {/* Editorial grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/5" />
        <div className="absolute left-0 right-0 top-1/3 h-px bg-foreground/5" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Content */}
          <div className="space-y-8">
            {/* Section label */}
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-coral-400" />
              <span className="text-coral-500 text-xs font-bold tracking-[0.3em] uppercase">Learn & Train</span>
            </div>
            
            {/* Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              Protect Your<br />
              <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Family</span> From<br />
              AI Scams
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Scammers now use deepfakes and voice cloning. Our expert-led workshops teach you to recognize and stop these sophisticated threats.
            </p>
            
            {/* Services Grid - Minimal */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {services.map((service) => (
                <div key={service.title} className="flex items-start gap-3 group cursor-default">
                  <div className="w-10 h-10 bg-foreground flex items-center justify-center flex-shrink-0 group-hover:bg-coral-500 transition-colors">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{service.title}</div>
                    <div className="text-sm text-muted-foreground">{service.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button asChild size="lg" 
                className="group h-14 px-8 text-base font-semibold rounded-none border-0"
                style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                <Link to="/training" className="text-white">
                  <GraduationCap className="mr-2 w-5 h-5" />
                  View Workshops
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Pricing Cards */}
          <div className="space-y-6">
            {/* Pricing header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Workshop Pricing</span>
              <div className="flex items-center gap-2 text-coral-500">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">10% Veteran Discount</span>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="space-y-4">
              {pricingTiers.map((tier) => (
                <div key={tier.name} 
                  className={`relative p-6 transition-all hover:-translate-y-1 cursor-pointer ${
                    tier.featured 
                      ? 'bg-foreground text-white' 
                      : 'bg-white border border-foreground/10'
                  }`}>
                  {tier.featured && (
                    <div className="absolute -top-3 right-6 px-3 py-1 bg-coral-400 text-xs font-bold text-white">
                      BEST VALUE
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-black ${tier.featured ? 'text-white' : 'text-foreground'}`}
                        style={{ fontFamily: "'Clash Display', sans-serif" }}>
                        {tier.name}
                      </div>
                      <div className={`text-sm ${tier.featured ? 'text-white/60' : 'text-muted-foreground'}`}>
                        {tier.desc}
                      </div>
                    </div>
                    <div className={`text-4xl font-black ${tier.featured ? 'text-coral-400' : 'text-foreground'}`}
                      style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {tier.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4">
              {['HIPAA Protected', '30-Day Guarantee'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
                  <span className="text-sm text-muted-foreground font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, TrendingUp, Zap } from "lucide-react";

const services = [
  { icon: Phone, title: "AI Receptionist", price: "$9,500", desc: "24/7 call handling" },
  { icon: Calendar, title: "Smart Scheduling", price: "Custom", desc: "Automated bookings" },
  { icon: Bot, title: "AI Automation", price: "$25K+", desc: "Custom workflows" },
  { icon: Globe, title: "Website Design", price: "$1,500+", desc: "Full-stack sites" },
];

export const AIBusinessPromo = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#faf9f7] overflow-hidden">
      {/* Asymmetric layout lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-foreground/5" />
        <div className="absolute left-0 right-0 bottom-1/4 h-px bg-foreground/5" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left - Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section label */}
            <div className="flex items-center gap-4">
              <div className="h-px w-16 bg-lavender-500" />
              <span className="text-lavender-600 text-xs font-bold tracking-[0.3em] uppercase">AI & Business</span>
            </div>
            
            {/* Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              Stop Missing<br />
              Calls. <span className="bg-gradient-to-r from-lavender-500 to-coral-500 bg-clip-text text-transparent">Let AI<br />Handle It.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Transform your business with AI-powered automation. Solutions that work 24/7 so you never miss an opportunity.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-12 py-6 border-y border-foreground/10">
              <div>
                <div className="text-5xl font-black text-foreground" style={{ fontFamily: "'Clash Display', sans-serif" }}>340%</div>
                <div className="text-sm text-muted-foreground">Average ROI</div>
              </div>
              <div className="h-12 w-px bg-foreground/10" />
              <div>
                <div className="text-5xl font-black text-foreground" style={{ fontFamily: "'Clash Display', sans-serif" }}>62%</div>
                <div className="text-sm text-muted-foreground">Calls Missed</div>
              </div>
              <div className="h-12 w-px bg-foreground/10" />
              <div>
                <div className="text-5xl font-black text-coral-500" style={{ fontFamily: "'Clash Display', sans-serif" }}>$500</div>
                <div className="text-sm text-muted-foreground">Per Missed Call</div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button asChild size="lg" 
                className="group h-14 px-8 text-base font-semibold rounded-none border-0 bg-foreground text-white hover:bg-foreground/90">
                <Link to="/business">
                  <Zap className="mr-2 w-5 h-5" />
                  Explore Solutions
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Services Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* ROI highlight card */}
            <div className="p-8 bg-foreground text-white">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-coral-400" />
                <span className="text-sm font-bold uppercase tracking-wider text-white/60">Average ROI</span>
              </div>
              <div className="text-6xl font-black mb-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>340%</div>
              <div className="text-white/60">Within first 6 months of implementation</div>
            </div>

            {/* Services */}
            {services.map((service) => (
              <div key={service.title} 
                className="p-6 bg-white border border-foreground/10 flex items-center justify-between hover:border-lavender-500/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-foreground/5 flex items-center justify-center group-hover:bg-lavender-500/10 transition-colors">
                    <service.icon className="w-6 h-6 text-foreground group-hover:text-lavender-600 transition-colors" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{service.title}</div>
                    <div className="text-sm text-muted-foreground">{service.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-foreground">{service.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
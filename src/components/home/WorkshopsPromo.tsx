import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target } from "lucide-react";
import seniorLearning from "@/assets/protection-training-workshop.jpg";

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Spot AI-powered scams before they reach you" },
  { icon: Shield, title: "4-Step Protection", desc: "A proven process for your digital safety" },
  { icon: Target, title: "Protection Tiers", desc: "Security plans sized to your needs" },
  { icon: Eye, title: "Threat Analysis", desc: "Active monitoring with real-time alerts" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="py-20 lg:py-28 relative" aria-labelledby="workshops-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Media - Left */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-sm border border-border/30">
              <img src={seniorLearning} alt="Protection Training Workshop" className="w-full h-full object-cover" width={800} height={600} loading="lazy" decoding="async" />
            </div>

            {/* Floating widget */}
            <div className="absolute -bottom-5 -right-3 lg:-right-6 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-black text-sm">99%</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Success Rate</div>
                  <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content - Right */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card shadow-sm text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Learn & Train</span>
              <h2 id="workshops-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4">
                Why Families Choose Our{" "}
                <span className="font-display italic text-primary">Protection Training</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Scammers now use deepfakes and voice cloning to target you. Our expert-led workshops show you how to recognize and stop these threats.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 p-5 rounded-2xl bg-muted/50 border border-border/30">
              <div>
                <div className="text-3xl font-black text-foreground">100+</div>
                <div className="text-xs text-muted-foreground">Families Protected</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="text-3xl font-black text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Services">
              {services.map((service) => (
                <div key={service.title} role="listitem" className="p-3 rounded-xl border border-border/30 bg-card hover:border-primary/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{service.title}</div>
                      <div className="text-xs text-muted-foreground">{service.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="rounded-full h-11 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm uppercase tracking-wider">
              <Link to="/training">
                Start Training <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

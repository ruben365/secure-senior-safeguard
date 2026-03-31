import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: FileSearch,
    title: "Free Assessment",
    desc: "We evaluate your current digital safety and identify vulnerabilities — no cost, no obligation.",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Custom Plan",
    desc: "Receive a tailored protection strategy designed specifically for your family or business needs.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Get Protected",
    desc: "Activate your defenses with hands-on training, AI-powered tools, and 24/7 expert support.",
  },
];

export const PromoStrip = () => {
  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label mb-4 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 mt-4">
            Three Steps to Safety
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Getting protected is simple. We handle the complexity so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector arrow — desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-[3.5rem] -right-3 z-10 items-center">
                  <div className="w-6 border-t-2 border-dashed border-primary/30" />
                  <ArrowRight className="w-3.5 h-3.5 text-primary/40 -ml-0.5" />
                </div>
              )}

              <div className="authority-card p-7 h-full">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />

                <div className="relative">
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="step-badge">{step.num}</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    <div className="credential-icon w-12 h-12 rounded-xl">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="cta-signal border-0 shadow-none h-12 px-8">
            <Link to="/training#pricing">
              Start Your Free Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;

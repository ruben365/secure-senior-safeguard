import { FileText, Search, Shield, Smile } from "lucide-react";

const steps = [
  { step: "01", icon: FileText, title: "Share Your Details", description: "Tell us about your security concerns and what you need." },
  { step: "02", icon: Search, title: "Pick a Plan", description: "Our experts recommend the right protection package for your situation." },
  { step: "03", icon: Shield, title: "We Assess & Protect", description: "We analyze your digital footprint and close vulnerabilities." },
  { step: "04", icon: Smile, title: "Enjoy Peace of Mind", description: "Rest easy with 24/7 monitoring and ongoing support from our team." },
];

export const WorkingProcess = () => {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="process-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 block">How It Works</span>
          <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-3">
            Get Protected in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Four Steps</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Our process makes getting protected simple and stress-free.
          </p>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Protection steps">
            {steps.map((step, index) => (
              <div key={index} role="listitem" className="group relative text-center">
                {/* Step number circle */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                  <span className="text-xl font-black text-white">{step.step}</span>
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;

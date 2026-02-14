import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { SITE } from "@/config/site";
import consultingTeamStrategy from "@/assets/consulting-team-strategy.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", desc: "Your phones answered 24/7 by an AI assistant", price: "From $299/mo" },
  { icon: Calendar, title: "Smart Scheduling", desc: "Automated appointment booking and reminders", price: "From $199/mo" },
  { icon: Bot, title: "AI Automation", desc: "Custom workflows that save hours every week", price: "From $499/mo" },
];

const features = ["Digital Marketing", "Search Engine Optimization", "E-Commerce Solutions", "AI Consultation"];

export const AIBusinessPromo = () => {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="business-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Full-width image banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 group">
          <img
            src={consultingTeamStrategy}
            alt="Professional consulting team strategy meeting"
            className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-700"
            width={1200} height={514} loading="lazy" decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3 block">AI & Business Solutions</span>
            <h2 id="business-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-3">
              Digital Solutions That Work 24/7
            </h2>
            <p className="text-white/70 text-base max-w-lg">
              Grow your business with AI-powered automation. Phones answered, appointments booked, customers supported around the clock.
            </p>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12" role="list" aria-label="Business services">
          {services.map((service) => (
            <Link key={service.title} to="/business" role="listitem"
              className="group bg-card rounded-2xl border border-border/60 p-6 hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">{service.price}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                See Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom feature strip */}
        <div className="bg-muted/30 rounded-2xl border border-border/40 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent">4+ Years Experience</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Your Growth, Powered by Expert Consultants
              </h3>
              <div className="grid grid-cols-2 gap-2" role="list" aria-label="Services offered">
                {features.map((feature) => (
                  <div key={feature} role="listitem" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all">
                <Link to="/business">See All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <a href={`tel:${SITE.phone.e164}`} className="text-sm font-semibold text-center text-primary hover:text-accent transition-colors">
                {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

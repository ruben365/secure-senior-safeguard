import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Users, Award, Lock, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

import seniorLearning from "@/assets/senior-learning.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import communityWorkshop from "@/assets/community-workshop-real.jpg";
import seniorDevice from "@/assets/senior-device-safety.jpg";

const teamImage = "/images/team-cybersecurity-office.webp";

/* Animated counter hook */
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

const stats = [
  { target: 5000, suffix: "+", label: "Families Protected", icon: Shield },
  { target: 99, suffix: "%", label: "Detection Rate", icon: Zap },
  { target: 24, suffix: "/7", label: "Expert Support", icon: Users },
  { target: 10, suffix: "%", label: "Veteran Discount", icon: Award },
];

function useInView(margin = "-50px") {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);
  return { ref, isInView: inView };
}


function StatCard({
  target,
  suffix,
  label,
  icon: Icon,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <AnimatedSection animation="fade-up" delay={index * 80}>
      <div
        ref={ref}
        className="relative text-center p-4 md:p-5 rounded-xl border border-border/30 bg-card/80 backdrop-blur-sm overflow-hidden hover:-translate-y-1 transition-all duration-300"
      >
        {/* Abstract ombre background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.06] pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/[0.06] rounded-full blur-2xl pointer-events-none" />
        <div className="relative">
          <Icon className="w-5 h-5 text-primary/60 mx-auto mb-2" />
          <div className="text-2xl md:text-3xl font-black text-foreground leading-none mb-1">
            {value.toLocaleString()}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{suffix}</span>
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export const HomeIntroSection = () => {
  const { ref: introRef, isInView } = useInView("-50px");
  const { ref: bentoRef, isInView: bentoInView } = useInView("-50px");

  return (
    <>
      {/* Stats Counter Bar — compact */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background pointer-events-none" />
        <div className="container mx-auto md:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ohio's Trusted Partner — compact two-column */}
      <section className="py-10 md:py-16" ref={introRef as React.RefObject<HTMLElement>}>
        <div className="container mx-auto md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left — Copy */}
            <AnimatedSection animation="fade-up" className={isInView ? "opacity-100" : "opacity-0"}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                Who We Are
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-[1.15] mb-4">
                Ohio's Trusted Partner in{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Cybersecurity</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
                Scammers are using AI to clone voices, create deepfakes, and
                target seniors. We give families and businesses the tools,
                training, and support to fight back.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                <strong className="text-foreground">Veteran-founded and community-driven</strong>, we've helped over 5,000 families across Ohio stay safe.
              </p>

              {/* Trust points — compact grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { icon: Shield, text: "AI-Powered Detection" },
                  { icon: Users, text: "Family Plans" },
                  { icon: Lock, text: "Privacy-First" },
                  { icon: Eye, text: "24/7 Monitoring" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-border/30">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button asChild size="default">
                  <Link to="/training#pricing">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> {SITE.phone.display}
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            {/* Right — Image grid with abstract ombre overlays */}
            <AnimatedSection animation="fade-up" delay={150} className="relative">
              <div className="grid grid-cols-2 gap-2.5">
                {/* Large image */}
                <div className="col-span-2 relative rounded-xl overflow-hidden group">
                  <img
                    src={teamImage}
                    alt="Our cybersecurity operations center"
                    className="w-full h-40 md:h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Abstract ombre overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/0.6)] via-[hsl(var(--primary)/0.15)] to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">Expert-Led Security Operations</p>
                    <p className="text-white/80 text-xs">24/7 Monitoring & Threat Response</p>
                  </div>
                </div>

                {/* Two smaller images */}
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={familyGathering}
                    alt="Family gathering for safety training"
                    className="w-full h-28 md:h-36 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--accent)/0.5)] via-transparent to-[hsl(var(--primary)/0.08)]" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-white font-bold text-xs">Family Plans</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={communityWorkshop}
                    alt="Community workshop"
                    className="w-full h-28 md:h-36 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/0.5)] via-transparent to-[hsl(var(--accent)/0.08)]" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-white font-bold text-xs">Community Events</p>
                  </div>
                </div>
              </div>

              {/* Floating stat — compact */}
              <div className={`absolute -top-3 -right-3 z-10 transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="rounded-xl p-2.5 bg-card/95 backdrop-blur-md border border-border/40 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground leading-none">99%</p>
                      <p className="text-[11px] text-muted-foreground">Detection</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Real Results — compact bento */}
      <section className="py-10 md:py-16 bg-muted/20 relative overflow-hidden" ref={bentoRef as React.RefObject<HTMLElement>}>
        <div className="container mx-auto md:px-6 lg:px-8 relative">
          <div className={`text-center mb-8 transition-all duration-500 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Real Results
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Protecting What Matters Most
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              See how we're making a real difference for Ohio families every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {/* Large card with image */}
            <div className={`md:col-span-2 relative rounded-xl overflow-hidden group min-h-[200px] hover:-translate-y-1 transition-all duration-400 ${bentoInView ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={seniorDevice}
                alt="Senior couple using devices safely"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              {/* Abstract ombre gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.7)] via-[hsl(var(--primary)/0.3)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground)/0.4)] via-transparent to-transparent" />
              <div className="relative p-6 flex flex-col justify-end h-full">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-xs font-bold text-white w-fit mb-2">
                  <Shield className="w-3 h-3" /> Success Story
                </span>
                <h3 className="text-xl font-bold text-white mb-1">$1.2M+ Saved for Families</h3>
                <p className="text-white/85 text-sm max-w-md leading-relaxed">
                  Our detection systems have prevented over $1.2 million in losses from scams, phishing, and AI voice cloning.
                </p>
              </div>
            </div>

            {/* Stat card */}
            <div className={`rounded-xl border border-border/40 bg-card p-5 flex flex-col justify-between overflow-hidden relative hover:-translate-y-1 transition-all duration-400 ${bentoInView ? 'opacity-100' : 'opacity-0'}`}>
              {/* Abstract ombre */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.06] pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/[0.08] rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">Instant Threat Analysis</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Forward any suspicious email, text, or call. Our AI analyzes it in seconds.
                </p>
              </div>
              <div className="relative mt-3 pt-3 border-t border-border/40">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2,847</span>
                  <span className="text-xs text-muted-foreground">blocked this month</span>
                </div>
              </div>
            </div>

            {/* Two small cards */}
            <div className={`rounded-xl border border-border/40 bg-card p-4 overflow-hidden relative hover:-translate-y-1 transition-all duration-400 ${bentoInView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-primary/[0.04] pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent/[0.06] rounded-full blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent/15 to-primary/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-black text-foreground leading-none">4.9★</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Client Rating</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground relative">Trusted by families across the Greater Dayton area.</p>
            </div>

            <div className={`rounded-xl border border-border/40 bg-card p-4 overflow-hidden relative hover:-translate-y-1 transition-all duration-400 ${bentoInView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/[0.06] rounded-full blur-2xl pointer-events-none" />
              <div className="relative flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-black text-foreground leading-none">100%</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Data Safe</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground relative">We never sell data. Privacy-first encryption keeps your information secure.</p>
            </div>

            {/* Testimonial card */}
            <div className={`rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.03] via-card to-accent/[0.03] p-4 overflow-hidden relative hover:-translate-y-1 transition-all duration-400 ${bentoInView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative">
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-accent text-xs">★</span>
                  ))}
                </div>
                <blockquote className="text-xs text-foreground italic leading-relaxed mb-2">
                  "InVision Network saved my mother from a $8,000 grandparent scam. The AI detected the voice clone instantly."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary">JM</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Jennifer M.</p>
                    <p className="text-[11px] text-muted-foreground">Dayton, OH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Users, Award, CheckCircle, Lock, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";

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

export const HomeIntroSection = () => {
  return (
    <>
      {/* WHY INVISION WORKS - centered section like fitup */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Pill badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/60 bg-card shadow-sm">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">Why InVision Works</span>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-14 leading-relaxed">
            We go beyond basic protection by empowering you with insights and guidance to
            boost your digital safety, enhance protection, and improve your family's peace of mind.
          </p>

          {/* Bento image grid - fitup "how it works" style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="col-span-2 rounded-3xl overflow-hidden shadow-sm border border-border/30">
              <img src={teamImage} alt="Our cybersecurity operations center" className="w-full h-56 md:h-72 object-cover" loading="lazy" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-sm border border-border/30 bg-muted/50 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">AI Detection</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-sm border border-border/30 bg-muted/50 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <p className="text-sm font-bold text-foreground">Family Safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIT YOUR BODY - split layout like fitup "balanced meals" section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6">
                Protect your family with{" "}
                <span className="font-display italic text-primary">tailored</span> security
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                With options for every protection preference, including personal,
                family, and business, our programs are
                designed to help you stay safe from AI-powered threats while
                staying on track with your digital life goals.
              </p>

              {/* Toggle buttons like fitup Non Vegan / Vegan */}
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  Family Plans
                </div>
                <Link
                  to="/training#pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  Start Training <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <Button asChild variant="outline" size="lg" className="rounded-full h-11 font-medium">
                <a href={`tel:${SITE.phone.e164}`}>
                  <Phone className="w-4 h-4 mr-2" /> {SITE.phone.display}
                </a>
              </Button>
            </div>

            {/* Right — Image Bento Grid with floating widget */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-sm border border-border/30">
                  <img
                    src={seniorDevice}
                    alt="Senior couple using devices safely"
                    className="w-full h-52 md:h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-sm border border-border/30">
                  <img
                    src={familyGathering}
                    alt="Family gathering for safety training"
                    className="w-full h-36 md:h-44 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-sm border border-border/30">
                  <img
                    src={communityWorkshop}
                    alt="Community workshop"
                    className="w-full h-36 md:h-44 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating calorie-like widget */}
              <div className="absolute -top-4 -right-4 lg:right-4 z-10">
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground">2,847</p>
                      <p className="text-[10px] text-muted-foreground">threats blocked/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Results - stat counters */}
      <section className="py-14 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {[
              { target: 5000, suffix: "+", label: "Families Protected", icon: Shield },
              { target: 99, suffix: "%", label: "Detection Rate", icon: Zap },
              { target: 24, suffix: "/7", label: "Expert Support", icon: Users },
              { target: 10, suffix: "%", label: "Veteran Discount", icon: Award },
            ].map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

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
  icon: any;
  index: number;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-2xl border border-border/40 bg-card shadow-sm"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-black text-foreground mb-1">
        {value.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

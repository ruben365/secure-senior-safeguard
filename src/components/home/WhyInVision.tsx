import { useRef, useState, useEffect } from "react";
import {
  Shield, Users, Award, Clock, Heart, MapPin, Zap,
  Lock, Eye, Fingerprint, Brain,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SITE } from "@/config/site";
import familyTrustHero from "@/assets/family-trust-hero.jpg";
import seniorDeviceSafety from "@/assets/senior-device-safety.jpg";

/* ── Animated counter hook ── */
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
  { target: 99,   suffix: "%", label: "Detection Rate",     icon: Zap },
  { target: 24,   suffix: "/7", label: "Expert Support",    icon: Users },
  { target: 10,   suffix: "%",  label: "Veteran Discount",  icon: Award },
];

const features = [
  {
    num: "01",
    icon: Brain,
    title: "AI-Powered Detection",
    desc: "Our machine learning engine analyzes calls, texts, and emails in real-time to catch scams before they reach you.",
  },
  {
    num: "02",
    icon: Fingerprint,
    title: "Voice Clone Protection",
    desc: "Advanced biometric analysis detects AI-generated voice clones attempting to impersonate your loved ones.",
  },
  {
    num: "03",
    icon: Eye,
    title: "Deepfake Scanning",
    desc: "Real-time video and image analysis identifies manipulated media targeting your family.",
  },
  {
    num: "04",
    icon: Lock,
    title: "Privacy-First",
    desc: "Your data stays yours. Zero data selling, end-to-end encryption, and full GDPR compliance.",
  },
];

const trustCards = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    desc: "Built by veterans who understand protecting what matters.",
    stat: "Est. 2024",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    desc: `Local cybersecurity for ${SITE.location.areaLabel}.`,
    stat: "Local Team",
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    desc: "Real people ready to help. No bots, ever.",
    stat: "Always On",
  },
  {
    icon: Heart,
    title: "Family-First",
    desc: "Every client is part of our extended family.",
    stat: "5,000+",
  },
];

export const WhyInVision = () => {
  return (
    <section className="fancy-section relative" aria-labelledby="why-invision-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Section header ── */}
        <AnimatedSection animation="fade-up">
          <div className="mb-16 md:mb-24 max-w-3xl">
            <div className="fancy-label mb-6">
              <Shield className="w-3 h-3" />
              Why Choose Us
            </div>
            <h2 id="why-invision-heading" className="text-display-sm text-foreground mb-5">
              Ohio's Trusted Partner in{" "}
              <span className="gradient-text">Cybersecurity</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Scammers are using AI to clone voices, create deepfakes, and target
              seniors. We give families and businesses the tools to fight back.
            </p>
          </div>
        </AnimatedSection>

        {/* ── FANCY numbered features — 2-column with large step numbers ── */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-5 mb-20 md:mb-28">
          {features.map((feat, i) => (
            <AnimatedSection key={feat.num} animation="fade-up" delay={i * 100}>
              <div className="fancy-card rounded-2xl p-7 sm:p-8 h-full group">
                <div className="flex items-start gap-5">
                  {/* Large outlined number */}
                  <div className="fancy-step-num shrink-0 mt-1">{feat.num}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="fancy-icon">
                        <feat.icon className="w-5 h-5 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{feat.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── Photo + trust row ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 md:mb-28">
          {/* Photos */}
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src={familyTrustHero}
                  alt="Multigenerational family using tablet together"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-border mt-10">
                <img
                  src={seniorDeviceSafety}
                  alt="Senior woman safely browsing online"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Trust cards */}
          <div className="grid grid-cols-2 gap-3">
            {trustCards.map((card, i) => (
              <AnimatedSection key={card.title} animation="fade-up" delay={i * 80}>
                <div className="fancy-card rounded-2xl p-5 h-full">
                  <div className="fancy-icon mb-4 w-10 h-10">
                    <card.icon className="w-4 h-4 text-foreground/35" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{card.desc}</p>
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">{card.stat}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* ── Animated counter stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-16 md:mb-20">
          {stats.map((stat, i) => {
            const { value, ref } = useCountUp(stat.target);
            return (
              <AnimatedSection key={stat.label} animation="fade-up" delay={i * 100}>
                <div
                  ref={ref}
                  className="text-center p-6 sm:p-8 rounded-2xl fancy-card"
                >
                  <stat.icon className="w-5 h-5 text-foreground/20 mx-auto mb-3" />
                  <div className="fancy-stat text-foreground mb-1.5">
                    {value.toLocaleString()}
                    <span className="gradient-text">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* ── Guarantee strip ── */}
        <AnimatedSection animation="fade-up">
          <div className="fancy-card rounded-2xl p-5 md:p-7">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" role="list" aria-label="Guarantees">
              {[
                { text: `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`, icon: Shield },
                { text: "Privacy-First Practices", icon: Lock },
                { text: `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`, icon: Award },
                { text: "Same-Day Threat Response", icon: Clock },
              ].map((g) => (
                <div key={g.text} role="listitem" className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-8 h-8 rounded-full bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center flex-shrink-0">
                    <g.icon className="w-4 h-4 text-foreground/30" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{g.text}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

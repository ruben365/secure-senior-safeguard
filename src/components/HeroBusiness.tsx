import { useCallback } from "react";
import {
  Cpu, Bot, ShieldCheck, Cog, Shield, Clock, MapPin, Award,
} from "lucide-react";
import businessHero from "@/assets/hero-ai-business-unified.jpg";
import { HeroCTA } from "@/components/shared/HeroCTA";

/* ── Bottom feature cards — varied backgrounds ── */
const businessFeatures = [
  {
    icon: Cpu,
    label: "AI",
    title: "AI Receptionist",
    desc: "Your phone gets answered 24/7. Calls routed, appointments booked automatically.",
    target: "svc-ai-receptionist",
    variant: "dark" as const,
  },
  {
    icon: Bot,
    label: "AI",
    title: "Smart Scheduling",
    desc: "Automate repetitive tasks for maximum efficiency.",
    target: "svc-smart-scheduling",
    variant: "accent" as const,
  },
  {
    icon: ShieldCheck,
    label: "AI",
    title: "Scam Protection & Insurance",
    desc: "Forecast threats and protect your business assets.",
    target: "svc-support-bot",
    variant: "dark" as const,
  },
  {
    icon: Cog,
    title: "Business Automation",
    desc: "Train custom AI models on your own business data.",
    target: "svc-intake-automation",
    variant: "light" as const,
  },
];

export const HeroBusiness = ({ onStrategyCall }: { onStrategyCall: () => void }) => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="hero-biz">

      {/* ── Background — image on right, dark on left ── */}
      <div className="hero-biz__bg">
        <img
          src={businessHero}
          alt="InVision Network — AI Solutions"
          loading="eager"
          decoding="sync"
        />
        <div className="hero-biz__top-veil" />
        {/* Mobile: darken top so text is readable over photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-transparent sm:hidden" aria-hidden="true" />
        <div className="hero-biz__glow" aria-hidden="true" />
      </div>

      {/* Mobile status badge */}
      <div className="sm:hidden absolute top-[88px] inset-x-0 flex justify-center z-20 px-4 pointer-events-none" aria-hidden="true">
        <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 border border-white/15" style={{background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)"}}>
          <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-white/90 tracking-wider uppercase">AI Systems Online</span>
        </div>
      </div>

      {/* ── Hero Content: Left text only ── */}
      <div className="hero-biz__content [justify-content:flex-start] sm:[justify-content:center] [padding-top:6rem] sm:[padding-top:unset]">
        <div className="hero-biz__copy">

          <h1 className="hero-biz__headline">
            AI Solutions for
            <br />
            Cybersecurity &amp; Business Growth
          </h1>

          {/* Mobile tagline */}
          <p className="sm:hidden text-xs text-white/55 mt-2 mb-0 leading-snug">
            Scalable AI for Ohio businesses of all sizes.
          </p>

          <p className="hero-biz__body">
            Build advanced AI systems to optimize processes,
            strengthen data security, and drive growth in your digital
            infrastructure. Scalable tools for modern business challenges.
          </p>

          <HeroCTA
            primaryText="Request Demo"
            primaryHref="/contact"
            secondaryText="Learn More"
            secondaryHref="/library"
            aiScan
          />

          {/* Mobile fine print */}
          <p className="sm:hidden text-[10px] text-white/40 mt-2 leading-snug">
            Free strategy call · No commitment required
          </p>

          {/* Mobile-only: compact trust indicators */}
          <div className="sm:hidden flex flex-wrap items-center gap-y-2 mt-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60">
              <Clock className="w-3 h-3 text-orange-400/75 flex-shrink-0" />
              24/7 Monitoring
              <span className="mx-2 text-white/25 select-none" aria-hidden="true">·</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60">
              <MapPin className="w-3 h-3 text-orange-400/75 flex-shrink-0" />
              Ohio-Based
              <span className="mx-2 text-white/25 select-none" aria-hidden="true">·</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/60">
              <Award className="w-3 h-3 text-orange-400/75 flex-shrink-0" />
              Veteran Owned
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Feature Cards ── */}
      <div className="hero-biz__panel">
        <div className="hero-biz__panel-inner">
          <div className="hero-biz__feature-row">
            {businessFeatures.map((f) => (
              <button
                key={f.title}
                type="button"
                className={`hero-biz__feature hero-biz__feature--${f.variant}`}
                onClick={() => scrollTo(f.target)}
              >
                {/* Icon + Title side by side at top */}
                <div className="hero-biz__feature-top">
                  <div className="hero-biz__feature-icon">
                    <f.icon />
                  </div>
                  <div className="hero-biz__feature-info">
                    {f.label && <span className="hero-biz__feature-label">{f.label}</span>}
                    <p className="hero-biz__feature-title">{f.title}</p>
                  </div>
                </div>
                <p className="hero-biz__feature-desc">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBusiness;

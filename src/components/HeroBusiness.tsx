import { useCallback } from "react";
import {
  Cpu, Bot, ShieldCheck, Cog,
} from "lucide-react";
import businessHero from "@/assets/hero-ai-business-unified.jpg";

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
          fetchPriority="high"
        />
        <div className="hero-biz__top-veil" />
        <div className="hero-biz__glow" aria-hidden="true" />
      </div>

      {/* ── Hero Content: Left text only ── */}
      <div className="hero-biz__content">
        <div className="hero-biz__copy">

          <h1 className="hero-biz__headline">
            AI Solutions Build
            <br />
            Cyberspace
            <br />
            Business Success
          </h1>

          <p className="hero-biz__body">
            Build advanced AI systems to optimize processes,
            strengthen data security, and drive growth in your digital
            infrastructure. Scalable tools for modern business challenges.
          </p>

          <div className="hero-biz__ctas">
            <button type="button" className="hero-biz__cta hero-biz__cta--primary" onClick={onStrategyCall}>
              Request Demo
            </button>
            <button type="button" className="hero-biz__cta hero-biz__cta--secondary" onClick={() => scrollTo("services")}>
              Learn More
            </button>
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

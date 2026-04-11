import { useCallback } from "react";
import {
  Cpu, Bot, Shield, ShieldCheck, Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import businessHero from "@/assets/hero-ai-business-unified.jpg";

const highPriorityImageProps = { fetchpriority: "high" } as const;

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
    title: "Scam Protection",
    desc: "Spot suspicious activity early and protect your team from costly fraud.",
    target: "svc-support-bot",
    variant: "dark" as const,
  },
  {
    icon: Shield,
    label: "AI",
    title: "Insurance",
    desc: "Support business continuity with coverage-aligned workflows and response plans.",
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
          alt="InVision Network AI Workshop team building secure automation systems"
          loading="eager"
          decoding="sync"
          {...highPriorityImageProps}
        />
        <div className="hero-biz__top-veil" />
        <div className="hero-biz__glow" aria-hidden="true" />
      </div>

      {/* ── Hero Content: Left text only ── */}
      <div className="hero-biz__content">
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-8">
        <div className="hero-biz__copy">

          <h1 className="hero-biz__headline">
            AI Workshop Systems
            <br />
            for Modern
            <br />
            Business Teams
          </h1>

          <p className="hero-biz__body">
            Plan, deploy, and support AI receptionists, automated follow-ups,
            and secure workflows with one connected partner. Built for Ohio
            organizations that want cleaner operations and stronger protection.
          </p>

          <div className="hero-biz__ctas">
            <Button type="button" size="heroPill" variant="heroPrimary" onClick={onStrategyCall}>
              Request Demo
            </Button>
            <Button
              type="button"
              size="heroPill"
              variant="heroOutline"
              className="text-white hover:text-white"
              onClick={() => scrollTo("services")}
            >
              Learn More
            </Button>
          </div>
        </div>
        </div>
      </div>

      {/* ── Bottom Feature Cards ── */}
      <div className="hero-biz__panel">
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default HeroBusiness;

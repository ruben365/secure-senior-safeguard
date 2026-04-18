import { useCallback } from "react";
import {
  Phone, Shield, ShieldCheck,
  Settings, Server, Lock,
  Clock, MapPin, Award,
} from "lucide-react";
import workshopHero from "@/assets/learn_and_train.png";
import { SITE } from "@/config/site";
import { HeroCTA } from "@/components/shared/HeroCTA";

/* ── Bottom feature cards ── */
const workshopFeatures = [
  {
    icon: Settings,
    title: "AI Tools",
    desc: "Custom software that automates your daily operations.",
    target: "training",
  },
  {
    icon: Server,
    title: "Business Automation",
    desc: "AI agents that answer calls, book appointments, follow up.",
    target: "ai-pro-training",
  },
  {
    icon: ShieldCheck,
    title: "Scam & Spam Detection",
    desc: "AI-powered analysis of emails, links, files, and messages.",
    target: "pricing",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    desc: "24/7 threat monitoring with automated response.",
    target: "certifications",
  },
];

export const HeroWorkshops = () => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="hero-ws">

      {/* ── Background ── */}
      <div className="hero-ws__bg">
        <img
          src={workshopHero}
          alt="Seniors learning together in community workshop"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        <div className="hero-ws__top-veil" />
        {/* Mobile: darken top so text is readable over photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-transparent sm:hidden" aria-hidden="true" />
        <div className="hero-ws__glow" aria-hidden="true" />
      </div>

      {/* Mobile status badge */}
      <div className="sm:hidden absolute top-[88px] inset-x-0 flex justify-center z-20 px-4 pointer-events-none" aria-hidden="true">
        <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 border border-white/15" style={{background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)"}}>
          <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-white/90 tracking-wider uppercase">Expert Workshops · Ohio &amp; Zoom</span>
        </div>
      </div>

      {/* ── Main Layout: Left Content + Right Widget ── */}
      <div className="hero-ws__content [justify-content:flex-start] sm:[justify-content:center] [padding-top:6rem] sm:[padding-top:unset]">
        <div className="hero-ws__layout">

          {/* Left — Copy */}
          <div className="hero-ws__copy">
            <div className="hero-ws__kicker">
              <span className="hero-ws__kicker-line" />
              <span className="hero-ws__kicker-text">Workshops &amp; Training</span>
            </div>

            <h1 className="hero-ws__headline">
              Learn to Spot Scams
              <br />
              Before They Hit You
            </h1>

            {/* Mobile tagline */}
            <p className="sm:hidden text-xs text-white/55 mt-2 mb-0 leading-snug">
              In-person &amp; Zoom · All skill levels welcome.
            </p>

            <p className="hero-ws__body">
              Our workshops teach you and your family how to identify deepfakes,
              block phishing attacks, and respond to AI-powered fraud. Available
              live on Zoom or in person across Ohio.
            </p>

            <HeroCTA
              primaryText="Book a Workshop"
              primaryHref="/contact"
              secondaryText="See Pricing"
              secondaryHref="/training#pricing"
            />

            {/* Mobile fine print */}
            <p className="sm:hidden text-[10px] text-white/40 mt-2 leading-snug">
              Free consultation · Ohio &amp; Zoom available
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

          {/* Right — Floating Glass Card (matches reference) */}
          <aside className="hero-ws__widget" aria-label="Featured service">
            {/* Decorative dots — top right */}
            <div className="hero-ws__widget-dots" aria-hidden="true" />

            {/* Icon */}
            <div className="hero-ws__widget-badge">
              <ShieldCheck />
            </div>

            {/* Title + Description */}
            <h3 className="hero-ws__widget-title">
              Cybersecurity Protection
            </h3>
            <p className="hero-ws__widget-desc">
              Your systems are monitored 24/7. Our AI flags threats in real time and alerts your team before damage occurs.
            </p>

            {/* Phone */}
            <a href={SITE.phone.tel} className="hero-ws__widget-phone">
              <Phone className="w-4 h-4" />
              {SITE.phone.display}
            </a>

            {/* Action buttons */}
            <div className="hero-ws__widget-actions">
              <button type="button" className="hero-ws__widget-btn" onClick={() => scrollTo("pricing")} aria-label="View pricing">
                <Phone className="w-4 h-4" />
              </button>
              <button type="button" className="hero-ws__widget-btn" onClick={() => scrollTo("training")} aria-label="View training">
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </aside>

        </div>
      </div>

      {/* ── Bottom Glassmorphism Cards ── */}
      <div className="hero-ws__panel">
        <div className="hero-ws__panel-inner">
          <div className="hero-ws__feature-row">
            {workshopFeatures.map((f) => (
              <button
                key={f.title}
                type="button"
                className="hero-ws__feature"
                onClick={() => scrollTo(f.target)}
              >
                <div className="hero-ws__feature-icon">
                  <f.icon />
                </div>
                <div className="hero-ws__feature-text">
                  <p className="hero-ws__feature-title">{f.title}</p>
                  <p className="hero-ws__feature-desc">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWorkshops;

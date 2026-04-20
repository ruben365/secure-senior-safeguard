import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot, Globe, Lock, Cpu,
  Shield, Brain, Scan, Headphones,
  Clock, MapPin, Award,
} from "lucide-react";
import corineHero from "@/assets/hero-wife-office.jpg";

/* ── Hero tab items — each navigates to a dedicated page ── */
const heroTabs = [
  { label: "Protection", to: "/training#pricing" },
  { label: "Workshops", to: "/training" },
  { label: "AI & Business", to: "/business" },
  { label: "Contact", to: "/contact" },
];

/* ── Feature items — Row 1 (top) ── */
const featuresRow1 = [
  {
    icon: Bot,
    title: "AI Business Tools",
    desc: "Custom software that automates your daily operations.",
  },
  {
    icon: Globe,
    title: "Business Automation",
    desc: "AI agents that answer calls, book appointments, follow up.",
  },
  {
    icon: Lock,
    title: "Scam & Spam Detection",
    desc: "AI-powered analysis of emails, links, files, and messages.",
  },
  {
    icon: Cpu,
    title: "Cybersecurity",
    desc: "24/7 threat monitoring with automated response.",
  },
];

/* ── Feature items — Row 2 (bottom) ── */
const featuresRow2 = [
  {
    icon: Shield,
    title: "Digital Estate",
    desc: "Lock down accounts and transfer credentials to heirs.",
  },
  {
    icon: Brain,
    title: "AI Training",
    desc: "Live workshops on spotting deepfakes and phishing.",
  },
  {
    icon: Scan,
    title: "Threat Detection",
    desc: "Real-time file scanning and risk reports.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Our analysts respond day and night, no exceptions.",
  },
];

export const HeroHomepage = () => {
  return (
    <section className="hero-home">

      {/* ── 1. Background ── */}
      <div className="hero-home__bg">
        <img
          src={corineHero}
          alt="Corine — InVision Network co-founder"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
        />
        <div className="hero-home__top-veil" />
      </div>

      {/* ── 1b. Mobile status badge — only on phone, hidden sm+ ── */}
      <div className="sm:hidden absolute top-[88px] inset-x-0 flex justify-center z-20 px-4 pointer-events-none" aria-hidden="true">
        <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 border border-white/15" style={{background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)"}}>
          <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <Shield className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span className="text-[11px] font-semibold text-white/90 tracking-wider uppercase">AI Protection Active</span>
        </div>
      </div>

      {/* ── 2. Hero Content ── */}
      <div className="hero-home__content">
        <div className="hero-home__copy">

          {/* Kicker / Overline */}
          <div className="hero-home__kicker">
            <span className="hero-home__kicker-line" />
            <span className="hero-home__kicker-text">Your Path to Safety</span>
          </div>

          {/* Micro-Nav Tabs — navigate to dedicated pages */}
          <nav className="hero-home__tabs" aria-label="Quick links">
            {heroTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.to}
                className="hero-home__tab"
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {/* Headline */}
          <h1 className="hero-home__headline">
            AI Protection{" "}
            <br />
            for Families &amp; Business
          </h1>

          {/* Mobile tagline */}
          <p className="sm:hidden text-xs text-white/55 mt-2 mb-0 leading-snug">
            Protecting Dayton &amp; Southwest Ohio families since day one.
          </p>

          {/* Body */}
          <p className="hero-home__body">
            We stop AI-powered scams before they reach your family. Our team
            builds automated defenses, runs live training, and monitors threats
            around the clock so you stay safe without lifting a finger.
          </p>

          {/* Ghost CTA Buttons */}
          <div className="hero-home__ctas">
            <Link to="/training#pricing" className="hero-home__cta">
              Get Protected
            </Link>
            <Link to="/business" className="hero-home__cta">
              See Our Work
              <ArrowRight />
            </Link>
          </div>

          {/* Mobile fine print */}
          <p className="sm:hidden text-[10px] text-white/40 mt-2 leading-snug">
            Free consultation · No contracts required
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

      {/* ── 3. Glassmorphism Bottom Panel ── */}
      <div className="hero-home__panel">
        <div className="hero-home__panel-inner">

          {/* Row 1 — Top features */}
          <div className="hero-home__feature-row">
            {featuresRow1.map((f) => (
              <div key={f.title} className="hero-home__feature">
                <div className="hero-home__feature-icon">
                  <f.icon />
                </div>
                <div className="hero-home__feature-text">
                  <p className="hero-home__feature-title">{f.title}</p>
                  <p className="hero-home__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hero-home__divider" />

          {/* Row 2 — Bottom features */}
          <div className="hero-home__feature-row">
            {featuresRow2.map((f) => (
              <div key={f.title} className="hero-home__feature">
                <div className="hero-home__feature-icon">
                  <f.icon />
                </div>
                <div className="hero-home__feature-text">
                  <p className="hero-home__feature-title">{f.title}</p>
                  <p className="hero-home__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;

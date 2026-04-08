import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot, Globe, Lock, Cpu,
  Shield, Brain, Scan, Headphones,
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
          fetchPriority="high"
        />
        <div className="hero-home__top-veil" />
        <div className="hero-home__glow" aria-hidden="true" />
      </div>

      {/* ── 2. Hero Content ── */}
      <div className="hero-home__content">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
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
              AI Protection
              <br />
              for Families &amp; Business
            </h1>

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
          </div>
        </div>
      </div>

      {/* ── 3. Glassmorphism Bottom Panel ── */}
      <div className="hero-home__panel">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default HeroHomepage;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot, Globe, Lock, Cpu,
  Shield, Brain, Scan, Headphones,
} from "lucide-react";
import corineHero from "@/assets/hero-wife-office.jpg";

/* ── Hero tab items ── */
const heroTabs = [
  { id: "summary", label: "Summary" },
  { id: "services", label: "Services" },
  { id: "protection", label: "Protection" },
  { id: "training", label: "Training" },
  { id: "contact", label: "Contact" },
];

/* ── Feature items — Row 1 (top) ── */
const featuresRow1 = [
  {
    icon: Bot,
    title: "AI Business & Software Services",
    desc: "Design and build AI-powered tools and automations.",
  },
  {
    icon: Globe,
    title: "AI Business Solutions",
    desc: "Scalable AI strategies that drive revenue.",
  },
  {
    icon: Lock,
    title: "Scam & Insurance Services",
    desc: "Comprehensive fraud analysis and coverage.",
  },
  {
    icon: Cpu,
    title: "Cybersecurity Services",
    desc: "AI-driven protection from evolving threats.",
  },
];

/* ── Feature items — Row 2 (bottom) ── */
const featuresRow2 = [
  {
    icon: Shield,
    title: "Digital Estate Planning",
    desc: "Secure your family's digital legacy.",
  },
  {
    icon: Brain,
    title: "AI Training Programs",
    desc: "Workshops to defend against deepfakes.",
  },
  {
    icon: Scan,
    title: "Threat Detection & Analysis",
    desc: "Real-time scanning and intelligence reports.",
  },
  {
    icon: Headphones,
    title: "24/7 Support & Monitoring",
    desc: "Around-the-clock expert security support.",
  },
];

export const HeroHomepage = () => {
  const [activeTab, setActiveTab] = useState("services");

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
      </div>

      {/* ── 2. Hero Content ── */}
      <div className="hero-home__content">
        <div className="hero-home__copy">

          {/* Kicker / Overline */}
          <div className="hero-home__kicker">
            <span className="hero-home__kicker-line" />
            <span className="hero-home__kicker-text">Your Path to Safety</span>
          </div>

          {/* Micro-Nav Tabs */}
          <nav className="hero-home__tabs" aria-label="Hero sections">
            {heroTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`hero-home__tab${activeTab === tab.id ? " hero-home__tab--active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Headline */}
          <h1 className="hero-home__headline">
            Smart Solutions
            <br />
            Business &amp; Security Services
          </h1>

          {/* Body */}
          <p className="hero-home__body">
            Discover a new era of cybersecurity solutions. We combine AI-driven
            protection and functionality to enhance efficiency, improve processes,
            and empower your business to achieve greater outcomes.
          </p>

          {/* Ghost CTA Buttons */}
          <div className="hero-home__ctas">
            <Link to="/training#pricing" className="hero-home__cta">
              Discover Protection
            </Link>
            <Link to="/business" className="hero-home__cta">
              Explore More
              <ArrowRight />
            </Link>
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

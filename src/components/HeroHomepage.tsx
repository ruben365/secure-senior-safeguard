import { useState } from "react";
import {
  Bot, Globe, Lock, Cpu,
  Shield, Brain, Scan, Headphones,
} from "lucide-react";
import corineHero from "@/assets/hero-wife-office.jpg";

/* ── Feature items — Row 1 ── */
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

/* ── Feature items — Row 2 ── */
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

/* ── Hero tabs ── */
const heroTabs = ["Summary", "Services", "Protection", "Training", "Contact"];

export const HeroHomepage = () => {
  const [activeTab, setActiveTab] = useState("Services");

  return (
    <section className="hero-home">

      {/* ── 1. Background ── */}
      <div className="hero-home__bg">
        <img
          src={corineHero}
          alt="InVision Network co-founder in office"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-home__top-veil" />
        <div className="hero-home__glow" aria-hidden="true" />
      </div>

      {/* ── 2. Hero Content ── */}
      <div className="hero-home__content [justify-content:flex-start] sm:[justify-content:center] [padding-top:6rem] sm:[padding-top:unset]">
        <div className="max-w-[1200px] mx-auto w-full px-8">
          <div className="hero-home__copy">

            {/* Kicker */}
            <div className="hero-home__kicker">
              <span className="hero-home__kicker-line" />
              <span className="hero-home__kicker-text">Your Path to Safety</span>
            </div>

            {/* Tabs */}
            <nav className="hero-home__tabs" aria-label="Hero sections">
              {heroTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`hero-home__tab ${activeTab === tab ? "hero-home__tab--active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Headline */}
            <h1 className="hero-home__headline">
              Smart Solutions
              <br />
              Business &amp;
              <br />
              Security Services
            </h1>

            {/* Body */}
            <p className="hero-home__body">
              Discover a new era of cybersecurity solutions. We combine AI-driven
              protection and functionality to enhance efficiency, improve processes,
              and safeguard your digital assets.
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. Glassmorphism Bottom Panel ── */}
      <div className="hero-home__panel">
        <div className="max-w-[1200px] mx-auto w-full px-8">
          <div className="hero-home__panel-inner">

          {/* Row 1 */}
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

          {/* Row 2 */}
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

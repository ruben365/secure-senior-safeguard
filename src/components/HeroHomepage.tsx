import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot, Lock, Cpu, Headphones,
} from "lucide-react";
import corineHero from "@/assets/hero-wife-office.jpg";

/* ── Feature items — 4 core services ── */
const features = [
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
  {
    icon: Bot,
    title: "AI Business Tools",
    desc: "Custom software that automates your daily operations.",
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
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-home__top-veil" />
        <div className="hero-home__glow" aria-hidden="true" />
      </div>

      {/* ── 2. Hero Content ── */}
      <div className="hero-home__content">
        {/* Text group — pushed to top on mobile */}
        <div className="hero-home__text-group">
          <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-8">
            <div className="hero-home__copy">
              <h1 className="hero-home__headline">
                AI Protection
                <br />
                for Families &amp; Business
              </h1>
              <p className="hero-home__body">
                We stop AI-powered scams before they reach your family. Our team
                builds automated defenses, runs live training, and monitors threats
                around the clock so you stay safe without lifting a finger.
              </p>
              {/* CTAs */}
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

      </div>

      {/* ── 3. Glassmorphism Bottom Panel ── */}
      <div className="hero-home__panel">
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-8">
          <div className="hero-home__panel-inner">

          <div className="hero-home__feature-row">
            {features.map((f) => (
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

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot, Globe, Lock, Cpu,
  Shield, Brain, Scan, Headphones,
} from "lucide-react";
import corineHero from "@/assets/team-corine-coo.jpg";

const heroTabs = [
  { id: "summary", label: "Summary" },
  { id: "services", label: "Services", active: true },
  { id: "protection", label: "Protection" },
  { id: "training", label: "Training" },
  { id: "contact", label: "Contact" },
];

const services = [
  {
    icon: Bot,
    title: "AI Business & Software Services",
    description: "Design and build AI-powered tools, automations, and custom software for your business.",
  },
  {
    icon: Globe,
    title: "AI Business Solutions",
    description: "Scalable AI integration strategies that transform operations and drive revenue.",
  },
  {
    icon: Lock,
    title: "Estimated Scam & Insurance Services",
    description: "Comprehensive scam protection, fraud analysis, and digital insurance coverage.",
  },
  {
    icon: Cpu,
    title: "Cybersecurity & Clean Secured",
    description: "AI-driven cybersecurity solutions that protect your business from evolving threats.",
  },
  {
    icon: Shield,
    title: "Digital Estate Planning",
    description: "Secure your family's digital legacy with AI-powered estate management tools.",
  },
  {
    icon: Brain,
    title: "AI Training Programs",
    description: "Hands-on workshops and certifications to defend against deepfakes and scams.",
  },
  {
    icon: Scan,
    title: "Threat Detection & Analysis",
    description: "Real-time scanning and intelligence reports on emerging digital threats.",
  },
  {
    icon: Headphones,
    title: "24/7 Support & Monitoring",
    description: "Around-the-clock expert support and continuous security monitoring.",
  },
];

export const HeroHomepage = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <section className="relative overflow-hidden bg-[#080b11]" style={{ minHeight: "100dvh" }}>

      {/* ── Full-bleed portrait ── */}
      <div className="absolute inset-0">
        <img
          src={corineHero}
          alt="Corine — InVision Network co-founder"
          className="w-full h-full object-cover object-[center_15%]"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />

        {/* Left wall — solid-to-transparent, keeps text perfectly readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #080b11 0%, #080b11 8%, rgba(8,11,17,0.92) 22%, rgba(8,11,17,0.72) 40%, rgba(8,11,17,0.35) 55%, transparent 72%)",
          }}
        />

        {/* Bottom curtain — fades into card area */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #080b11 0%, rgba(8,11,17,0.85) 18%, rgba(8,11,17,0.4) 32%, transparent 50%)",
          }}
        />

        {/* Top veil — nav legibility */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080b11]/50 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1400px]">
        <div
          className="flex flex-col justify-end"
          style={{ minHeight: "100dvh", paddingTop: "clamp(80px, 10vw, 110px)", paddingBottom: "clamp(260px, 32vw, 340px)" }}
        >
          <div className="max-w-[620px]">

            {/* Upper label */}
            <p className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.22em] mb-5">
              Your Path to Safety
            </p>

            {/* ── Tab row ── */}
            <nav className="flex items-center gap-0.5 mb-8" aria-label="Hero sections">
              {heroTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-[11px] uppercase tracking-[0.12em] rounded-sm transition-colors duration-150 ${
                    activeTab === tab.id
                      ? "text-white font-extrabold"
                      : "text-white/30 font-semibold hover:text-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* ── Headline ── */}
            <h1 className="text-[clamp(2.2rem,5.8vw,3.6rem)] font-extrabold text-white leading-[1.06] tracking-[-0.025em] mb-5">
              Smart Solutions
              <br />
              Business &amp; Security Services
            </h1>

            {/* ── Body ── */}
            <p className="text-[15px] leading-[1.7] text-white/45 max-w-[480px] mb-9">
              Discover a new era of cybersecurity solutions. We combine AI-driven
              protection and functionality to enhance efficiency, improve processes,
              and empower your business to achieve greater outcomes.
            </p>

            {/* ── CTA pair — outlined, matching reference ── */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/training#pricing"
                className="inline-flex items-center h-[44px] px-6 text-[13px] font-semibold tracking-wide text-white/90 border border-white/20 rounded-[6px] hover:bg-white/[0.04] hover:border-white/35 transition-all duration-200"
              >
                Discover Protection
              </Link>
              <Link
                to="/business"
                className="inline-flex items-center gap-2 h-[44px] px-6 text-[13px] font-semibold tracking-wide text-white/90 border border-white/20 rounded-[6px] hover:bg-white/[0.04] hover:border-white/35 transition-all duration-200"
              >
                Explore More
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom service cards — 4 × 2 frosted glass ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 pointer-events-none">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1400px] pointer-events-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl px-4 py-3.5 bg-white/[0.88] backdrop-blur-2xl border border-white/70 shadow-[0_1px_8px_rgba(0,0,0,0.04),0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[#080b11]/[0.05] flex items-center justify-center mt-0.5">
                    <service.icon className="w-4 h-4 text-[#080b11]/50" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 pt-px">
                    <h3 className="text-[12px] font-bold text-[#080b11] leading-tight mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-[10.5px] text-[#080b11]/35 leading-[1.55] line-clamp-2">
                      {service.description}
                    </p>
                  </div>
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

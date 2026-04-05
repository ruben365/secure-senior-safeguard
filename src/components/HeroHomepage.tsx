import { Link } from "react-router-dom";
import { ArrowRight, Shield, Phone, Fingerprint, Eye, Lock, Wifi } from "lucide-react";
import { SITE } from "@/config/site";
import heroImage from "@/assets/hero-corporate-protection.jpg";

export const HeroHomepage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden hero-dark-bg">
      {/* ── Full-bleed background image (right-aligned) ── */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cybersecurity protection shield visualization"
          className="w-full h-full object-cover object-right"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Gradient overlay — fades image into dark background on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent" />
        {/* Bottom fade for card area */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
      </div>

      {/* ── Top Navigation Bar ── */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-8 py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <Shield className="w-7 h-7 text-violet-500" />
            <span className="text-lg font-bold text-white tracking-wide">
              {SITE.name}
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Solutions", to: "/services" },
              { label: "Training", to: "/training" },
              { label: "About", to: "/about" },
              { label: "Resources", to: "/resources" },
              { label: "Contact", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-gray-300 font-medium hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/training#pricing"
            className="hidden sm:inline-flex bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Get Protected
          </Link>
        </div>
      </nav>

      {/* ── Hero Content (Left-Aligned) ── */}
      <div className="relative z-10 flex flex-col justify-center h-screen max-w-7xl mx-auto px-8">
        <div className="w-full lg:w-[60%]">
          {/* Overline */}
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-semibold mb-4">
            AI-Powered Cyber Defense
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Protect Your Family
            <br />
            From Digital
            <br />
            <span className="text-violet-400">Threats</span>
          </h1>

          {/* Sub-paragraph */}
          <p className="text-base text-gray-400 max-w-md mt-6 leading-relaxed">
            Real-time deepfake detection, voice clone analysis, and phishing
            prevention. Veteran-founded in Ohio, shielding 500+ families with
            next-gen AI security.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/training#pricing"
              className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            >
              <Shield className="mr-2 w-5 h-5" />
              Start Protection — From $79
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href={SITE.phone.tel}
              className="inline-flex items-center justify-center bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3.5 rounded-lg font-medium transition-colors gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {SITE.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* ── Glassmorphism Feature Cards (Bottom Row) ── */}
      <div className="absolute bottom-10 left-0 right-0 z-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Fingerprint,
              title: "Deepfake Detection",
              description:
                "AI-powered real-time analysis identifies manipulated media and synthetic voices before they reach you.",
            },
            {
              icon: Eye,
              title: "Phishing Prevention",
              description:
                "Smart URL scanning and email analysis blocks fraudulent attempts, protecting your identity 24/7.",
            },
            {
              icon: Lock,
              title: "Identity Shield",
              description:
                "Multi-layered defense monitors the dark web and alerts you instantly to any compromised credentials.",
            },
            {
              icon: Wifi,
              title: "Network Security",
              description:
                "Continuous device monitoring and encrypted communications keep your home network locked down.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="relative p-6 rounded-2xl border border-gray-800/50 border-t-gray-700 backdrop-blur-xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cyber-card-bg"
            >
              {/* Cyber texture overlay */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none cyber-texture" />
              {/* Card content */}
              <div className="relative z-10">
                <card.icon className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;

import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight, Shield, Phone, Fingerprint, Eye, Lock, Wifi,
  Menu, X, Heart, ChevronDown, LayoutDashboard, Bell,
} from "lucide-react";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import { DonationModal } from "@/components/DonationModal";
import invisionLogo from "@/assets/shield-logo.png";
import heroImage from "@/assets/hero-corporate-protection.jpg";

const primaryLinks = [
  { name: "AI & Business", href: "/business" },
  { name: "Learn & Train", href: "/training" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
];

const secondaryLinks = [
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

export const HeroHomepage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();
  const moreRef = React.useRef<HTMLDivElement>(null);
  const isAdminOrStaff = user && roleConfig;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  const hasOpenedMenu = React.useRef(false);
  React.useEffect(() => {
    if (mobileMenuOpen) { hasOpenedMenu.current = true; document.body.style.overflow = "hidden"; }
    else if (hasOpenedMenu.current) { document.body.style.overflow = ""; }
    return () => { if (hasOpenedMenu.current) document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");
  const isSecondaryActive = secondaryLinks.some((l) => isActiveLink(l.href));

  return (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9998] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <section className="relative w-full lg:min-h-screen lg:h-[100dvh] overflow-hidden hero-dark-bg">
        {/* ── Full-bleed background image with cinematic overlays ── */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Cybersecurity protection shield visualization"
            className="w-full h-full object-cover object-right"
            loading="eager"
            decoding="sync"
            {...{ fetchpriority: "high" } as any}
          />
          {/* Primary left-to-right fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a14] via-[#060a14]/90 via-40% to-transparent" />
          {/* Bottom fade for cards */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/30 via-30% to-transparent" />
          {/* Top subtle darkening for nav readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/60 via-transparent via-20% to-transparent" />
          {/* Cinematic vignette */}
          <div className="absolute inset-0 hero-vignette" />
          {/* Subtle light streak across hero */}
          <div className="absolute inset-0 hero-light-streak" />
          {/* Ambient color accent — subtle purple glow from left */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[hsl(272,52%,24%)]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(280,58%,52%)]/6 blur-[100px] pointer-events-none" />
        </div>

        {/* ── Transparent Navigation (no background) ── */}
        <nav className="absolute top-0 left-0 right-0 z-[9999]">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <div className="flex items-center justify-between h-[68px]">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline">
                <img
                  src={invisionLogo}
                  alt="InVision Network Shield Logo"
                  width={34}
                  height={34}
                  loading="eager"
                  decoding="sync"
                  className="w-[38px] h-[38px] object-contain flex-shrink-0 brightness-0 invert"
                />
                <div className="flex flex-col leading-none min-w-0">
                  <span className="text-[17px] font-extrabold text-white tracking-tight">InVision Network</span>
                  <span className="text-[10px] font-bold text-gray-400 hidden sm:block tracking-widest uppercase">AI Scam Protection</span>
                </div>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-1">
                {primaryLinks.map((link) => (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                      isActiveLink(link.href)
                        ? "text-violet-400 font-bold bg-violet-500/10"
                        : "text-gray-300 font-semibold hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                ))}

                <div className="relative" ref={moreRef}>
                  <button
                    type="button"
                    onClick={() => setMoreOpen(!moreOpen)}
                    className={`flex items-center gap-1 text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                      isSecondaryActive
                        ? "text-violet-400 font-bold bg-violet-500/10"
                        : "text-gray-300 font-semibold hover:text-white hover:bg-white/10"
                    }`}
                  >
                    More
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                  </button>

                  {moreOpen && (
                    <div className="absolute top-full left-0 mt-1 w-44 rounded-lg border border-gray-700/50 shadow-lg py-1 z-50 cyber-card-bg backdrop-blur-xl">
                      {secondaryLinks.map((link) => (
                        <PrefetchLink
                          key={link.name}
                          to={link.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            isActiveLink(link.href)
                              ? "text-violet-400 font-semibold bg-violet-500/10"
                              : "text-gray-300 hover:text-white hover:bg-white/10"
                          }`}
                          onClick={() => setMoreOpen(false)}
                        >
                          {link.name}
                        </PrefetchLink>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-2">
                {/* Bell notification */}
                <button
                  type="button"
                  className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
                </button>

                <ShoppingCart />

                <a
                  href={SITE.phone.tel}
                  className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-150 no-underline px-2 py-1.5 rounded-md hover:bg-white/10"
                  aria-label={`Call us at ${SITE.phone.display}`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden xl:inline text-sm font-medium">{SITE.phone.display}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setDonateOpen(true)}
                  className="hidden lg:flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-md text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                  aria-label="Donate"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden xl:inline">Donate</span>
                </button>

                <div className="hidden lg:block w-px h-6 bg-gray-700 mx-1" />

                {isAdminOrStaff ? (
                  <Link to="/admin" className="flex items-center gap-1.5 h-9 px-6 text-sm font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/portal" className="h-9 px-6 text-sm font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] inline-flex items-center">
                    Login
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 border-t border-gray-800 z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch] hero-dark-bg">
              <div className="container mx-auto px-4 py-4 space-y-1">
                {allLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-[15px] transition-colors duration-150 font-medium px-4 py-3 rounded-lg ${
                      isActiveLink(link.href)
                        ? "text-violet-400 font-semibold bg-violet-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-800 mt-3 space-y-3">
                  <button
                    type="button"
                    className="w-full h-11 text-[15px] font-semibold border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    onClick={() => { setDonateOpen(true); setMobileMenuOpen(false); }}
                  >
                    <Heart className="h-4 w-4" />
                    Donate
                  </button>
                  {isAdminOrStaff ? (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full h-11 text-[15px] font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center gap-2 transition-colors">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)} className="w-full h-11 text-[15px] font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center transition-colors">
                      Login
                    </Link>
                  )}
                  <a
                    href={SITE.phone.tel}
                    className="flex items-center justify-center gap-2 text-[15px] text-gray-400 font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-4 w-4" />
                    {SITE.phone.display}
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* ── Hero Content (Left-Aligned) ── */}
        <div className="relative z-10 flex flex-col justify-center pt-24 pb-10 lg:pt-0 lg:pb-0 lg:min-h-screen lg:h-[100dvh] max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 3xl:max-w-7xl">
          <div className="w-full lg:w-[55%] lg:pb-52">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-violet-400 font-semibold mb-3 opacity-90">
              AI-Powered Cyber Defense
            </p>

            <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] font-extrabold text-white leading-[1.08] tracking-[-0.035em]">
              Protect Your Family
              <br />
              From Digital
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(167,139,250,0.3)]">Threats</span>
            </h1>

            <p className="text-[0.9375rem] text-gray-400 max-w-md mt-5 leading-[1.7]">
              Real-time deepfake detection, voice clone analysis, and phishing
              prevention. Veteran-founded in Ohio, shielding 500+ families with
              next-gen AI security.
            </p>

            {/* Live status badge */}
            <div className="flex items-center gap-2.5 mt-6 mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[0.75rem] text-gray-300 font-medium">2,847 threats blocked this month</span>
                <Shield className="w-3.5 h-3.5 text-violet-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <Link
                to="/training#pricing"
                className="inline-flex items-center justify-center bg-gradient-to-b from-violet-500 to-violet-700 hover:from-violet-400 hover:to-violet-600 text-white px-7 py-3.5 rounded-xl font-semibold text-[0.9375rem] transition-all duration-200 shadow-[0_2px_0_0_rgba(80,40,160,0.5),0_0_20px_rgba(124,58,237,0.25),0_0_60px_rgba(124,58,237,0.1)] hover:shadow-[0_2px_0_0_rgba(80,40,160,0.5),0_0_30px_rgba(124,58,237,0.4),0_0_80px_rgba(124,58,237,0.15)] hover:-translate-y-0.5 active:translate-y-0 border border-violet-400/30"
              >
                <Shield className="mr-2 w-[1.125rem] h-[1.125rem]" />
                Start Protection — From $79
                <ArrowRight className="ml-2 w-[1.125rem] h-[1.125rem]" />
              </Link>
              <a
                href={SITE.phone.tel}
                className="inline-flex items-center justify-center bg-white/[0.06] border border-white/[0.15] hover:border-white/30 hover:bg-white/[0.12] text-white px-7 py-3.5 rounded-xl font-semibold text-[0.9375rem] transition-all duration-200 gap-2 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-[1.125rem] h-[1.125rem]" />
                Call {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* ── Glassmorphism Feature Cards (Bottom Row) ── */}
        <div className="relative lg:absolute lg:bottom-10 left-0 right-0 z-20 px-6 sm:px-8 lg:px-10 pb-8 lg:pb-0">
          <div className="max-w-6xl 3xl:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: Fingerprint,
                title: "Deepfake Detection",
                description: "AI-powered real-time analysis identifies manipulated media and synthetic voices before they reach you.",
              },
              {
                icon: Eye,
                title: "Phishing Prevention",
                description: "Smart URL scanning and email analysis blocks fraudulent attempts, protecting your identity 24/7.",
              },
              {
                icon: Lock,
                title: "Identity Shield",
                description: "Multi-layered defense monitors the dark web and alerts you instantly to any compromised credentials.",
              },
              {
                icon: Wifi,
                title: "Network Security",
                description: "Continuous device monitoring and encrypted communications keep your home network locked down.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="relative p-5 rounded-2xl backdrop-blur-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 cyber-glass-card"
              >
                {/* Code pattern overlay */}
                <div className="absolute inset-0 opacity-[0.12] pointer-events-none cyber-code-pattern" />
                <div className="relative z-10">
                  <div className="icon-glow relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/10 border border-violet-400/15 flex items-center justify-center mb-3 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300">
                    <card.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-white text-[0.9375rem] font-semibold mb-1.5 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-400/80 text-[0.8125rem] leading-relaxed m-0">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} type="general" />
    </>
  );
};

export default HeroHomepage;

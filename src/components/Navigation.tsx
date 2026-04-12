import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  LayoutDashboard,
  Heart,
  ChevronDown,
} from "lucide-react";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { DonationModal } from "@/components/DonationModal";
import { AnnouncementBell } from "@/components/AnnouncementBell";

const primaryLinks = [
  { name: "AI", href: "/ai" },
  { name: "Workshops", href: "/training" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
];

const secondaryLinks = [
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

const Navigation = React.memo(({ overlay = false }: { overlay?: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();
  const moreRef = React.useRef<HTMLDivElement>(null);

  const isAdminOrStaff = user && roleConfig;

  // Close "More" dropdown on outside click (mouse + touch)
  React.useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e instanceof TouchEvent ? e.touches[0]?.target : (e as MouseEvent).target;
      if (moreRef.current && !moreRef.current.contains(target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) {
      document.addEventListener("mousedown", handler as EventListener);
      document.addEventListener("touchstart", handler as EventListener, { passive: true });
    }
    return () => {
      document.removeEventListener("mousedown", handler as EventListener);
      document.removeEventListener("touchstart", handler as EventListener);
    };
  }, [moreOpen]);

  const hasOpenedMenu = React.useRef(false);
  React.useEffect(() => {
    if (mobileMenuOpen) {
      hasOpenedMenu.current = true;
      document.body.style.overflow = "hidden";
    } else if (hasOpenedMenu.current) {
      document.body.style.overflow = "";
    }
    return () => {
      if (hasOpenedMenu.current) {
        document.body.style.overflow = "";
      }
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBrandClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  const isActiveLink = (href: string) => {
    if (href === "/ai") {
      return (
        location.pathname === "/ai" ||
        location.pathname === "/ai-workshop" ||
        location.pathname === "/business" ||
        location.pathname.startsWith("/business/")
      );
    }
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const isSecondaryActive = secondaryLinks.some((l) => isActiveLink(l.href));

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={overlay ? "absolute top-0 left-0 right-0 z-[9999] bg-gradient-to-b from-black/60 to-transparent" : `sticky top-0 z-[9999] transition-all duration-300 ${scrolled ? "bg-[#080d1a]/97 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]" : "bg-[#080d1a]/80 backdrop-blur-md"}`}>
        <div className="site-shell w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-[56px] gap-4 lg:gap-8">
            {/* Logo — identical to hero */}
            <a
              href="/"
              className="flex items-center gap-4 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={42}
                height={42}
                loading="eager"
                decoding="sync"
                className="w-[32px] h-[32px] object-contain flex-shrink-0 brightness-0 invert"
              />
              <div className="flex flex-col min-w-0 gap-1">
                <span className="text-[15px] md:text-[15.5px] font-extrabold text-white tracking-tight leading-none">InVision Network</span>
                <span className="text-[10px] font-bold text-white/88 hidden sm:block tracking-[0.18em] uppercase leading-none">AI Scam Protection</span>
              </div>
            </a>

            {/* Desktop Links — identical to hero */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5 lg:ml-6 xl:ml-10">
              {primaryLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`site-nav-link relative text-[14px] px-3 py-1.5 rounded-md transition-colors duration-150 ${
                      isActive
                        ? "site-nav-link--active text-white font-semibold"
                        : "text-white font-semibold hover:text-orange-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  data-open={moreOpen ? "true" : "false"}
                  aria-haspopup="menu"
                  aria-expanded={moreOpen ? "true" : "false"}
                  aria-label="More navigation links"
                  className={`site-nav-trigger flex items-center gap-1 text-[14px] px-3 py-1.5 rounded-md transition-colors duration-150 ${
                    isSecondaryActive
                      ? "site-nav-trigger--active text-white font-semibold"
                      : "text-white font-semibold hover:text-orange-200 hover:bg-white/[0.03]"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div
                    role="menu"
                    aria-label="Secondary navigation"
                    className="site-glass-menu absolute top-full left-0 mt-2 w-52 rounded-2xl py-1.5 z-50 overflow-hidden"
                  >
                    {secondaryLinks.map((link) => {
                      const isActive = isActiveLink(link.href);
                      return (
                        <PrefetchLink
                          key={link.name}
                          to={link.href}
                          role="menuitem"
                          className={`block px-4 py-2.5 text-[14px] transition-colors ${
                            isActive
                              ? "text-white font-semibold"
                              : "text-white/94 hover:text-orange-200 hover:bg-white/[0.06]"
                          }`}
                          onClick={() => setMoreOpen(false)}
                        >
                          {link.name}
                        </PrefetchLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side — identical to hero */}
            <div className="flex items-center gap-2">
              {/* Announcements bell */}
              <div className="hidden lg:block">
                <AnnouncementBell />
              </div>

              <ShoppingCart />

              {/* Phone */}
              <a
                href={SITE.phone.tel}
                className="hidden lg:flex flex-none shrink-0 items-center gap-1.5 text-white hover:text-orange-200 transition-colors duration-150 no-underline px-2 py-1.5 rounded-md hover:bg-white/[0.07] whitespace-nowrap"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <Phone className="w-4 h-4 shrink-0 text-current" />
                <span className="hidden xl:inline text-[13px] font-semibold text-current whitespace-nowrap [word-break:keep-all]">
                  {/* Non-breaking space between area code and local guarantees single line */}
                  {SITE.phone.display.replace(" ", "\u00A0")}
                </span>
              </a>

              {/* Donate */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-[13px] font-semibold px-2.5 py-1.5 rounded-md text-white hover:text-orange-200 hover:bg-orange-500/10 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-4 h-4 text-current" />
                <span className="hidden xl:inline text-current">Donate</span>
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-gray-700 mx-1" />

              {/*
                Login / Dashboard — strong brand orange pill.
                Matches the polished default button treatment used across
                the site: diagonal gradient, warm border, inner highlight,
                triple shadow stack, subtle hover lift.
              */}
              {isAdminOrStaff ? (
                <Link
                  to="/admin"
                  aria-label="Go to Dashboard"
                  className="inline-flex items-center gap-1.5 h-[34px] px-4 text-[12px] font-semibold rounded-full text-white bg-gradient-to-b from-[#c2410c] to-[#9a3412] border border-[#7c2d12] shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_8px_20px_-6px_rgba(217,108,74,0.5),0_16px_32px_-12px_rgba(217,108,74,0.35)] hover:-translate-y-[1px] hover:from-[#ea580c] hover:to-[#c2410c] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_12px_28px_-6px_rgba(217,108,74,0.6),0_20px_40px_-12px_rgba(217,108,74,0.4)] active:translate-y-[0.5px] transition-all duration-200"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  aria-label="Login to your account"
                  className="inline-flex items-center h-[34px] px-4 text-[12px] font-semibold rounded-full text-white bg-gradient-to-b from-[#c2410c] to-[#9a3412] border border-[#7c2d12] shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_8px_20px_-6px_rgba(217,108,74,0.5),0_16px_32px_-12px_rgba(217,108,74,0.35)] hover:-translate-y-[1px] hover:from-[#ea580c] hover:to-[#c2410c] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_12px_28px_-6px_rgba(217,108,74,0.6),0_20px_40px_-12px_rgba(217,108,74,0.4)] active:translate-y-[0.5px] transition-all duration-200"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen ? "true" : "false"}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — right-side slide panel */}
      {mobileMenuOpen && (
        <>
          <style>{`
            @keyframes menuSlideIn  { from { transform: translateX(100%); } to { transform: translateX(0); } }
            @keyframes backdropIn   { from { opacity: 0; } to { opacity: 1; } }
          `}</style>

          {/* Backdrop — click to close, starts below nav */}
          <div
            className="lg:hidden fixed left-0 right-0 bottom-0 z-[10000]"
            style={{
              top: "56px",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              animation: "backdropIn 200ms ease-out",
            }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — clean glassmorphism */}
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="lg:hidden fixed top-[56px] right-0 z-[10001] flex h-[calc(100svh-56px)] flex-col overflow-hidden"
            style={{
              width: "min(86vw, 320px)",
              background: "linear-gradient(180deg, rgba(64, 42, 30, 0.54) 0%, rgba(33, 24, 28, 0.48) 100%)",
              WebkitBackdropFilter: "blur(24px) saturate(1.45)",
              backdropFilter: "blur(24px) saturate(1.45)",
              borderLeft: "1px solid rgba(255,255,255,0.22)",
              borderBottomLeftRadius: "20px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.16)",
              animation: "menuSlideIn 250ms ease-out",
            }}
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-4 [-webkit-overflow-scrolling:touch]">
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Menu
                </p>
                <p className="mt-1 text-sm font-medium text-white/80">
                  Explore training, tools, support, and account access.
                </p>
              </div>

              <div className="space-y-1.5">
                {allLinks.map((link) => {
                  const isActive = isActiveLink(link.href);
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`flex min-h-[46px] items-center rounded-xl px-4 py-3 text-[14px] font-medium transition-colors duration-150 ${
                        isActive
                          ? "border border-orange-400/30 bg-orange-500/12 text-orange-300"
                          : "text-white/85 hover:text-white hover:bg-white/[0.06]"
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToTop();
                      }}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div
              className="border-t border-white/[0.08] bg-black/10 px-4 pt-4"
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
            >
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-[13px] font-semibold text-white transition-colors duration-150 hover:border-white/30 hover:text-white"
                  onClick={() => {
                    setDonateOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="h-3 w-3 text-current" />
                  <span className="text-current">Donate</span>
                </button>

                {isAdminOrStaff ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#7c2d12] bg-gradient-to-b from-[#c2410c] to-[#9a3412] px-4 text-[13px] font-semibold text-white transition-all duration-150"
                  >
                    <LayoutDashboard className="h-3 w-3" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-[#7c2d12] bg-gradient-to-b from-[#c2410c] to-[#9a3412] px-4 text-[13px] font-semibold text-white transition-all duration-150"
                  >
                    Login
                  </Link>
                )}

                <a
                  href={SITE.phone.tel}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/12 px-4 text-[13px] font-semibold text-white transition-colors duration-150 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone className="h-3.5 w-3.5 text-current" />
                  <span className="text-current">{SITE.phone.display}</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <DonationModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        type="general"
      />
    </>
  );
});

export default Navigation;

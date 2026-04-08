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
  { name: "AI", href: "/business" },
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
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className={overlay ? "absolute top-0 left-0 right-0 z-[9999] bg-gradient-to-b from-black/60 to-transparent" : `sticky top-0 z-[9999] transition-colors duration-300 ${scrolled ? "bg-[#080d1a]/95 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[76px] gap-6 lg:gap-12">
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
                className="w-[41px] h-[41px] object-contain flex-shrink-0 brightness-0 invert"
              />
              <div className="flex flex-col min-w-0 gap-1">
                <span className="text-[19px] font-extrabold text-white tracking-tight leading-none">InVision Network</span>
                <span className="text-[12.5px] font-bold text-gray-300 hidden sm:block tracking-widest uppercase leading-none">AI Scam Protection</span>
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
                    className={`relative text-[19px] px-4 py-2 rounded-md transition-colors duration-150 ${
                      isActive
                        ? "text-orange-400 font-bold bg-orange-500/10"
                        : "text-gray-300 font-semibold hover:text-white hover:bg-white/10"
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
                  aria-haspopup="menu"
                  aria-expanded={moreOpen ? "true" : "false"}
                  aria-label="More navigation links"
                  className={`flex items-center gap-1 text-[19px] px-4 py-2 rounded-md transition-colors duration-150 ${
                    isSecondaryActive
                      ? "text-orange-400 font-bold bg-orange-500/10"
                      : "text-gray-300 font-semibold hover:text-white hover:bg-white/10"
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
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-white/15 py-1.5 z-50 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                      backdropFilter: "blur(20px) saturate(160%)",
                      WebkitBackdropFilter: "blur(20px) saturate(160%)",
                      boxShadow:
                        "0 12px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    {secondaryLinks.map((link) => {
                      const isActive = isActiveLink(link.href);
                      return (
                        <PrefetchLink
                          key={link.name}
                          to={link.href}
                          role="menuitem"
                          className={`block px-4 py-2.5 text-[15px] transition-colors ${
                            isActive
                              ? "text-orange-400 font-semibold"
                              : "text-gray-300 hover:text-white"
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
                className="hidden lg:flex flex-none shrink-0 items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-150 no-underline px-2 py-1.5 rounded-md hover:bg-white/10 whitespace-nowrap"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <Phone className="w-[21px] h-[21px] shrink-0" />
                <span className="hidden xl:inline text-[17.5px] font-medium whitespace-nowrap [word-break:keep-all]">
                  {/* Non-breaking space between area code and local guarantees single line */}
                  {SITE.phone.display.replace(" ", "\u00A0")}
                </span>
              </a>

              {/* Donate */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-[17.5px] font-medium px-2.5 py-1.5 rounded-md text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-[21px] h-[21px]" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-gray-700 mx-1" />

              {/* Login / Dashboard — pill shape, glow, identical to hero */}
              {isAdminOrStaff ? (
                <Link
                  to="/admin"
                  aria-label="Go to Dashboard"
                  className="flex items-center gap-1.5 h-[46px] px-7 text-[17.5px] font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  aria-label="Login to your account"
                  className="h-[46px] px-7 text-[17.5px] font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.25)] inline-flex items-center"
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

      {/* Mobile Menu — outside nav for proper stacking */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 border-t border-white/[0.08] z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch]"
          style={{
            background: "rgba(6, 9, 18, 0.80)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
          }}
        >
          {/* Ambient orange glow at top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 right-0 h-64"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 75%)",
            }}
          />

          <div className="relative container mx-auto px-4 py-5 space-y-1">
            {allLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center text-[16px] font-semibold px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-orange-400 bg-orange-500/[0.12] border border-orange-500/20 shadow-[0_0_20px_-6px_rgba(249,115,22,0.3)]"
                      : "text-white/75 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
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

            <div
              className="mt-4 pt-4 space-y-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                type="button"
                className="w-full h-12 text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 border text-orange-400 hover:text-orange-300"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  borderColor: "rgba(249,115,22,0.25)",
                  backdropFilter: "blur(12px)",
                }}
                onClick={() => {
                  setDonateOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Heart className="h-4 w-4" />
                Donate
              </button>

              {isAdminOrStaff ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-12 text-[15px] font-semibold rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.85) 0%, rgba(109,40,217,0.85) 100%)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 24px -6px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-12 text-[15px] font-semibold rounded-xl text-white flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.85) 0%, rgba(109,40,217,0.85) 100%)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 24px -6px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  Login
                </Link>
              )}

              <a
                href={SITE.phone.tel}
                className="flex items-center justify-center gap-2 text-[14px] text-white/50 font-medium px-4 py-3 rounded-xl transition-all duration-200 hover:text-white/80 hover:bg-white/[0.05]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
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

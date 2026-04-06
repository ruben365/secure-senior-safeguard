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

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo — identical to hero */}
            <a
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={34}
                height={34}
                loading="eager"
                decoding="sync"
                className="w-[32px] h-[32px] object-contain flex-shrink-0 brightness-0 invert"
              />
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-[15px] font-extrabold text-white tracking-tight">InVision Network</span>
                <span className="text-[9px] font-bold text-gray-400 hidden sm:block tracking-widest uppercase">AI Scam Protection</span>
              </div>
            </a>

            {/* Desktop Links — identical to hero */}
            <div className="hidden lg:flex items-center gap-1">
              {primaryLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                      isActive
                        ? "text-violet-400 font-bold bg-violet-500/10"
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
                  className={`flex items-center gap-1 text-[15px] px-3 py-2 rounded-md transition-colors duration-150 ${
                    isSecondaryActive
                      ? "text-violet-400 font-bold bg-violet-500/10"
                      : "text-gray-300 font-semibold hover:text-white hover:bg-white/10"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-44 rounded-lg border border-white/8 shadow-lg py-1 z-50 overflow-hidden"
                    style={{
                      background: "rgba(20, 20, 28, 0.75)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    {secondaryLinks.map((link) => {
                      const isActive = isActiveLink(link.href);
                      return (
                        <PrefetchLink
                          key={link.name}
                          to={link.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? "text-violet-400 font-semibold"
                              : "text-gray-400 hover:text-white"
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
                className="hidden lg:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-150 no-underline px-2 py-1.5 rounded-md hover:bg-white/10"
                aria-label={`Call us at ${SITE.phone.display}`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline text-sm font-medium">{SITE.phone.display}</span>
              </a>

              {/* Donate */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-md text-gray-400 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-gray-700 mx-1" />

              {/* Login / Dashboard — pill shape, glow, identical to hero */}
              {isAdminOrStaff ? (
                <Link
                  to="/admin"
                  aria-label="Go to Dashboard"
                  className="flex items-center gap-1.5 h-9 px-6 text-sm font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  aria-label="Login to your account"
                  className="h-9 px-6 text-sm font-semibold rounded-full bg-violet-600 hover:bg-violet-500 text-white transition-all shadow-[0_0_15px_rgba(124,58,237,0.2)] inline-flex items-center"
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
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
        <div className="lg:hidden fixed top-[60px] left-0 right-0 bottom-0 border-t border-gray-800 z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)] [-webkit-overflow-scrolling:touch] bg-[#080d1a]">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {allLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block text-[15px] transition-colors duration-150 font-medium px-4 py-3 rounded-lg ${
                    isActive
                      ? "text-violet-400 font-semibold bg-violet-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
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

            <div className="pt-4 border-t border-gray-800 mt-3 space-y-3">
              <button
                type="button"
                className="w-full h-11 text-[15px] font-semibold border border-violet-500/30 text-violet-400 hover:bg-violet-500/10 rounded-lg flex items-center justify-center gap-2 transition-colors"
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
                  className="w-full h-11 text-[15px] font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-11 text-[15px] font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center transition-colors"
                >
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

      <DonationModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        type="general"
      />
    </>
  );
});

export default Navigation;

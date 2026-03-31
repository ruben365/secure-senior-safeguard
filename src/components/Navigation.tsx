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
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { DonationModal } from "@/components/DonationModal";

const primaryLinks = [
  { name: "Services", href: "/services" },
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

const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();
  const moreRef = React.useRef<HTMLDivElement>(null);

  const isAdminOrStaff = user && roleConfig;

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close "More" dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  // Lock scroll when mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const isSecondaryActive = secondaryLinks.some((l) => isActiveLink(l.href));

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav
        className={`sticky top-0 z-[9999] bg-white/98 backdrop-blur-md border-b border-border/60 transition-shadow duration-200 ${
          scrolled ? "shadow-md shadow-blue-900/5" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity flex-shrink-0 no-underline"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <img
                  src={invisionLogo}
                  alt="InVision Network Shield"
                  width={22}
                  height={22}
                  loading="eager"
                  decoding="sync"
                  className="w-[22px] h-[22px] object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold text-foreground tracking-tight font-heading">
                  InVision Network
                </span>
                <span className="text-[10px] font-semibold text-primary hidden sm:block tracking-widest uppercase">
                  AI Scam Protection
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {primaryLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm px-3.5 py-2 rounded-md font-medium transition-colors duration-150 ${
                      isActive
                        ? "text-primary font-semibold bg-primary/8"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                    )}
                    {link.name}
                  </PrefetchLink>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex items-center gap-1 text-sm px-3.5 py-2 rounded-md font-medium transition-colors duration-150 ${
                    isSecondaryActive
                      ? "text-primary font-semibold bg-primary/8"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  More
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                {moreOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 bg-white rounded-xl border border-border shadow-lg shadow-blue-900/8 py-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                    {secondaryLinks.map((link) => (
                      <PrefetchLink
                        key={link.name}
                        to={link.href}
                        className={`block px-4 py-2 text-sm transition-colors rounded-lg mx-1 ${
                          isActiveLink(link.href)
                            ? "text-primary font-semibold bg-primary/8"
                            : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
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

            {/* Right side actions */}
            <div className="flex items-center gap-1.5">
              <ShoppingCart />

              {/* Phone — xl+ only */}
              <a
                href={SITE.phone.tel}
                className="hidden xl:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-md hover:bg-primary/8 no-underline font-medium"
                aria-label={`Call ${SITE.phone.display}`}
              >
                <Phone className="w-3.5 h-3.5" />
                {SITE.phone.display}
              </a>

              {/* Donate */}
              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Donate</span>
              </button>

              <div className="hidden lg:block w-px h-5 bg-border mx-0.5" />

              {/* CTA button */}
              <Button
                asChild
                size="sm"
                className="h-9 px-5 text-sm font-semibold rounded-lg shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isAdminOrStaff ? (
                  <Link to="/admin" className="flex items-center gap-1.5">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/portal">Login</Link>
                )}
              </Button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden ml-1 p-2.5 rounded-lg hover:bg-muted/60 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-[10001] overflow-y-auto overscroll-contain pb-safe">
            {/* Trust bar at top of mobile menu */}
            <div className="bg-primary/5 border-b border-border/50 px-4 py-2 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-xs text-primary font-medium">Veteran-founded · Ohio · Serving 500+ families</span>
            </div>

            <div className="px-4 py-3 space-y-0.5">
              {allLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center text-[15px] font-medium px-4 py-3.5 rounded-xl transition-colors ${
                    isActiveLink(link.href)
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Divider */}
              <div className="pt-3 mt-3 border-t border-border space-y-2.5">
                <Button
                  variant="outline"
                  className="w-full h-11 text-[15px] font-semibold border-primary/30 text-primary hover:bg-primary/8"
                  onClick={() => { setDonateOpen(true); setMobileMenuOpen(false); }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>

                <Button
                  asChild
                  className="w-full h-11 text-[15px] font-semibold bg-primary hover:bg-primary/90"
                >
                  {isAdminOrStaff ? (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </Link>
                  )}
                </Button>

                <a
                  href={SITE.phone.tel}
                  className="flex items-center justify-center gap-2 text-[15px] text-muted-foreground font-medium px-4 py-3 rounded-xl hover:bg-muted/40 transition-colors no-underline"
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

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} type="general" />
    </>
  );
});

Navigation.displayName = "Navigation";
export default Navigation;

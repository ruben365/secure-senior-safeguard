import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  LayoutDashboard,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrefetchLink } from "@/components/PrefetchLink";
import { ShoppingCart } from "@/components/ShoppingCart";
import { useAuth } from "@/contexts/AuthContext";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { DonationModal } from "@/components/DonationModal";

const primaryLinks = [
  { name: "How It Works", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Training", href: "/training" },
  { name: "FAQ", href: "/faq" },
  { name: "Resources", href: "/resources" },
];

const secondaryLinks = [
  { name: "Careers", href: "/careers" },
  { name: "AI & Business", href: "/business" },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

const Navigation = React.memo(() => {
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
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-[9999] bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-150 flex-shrink-0 no-underline"
              onClick={handleBrandClick}
            >
              <img
                src={invisionLogo}
                alt="InVision Network Shield Logo"
                width={32}
                height={32}
                loading="eager"
                decoding="sync"
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <span className="text-[17px] font-bold text-foreground tracking-tight">
                InVision
              </span>
            </a>

            {/* Desktop Navigation — centered */}
            <div className="hidden lg:flex items-center gap-0.5">
              {primaryLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`text-[13px] px-4 py-2 rounded-full transition-colors duration-150 ${
                      isActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-muted-foreground font-medium hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </PrefetchLink>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <ShoppingCart />

              <button
                type="button"
                onClick={() => setDonateOpen(true)}
                className="hidden lg:flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Donate"
              >
                <Heart className="w-4 h-4" />
              </button>

              {/* Contact Us button - pill style like fitup */}
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden lg:flex h-10 px-5 text-[13px] font-semibold rounded-full border-foreground/20 bg-transparent hover:bg-foreground hover:text-background transition-all"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Contact Us
                </Link>
              </Button>

              {/* Login / Dashboard */}
              {isAdminOrStaff ? (
                <Button
                  asChild
                  size="sm"
                  className="h-10 px-5 text-[13px] font-semibold rounded-full"
                >
                  <Link
                    to="/admin"
                    aria-label="Go to Dashboard"
                    className="flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="hidden lg:flex h-10 px-5 text-[13px] font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link to="/portal">Get Started</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors duration-150 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-background border-t border-border/30 z-[10001] overflow-y-auto overscroll-contain pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
            <div className="container mx-auto px-4 py-6 space-y-1">
              {allLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block text-[15px] font-medium px-4 py-3.5 rounded-xl transition-colors ${
                      isActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

              <div className="pt-4 border-t border-border/30 mt-3 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-[15px] font-semibold rounded-full"
                  onClick={() => {
                    setDonateOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>

                <Button
                  asChild
                  className="w-full h-12 text-[15px] font-semibold rounded-full bg-foreground text-background"
                >
                  {isAdminOrStaff ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  ) : (
                    <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  )}
                </Button>

                <a
                  href={SITE.phone.tel}
                  className="flex items-center justify-center gap-2 text-[15px] text-muted-foreground font-medium px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
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

      <DonationModal
        open={donateOpen}
        onOpenChange={setDonateOpen}
        type="general"
      />
    </>
  );
});

export default Navigation;

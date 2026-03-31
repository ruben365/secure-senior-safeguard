import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  LayoutDashboard,
  Heart,
  ChevronDown,
  Shield,
  ChevronRight,
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

const allNavLinks = [...primaryLinks, ...secondaryLinks];

// ─── Mobile Drawer ──────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  onDonate: () => void;
  isAdminOrStaff: boolean;
  activeHref: string;
}

function MobileDrawer({ open, onClose, onDonate, isAdminOrStaff, activeHref }: MobileDrawerProps) {
  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  const isActive = (href: string) =>
    activeHref === href || activeHref.startsWith(href + "/");

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(8,18,36,0.55)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              zIndex: 99998,
              cursor: "default",
            }}
          />

          {/* Drawer panel — slides in from right */}
          <motion.div
            key="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 88vw)",
              background: "#ffffff",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 48px rgba(6,109,179,0.18), -2px 0 16px rgba(0,0,0,0.08)",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              borderBottom: "1px solid hsl(214 32% 91%)",
              flexShrink: 0,
            }}>
              <Link
                to="/"
                onClick={onClose}
                style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "hsl(207 89% 34% / 0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <img src={invisionLogo} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "hsl(213 60% 12%)", lineHeight: 1.2 }}>
                    InVision Network
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "hsl(207 89% 34%)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    AI Scam Protection
                  </div>
                </div>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  border: "none", background: "hsl(210 40% 96%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} color="hsl(213 60% 20%)" />
              </button>
            </div>

            {/* Trust badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "8px 18px",
              background: "hsl(207 89% 34% / 0.05)",
              borderBottom: "1px solid hsl(207 89% 34% / 0.1)",
              flexShrink: 0,
            }}>
              <Shield size={13} color="hsl(207 89% 34%)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "hsl(207 89% 34%)" }}>
                Veteran-founded · Ohio · 500+ families protected
              </span>
            </div>

            {/* Nav links */}
            <nav aria-label="Main navigation" style={{ flex: 1, padding: "6px 10px 10px" }}>
              {allNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 14px",
                      borderRadius: 10,
                      marginBottom: 2,
                      fontSize: 15.5,
                      fontWeight: active ? 700 : 500,
                      color: active ? "hsl(207 89% 34%)" : "hsl(213 40% 22%)",
                      background: active ? "hsl(207 89% 34% / 0.08)" : "transparent",
                      textDecoration: "none",
                      minHeight: 50,
                    }}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={15} color={active ? "hsl(207 89% 34%)" : "hsl(213 40% 65%)"} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA actions */}
            <div style={{
              padding: "14px 16px 36px",
              borderTop: "1px solid hsl(214 32% 91%)",
              display: "flex",
              flexDirection: "column",
              gap: 9,
              flexShrink: 0,
            }}>
              {isAdminOrStaff ? (
                <Link
                  to="/admin"
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    height: 50, borderRadius: 12,
                    background: "hsl(207 89% 34%)",
                    color: "#fff", fontWeight: 700, fontSize: 15.5,
                    textDecoration: "none",
                  }}
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/portal"
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: 50, borderRadius: 12,
                    background: "hsl(207 89% 34%)",
                    color: "#fff", fontWeight: 700, fontSize: 15.5,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => { onClose(); onDonate(); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  height: 50, borderRadius: 12,
                  border: "1.5px solid hsl(207 89% 34% / 0.3)",
                  background: "transparent",
                  color: "hsl(207 89% 34%)", fontWeight: 700, fontSize: 15.5,
                  cursor: "pointer",
                }}
              >
                <Heart size={17} />
                Donate
              </button>

              <a
                href={SITE.phone.tel}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  height: 50, borderRadius: 12,
                  background: "hsl(210 40% 96%)",
                  color: "hsl(213 40% 30%)", fontWeight: 600, fontSize: 15,
                  textDecoration: "none",
                }}
              >
                <Phone size={16} />
                {SITE.phone.display}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─── Main Navigation ──────────────────────────────────────────────────────────

const Navigation = React.memo(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, roleConfig } = useAuth();
  const moreRef = React.useRef<HTMLDivElement>(null);

  const isAdminOrStaff = !!(user && roleConfig);

  const isActive = useCallback((href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/"),
    [location.pathname]
  );

  const isSecondaryActive = secondaryLinks.some((l) => isActive(l.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

  return (
    <>
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
                  alt="InVision Network"
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
                const active = isActive(link.href);
                return (
                  <PrefetchLink
                    key={link.name}
                    to={link.href}
                    className={`relative text-sm px-3.5 py-2 rounded-md font-medium transition-colors duration-150 ${
                      active
                        ? "text-primary font-semibold bg-primary/8"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                    )}
                    {link.name}
                  </PrefetchLink>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
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
                          isActive(link.href)
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

              {/* Donate — lg+ only */}
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

              {/* Login / Dashboard — always visible */}
              <Button
                asChild
                size="sm"
                className="h-9 px-4 text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isAdminOrStaff ? (
                  <Link to="/admin" className="flex items-center gap-1.5">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                ) : (
                  <Link to="/portal">Login</Link>
                )}
              </Button>

              {/* Hamburger — hidden on lg+ */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl hover:bg-muted/60 transition-colors ml-1"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-haspopup="dialog"
              >
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onDonate={() => setDonateOpen(true)}
        isAdminOrStaff={isAdminOrStaff}
        activeHref={location.pathname}
      />

      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} type="general" />
    </>
  );
});

Navigation.displayName = "Navigation";
export default Navigation;

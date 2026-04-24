import React, { useState, useCallback, useRef } from "react";
import "./WebsitePricingCards.css";
import { supabase } from "@/integrations/supabase/client";

/* ══════════════════════════════════════════
   CONFIG
══════════════════════════════════════════ */

const PKGS = {
  landing:   { id: "landing",   name: "Landing Page",     price: 1200, priceId: "price_landing_1200" },
  business:  { id: "business",  name: "Business Website", price: 2900, priceId: "price_business_2900" },
  ecommerce: { id: "ecommerce", name: "E-Commerce",       price: 6500, priceId: "price_ecom_6500" },
};

const BUILD_ADDONS = [
  { id: "logo",         category: "core",        name: "Logo Design",              price: 400,  desc: "Custom logo with 3 revisions" },
  { id: "domain_setup", category: "core",        name: "Custom Domain Setup",      price: 100,  desc: "Purchase, DNS, SSL configured" },
  { id: "email_setup",  category: "core",        name: "Business Email Setup",     price: 150,  desc: "For existing domain, 1 year" },
  { id: "chatbot",      category: "core",        name: "AI Chatbot Integration",   price: 950,  desc: "Trained on your business" },
  { id: "seo_geo",      category: "core",        name: "Advanced SEO with GEO",    price: 800,  desc: "Schema, GEO targeting, keywords" },
  { id: "content",      category: "core",        name: "Content Writing",          price: 200,  desc: "Per page, professional copy",   perPage: true },
  { id: "extra_page",   category: "core",        name: "Additional Pages",         price: 250,  desc: "Beyond the package limit",      perPage: true },
  { id: "revisions_30", category: "core",        name: "30 Revisions Package",     price: 450,  desc: "Priority revisions, post-launch" },
  { id: "blog",         category: "growth",      name: "Blog System",              price: 550,  desc: "Full CMS, categories, author roles" },
  { id: "booking",      category: "growth",      name: "Booking System",           price: 650,  desc: "Calendar, reminders, payments" },
  { id: "crm",          category: "growth",      name: "CRM or Dashboard",         price: 1200, desc: "Leads, customers, admin view" },
  { id: "automation",   category: "growth",      name: "Automation Workflows",     price: 700,  desc: "Email flows, lead routing" },
  { id: "maintenance",  category: "maintenance", name: "Monthly Maintenance Plan", price: 80,   desc: "Per month, updates, uptime",    monthly: true },
  { id: "ongoing_upd",  category: "maintenance", name: "Ongoing Updates",          price: 60,   desc: "Per month, content refreshes",  monthly: true },
  { id: "perf_opt",     category: "maintenance", name: "Performance Optimization", price: 400,  desc: "One-time speed tuning" },
  { id: "security_mon", category: "maintenance", name: "Security Monitoring",      price: 40,   desc: "Per month, threat alerts",      monthly: true },
];

const CAT_NOTES: Record<string, string> = {
  core:        "Logos, domains, SEO, chatbots, and content.",
  growth:      "Blog, booking, CRM, and automation workflows.",
  maintenance: "Ongoing plans and one-time tune-ups.",
};

const ENHANCEMENTS = [
  { id: "enh_pages",        name: "Add New Pages",      price: 250, desc: "Per page, styled to match",        perPage: true },
  { id: "enh_redesign",     name: "Redesign Pages",     price: 350, desc: "Per page, modern refresh",         perPage: true },
  { id: "enh_speed",        name: "Speed Optimization", price: 450, desc: "Core Web Vitals, image, caching" },
  { id: "enh_seo",          name: "SEO Upgrade",        price: 600, desc: "Schema, keywords, content audit" },
  { id: "enh_integrations", name: "Add Integrations",   price: 400, desc: "Stripe, CRM, email, analytics" },
];

const INSURANCE_PLANS = [
  { id: "ins_basic",  tier: "Basic Protection",        name: "Basic",        price: 29,  features: ["SSL management", "Weekly backups", "Email support"] },
  { id: "ins_pro",    tier: "Professional Protection", name: "Professional", price: 79,  flag: "POPULAR", features: ["Daily backups", "24/7 monitoring", "Priority support", "Malware scanning", "Data leak scanning", "AI threat detection"] },
  { id: "ins_ent",    tier: "Enterprise Protection",   name: "Enterprise",   price: 199, features: ["Real-time backups", "DDoS protection", "Global CDN", "Dedicated support", "Advanced AI monitoring"] },
  { id: "ins_custom", tier: "Custom Protection",       name: "Custom",       price: 99,  isCustom: true, features: ["Select features", "Flexible pricing", "Upgrade anytime"] },
];

const INS_CUSTOM_FEATURES = [
  { id: "cf_backups",   name: "Daily Backups",       price: 15 },
  { id: "cf_monitor",   name: "24/7 Monitoring",     price: 20 },
  { id: "cf_malware",   name: "Malware Scanning",    price: 18 },
  { id: "cf_leak",      name: "Data Leak Scanning",  price: 22 },
  { id: "cf_ai_threat", name: "AI Threat Detection", price: 25 },
  { id: "cf_cdn",       name: "Global CDN",          price: 30 },
  { id: "cf_ddos",      name: "DDoS Protection",     price: 35 },
  { id: "cf_dedicated", name: "Dedicated Support",   price: 50 },
];

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */

interface Package {
  id: string; tier: string;
  badge: { icon: React.ReactNode; label: string; anim: "wiggle" | "spin" | "none" };
  title: string; sub: string; price: number; priceDisplay: string; delivery: string;
  metrics: { label: string; value: string; trend?: boolean }[];
  chips: { icon: React.ReactNode; label: string }[];
  features: string[];
  colorA: string; colorB: string; colorC: string;
  graph: "line" | "bar" | "area"; featured: boolean;
}

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */

const BoltIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const StarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.5 17 14.5 18.2 21.5 12 18 5.8 21.5 7 14.5 2 9.5 9 8.5 12 2" /></svg>;
const ShoppingBagIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>;
const MobileIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2.5" /></svg>;
const DomainIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" /></svg>;
const SearchIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const CMSIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="4" rx="1" /><rect x="3" y="10" width="18" height="11" rx="1" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="17" x2="14" y2="17" /></svg>;
const CartIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" /></svg>;
const AdminIcon = () => <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>;
const TrendUpIcon = () => <svg className="wsp-trend-icon" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8v6h2V3h-10v2h6l-6 6-4-4-8 8z" /></svg>;
const CheckSmIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const ArrowRightIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const CloseIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="#5be5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
const GreenCheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="#5be5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const LockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;

/* ══════════════════════════════════════════
   PRICING CARD DATA
══════════════════════════════════════════ */

const PACKAGES: Package[] = [
  {
    id: "landing", tier: "Starter",
    badge: { icon: <BoltIcon />, label: "QUICK START", anim: "wiggle" },
    title: "Landing Page", sub: "One focused page built to convert",
    price: 1200, priceDisplay: "1,200", delivery: "Delivered in 2 weeks",
    metrics: [{ label: "Conversion", value: "+28%", trend: true }, { label: "Load", value: "0.9s" }],
    chips: [{ icon: <MobileIcon />, label: "Mobile" }, { icon: <DomainIcon />, label: "Domain" }],
    features: ["1 page responsive design", "Basic SEO setup", "1-year domain included", "1 business email (1 year)", "Contact form integration", "Basic analytics setup"],
    colorA: "#e08a4a", colorB: "#e8b070", colorC: "#d47a8e", graph: "line", featured: false,
  },
  {
    id: "business", tier: "Business",
    badge: { icon: <StarIcon />, label: "MOST POPULAR", anim: "spin" },
    title: "Business Website", sub: "Everything a growing brand needs",
    price: 2900, priceDisplay: "2,900", delivery: "Delivered in 3–4 weeks",
    metrics: [{ label: "Traffic", value: "+62%", trend: true }, { label: "Pages", value: "5–10" }],
    chips: [{ icon: <SearchIcon />, label: "SEO" }, { icon: <CMSIcon />, label: "CMS" }],
    features: ["5–10 pages, mobile responsive", "Full SEO optimization", "2-year domain included", "Business emails (1 year)", "Editable CMS system", "Booking or contact system", "Performance optimization"],
    colorA: "#7c6fd0", colorB: "#c382b8", colorC: "#6fb3c9", graph: "bar", featured: true,
  },
  {
    id: "ecommerce", tier: "Enterprise",
    badge: { icon: <ShoppingBagIcon />, label: "PREMIUM", anim: "none" },
    title: "E-Commerce", sub: "Sell products, scale revenue",
    price: 6500, priceDisplay: "6,500", delivery: "Delivered in 4–6 weeks",
    metrics: [{ label: "Revenue", value: "+124%", trend: true }, { label: "Checkout", value: "1-click" }],
    chips: [{ icon: <CartIcon />, label: "Stripe" }, { icon: <AdminIcon />, label: "Admin" }],
    features: ["Full product catalog system", "Stripe payment processing", "Inventory management", "Mobile responsive design", "Full SEO optimization", "Admin dashboard", "Order tracking system", "Automated email notifications"],
    colorA: "#4a8f90", colorB: "#3e7290", colorC: "#8cc4b8", graph: "area", featured: false,
  },
];

/* ══════════════════════════════════════════
   SVG GRAPHS
══════════════════════════════════════════ */

const LineGraph = ({ a, uid }: { a: string; uid: string }) => (
  <svg className="wsp-graph" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={`wsp-fill-${uid}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={a} stopOpacity="0.45" /><stop offset="100%" stopColor={a} stopOpacity="0" /></linearGradient></defs>
    <line className="wsp-grid-line" x1="0" y1="30" x2="300" y2="30" stroke={a} />
    <line className="wsp-grid-line" x1="0" y1="60" x2="300" y2="60" stroke={a} />
    <path className="wsp-area-fill" d="M0,85 L30,70 L60,72 L90,55 L120,58 L150,40 L180,45 L210,30 L240,32 L270,20 L300,18 L300,100 L0,100 Z" fill={`url(#wsp-fill-${uid})`} />
    <path className="wsp-line-path" d="M0,85 L30,70 L60,72 L90,55 L120,58 L150,40 L180,45 L210,30 L240,32 L270,20 L300,18" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle className="wsp-graph-dot" cx="270" cy="20" r="3.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.6s" }} />
    <circle className="wsp-graph-dot" cx="150" cy="40" r="2.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.4s" }} />
  </svg>
);

const BarGraph = ({ a }: { a: string }) => (
  <svg className="wsp-graph" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
    <line className="wsp-grid-line" x1="0" y1="30" x2="300" y2="30" stroke={a} />
    <line className="wsp-grid-line" x1="0" y1="60" x2="300" y2="60" stroke={a} />
    <rect className="wsp-bar" x="15"  y="65" width="22" height="35" rx="3" fill={a} style={{ animationDelay: "0.8s" }} />
    <rect className="wsp-bar" x="55"  y="55" width="22" height="45" rx="3" fill={a} style={{ animationDelay: "0.95s" }} />
    <rect className="wsp-bar" x="95"  y="40" width="22" height="60" rx="3" fill={a} style={{ animationDelay: "1.10s" }} />
    <rect className="wsp-bar" x="135" y="48" width="22" height="52" rx="3" fill={a} style={{ animationDelay: "1.25s" }} />
    <rect className="wsp-bar" x="175" y="30" width="22" height="70" rx="3" fill={a} style={{ animationDelay: "1.40s" }} />
    <rect className="wsp-bar" x="215" y="22" width="22" height="78" rx="3" fill={a} style={{ animationDelay: "1.55s" }} />
    <rect className="wsp-bar" x="255" y="10" width="22" height="90" rx="3" fill={a} style={{ animationDelay: "1.70s" }} />
  </svg>
);

const AreaGraph = ({ a, uid }: { a: string; uid: string }) => (
  <svg className="wsp-graph" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={`wsp-fill-${uid}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={a} stopOpacity="0.50" /><stop offset="100%" stopColor={a} stopOpacity="0" /></linearGradient></defs>
    <line className="wsp-grid-line" x1="0" y1="30" x2="300" y2="30" stroke={a} />
    <line className="wsp-grid-line" x1="0" y1="60" x2="300" y2="60" stroke={a} />
    <path className="wsp-area-fill" d="M0,75 C30,68 60,30 100,25 C140,18 180,50 220,35 C260,20 280,55 300,22 L300,100 L0,100 Z" fill={`url(#wsp-fill-${uid})`} />
    <path className="wsp-area-path" d="M0,75 C30,68 60,30 100,25 C140,18 180,50 220,35 C260,20 280,55 300,22" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle className="wsp-graph-dot" cx="100" cy="25" r="3.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.5s" }} />
    <circle className="wsp-graph-dot" cx="300" cy="22" r="3.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.7s" }} />
  </svg>
);

/* ══════════════════════════════════════════
   TOTALS HELPER
══════════════════════════════════════════ */

function calcTotal(
  basePackage: string,
  selected: Record<string, number>,
  enhancementsMap: Record<string, number>,
  insurance: string | null,
  insuranceCustom: Record<string, boolean>,
) {
  const pkg = PKGS[basePackage as keyof typeof PKGS] ?? PKGS.landing;
  let total = pkg.price;
  let monthly = 0;
  const lines: { kind: string; name: string; price: number; qty: number; subtotal: number; monthly?: boolean }[] = [
    { kind: "package", name: pkg.name, price: pkg.price, qty: 1, subtotal: pkg.price },
  ];

  Object.entries(selected).forEach(([id, qty]) => {
    const a = BUILD_ADDONS.find(x => x.id === id);
    if (!a) return;
    const subtotal = a.price * qty;
    if (a.monthly) monthly += subtotal; else total += subtotal;
    lines.push({ kind: "addon", name: a.name, price: a.price, qty, subtotal, monthly: !!a.monthly });
  });

  Object.entries(enhancementsMap).forEach(([id, qty]) => {
    const e = ENHANCEMENTS.find(x => x.id === id);
    if (!e) return;
    const subtotal = e.price * qty;
    total += subtotal;
    lines.push({ kind: "enhancement", name: e.name, price: e.price, qty, subtotal });
  });

  if (insurance) {
    const plan = INSURANCE_PLANS.find(p => p.id === insurance);
    if (plan) {
      let planMonthly = plan.price;
      if ((plan as any).isCustom) {
        Object.keys(insuranceCustom).forEach(fid => {
          const f = INS_CUSTOM_FEATURES.find(x => x.id === fid);
          if (f) planMonthly += f.price;
        });
      }
      monthly += planMonthly;
      lines.push({ kind: "insurance", name: plan.tier, price: planMonthly, qty: 1, subtotal: planMonthly, monthly: true });
    }
  }

  return { total, monthly, lines };
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

/* ══════════════════════════════════════════
   PRICING CARD (single)
══════════════════════════════════════════ */

const PremiumCard = ({ pkg, onGetStarted, onGetQuote }: {
  pkg: Package; onGetStarted: () => void; onGetQuote: () => void;
}) => {
  const cssVars = { "--wsp-a": pkg.colorA, "--wsp-b": pkg.colorB, "--wsp-c": pkg.colorC } as React.CSSProperties;
  return (
    <div className="wsp-col" style={{ animationDelay: pkg.id === "landing" ? "0.15s" : pkg.id === "business" ? "0.25s" : "0.35s" }}>
      <article className={`wsp-card${pkg.featured ? " wsp-card--pro" : ""} wsp-card--${pkg.id}`} style={cssVars}>
        <span className="wsp-edge-sheen" aria-hidden="true" />
        <span className="wsp-edge-ring" aria-hidden="true" />
        <span className="wsp-edge-rim" aria-hidden="true" />
        {pkg.graph === "line" && <LineGraph a={pkg.colorA} uid={pkg.id} />}
        {pkg.graph === "bar"  && <BarGraph  a={pkg.colorA} />}
        {pkg.graph === "area" && <AreaGraph a={pkg.colorA} uid={pkg.id} />}
        <div className="wsp-header-row">
          <div className="wsp-tier-name">{pkg.tier}</div>
          <span className={`wsp-badge${pkg.badge.anim !== "none" ? ` wsp-badge--${pkg.badge.anim}` : ""}`}>
            {pkg.badge.icon}{pkg.badge.label}
          </span>
        </div>
        <div className="wsp-tier-title">{pkg.title}</div>
        <div className="wsp-tier-sub">{pkg.sub}</div>
        <div className="wsp-price-holder">
          <span className="wsp-currency">$</span>
          <span className="wsp-price">{pkg.priceDisplay}</span>
        </div>
        <div className="wsp-delivery">{pkg.delivery}</div>
        <div className="wsp-metric-row">
          {pkg.metrics.map(m => (
            <div key={m.label} className="wsp-metric">
              <span className="wsp-metric-label">{m.label}</span>
              <span className="wsp-metric-value">{m.trend && <TrendUpIcon />}{m.value}</span>
            </div>
          ))}
        </div>
        <div className="wsp-chips">
          {pkg.chips.map((chip, i) => (
            <span key={i} className="wsp-chip">
              <span className="wsp-chip-icon-wrap">{chip.icon}</span>{chip.label}
            </span>
          ))}
        </div>
        <ul className="wsp-features">
          {pkg.features.map((f, i) => (
            <li key={i} className="wsp-feature">
              <span className="wsp-check"><CheckSmIcon /></span>{f}
            </li>
          ))}
        </ul>
        <div className="wsp-cta-wrap">
          <button className="wsp-cta" type="button" onClick={onGetStarted}>
            <span>GET STARTED</span>
            <span className="wsp-cta-arrow"><ArrowRightIcon /></span>
          </button>
          <button className="wsp-quote-link" type="button" onClick={onGetQuote}>
            CUSTOM CODE
          </button>
        </div>
      </article>
    </div>
  );
};

/* ══════════════════════════════════════════
   ADDON CARD (shared)
══════════════════════════════════════════ */

const AddonCard = ({ name, desc, price, priceLabel = "", checked, onToggle, qty, onDec, onInc, showQty }: {
  name: string; desc?: string; price: number; priceLabel?: string;
  checked: boolean; onToggle: () => void;
  qty?: number; onDec?: () => void; onInc?: () => void; showQty?: boolean;
}) => (
  <div className={`wsp-addon-card${checked ? " wsp-addon-card--checked" : ""}`} onClick={onToggle}>
    <span className="wsp-card-edge-glow" aria-hidden="true" />
    <div className={`wsp-addon-check${checked ? " wsp-addon-check--on" : ""}`}>
      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
    </div>
    <div className="wsp-addon-body">
      <div className="wsp-addon-name">{name}</div>
      {desc && <div className="wsp-addon-desc">{desc}</div>}
      {showQty && checked && qty !== undefined && (
        <div className="wsp-addon-qty" onClick={e => e.stopPropagation()}>
          <button type="button" className="wsp-qty-btn" onClick={onDec} disabled={(qty ?? 1) <= 1}>−</button>
          <span className="wsp-qty-value">{qty}</span>
          <button type="button" className="wsp-qty-btn" onClick={onInc}>+</button>
        </div>
      )}
    </div>
    <div className="wsp-addon-price">${price.toLocaleString()}{priceLabel}</div>
  </div>
);

/* ══════════════════════════════════════════
   CHECKOUT MODAL
══════════════════════════════════════════ */

function CheckoutModal({ open, basePackage, selected, enhancementsMap, insurance, insuranceCustom, onClose, onEditSelection }: {
  open: boolean; basePackage: string;
  selected: Record<string, number>; enhancementsMap: Record<string, number>;
  insurance: string | null; insuranceCustom: Record<string, boolean>;
  onClose: () => void; onEditSelection: () => void;
}) {
  const { total, monthly, lines } = calcTotal(basePackage, selected, enhancementsMap, insurance, insuranceCustom);
  const pkg = PKGS[basePackage as keyof typeof PKGS] ?? PKGS.landing;

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", businessType: "", pageCount: "2-5", domainStatus: "need", timeline: "asap", notes: "" });
  const [budget, setBudget] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [processingOpen, setProcessingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [procStep, setProcStep] = useState(0);

  const setField = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setErrorMsg("Please enter your name and email."); setErrorOpen(true); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setErrorMsg("Please enter a valid email address."); setErrorOpen(true); return; }
    if (!budget) { setErrorMsg("Please pick a budget range."); setErrorOpen(true); return; }
    setConfirmOpen(true);
  };

  const handleConfirmPay = async () => {
    setConfirmOpen(false);
    setProcessingOpen(true);
    setProcStep(0);
    try {
      const addonsPayload = Object.entries(selected).map(([id, qty]) => {
        const a = BUILD_ADDONS.find(x => x.id === id)!;
        return { id, qty, name: a.name, price: a.price, category: a.category, monthly: !!a.monthly };
      });
      const enhancementsPayload = Object.entries(enhancementsMap).map(([id, qty]) => {
        const e = ENHANCEMENTS.find(x => x.id === id)!;
        return { id, qty, name: e.name, price: e.price };
      });
      let insurancePayload = null;
      if (insurance) {
        const plan = INSURANCE_PLANS.find(p => p.id === insurance)!;
        const customFeatures = (plan as any).isCustom
          ? Object.keys(insuranceCustom).map(fid => {
              const f = INS_CUSTOM_FEATURES.find(x => x.id === fid)!;
              return { id: f.id, name: f.name, price: f.price };
            })
          : [];
        const planMonthly = plan.price + customFeatures.reduce((s, f) => s + f.price, 0);
        insurancePayload = { id: plan.id, tier: plan.tier, name: plan.name, basePrice: plan.price, monthly: planMonthly, customFeatures };
      }

      const payload = {
        customer: { ...form, budget },
        package: basePackage,
        packagePriceId: pkg.priceId,
        addons: addonsPayload,
        enhancements: enhancementsPayload,
        insurance: insurancePayload,
        total, monthlyTotal: monthly, lines,
        source: "ai_page_checkout",
        timestamp: new Date().toISOString(),
      };

      await Promise.allSettled([
        fetch("/api/supabase/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
        fetch("/api/supabase/custom-builds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
      ]);

      setProcStep(1);
      const { data, error } = await supabase.functions.invoke("create-webdesign-checkout", {
        body: { packageName: pkg.name, packageType: basePackage, totalAmount: total, addOns: addonsPayload, customerName: form.name, customerEmail: form.email, successUrl: `${window.location.origin}/ai?payment=success`, cancelUrl: `${window.location.origin}/ai` },
      });
      if (error) throw error;
      setProcStep(2);
      if (data?.url) {
        await new Promise(r => setTimeout(r, 420));
        setProcessingOpen(false);
        setSuccessOpen(true);
        await new Promise(r => setTimeout(r, 900));
        window.location.href = data.url;
      } else throw new Error("No checkout URL returned");
    } catch (err: any) {
      setProcessingOpen(false);
      setErrorMsg(err?.message || "Checkout failed. Please try again.");
      setErrorOpen(true);
    }
  };

  if (!open) return null;

  const addonNames = [
    ...Object.entries(selected).map(([id]) => BUILD_ADDONS.find(x => x.id === id)?.name ?? id),
    ...Object.entries(enhancementsMap).map(([id]) => ENHANCEMENTS.find(x => x.id === id)?.name ?? id),
  ];
  const insPlan = insurance ? INSURANCE_PLANS.find(p => p.id === insurance) : null;

  return (
    <>
      <div className="wsp-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="wsp-modal wsp-modal-checkout">
          <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
          <div className="wsp-checkout-layout">
            {/* LEFT hero */}
            <aside className="wsp-checkout-hero">
              <div className="wsp-hero-brand"><span className="wsp-brand-dot" /> Order Summary</div>
              <p className="wsp-hero-title">{pkg.name}</p>
              <div className="wsp-hero-total">
                {fmt(total)}{monthly > 0 && <span className="wsp-hero-monthly-note">+ {fmt(monthly)}/mo</span>}
              </div>
              <div className="wsp-hero-divider" />
              <div className="wsp-hero-lines">
                {lines.map((l, i) => (
                  <div key={i} className={`wsp-hero-line${i === 0 ? " wsp-hero-line--base" : l.kind === "insurance" ? " wsp-hero-line--insurance" : l.kind === "enhancement" ? " wsp-hero-line--enhance" : ""}`}>
                    <span className="wsp-hl-name">
                      {l.name}{l.qty > 1 && <span className="wsp-hl-qty">×{l.qty}</span>}{l.monthly && <span className="wsp-hl-monthly">/MO</span>}
                    </span>
                    <span className="wsp-hl-price">{fmt(l.subtotal)}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="wsp-hero-edit" onClick={() => { onClose(); onEditSelection(); }}>
                Edit selection
              </button>
              <div className="wsp-hero-trust">
                <div className="wsp-hero-trust-item"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10" /><polyline points="22 4 12 14 9 11" /></svg>Secured by Stripe</div>
                <div className="wsp-hero-trust-item"><LockIcon />256-bit SSL encryption</div>
                <div className="wsp-hero-trust-item"><GreenCheckIcon />Free strategy call before build</div>
              </div>
            </aside>
            {/* RIGHT form */}
            <div className="wsp-checkout-form-panel">
              <header className="wsp-checkout-form-header">
                <span className="wsp-modal-eyebrow">SECURE CHECKOUT</span>
                <h3 className="wsp-modal-title">Let's build your site</h3>
                <p className="wsp-modal-sub">A few quick details so we can kick things off the right way.</p>
                <div className="wsp-checkout-steps" aria-hidden="true">
                  <span className="wsp-step wsp-step--active"><span className="wsp-dot-s">1</span> Details</span>
                  <div className="wsp-steps-sep" />
                  <span className="wsp-step"><span className="wsp-dot-s">2</span> Payment</span>
                  <div className="wsp-steps-sep" />
                  <span className="wsp-step"><span className="wsp-dot-s">3</span> Kickoff</span>
                </div>
              </header>
              <form className="wsp-checkout-form-body" id="wsp-checkoutForm" onSubmit={handleSubmit}>
                <div className="wsp-form-section-title has-num"><span className="wsp-num">1</span> Your contact</div>
                <div className="wsp-form-row">
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Full Name <span className="wsp-req">*</span></label>
                    <input className="wsp-form-input" type="text" placeholder="Jane Doe" value={form.name} onChange={setField("name")} required />
                  </div>
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Email <span className="wsp-req">*</span></label>
                    <input className="wsp-form-input" type="email" placeholder="jane@company.com" value={form.email} onChange={setField("email")} required />
                  </div>
                </div>
                <div className="wsp-form-row">
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Phone <span className="wsp-req">*</span></label>
                    <input className="wsp-form-input" type="tel" placeholder="(614) 555-0123" value={form.phone} onChange={setField("phone")} />
                  </div>
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Business Name <span className="wsp-req">*</span></label>
                    <input className="wsp-form-input" type="text" placeholder="Acme Co." value={form.company} onChange={setField("company")} />
                  </div>
                </div>
                <div className="wsp-form-section-title has-num" style={{ marginTop: 14 }}><span className="wsp-num">2</span> Project details</div>
                <div className="wsp-form-row">
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Business Type <span className="wsp-req">*</span></label>
                    <select className="wsp-form-input wsp-form-select" value={form.businessType} onChange={setField("businessType")} required>
                      <option value="">Select</option>
                      <option value="retail">Retail / E-commerce</option>
                      <option value="services">Professional Services</option>
                      <option value="restaurant">Restaurant / Food</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="realestate">Real Estate</option>
                      <option value="nonprofit">Non-profit</option>
                      <option value="tech">Tech / SaaS</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Number of Pages</label>
                    <select className="wsp-form-input wsp-form-select" value={form.pageCount} onChange={setField("pageCount")}>
                      <option value="1">1 page</option>
                      <option value="2-5">2-5 pages</option>
                      <option value="6-10">6-10 pages</option>
                      <option value="11-20">11-20 pages</option>
                      <option value="20+">20+ pages</option>
                    </select>
                  </div>
                </div>
                <div className="wsp-form-row">
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Domain Status</label>
                    <select className="wsp-form-input wsp-form-select" value={form.domainStatus} onChange={setField("domainStatus")}>
                      <option value="need">I need a new domain</option>
                      <option value="have">I already own one</option>
                      <option value="transfer">I want to transfer mine</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="wsp-form-group">
                    <label className="wsp-form-label">Target Launch</label>
                    <select className="wsp-form-input wsp-form-select" value={form.timeline} onChange={setField("timeline")}>
                      <option value="asap">As soon as possible</option>
                      <option value="2-4w">2-4 weeks</option>
                      <option value="1-2m">1-2 months</option>
                      <option value="flex">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="wsp-form-group" style={{ marginTop: 8 }}>
                  <label className="wsp-form-label">Budget range <span className="wsp-req">*</span></label>
                  <div className="wsp-pill-selector">
                    {["<2000", "2000-5000", "5000-10000", "10000-20000", "20000+"].map((v, i) => (
                      <button key={v} type="button" className={`wsp-pill-opt${budget === v ? " wsp-pill-opt--active" : ""}`}
                        onClick={() => setBudget(v)}>
                        {["Under $2k", "$2k-$5k", "$5k-$10k", "$10k-$20k", "$20k+"][i]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Project details <span className="wsp-hint">brand colors, reference sites, integrations</span></label>
                  <textarea className="wsp-form-input wsp-form-textarea" placeholder="Tell us about your project, goals, and any integrations you need..." value={form.notes} onChange={setField("notes")} rows={3} />
                </div>
              </form>
              <div className="wsp-modal-footer">
                <span className="wsp-footer-note"><LockIcon /> Your info is encrypted end-to-end</span>
                <button className="wsp-btn-ghost" type="button" onClick={onClose}>Cancel</button>
                <button className="wsp-btn-primary wsp-btn-wide" type="submit" form="wsp-checkoutForm">
                  Proceed to Payment <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      {confirmOpen && (
        <div className="wsp-dialog-overlay" onClick={e => e.target === e.currentTarget && setConfirmOpen(false)}>
          <div className="wsp-dialog wsp-dialog--md">
            <button className="wsp-modal-close" type="button" onClick={() => setConfirmOpen(false)} aria-label="Close"><CloseIcon /></button>
            <div className="wsp-dialog-body">
              <div className="wsp-dialog-icon wsp-dialog-icon--ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              </div>
              <h3 className="wsp-dialog-title">Review your order</h3>
              <p className="wsp-dialog-sub">Double-check the details below. You'll go to Stripe to complete payment.</p>
              <div className="wsp-dialog-card">
                <div className="wsp-dialog-row"><span>Base Package</span><span>{pkg.name} — {fmt(pkg.price)}</span></div>
                <div className="wsp-dialog-row"><span>Add-ons &amp; Enhancements</span><span>{addonNames.length ? addonNames.join(", ") : "None"}</span></div>
                <div className="wsp-dialog-row"><span>Protection</span><span>{insPlan ? insPlan.name : "None"}</span></div>
                <div className="wsp-dialog-row"><span>Customer</span><span>{form.name} • {form.email}</span></div>
                <div className="wsp-dialog-divider" />
                <div className="wsp-dialog-row wsp-dialog-row--total"><span>One-time total</span><span>{fmt(total)}</span></div>
                {monthly > 0 && <div className="wsp-dialog-row wsp-dialog-row--total"><span>Recurring</span><span>{fmt(monthly)}/mo</span></div>}
              </div>
              <div className="wsp-dialog-actions">
                <button className="wsp-btn-ghost" type="button" onClick={() => setConfirmOpen(false)}>Back to edit</button>
                <button className="wsp-btn-primary wsp-btn-wide" type="button" onClick={handleConfirmPay}>
                  <LockIcon /> Confirm &amp; Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing */}
      {processingOpen && (
        <div className="wsp-dialog-overlay">
          <div className="wsp-dialog wsp-dialog--sm">
            <div className="wsp-dialog-body wsp-dialog-body--center">
              <div className="wsp-dialog-spinner" />
              <h3 className="wsp-dialog-title">Preparing secure checkout</h3>
              <div className="wsp-dialog-steps">
                <div className={`wsp-ds-item${procStep === 0 ? " active" : procStep > 0 ? " done" : ""}`}><span className="wsp-ds-dot" /> Saving order</div>
                <div className={`wsp-ds-item${procStep === 1 ? " active" : procStep > 1 ? " done" : ""}`}><span className="wsp-ds-dot" /> Opening Stripe</div>
                <div className={`wsp-ds-item${procStep === 2 ? " active" : ""}`}><span className="wsp-ds-dot" /> Redirecting</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {successOpen && (
        <div className="wsp-dialog-overlay">
          <div className="wsp-dialog wsp-dialog--sm">
            <div className="wsp-dialog-body wsp-dialog-body--center">
              <div className="wsp-dialog-icon wsp-dialog-icon--success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div>
              <h3 className="wsp-dialog-title">You're all set</h3>
              <p className="wsp-dialog-sub">We saved your order. You're heading to Stripe to complete payment.</p>
              <button className="wsp-btn-primary" type="button" onClick={() => setSuccessOpen(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {errorOpen && (
        <div className="wsp-dialog-overlay" onClick={e => e.target === e.currentTarget && setErrorOpen(false)}>
          <div className="wsp-dialog wsp-dialog--sm">
            <button className="wsp-modal-close" type="button" onClick={() => setErrorOpen(false)} aria-label="Close"><CloseIcon /></button>
            <div className="wsp-dialog-body wsp-dialog-body--center">
              <div className="wsp-dialog-icon wsp-dialog-icon--error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="13" /><line x1="12" y1="16.5" x2="12" y2="16.5" /></svg></div>
              <h3 className="wsp-dialog-title">Something went wrong</h3>
              <p className="wsp-dialog-sub">{errorMsg}</p>
              <div className="wsp-dialog-actions">
                <button className="wsp-btn-ghost" type="button" onClick={() => setErrorOpen(false)}>Close</button>
                <button className="wsp-btn-primary" type="button" onClick={() => { setErrorOpen(false); setConfirmOpen(true); }}>Try again</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   QUOTE MODAL
══════════════════════════════════════════ */

function QuoteModal({ open, preselectedType, onClose }: { open: boolean; preselectedType: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [websiteType, setWebsiteType] = useState(preselectedType || "");
  const [businessType, setBusinessType] = useState("");
  const [pageCount, setPageCount] = useState("2-5");
  const [budget, setBudget] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !websiteType) return;
    if (!/\S+@\S+\.\S+/.test(email)) return;
    setLoading(true);
    try {
      const quoteNumber = `WDQ-${Date.now().toString().slice(-8)}`;
      await (supabase as any).from("web_design_quotes").insert([{
        quote_number: quoteNumber, name, email,
        website_type: websiteType || null, budget_range: budget || null,
        additional_notes: features || null, status: "new",
        metadata: { phone, company, businessType, pageCount },
      }]);
      onClose();
    } catch {
      /* non-blocking */
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const TYPES = [
    { id: "landing",   label: "Landing Page",    sub: "1 page, high-converting" },
    { id: "business",  label: "Business Website", sub: "Multi-page, full presence" },
    { id: "ecommerce", label: "E-Commerce",       sub: "Sell products online" },
    { id: "custom",    label: "Custom Build",     sub: "Mix, app, or bespoke" },
  ];

  return (
    <div className="wsp-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="wsp-modal wsp-modal-quote">
        <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        <div className="wsp-quote-layout">
          <aside className="wsp-quote-hero">
            <p className="wsp-hero-kicker">CUSTOM QUOTE</p>
            <h3 className="wsp-quote-headline">Your project, scoped in 24 hours.</h3>
            <div className="wsp-hero-timeline">
              {[
                { n: 1, h: "You share the details", p: "A few quick questions, no commitment." },
                { n: 2, h: "We reply within 24h",   p: "Tailored scope and fixed-price quote." },
                { n: 3, h: "Free strategy call",    p: "30-minute walkthrough, zero pressure." },
              ].map(s => (
                <div key={s.n} className="wsp-tl-item">
                  <div className="wsp-tl-dot">{s.n}</div>
                  <div className="wsp-tl-content"><h4>{s.h}</h4><p>{s.p}</p></div>
                </div>
              ))}
            </div>
            <div className="wsp-hero-stats">
              <div><div className="wsp-hero-stat-num">50+</div><div className="wsp-hero-stat-label">SITES LAUNCHED</div></div>
              <div><div className="wsp-hero-stat-num">4.9★</div><div className="wsp-hero-stat-label">CLIENT RATING</div></div>
            </div>
          </aside>
          <div className="wsp-checkout-form-panel">
            <div className="wsp-checkout-form-header">
              <span className="wsp-modal-eyebrow">TELL US ABOUT YOUR PROJECT</span>
              <h3 className="wsp-modal-title">Let's build something sharp.</h3>
              <p className="wsp-modal-sub">Share a few details and we'll send a tailored quote.</p>
            </div>
            <form className="wsp-checkout-form-body" id="wsp-quoteForm" onSubmit={handleSubmit}>
              <div className="wsp-form-section-title has-num"><span className="wsp-num">1</span> About you</div>
              <div className="wsp-form-row">
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Name <span className="wsp-req">*</span></label>
                  <input className="wsp-form-input" type="text" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Email <span className="wsp-req">*</span></label>
                  <input className="wsp-form-input" type="email" placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="wsp-form-row">
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Phone <span className="wsp-hint">optional</span></label>
                  <input className="wsp-form-input" type="tel" placeholder="(555) 555-5555" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Company <span className="wsp-hint">optional</span></label>
                  <input className="wsp-form-input" type="text" placeholder="Company name" value={company} onChange={e => setCompany(e.target.value)} />
                </div>
              </div>
              <div className="wsp-form-section-title has-num" style={{ marginTop: 16 }}><span className="wsp-num">2</span> Website type</div>
              <div className="wsp-radio-cards">
                {TYPES.map(t => (
                  <div key={t.id} className={`wsp-radio-card${websiteType === t.id ? " wsp-radio-card--selected" : ""}`}
                    onClick={() => setWebsiteType(t.id)} role="radio" aria-checked={websiteType === t.id} tabIndex={0}
                    onKeyDown={e => e.key === " " && setWebsiteType(t.id)}>
                    <div className="wsp-radio-card-body">
                      <div className="wsp-radio-card-label">{t.label}</div>
                      <div className="wsp-radio-card-sub">{t.sub}</div>
                    </div>
                    <span className="wsp-radio-card-check"><CheckSmIcon /></span>
                  </div>
                ))}
              </div>
              <div className="wsp-form-section-title has-num" style={{ marginTop: 16 }}><span className="wsp-num">3</span> Scope &amp; budget</div>
              <div className="wsp-form-row">
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Business type</label>
                  <select className="wsp-form-input wsp-form-select" value={businessType} onChange={e => setBusinessType(e.target.value)}>
                    <option value="">Select</option>
                    <option value="retail">Retail / E-commerce</option>
                    <option value="services">Professional Services</option>
                    <option value="restaurant">Restaurant / Food</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="realestate">Real Estate</option>
                    <option value="nonprofit">Non-profit</option>
                    <option value="tech">Tech / SaaS</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Pages expected</label>
                  <select className="wsp-form-input wsp-form-select" value={pageCount} onChange={e => setPageCount(e.target.value)}>
                    <option value="1">1 page</option>
                    <option value="2-5">2-5 pages</option>
                    <option value="6-10">6-10 pages</option>
                    <option value="11-20">11-20 pages</option>
                    <option value="20+">20+ pages</option>
                  </select>
                </div>
              </div>
              <div className="wsp-form-group" style={{ marginTop: 8 }}>
                <label className="wsp-form-label">Budget range</label>
                <div className="wsp-pill-selector">
                  {["<2000", "2000-5000", "5000-10000", "10000-20000", "20000+"].map((v, i) => (
                    <button key={v} type="button" className={`wsp-pill-opt${budget === v ? " wsp-pill-opt--active" : ""}`}
                      onClick={() => setBudget(v)}>
                      {["Under $2k", "$2k-$5k", "$5k-$10k", "$10k-$20k", "$20k+"][i]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="wsp-form-group" style={{ marginTop: 12 }}>
                <label className="wsp-form-label">Features &amp; notes <span className="wsp-hint">optional</span></label>
                <textarea className="wsp-form-input wsp-form-textarea" placeholder="e.g. booking system, member login, multi-language, integrations, deadline..." value={features} onChange={e => setFeatures(e.target.value)} rows={3} />
              </div>
            </form>
            <div className="wsp-modal-footer">
              <span className="wsp-footer-note"><GreenCheckIcon /> Reply within 24 hours</span>
              <button className="wsp-btn-ghost" type="button" onClick={onClose}>Cancel</button>
              <button className="wsp-btn-primary" type="submit" form="wsp-quoteForm" disabled={loading}>
                {loading ? "Sending…" : "Send Quote Request"} <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */

export const WebsitePricingCards = () => {
  const [basePackage, setBasePackage] = useState("landing");
  const [activeMode, setActiveMode] = useState("build");
  const [activeCategory, setActiveCategory] = useState("core");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [enhancementsMap, setEnhancementsMap] = useState<Record<string, number>>({});
  const [insurance, setInsurance] = useState<string | null>(null);
  const [insuranceCustom, setInsuranceCustom] = useState<Record<string, boolean>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteType, setQuoteType] = useState("");

  const customizeSectionRef = useRef<HTMLDivElement>(null);

  const toggleAddon = useCallback((id: string) => {
    setSelected(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = 1;
      return next;
    });
  }, []);

  const setAddonQty = useCallback((id: string, qty: number) => {
    setSelected(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[id]; else next[id] = Math.min(50, Math.max(1, qty));
      return next;
    });
  }, []);

  const toggleEnh = useCallback((id: string) => {
    setEnhancementsMap(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = 1;
      return next;
    });
  }, []);

  const setEnhQty = useCallback((id: string, qty: number) => {
    setEnhancementsMap(prev => {
      const next = { ...prev };
      if (qty <= 0) delete next[id]; else next[id] = Math.min(50, Math.max(1, qty));
      return next;
    });
  }, []);

  const selectInsurance = useCallback((id: string) => {
    setInsurance(prev => prev === id ? null : id);
  }, []);

  const toggleInsFeature = useCallback((id: string) => {
    setInsuranceCustom(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      return next;
    });
  }, []);

  const { total, monthly } = calcTotal(basePackage, selected, enhancementsMap, insurance, insuranceCustom);
  const pkg = PKGS[basePackage as keyof typeof PKGS] ?? PKGS.landing;
  const addonCount = Object.keys(selected).length;
  const enhCount = Object.keys(enhancementsMap).length;
  const insCount = insurance ? 1 : 0;
  const parts = [
    addonCount ? `${addonCount} add-on${addonCount > 1 ? "s" : ""}` : "",
    enhCount ? `${enhCount} enhancement${enhCount > 1 ? "s" : ""}` : "",
    insCount ? "protection plan" : "",
  ].filter(Boolean);
  const breakdown = parts.length ? `${pkg.name} + ${parts.join(", ")}` : `${pkg.name}, no add-ons`;

  const isCustomInsOpen = insurance === "ins_custom";

  return (
    <div className="wsp-root">
      {/* Floating blobs (decorative) */}
      <div className="wsp-blob wsp-blob--1" aria-hidden="true" />
      <div className="wsp-blob wsp-blob--2" aria-hidden="true" />
      <div className="wsp-blob wsp-blob--3" aria-hidden="true" />

      <div className="wsp-section">
        {/* Heading */}
        <div className="wsp-heading-wrap">
          <span className="wsp-eyebrow"><span className="wsp-eyebrow-dot" /> WEB DESIGN</span>
          <h1 className="wsp-h1">Websites That <span className="wsp-h1-accent">Sell For You</span></h1>
          <p className="wsp-subhead">Fast, secure sites that turn visitors into paying customers. Ohio-based pricing, built to scale.</p>
        </div>

        {/* Pricing cards */}
        <div className="wsp-grid">
          {PACKAGES.map(p => (
            <PremiumCard
              key={p.id}
              pkg={p}
              onGetStarted={() => { setBasePackage(p.id); setCheckoutOpen(true); }}
              onGetQuote={() => { setQuoteType(p.id); setQuoteOpen(true); }}
            />
          ))}
        </div>

      {/* Market note */}
      <div className="wsp-market-note">
        <span className="wsp-dot-ohio" />
        Priced 12-18% below the Ohio market average · <b>All packages include hosting for year 1</b>
      </div>

      {/* Customize section */}
      <div className="wsp-addons-section" ref={customizeSectionRef}>
        <div className="wsp-addons-section-noise" aria-hidden="true" />

        <div className="wsp-addons-header">
          <span className="wsp-addons-eyebrow">CUSTOMIZE</span>
          <h2 className="wsp-addons-title">Build Your Perfect Package</h2>
          <p className="wsp-addons-sub">Pick a mode, choose your options — your total updates live.</p>
        </div>

        {/* Mode tabs */}
        <div className="wsp-mode-tabs" id="wsp-modeTabs">
          {[
            { id: "build",   label: "BUILD" },
            { id: "enhance", label: "ENHANCE" },
            { id: "protect", label: "PROTECT" },
          ].map(m => (
            <button
              key={m.id}
              type="button"
              className={`wsp-mode-tab${activeMode === m.id ? " active" : ""}`}
              onClick={() => setActiveMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* BUILD mode */}
        {activeMode === "build" && (
          <div className="wsp-mode-group">
            {/* Package selector */}
            <div className="wsp-package-selector">
              {Object.values(PKGS).map(p => (
                <button
                  key={p.id}
                  type="button"
                  className={`wsp-pkg-option${basePackage === p.id ? " active" : ""}`}
                  onClick={() => setBasePackage(p.id)}
                >
                  <span className="wsp-pkg-accent" aria-hidden="true" />
                  <input type="radio" name="wsp-pkg" readOnly checked={basePackage === p.id} style={{ display: "none" }} />
                  {p.name}
                  <span className="wsp-pkg-price">${p.price.toLocaleString()}</span>
                </button>
              ))}
            </div>

            {/* Category tabs */}
            <div className="wsp-builder-tabs" id="wsp-builderTabs">
              {["core", "growth", "maintenance"].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`wsp-builder-tab${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="wsp-cat-note">{CAT_NOTES[activeCategory]}</p>

            {/* Category groups */}
            {["core", "growth", "maintenance"].map(cat => (
              <div key={cat} className={`wsp-category-group${activeCategory === cat ? " active" : ""}`}>
                <div className="wsp-addons-grid wsp-addons-grid--orange">
                  {BUILD_ADDONS.filter(a => a.category === cat).map(a => {
                    const qty = selected[a.id] ?? 0;
                    const checked = qty > 0;
                    const priceLabel = (a as any).perPage ? "/pg" : (a as any).monthly ? "/mo" : "";
                    return (
                      <AddonCard
                        key={a.id}
                        name={a.name}
                        desc={a.desc}
                        price={a.price}
                        priceLabel={priceLabel}
                        checked={checked}
                        onToggle={() => toggleAddon(a.id)}
                        qty={qty || 1}
                        showQty={!!(a as any).perPage}
                        onDec={() => setAddonQty(a.id, qty - 1)}
                        onInc={() => setAddonQty(a.id, qty + 1)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ENHANCE mode */}
        {activeMode === "enhance" && (
          <div className="wsp-mode-group">
            <p className="wsp-cat-note">Upgrade or expand an existing site. One-time fees, no subscription.</p>
            <div className="wsp-addons-grid wsp-addons-grid--teal">
              {ENHANCEMENTS.map(e => {
                const qty = enhancementsMap[e.id] ?? 0;
                const checked = qty > 0;
                const priceLabel = (e as any).perPage ? "/pg" : "";
                return (
                  <AddonCard
                    key={e.id}
                    name={e.name}
                    desc={e.desc}
                    price={e.price}
                    priceLabel={priceLabel}
                    checked={checked}
                    onToggle={() => toggleEnh(e.id)}
                    qty={qty || 1}
                    showQty={!!(e as any).perPage}
                    onDec={() => setEnhQty(e.id, qty - 1)}
                    onInc={() => setEnhQty(e.id, qty + 1)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* PROTECT mode */}
        {activeMode === "protect" && (
          <div className="wsp-mode-group">
            <p className="wsp-cat-note">Backups, monitoring, and support. Pick one plan, upgrade anytime.</p>
            <div className="wsp-insurance-grid">
              {INSURANCE_PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`wsp-ins-card${insurance === plan.id ? " selected" : ""}${(plan as any).isCustom ? " popular" : ""}`}
                  onClick={() => selectInsurance(plan.id)}
                >
                  <span className="wsp-ins-accent-bar" aria-hidden="true" />
                  {(plan as any).flag && <span className="wsp-ins-flag">{(plan as any).flag}</span>}
                  <span className="wsp-ins-tier">{plan.tier}</span>
                  <span className="wsp-ins-name">{plan.name}</span>
                  <span className="wsp-ins-price">${plan.price}{(plan as any).isCustom ? "+" : ""}<span className="wsp-ins-per"> /mo</span></span>
                  <ul className="wsp-ins-features">
                    {plan.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            {/* Custom insurance builder */}
            <div className={`wsp-ins-custom-builder${isCustomInsOpen ? " open" : ""}`}>
              <div className="wsp-ins-custom-head">Pick the features you want, price updates live.</div>
              <div className="wsp-addons-grid wsp-addons-grid--purple">
                {INS_CUSTOM_FEATURES.map(f => (
                  <AddonCard
                    key={f.id}
                    name={f.name}
                    price={f.price}
                    priceLabel="/mo"
                    checked={!!insuranceCustom[f.id]}
                    onToggle={() => toggleInsFeature(f.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary bar */}
        <div className="wsp-summary-bar" style={{ marginTop: 24 }}>
          <div className="wsp-summary-text">
            <span className="wsp-summary-label">Your Selection</span>
            <span className="wsp-summary-breakdown">{breakdown}</span>
          </div>
          <div className="wsp-summary-total">
            <span className="wsp-summary-price">
              {fmt(total)}{monthly > 0 && <span className="wsp-summary-monthly"> + {fmt(monthly)}/mo</span>}
            </span>
            <button className="wsp-summary-btn" type="button" onClick={() => setCheckoutOpen(true)}>
              CHECKOUT
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <p className="wsp-footnote">
          Need something custom? <strong>Let's talk.</strong> Every project gets a free strategy call.
        </p>
      </div>
      </div>{/* /wsp-section */}

      {/* Modals */}
      <CheckoutModal
        open={checkoutOpen}
        basePackage={basePackage}
        selected={selected}
        enhancementsMap={enhancementsMap}
        insurance={insurance}
        insuranceCustom={insuranceCustom}
        onClose={() => setCheckoutOpen(false)}
        onEditSelection={() => customizeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <QuoteModal
        open={quoteOpen}
        preselectedType={quoteType}
        onClose={() => setQuoteOpen(false)}
      />
    </div>
  );
};

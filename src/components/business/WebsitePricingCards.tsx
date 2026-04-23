import React, { useState, useCallback } from "react";
import "./WebsitePricingCards.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

interface Package {
  id: string;
  tier: string;
  badge: { icon: React.ReactNode; label: string; anim: "wiggle" | "spin" | "none" };
  title: string;
  sub: string;
  price: number;
  priceDisplay: string;
  delivery: string;
  metrics: { label: string; value: string; trend?: boolean }[];
  chips: { icon: React.ReactNode; label: string }[];
  features: string[];
  colorA: string;
  colorB: string;
  colorC: string;
  graph: "line" | "bar" | "area";
  featured: boolean;
}

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 8.5 22 9.5 17 14.5 18.2 21.5 12 18 5.8 21.5 7 14.5 2 9.5 9 8.5 12 2" />
  </svg>
);
const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const MobileIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
  </svg>
);
const DomainIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);
const SearchIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CMSIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="4" rx="1" /><rect x="3" y="10" width="18" height="11" rx="1" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);
const CartIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
  </svg>
);
const AdminIcon = () => (
  <svg className="wsp-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
const TrendUpIcon = () => (
  <svg className="wsp-trend-icon" viewBox="0 0 24 24">
    <path d="M3 17l6-6 4 4 8-8v6h2V3h-10v2h6l-6 6-4-4-8 8z" />
  </svg>
);
const CheckSmIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5be5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const GreenCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5be5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#5be5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 15" />
  </svg>
);

const PACKAGES: Package[] = [
  {
    id: "landing",
    tier: "Starter",
    badge: { icon: <BoltIcon />, label: "QUICK START", anim: "wiggle" },
    title: "Landing Page",
    sub: "One focused page built to convert",
    price: 1200,
    priceDisplay: "1,200",
    delivery: "Delivered in 2 weeks",
    metrics: [
      { label: "Conversion", value: "+28%", trend: true },
      { label: "Load", value: "0.9s" },
    ],
    chips: [
      { icon: <MobileIcon />, label: "Mobile" },
      { icon: <DomainIcon />, label: "Domain" },
    ],
    features: [
      "1 page responsive design",
      "Basic SEO setup",
      "1-year domain included",
      "1 business email (1 year)",
      "Contact form integration",
      "Basic analytics setup",
    ],
    colorA: "#e08a4a",
    colorB: "#e8b070",
    colorC: "#d47a8e",
    graph: "line",
    featured: false,
  },
  {
    id: "business",
    tier: "Business",
    badge: { icon: <StarIcon />, label: "MOST POPULAR", anim: "spin" },
    title: "Business Website",
    sub: "Everything a growing brand needs",
    price: 2900,
    priceDisplay: "2,900",
    delivery: "Delivered in 3–4 weeks",
    metrics: [
      { label: "Traffic", value: "+62%", trend: true },
      { label: "Pages", value: "5–10" },
    ],
    chips: [
      { icon: <SearchIcon />, label: "SEO" },
      { icon: <CMSIcon />, label: "CMS" },
    ],
    features: [
      "5–10 pages, mobile responsive",
      "Full SEO optimization",
      "2-year domain included",
      "Business emails (1 year)",
      "Editable CMS system",
      "Booking or contact system",
      "Performance optimization",
    ],
    colorA: "#7c6fd0",
    colorB: "#c382b8",
    colorC: "#6fb3c9",
    graph: "bar",
    featured: true,
  },
  {
    id: "ecommerce",
    tier: "Elite",
    badge: { icon: <ShoppingBagIcon />, label: "FULL STORE", anim: "none" },
    title: "E-Commerce",
    sub: "Full online store with Stripe payments",
    price: 6500,
    priceDisplay: "6,500",
    delivery: "Delivered in 4–6 weeks",
    metrics: [
      { label: "Revenue", value: "+95%", trend: true },
      { label: "Products", value: "∞" },
    ],
    chips: [
      { icon: <CartIcon />, label: "Stripe" },
      { icon: <AdminIcon />, label: "Admin" },
    ],
    features: [
      "Full product catalog system",
      "Stripe payment processing",
      "Inventory management",
      "Mobile responsive design",
      "Full SEO optimization",
      "Admin dashboard",
      "Order tracking system",
      "Automated email notifications",
    ],
    colorA: "#4a8f90",
    colorB: "#3e7290",
    colorC: "#8cc4b8",
    graph: "area",
    featured: false,
  },
];

interface AddOn {
  id: string;
  icon: string;
  label: string;
  note: string;
  price: number;
  hasQty?: boolean;
  maxQty?: number;
}

const ADD_ONS: AddOn[] = [
  { id: "logo",        icon: "🎨", label: "Logo Design",         note: "Custom professional brand mark",          price: 500 },
  { id: "content",     icon: "✍️", label: "Content Writing",      note: "$200 per page — we write it for you",     price: 200, hasQty: true, maxQty: 20 },
  { id: "extra-pages", icon: "📄", label: "Additional Pages",     note: "$300 per extra page added to package",    price: 300, hasQty: true, maxQty: 20 },
  { id: "chatbot",     icon: "🤖", label: "AI Chatbot",           note: "Conversational assistant on your site",   price: 800 },
  { id: "seo",         icon: "🔍", label: "Advanced SEO",         note: "Full keyword & backlink campaign",        price: 600 },
  { id: "email",       icon: "📧", label: "Business Email Setup", note: "Professional domain email for your team", price: 150 },
  { id: "maintenance", icon: "🔧", label: "Maintenance Plan",     note: "$200/month — updates, backups & support", price: 200 },
];

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */

interface AddonQtys { [key: string]: number }

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface QuoteForm {
  name: string;
  email: string;
  websiteType: string;
  budget: string;
  notes: string;
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

/* ═══════════════════════════════════════════
   SVG GRAPHS
═══════════════════════════════════════════ */

const LineGraph = ({ a, uid }: { a: string; uid: string }) => (
  <svg className="wsp-graph" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.45" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
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
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.50" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <line className="wsp-grid-line" x1="0" y1="30" x2="300" y2="30" stroke={a} />
    <line className="wsp-grid-line" x1="0" y1="60" x2="300" y2="60" stroke={a} />
    <path className="wsp-area-fill" d="M0,75 C30,68 60,30 100,25 C140,18 180,50 220,35 C260,20 280,55 300,22 L300,100 L0,100 Z" fill={`url(#wsp-fill-${uid})`} />
    <path className="wsp-area-path" d="M0,75 C30,68 60,30 100,25 C140,18 180,50 220,35 C260,20 280,55 300,22" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle className="wsp-graph-dot" cx="100" cy="25" r="3.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.5s" }} />
    <circle className="wsp-graph-dot" cx="300" cy="22" r="3.5" fill="#fff" stroke={a} strokeWidth="2" style={{ animationDelay: "2.7s" }} />
  </svg>
);

/* ═══════════════════════════════════════════
   CHECKOUT MODAL
═══════════════════════════════════════════ */

function CheckoutModal({
  open, pkg, addonQtys, addonTotal, grandTotal, onClose,
}: {
  open: boolean;
  pkg: Package | null;
  addonQtys: AddonQtys;
  addonTotal: number;
  grandTotal: number;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({ name: "", email: "", phone: "", company: "" });

  const setField = (k: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const selectedAddons = ADD_ONS.filter((a) => (addonQtys[a.id] ?? 0) > 0);

  const handleProceed = async () => {
    if (!form.name.trim() || !form.email.trim()) { toast.error("Please enter your name and email."); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { toast.error("Please enter a valid email address."); return; }
    if (!pkg) return;
    setLoading(true);
    try {
      const orderNumber = `WDO-${Date.now().toString().slice(-8)}`;
      const addonsPayload = selectedAddons.map((a) => ({
        id: a.id, label: a.label, price: a.price,
        qty: addonQtys[a.id] ?? 1, subtotal: a.price * (addonQtys[a.id] ?? 1),
      }));

      await (supabase as any).from("web_design_orders").insert([{
        order_number: orderNumber, package_name: pkg.id, package_price: pkg.price * 100,
        add_ons: addonsPayload, add_ons_total: addonTotal * 100, total_amount: grandTotal * 100,
        customer_name: form.name, customer_email: form.email,
        payment_status: "pending", status: "new",
        metadata: { phone: form.phone, company: form.company },
      }]);

      const { data, error } = await supabase.functions.invoke("create-webdesign-checkout", {
        body: {
          packageName: pkg.title, packageType: pkg.id, totalAmount: grandTotal,
          addOns: addonsPayload, customerName: form.name, customerEmail: form.email,
          successUrl: `${window.location.origin}/ai?payment=success`,
          cancelUrl: `${window.location.origin}/ai`,
        },
      });

      if (error) throw error;
      if (data?.url) { window.location.href = data.url; }
      else throw new Error("No checkout URL returned");
    } catch {
      toast.error("Checkout failed — please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !pkg) return null;

  return (
    <div className="wsp-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wsp-modal wsp-modal-checkout">
        <div className="wsp-checkout-layout">
          {/* ── Left: dark hero panel ── */}
          <div className="wsp-checkout-hero">
            <div className="wsp-hero-brand">
              <span className="wsp-brand-dot" />
              SECURE SENIOR SAFEGUARD
            </div>
            <p className="wsp-hero-title">{pkg.tier} Package — Order Total</p>
            <div className="wsp-hero-total">{fmt(grandTotal)}</div>
            <div className="wsp-hero-divider" />

            <div className="wsp-hero-lines">
              <div className="wsp-hero-line wsp-hero-line--base">
                <span className="wsp-hl-name">{pkg.title}</span>
                <span className="wsp-hl-price">{fmt(pkg.price)}</span>
              </div>
              {selectedAddons.length === 0 && (
                <p className="wsp-hero-empty">No add-ons selected</p>
              )}
              {selectedAddons.map((a) => {
                const qty = addonQtys[a.id] ?? 1;
                return (
                  <div key={a.id} className="wsp-hero-line">
                    <span className="wsp-hl-name">
                      {a.icon} {a.label}
                      {qty > 1 && <span className="wsp-hl-qty">×{qty}</span>}
                    </span>
                    <span className="wsp-hl-price">+{fmt(a.price * qty)}</span>
                  </div>
                );
              })}
            </div>

            <div className="wsp-hero-trust">
              <div className="wsp-hero-trust-item"><ShieldIcon /> Secure checkout via Stripe</div>
              <div className="wsp-hero-trust-item"><GreenCheckIcon /> 30-day satisfaction guarantee</div>
              <div className="wsp-hero-trust-item"><ClockIcon /> 24hr response guarantee</div>
            </div>
          </div>

          {/* ── Right: form panel ── */}
          <div className="wsp-checkout-form-panel">
            <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close"><CloseIcon /></button>

            <div className="wsp-checkout-form-header">
              <h2 className="wsp-modal-title">Complete Your Order</h2>
              <div className="wsp-checkout-steps">
                <div className={`wsp-step${step >= 1 ? " wsp-step--active" : step > 1 ? " wsp-step--done" : ""}`}>
                  <span className="wsp-dot-s">1</span> Contact
                </div>
                <div className="wsp-steps-sep" />
                <div className={`wsp-step${step >= 2 ? " wsp-step--active" : ""}`}>
                  <span className="wsp-dot-s">2</span> Checkout
                </div>
              </div>
            </div>

            <div className="wsp-checkout-form-body">
              {step === 1 && (
                <>
                  <div className="wsp-form-section-title has-num">
                    <span className="wsp-num">1</span>
                    YOUR DETAILS
                  </div>
                  <div className="wsp-form-row">
                    <div className="wsp-form-group">
                      <label className="wsp-form-label">Full Name <span className="wsp-req">*</span></label>
                      <input className="wsp-form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={setField("name")} />
                    </div>
                    <div className="wsp-form-group">
                      <label className="wsp-form-label">Email <span className="wsp-req">*</span></label>
                      <input className="wsp-form-input" type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
                    </div>
                  </div>
                  <div className="wsp-form-row">
                    <div className="wsp-form-group">
                      <label className="wsp-form-label">Phone <span className="wsp-hint">optional</span></label>
                      <input className="wsp-form-input" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={setField("phone")} />
                    </div>
                    <div className="wsp-form-group">
                      <label className="wsp-form-label">Company <span className="wsp-hint">optional</span></label>
                      <input className="wsp-form-input" type="text" placeholder="Acme Inc." value={form.company} onChange={setField("company")} />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="wsp-form-section-title has-num">
                    <span className="wsp-num">2</span>
                    ORDER REVIEW
                  </div>
                  <div className="wsp-order-review">
                    <div className="wsp-review-row"><span>Name</span><span>{form.name}</span></div>
                    <div className="wsp-review-row"><span>Email</span><span>{form.email}</span></div>
                    <div className="wsp-review-row"><span>Package</span><span>{pkg.title}</span></div>
                    {selectedAddons.length > 0 && (
                      <div className="wsp-review-row">
                        <span>Add-ons</span>
                        <span>{selectedAddons.length} selected (+{fmt(addonTotal)})</span>
                      </div>
                    )}
                    <div className="wsp-review-row wsp-review-row--total"><span>Total</span><span>{fmt(grandTotal)}</span></div>
                  </div>
                </>
              )}
            </div>

            <div className="wsp-modal-footer">
              <span className="wsp-footer-note">
                <ShieldIcon /> Payments secured by Stripe
              </span>
              {step === 1 ? (
                <button className="wsp-btn-primary" type="button" onClick={() => {
                  if (!form.name.trim() || !form.email.trim()) { toast.error("Name and email are required."); return; }
                  if (!/\S+@\S+\.\S+/.test(form.email)) { toast.error("Please enter a valid email."); return; }
                  setStep(2);
                }}>
                  Continue →
                </button>
              ) : (
                <>
                  <button className="wsp-btn-ghost" type="button" onClick={() => setStep(1)}>← Back</button>
                  <button className="wsp-btn-primary" type="button" onClick={handleProceed} disabled={loading}>
                    {loading ? "Redirecting…" : `Pay ${fmt(grandTotal)} →`}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   QUOTE MODAL
═══════════════════════════════════════════ */

const WEBSITE_TYPES = [
  { id: "landing",   icon: "⚡", label: "Landing Page",    desc: "Single page, campaign-ready" },
  { id: "business",  icon: "🏢", label: "Business Site",   desc: "Multi-page, professional presence" },
  { id: "ecommerce", icon: "🛒", label: "E-Commerce",      desc: "Full online store with payments" },
  { id: "portfolio", icon: "🎨", label: "Portfolio",       desc: "Showcase your work beautifully" },
  { id: "booking",   icon: "📅", label: "Booking / Appts", desc: "Scheduling & appointment system" },
  { id: "other",     icon: "✨", label: "Other / Custom",  desc: "Something unique — let's talk" },
];

const BUDGET_PILLS = ["Under $2,000", "$2,000–$5,000", "$5,000–$10,000", "$10,000+", "Need a Quote"];

const TIMELINE_STEPS = [
  { title: "We review your request", desc: "Usually within a few hours during business hours." },
  { title: "Send detailed proposal", desc: "Itemized quote with timeline and deliverables." },
  { title: "Free scoping call", desc: "30-min call to align on goals and requirements." },
  { title: "Build begins", desc: "Your project kicks off within 3 business days." },
];

function QuoteModal({
  open, preselectedType, onClose,
}: {
  open: boolean;
  preselectedType: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<QuoteForm>({
    name: "", email: "", websiteType: preselectedType || "", budget: "", notes: "",
  });
  const [loading, setLoading] = useState(false);

  const setField = (k: keyof QuoteForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) { toast.error("Name and email are required."); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { toast.error("Please enter a valid email."); return; }
    setLoading(true);
    try {
      const quoteNumber = `WDQ-${Date.now().toString().slice(-8)}`;
      await (supabase as any).from("web_design_quotes").insert([{
        quote_number: quoteNumber, name: form.name, email: form.email,
        website_type: form.websiteType || null, budget_range: form.budget || null,
        additional_notes: form.notes || null, status: "new",
      }]);
      toast.success("Quote request sent! We'll reach out within 24 hours.");
      onClose();
      setForm({ name: "", email: "", websiteType: preselectedType || "", budget: "", notes: "" });
    } catch {
      toast.error("Failed to submit — please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="wsp-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wsp-modal wsp-modal-quote">
        <div className="wsp-quote-layout">
          {/* ── Left: dark hero ── */}
          <div className="wsp-quote-hero">
            <p className="wsp-hero-kicker">Free, no-obligation proposal</p>
            <h3 className="wsp-quote-headline">Let's Build Something Great</h3>

            <div className="wsp-hero-timeline">
              {TIMELINE_STEPS.map((step, i) => (
                <div key={step.title} className="wsp-tl-item">
                  <div className="wsp-tl-dot">{i + 1}</div>
                  <div className="wsp-tl-content">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="wsp-hero-stats">
              <div><div className="wsp-hero-stat-num">2–6 wks</div><div className="wsp-hero-stat-label">Build Time</div></div>
              <div><div className="wsp-hero-stat-num">30 day</div><div className="wsp-hero-stat-label">Guarantee</div></div>
              <div><div className="wsp-hero-stat-num">24 hr</div><div className="wsp-hero-stat-label">Quote Response</div></div>
              <div><div className="wsp-hero-stat-num">100%</div><div className="wsp-hero-stat-label">Satisfaction</div></div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="wsp-quote-form-panel">
            <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close"><CloseIcon /></button>

            <div className="wsp-modal-body">
              <div className="wsp-modal-eyebrow">GET A FREE QUOTE</div>
              <h2 className="wsp-modal-title">Tell Us About Your Project</h2>
              <p className="wsp-modal-sub">We respond within 24 hours with a detailed proposal.</p>

              <div className="wsp-form-section-title">WEBSITE TYPE</div>
              <div className="wsp-radio-cards">
                {WEBSITE_TYPES.map((wt) => (
                  <div
                    key={wt.id}
                    className={`wsp-radio-card${form.websiteType === wt.id ? " wsp-radio-card--selected" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, websiteType: wt.id }))}
                    role="radio"
                    aria-checked={form.websiteType === wt.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === " " && setForm((p) => ({ ...p, websiteType: wt.id }))}
                  >
                    <span className="wsp-radio-card-icon">{wt.icon}</span>
                    <div className="wsp-radio-card-body">
                      <div className="wsp-radio-card-label">{wt.label}</div>
                      <div className="wsp-radio-card-sub">{wt.desc}</div>
                    </div>
                    <span className="wsp-radio-card-check"><CheckSmIcon /></span>
                  </div>
                ))}
              </div>

              <div className="wsp-form-section-title" style={{ marginTop: 16 }}>BUDGET RANGE</div>
              <div className="wsp-pill-selector">
                {BUDGET_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    className={`wsp-pill-opt${form.budget === pill ? " wsp-pill-opt--active" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, budget: pill }))}
                  >
                    {pill}
                  </button>
                ))}
              </div>

              <div className="wsp-form-row" style={{ marginTop: 16 }}>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Full Name <span className="wsp-req">*</span></label>
                  <input className="wsp-form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={setField("name")} />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Email <span className="wsp-req">*</span></label>
                  <input className="wsp-form-input" type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
                </div>
              </div>

              <div className="wsp-form-group">
                <label className="wsp-form-label">Additional Notes <span className="wsp-hint">optional</span></label>
                <textarea
                  className="wsp-form-input wsp-form-textarea"
                  placeholder="Tell us about your project, goals, or any specific requirements…"
                  value={form.notes}
                  onChange={setField("notes")}
                  rows={3}
                />
              </div>
            </div>

            <div className="wsp-modal-footer">
              <span className="wsp-footer-note">
                <GreenCheckIcon /> No commitment required
              </span>
              <button className="wsp-btn-ghost" type="button" onClick={onClose}>Cancel</button>
              <button className="wsp-btn-primary wsp-btn-wide" type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Sending…" : "Send Quote Request →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SINGLE PRICING CARD
═══════════════════════════════════════════ */

const PremiumCard = ({
  pkg, checkoutLoading, onGetStarted, onGetQuote,
}: {
  pkg: Package;
  checkoutLoading: boolean;
  onGetStarted: () => void;
  onGetQuote: () => void;
}) => {
  const cssVars = {
    "--wsp-a": pkg.colorA,
    "--wsp-b": pkg.colorB,
    "--wsp-c": pkg.colorC,
  } as React.CSSProperties;

  return (
    <div className="wsp-col" style={{ animationDelay: pkg.id === "landing" ? "0.15s" : pkg.id === "business" ? "0.25s" : "0.35s" }}>
      <article
        className={`wsp-card${pkg.featured ? " wsp-card--pro" : ""} wsp-card--${pkg.id}`}
        style={cssVars}
      >
        <span className="wsp-edge-sheen" aria-hidden="true" />
        <span className="wsp-edge-ring" aria-hidden="true" />
        <span className="wsp-edge-rim" aria-hidden="true" />

        {pkg.graph === "line" && <LineGraph a={pkg.colorA} uid={pkg.id} />}
        {pkg.graph === "bar"  && <BarGraph  a={pkg.colorA} />}
        {pkg.graph === "area" && <AreaGraph a={pkg.colorA} uid={pkg.id} />}

        <div className="wsp-header-row">
          <div className="wsp-tier-name">{pkg.tier}</div>
          <span className={`wsp-badge${pkg.badge.anim !== "none" ? ` wsp-badge--${pkg.badge.anim}` : ""}`}>
            {pkg.badge.icon}
            {pkg.badge.label}
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
          {pkg.metrics.map((m) => (
            <div key={m.label} className="wsp-metric">
              <span className="wsp-metric-label">{m.label}</span>
              <span className="wsp-metric-value">
                {m.trend && <TrendUpIcon />}
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="wsp-chips">
          {pkg.chips.map((chip, i) => (
            <span key={i} className="wsp-chip">
              <span className="wsp-chip-icon-wrap">{chip.icon}</span>
              {chip.label}
            </span>
          ))}
        </div>

        <ul className="wsp-features">
          {pkg.features.map((f, i) => (
            <li key={i} className="wsp-feature">
              <span className="wsp-check"><CheckSmIcon /></span>
              {f}
            </li>
          ))}
        </ul>

        <div className="wsp-cta-wrap">
          <button
            className="wsp-cta"
            type="button"
            onClick={onGetStarted}
            disabled={checkoutLoading}
          >
            <span>{checkoutLoading ? "LOADING…" : "GET STARTED"}</span>
            <span className="wsp-cta-arrow"><ArrowRightIcon /></span>
          </button>
          <button className="wsp-quote-link" type="button" onClick={onGetQuote}>
            Get Custom Quote
          </button>
        </div>
      </article>
    </div>
  );
};

/* ═══════════════════════════════════════════
   WEBSITE INSURANCE CARDS
═══════════════════════════════════════════ */

const INSURANCE_PLANS = [
  {
    id: "essential",
    tier: "Essential",
    badge: { icon: <GreenCheckIcon />, label: "BASIC COVER", anim: "none" as const },
    title: "Essential",
    sub: "Basic protection",
    price: "$29",
    period: "/mo",
    features: ["SSL Management", "Weekly Backups", "Email Support", "Basic Monitoring"],
    colorA: "#22c55e", colorB: "#4ade80", colorC: "#86efac",
    featured: false,
    btnText: "Subscribe Now",
  },
  {
    id: "professional",
    tier: "Popular",
    badge: { icon: <StarIcon />, label: "MOST POPULAR", anim: "spin" as const },
    title: "Professional",
    sub: "Full protection",
    price: "$49",
    period: "/mo",
    features: ["All Essential features", "24/7 Monitoring", "Daily Backups", "Priority Support", "Malware Scanning"],
    colorA: "#7c6fd0", colorB: "#c382b8", colorC: "#6fb3c9",
    featured: true,
    btnText: "Subscribe Now",
  },
  {
    id: "enterprise",
    tier: "Enterprise",
    badge: { icon: <ShieldIcon />, label: "MAXIMUM", anim: "wiggle" as const },
    title: "Enterprise",
    sub: "Maximum protection",
    price: "$99",
    period: "/mo",
    features: ["All Professional features", "Real-Time Backups", "DDoS Protection", "24/7 Dedicated Support", "Global CDN"],
    colorA: "#e08a4a", colorB: "#e8b070", colorC: "#d47a8e",
    featured: false,
    btnText: "Subscribe Now",
  },
  {
    id: "custom",
    tier: "Custom",
    badge: { icon: <BoltIcon />, label: "CUSTOM", anim: "wiggle" as const },
    title: "Customizable",
    sub: "Build your own",
    price: "$29–500",
    period: "/mo",
    features: ["Choose your features", "Flexible pricing", "Custom support level", "Upgrade anytime"],
    colorA: "#6d5bff", colorB: "#a78bfa", colorC: "#818cf8",
    featured: false,
    btnText: "Build Your Plan",
  },
];

export const WebsiteInsuranceCards = ({ onSubscribe }: { onSubscribe: () => void }) => (
  <div className="wsp-ins-root">
    <div className="wsp-ins-grid">
      {INSURANCE_PLANS.map((plan, i) => {
        const cssVars = {
          "--wsp-a": plan.colorA,
          "--wsp-b": plan.colorB,
          "--wsp-c": plan.colorC,
        } as React.CSSProperties;
        return (
          <div key={plan.id} className="wsp-col" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <article className={`wsp-card${plan.featured ? " wsp-card--pro" : ""}`} style={cssVars}>
              <span className="wsp-edge-sheen" aria-hidden="true" />
              <span className="wsp-edge-ring" aria-hidden="true" />
              <span className="wsp-edge-rim" aria-hidden="true" />

              <div className="wsp-header-row">
                <div className="wsp-tier-name">{plan.tier}</div>
                <span className={`wsp-badge${plan.badge.anim !== "none" ? ` wsp-badge--${plan.badge.anim}` : ""}`}>
                  {plan.badge.icon}
                  {plan.badge.label}
                </span>
              </div>

              <div className="wsp-tier-title">{plan.title}</div>
              <div className="wsp-tier-sub">{plan.sub}</div>

              <div className="wsp-price-holder">
                <span className="wsp-ins-price">{plan.price}</span>
                <span className="wsp-ins-period">{plan.period}</span>
              </div>

              <ul className="wsp-features wsp-ins-features">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="wsp-feature">
                    <span className="wsp-check"><CheckSmIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="wsp-cta-wrap">
                <button className="wsp-cta" type="button" onClick={onSubscribe}>
                  <span>{plan.btnText}</span>
                  <span className="wsp-cta-arrow"><ArrowRightIcon /></span>
                </button>
              </div>
            </article>
          </div>
        );
      })}
    </div>

    <div className="wsp-market-note" style={{ marginTop: 16 }}>
      <span className="wsp-dot-ohio" />
      All plans include onboarding · <b>Cancel anytime</b> · 30-day guarantee
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   PUBLIC COMPONENT
═══════════════════════════════════════════ */

export const WebsitePricingCards = () => {
  const [addonQtys, setAddonQtys] = useState<AddonQtys>({});
  const [activePackageId, setActivePackageId] = useState("business");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<Package | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteType, setQuoteType] = useState("");

  const toggleAddon = useCallback((id: string) => {
    setAddonQtys((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) > 0) { delete next[id]; } else { next[id] = 1; }
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setAddonQtys((prev) => {
      const next = { ...prev };
      if (qty <= 0) { delete next[id]; } else { next[id] = qty; }
      return next;
    });
  }, []);

  const addonTotal = ADD_ONS.reduce((sum, a) => sum + a.price * (addonQtys[a.id] ?? 0), 0);
  const activePkg = PACKAGES.find((p) => p.id === activePackageId) ?? PACKAGES[1];
  const grandTotal = activePkg.price + addonTotal;
  const selectedAddonCount = Object.values(addonQtys).filter((q) => q > 0).length;

  const handleGetStarted = useCallback((pkg: Package) => {
    setCheckoutPkg(pkg);
    setActivePackageId(pkg.id);
    setCheckoutLoading(pkg.id);
    setTimeout(() => { setCheckoutLoading(null); setCheckoutOpen(true); }, 300);
  }, []);

  const handleGetQuote = useCallback((pkg: Package) => {
    setQuoteType(pkg.id);
    setQuoteOpen(true);
  }, []);

  return (
    <div className="wsp-root">
      {/* ── Pricing cards ── */}
      <div className="wsp-grid">
        {PACKAGES.map((pkg) => (
          <PremiumCard
            key={pkg.id}
            pkg={pkg}
            checkoutLoading={checkoutLoading === pkg.id}
            onGetStarted={() => handleGetStarted(pkg)}
            onGetQuote={() => handleGetQuote(pkg)}
          />
        ))}
      </div>

      {/* ── Market note ── */}
      <div className="wsp-market-note">
        <span className="wsp-dot-ohio" />
        Ohio-based pricing · <b>All packages include hosting for year 1</b> · No hidden fees
      </div>

      {/* ── Add-ons section ── */}
      <div className="wsp-addons-section">
        <div className="wsp-addons-header">
          <span className="wsp-addons-eyebrow">POWER-UPS</span>
          <h2 className="wsp-addons-title">Enhance Your Package</h2>
          <p className="wsp-addons-sub">Select your active package below, then pick any add-ons — your total updates instantly.</p>
        </div>

        {/* Package selector */}
        <div className="wsp-package-selector">
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`wsp-pkg-option${activePackageId === p.id ? " wsp-pkg-option--active" : ""}`}
              onClick={() => setActivePackageId(p.id)}
            >
              <input type="radio" name="wsp-pkg" value={p.id} readOnly checked={activePackageId === p.id} />
              {p.badge.icon}
              {p.title}
              <span className="wsp-pkg-price">{p.priceDisplay}</span>
            </button>
          ))}
        </div>

        {/* Add-on cards grid */}
        <div className="wsp-addons-grid">
          {ADD_ONS.map((addon) => {
            const qty = addonQtys[addon.id] ?? 0;
            const checked = qty > 0;
            return (
              <div
                key={addon.id}
                className={`wsp-addon-card${checked ? " wsp-addon-card--checked" : ""}`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className={`wsp-addon-check${checked ? " wsp-addon-check--on" : ""}`}>
                  {checked && <CheckSmIcon />}
                </div>
                <div className="wsp-addon-body">
                  <div className="wsp-addon-name">{addon.icon} {addon.label}</div>
                  <div className="wsp-addon-desc">{addon.note}</div>
                  {checked && addon.hasQty && (
                    <div className="wsp-addon-qty" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="wsp-qty-btn"
                        onClick={() => setQty(addon.id, qty - 1)}
                        disabled={qty <= 1}
                      >−</button>
                      <span className="wsp-qty-value">{qty}</span>
                      <button
                        type="button"
                        className="wsp-qty-btn"
                        onClick={() => setQty(addon.id, Math.min(qty + 1, addon.maxQty ?? 20))}
                        disabled={qty >= (addon.maxQty ?? 20)}
                      >+</button>
                    </div>
                  )}
                </div>
                <div className="wsp-addon-price">+{fmt(addon.price)}{addon.hasQty && qty > 1 ? ` ×${qty}` : ""}</div>
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        <div className="wsp-summary-bar">
          <div className="wsp-summary-text">
            <div className="wsp-summary-label">YOUR ESTIMATE</div>
            <div className="wsp-summary-breakdown">
              {activePkg.title} {selectedAddonCount > 0 ? `+ ${selectedAddonCount} add-on${selectedAddonCount > 1 ? "s" : ""}` : ""}
            </div>
          </div>
          <div className="wsp-summary-total">
            <div className="wsp-summary-price">{fmt(grandTotal)}</div>
          </div>
          <button
            className="wsp-summary-btn"
            type="button"
            onClick={() => { setCheckoutPkg(activePkg); setCheckoutOpen(true); }}
          >
            Get Started
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      <CheckoutModal
        open={checkoutOpen}
        pkg={checkoutPkg}
        addonQtys={addonQtys}
        addonTotal={addonTotal}
        grandTotal={checkoutPkg ? checkoutPkg.price + addonTotal : grandTotal}
        onClose={() => setCheckoutOpen(false)}
      />

      <QuoteModal
        open={quoteOpen}
        preselectedType={quoteType}
        onClose={() => setQuoteOpen(false)}
      />
    </div>
  );
};

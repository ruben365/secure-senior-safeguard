import React, { useState, useCallback } from "react";
import "./WebsitePricingCards.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

interface Package {
  id: string;
  badge: { icon: string; label: string };
  title: string;
  price: number;
  priceDisplay: string;
  delivery: string;
  deliveryWeeks: string;
  chips: { icon: string; label: string }[];
  features: string[];
  colorA: string;
  colorB: string;
  colorC: string;
  graph: "line" | "bar" | "area";
  featured: boolean;
}

const PACKAGES: Package[] = [
  {
    id: "landing",
    badge: { icon: "⚡", label: "QUICK START" },
    title: "Landing Page",
    price: 1200,
    priceDisplay: "$1,200",
    delivery: "Delivered in 2 weeks",
    deliveryWeeks: "2 weeks",
    chips: [
      { icon: "📱", label: "Mobile-First" },
      { icon: "🔍", label: "Basic SEO" },
      { icon: "📋", label: "Contact Form" },
      { icon: "📊", label: "Analytics" },
    ],
    features: [
      "1 professionally designed page",
      "Mobile responsive design",
      "Basic SEO setup",
      "1-year domain included",
      "1 business email address",
      "Contact form integration",
      "Google Analytics setup",
    ],
    colorA: "#e08a4a",
    colorB: "#e8b070",
    colorC: "#d47a8e",
    graph: "line",
    featured: false,
  },
  {
    id: "business",
    badge: { icon: "⭐", label: "MOST POPULAR" },
    title: "Business Website",
    price: 2900,
    priceDisplay: "$2,900",
    delivery: "Delivered in 3–4 weeks",
    deliveryWeeks: "3–4 weeks",
    chips: [
      { icon: "🚀", label: "Full SEO" },
      { icon: "📝", label: "CMS" },
      { icon: "📅", label: "Booking" },
      { icon: "⚡", label: "Performance" },
    ],
    features: [
      "5–10 custom pages",
      "Mobile responsive design",
      "Full SEO optimization",
      "2-year domain included",
      "Business email accounts",
      "Content management system",
      "Booking / scheduling system",
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
    badge: { icon: "👑", label: "FULL STORE" },
    title: "E-Commerce",
    price: 6500,
    priceDisplay: "$6,500",
    delivery: "Delivered in 4–6 weeks",
    deliveryWeeks: "4–6 weeks",
    chips: [
      { icon: "🛒", label: "Products" },
      { icon: "💳", label: "Stripe Pay" },
      { icon: "📦", label: "Inventory" },
      { icon: "📊", label: "Admin" },
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
  { id: "logo",        icon: "🎨", label: "Logo Design",          note: "Custom professional brand mark",         price: 500 },
  { id: "content",     icon: "✍️", label: "Content Writing",       note: "$200 per page — we write it for you",    price: 200, hasQty: true, maxQty: 20 },
  { id: "extra-pages", icon: "📄", label: "Additional Pages",      note: "$300 per extra page added to package",   price: 300, hasQty: true, maxQty: 20 },
  { id: "chatbot",     icon: "🤖", label: "AI Chatbot",            note: "Conversational assistant on your site",  price: 800 },
  { id: "seo",         icon: "🔍", label: "Advanced SEO",          note: "Full keyword & backlink campaign",       price: 600 },
  { id: "email",       icon: "📧", label: "Business Email Setup",  note: "Professional domain email for your team",price: 150 },
  { id: "maintenance", icon: "🔧", label: "Maintenance Plan",      note: "$200/month — updates, backups & support",price: 200 },
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

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

/* ═══════════════════════════════════════════
   SVG GRAPHS (unchanged)
═══════════════════════════════════════════ */

const GrainTexture = () => (
  <svg className="wsp-grain" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
    <filter id="wsp-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#wsp-noise)" opacity="1" />
  </svg>
);

const CheckIcon = () => (
  <svg className="wsp-check" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="7" fill="currentColor" fillOpacity="0.15" />
    <path d="M4.5 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LineGraph = ({ a, b, uid }: { a: string; b: string; uid: string }) => (
  <svg className="wsp-graph" viewBox="0 0 200 72" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.36" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,66 L30,56 L65,46 L95,34 L130,22 L165,11 L200,5 L200,72 L0,72 Z" fill={`url(#wsp-fill-${uid})`} />
    <path className="wsp-line-path" d="M0,66 L30,56 L65,46 L95,34 L130,22 L165,11 L200,5" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="95" cy="34" r="3.5" fill={b} opacity="0.85" />
    <circle cx="200" cy="5" r="4" fill={a} />
  </svg>
);

const BarGraph = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <svg className="wsp-graph" viewBox="0 0 200 72" preserveAspectRatio="none" aria-hidden="true">
    <rect className="wsp-bar" x="8"   y="50" width="28" height="22" rx="3" fill={a} opacity="0.52" />
    <rect className="wsp-bar" x="47"  y="40" width="28" height="32" rx="3" fill={b} opacity="0.63" />
    <rect className="wsp-bar" x="86"  y="27" width="28" height="45" rx="3" fill={a} opacity="0.75" />
    <rect className="wsp-bar" x="125" y="14" width="28" height="58" rx="3" fill={c} opacity="0.86" />
    <rect className="wsp-bar" x="164" y="4"  width="28" height="68" rx="3" fill={b} opacity="0.96" />
  </svg>
);

const AreaGraph = ({ a, b, c, uid }: { a: string; b: string; c: string; uid: string }) => (
  <svg className="wsp-graph" viewBox="0 0 200 72" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.40" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,64 C25,56 50,20 100,15 C150,10 170,38 200,13 L200,72 L0,72 Z" fill={`url(#wsp-fill-${uid})`} />
    <path className="wsp-area-path" d="M0,64 C25,56 50,20 100,15 C150,10 170,38 200,13" stroke={a} strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="100" cy="15" r="4" fill={b} />
    <circle cx="0" cy="64" r="2.5" fill={a} opacity="0.6" />
    <circle cx="200" cy="13" r="4" fill={c} />
  </svg>
);

/* ═══════════════════════════════════════════
   CHECKOUT MODAL
═══════════════════════════════════════════ */

function CheckoutModal({
  open,
  pkg,
  addonQtys,
  addonTotal,
  grandTotal,
  onClose,
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
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!pkg) return;
    setLoading(true);
    try {
      const orderNumber = `WDO-${Date.now().toString().slice(-8)}`;
      const addonsPayload = selectedAddons.map((a) => ({
        id: a.id,
        label: a.label,
        price: a.price,
        qty: addonQtys[a.id] ?? 1,
        subtotal: a.price * (addonQtys[a.id] ?? 1),
      }));

      await (supabase as any).from("web_design_orders").insert([{
        order_number: orderNumber,
        package_name: pkg.id,
        package_price: pkg.price * 100,
        add_ons: addonsPayload,
        add_ons_total: addonTotal * 100,
        total_amount: grandTotal * 100,
        customer_name: form.name,
        customer_email: form.email,
        payment_status: "pending",
        status: "new",
        metadata: { phone: form.phone, company: form.company },
      }]);

      const { data, error } = await supabase.functions.invoke("create-webdesign-checkout", {
        body: {
          packageName: pkg.title,
          packageType: pkg.id,
          totalAmount: grandTotal,
          addOns: addonsPayload,
          customerName: form.name,
          customerEmail: form.email,
          successUrl: `${window.location.origin}/ai?payment=success`,
          cancelUrl: `${window.location.origin}/ai`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch {
      toast.error("Checkout failed — please try again or contact us.");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !pkg) return null;

  return (
    <div className="wsp-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wsp-modal wsp-modal--checkout">
        {/* Left — Order summary */}
        <div className="wsp-modal-left" style={{ "--wsp-a": pkg.colorA, "--wsp-b": pkg.colorB, "--wsp-c": pkg.colorC } as React.CSSProperties}>
          <div className="wsp-modal-left-inner">
            <div className="wsp-modal-pkg-badge">
              <span>{pkg.badge.icon}</span> {pkg.badge.label}
            </div>
            <h3 className="wsp-modal-pkg-title">{pkg.title}</h3>
            <p className="wsp-modal-pkg-delivery">⏱ {pkg.delivery}</p>

            <div className="wsp-modal-divider" />

            <div className="wsp-modal-line-item">
              <span>Base package</span>
              <span>{fmt(pkg.price)}</span>
            </div>

            {selectedAddons.map((a) => {
              const qty = addonQtys[a.id] ?? 1;
              return (
                <div key={a.id} className="wsp-modal-line-item wsp-modal-line-item--addon">
                  <span>{a.icon} {a.label}{qty > 1 ? ` ×${qty}` : ""}</span>
                  <span>+{fmt(a.price * qty)}</span>
                </div>
              );
            })}

            {selectedAddons.length === 0 && (
              <p className="wsp-modal-no-addons">No add-ons selected</p>
            )}

            <div className="wsp-modal-divider" />

            <div className="wsp-modal-total-row">
              <span>Total</span>
              <span className="wsp-modal-total-price">{fmt(grandTotal)}</span>
            </div>

            <div className="wsp-modal-trust-items">
              <div className="wsp-modal-trust-item">🔒 Secure checkout via Stripe</div>
              <div className="wsp-modal-trust-item">📞 24hr response guarantee</div>
              <div className="wsp-modal-trust-item">✅ 30-day satisfaction guarantee</div>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="wsp-modal-right">
          <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close">✕</button>

          <div className="wsp-modal-right-inner">
            <div className="wsp-modal-steps">
              <div className={`wsp-modal-step${step >= 1 ? " wsp-modal-step--active" : ""}`}>
                <span>1</span> Contact
              </div>
              <div className="wsp-modal-step-line" />
              <div className={`wsp-modal-step${step >= 2 ? " wsp-modal-step--active" : ""}`}>
                <span>2</span> Checkout
              </div>
            </div>

            {step === 1 && (
              <div className="wsp-modal-form-body">
                <h3 className="wsp-modal-form-title">Your Details</h3>
                <p className="wsp-modal-form-sub">We'll send your order confirmation here.</p>

                <div className="wsp-form-group">
                  <label className="wsp-form-label">Full Name *</label>
                  <input className="wsp-form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={setField("name")} />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Email Address *</label>
                  <input className="wsp-form-input" type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Phone (optional)</label>
                  <input className="wsp-form-input" type="tel" placeholder="(937) 555-0100" value={form.phone} onChange={setField("phone")} />
                </div>
                <div className="wsp-form-group">
                  <label className="wsp-form-label">Company (optional)</label>
                  <input className="wsp-form-input" type="text" placeholder="Acme Inc." value={form.company} onChange={setField("company")} />
                </div>

                <button
                  className="wsp-modal-submit-btn"
                  type="button"
                  onClick={() => {
                    if (!form.name.trim() || !form.email.trim()) {
                      toast.error("Name and email are required.");
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Continue to Checkout →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="wsp-modal-form-body">
                <h3 className="wsp-modal-form-title">Complete Your Order</h3>
                <p className="wsp-modal-form-sub">
                  You'll be redirected to our secure Stripe checkout to complete payment.
                </p>

                <div className="wsp-modal-order-review">
                  <div className="wsp-modal-review-row">
                    <span>Name</span><span>{form.name}</span>
                  </div>
                  <div className="wsp-modal-review-row">
                    <span>Email</span><span>{form.email}</span>
                  </div>
                  <div className="wsp-modal-review-row">
                    <span>Package</span><span>{pkg.title}</span>
                  </div>
                  <div className="wsp-modal-review-row wsp-modal-review-row--total">
                    <span>Total</span><span>{fmt(grandTotal)}</span>
                  </div>
                </div>

                <div className="wsp-modal-btn-row">
                  <button className="wsp-modal-back-btn" type="button" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button
                    className="wsp-modal-submit-btn"
                    type="button"
                    onClick={handleProceed}
                    disabled={loading}
                  >
                    {loading ? "Redirecting…" : `Pay ${fmt(grandTotal)} →`}
                  </button>
                </div>

                <p className="wsp-modal-stripe-note">
                  🔒 Powered by Stripe — your card details are never stored by us.
                </p>
              </div>
            )}
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
  { id: "landing",  icon: "⚡", label: "Landing Page",      desc: "Single page, campaign-ready" },
  { id: "business", icon: "🏢", label: "Business Site",     desc: "Multi-page, professional presence" },
  { id: "ecommerce",icon: "🛒", label: "E-Commerce",        desc: "Full online store with payments" },
  { id: "portfolio",icon: "🎨", label: "Portfolio",         desc: "Showcase your work beautifully" },
  { id: "booking",  icon: "📅", label: "Booking / Appts",   desc: "Scheduling & appointment system" },
  { id: "other",    icon: "✨", label: "Other / Custom",    desc: "Something unique — let's talk" },
];

const BUDGET_PILLS = [
  "Under $2,000", "$2,000–$5,000", "$5,000–$10,000", "$10,000+", "Need a Quote"
];

function QuoteModal({
  open,
  preselectedType,
  onClose,
}: {
  open: boolean;
  preselectedType: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<QuoteForm>({
    name: "", email: "",
    websiteType: preselectedType || "",
    budget: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const setField = (k: keyof QuoteForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const quoteNumber = `WDQ-${Date.now().toString().slice(-8)}`;
      await (supabase as any).from("web_design_quotes").insert([{
        quote_number: quoteNumber,
        name: form.name,
        email: form.email,
        website_type: form.websiteType || null,
        budget_range: form.budget || null,
        additional_notes: form.notes || null,
        status: "new",
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

  const STATS = [
    { value: "2–6 wks", label: "Build Time" },
    { value: "30 day", label: "Guarantee" },
    { value: "24 hr", label: "Quote Response" },
  ];

  return (
    <div className="wsp-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="wsp-modal wsp-modal--quote">
        {/* Left — Hero panel */}
        <div className="wsp-modal-left wsp-modal-left--quote">
          <div className="wsp-modal-left-inner">
            <div className="wsp-quote-hero-icon">💬</div>
            <h3 className="wsp-quote-hero-title">Let's Build Something Great</h3>
            <p className="wsp-quote-hero-desc">
              Tell us what you need and we'll send a custom proposal — free, with no obligation.
            </p>

            <div className="wsp-modal-divider" />

            <div className="wsp-quote-stats">
              {STATS.map((s) => (
                <div key={s.label} className="wsp-quote-stat">
                  <div className="wsp-quote-stat-value">{s.value}</div>
                  <div className="wsp-quote-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="wsp-modal-divider" />

            <div className="wsp-quote-timeline">
              {["We review your request", "Send detailed proposal", "Free scoping call", "Build begins"].map((step, i) => (
                <div key={step} className="wsp-quote-timeline-item">
                  <div className="wsp-quote-timeline-dot">{i + 1}</div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="wsp-modal-right">
          <button className="wsp-modal-close" type="button" onClick={onClose} aria-label="Close">✕</button>

          <div className="wsp-modal-right-inner">
            <h3 className="wsp-modal-form-title">Get a Free Quote</h3>
            <p className="wsp-modal-form-sub">We respond within 24 hours.</p>

            {/* Website type radio cards */}
            <div className="wsp-form-group">
              <label className="wsp-form-label">Website Type</label>
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
                    <div>
                      <div className="wsp-radio-card-label">{wt.label}</div>
                      <div className="wsp-radio-card-desc">{wt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget pills */}
            <div className="wsp-form-group">
              <label className="wsp-form-label">Budget Range</label>
              <div className="wsp-budget-pills">
                {BUDGET_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    className={`wsp-budget-pill${form.budget === pill ? " wsp-budget-pill--selected" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, budget: pill }))}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            <div className="wsp-form-group">
              <label className="wsp-form-label">Full Name *</label>
              <input className="wsp-form-input" type="text" placeholder="Jane Smith" value={form.name} onChange={setField("name")} />
            </div>
            <div className="wsp-form-group">
              <label className="wsp-form-label">Email Address *</label>
              <input className="wsp-form-input" type="email" placeholder="you@example.com" value={form.email} onChange={setField("email")} />
            </div>
            <div className="wsp-form-group">
              <label className="wsp-form-label">Additional Notes</label>
              <textarea
                className="wsp-form-input wsp-form-textarea"
                placeholder="Tell us about your project, goals, or any specific requirements…"
                value={form.notes}
                onChange={setField("notes")}
                rows={3}
              />
            </div>

            <button
              className="wsp-modal-submit-btn"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending…" : "Send Quote Request →"}
            </button>
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
  pkg,
  active,
  checkoutLoading,
  onGetStarted,
  onGetQuote,
}: {
  pkg: Package;
  active: boolean;
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
    <div className={`wsp-col${active ? " wsp-col--active" : ""}`}>
      <div className={`wsp-card${pkg.featured ? " wsp-card--featured" : ""}`} style={cssVars}>
        <GrainTexture />
        <div className="wsp-edge-rim" />
        <div className="wsp-edge-ring" />
        <div className="wsp-edge-sheen-clip">
          <div className="wsp-edge-sheen" />
        </div>
        <div className="wsp-strip" />
        <div className="wsp-content">
          <div className="wsp-badge-row">
            <span className="wsp-badge">
              <span className="wsp-badge-icon">{pkg.badge.icon}</span>
              {pkg.badge.label}
              <span className="wsp-badge-shimmer" />
            </span>
          </div>
          <h3 className="wsp-title">{pkg.title}</h3>
          <div className="wsp-price-hold">
            <span className="wsp-price-shimmer" />
            <div className="wsp-price">{pkg.priceDisplay}</div>
            <div className="wsp-delivery">{pkg.delivery}</div>
          </div>
          <div className="wsp-chips">
            {pkg.chips.map((chip, i) => (
              <div key={i} className="wsp-chip">
                <span className="wsp-chip-disc">{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
          <ul className="wsp-features">
            {pkg.features.map((f, i) => (
              <li key={i} className="wsp-feature">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="wsp-ctas">
            <button className="wsp-btn" type="button" onClick={onGetStarted} disabled={checkoutLoading}>
              <span className="wsp-btn-label">{checkoutLoading ? "LOADING…" : "GET STARTED"}</span>
              <span className="wsp-btn-arrow" aria-hidden="true">→</span>
            </button>
            <button className="wsp-btn-quote" type="button" onClick={onGetQuote}>
              GET CUSTOM QUOTE
            </button>
          </div>
        </div>
        {pkg.graph === "line" && <LineGraph a={pkg.colorA} b={pkg.colorB} uid={pkg.id} />}
        {pkg.graph === "bar"  && <BarGraph  a={pkg.colorA} b={pkg.colorB} c={pkg.colorC} />}
        {pkg.graph === "area" && <AreaGraph a={pkg.colorA} b={pkg.colorB} c={pkg.colorC} uid={pkg.id} />}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PUBLIC COMPONENT — fully self-contained
═══════════════════════════════════════════ */

export const WebsitePricingCards = () => {
  const [activePackageId, setActivePackageId] = useState<string>("business");
  const [addonQtys, setAddonQtys] = useState<AddonQtys>({});
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutPkg, setCheckoutPkg] = useState<Package | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteType, setQuoteType] = useState("");

  /* ── Add-on helpers ── */
  const toggleAddon = useCallback((id: string) => {
    setAddonQtys((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) > 0) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setAddonQtys((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  }, []);

  /* ── Price calculation ── */
  const addonTotal = ADD_ONS.reduce((sum, a) => {
    const qty = addonQtys[a.id] ?? 0;
    return sum + a.price * qty;
  }, 0);

  const activePkg = PACKAGES.find((p) => p.id === activePackageId) ?? PACKAGES[1];
  const grandTotal = activePkg.price + addonTotal;

  /* ── Checkout ── */
  const handleGetStarted = useCallback((pkg: Package) => {
    setCheckoutPkg(pkg);
    setActivePackageId(pkg.id);
    setCheckoutLoading(pkg.id);
    setTimeout(() => {
      setCheckoutLoading(null);
      setCheckoutOpen(true);
    }, 300);
  }, []);

  /* ── Quote ── */
  const handleGetQuote = useCallback((pkg: Package) => {
    setQuoteType(pkg.id);
    setQuoteOpen(true);
  }, []);

  const selectedAddonCount = Object.values(addonQtys).filter((q) => q > 0).length;

  return (
    <>
      {/* ── Package selector pills ── */}
      <div className="wsp-pkg-pills">
        {PACKAGES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`wsp-pkg-pill${activePackageId === p.id ? " wsp-pkg-pill--active" : ""}`}
            style={{ "--wsp-a": p.colorA, "--wsp-b": p.colorB } as React.CSSProperties}
            onClick={() => setActivePackageId(p.id)}
          >
            <span>{p.badge.icon}</span>
            {p.title}
            <span className="wsp-pkg-pill-price">{p.priceDisplay}</span>
          </button>
        ))}
      </div>

      {/* ── Pricing cards grid ── */}
      <div className="wsp-wrap">
        <div className="wsp-grid">
          {PACKAGES.map((pkg) => (
            <PremiumCard
              key={pkg.id}
              pkg={pkg}
              active={activePackageId === pkg.id}
              checkoutLoading={checkoutLoading === pkg.id}
              onGetStarted={() => handleGetStarted(pkg)}
              onGetQuote={() => handleGetQuote(pkg)}
            />
          ))}
        </div>
      </div>

      {/* ── Add-on section ── */}
      <div className="wsp-addons-section">
        <div className="wsp-addons-header">
          <span className="wsp-addons-badge">✨ Enhance Your Project</span>
          <h3 className="wsp-addons-title">Premium Add-Ons</h3>
          <p className="wsp-addons-sub">
            Check what you need — your total updates instantly below.
          </p>
        </div>

        <div className="wsp-addons-grid">
          {ADD_ONS.map((addon) => {
            const qty = addonQtys[addon.id] ?? 0;
            const checked = qty > 0;
            return (
              <div
                key={addon.id}
                className={`wsp-addon-card${checked ? " wsp-addon-card--checked" : ""}`}
              >
                <div className="wsp-addon-card-top" onClick={() => toggleAddon(addon.id)} role="checkbox" aria-checked={checked} tabIndex={0} onKeyDown={(e) => e.key === " " && toggleAddon(addon.id)}>
                  <div className="wsp-addon-checkbox-wrap">
                    <div className={`wsp-addon-checkbox${checked ? " wsp-addon-checkbox--on" : ""}`}>
                      {checked && <span>✓</span>}
                    </div>
                  </div>
                  <span className="wsp-addon-icon">{addon.icon}</span>
                  <div className="wsp-addon-info">
                    <div className="wsp-addon-label">{addon.label}</div>
                    <div className="wsp-addon-note">{addon.note}</div>
                  </div>
                  <div className="wsp-addon-price">+{fmt(addon.price)}</div>
                </div>

                {checked && addon.hasQty && (
                  <div className="wsp-addon-qty-row">
                    <span className="wsp-addon-qty-label">Quantity:</span>
                    <div className="wsp-addon-qty-ctrl">
                      <button type="button" className="wsp-qty-btn" onClick={() => setQty(addon.id, qty - 1)} aria-label="Decrease">−</button>
                      <span className="wsp-qty-val">{qty}</span>
                      <button type="button" className="wsp-qty-btn" onClick={() => setQty(addon.id, Math.min(qty + 1, addon.maxQty ?? 20))} aria-label="Increase">+</button>
                    </div>
                    <span className="wsp-addon-qty-sub">= {fmt(addon.price * qty)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        <div className="wsp-summary-bar">
          <div className="wsp-summary-bar-left">
            <div className="wsp-summary-bar-pkg">
              <span className="wsp-summary-bar-pkg-icon">{activePkg.badge.icon}</span>
              <div>
                <div className="wsp-summary-bar-pkg-name">{activePkg.title}</div>
                <div className="wsp-summary-bar-pkg-note">{activePkg.delivery}</div>
              </div>
            </div>
            {selectedAddonCount > 0 && (
              <div className="wsp-summary-bar-addons">
                + {selectedAddonCount} add-on{selectedAddonCount > 1 ? "s" : ""} (+{fmt(addonTotal)})
              </div>
            )}
          </div>
          <div className="wsp-summary-bar-right">
            <div className="wsp-summary-bar-total-label">Total</div>
            <div className="wsp-summary-bar-total">{fmt(grandTotal)}</div>
          </div>
          <button
            className="wsp-summary-bar-cta"
            type="button"
            onClick={() => {
              setCheckoutPkg(activePkg);
              setCheckoutOpen(true);
            }}
          >
            Get Started →
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
    </>
  );
};

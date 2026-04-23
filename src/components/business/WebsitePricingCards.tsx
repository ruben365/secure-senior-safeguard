import React, { useState } from "react";
import "./WebsitePricingCards.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { WebDesignQuoteDialog } from "./WebDesignQuoteDialog";

/* ─── Data ─── */
const BASE_PRICES: Record<string, number> = {
  starter: 1500,
  business: 3500,
  elite: 7500,
};

const ADD_ONS = [
  { id: "logo",        label: "Logo Design",          note: "Professional brand mark",           price: 500 },
  { id: "content",     label: "Content Writing",       note: "$200 per page written for you",     price: 200 },
  { id: "extra-pages", label: "Extra Pages",           note: "$300 per additional page",          price: 300 },
  { id: "chatbot",     label: "AI Chatbot",            note: "Conversational assistant widget",   price: 800 },
  { id: "seo",         label: "SEO Package",           note: "Full keyword & meta optimization",  price: 600 },
  { id: "email",       label: "Email Setup",           note: "Professional domain email config",  price: 150 },
  { id: "maintenance", label: "Monthly Maintenance",   note: "$200/month ongoing retainer",       price: 200 },
];

interface TierConfig {
  id: string;
  badge: { icon: string; label: string };
  title: string;
  priceDisplay: string;
  delivery: string;
  chips: { icon: string; label: string }[];
  features: string[];
  colorA: string;
  colorB: string;
  colorC: string;
  graph: "line" | "bar" | "area";
  featured: boolean;
}

const TIERS: TierConfig[] = [
  {
    id: "starter",
    badge: { icon: "⚡", label: "QUICK START" },
    title: "Landing Page",
    priceDisplay: "$1,500",
    delivery: "Delivered in 2 weeks",
    chips: [
      { icon: "🎨", label: "Custom Design" },
      { icon: "📱", label: "Mobile-First" },
      { icon: "🔍", label: "Basic SEO" },
      { icon: "📋", label: "Contact Form" },
    ],
    features: [
      "Custom responsive design",
      "Up to 5 pages",
      "Contact form integration",
      "Basic on-page SEO",
      "Mobile-first development",
      "SSL certificate included",
      "1 month support after launch",
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
    priceDisplay: "$3,500",
    delivery: "Delivered in 3–4 weeks",
    chips: [
      { icon: "🚀", label: "Full SEO" },
      { icon: "💬", label: "AI Chat" },
      { icon: "📊", label: "Analytics" },
      { icon: "📝", label: "Blog Section" },
    ],
    features: [
      "Everything in Landing Page",
      "Up to 10 pages",
      "Blog / news section",
      "Google Analytics setup",
      "Advanced SEO optimization",
      "Social media integration",
      "Speed & performance optimization",
      "3 months support after launch",
    ],
    colorA: "#7c6fd0",
    colorB: "#c382b8",
    colorC: "#6fb3c9",
    graph: "bar",
    featured: true,
  },
  {
    id: "elite",
    badge: { icon: "👑", label: "ELITE" },
    title: "E-Commerce",
    priceDisplay: "$7,500",
    delivery: "Delivered in 4–6 weeks",
    chips: [
      { icon: "🛒", label: "Full Store" },
      { icon: "💳", label: "Payments" },
      { icon: "📦", label: "Inventory" },
      { icon: "👤", label: "Accounts" },
    ],
    features: [
      "Everything in Business",
      "Full online store setup",
      "Stripe / PayPal payment processing",
      "Inventory management system",
      "Customer accounts & wishlist",
      "Product search & filters",
      "Order management dashboard",
      "6 months support after launch",
    ],
    colorA: "#4a8f90",
    colorB: "#3e7290",
    colorC: "#8cc4b8",
    graph: "area",
    featured: false,
  },
];

/* ─── Grain texture ─── */
const GrainTexture = () => (
  <svg
    className="wsp-grain"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    aria-hidden="true"
  >
    <filter id="wsp-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#wsp-noise)" opacity="1" />
  </svg>
);

/* ─── Check icon (15px) ─── */
const CheckIcon = () => (
  <svg
    className="wsp-check"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="7.5" cy="7.5" r="7" fill="currentColor" fillOpacity="0.15" />
    <path
      d="M4.5 7.5l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── SVG Graphs ─── */
const LineGraph = ({ a, b, uid }: { a: string; b: string; uid: string }) => (
  <svg
    className="wsp-graph"
    viewBox="0 0 200 72"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.36" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,66 L30,56 L65,46 L95,34 L130,22 L165,11 L200,5 L200,72 L0,72 Z"
      fill={`url(#wsp-fill-${uid})`}
    />
    <path
      className="wsp-line-path"
      d="M0,66 L30,56 L65,46 L95,34 L130,22 L165,11 L200,5"
      stroke={a}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="95" cy="34" r="3.5" fill={b} opacity="0.85" />
    <circle cx="200" cy="5" r="4" fill={a} />
  </svg>
);

const BarGraph = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <svg
    className="wsp-graph"
    viewBox="0 0 200 72"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <rect className="wsp-bar" x="8"   y="50" width="28" height="22" rx="3" fill={a} opacity="0.52" />
    <rect className="wsp-bar" x="47"  y="40" width="28" height="32" rx="3" fill={b} opacity="0.63" />
    <rect className="wsp-bar" x="86"  y="27" width="28" height="45" rx="3" fill={a} opacity="0.75" />
    <rect className="wsp-bar" x="125" y="14" width="28" height="58" rx="3" fill={c} opacity="0.86" />
    <rect className="wsp-bar" x="164" y="4"  width="28" height="68" rx="3" fill={b} opacity="0.96" />
  </svg>
);

const AreaGraph = ({ a, b, c, uid }: { a: string; b: string; c: string; uid: string }) => (
  <svg
    className="wsp-graph"
    viewBox="0 0 200 72"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.40" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,64 C25,56 50,20 100,15 C150,10 170,38 200,13 L200,72 L0,72 Z"
      fill={`url(#wsp-fill-${uid})`}
    />
    <path
      className="wsp-area-path"
      d="M0,64 C25,56 50,20 100,15 C150,10 170,38 200,13"
      stroke={a}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="100" cy="15" r="4" fill={b} />
    <circle cx="0"   cy="64" r="2.5" fill={a} opacity="0.6" />
    <circle cx="200" cy="13" r="4" fill={c} />
  </svg>
);

/* ─── Single card ─── */
const PremiumCard = ({
  tier,
  onGetStarted,
  onGetQuote,
  loading,
}: {
  tier: TierConfig;
  onGetStarted: () => void;
  onGetQuote: () => void;
  loading: boolean;
}) => {
  const { id, badge, title, priceDisplay, delivery, chips, features, colorA, colorB, colorC, graph, featured } = tier;
  const cssVars = { "--wsp-a": colorA, "--wsp-b": colorB, "--wsp-c": colorC } as React.CSSProperties;

  return (
    <div className="wsp-col">
      <div className={`wsp-card${featured ? " wsp-card--featured" : ""}`} style={cssVars}>
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
              <span className="wsp-badge-icon">{badge.icon}</span>
              {badge.label}
              <span className="wsp-badge-shimmer" />
            </span>
          </div>

          <h3 className="wsp-title">{title}</h3>

          <div className="wsp-price-hold">
            <span className="wsp-price-shimmer" />
            <div className="wsp-price">{priceDisplay}</div>
            <div className="wsp-delivery">{delivery}</div>
          </div>

          <div className="wsp-chips">
            {chips.map((chip, i) => (
              <div key={i} className="wsp-chip">
                <span className="wsp-chip-disc">{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

          <ul className="wsp-features">
            {features.map((f, i) => (
              <li key={i} className="wsp-feature">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="wsp-ctas">
            <button className="wsp-btn" type="button" onClick={onGetStarted} disabled={loading}>
              <span className="wsp-btn-label">{loading ? "LOADING…" : "GET STARTED"}</span>
              <span className="wsp-btn-arrow" aria-hidden="true">→</span>
            </button>
            <button className="wsp-btn-quote" type="button" onClick={onGetQuote}>
              GET CUSTOM QUOTE
            </button>
          </div>
        </div>

        {graph === "line" && <LineGraph a={colorA} b={colorB} uid={id} />}
        {graph === "bar"  && <BarGraph  a={colorA} b={colorB} c={colorC} />}
        {graph === "area" && <AreaGraph a={colorA} b={colorB} c={colorC} uid={id} />}
      </div>
    </div>
  );
};

/* ─── Public component — fully self-contained ─── */
export const WebsitePricingCards = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [activeTierForQuote, setActiveTierForQuote] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addOnTotal = ADD_ONS.filter((a) => selectedAddOns.has(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  );

  const handleGetStarted = async (tierId: string) => {
    const tier = TIERS.find((t) => t.id === tierId);
    if (!tier) return;

    setCheckoutLoading(tierId);
    try {
      const basePrice = BASE_PRICES[tierId];
      const selectedAddOnsList = ADD_ONS.filter((a) => selectedAddOns.has(a.id));
      const totalAmount = basePrice + addOnTotal;

      const { data: orderData, error: orderError } = await supabase
        .from("web_design_orders")
        .insert({
          package_type: tier.title,
          package_price: basePrice,
          add_ons: selectedAddOnsList,
          total_price: totalAmount,
          status: "pending",
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        "create-webdesign-checkout",
        {
          body: {
            packageName: tier.title,
            packageType: tierId,
            totalAmount,
            addOns: selectedAddOnsList.map((a) => ({ id: a.id, label: a.label, price: a.price })),
            orderId: orderData.id,
            successUrl: `${window.location.origin}/business?payment=success`,
            cancelUrl: `${window.location.origin}/business`,
          },
        },
      );

      if (checkoutError) throw checkoutError;
      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleGetQuote = (tierId: string) => {
    const tier = TIERS.find((t) => t.id === tierId);
    setActiveTierForQuote(tier?.title ?? "");
    setQuoteDialogOpen(true);
  };

  return (
    <>
      <div className="wsp-wrap">
        <div className="wsp-grid">
          {TIERS.map((tier) => (
            <PremiumCard
              key={tier.id}
              tier={tier}
              onGetStarted={() => handleGetStarted(tier.id)}
              onGetQuote={() => handleGetQuote(tier.id)}
              loading={checkoutLoading === tier.id}
            />
          ))}
        </div>

        {/* Add-on selector */}
        <div className="wsp-addons-section">
          <p className="wsp-addons-title">Enhance Your Package</p>
          <p className="wsp-addons-subtitle">
            Select add-ons below — they apply to whichever package you choose above.
          </p>
          <div className="wsp-addons-grid">
            {ADD_ONS.map((addon) => {
              const checked = selectedAddOns.has(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`wsp-addon-item${checked ? " wsp-addon-item--checked" : ""}`}
                  onClick={() => toggleAddOn(addon.id)}
                  role="checkbox"
                  aria-checked={checked}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === " " && toggleAddOn(addon.id)}
                >
                  <div className="wsp-addon-check">
                    <span className="wsp-addon-check-mark">✓</span>
                  </div>
                  <div className="wsp-addon-text">
                    <div className="wsp-addon-label">{addon.label}</div>
                    <div className="wsp-addon-note">{addon.note}</div>
                  </div>
                  <div className="wsp-addon-price">+${addon.price.toLocaleString()}</div>
                </div>
              );
            })}
          </div>

          {/* Total bar */}
          <div className="wsp-total-bar">
            <div>
              <div className="wsp-total-label">
                {selectedAddOns.size === 0
                  ? "No add-ons selected"
                  : `${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""} selected`}
              </div>
              <div className="wsp-total-breakdown">
                {selectedAddOns.size > 0 ? "Adds to your chosen package price" : "Select add-ons to see your total"}
              </div>
            </div>
            <div className="wsp-total-amount">
              {selectedAddOns.size > 0 ? `+$${addOnTotal.toLocaleString()}` : "$0"}
            </div>
          </div>
        </div>
      </div>

      <WebDesignQuoteDialog
        open={quoteDialogOpen}
        onOpenChange={setQuoteDialogOpen}
        preselectedType={activeTierForQuote}
      />
    </>
  );
};

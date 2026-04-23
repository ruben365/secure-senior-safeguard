import React from "react";
import "./WebsitePricingCards.css";

/* ─── Types ─── */
interface TierConfig {
  id: string;
  badge: { icon: string; label: string };
  title: string;
  price: string;
  delivery: string;
  chips: { icon: string; label: string }[];
  features: string[];
  colorA: string;
  colorB: string;
  colorC: string;
  graph: "line" | "bar" | "area";
  featured: boolean;
  onClick: () => void;
}

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

const AreaGraph = ({
  a,
  b,
  c,
  uid,
}: {
  a: string;
  b: string;
  c: string;
  uid: string;
}) => (
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
const PremiumCard = ({ tier }: { tier: TierConfig }) => {
  const {
    id,
    badge,
    title,
    price,
    delivery,
    chips,
    features,
    colorA,
    colorB,
    colorC,
    graph,
    featured,
    onClick,
  } = tier;

  const cssVars = {
    "--wsp-a": colorA,
    "--wsp-b": colorB,
    "--wsp-c": colorC,
  } as React.CSSProperties;

  return (
    <div className="wsp-col">
      <div
        className={`wsp-card${featured ? " wsp-card--featured" : ""}`}
        style={cssVars}
      >
        {/* Decorative layers */}
        <GrainTexture />
        <div className="wsp-edge-rim" />
        <div className="wsp-edge-ring" />
        <div className="wsp-edge-sheen-clip">
          <div className="wsp-edge-sheen" />
        </div>

        {/* Top color strip */}
        <div className="wsp-strip" />

        {/* Main content */}
        <div className="wsp-content">
          {/* Animated badge */}
          <div className="wsp-badge-row">
            <span className="wsp-badge">
              <span className="wsp-badge-icon">{badge.icon}</span>
              {badge.label}
              <span className="wsp-badge-shimmer" />
            </span>
          </div>

          {/* Title */}
          <h3 className="wsp-title">{title}</h3>

          {/* Price holder / metric row */}
          <div className="wsp-price-hold">
            <span className="wsp-price-shimmer" />
            <div className="wsp-price">{price}</div>
            <div className="wsp-delivery">{delivery}</div>
          </div>

          {/* Glass chips */}
          <div className="wsp-chips">
            {chips.map((chip, i) => (
              <div key={i} className="wsp-chip">
                <span className="wsp-chip-disc">{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

          {/* Feature list with 15px check marks */}
          <ul className="wsp-features">
            {features.map((f, i) => (
              <li key={i} className="wsp-feature">
                <CheckIcon />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="wsp-btn" type="button" onClick={onClick}>
            <span className="wsp-btn-label">GET STARTED</span>
            <span className="wsp-btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Animated graph at bottom */}
        {graph === "line" && <LineGraph a={colorA} b={colorB} uid={id} />}
        {graph === "bar"  && <BarGraph  a={colorA} b={colorB} c={colorC} />}
        {graph === "area" && <AreaGraph a={colorA} b={colorB} c={colorC} uid={id} />}
      </div>
    </div>
  );
};

/* ─── Public component ─── */
export interface WebsitePricingCardsProps {
  onStarterClick:  () => void;
  onBusinessClick: () => void;
  onEliteClick:    () => void;
}

export const WebsitePricingCards = ({
  onStarterClick,
  onBusinessClick,
  onEliteClick,
}: WebsitePricingCardsProps) => {
  const tiers: TierConfig[] = [
    {
      id: "starter",
      badge: { icon: "⚡", label: "QUICK START" },
      title: "Landing Page",
      price: "$1,500",
      delivery: "Delivered in 2 weeks",
      chips: [
        { icon: "🎨", label: "Custom Design" },
        { icon: "📱", label: "Mobile-First" },
        { icon: "🔍", label: "Basic SEO" },
        { icon: "📋", label: "Contact Form" },
      ],
      features: [
        "Custom responsive design",
        "Contact form integration",
        "Basic SEO setup",
        "1 month hosting included",
      ],
      colorA: "#e08a4a",
      colorB: "#e8b070",
      colorC: "#d47a8e",
      graph: "line",
      featured: false,
      onClick: onStarterClick,
    },
    {
      id: "business",
      badge: { icon: "⭐", label: "MOST POPULAR" },
      title: "Business Website",
      price: "$3,500",
      delivery: "Delivered in 3–4 weeks",
      chips: [
        { icon: "🚀", label: "Full SEO" },
        { icon: "💬", label: "AI Chat" },
        { icon: "📊", label: "Analytics" },
        { icon: "📝", label: "Blog Section" },
      ],
      features: [
        "Multi-page website (up to 8 pages)",
        "Advanced SEO optimization",
        "Blog or news section",
        "Analytics dashboard",
        "3 months hosting included",
      ],
      colorA: "#7c6fd0",
      colorB: "#c382b8",
      colorC: "#6fb3c9",
      graph: "bar",
      featured: true,
      onClick: onBusinessClick,
    },
    {
      id: "elite",
      badge: { icon: "👑", label: "ELITE" },
      title: "E-Commerce",
      price: "$7,500",
      delivery: "Delivered in 4–6 weeks",
      chips: [
        { icon: "🛒", label: "Full Store" },
        { icon: "💳", label: "Payments" },
        { icon: "📦", label: "Inventory" },
        { icon: "👤", label: "Accounts" },
      ],
      features: [
        "Full online store",
        "Payment processing",
        "Inventory management",
        "Customer accounts",
        "6 months hosting included",
      ],
      colorA: "#4a8f90",
      colorB: "#3e7290",
      colorC: "#8cc4b8",
      graph: "area",
      featured: false,
      onClick: onEliteClick,
    },
  ];

  return (
    <div className="wsp-wrap">
      <div className="wsp-grid">
        {tiers.map((tier) => (
          <PremiumCard key={tier.id} tier={tier} />
        ))}
      </div>
    </div>
  );
};

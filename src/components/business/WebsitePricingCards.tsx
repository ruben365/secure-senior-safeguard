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

/* ─── SVG Graphs ─── */
const LineGraph = ({ a, b, uid }: { a: string; b: string; uid: string }) => (
  <svg
    className="wsp-graph"
    viewBox="0 0 200 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.38" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,52 L30,44 L65,36 L95,27 L130,17 L165,9 L200,4 L200,56 L0,56 Z"
      fill={`url(#wsp-fill-${uid})`}
    />
    <path
      className="wsp-line-path"
      d="M0,52 L30,44 L65,36 L95,27 L130,17 L165,9 L200,4"
      stroke={a}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="95" cy="27" r="4" fill={b} opacity="0.85" />
    <circle cx="200" cy="4" r="4.5" fill={a} />
  </svg>
);

const BarGraph = ({ a, b, c }: { a: string; b: string; c: string }) => (
  <svg
    className="wsp-graph"
    viewBox="0 0 200 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <rect className="wsp-bar" x="8"   y="38" width="28" height="18" rx="3" fill={a} opacity="0.55" />
    <rect className="wsp-bar" x="47"  y="30" width="28" height="26" rx="3" fill={b} opacity="0.65" />
    <rect className="wsp-bar" x="86"  y="20" width="28" height="36" rx="3" fill={a} opacity="0.78" />
    <rect className="wsp-bar" x="125" y="11" width="28" height="45" rx="3" fill={c} opacity="0.88" />
    <rect className="wsp-bar" x="164" y="3"  width="28" height="53" rx="3" fill={b} opacity="0.96" />
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
    viewBox="0 0 200 56"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`wsp-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={a} stopOpacity="0.42" />
        <stop offset="100%" stopColor={a} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,50 C25,44 50,16 100,12 C150,8 170,30 200,10 L200,56 L0,56 Z"
      fill={`url(#wsp-fill-${uid})`}
    />
    <path
      className="wsp-area-path"
      d="M0,50 C25,44 50,16 100,12 C150,8 170,30 200,10"
      stroke={a}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="100" cy="12" r="4.5" fill={b} />
    <circle cx="0"   cy="50" r="3"   fill={a} opacity="0.6" />
    <circle cx="200" cy="10" r="4.5" fill={c} />
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

          {/* Price holder */}
          <div className="wsp-price-hold">
            <span className="wsp-price-shimmer" />
            <div className="wsp-price">{price}</div>
            <div className="wsp-delivery">{delivery}</div>
          </div>

          {/* Feature chips */}
          <div className="wsp-chips">
            {chips.map((chip, i) => (
              <div key={i} className="wsp-chip">
                <span className="wsp-chip-disc">{chip.icon}</span>
                <span>{chip.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="wsp-btn" type="button" onClick={onClick}>
            <span className="wsp-btn-label">GET STARTED</span>
            <span className="wsp-btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        {/* Animated graph at card bottom */}
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
      colorA: "#4a8f90",
      colorB: "#3e7290",
      colorC: "#8cc4b8",
      graph: "area",
      featured: false,
      onClick: onEliteClick,
    },
  ];

  return (
    <div className="wsp-grid">
      {tiers.map((tier) => (
        <PremiumCard key={tier.id} tier={tier} />
      ))}
    </div>
  );
};

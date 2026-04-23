import { Cog, Settings2, Workflow, ArrowUpRight } from "lucide-react";

const GOLD        = "#d4af37";
const GOLD_BRIGHT = "#f5c543";
const GOLD_DARK   = "#b8901e";
const GOLD_TEXT   = "#e0a312";

/**
 * Enterprise SaaS Bento Section — dark glass + gold accent edition.
 * Reuses .gx-bento layout from graphic-enhancement.css;
 * visual overrides are scoped via .ent-bento selector.
 */
export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      className="relative w-full py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080b11 0%, #0d1018 100%)" }}
    >
      <style>{`
        @keyframes gx-gear-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .gx-gear-spin {
          transform-origin: 50% 50%;
          animation: gx-gear-spin 12s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gx-gear-spin { animation: none; }
        }
        .gx-num { font-variant-numeric: tabular-nums; }

        /* ─── Dark-glass overrides scoped to .ent-bento ─── */
        .ent-bento .gx-bento-tile {
          background: rgba(255,255,255,0.04) !important;
          backdrop-filter: blur(20px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
          box-shadow:
            0 8px 32px -12px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(212,175,55,0.10) !important;
        }
        .ent-bento .gx-bento-tile::after {
          box-shadow: inset 0 0 0 1px rgba(212,175,55,0.20) !important;
        }
        .ent-bento .gx-bento-tile:hover::after {
          box-shadow: inset 0 0 0 1.5px rgba(212,175,55,0.40) !important;
        }
        .ent-bento .gx-bento-tile--accent {
          background: rgba(212,175,55,0.06) !important;
        }
        .ent-bento .gx-bento-tile--accent::before {
          background: #d4af37 !important;
        }
        .ent-bento .gx-bento-tile__eyebrow {
          color: #d4af37 !important;
        }
        .ent-bento .gx-bento-tile__eyebrow::before {
          background: #d4af37 !important;
        }
        .ent-bento .gx-bento-tile__title {
          color: #ffffff !important;
        }
        .ent-bento .gx-bento-tile__body {
          color: rgba(255,255,255,0.60) !important;
        }
        .ent-bento .gx-bento-tile__media {
          background: rgba(212,175,55,0.04) !important;
        }
        .ent-bento .gx-bento--feature::before {
          border-color: #d4af37 !important;
          opacity: 0.6;
        }
      `}</style>

      {/* Gold rule across the top */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 ent-bento">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="inline-block text-[0.7rem] font-semibold uppercase mb-4"
            style={{ letterSpacing: "0.18em", color: GOLD }}
          >
            Enterprise Platform
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white mb-4 leading-[1.1]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Everything your team needs, in one place.
          </h2>
          <p
            className="text-base md:text-lg mx-auto"
            style={{ maxWidth: "60ch", color: "rgba(255,255,255,0.60)" }}
          >
            Modular building blocks for automation, identity, and revenue —
            unified under a single, clean console.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="gx-bento">

          {/* Widget 1 — Automation */}
          <article className="gx-bento-tile gx-bento--feature gx-bento-tile--accent">
            <p className="gx-bento-tile__eyebrow">Workflow Engine</p>
            <h3 className="gx-bento-tile__title">Automation</h3>
            <p className="gx-bento-tile__body">Build workflows once. Run them forever.</p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <div className="relative w-full h-full flex items-center justify-center">
                <Cog
                  className="gx-gear-spin absolute"
                  size={120}
                  strokeWidth={1.25}
                  color={GOLD}
                  style={{ opacity: 0.55, top: "18%", left: "22%" }}
                />
                <Settings2
                  className="absolute"
                  size={56}
                  strokeWidth={1.5}
                  color={GOLD_DARK}
                  style={{ opacity: 0.70, top: "12%", right: "18%" }}
                />
                <Workflow
                  className="absolute"
                  size={44}
                  strokeWidth={1.5}
                  color={GOLD_BRIGHT}
                  style={{ opacity: 0.80, bottom: "14%", right: "26%" }}
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mt-2"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.32)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              <span className="text-xs font-medium gx-num" style={{ color: GOLD_TEXT }}>
                12 active workflows
              </span>
            </div>
          </article>

          {/* Widget 2 — Revenue Analytics */}
          <article className="gx-bento-tile gx-bento--tall">
            <p className="gx-bento-tile__eyebrow">Revenue</p>
            <h3 className="gx-bento-tile__title">Revenue Analytics</h3>
            <p className="gx-bento-tile__body">Real-time visibility across every product line.</p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <svg viewBox="0 0 320 180" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ent-rev-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(212,175,55,0.08)" strokeWidth="1" />
                ))}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30 L320,180 L0,180 Z"
                  fill="url(#ent-rev-fill)"
                />
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {([[0,140],[45,122],[90,100],[135,82],[180,70],[225,60],[270,42],[320,30]] as [number,number][]).map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#0d1018" stroke={GOLD} strokeWidth="1.75" />
                ))}
              </svg>
            </div>

            <div className="flex items-end justify-between mt-2 gap-3">
              <div>
                <p className="gx-num font-semibold leading-none text-white" style={{ fontSize: "2.5rem" }}>$1.2M</p>
                <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Total Revenue
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.30)",
                }}
              >
                <ArrowUpRight size={12} color={GOLD_TEXT} strokeWidth={2.5} />
                <span className="text-xs font-semibold gx-num" style={{ color: GOLD_TEXT }}>18.4% MoM</span>
              </div>
            </div>
          </article>

          {/* Widget 3 — User Management */}
          <article className="gx-bento-tile gx-bento--wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
              <div className="flex-1 min-w-0">
                <p className="gx-bento-tile__eyebrow">Identity</p>
                <h3 className="gx-bento-tile__title">User Management</h3>
                <p className="gx-bento-tile__body mt-1">
                  Roles, permissions, and SSO in a single console.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: GOLD_TEXT,
                        background: "transparent",
                        border: "1px solid rgba(212,175,55,0.32)",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="flex items-center" aria-hidden="true">
                  {[
                    { bg: "#1a1a2e", initials: "AM" },
                    { bg: "#4a2a0a", initials: "JL" },
                    { bg: "#2a3a1a", initials: "SK" },
                    { bg: "#1a2a3a", initials: "RT" },
                    { bg: "#3a1a2a", initials: "DV" },
                    { bg: "#2a1a3a", initials: "EN" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full text-[10px] font-semibold ${i > 0 ? "-ml-3" : ""}`}
                      style={{
                        width: 36,
                        height: 36,
                        background: a.bg,
                        border: "2px solid rgba(212,175,55,0.35)",
                        color: GOLD_BRIGHT,
                        zIndex: 10 - i,
                      }}
                    >
                      {a.initials}
                    </div>
                  ))}
                  <div
                    className="-ml-3 flex items-center justify-center rounded-full text-[10px] font-semibold gx-num"
                    style={{
                      width: 36,
                      height: 36,
                      background: "rgba(212,175,55,0.12)",
                      border: "2px solid rgba(212,175,55,0.42)",
                      color: GOLD_TEXT,
                    }}
                  >
                    +12
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.22)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                  <span className="text-xs font-medium gx-num" style={{ color: GOLD_TEXT }}>
                    2,847 active members
                  </span>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default EnterpriseBentoSection;

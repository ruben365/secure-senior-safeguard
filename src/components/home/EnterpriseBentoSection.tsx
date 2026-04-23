import { Cog, Settings2, Workflow, ArrowUpRight } from "lucide-react";

export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      className="relative w-full bg-[#080b11] py-20 overflow-hidden"
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

        /* Dark glass overrides for the enterprise bento tiles */
        .enterprise-dark .gx-bento-tile {
          background: rgba(255,255,255,0.04) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          box-shadow: none !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .enterprise-dark .gx-bento-tile::after {
          box-shadow: none !important;
        }
        .enterprise-dark .gx-bento-tile:hover {
          border-color: rgba(245,197,67,0.22) !important;
          transform: translateY(-2px) !important;
        }
        .enterprise-dark .gx-bento-tile--accent {
          background: rgba(245,197,67,0.04) !important;
          border-color: rgba(245,197,67,0.12) !important;
        }
        .enterprise-dark .gx-bento-tile--accent::before {
          background: #f5c543 !important;
        }
        .enterprise-dark .gx-bento-tile__eyebrow {
          color: #f5c543 !important;
        }
        .enterprise-dark .gx-bento-tile__eyebrow::before {
          background: #f5c543 !important;
        }
        .enterprise-dark .gx-bento-tile__title {
          color: rgba(255,255,255,0.92) !important;
        }
        .enterprise-dark .gx-bento-tile__body {
          color: rgba(255,255,255,0.50) !important;
        }
        .enterprise-dark .gx-bento-tile__media {
          background: rgba(255,255,255,0.03) !important;
        }
      `}</style>

      {/* Subtle dot-grid background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      {/* Soft gold ambient glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,67,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#f5c543] mb-4"
            style={{ letterSpacing: "0.18em" }}
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
            className="text-base md:text-lg text-white/50 mx-auto"
            style={{ maxWidth: "60ch" }}
          >
            Modular building blocks for automation, identity, and revenue —
            unified under a single, clean console.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="gx-bento enterprise-dark">
          {/* Widget 1 — Automation */}
          <article className="gx-bento-tile gx-bento--feature gx-bento-tile--accent">
            <p className="gx-bento-tile__eyebrow">Workflow Engine</p>
            <h3 className="gx-bento-tile__title">Automation</h3>
            <p className="gx-bento-tile__body">
              Build workflows once. Run them forever.
            </p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <div className="relative w-full h-full flex items-center justify-center">
                <Cog
                  className="gx-gear-spin absolute"
                  size={120}
                  strokeWidth={1.25}
                  color="#f5c543"
                  style={{ opacity: 0.22, top: "18%", left: "22%" }}
                />
                <Settings2
                  className="absolute"
                  size={56}
                  strokeWidth={1.5}
                  color="#f5c543"
                  style={{ opacity: 0.55, top: "12%", right: "18%" }}
                />
                <Workflow
                  className="absolute"
                  size={44}
                  strokeWidth={1.5}
                  color="#f5c543"
                  style={{ opacity: 0.70, bottom: "14%", right: "26%" }}
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mt-2"
              style={{
                background: "rgba(245,197,67,0.10)",
                border: "1px solid rgba(245,197,67,0.22)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5c543]" />
              <span className="text-xs font-medium text-[#f5c543] gx-num">
                12 active workflows
              </span>
            </div>
          </article>

          {/* Widget 2 — Revenue Analytics */}
          <article className="gx-bento-tile gx-bento--tall">
            <p className="gx-bento-tile__eyebrow">Revenue</p>
            <h3 className="gx-bento-tile__title">Revenue Analytics</h3>
            <p className="gx-bento-tile__body">
              Real-time visibility across every product line.
            </p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <svg
                viewBox="0 0 320 180"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="gx-rev-fill-dark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5c543" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#f5c543" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="320"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30 L320,180 L0,180 Z"
                  fill="url(#gx-rev-fill-dark)"
                />
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30"
                  fill="none"
                  stroke="#f5c543"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  [0, 140], [45, 122], [90, 100], [135, 82],
                  [180, 70], [225, 60], [270, 42], [320, 30],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#080b11"
                    stroke="#f5c543"
                    strokeWidth="1.75"
                  />
                ))}
              </svg>
            </div>

            <div className="flex items-end justify-between mt-2 gap-3">
              <div>
                <p
                  className="gx-num font-semibold leading-none text-white"
                  style={{ fontSize: "2.5rem" }}
                >
                  $1.2M
                </p>
                <p className="text-xs text-white/40 mt-1.5 uppercase tracking-wider">
                  Total Revenue
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(245,197,67,0.10)",
                  border: "1px solid rgba(245,197,67,0.22)",
                }}
              >
                <ArrowUpRight size={12} color="#f5c543" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-[#f5c543] gx-num">
                  18.4% MoM
                </span>
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
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-[#f5c543]"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(245,197,67,0.25)",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                {/* Avatar stack */}
                <div className="flex items-center" aria-hidden="true">
                  {[
                    { bg: "rgba(245,197,67,0.35)", initials: "AM" },
                    { bg: "rgba(245,197,67,0.28)", initials: "JL" },
                    { bg: "rgba(245,197,67,0.22)", initials: "SK" },
                    { bg: "rgba(245,197,67,0.18)", initials: "RT" },
                    { bg: "rgba(245,197,67,0.22)", initials: "DV" },
                    { bg: "rgba(245,197,67,0.28)", initials: "EN" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full text-[10px] font-semibold text-[#080b11] ${
                        i > 0 ? "-ml-3" : ""
                      }`}
                      style={{
                        width: 36,
                        height: 36,
                        background: a.bg,
                        border: "2px solid rgba(255,255,255,0.08)",
                        zIndex: 10 - i,
                      }}
                    >
                      {a.initials}
                    </div>
                  ))}
                  <div
                    className="-ml-3 flex items-center justify-center rounded-full text-[10px] font-semibold text-[#f5c543] gx-num"
                    style={{
                      width: 36,
                      height: 36,
                      background: "rgba(245,197,67,0.08)",
                      border: "2px solid rgba(245,197,67,0.30)",
                    }}
                  >
                    +12
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5c543]" />
                  <span className="text-xs font-medium text-white/55 gx-num">
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

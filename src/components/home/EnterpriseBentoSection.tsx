import { Cog, Settings2, Workflow, ArrowUpRight } from "lucide-react";

/**
 * Enterprise SaaS Bento Section
 * Plume-aligned minimalist palette (cream / plum / maroon / copper).
 * Reuses .gx-bento system from src/styles/graphic-enhancement.css.
 */
export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      className="relative w-full bg-[#faf7f2] py-20"
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
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#7a2e2a] mb-4"
            style={{ letterSpacing: "0.18em" }}
          >
            Enterprise Platform
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#3d1d3d] mb-4 leading-[1.1]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Everything your team needs, in one place.
          </h2>
          <p
            className="text-base md:text-lg text-[#5a4a5a] mx-auto"
            style={{ maxWidth: "60ch" }}
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
            <h3 className="gx-bento-tile__title" style={{ color: "#3d1d3d" }}>
              Automation
            </h3>
            <p className="gx-bento-tile__body">
              Build workflows once. Run them forever.
            </p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Big spinning gear */}
                <Cog
                  className="gx-gear-spin absolute"
                  size={120}
                  strokeWidth={1.25}
                  color="#3d1d3d"
                  style={{ opacity: 0.85, top: "18%", left: "22%" }}
                />
                {/* Static medium */}
                <Settings2
                  className="absolute"
                  size={56}
                  strokeWidth={1.5}
                  color="#7a2e2a"
                  style={{ opacity: 0.9, top: "12%", right: "18%" }}
                />
                {/* Static small */}
                <Workflow
                  className="absolute"
                  size={44}
                  strokeWidth={1.5}
                  color="#b85a3e"
                  style={{ opacity: 0.95, bottom: "14%", right: "26%" }}
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mt-2"
              style={{
                background: "rgba(122,46,42,0.10)",
                border: "1px solid rgba(122,46,42,0.18)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7a2e2a]" />
              <span className="text-xs font-medium text-[#7a2e2a] gx-num">
                12 active workflows
              </span>
            </div>
          </article>

          {/* Widget 2 — Financial Analytics */}
          <article className="gx-bento-tile gx-bento--tall">
            <p className="gx-bento-tile__eyebrow">Revenue</p>
            <h3 className="gx-bento-tile__title" style={{ color: "#3d1d3d" }}>
              Revenue Analytics
            </h3>
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
                  <linearGradient id="gx-rev-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7a2e2a" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#7a2e2a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* gridlines */}
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="320"
                    y1={y}
                    y2={y}
                    stroke="rgba(90,42,90,0.08)"
                    strokeWidth="1"
                  />
                ))}
                {/* area */}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30 L320,180 L0,180 Z"
                  fill="url(#gx-rev-fill)"
                />
                {/* line */}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30"
                  fill="none"
                  stroke="#3d1d3d"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* points */}
                {[
                  [0, 140],
                  [45, 122],
                  [90, 100],
                  [135, 82],
                  [180, 70],
                  [225, 60],
                  [270, 42],
                  [320, 30],
                ].map(([x, y]) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#faf7f2"
                    stroke="#7a2e2a"
                    strokeWidth="1.75"
                  />
                ))}
              </svg>
            </div>

            <div className="flex items-end justify-between mt-2 gap-3">
              <div>
                <p
                  className="gx-num font-semibold leading-none text-[#3d1d3d]"
                  style={{ fontSize: "2.5rem" }}
                >
                  $1.2M
                </p>
                <p className="text-xs text-[#5a4a5a] mt-1.5 uppercase tracking-wider">
                  Total Revenue
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(122,46,42,0.10)",
                  border: "1px solid rgba(122,46,42,0.18)",
                }}
              >
                <ArrowUpRight size={12} color="#7a2e2a" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-[#7a2e2a] gx-num">
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
                <h3
                  className="gx-bento-tile__title"
                  style={{ color: "#3d1d3d" }}
                >
                  User Management
                </h3>
                <p className="gx-bento-tile__body mt-1">
                  Roles, permissions, and SSO in a single console.
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-[#7a2e2a]"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(122,46,42,0.22)",
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
                    { bg: "#3d1d3d", initials: "AM" },
                    { bg: "#7a2e2a", initials: "JL" },
                    { bg: "#b85a3e", initials: "SK" },
                    { bg: "#5a2a5a", initials: "RT" },
                    { bg: "#a04a3a", initials: "DV" },
                    { bg: "#3d1d3d", initials: "EN" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full text-[10px] font-semibold text-[#faf7f2] ${
                        i > 0 ? "-ml-3" : ""
                      }`}
                      style={{
                        width: 36,
                        height: 36,
                        background: a.bg,
                        border: "2px solid #faf7f2",
                        zIndex: 10 - i,
                      }}
                    >
                      {a.initials}
                    </div>
                  ))}
                  <div
                    className="-ml-3 flex items-center justify-center rounded-full text-[10px] font-semibold text-[#3d1d3d] gx-num"
                    style={{
                      width: 36,
                      height: 36,
                      background: "#faf7f2",
                      border: "2px solid #3d1d3d",
                    }}
                  >
                    +12
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(61,29,61,0.06)",
                    border: "1px solid rgba(61,29,61,0.14)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d1d3d]" />
                  <span className="text-xs font-medium text-[#3d1d3d] gx-num">
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

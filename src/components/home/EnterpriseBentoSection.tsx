import { Cog, Settings2, Workflow, ArrowUpRight } from "lucide-react";

/**
 * Enterprise SaaS Bento Section — Dark Glass Edition
 * Deep dark background with frosted-glass card tiles and orange accents.
 */
export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      className="relative w-full bg-[#070a12] py-20 overflow-hidden"
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

        /* Dark glass card base */
        .ent-tile {
          position: relative;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          padding: 1.75rem;
          overflow: hidden;
          transition: border-color 250ms ease, background 250ms ease;
        }
        .ent-tile:hover {
          background: rgba(255,255,255,0.065);
          border-color: rgba(255,255,255,0.15);
        }
        /* Subtle inner top-edge highlight */
        .ent-tile::before {
          content: "";
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          pointer-events: none;
        }

        /* Bento grid */
        .ent-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 1rem;
        }
        .ent-tile--feature { grid-column: 1; grid-row: 1; }
        .ent-tile--tall    { grid-column: 2; grid-row: 1 / 3; }
        .ent-tile--wide    { grid-column: 1; grid-row: 2; }

        @media (max-width: 640px) {
          .ent-grid { grid-template-columns: 1fr; }
          .ent-tile--feature, .ent-tile--tall, .ent-tile--wide {
            grid-column: 1; grid-row: auto;
          }
        }

        /* Media canvas inside tile */
        .ent-tile__media {
          width: 100%; height: 140px;
          position: relative;
          margin: 1rem 0;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .ent-tile--tall .ent-tile__media { height: 180px; }

        /* Decorative ambient glows */
        .ent-glow-a {
          position: absolute; pointer-events: none;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(217,108,74,0.06) 0%, transparent 70%);
          top: -120px; right: -100px;
        }
        .ent-glow-b {
          position: absolute; pointer-events: none;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%);
          bottom: -80px; left: -80px;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="ent-glow-a" aria-hidden="true" />
      <div className="ent-glow-b" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#d96c4a] mb-4">
            Enterprise Platform
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-white mb-4 leading-[1.1]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Everything your team needs, in one place.
          </h2>
          <p className="text-base md:text-lg text-white/55 mx-auto" style={{ maxWidth: "60ch" }}>
            Modular building blocks for automation, identity, and revenue —
            unified under a single, clean console.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="ent-grid">

          {/* Tile 1 — Automation */}
          <article className="ent-tile ent-tile--feature">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40 mb-1">Workflow Engine</p>
            <h3 className="text-lg font-semibold text-white mb-1">Automation</h3>
            <p className="text-sm text-white/50 leading-relaxed">Build workflows once. Run them forever.</p>

            <div className="ent-tile__media" aria-hidden="true">
              <div className="relative w-full h-full flex items-center justify-center">
                <Cog
                  className="gx-gear-spin absolute"
                  size={100}
                  strokeWidth={1.25}
                  color="rgba(217,108,74,0.7)"
                  style={{ top: "18%", left: "22%" }}
                />
                <Settings2
                  className="absolute"
                  size={48}
                  strokeWidth={1.5}
                  color="rgba(255,255,255,0.35)"
                  style={{ top: "12%", right: "18%" }}
                />
                <Workflow
                  className="absolute"
                  size={38}
                  strokeWidth={1.5}
                  color="rgba(217,108,74,0.45)"
                  style={{ bottom: "14%", right: "26%" }}
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mt-2"
              style={{
                background: "rgba(217,108,74,0.12)",
                border: "1px solid rgba(217,108,74,0.22)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d96c4a]" />
              <span className="text-xs font-medium text-[#e8906e] gx-num">12 active workflows</span>
            </div>
          </article>

          {/* Tile 2 — Revenue Analytics (tall) */}
          <article className="ent-tile ent-tile--tall">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40 mb-1">Revenue</p>
            <h3 className="text-lg font-semibold text-white mb-1">Revenue Analytics</h3>
            <p className="text-sm text-white/50 leading-relaxed">Real-time visibility across every product line.</p>

            <div className="ent-tile__media" aria-hidden="true">
              <svg viewBox="0 0 320 180" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ent-rev-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d96c4a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#d96c4a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" x2="320" y1={y} y2={y}
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                ))}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30 L320,180 L0,180 Z"
                  fill="url(#ent-rev-fill)"
                />
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30"
                  fill="none" stroke="#d96c4a" strokeWidth="2.25"
                  strokeLinecap="round" strokeLinejoin="round"
                />
                {[[0,140],[45,122],[90,100],[135,82],[180,70],[225,60],[270,42],[320,30]].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3"
                    fill="#070a12" stroke="#d96c4a" strokeWidth="1.75" />
                ))}
              </svg>
            </div>

            <div className="flex items-end justify-between mt-2 gap-3">
              <div>
                <p className="gx-num font-semibold leading-none text-white" style={{ fontSize: "2.25rem" }}>
                  $1.2M
                </p>
                <p className="text-xs text-white/40 mt-1.5 uppercase tracking-wider">Total Revenue</p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: "rgba(217,108,74,0.12)", border: "1px solid rgba(217,108,74,0.22)" }}
              >
                <ArrowUpRight size={12} color="#d96c4a" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-[#e8906e] gx-num">18.4% MoM</span>
              </div>
            </div>
          </article>

          {/* Tile 3 — User Management (wide) */}
          <article className="ent-tile ent-tile--wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
              <div className="flex-1 min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40 mb-1">Identity</p>
                <h3 className="text-lg font-semibold text-white mb-1">User Management</h3>
                <p className="text-sm text-white/50 mt-1 leading-relaxed">
                  Roles, permissions, and SSO in a single console.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white/60"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="flex items-center" aria-hidden="true">
                  {[
                    { bg: "rgba(217,108,74,0.8)",  initials: "AM" },
                    { bg: "rgba(255,255,255,0.15)", initials: "JL" },
                    { bg: "rgba(217,108,74,0.5)",   initials: "SK" },
                    { bg: "rgba(255,255,255,0.10)", initials: "RT" },
                    { bg: "rgba(217,108,74,0.35)",  initials: "DV" },
                    { bg: "rgba(255,255,255,0.12)", initials: "EN" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full text-[10px] font-semibold text-white ${i > 0 ? "-ml-3" : ""}`}
                      style={{ width: 36, height: 36, background: a.bg, border: "2px solid rgba(255,255,255,0.1)", zIndex: 10 - i }}
                    >
                      {a.initials}
                    </div>
                  ))}
                  <div
                    className="-ml-3 flex items-center justify-center rounded-full text-[10px] font-semibold text-white/60 gx-num"
                    style={{ width: 36, height: 36, background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.14)" }}
                  >
                    +12
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-white/55 gx-num">2,847 active members</span>
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

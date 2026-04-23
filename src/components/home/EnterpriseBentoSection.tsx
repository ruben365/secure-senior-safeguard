import { Cog, Settings2, Workflow, ArrowUpRight } from "lucide-react";

const GOLD = "#d4a843";
const GOLD_SOFT = "rgba(212,168,67,0.10)";
const GOLD_BORDER = "rgba(212,168,67,0.22)";

export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      className="relative w-full py-20"
      style={{ background: "linear-gradient(135deg, #080608 0%, #0c0814 100%)" }}
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

        /* Dark glass overrides — scoped to #enterprise-bento */
        #enterprise-bento .gx-bento-tile {
          background: rgba(255,255,255,0.055) !important;
          border: 1px solid rgba(255,255,255,0.10) !important;
          backdrop-filter: blur(12px) saturate(1.4) !important;
          -webkit-backdrop-filter: blur(12px) saturate(1.4) !important;
          box-shadow: 0 4px 28px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07) !important;
        }
        #enterprise-bento .gx-bento-tile::after {
          box-shadow: none !important;
        }
        #enterprise-bento .gx-bento-tile:hover {
          border-color: rgba(255,255,255,0.16) !important;
          box-shadow: 0 8px 36px -8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.10) !important;
        }
        #enterprise-bento .gx-bento-tile--accent {
          background: rgba(212,168,67,0.07) !important;
          border-color: ${GOLD_BORDER} !important;
        }
        #enterprise-bento .gx-bento-tile--accent::before {
          background: ${GOLD} !important;
        }
        #enterprise-bento .gx-bento-tile__eyebrow { color: ${GOLD} !important; }
        #enterprise-bento .gx-bento-tile__eyebrow::before { background: ${GOLD} !important; }
        #enterprise-bento .gx-bento-tile__title { color: #ffffff !important; }
        #enterprise-bento .gx-bento-tile__body { color: rgba(255,255,255,0.60) !important; }
        #enterprise-bento .gx-bento-tile__media { background: rgba(255,255,255,0.03) !important; }

        @media (max-width: 639px) {
          #enterprise-bento .gx-bento--feature { min-height: 240px !important; }
        }
      `}</style>

      <div id="enterprise-bento" className="max-w-6xl mx-auto px-4 sm:px-6">
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

          {/* Card 1 — Automation */}
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
                  style={{ opacity: 0.65, top: "18%", left: "22%" }}
                />
                <Settings2
                  className="absolute"
                  size={56}
                  strokeWidth={1.5}
                  color={GOLD}
                  style={{ opacity: 0.45, top: "12%", right: "18%" }}
                />
                <Workflow
                  className="absolute"
                  size={44}
                  strokeWidth={1.5}
                  color={GOLD}
                  style={{ opacity: 0.60, bottom: "14%", right: "26%" }}
                />
              </div>
            </div>

            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mt-2"
              style={{ background: GOLD_SOFT, border: `1px solid ${GOLD_BORDER}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
              <span className="text-xs font-medium gx-num" style={{ color: GOLD }}>
                12 active workflows
              </span>
            </div>
          </article>

          {/* Card 2 — Revenue Analytics */}
          <article className="gx-bento-tile gx-bento--tall">
            <p className="gx-bento-tile__eyebrow">Revenue</p>
            <h3 className="gx-bento-tile__title">Revenue Analytics</h3>
            <p className="gx-bento-tile__body">Real-time visibility across every product line.</p>

            <div className="gx-bento-tile__media" aria-hidden="true">
              <svg viewBox="0 0 320 180" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ent-rev-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                ))}
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30 L320,180 L0,180 Z"
                  fill="url(#ent-rev-fill)"
                />
                <path
                  d="M0,140 C40,120 60,130 80,100 C110,70 130,90 160,75 C190,60 210,80 240,55 C270,35 290,45 320,30"
                  fill="none" stroke={GOLD} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"
                />
                {[[0,140],[45,122],[90,100],[135,82],[180,70],[225,60],[270,42],[320,30]].map(([x,y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#0c0814" stroke={GOLD} strokeWidth="1.75" />
                ))}
              </svg>
            </div>

            <div className="flex items-end justify-between mt-2 gap-3">
              <div>
                <p className="gx-num font-semibold leading-none text-white" style={{ fontSize: "2.5rem" }}>$1.2M</p>
                <p className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.48)" }}>
                  Total Revenue
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{ background: GOLD_SOFT, border: `1px solid ${GOLD_BORDER}` }}
              >
                <ArrowUpRight size={12} color={GOLD} strokeWidth={2.5} />
                <span className="text-xs font-semibold gx-num" style={{ color: GOLD }}>18.4% MoM</span>
              </div>
            </div>
          </article>

          {/* Card 3 — User Management */}
          <article className="gx-bento-tile gx-bento--wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
              <div className="flex-1 min-w-0">
                <p className="gx-bento-tile__eyebrow">Identity</p>
                <h3 className="gx-bento-tile__title">User Management</h3>
                <p className="gx-bento-tile__body mt-1">Roles, permissions, and SSO in a single console.</p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {["Admin", "Editor", "Viewer"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ color: GOLD, background: "transparent", border: `1px solid ${GOLD_BORDER}` }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="flex items-center" aria-hidden="true">
                  {[
                    { bg: "#1a1225", initials: "AM" },
                    { bg: "#1e1020", initials: "JL" },
                    { bg: "#221418", initials: "SK" },
                    { bg: "#181520", initials: "RT" },
                    { bg: "#1a1018", initials: "DV" },
                    { bg: "#16121e", initials: "EN" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full text-[10px] font-semibold text-white/70 ${i > 0 ? "-ml-3" : ""}`}
                      style={{ width: 36, height: 36, background: a.bg, border: `2px solid rgba(212,168,67,0.25)`, zIndex: 10 - i }}
                    >
                      {a.initials}
                    </div>
                  ))}
                  <div
                    className="-ml-3 flex items-center justify-center rounded-full text-[10px] font-semibold gx-num"
                    style={{ width: 36, height: 36, background: GOLD_SOFT, border: `2px solid ${GOLD_BORDER}`, color: GOLD }}
                  >
                    +12
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: GOLD_SOFT, border: `1px solid ${GOLD_BORDER}` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
                  <span className="text-xs font-medium gx-num" style={{ color: GOLD }}>2,847 active members</span>
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

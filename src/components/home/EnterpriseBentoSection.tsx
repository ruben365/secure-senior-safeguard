import { Workflow, TrendingUp, Users, ArrowUpRight } from "lucide-react";

export const EnterpriseBentoSection = () => {
  return (
    <section
      aria-label="Enterprise platform features"
      style={{ background: "linear-gradient(180deg,#05101e 0%,#08162a 100%)" }}
      className="relative w-full py-20 overflow-hidden"
    >
      {/* Subtle radial glow behind the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%,rgba(245,197,67,0.06) 0%,transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Header ── */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p
            className="inline-block text-[0.68rem] font-semibold uppercase mb-4 tracking-[0.2em]"
            style={{ color: "#f5c543" }}
          >
            Enterprise Platform
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white mb-4 leading-[1.1]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Everything your team needs, in one place.
          </h2>
          <p className="text-base md:text-lg text-white/55 mx-auto" style={{ maxWidth: "60ch" }}>
            Modular building blocks for automation, identity, and revenue —
            unified under a single, clean console.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card 1 — Workflow Engine */}
          <div
            className="p-7 flex flex-col gap-5 rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(245,197,67,0.12)",
                border: "1px solid rgba(245,197,67,0.22)",
              }}
            >
              <Workflow className="w-5 h-5" style={{ color: "#f5c543" }} />
            </div>

            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1">
                Workflow Engine
              </p>
              <h3 className="text-xl font-bold tracking-tight text-white">Automation</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">
                Build workflows once. Run them forever.
              </p>
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(245,197,67,0.08)",
                border: "1px solid rgba(245,197,67,0.20)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#f5c543" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "#f5c543", fontVariantNumeric: "tabular-nums" }}
              >
                12 active workflows
              </span>
            </div>
          </div>

          {/* Card 2 — Revenue Analytics */}
          <div
            className="p-7 flex flex-col gap-5 rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(245,197,67,0.12)",
                border: "1px solid rgba(245,197,67,0.22)",
              }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "#f5c543" }} />
            </div>

            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1">
                Revenue
              </p>
              <h3 className="text-xl font-bold tracking-tight text-white">Revenue Analytics</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">
                Real-time visibility across every product line.
              </p>
            </div>

            {/* Mini gold area chart */}
            <div className="relative h-24 w-full" aria-hidden="true">
              <svg viewBox="0 0 320 96" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="ent-gold-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5c543" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#f5c543" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[24, 48, 72].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="320"
                    y1={y}
                    y2={y}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M0,80 C40,66 60,72 80,54 C110,36 130,50 160,38 C190,26 210,42 240,22 C270,8 290,16 320,6 L320,96 L0,96 Z"
                  fill="url(#ent-gold-fill)"
                />
                <path
                  d="M0,80 C40,66 60,72 80,54 C110,36 130,50 160,38 C190,26 210,42 240,22 C270,8 290,16 320,6"
                  fill="none"
                  stroke="#f5c543"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-end justify-between gap-3 mt-auto">
              <div>
                <p
                  className="font-bold leading-none text-white"
                  style={{ fontSize: "2rem", fontVariantNumeric: "tabular-nums" }}
                >
                  $1.2M
                </p>
                <p className="text-xs text-white/35 mt-1.5 uppercase tracking-wider">
                  Total Revenue
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background: "rgba(245,197,67,0.10)",
                  border: "1px solid rgba(245,197,67,0.24)",
                }}
              >
                <ArrowUpRight className="w-3 h-3 flex-shrink-0" style={{ color: "#f5c543" }} strokeWidth={2.5} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#f5c543", fontVariantNumeric: "tabular-nums" }}
                >
                  18.4% MoM
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 — User Management — full width */}
          <div
            className="md:col-span-2 p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-2xl transition-transform duration-300 hover:scale-[1.02] cursor-default"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="flex-1 min-w-0">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: "rgba(245,197,67,0.12)",
                  border: "1px solid rgba(245,197,67,0.22)",
                }}
              >
                <Users className="w-5 h-5" style={{ color: "#f5c543" }} />
              </div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1">
                Identity
              </p>
              <h3 className="text-xl font-bold tracking-tight text-white">User Management</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">
                Roles, permissions, and SSO in a single console.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {["Admin", "Editor", "Viewer"].map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      color: "rgba(255,255,255,0.70)",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
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
                  { color: "#f5c543", initials: "AM" },
                  { color: "#e07b52", initials: "JL" },
                  { color: "#60a5fa", initials: "SK" },
                  { color: "#a78bfa", initials: "RT" },
                  { color: "#34d399", initials: "DV" },
                  { color: "#f87171", initials: "EN" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center rounded-full text-[10px] font-bold text-black select-none ${i > 0 ? "-ml-2.5" : ""}`}
                    style={{
                      width: 34,
                      height: 34,
                      background: a.color,
                      border: "2px solid #08162a",
                      zIndex: 10 - i,
                    }}
                  >
                    {a.initials}
                  </div>
                ))}
                <div
                  className="-ml-2.5 flex items-center justify-center rounded-full text-[10px] font-bold select-none"
                  style={{
                    width: 34,
                    height: 34,
                    background: "rgba(255,255,255,0.08)",
                    border: "2px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.65)",
                    zIndex: 3,
                  }}
                >
                  +12
                </div>
              </div>

              {/* Members badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(245,197,67,0.08)",
                  border: "1px solid rgba(245,197,67,0.20)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#f5c543" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "#f5c543", fontVariantNumeric: "tabular-nums" }}
                >
                  2,847 active members
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseBentoSection;

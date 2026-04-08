import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  LineChart,
  Eye,
  Fingerprint,
} from "lucide-react";

/**
 * HomePremiumMiddle
 * ─────────────────
 * A texturally rich middle section for the homepage.
 *
 * Composition:
 *   1. Two reverse-offset text/image pairs with soft gradient shapes
 *   2. A 2x2 grid of floated cards on a lavender-tinted ambient glow
 *
 * Design rules (the "mofo/ombre" aesthetic):
 *   — no sharp white cards on flat backgrounds
 *   — every card floats via soft drop-shadows + monochromatic washes
 *   — heavily blurred abstract shapes sit behind the grid
 *   — indigo/violet palette, line-art icons only
 *
 * Hero and Footer are NOT touched.
 */

// ─── 2x2 grid content ─────────────────────────────────────────
const gridItems = [
  {
    icon: LineChart,
    eyebrow: "Audit forecast",
    title: "Know your risk before it becomes a bill.",
    body:
      "We model your exposure across email, devices, and accounts — then forecast the scam patterns most likely to reach you next month.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Securing",
    title: "Always-on defense, never in the way.",
    body:
      "Quiet background monitoring stops threats before they become notifications. You live your life, we watch the perimeter.",
  },
  {
    icon: Eye,
    eyebrow: "Observing",
    title: "Eyes on the corners you can't see.",
    body:
      "Dark-web sweeps and credential leak alerts so a breach somewhere else never becomes a crisis at your house.",
  },
  {
    icon: Fingerprint,
    eyebrow: "Verifying",
    title: "Deepfakes, caught in the act.",
    body:
      "Voice clones, AI calls, and impersonation attempts get flagged in real time — before you hand over a single dollar.",
  },
];

export function HomePremiumMiddle() {
  return (
    <section
      aria-label="Why families and businesses choose us"
      className="relative isolate overflow-hidden"
    >
      {/* ═════════════════════════════════════════════════════════
          AMBIENT DEPTH LAYER — heavily blurred abstract shapes
          sit behind every surface in this section, making cards
          appear to float rather than stick.
          ═════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Giant lavender glow, top-left */}
        <div className="absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-indigo-500/15 blur-[140px]" />
        {/* Violet glow, center-right */}
        <div className="absolute top-1/3 -right-40 h-[620px] w-[620px] rounded-full bg-violet-500/12 blur-[160px]" />
        {/* Soft purple glow, bottom-center */}
        <div className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-24 md:py-28">

        {/* ═══════════════════════════════════════════════════════
            SECTION 1 — REVERSE-OFFSET TEXT + SHAPE PAIRS
            ═══════════════════════════════════════════════════ */}
        <div className="space-y-20 md:space-y-28 mb-24 md:mb-28">

          {/* ─── Sub-section A: text left, gradient shape right ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/70 border border-indigo-200/60 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                The forecast
              </span>
              <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold text-slate-900 leading-[1.08] tracking-tight mb-5">
                Why it encourages{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  forecasting
                </span>{" "}
                instead of reacting.
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
                Most security shows up after the damage is done. Ours watches
                the direction scams are moving and steps between your family
                and the next wave — so the story never starts.
              </p>
            </div>

            {/* Soft, glowing gradient asset — pure CSS wavy-shape */}
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative aspect-[5/4] w-full">
                {/* Outer blurred halo */}
                <div className="absolute inset-[8%] rounded-[40%_60%_55%_45%/50%_40%_60%_50%] bg-gradient-to-br from-indigo-400/35 via-violet-500/30 to-purple-500/25 blur-3xl" />
                {/* Mid ombré shape */}
                <div className="absolute inset-[14%] rounded-[55%_45%_60%_40%/45%_55%_45%_55%] bg-gradient-to-br from-indigo-300/50 via-violet-400/40 to-purple-400/35 blur-2xl" />
                {/* Inner crisp-ish shape with inner border */}
                <div className="absolute inset-[22%] rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-gradient-to-br from-white/70 via-indigo-50/60 to-violet-100/50 border border-white/60 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)]" />
                {/* Wavy accent line — decorative stroke */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 500 400"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 60 220 Q 160 140 250 210 T 440 200"
                    stroke="url(#wave-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 60 250 Q 160 170 250 240 T 440 230"
                    stroke="url(#wave-gradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M 60 280 Q 160 200 250 270 T 440 260"
                    stroke="url(#wave-gradient)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ─── Sub-section B: shape left, text right (+ CTA) ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Shape — mirrored composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[5/4] w-full">
                <div className="absolute inset-[8%] rounded-[60%_40%_45%_55%/40%_60%_40%_60%] bg-gradient-to-tr from-purple-500/30 via-violet-500/30 to-indigo-400/35 blur-3xl" />
                <div className="absolute inset-[14%] rounded-[45%_55%_40%_60%/60%_40%_60%_40%] bg-gradient-to-tr from-purple-300/40 via-violet-300/45 to-indigo-300/50 blur-2xl" />
                <div className="absolute inset-[22%] rounded-[50%_50%_55%_45%/40%_60%_40%_60%] bg-gradient-to-tr from-violet-50/60 via-indigo-50/70 to-white/70 border border-white/60 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(139,92,246,0.35)]" />
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 500 400"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="wave-gradient-2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <circle cx="250" cy="200" r="2" fill="#8b5cf6" opacity="0.7" />
                  <circle cx="180" cy="150" r="1.5" fill="#a855f7" opacity="0.55" />
                  <circle cx="320" cy="240" r="1.5" fill="#6366f1" opacity="0.55" />
                  <circle cx="350" cy="160" r="1" fill="#a855f7" opacity="0.4" />
                  <circle cx="150" cy="240" r="1" fill="#6366f1" opacity="0.4" />
                  <path
                    d="M 70 180 Q 200 100 330 200 T 450 180"
                    stroke="url(#wave-gradient-2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="0 6"
                  />
                  <path
                    d="M 70 230 Q 200 150 330 250 T 450 230"
                    stroke="url(#wave-gradient-2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100/70 border border-violet-200/60 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-700 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                Tailored coverage
              </span>
              <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold text-slate-900 leading-[1.08] tracking-tight mb-5">
                See what you need —{" "}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  nothing you don&rsquo;t.
                </span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mb-7">
                Tell us about your household or your business and we&rsquo;ll
                put together the exact set of protections, workshops, and alerts
                that fit. No checkbox bloat, no upsells you&rsquo;ll never use.
              </p>
              <Link
                to="/training"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-bold tracking-wide shadow-[0_10px_30px_-6px_rgba(99,102,241,0.45)] hover:shadow-[0_16px_40px_-6px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 transition-all duration-300"
              >
                See your plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — 2×2 FLOATING GRID
            ═══════════════════════════════════════════════════ */}
        <div className="relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/70 border border-indigo-200/60 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Four pillars
            </span>
            <h2 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-slate-900 leading-[1.05] tracking-tight">
              Quiet power,{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                everywhere it matters.
              </span>
            </h2>
          </div>

          {/* The floating grid container */}
          <div className="relative">
            {/* Ambient blue-purple glow behind the entire grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 pointer-events-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-indigo-600/10 blur-[100px]" />
              <div className="absolute top-1/3 left-1/4 w-[40%] h-[40%] rounded-full bg-violet-500/12 blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
            </div>

            {/* 2x2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {gridItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.eyebrow}
                    className="group relative rounded-3xl bg-indigo-50/30 backdrop-blur-xl border border-white/60 p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(99,102,241,0.25),0_4px_20px_-4px_rgba(139,92,246,0.12)] hover:shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35),0_8px_28px_-4px_rgba(139,92,246,0.18)] hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Inner tint wash */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-indigo-50/30 to-violet-50/40 pointer-events-none"
                    />

                    {/* Subtle inner top highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
                    />

                    <div className="relative z-10">
                      {/* Line-art icon in an indigo-tinted glass tile */}
                      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/12 via-violet-500/10 to-purple-500/8 border border-indigo-300/30 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                        <div className="absolute inset-0 rounded-2xl bg-white/40" />
                        <Icon
                          className="relative w-6 h-6 text-indigo-600 group-hover:text-violet-600 transition-colors duration-300"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 mb-2">
                        {item.eyebrow}
                      </div>
                      <h3 className="text-xl md:text-[1.375rem] font-bold text-slate-900 leading-[1.2] tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-[0.9375rem] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePremiumMiddle;

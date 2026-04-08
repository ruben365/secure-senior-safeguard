import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Shield,
  Bot,
  GraduationCap,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";

/**
 * HomeIntroSection
 * ────────────────
 * Introduction block that lives between the hero and the rest of the
 * homepage story. Sole purpose: announce what the business does.
 *
 * Layout rules (matches the nav / hero / footer plumb line):
 *   container mx-auto px-6 lg:px-8    // baked into tailwind.config.ts
 *
 * Design:
 *   - Larger, readable body text (text-base / text-lg)
 *   - Glass-morphism cards with backdrop-blur + border-white/60
 *   - Icons sit in the top-left corner of each card, aligned with the
 *     card's inner padding — they DON'T float centered in the column.
 *   - Soft dual-layered drop shadows (outer + inner warm glow) make
 *     each card float off the page.
 *   - Decorative blurred shape cluster in the background (no raster
 *     assets, pure CSS) sets the ambient depth.
 *   - IntersectionObserver fade-in on scroll so cards reveal gracefully.
 *
 * Hero and Footer are NOT touched. Drops into Index.tsx directly
 * under the hero section.
 */

const pillars = [
  {
    icon: Shield,
    eyebrow: "Protection",
    title: "We stop AI scams before they reach your family.",
    body:
      "Deepfakes, voice clones, and impersonation calls get flagged in real time — so the only thing you notice is that nothing bad happens.",
    cta: { label: "How it works", to: "/training" },
    accent: "from-[#f97316] to-[#fb923c]",
    glow: "rgba(249,115,22,0.35)",
  },
  {
    icon: Bot,
    eyebrow: "AI Services",
    title: "Small-business AI, built by people who pick up the phone.",
    body:
      "AI receptionists, workflow automation, and customer engagement tools — scoped to your local shop, deployed in days, supported for life.",
    cta: { label: "See services", to: "/business" },
    accent: "from-teal-600 to-indigo-600",
    glow: "rgba(13,148,136,0.35)",
  },
  {
    icon: GraduationCap,
    eyebrow: "Education",
    title: "Workshops that actually stick, for real non-technical people.",
    body:
      "Hands-on training for seniors, families, and teams — no jargon, no shame, just practical skills that turn panic into confidence.",
    cta: { label: "Browse workshops", to: "/training" },
    accent: "from-violet-600 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
  },
  {
    icon: HeadphonesIcon,
    eyebrow: "Ongoing Support",
    title: "Real humans, Kettering-based, on call when it matters.",
    body:
      "Monitoring runs 24/7, updates happen silently, and when something does go wrong you reach a person who already knows your setup.",
    cta: { label: "Get help", to: "/contact" },
    accent: "from-indigo-600 to-violet-600",
    glow: "rgba(99,102,241,0.35)",
  },
];

export function HomeIntroSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Fade / slide reveal on scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-hi-reveal]");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("hi-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hi-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="home-intro-heading"
      className="relative isolate py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Reveal + glass styles scoped to this component */}
      <style>{`
        [data-hi-reveal] {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--hi-delay, 0ms);
          will-change: opacity, transform;
        }
        [data-hi-reveal].hi-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hi-glass {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(255, 255, 255, 0.55) 100%
          );
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 1) inset,
            0 24px 60px -20px rgba(15, 23, 42, 0.18),
            0 4px 16px -4px rgba(15, 23, 42, 0.08);
          transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hi-glass:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 0 0 rgba(255, 255, 255, 1) inset,
            0 36px 80px -20px rgba(15, 23, 42, 0.25),
            0 8px 24px -4px rgba(15, 23, 42, 0.12);
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          AMBIENT BACKDROP — decorative blurred shapes behind content
          ═══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Warm top-left blob — brand orange */}
        <div className="absolute -top-32 -left-40 h-[560px] w-[560px] rounded-full bg-[#f97316]/18 blur-[140px]" />
        {/* Teal mid-right blob */}
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-teal-500/15 blur-[150px]" />
        {/* Violet bottom blob */}
        <div className="absolute -bottom-40 left-1/3 h-[480px] w-[480px] rounded-full bg-violet-500/15 blur-[150px]" />
        {/* Subtle dot grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hi-dot"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#0f172a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hi-dot)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT — container aligned with nav / hero / footer plumb line
          ═══════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 lg:px-8">
        {/* ── Header row ─────────────────────────────────────── */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div
            data-hi-reveal
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/70 shadow-sm mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700">
              What we do
            </span>
          </div>

          <h2
            id="home-intro-heading"
            data-hi-reveal
            style={{ "--hi-delay": "80ms" } as React.CSSProperties}
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.05] text-slate-900 mb-5"
          >
            A calmer, safer digital life —{" "}
            <span className="bg-gradient-to-r from-[#f97316] via-[#ea580c] to-teal-700 bg-clip-text text-transparent">
              built around your household or business.
            </span>
          </h2>

          <p
            data-hi-reveal
            style={{ "--hi-delay": "160ms" } as React.CSSProperties}
            className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            InVision Network is a Kettering-based team of security analysts,
            educators, and builders. We stop AI scams before they reach your
            family, we set up AI tools that save small businesses real hours,
            and we teach people — patiently — how to recognize what used to be
            invisible.
          </p>
        </div>

        {/* ── Pillar grid — 2×2 glass cards ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                data-hi-reveal
                style={
                  {
                    "--hi-delay": `${240 + i * 90}ms`,
                  } as React.CSSProperties
                }
                className="hi-glass group relative rounded-3xl p-7 md:p-9 overflow-hidden"
              >
                {/* Per-card tinted glow — sits behind content on hover */}
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                  style={{ background: p.glow }}
                />

                {/* Top hairline highlight */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                />

                <div className="relative flex items-start gap-5">
                  {/* LEFT-ALIGNED ICON TILE (never centered) */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-[0_12px_28px_-10px_rgba(15,23,42,0.35),inset_0_1px_0_0_rgba(255,255,255,0.45)] border border-white/40`}
                  >
                    <Icon
                      className="w-6 h-6 text-white"
                      strokeWidth={1.85}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">
                      {p.eyebrow}
                    </div>
                    <h3 className="text-[1.375rem] md:text-[1.5rem] font-bold text-slate-900 leading-[1.2] tracking-tight mb-3">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed mb-5">
                      {p.body}
                    </p>
                    <Link
                      to={p.cta.to}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-[#f97316] transition-colors"
                    >
                      {p.cta.label}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Footer row — soft stats strip ──────────────────── */}
        <div
          data-hi-reveal
          style={{ "--hi-delay": "680ms" } as React.CSSProperties}
          className="hi-glass mt-10 md:mt-14 rounded-3xl px-7 md:px-9 py-6 md:py-7"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {[
              { v: "100+", l: "Families protected" },
              { v: "24/7", l: "Monitoring" },
              { v: "< 1 hr", l: "Support response" },
              { v: "Kettering", l: "Based in Ohio" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col">
                <div className="text-2xl md:text-[1.75rem] font-black text-slate-900 leading-none tabular-nums mb-1.5">
                  {s.v}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeIntroSection;

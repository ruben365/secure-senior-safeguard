import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  Bot,
  Eye,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Check,
  Search,
  Lock,
  HeartPulse,
  Zap,
  Activity,
} from "lucide-react";
import businessTeam from "@/assets/business-team-meeting-natural.jpg";
import familyLiving from "@/assets/family-living-room-natural.jpg";
import communityWorkshop from "@/assets/community-workshop-real.jpg";
import consultingTeam from "@/assets/consulting-team-strategy.jpg";
import protectionWorkshop from "@/assets/protection-training-workshop.jpg";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";
import "./HomeStorySections.css";

/* ─── CTA pills ──────────────────────────────────────────────────── */
function CtaPrimary({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="hss-cta-primary inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-semibold [transition-duration:250ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(249,115,22,0.7)]"
    >
      {children}
    </Link>
  );
}

function CtaText({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-[#d96c4a] hover:text-[#b8552f] font-semibold text-[15px] group transition-colors"
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* ─── Animated counter ───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* ─── Stat tile — dark bento variant ─────────────────────────────── */
type StatProps = {
  target: number;
  suffix: string;
  label: string;
  icon: typeof Shield;
  description: string;
  live?: boolean;
};

function StatTile({
  target,
  suffix,
  label,
  icon: Icon,
  description,
  live,
  index = 0,
}: StatProps & { index?: number }) {
  const { value, ref } = useCountUp(target);
  return (
    <div
      ref={ref}
      data-reveal="scale"
      style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}
      className="hss-stats-tile"
    >
      {live && (
        <div className="hss-live-badge">
          <span className="hss-live-dot" />
          LIVE
        </div>
      )}
      <div className="hss-stats-tile-icon">
        <Icon className="w-5 h-5 text-[#d96c4a]" strokeWidth={2.25} />
      </div>
      <div className="text-[2.75rem] md:text-[3.25rem] font-bold text-white leading-none tracking-tight tabular-nums mb-2">
        {value.toLocaleString()}
        <span className="text-[#d96c4a]">{suffix}</span>
      </div>
      <div className="text-[14px] font-bold text-white/80 mb-1.5">{label}</div>
      <p className="text-[12px] text-white/45 leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const stats: StatProps[] = [
  {
    target: 100,
    suffix: "+",
    label: "Families Protected",
    icon: Users,
    description: "Across Ohio, every household covered end-to-end.",
  },
  {
    target: 99,
    suffix: "%",
    label: "Detection Rate",
    icon: Zap,
    description: "Scams flagged before they reach the inbox or phone.",
    live: true,
  },
  {
    target: 24,
    suffix: "/7",
    label: "Expert Support",
    icon: HeartPulse,
    description: "Real human analysts on standby every hour, every day.",
  },
  {
    target: 10,
    suffix: "%",
    label: "Veteran Discount",
    icon: Award,
    description: "Lifetime discount for veterans and their families.",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: Search,
    title: "We assess your risk",
    desc: "A quick conversation maps the people, accounts, and devices that need protecting — and where the gaps are.",
  },
  {
    step: "02",
    icon: Lock,
    title: "We deploy the defenses",
    desc: "Same-day setup of monitoring, screening, alerts, and family safe-words. No wait, no contracts, no jargon.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "We watch your back 24/7",
    desc: "Real analysts review every alert. If something slips through, we recover and reimburse — fully covered.",
  },
];

const featureList = [
  {
    icon: Clock,
    label: "Always-on monitoring",
    desc: "24/7 threat detection across calls, texts, and email — flagged the moment something looks wrong.",
  },
  {
    icon: Award,
    label: "Real human investigators",
    desc: "Every alert is reviewed by a security analyst — never just a black-box AI guess.",
  },
  {
    icon: Users,
    label: "Family-first plans",
    desc: "Coverage that scales from a single account to your whole household, including elders.",
  },
];

const ctaChecks = [
  "Same-day setup with no contracts",
  "10% lifetime veteran discount",
  "30-day money-back guarantee",
  "Free re-training for new family members",
  "Real human support, every hour of every day",
];

/* ─── Scroll reveal observer ─────────────────────────────────────
   Auto-reveals any element with [data-reveal] when it scrolls into view.
   Supports [data-reveal="fade|scale|slide-left|slide-right|zoom"] and
   --reveal-delay CSS custom property (or inline style) for stagger. */
function useRevealObserver() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    // Respect reduced motion — skip observer, instantly mark visible
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

export const HomeStorySections = () => {
  const rootRef = useRevealObserver();

  return (
    <div ref={rootRef} className="hss-root">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — White bg | 60/40 text + image split
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-12 md:py-20 lg:py-24"
        aria-labelledby="story-section-1-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left column — 60% */}
            <div className="md:col-span-7 max-w-[620px]">
              <span data-reveal className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Built for real families
              </span>

              <h2
                id="story-section-1-heading"
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold tracking-tight text-[#1E293B] leading-[1.1] mb-5 mt-4"
              >
                AI scams move fast. Your protection moves faster.
              </h2>

              <p
                data-reveal
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-[560px]"
              >
                Our team builds the same enterprise-grade defenses used by
                Fortune 500 companies and brings them to families and small
                businesses across Ohio. Every layer is engineered to stop scams
                before they reach you.
              </p>

              <div
                data-reveal
                style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                className="flex flex-wrap items-center gap-5 mb-8"
              >
                <CtaPrimary to="/training#pricing">
                  Get Protected
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
                <CtaText to="/about">How we started</CtaText>
              </div>

              {/* Social proof strip */}
              <div
                data-reveal
                style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
                className="flex items-center gap-3"
              >
                <div className="hss-avatar-stack">
                  <img src={instructorPriya} alt="Protected family member" width={32} height={32} className="w-8 h-8 object-cover rounded-full" loading="lazy" decoding="async" />
                  <img src={instructorJames} alt="Protected family member" width={32} height={32} className="w-8 h-8 object-cover rounded-full" loading="lazy" decoding="async" />
                  <img src={instructorSarah} alt="Protected family member" width={32} height={32} className="w-8 h-8 object-cover rounded-full" loading="lazy" decoding="async" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 fill-[#d96c4a]" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-[12px] text-[#6B7280]"><span className="font-bold text-[#1E293B]">100+ families</span> protected across Ohio</p>
                </div>
              </div>
            </div>

            {/* Right column — 40% — image with floating data card */}
            <div
              data-reveal="slide-right"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="md:col-span-5"
            >
              <div className="relative rounded-xl overflow-visible">
                <div
                  data-reveal="fade"
                  className="hss-img-zoom rounded-xl overflow-hidden shadow-[0_18px_44px_-16px_rgba(15,23,42,0.22)] aspect-[4/5] lg:aspect-[5/6]"
                >
                  <img
                    src={businessTeam}
                    alt="The InVision Network security operations team at work"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={1500}
                  />
                  {/* Live operations badge */}
                  <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/72 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.7)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white">Live Operations</span>
                  </div>
                </div>

                {/* Floating threat detection card — top-right */}
                <div
                  data-reveal="scale"
                  style={{ "--reveal-delay": "500ms" } as React.CSSProperties}
                  className="hss-float-card absolute -top-4 -right-4 p-3.5 min-w-[168px] hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#d96c4a]/12 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-3.5 h-3.5 text-[#d96c4a]" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6B7280]">Threat Intel</span>
                  </div>
                  <div className="text-[1.5rem] font-bold text-[#1E293B] leading-none tabular-nums mb-1">
                    347 <span className="text-[#d96c4a]">blocked</span>
                  </div>
                  <p className="text-[10px] text-[#6B7280]">scams stopped this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS STRIP — DARK BENTO
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-stats-bento py-12 md:py-20 lg:py-24"
        aria-labelledby="story-stats-heading"
      >
        {/* Ambient glows */}
        <div aria-hidden="true" className="hss-stats-glow-left" />
        <div aria-hidden="true" className="hss-stats-glow-right" />

        <div className="relative z-10 container mx-auto">
          <h2 id="story-stats-heading" className="sr-only">By the numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {stats.map((stat, i) => (
              <StatTile key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — Cream bg | 45/55 wide image + stacked cards
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint relative py-12 md:py-20 lg:py-24"
        aria-labelledby="story-section-2-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-stretch">

            {/* Left — 45%: tall image with overlay caption */}
            <div
              data-reveal="slide-left"
              className="hss-img-zoom relative rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-[560px] shadow-[0_18px_44px_-16px_rgba(15,23,42,0.22)]"
            >
              <img
                src={familyLiving}
                alt="A protected family at home"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1000}
                height={1400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.90)] via-[rgba(15,23,42,0.45)] to-[rgba(15,23,42,0.08)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/14 backdrop-blur-md border border-white/25 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2dd4bf]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white">Family-First</span>
                </span>
                <h3
                  id="story-section-2-heading"
                  className="text-3xl lg:text-[2.25rem] font-bold text-white leading-[1.1] tracking-tight mb-3"
                >
                  Peace of mind that
                  <br />
                  works while you sleep.
                </h3>
                <p className="text-white/85 text-base leading-relaxed max-w-md">
                  Active monitoring, deepfake detection, and instant alerts —
                  so the only thing you have to think about is your family.
                </p>
              </div>
            </div>

            {/* Right — 55%: two stacked content cards */}
            <div className="flex flex-col gap-8">
              {/* Top card */}
              <div
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                className="bg-white rounded-2xl p-7 lg:p-9 shadow-sm border border-[#1E293B]/8"
              >
                <h3 className="text-[1.5rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-3">
                  One platform. Every layer of protection.
                </h3>
                <p className="text-[#6B7280] text-base leading-relaxed mb-6 max-w-[560px]">
                  From personal training and live workshops to enterprise
                  security audits and 24/7 monitoring — we built the toolkit so
                  your only job is to live your life.
                </p>
                <CtaPrimary to="/training">
                  Explore Protection Plans
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
              </div>

              {/* Bottom — two feature boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Dark card — threats */}
                <div
                  data-reveal="scale"
                  style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
                  className="hss-dark-card relative rounded-xl p-6 overflow-hidden"
                >
                  <div aria-hidden="true" className="hss-dark-card-glow" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#d96c4a]/20 border border-[#d96c4a]/30 flex items-center justify-center mb-4">
                      <Bot className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
                    </div>
                    <h4 className="text-[1.05rem] font-bold text-white leading-tight mb-2">
                      Threats neutralized before they land
                    </h4>
                    <p className="text-white/55 text-[0.875rem] leading-relaxed">
                      Inbound calls, texts, and emails screened by AI trained on the latest scam patterns.
                    </p>
                  </div>
                </div>

                {/* Light card — identity */}
                <div
                  data-reveal="scale"
                  style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#1E293B]/8"
                >
                  <div className="w-10 h-10 rounded-full bg-[#d96c4a]/12 flex items-center justify-center mb-4">
                    <Eye className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
                  </div>
                  <h4 className="text-[1.05rem] font-bold text-[#1E293B] leading-tight mb-2">
                    Continuous identity monitoring
                  </h4>
                  <p className="text-[#6B7280] text-[0.875rem] leading-relaxed">
                    We watch the dark web for your credentials so a leak doesn't become a crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — White bg | 50/50 feature list + cards
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-12 md:py-20 lg:py-24"
        aria-labelledby="story-section-3-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">

            {/* Left — feature list with timeline */}
            <div>
              <span data-reveal className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Why families trust us
              </span>

              <h2
                id="story-section-3-heading"
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="text-[2rem] lg:text-[2.25rem] font-bold text-[#1E293B] tracking-tight leading-[1.1] mb-4 mt-4"
              >
                Protection backed by real investigation.
              </h2>

              <p
                data-reveal
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-[560px]"
              >
                Every alert we send is a real human looking at real evidence.
                No black box, no false alarms — just security analysts who
                treat your case like it's the only one they have.
              </p>

              {/* Feature list with vertical timeline line */}
              <ul className="hss-feature-list divide-y divide-[#1E293B]/8">
                {featureList.map((item, i) => (
                  <li
                    key={item.label}
                    data-reveal="slide-right"
                    style={{ "--reveal-delay": `${240 + i * 100}ms` } as React.CSSProperties}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#d96c4a]/12 flex items-center justify-center flex-shrink-0 relative z-10">
                        <item.icon className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-[#1E293B] leading-tight mb-1">{item.label}</h4>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[520px]">{item.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — editorial quote + image card */}
            <div className="flex flex-col gap-6">
              {/* Quote card — editorial with left orange border */}
              <div
                data-reveal="slide-left"
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                className="bg-[#fef6f1] rounded-2xl p-7 lg:p-8 border border-[#d96c4a]/15 relative overflow-hidden"
              >
                {/* Decorative large quote mark */}
                <div aria-hidden="true" className="absolute top-4 right-6 text-[5rem] leading-none text-[#d96c4a]/10 font-serif font-bold pointer-events-none select-none">&ldquo;</div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d96c4a]/12 mb-5">
                  <Shield className="w-3 h-3 text-[#b8552f]" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b8552f]">Trusted by 100+ Ohio Families</span>
                </span>
                <div className="hss-quote-editorial mb-5">
                  <h3 className="text-[1.4rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-3">Real results, real reviews.</h3>
                  <blockquote className="text-[#6B7280] text-base leading-relaxed italic">
                    &ldquo;We were about to send $5,000 to someone pretending to be our grandson. InVision's training taught us to use a family safe word — it saved us from devastation.&rdquo;
                  </blockquote>
                </div>
                <p className="text-[14px] font-semibold text-[#1E293B]">
                  Robert &amp; Carol S. <span className="text-[#6B7280] font-normal">— Dayton, OH</span>
                </p>
              </div>

              {/* Image card with floating metric badge */}
              <div
                data-reveal="slide-left"
                style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
                className="relative rounded-2xl overflow-visible"
              >
                <div className="hss-img-zoom relative rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
                  <img
                    src={consultingTeam}
                    alt="Security consultation in progress"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.78)] via-[rgba(15,23,42,0.15)] to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-white text-lg font-bold leading-tight max-w-md">
                      AI that filters out the scammers — automatically.
                    </p>
                  </div>
                </div>
                {/* Floating metric badge */}
                <div
                  data-reveal="scale"
                  style={{ "--reveal-delay": "480ms" } as React.CSSProperties}
                  className="hss-float-card absolute -top-3 -right-3 px-3.5 py-2.5 hidden sm:flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#d96c4a]/12 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-[#d96c4a]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-[#1E293B] leading-none">99% stopped</div>
                    <div className="text-[10px] text-[#6B7280] mt-0.5">scam detection rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS — Connected timeline
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint relative py-12 md:py-20 lg:py-24"
        aria-labelledby="story-how-heading"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mb-14 lg:mb-16">
            <span data-reveal className="hss-overline mb-5">
              <span className="hss-overline-dot" />
              How it works
            </span>
            <h2
              id="story-how-heading"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold text-[#1E293B] tracking-tight leading-[1.1] mt-4 mb-4"
            >
              Three steps to a quieter, safer digital life.
            </h2>
            <p
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="text-base text-[#6B7280] leading-relaxed max-w-[560px]"
            >
              No technical knowledge required. We handle the security work so
              you can stay focused on the people who matter most.
            </p>
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {/* Connecting line — desktop only */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute top-6 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px border-t-2 border-dashed border-[#d96c4a]/28 z-0"
            />

            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                data-reveal
                style={{ "--reveal-delay": `${i * 160}ms` } as React.CSSProperties}
                className="relative flex flex-col px-0 md:px-6 lg:px-8 pb-10 md:pb-0"
              >
                {/* Vertical connecting line — mobile only */}
                {i < howItWorks.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="md:hidden absolute left-6 top-12 bottom-0 w-px border-l-2 border-dashed border-[#d96c4a]/28"
                  />
                )}

                {/* Step bubble */}
                <div className="flex items-center gap-4 mb-5 relative z-10">
                  <div className="hss-step-bubble" data-step={step.step}>
                    {step.step}
                  </div>
                  <step.icon className="w-5 h-5 text-[#d96c4a]" strokeWidth={2.25} />
                </div>

                {/* Content */}
                <div className="md:pl-0">
                  <h3 className="text-[1.2rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7280] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — White bg | CTA close | checklist + collage
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-12 md:py-20 lg:py-24"
        aria-labelledby="story-section-4-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Left — checklist + CTA */}
            <div>
              <span data-reveal className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Get started today
              </span>

              <h2
                id="story-section-4-heading"
                data-reveal
                style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
                className="text-[1.75rem] lg:text-[2rem] font-bold text-[#1E293B] tracking-tight leading-[1.15] mb-4 mt-4"
              >
                Everything you need to feel
                <br />
                safe, in one plan.
              </h2>

              <p
                data-reveal
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
                className="text-base text-[#6B7280] leading-relaxed mb-7 max-w-[560px]"
              >
                Same-day setup, no contracts, and a real human you can call by
                name. Here's what comes with every InVision plan.
              </p>

              <ul className="space-y-3 mb-9">
                {ctaChecks.map((item, i) => (
                  <li
                    key={item}
                    data-reveal="slide-right"
                    style={{ "--reveal-delay": `${240 + i * 80}ms` } as React.CSSProperties}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d96c4a]/15 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#d96c4a]" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] text-[#1E293B] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <div
                data-reveal
                style={{ "--reveal-delay": "720ms" } as React.CSSProperties}
                className="flex flex-wrap items-center gap-5"
              >
                <CtaPrimary to="/training#pricing">
                  Start Protecting My Family
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
                <CtaText to="/contact">Talk to a human</CtaText>
              </div>
            </div>

            {/* Right — asymmetric collage */}
            <div className="relative grid grid-rows-2 gap-5 min-h-[280px] sm:h-[460px] lg:h-[520px]">
              {/* Large top image */}
              <div
                data-reveal="slide-left"
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                className="hss-img-zoom relative rounded-2xl overflow-hidden shadow-[0_12px_28px_-12px_rgba(15,23,42,0.22)] row-span-1"
              >
                <img
                  src={protectionWorkshop}
                  alt="Live protection workshop in session"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.45)] to-transparent" />
              </div>

              {/* Bottom image */}
              <div
                data-reveal="slide-left"
                style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
                className="hss-img-zoom relative rounded-2xl overflow-hidden shadow-[0_12px_28px_-12px_rgba(15,23,42,0.22)] row-span-1"
              >
                <img
                  src={communityWorkshop}
                  alt="Community workshop attendees"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.45)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-white text-sm font-semibold">Live community workshops in Ohio</p>
                </div>
              </div>

              {/* Floating trust badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <div
                  data-reveal="scale"
                  style={{ "--reveal-delay": "500ms" } as React.CSSProperties}
                  className="hss-trust-badge whitespace-nowrap"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  30-Day Money-Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeStorySections;

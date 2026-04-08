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
  TrendingDown,
  Zap,
} from "lucide-react";
import businessTeam from "@/assets/business-team-meeting-natural.jpg";
import familyLiving from "@/assets/family-living-room-natural.jpg";
import communityWorkshop from "@/assets/community-workshop-real.jpg";
import consultingTeam from "@/assets/consulting-team-strategy.jpg";
import protectionWorkshop from "@/assets/protection-training-workshop.jpg";
import "./HomeStorySections.css";

/**
 * HomeStorySections — four premium narrative sections beneath the hero.
 * Layout follows the editorial 4-section spec, translated from the
 * spec's purple/lavender palette into our brand orange + warm-cream
 * design system. Hero and footer remain untouched.
 *
 *   Section 1 — White bg | 60/40 split | text + image with overlay caption
 *   Section 2 — Cream bg | 45/55 split | wide image + stacked content cards
 *   Section 3 — White bg | 50/50 split | text + feature list + 2 stacked cards
 *   Section 4 — White bg | CTA closing | check list + 2 stacked images
 */

/* ─── CTA pills ──────────────────────────────────────────────────── */
function CtaPrimary({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
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

/* ─── Animated counter for the stats strip ───────────────────────── */
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

/* ─── Stat tile used in the stats strip ──────────────────────────── */
type StatProps = {
  target: number;
  suffix: string;
  label: string;
  icon: typeof Shield;
  description: string;
};

function StatTile({ target, suffix, label, icon: Icon, description }: StatProps) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d96c4a]/12 mb-4 md:mb-5">
        <Icon className="w-5 h-5 text-[#d96c4a]" strokeWidth={2.25} />
      </div>
      <div className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#1E293B] leading-none tracking-tight tabular-nums mb-2">
        {value.toLocaleString()}
        <span className="text-[#d96c4a]">{suffix}</span>
      </div>
      <div className="text-[15px] font-bold text-[#1E293B] mb-1.5">{label}</div>
      <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-[220px] md:max-w-none mx-auto md:mx-0">
        {description}
      </p>
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

export const HomeStorySections = () => {
  return (
    <div className="hss-root">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — White bg | 60/40 text + image split
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-20 lg:py-24"
        aria-labelledby="story-section-1-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left column — 60% (cols 7) */}
            <div className="md:col-span-7 max-w-[500px]">
              <span className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Built for real families
              </span>

              <h2
                id="story-section-1-heading"
                className="text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold tracking-tight text-[#1E293B] leading-[1.1] mb-5 mt-4"
              >
                AI scams move fast. Your protection moves faster.
              </h2>

              <p className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-[480px]">
                Our team builds the same enterprise-grade defenses used by
                Fortune 500 companies and brings them to families and small
                businesses across Ohio. Every layer is engineered to stop scams
                before they reach you.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <CtaPrimary to="/training#pricing">
                  Get Protected
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
                <CtaText to="/about">How we started</CtaText>
              </div>
            </div>

            {/* Right column — 40% (cols 5) — image with overlay label */}
            <div className="md:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-[0_18px_44px_-16px_rgba(15,23,42,0.22)] aspect-[4/5] lg:aspect-[5/6]">
                <img
                  src={businessTeam}
                  alt="The InVision Network security operations team at work"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1500}
                />
                {/* Floating overlay label — bottom-left.
                    Live indicator uses the new teal accent (semantic
                    "live/intelligence" signal vs. the warm orange brand). */}
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B]/72 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.7)]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                    Live Operations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1.5 — Stats strip (white bg, sits between 1 and 2)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative pb-20 lg:pb-24"
        aria-labelledby="story-stats-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="border-t border-[#1E293B]/8 pt-16 lg:pt-20">
            <h2 id="story-stats-heading" className="sr-only">
              By the numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {stats.map((stat) => (
                <StatTile key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — Cream bg | 45/55 wide image + stacked cards
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint relative py-20 lg:py-24"
        aria-labelledby="story-section-2-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-stretch">
            {/* Left — 45%: tall image with overlay caption */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:min-h-[560px] shadow-[0_18px_44px_-16px_rgba(15,23,42,0.22)]">
              <img
                src={familyLiving}
                alt="A protected family at home"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1000}
                height={1400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.88)] via-[rgba(15,23,42,0.4)] to-[rgba(15,23,42,0.1)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/14 backdrop-blur-md border border-white/25 mb-4">
                  {/* Teal shield — secondary accent demo */}
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2dd4bf]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                    Family-First
                  </span>
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
              {/* Top card — heading + body + CTA */}
              <div className="bg-white rounded-2xl p-7 lg:p-9 shadow-sm border border-[#1E293B]/8">
                <h3 className="text-[1.5rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-3">
                  One platform. Every layer of protection.
                </h3>
                <p className="text-[#6B7280] text-base leading-relaxed mb-6 max-w-[480px]">
                  From personal training and live workshops to enterprise
                  security audits and 24/7 monitoring — we built the toolkit so
                  your only job is to live your life.
                </p>
                <CtaPrimary to="/training">
                  Explore Protection Plans
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
              </div>

              {/* Bottom card — two side-by-side feature boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#d96c4a]/12 flex items-center justify-center mb-4">
                    <Bot className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
                  </div>
                  <h4 className="text-[1.1rem] font-bold text-[#1E293B] leading-tight mb-2">
                    Threats neutralized before they land
                  </h4>
                  <p className="text-[#6B7280] text-[0.9rem] leading-relaxed">
                    Inbound calls, texts, and emails are screened by AI trained
                    on the latest scam patterns.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-[#d96c4a]/12 flex items-center justify-center mb-4">
                    <Eye className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
                  </div>
                  <h4 className="text-[1.1rem] font-bold text-[#1E293B] leading-tight mb-2">
                    Continuous identity monitoring
                  </h4>
                  <p className="text-[#6B7280] text-[0.9rem] leading-relaxed">
                    We watch the dark web for your credentials so a leak
                    doesn't become a crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — White bg | 50/50 text + feature list + 2 cards
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-20 lg:py-24"
        aria-labelledby="story-section-3-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Left — 50%: heading + body + feature list */}
            <div>
              <span className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Why families trust us
              </span>

              <h2
                id="story-section-3-heading"
                className="text-[2rem] lg:text-[2.25rem] font-bold text-[#1E293B] tracking-tight leading-[1.1] mb-4 mt-4"
              >
                Protection backed by real investigation.
              </h2>

              <p className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-[480px]">
                Every alert we send is a real human looking at real evidence.
                No black box, no false alarms — just security analysts who
                treat your case like it's the only one they have.
              </p>

              {/* Vertical feature list with subtle dividers */}
              <ul className="divide-y divide-[#1E293B]/8">
                {featureList.map((item) => (
                  <li key={item.label} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[#d96c4a]/12 flex items-center justify-center flex-shrink-0">
                        <item.icon
                          className="w-4 h-4 text-[#d96c4a]"
                          strokeWidth={2.25}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-[#1E293B] leading-tight mb-1">
                          {item.label}
                        </h4>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[440px]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — 50%: two stacked cards */}
            <div className="flex flex-col gap-6">
              {/* Top card — purple accent badge + heading + text */}
              <div className="bg-[#fef6f1] rounded-2xl p-7 lg:p-8 border border-[#d96c4a]/15">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d96c4a]/15 mb-4">
                  <Shield className="w-3 h-3 text-[#b8552f]" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b8552f]">
                    Trusted by 100+ Ohio Families
                  </span>
                </span>
                <h3 className="text-[1.5rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-3">
                  Real results, real reviews.
                </h3>
                <p className="text-[#6B7280] text-base leading-relaxed mb-5">
                  "We were about to send $5,000 to someone pretending to be our
                  grandson. InVision's training taught us to use a family safe
                  word — it saved us from devastation."
                </p>
                <p className="text-[14px] font-semibold text-[#1E293B]">
                  Robert &amp; Carol S. <span className="text-[#6B7280] font-normal">— Dayton, OH</span>
                </p>
              </div>

              {/* Bottom card — image fills with text overlay */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3.5 — How It Works (cream bg) | 3-step process
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint relative py-20 lg:py-24"
        aria-labelledby="story-how-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="max-w-2xl mb-12 lg:mb-14">
            <span className="hss-overline mb-5">
              <span className="hss-overline-dot" />
              How it works
            </span>
            <h2
              id="story-how-heading"
              className="text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-bold text-[#1E293B] tracking-tight leading-[1.1] mt-4 mb-4"
            >
              Three steps to a quieter,
              <br />
              safer digital life.
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed max-w-[480px]">
              No technical knowledge required. We handle the security work so
              you can stay focused on the people who matter most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl p-8 lg:p-9 shadow-sm border border-[#1E293B]/8 hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Connector line — hidden on last item, visible md+
                    Uses teal so the process flow reads as "data path"
                    rather than competing with the orange brand */}
                {i < howItWorks.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10 h-px bg-[#0d9488]/35"
                  />
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#d96c4a]/12 flex items-center justify-center">
                    <step.icon
                      className="w-5 h-5 text-[#d96c4a]"
                      strokeWidth={2.25}
                    />
                  </div>
                  {/* Step number — uses the teal secondary accent so it
                      reads as "metadata/enumeration" vs. the orange brand */}
                  <span className="text-[2.25rem] font-bold text-[#0d9488]/35 leading-none tabular-nums tracking-tight">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-[1.25rem] font-bold text-[#1E293B] tracking-tight leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — White bg | CTA close | check list + 2 stacked images
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white relative py-20 lg:py-24"
        aria-labelledby="story-section-4-heading"
      >
        <div className="container mx-auto px-6 lg:px-16 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left — heading + paragraph + custom check list + CTA */}
            <div>
              <span className="hss-overline mb-5">
                <span className="hss-overline-dot" />
                Get started today
              </span>

              <h2
                id="story-section-4-heading"
                className="text-[1.75rem] lg:text-[2rem] font-bold text-[#1E293B] tracking-tight leading-[1.15] mb-4 mt-4"
              >
                Everything you need to feel
                <br />
                safe, in one plan.
              </h2>

              <p className="text-base text-[#6B7280] leading-relaxed mb-7 max-w-[480px]">
                Same-day setup, no contracts, and a real human you can call by
                name. Here's what comes with every InVision plan.
              </p>

              <ul className="space-y-3 mb-8">
                {ctaChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d96c4a]/15 flex items-center justify-center mt-0.5">
                      <Check
                        className="w-3 h-3 text-[#d96c4a]"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-[15px] text-[#1E293B] leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-5">
                <CtaPrimary to="/training#pricing">
                  Start Protecting My Family
                  <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
                <CtaText to="/contact">Talk to a human</CtaText>
              </div>
            </div>

            {/* Right — two stacked images with rounded corners */}
            <div className="grid grid-cols-1 gap-6">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-[0_12px_28px_-12px_rgba(15,23,42,0.18)]">
                <img
                  src={protectionWorkshop}
                  alt="Live protection workshop in session"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-[0_12px_28px_-12px_rgba(15,23,42,0.18)]">
                <img
                  src={communityWorkshop}
                  alt="Community workshop attendees"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeStorySections;

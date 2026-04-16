import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Check,
  Search,
  Lock,
  HeartPulse,
  Zap,
  ChevronLeft,
  ChevronRight,
  Star,
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
      className="hss-cta-primary inline-flex items-center justify-center gap-1.5 sm:gap-2 h-10 sm:h-12 px-5 sm:px-7 rounded-full text-[13px] sm:text-[15px] font-semibold transition-all hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
    >
      {children}
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

/* ─── Data ───────────────────────────────────────────────────────── */

/* Feature strip — 3 items */
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

/* Plan cards with tab navigation */
const planTabs = ["Families", "Businesses", "Seniors"] as const;
type PlanTab = (typeof planTabs)[number];

const planCards: Record<PlanTab, { title: string; desc: string; price: string; image: string }[]> = {
  Families: [
    {
      title: "Basic Shield",
      desc: "Always-on call and email screening with weekly safety briefings for your household.",
      price: "From $89/mo",
      image: familyLiving,
    },
    {
      title: "Family Guard",
      desc: "All devices monitored plus dark web credential alerts for up to 5 family members.",
      price: "From $149/mo",
      image: protectionWorkshop,
    },
    {
      title: "Full Protection",
      desc: "Everything included plus a dedicated security analyst and a reimbursement guarantee.",
      price: "From $249/mo",
      image: businessTeam,
    },
  ],
  Businesses: [
    {
      title: "Startup Secure",
      desc: "Email filtering, payroll protection, and one staff training session included.",
      price: "From $199/mo",
      image: consultingTeam,
    },
    {
      title: "SMB Shield",
      desc: "Full infrastructure audit, continuous monitoring, and monthly security reporting.",
      price: "From $349/mo",
      image: businessTeam,
    },
    {
      title: "Enterprise",
      desc: "Custom security stack with on-site training and a dedicated incident response team.",
      price: "Contact us",
      image: communityWorkshop,
    },
  ],
  Seniors: [
    {
      title: "Senior Starter",
      desc: "One-on-one training session to recognize and block today's most common scams.",
      price: "$59 once",
      image: communityWorkshop,
    },
    {
      title: "Senior Shield",
      desc: "Training plus 24/7 phone screening and monthly well-being check-in calls.",
      price: "From $89/mo",
      image: familyLiving,
    },
    {
      title: "Family Bundle",
      desc: "Covers the whole household — senior parent and adult family members together.",
      price: "From $149/mo",
      image: protectionWorkshop,
    },
  ],
};

/* How it works — 4 steps */
const howItWorks = [
  {
    step: "Step 1",
    title: "We assess your risk",
    desc: "A quick conversation maps the people, accounts, and devices that need protecting — and where the gaps are.",
  },
  {
    step: "Step 2",
    title: "We deploy the defenses",
    desc: "Same-day setup of monitoring, screening, alerts, and family safe-words. No wait, no contracts, no jargon.",
  },
  {
    step: "Step 3",
    title: "We watch your back 24/7",
    desc: "Real analysts review every alert. If something slips through, we recover and reimburse — fully covered.",
  },
  {
    step: "Step 4",
    title: "We keep you informed",
    desc: "Weekly briefings, instant threat alerts, and a monthly security report — plain English, no tech jargon.",
  },
];

/* Testimonials */
const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote:
      "We were about to send $5,000 to someone pretending to be our grandson. InVision's safe-word training saved us from devastation. We couldn't be more grateful.",
    rating: 5,
    avatar: instructorSarah,
  },
  {
    name: "Eleanor B.",
    location: "Oakwood, OH",
    quote:
      "I'm 78 and felt completely lost with technology. Their patience with me was incredible — I actually feel confident now and can spot scams before they happen.",
    rating: 5,
    avatar: instructorPriya,
  },
  {
    name: "Jennifer R.",
    location: "Beavercreek, OH",
    quote:
      "Their team had our practice back up in under an hour after a payroll email got spoofed. Best insurance we ever bought — worth every penny and then some.",
    rating: 5,
    avatar: instructorJames,
  },
];

const testimonialImages = [familyLiving, communityWorkshop];

/* Stats — 3 rows */
type StatItem = { target: number; suffix: string; label: string; description: string };
const stats: StatItem[] = [
  {
    target: 100,
    suffix: "+",
    label: "Families Protected",
    description:
      "Across Ohio, every household covered end-to-end with real human oversight and AI-powered monitoring.",
  },
  {
    target: 99,
    suffix: "%",
    label: "Scam Detection Rate",
    description:
      "Threats flagged before they reach the inbox, the phone, or the bank account — automatically.",
  },
  {
    target: 24,
    suffix: "/7",
    label: "Expert Support",
    description:
      "Real human analysts on standby every hour, every day. No bots, no hold music, no runaround.",
  },
];

/* Workshop cards — 4 items */
const workshops = [
  {
    title: "AI Scam Defense Workshop",
    type: "Group Training",
    price: "From $89",
    image: protectionWorkshop,
    href: "/training",
  },
  {
    title: "Family Safety Coaching",
    type: "1-on-1 Session",
    price: "From $79",
    image: familyLiving,
    href: "/training",
  },
  {
    title: "Business Security Audit",
    type: "On-site Assessment",
    price: "From $249",
    image: consultingTeam,
    href: "/ai",
  },
  {
    title: "Senior Digital Literacy",
    type: "Group Workshop",
    price: "From $59",
    image: communityWorkshop,
    href: "/training",
  },
];

/* Services — 3 columns, first dark */
const services = [
  {
    num: "01",
    title: "AI Scam\nProtection",
    desc: "Real-time monitoring across calls, texts, and email. Our AI and analyst team flag every threat before it reaches you.",
    dark: true,
  },
  {
    num: "02",
    title: "Cybersecurity\nTraining",
    desc: "Hands-on workshops, 1-on-1 coaching, and plain-English briefings that build habits that last a lifetime.",
    dark: false,
  },
  {
    num: "03",
    title: "Business\nAutomation",
    desc: "AI-powered tools that protect payroll, vendor emails, and daily operations — deployed the same day.",
    dark: false,
  },
];

/* ─── Scroll reveal observer ─────────────────────────────────────── */
function useRevealObserver() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;
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

/* ─── Stat row with animated counter ────────────────────────────── */
function StatRow({ stat, index, last }: { stat: StatItem; index: number; last: boolean }) {
  const { value, ref } = useCountUp(stat.target);
  return (
    <div
      ref={ref}
      data-reveal
      style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
      className={`py-8 ${!last ? "border-b border-[#E0E0E0]" : ""}`}
    >
      <div className="text-[3rem] md:text-[3.5rem] font-extrabold text-[#111111] leading-none tracking-tight mb-2 tabular-nums">
        {value.toLocaleString()}
        <span className="text-[#d96c4a]">{stat.suffix}</span>{" "}
        <span className="text-[1rem] md:text-[1.1rem] font-bold text-[#1E293B] align-middle">
          {stat.label}
        </span>
      </div>
      <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-xs">{stat.description}</p>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
export const HomeStorySections = () => {
  const rootRef = useRevealObserver();
  const [activeTab, setActiveTab] = useState<PlanTab>("Families");
  const [activeTesti, setActiveTesti] = useState(0);

  const prevTesti = () =>
    setActiveTesti((c) => (c - 1 + testimonials.length) % testimonials.length);
  const nextTesti = () =>
    setActiveTesti((c) => (c + 1) % testimonials.length);

  const t = testimonials[activeTesti];

  return (
    <div ref={rootRef} className="hss-root">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — FEATURE STRIP (3 horizontal items)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white border-b border-[#E0E0E0]"
        aria-label="Key protection features"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E0E0E0]">
            {featureList.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                className="flex items-start gap-4 p-8 lg:p-10"
              >
                <div className="w-10 h-10 rounded-full bg-[#F4F4F4] border border-[#E0E0E0] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#111111]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#111111] mb-1.5 leading-tight">
                    {item.label}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — PLAN CARDS WITH TAB NAVIGATION
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint py-[80px]"
        aria-labelledby="plans-heading"
      >
        <div className="container mx-auto">
          {/* Tab bar + "See All" link */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-1 bg-white border border-[#E0E0E0] rounded-full p-1 self-start shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              {planTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#6B7280] hover:text-[#111111]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link
              to="/training"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors self-start sm:self-auto"
            >
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {planCards[activeTab].map((card, i) => (
              <div
                key={`${activeTab}-${i}`}
                data-reveal="scale"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="hss-card overflow-hidden group"
              >
                {/* Card image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F4F4]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                  />
                </div>
                {/* Card content */}
                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-[#111111] mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{card.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-[#111111]">{card.price}</span>
                    <Link
                      to="/training"
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#111111] text-white text-[12px] font-semibold hover:bg-[#333333] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
          Left: giant decorative quote + bold headline
          Right: 4 numbered steps with dividers
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white py-[80px] border-t border-[#E0E0E0]"
        aria-labelledby="how-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — decorative quote + headline */}
            <div data-reveal>
              <div
                aria-hidden="true"
                className="text-[9rem] md:text-[11rem] leading-none text-[#111111]/[0.07] font-serif font-bold select-none pointer-events-none -mt-8 -ml-2"
              >
                &ldquo;
              </div>
              <h2
                id="how-heading"
                className="text-[2.25rem] md:text-[3rem] font-extrabold text-[#111111] leading-[1.1] tracking-tight -mt-10 max-w-sm"
              >
                Your guide to staying safe online.
              </h2>
            </div>

            {/* Right — numbered steps */}
            <div>
              {howItWorks.map((step, i) => (
                <div
                  key={step.step}
                  data-reveal="slide-right"
                  style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                  className={`py-5 ${i < howItWorks.length - 1 ? "border-b border-[#E0E0E0]" : ""}`}
                >
                  <div className="text-[13px] font-bold text-[#111111] mb-1">{step.step}</div>
                  <div className="text-[13px] font-semibold text-[#1E293B] mb-1">{step.title}</div>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
          Centered header | Left: 2 stacked photos | Right: single card
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-testimonial-theater py-[80px]"
        aria-labelledby="testimonials-heading"
      >
        <div className="container mx-auto">

          {/* Centered header */}
          <div className="text-center mb-12">
            <h2
              id="testimonials-heading"
              data-reveal
              className="text-[2rem] md:text-[2.5rem] font-extrabold text-[#111111] leading-[1.1] tracking-tight"
            >
              Satisfied Clients Speak
            </h2>
            <p
              data-reveal
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              className="text-[#6B7280] text-base mt-3 max-w-md mx-auto"
            >
              Real stories from Ohio families we've helped protect.
            </p>
          </div>

          {/* Two-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-8 items-center">

            {/* Left — 2 stacked photos */}
            <div className="hidden lg:flex flex-col gap-4">
              {testimonialImages.map((img, i) => (
                <div
                  key={i}
                  data-reveal="slide-left"
                  style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                  className={`hss-img-zoom rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${
                    i === 0 ? "aspect-[4/3]" : "aspect-[16/9]"
                  }`}
                >
                  <img
                    src={img}
                    alt="Protected Ohio family"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={i === 0 ? 450 : 338}
                  />
                </div>
              ))}
            </div>

            {/* Right — single testimonial card */}
            <div
              data-reveal="slide-right"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="hss-testimonial-card relative p-8 lg:p-10"
            >
              {/* Giant decorative quote */}
              <div aria-hidden="true" className="hss-giant-quote">&ldquo;</div>

              <div className="relative z-10">
                {/* Avatar + name */}
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-bold text-[#111111] text-[15px] leading-tight">{t.name}</div>
                    <div className="text-[12px] text-[#6B7280]">{t.location}</div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d96c4a] text-[#d96c4a]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[15px] text-[#1E293B] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* "See More" + prev/next */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13px] font-semibold hover:bg-[#333333] transition-colors"
                  >
                    See More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={prevTesti}
                      aria-label="Previous testimonial"
                      className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#111111] hover:bg-[#F4F4F4] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTesti}
                      aria-label="Next testimonial"
                      className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — STATS + EDITORIAL
          Left: 3 large stat rows | Right: image with editorial overlay
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white py-[80px] border-t border-[#E0E0E0]"
        aria-labelledby="stats-heading"
      >
        <div className="container mx-auto">
          <h2 id="stats-heading" className="sr-only">By the numbers</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-10 lg:gap-16 items-start">

            {/* Left — stat rows */}
            <div>
              {stats.map((stat, i) => (
                <StatRow key={stat.label} stat={stat} index={i} last={i === stats.length - 1} />
              ))}
            </div>

            {/* Right — editorial image with text overlay */}
            <div
              data-reveal="slide-right"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="hss-img-zoom relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-[0_8px_32px_-12px_rgba(15,23,42,0.18)]"
            >
              <img
                src={businessTeam}
                alt="InVision Network security operations team"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={900}
                height={720}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.88)] via-[rgba(15,23,42,0.3)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                <p className="text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  Kettering, Ohio
                </p>
                <h3 className="text-white text-[1.5rem] md:text-[1.75rem] font-extrabold leading-tight tracking-tight">
                  The Defense Against Digital Threats.
                </h3>
                <p className="text-white/75 text-[14px] leading-relaxed mt-3 max-w-sm">
                  Ohio families trust InVision Network because we combine
                  enterprise-grade AI with real human investigators — no other
                  firm does both.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — WORKSHOPS (4-col card grid, "blog" equivalent)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint py-[80px]"
        aria-labelledby="workshops-heading"
      >
        <div className="container mx-auto">

          {/* Section header + prev/next arrows */}
          <div className="flex items-center justify-between mb-8">
            <h2
              id="workshops-heading"
              className="text-[1.75rem] font-extrabold text-[#111111] tracking-tight"
            >
              Our Workshops
            </h2>
            <div className="flex gap-2">
              <Link
                to="/training"
                aria-label="Previous workshops"
                className="w-9 h-9 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#111111] hover:bg-[#F4F4F4] transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/training"
                aria-label="Next workshops"
                className="w-9 h-9 rounded-full border border-[#111111] bg-[#111111] flex items-center justify-center text-white hover:bg-[#333333] transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {workshops.map((ws, i) => (
              <div
                key={ws.title}
                data-reveal="scale"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="hss-card overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#F4F4F4]">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                  />
                </div>
                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[13px] font-bold text-[#111111] leading-snug mb-1">
                    {ws.title}
                  </h3>
                  <p className="text-[11px] text-[#6B7280] mb-3">{ws.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#111111]">{ws.price}</span>
                    <Link
                      to={ws.href}
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#111111] text-white text-[11px] font-semibold hover:bg-[#333333] transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — SERVICES (3-col, first col dark #111111)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white py-[80px] border-t border-[#E0E0E0]"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto">

          <h2
            id="services-heading"
            data-reveal
            className="text-center text-[1.75rem] font-extrabold text-[#111111] tracking-tight mb-10"
          >
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.num}
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                className={`rounded-[14px] p-8 lg:p-10 flex flex-col ${
                  svc.dark
                    ? "bg-[#111111]"
                    : "bg-white border border-[#E0E0E0] shadow-[0px_2px_10px_rgba(0,0,0,0.06)]"
                }`}
              >
                {/* Number */}
                <div
                  className={`text-[2rem] font-extrabold mb-5 tabular-nums leading-none ${
                    svc.dark ? "text-white/20" : "text-[#E0E0E0]"
                  }`}
                >
                  {svc.num}
                </div>
                {/* Title */}
                <h3
                  className={`text-[2rem] md:text-[2.25rem] font-extrabold leading-tight tracking-tight mb-5 whitespace-pre-line ${
                    svc.dark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {svc.title}
                </h3>
                {/* Description */}
                <p
                  className={`text-[14px] leading-relaxed flex-1 ${
                    svc.dark ? "text-white/55" : "text-[#6B7280]"
                  }`}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeStorySections;

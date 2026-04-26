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
  Phone,
  MapPin,
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
      className="hss-cta-primary inline-flex items-center justify-center gap-2 h-5 sm:h-6 px-4 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-semibold transition-all hover:-translate-y-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]"
    >
      {children}
    </Link>
  );
}

function CtaGhost({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="hss-cta-ghost inline-flex items-center justify-center gap-2 h-5 sm:h-6 px-4 sm:px-4 rounded-full text-[11px] sm:text-[13px] font-semibold transition-all hover:-translate-y-[1px] border border-[#E0E0E0]"
    >
      {children}
    </Link>
  );
}

/* ─── Animated counter ───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(target);
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

/* Trust strip items */
const trustItems = [
  { icon: MapPin,     label: "Kettering, Ohio based" },
  { icon: ShieldCheck, label: "500+ families protected" },
  { icon: Clock,       label: "24/7 live support" },
  { icon: Award,       label: "10% veteran discount" },
  { icon: Phone,       label: "(937) 749-7579" },
];

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
    desc: "Every alert is reviewed by a certified security analyst — never a black-box AI guess.",
  },
  {
    icon: Users,
    label: "Family-first plans",
    desc: "Coverage that scales from a single account to your whole household, including elderly relatives.",
  },
];

/* Plan cards with tab navigation */
const planTabs = ["Families", "Businesses", "Seniors"] as const;
type PlanTab = (typeof planTabs)[number];

const planCards: Record<PlanTab, { title: string; desc: string; price: string; image: string; badge?: string; features: string[] }[]> = {
  Families: [
    {
      title: "Basic Shield",
      desc: "Always-on call and email screening with weekly safety briefings for your household.",
      price: "From $89/mo",
      image: familyLiving,
      features: ["Call screening", "Email filtering", "Weekly report"],
    },
    {
      title: "Family Guard",
      desc: "All devices monitored plus dark web credential alerts for up to 5 family members.",
      price: "From $149/mo",
      image: protectionWorkshop,
      badge: "Most Popular",
      features: ["Everything in Basic", "Dark web monitoring", "Up to 5 members", "Instant alerts"],
    },
    {
      title: "Full Protection",
      desc: "A dedicated security analyst plus a full reimbursement guarantee if anything slips through.",
      price: "From $249/mo",
      image: businessTeam,
      features: ["Everything in Guard", "Dedicated analyst", "Reimbursement cover", "Priority response"],
    },
  ],
  Businesses: [
    {
      title: "Startup Secure",
      desc: "Email filtering, payroll protection, and one staff training session included.",
      price: "From $199/mo",
      image: consultingTeam,
      features: ["Email filtering", "Payroll protection", "1 training session"],
    },
    {
      title: "SMB Shield",
      desc: "Full infrastructure audit, continuous monitoring, and monthly security reporting.",
      price: "From $349/mo",
      image: businessTeam,
      badge: "Most Popular",
      features: ["Full audit", "Continuous monitoring", "Monthly report", "Staff training"],
    },
    {
      title: "Enterprise",
      desc: "Custom security stack with on-site training and a dedicated incident response team.",
      price: "Contact us",
      image: communityWorkshop,
      features: ["Custom stack", "On-site training", "Incident response", "SLA guarantee"],
    },
  ],
  Seniors: [
    {
      title: "Senior Starter",
      desc: "One-on-one training session to recognize and block today's most common scams.",
      price: "$59 once",
      image: communityWorkshop,
      features: ["1-on-1 session", "Scam recognition", "Safe-word setup"],
    },
    {
      title: "Senior Shield",
      desc: "Training plus 24/7 phone screening and monthly well-being check-in calls.",
      price: "From $89/mo",
      image: familyLiving,
      badge: "Most Popular",
      features: ["Training included", "24/7 phone screening", "Monthly check-in", "Family alert"],
    },
    {
      title: "Family Bundle",
      desc: "Covers the whole household — senior parent and adult family members together.",
      price: "From $149/mo",
      image: protectionWorkshop,
      features: ["Full family cover", "All devices", "Shared dashboard", "10% veteran disc."],
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
    tag: "Grandparent Scam",
  },
  {
    name: "Eleanor B.",
    location: "Oakwood, OH",
    quote:
      "I'm 78 and felt completely lost with technology. Their patience with me was incredible — I actually feel confident now and can spot scams before they happen.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Senior Training",
  },
  {
    name: "Jennifer R.",
    location: "Beavercreek, OH",
    quote:
      "Their team had our practice back up in under an hour after a payroll email got spoofed. Best investment we ever made — worth every penny and then some.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Rescue",
  },
];

const testimonialImages = [familyLiving, communityWorkshop];

/* Stats — 3 rows */
type StatItem = { prefix?: string; target: number; suffix: string; label: string; sublabel: string; description: string };
const stats: StatItem[] = [
  {
    prefix: "",
    target: 10,
    suffix: "+ Million",
    label: "Scam Attempts Blocked",
    sublabel: "and counting",
    description:
      "Across Ohio families and small businesses, our AI and analyst team has intercepted over 10 million threat attempts since launch.",
  },
  {
    prefix: "",
    target: 8,
    suffix: "x More",
    label: "Effective Than Antivirus Alone",
    sublabel: "measured over 24 months",
    description:
      "Our combined AI + human model stops 8 times more social-engineering threats than traditional antivirus software on its own.",
  },
  {
    prefix: "",
    target: 1,
    suffix: "+ Million",
    label: "Hours of Family Safety",
    sublabel: "delivered since founding",
    description:
      "1 million hours of live monitoring, training, and analyst-reviewed alerts delivered to Ohio households and businesses.",
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
    category: "Protection",
  },
  {
    title: "Family Safety Coaching",
    type: "1-on-1 Session",
    price: "From $79",
    image: familyLiving,
    href: "/training",
    category: "Families",
  },
  {
    title: "Business Security Audit",
    type: "On-site Assessment",
    price: "From $249",
    image: consultingTeam,
    href: "/ai",
    category: "Business",
  },
  {
    title: "Senior Digital Literacy",
    type: "Group Workshop",
    price: "From $59",
    image: communityWorkshop,
    href: "/training",
    category: "Seniors",
  },
];

/* Services — 3 columns, first dark */
const services = [
  {
    num: "01",
    title: "AI Scam\nProtection",
    desc: "Real-time monitoring across calls, texts, and email. Our AI and analyst team flag every threat before it reaches you.",
    cta: "Learn More",
    href: "/training",
    dark: true,
  },
  {
    num: "02",
    title: "Cybersecurity\nTraining",
    desc: "Hands-on workshops, 1-on-1 coaching, and plain-English briefings that build habits that last a lifetime.",
    cta: "View Workshops",
    href: "/training",
    dark: false,
  },
  {
    num: "03",
    title: "Business\nAutomation",
    desc: "AI-powered tools that protect payroll, vendor emails, and daily operations — deployed the same day, no IT team required.",
    cta: "Explore AI Tools",
    href: "/ai",
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
      { threshold: 0.10, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return rootRef;
}

/* ─── Stat row ───────────────────────────────────────────────────── */
function StatRow({ stat, index, last }: { stat: StatItem; index: number; last: boolean }) {
  const { value, ref } = useCountUp(stat.target);
  return (
    <div
      ref={ref}
      data-reveal
      style={{ "--reveal-delay": `${index * 140}ms` } as React.CSSProperties}
      className={`py-6 ${!last ? "border-b border-[#E0E0E0]" : ""}`}
    >
      {/* Large number */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[2.75rem] sm:text-[4rem] md:text-[5rem] font-black text-[#111111] leading-none tracking-tight tabular-nums">
          {value}
        </span>
        <span className="text-[1.75rem] md:text-[2.25rem] font-black text-[#d96c4a] leading-none">
          {stat.suffix}
        </span>
      </div>
      {/* Label */}
      <div className="text-[15px] font-bold text-[#111111] mb-0.5 leading-tight">{stat.label}</div>
      <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-[0.12em] mb-3">{stat.sublabel}</div>
      <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-xs">{stat.description}</p>
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
          SECTION 1 — FEATURE STRIP
          Heading row + 3 horizontal feature items with dividers
          ═══════════════════════════════════════════════════════════════ */}
      <section className="hss-section-tint" aria-label="Key protection features">
        {/* Section heading */}
        <div className="container mx-auto pt-9 pb-6 border-b border-[#F0F0F0]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-2">
                Why families choose us
              </p>
              <h2 className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#111111] tracking-tight leading-[1.1]">
                Protection that works while you live your life.
              </h2>
            </div>
            <Link
              to="/training"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors whitespace-nowrap self-start sm:self-auto pb-1"
            >
              See all plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3-col feature strip */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E0E0E0] pb-2">
            {featureList.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                className="flex items-start gap-4 p-5 sm:p-4 lg:p-6"
              >
                <div className="w-7 h-7 rounded-xl bg-[#d96c4a]/10 border border-[#d96c4a]/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5 text-[#d96c4a]" strokeWidth={2} />
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
      <section className="hss-section-white py-5 sm:py-9 md:py-10" aria-labelledby="plans-heading">
        <div className="container mx-auto">

          {/* Section intro */}
          <div className="mb-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-2">Protection plans</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 id="plans-heading" className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#111111] tracking-tight leading-[1.1]">
                Built for every stage of life.
              </h2>
              <Link
                to="/training"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors self-start sm:self-auto"
              >
                See All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-1 bg-white border border-[#E0E0E0] rounded-full p-1 self-start shadow-[0_1px_4px_rgba(0,0,0,0.06)] w-fit mb-5">
            {planTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-[#d96c4a] text-white shadow-[0_2px_8px_rgba(217,108,74,0.35)]"
                    : "text-[#6B7280] hover:text-[#111111]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 3 plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {planCards[activeTab].map((card, i) => (
              <div
                key={`${activeTab}-${i}`}
                data-reveal="scale"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="hss-card stroke-glass overflow-hidden group flex flex-col"
              >
                {/* Card image with optional badge */}
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
                  {card.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.1em]">
                      {card.badge}
                    </div>
                  )}
                </div>
                {/* Card content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[15px] font-bold text-[#111111] mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4">{card.desc}</p>
                  {/* Features */}
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[12px] text-[#374151]">
                        <Check className="w-3.5 h-3.5 text-[#d96c4a] flex-shrink-0" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
                    <span className="text-[17px] font-black text-[#111111] tracking-tight">{card.price}</span>
                    <Link
                      to="/training"
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#d96c4a] text-white text-[12px] font-semibold hover:bg-[#c45e3b] transition-colors shadow-sm"
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
          Left: giant decorative quote + bold headline + CTA
          Right: 4 numbered steps with dividers
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint py-5 sm:py-9 md:py-10"
        aria-labelledby="how-heading"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">

            {/* Left — decorative quote + headline */}
            <div data-reveal className="lg:sticky lg:top-16">
              {/* Giant quote mark — scaled for mobile */}
              <div
                aria-hidden="true"
                className="text-[7rem] sm:text-[10rem] md:text-[16rem] leading-[0.8] text-[#111111]/[0.06] font-serif font-black select-none pointer-events-none -ml-4"
              >
                &ldquo;
              </div>
              <h2
                id="how-heading"
                className="text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] font-extrabold text-[#111111] leading-[1.1] tracking-tight -mt-5 sm:-mt-5 md:-mt-9 mb-5"
              >
                Your guide to<br />staying safe online.
              </h2>
              <p className="text-[15px] text-[#6B7280] leading-relaxed mb-5 max-w-sm">
                No technical knowledge required. We handle the security work so
                you stay focused on the people who matter most.
              </p>
              <div className="flex flex-wrap gap-3">
                <CtaPrimary to="/training#pricing">
                  Get Protected <ArrowRight className="w-4 h-4" />
                </CtaPrimary>
                <CtaGhost to="/contact">
                  Talk to us
                </CtaGhost>
              </div>
            </div>

            {/* Right — numbered steps */}
            <div>
              {howItWorks.map((step, i) => (
                <div
                  key={step.step}
                  data-reveal="slide-right"
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                  className={`flex gap-4 sm:gap-5 py-3 sm:py-5 ${i < howItWorks.length - 1 ? "border-b border-[#E0E0E0]" : ""}`}
                >
                  {/* Step number bubble */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-b from-[#e07b52] to-[#d96c4a] text-white flex items-center justify-center text-[12px] font-black flex-shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(217,108,74,0.35)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#d96c4a] uppercase tracking-[0.12em] mb-1">{step.step}</div>
                    <div className="text-[15px] font-bold text-[#111111] mb-1.5 leading-snug">{step.title}</div>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
          Centered header | Left: 2 stacked photos | Right: card + nav
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-testimonial-theater hss-section-white py-5 sm:py-9 md:py-10"
        aria-labelledby="testimonials-heading"
      >
        <div className="container mx-auto">

          {/* Centered header */}
          <div className="head-rhythm text-center mb-5">
            <p
              data-reveal
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-3"
            >
              Client stories
            </p>
            <h2
              id="testimonials-heading"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#111111] leading-[1.1] tracking-tight"
            >
              Satisfied Clients Speak
            </h2>
            <p
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className="text-[#6B7280] text-[15px] mt-3 max-w-md mx-auto leading-relaxed"
            >
              Real stories from Ohio families and businesses we've helped protect.
            </p>
          </div>

          {/* Two-col layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[42fr_58fr] gap-5 items-center">

            {/* Left — 2 stacked photos */}
            <div className="hidden lg:flex flex-col gap-4">
              {testimonialImages.map((img, i) => (
                <div
                  key={i}
                  data-reveal="slide-left"
                  style={{ "--reveal-delay": `${i * 140}ms` } as React.CSSProperties}
                  className={`hss-img-zoom rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.10)] ${
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

            {/* Right — testimonial card */}
            <div
              data-reveal="slide-right"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="hss-testimonial-card relative p-5 sm:p-5 lg:p-6 overflow-hidden"
            >
              {/* Giant decorative quote */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-2 text-[9rem] leading-none text-[#111111]/[0.05] font-serif font-black select-none pointer-events-none"
              >
                &ldquo;
              </div>

              <div className="relative z-10">
                {/* Tag pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111]/[0.06] border border-[#E0E0E0] text-[10px] font-bold uppercase tracking-[0.12em] text-[#111111] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d96c4a]" />
                  {t.tag}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d96c4a] text-[#d96c4a]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-[14px] sm:text-[16px] md:text-[17px] text-[#1E293B] leading-relaxed mb-5 sm:mb-4 font-medium italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mb-5 pt-5 border-t border-[#F0F0F0]">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                    width={44}
                    height={44}
                  />
                  <div>
                    <div className="font-bold text-[#111111] text-[14px] leading-tight">{t.name}</div>
                    <div className="flex items-center gap-1 text-[12px] text-[#6B7280] mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {t.location}
                    </div>
                  </div>
                </div>

                {/* "See More" + prev/next */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#d96c4a] text-white text-[13px] font-semibold hover:bg-[#c45e3b] transition-colors w-full sm:w-auto shadow-sm"
                  >
                    See More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="flex items-center justify-end gap-3">
                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveTesti(i)}
                          aria-label={`Go to testimonial ${i + 1}`}
                          className={`rounded-full transition-all ${
                            i === activeTesti
                              ? "w-4 h-2 bg-[#111111]"
                              : "w-2 h-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={prevTesti}
                        aria-label="Previous testimonial"
                        className="w-6 h-6 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#111111] hover:bg-[#F4F4F4] transition-colors shadow-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextTesti}
                        aria-label="Next testimonial"
                        className="w-6 h-6 rounded-full bg-[#d96c4a] text-white flex items-center justify-center hover:bg-[#c45e3b] transition-colors shadow-sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — STATS + EDITORIAL IMAGE
          Left: 3 large stat rows | Right: editorial image overlay
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint py-5 sm:py-9 md:py-10"
        aria-labelledby="stats-heading"
      >
        <div className="container mx-auto">
          {/* Section intro */}
          <div className="mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-2">By the numbers</p>
            <h2 id="stats-heading" className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-4">
              The impact in Ohio — and growing.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[46fr_54fr] gap-6 lg:gap-10 items-start">

            {/* Left — stat rows */}
            <div>
              {stats.map((stat, i) => (
                <StatRow key={stat.label} stat={stat} index={i} last={i === stats.length - 1} />
              ))}
            </div>

            {/* Right — editorial image */}
            <div
              data-reveal="slide-right"
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="hss-img-zoom relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-[0_8px_32px_-12px_rgba(15,23,42,0.18)] lg:sticky lg:top-16"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,0.90)] via-[rgba(15,23,42,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <p className="text-white/55 text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
                  Kettering, Ohio. The Transformation Of Real Estate.
                </p>
                <h3 className="text-white text-[1.5rem] md:text-[1.875rem] font-extrabold leading-tight tracking-tight mb-3">
                  The Defense Against<br />Digital Threats.
                </h3>
                <p className="text-white/70 text-[13px] leading-relaxed max-w-xs">
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
          SECTION 6 — WORKSHOPS (4-col card grid)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-white py-5 sm:py-9 md:py-10"
        aria-labelledby="workshops-heading"
      >
        <div className="container mx-auto">

          {/* Section header + prev/next */}
          <div className="flex items-end justify-between mb-5 gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-2">Programs</p>
              <h2
                id="workshops-heading"
                className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#111111] tracking-tight"
              >
                Our Workshops
              </h2>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                to="/training"
                aria-label="Previous workshops"
                className="w-6 h-6 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center text-[#111111] hover:bg-[#F4F4F4] transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/training"
                aria-label="Next workshops"
                className="w-6 h-6 rounded-full bg-[#d96c4a] flex items-center justify-center text-white hover:bg-[#c45e3b] transition-colors shadow-[0_2px_8px_rgba(217,108,74,0.35)]"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {workshops.map((ws, i) => (
              <div
                key={ws.title}
                data-reveal="scale"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="hss-card stroke-glass--accent overflow-hidden group flex flex-col"
              >
                {/* Image with category badge */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[#F4F4F4]">
                  <img
                    src={ws.image}
                    alt={ws.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={320}
                  />
                  {/* Category pill on image */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#111111] uppercase tracking-[0.08em] shadow-sm">
                    {ws.category}
                  </div>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-[13px] font-bold text-[#111111] leading-snug mb-1">
                    {ws.title}
                  </h3>
                  <p className="text-[11px] text-[#9CA3AF] font-medium mb-auto pb-3">{ws.type}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
                    <span className="text-[13px] font-extrabold text-[#111111]">{ws.price}</span>
                    <Link
                      to={ws.href}
                      className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#d96c4a] text-white text-[11px] font-semibold hover:bg-[#c45e3b] transition-colors shadow-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See All link */}
          <div className="text-center">
            <Link
              to="/training"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E0E0E0] bg-white text-[13px] font-semibold text-[#111111] hover:bg-[#F4F4F4] transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              See All Programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — SERVICES (3-col, first col dark #111111)
          ═══════════════════════════════════════════════════════════════ */}
      <section
        className="hss-section-tint py-5 sm:py-9 md:py-10"
        aria-labelledby="services-heading"
      >
        <div className="container mx-auto">

          {/* Heading */}
          <div className="head-rhythm text-center mb-7">
            <p data-reveal className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d96c4a] mb-2">
              What we offer
            </p>
            <h2
              id="services-heading"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#111111] tracking-tight"
            >
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.num}
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                className={`rounded-[14px] p-5 sm:p-5 lg:p-6 flex flex-col transition-all duration-300 ${
                  svc.dark
                    ? "bg-[#111111] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
                    : "bg-white border border-[#E0E0E0] shadow-[0px_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.10)] hover:border-[#d96c4a]/25"
                }`}
              >
                {/* Number */}
                <div
                  className={`text-[2rem] font-extrabold mb-5 tabular-nums leading-none ${
                    svc.dark ? "text-white/15" : "text-[#E8E8E8]"
                  }`}
                >
                  {svc.num}
                </div>
                {/* Title */}
                <h3
                  className={`text-[1.5rem] sm:text-[2rem] md:text-[2.25rem] font-extrabold leading-tight tracking-tight mb-4 whitespace-pre-line ${
                    svc.dark ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {svc.title}
                </h3>
                {/* Description */}
                <p
                  className={`text-[14px] leading-relaxed flex-1 mb-5 ${
                    svc.dark ? "text-white/50" : "text-[#6B7280]"
                  }`}
                >
                  {svc.desc}
                </p>
                {/* CTA */}
                <Link
                  to={svc.href}
                  className={`inline-flex items-center gap-2 text-[13px] font-semibold transition-colors group w-fit ${
                    svc.dark
                      ? "text-white/60 hover:text-white"
                      : "text-[#111111] hover:text-[#d96c4a]"
                  }`}
                >
                  {svc.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeStorySections;

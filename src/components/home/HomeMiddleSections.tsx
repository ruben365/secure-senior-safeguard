import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Shield,
  Settings,
  HeadphonesIcon,
  Mail,
  Phone,
  MapPin,
  Send,
  Scissors,
  Stethoscope,
  Workflow,
  MessageSquare,
  Lock,
  UserCheck,
  Fingerprint,
  Server,
  RefreshCw,
  Heart,
  Award,
  CheckCircle2,
  Star,
  Quote,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Building2,
  Code2,
  Handshake,
  FileText,
  Zap,
} from "lucide-react";

/**
 * HomeMiddleSections
 * ──────────────────
 * A rich middle block for the homepage containing FIVE sections:
 *
 *   1. Services Bento Grid  — 3 cards (AI Business, Education, Insurance)
 *   2. How It Works         — vertical circuit-board timeline (3 steps)
 *   3. About Split Screen   — Kettering, OH asymmetric layout
 *   4. Testimonials + Trust — masonry cards + low-opacity trust bar
 *   5. Contact Dual-Pane    — map side + minimalist form side
 *
 * Hero and Footer are NOT touched. This component is purely additive.
 * Aesthetic: dark-to-indigo base with glowing edges, subtle circuit
 * textures, line-art lucide icons, no raster assets.
 */

// ═══════════════════════════════════════════════════════════════
// Shared abstract background — circuit board + ambient glows
// ═══════════════════════════════════════════════════════════════
function SectionBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Circuit board SVG — full section */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M10 10 L110 10 M10 10 L10 110 M60 10 L60 60 L110 60 M10 60 L60 60 M60 60 L60 110" stroke="#8b5cf6" strokeWidth="1" fill="none" />
            <circle cx="10" cy="10" r="2" fill="#a855f7" />
            <circle cx="60" cy="60" r="2" fill="#a855f7" />
            <circle cx="110" cy="60" r="2" fill="#a855f7" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#circuit)" />
      </svg>

      {/* Ambient orbs */}
      <div className="absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full bg-indigo-500/15 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 h-[620px] w-[620px] rounded-full bg-violet-500/12 blur-[160px]" />
      <div className="absolute -bottom-48 left-1/4 h-[520px] w-[520px] rounded-full bg-purple-500/12 blur-[150px]" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 1. SERVICES BENTO GRID
// ═══════════════════════════════════════════════════════════════
function ServicesBento() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative py-20 md:py-24"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300 mb-4 backdrop-blur-sm">
            <Zap className="w-3 h-3" />
            What we do
          </span>
          <h2
            id="services-heading"
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-white leading-[1.05] tracking-tight mb-4"
          >
            Three services,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              one mission
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            AI tools that work for small businesses, education that makes
            sense for real people, and subscriptions that keep it all running.
          </p>
        </div>

        {/* Bento — 3 distinct cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto">

          {/* CARD 1 — AI BUSINESS SERVICES (spans 3) */}
          <article className="md:col-span-3 group relative rounded-3xl overflow-hidden">
            {/* Glow edge */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-400/40 via-violet-500/30 to-purple-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 lg:p-9 h-full border border-white/10">
              {/* Inner ambient glow */}
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />

              <div className="relative">
                {/* Stylized 3D illustration cluster */}
                <div className="relative h-44 mb-6 flex items-center justify-center">
                  {/* Central chatbot avatar */}
                  <div className="relative z-20 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(99,102,241,0.6)] rotate-[-4deg] border border-white/20">
                    <Bot className="w-10 h-10 text-white" strokeWidth={1.75} />
                  </div>
                  {/* Gears — top-left */}
                  <div className="absolute left-[8%] top-4 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-indigo-400/30 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.4)] rotate-[8deg] z-10">
                    <Settings className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
                  </div>
                  {/* Barbershop — bottom-left */}
                  <div className="absolute left-[18%] bottom-2 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-violet-400/40 shadow-[0_8px_24px_-6px_rgba(139,92,246,0.5)] rotate-[-6deg]">
                    <Scissors className="w-6 h-6 text-violet-300" strokeWidth={1.6} />
                  </div>
                  {/* Dental chair — top-right */}
                  <div className="absolute right-[12%] top-2 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/40 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.5)] rotate-[6deg]">
                    <Stethoscope className="w-6 h-6 text-purple-300" strokeWidth={1.6} />
                  </div>
                  {/* Workflow — bottom-right */}
                  <div className="absolute right-[6%] bottom-4 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-indigo-400/30 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.4)] rotate-[-10deg] z-10">
                    <Workflow className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-3">
                  <MessageSquare className="w-3 h-3" />
                  Service 01
                </div>
                <h3 className="text-2xl lg:text-[1.625rem] font-bold text-white leading-tight mb-3">
                  AI Business Services
                </h3>
                <p className="text-slate-300 text-[0.95rem] leading-relaxed mb-5">
                  AI receptionists, workflow automation, and customer engagement
                  tools tailored for small local service providers — barbershops,
                  dental offices, home services, and more.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "AI receptionist that books appointments 24/7",
                    "Workflow automation for billing & scheduling",
                    "Custom customer engagement tools",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/business"
                  className="inline-flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm font-semibold transition-colors"
                >
                  Explore AI Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* CARD 2 — CYBERSECURITY EDUCATION (spans 3) */}
          <article className="md:col-span-3 group relative rounded-3xl overflow-hidden">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-400/40 via-purple-500/30 to-fuchsia-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900/95 via-violet-950/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 lg:p-9 h-full border border-white/10">
              <div aria-hidden="true" className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative">
                <div className="relative h-44 mb-6 flex items-center justify-center">
                  {/* Central shield-lock */}
                  <div className="relative z-20 w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(139,92,246,0.6)] rotate-[4deg] border border-white/20">
                    <Shield className="w-10 h-10 text-white" strokeWidth={1.75} />
                    <Lock className="absolute w-5 h-5 text-white/90" strokeWidth={2} />
                  </div>
                  {/* Scam prevention */}
                  <div className="absolute left-[10%] top-4 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-violet-400/30 shadow-[0_10px_30px_-8px_rgba(139,92,246,0.4)] rotate-[-8deg] z-10">
                    <UserCheck className="w-7 h-7 text-violet-300" strokeWidth={1.5} />
                  </div>
                  {/* Password key */}
                  <div className="absolute right-[12%] top-2 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 backdrop-blur-sm flex items-center justify-center border border-purple-400/40 shadow-[0_8px_24px_-6px_rgba(168,85,247,0.5)] rotate-[8deg]">
                    <Lock className="w-6 h-6 text-purple-300" strokeWidth={1.6} />
                  </div>
                  {/* Identity */}
                  <div className="absolute left-[14%] bottom-2 w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 backdrop-blur-sm flex items-center justify-center border border-fuchsia-400/40 shadow-[0_8px_24px_-6px_rgba(217,70,239,0.5)] rotate-[-6deg]">
                    <Fingerprint className="w-6 h-6 text-fuchsia-300" strokeWidth={1.6} />
                  </div>
                  {/* Training heart */}
                  <div className="absolute right-[6%] bottom-4 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-violet-400/30 shadow-[0_10px_30px_-8px_rgba(139,92,246,0.4)] rotate-[10deg] z-10">
                    <Heart className="w-7 h-7 text-violet-300" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-[10px] font-bold uppercase tracking-wider text-violet-300 mb-3">
                  <Shield className="w-3 h-3" />
                  Service 02
                </div>
                <h3 className="text-2xl lg:text-[1.625rem] font-bold text-white leading-tight mb-3">
                  Cybersecurity Education
                </h3>
                <p className="text-slate-300 text-[0.95rem] leading-relaxed mb-5">
                  Hands-on training programs designed specifically for seniors
                  and non-technical users. No jargon, no shame, just practical
                  safety skills that stick.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Scam prevention workshops for seniors",
                    "Password security & identity protection",
                    "One-on-one family training sessions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/training"
                  className="inline-flex items-center gap-1.5 text-violet-300 hover:text-white text-sm font-semibold transition-colors"
                >
                  Browse Education
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>

          {/* CARD 3 — AI INSURANCE PLANS (spans 6 / full width) */}
          <article className="md:col-span-6 group relative rounded-3xl overflow-hidden">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-400/40 via-indigo-500/30 to-violet-500/40 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900/95 via-purple-950/90 to-indigo-950/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/10">
              <div aria-hidden="true" className="absolute -top-20 left-1/3 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl" />

              <div className="relative grid md:grid-cols-5 gap-8 items-center">
                {/* Illustration side */}
                <div className="md:col-span-2 relative h-52 md:h-56 flex items-center justify-center">
                  {/* Central server */}
                  <div className="relative z-20 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(168,85,247,0.6)] border border-white/20">
                    <Server className="w-12 h-12 text-white" strokeWidth={1.75} />
                  </div>
                  {/* Sync arrows — orbiting */}
                  <div className="absolute left-[5%] top-6 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-purple-400/30 shadow-[0_10px_30px_-8px_rgba(168,85,247,0.4)] rotate-[-12deg] z-10">
                    <RefreshCw className="w-7 h-7 text-purple-300" strokeWidth={1.5} />
                  </div>
                  {/* Headset */}
                  <div className="absolute right-[5%] top-2 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-indigo-400/30 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.4)] rotate-[10deg] z-10">
                    <HeadphonesIcon className="w-7 h-7 text-indigo-300" strokeWidth={1.5} />
                  </div>
                  {/* Small status bits */}
                  <div className="absolute left-[20%] bottom-2 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-violet-400/40 rotate-[6deg]">
                    <CheckCircle2 className="w-5 h-5 text-violet-300" strokeWidth={1.75} />
                  </div>
                  <div className="absolute right-[18%] bottom-4 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-indigo-400/40 rotate-[-4deg]">
                    <Zap className="w-5 h-5 text-indigo-300" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Content side */}
                <div className="md:col-span-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-3">
                    <Award className="w-3 h-3" />
                    Service 03
                  </div>
                  <h3 className="text-2xl lg:text-[1.75rem] font-bold text-white leading-tight mb-3">
                    AI Insurance Plans
                  </h3>
                  <p className="text-slate-300 text-[0.95rem] leading-relaxed mb-5 max-w-xl">
                    Monthly maintenance and support subscriptions that keep
                    your AI tools running, updated, and backed by real humans
                    who answer the phone.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Auto-updates", icon: RefreshCw },
                      { label: "24/7 Monitoring", icon: Server },
                      { label: "Live Support", icon: HeadphonesIcon },
                    ].map((item) => {
                      const I = item.icon;
                      return (
                        <div
                          key={item.label}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10"
                        >
                          <I className="w-4 h-4 text-purple-300 flex-shrink-0" strokeWidth={1.75} />
                          <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    to="/business"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 text-white text-sm font-bold tracking-wide shadow-[0_10px_30px_-6px_rgba(168,85,247,0.5)] hover:shadow-[0_16px_40px_-6px_rgba(168,85,247,0.65)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    See Plans
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. HOW IT WORKS — Vertical Circuit Timeline
// ═══════════════════════════════════════════════════════════════
const steps = [
  {
    n: "01",
    title: "We Listen",
    tagline: "Discovery & consultation",
    body:
      "We start with a conversation. Tell us how your business runs or how your family uses tech, and we map out exactly what's working and what's leaving you exposed.",
    icons: [Handshake, FileText, MessageSquare],
    color: "indigo",
  },
  {
    n: "02",
    title: "We Build",
    tagline: "Custom AI & training deployment",
    body:
      "Our team builds your custom AI tools, sets up your protections, and runs live training sessions — so the technology fits your life instead of the other way around.",
    icons: [Bot, Code2, Building2],
    color: "violet",
  },
  {
    n: "03",
    title: "We Support",
    tagline: "Ongoing maintenance",
    body:
      "Everything stays updated, monitored, and supported. When scams evolve, your defenses evolve with them — no action required from you.",
    icons: [Server, RefreshCw, HeadphonesIcon],
    color: "purple",
  },
];

const colorMap = {
  indigo: {
    ring: "border-indigo-400/60",
    bg: "from-indigo-500 to-indigo-700",
    glow: "shadow-[0_0_40px_-4px_rgba(99,102,241,0.6)]",
    text: "text-indigo-300",
    bar: "bg-gradient-to-b from-indigo-400 via-violet-500 to-transparent",
    softBg: "bg-indigo-500/10",
    border: "border-indigo-400/30",
  },
  violet: {
    ring: "border-violet-400/60",
    bg: "from-violet-500 to-violet-700",
    glow: "shadow-[0_0_40px_-4px_rgba(139,92,246,0.6)]",
    text: "text-violet-300",
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-transparent",
    softBg: "bg-violet-500/10",
    border: "border-violet-400/30",
  },
  purple: {
    ring: "border-purple-400/60",
    bg: "from-purple-500 to-purple-700",
    glow: "shadow-[0_0_40px_-4px_rgba(168,85,247,0.6)]",
    text: "text-purple-300",
    bar: "bg-gradient-to-b from-purple-400 via-indigo-500 to-transparent",
    softBg: "bg-purple-500/10",
    border: "border-purple-400/30",
  },
};

function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="relative py-20 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-[11px] font-bold uppercase tracking-[0.15em] text-violet-300 mb-4 backdrop-blur-sm">
            <Workflow className="w-3 h-3" />
            The process
          </span>
          <h2
            id="how-heading"
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-white leading-[1.05] tracking-tight mb-4"
          >
            How it{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Three steps. No jargon. A circuit of trust from first conversation
            to ongoing care.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central circuit spine — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-400/60 via-violet-500/60 to-purple-500/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-400/60 via-violet-500/60 to-purple-500/60 blur-sm" />
          </div>

          <ol className="space-y-14 lg:space-y-20">
            {steps.map((step, i) => {
              const c = colorMap[step.color as keyof typeof colorMap];
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={step.n}
                  className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-center"
                >
                  {/* LEFT slot */}
                  <div
                    className={`${
                      isLeft ? "lg:text-right lg:pr-4" : "lg:order-3 lg:pl-4"
                    }`}
                  >
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${c.softBg} border ${c.border} text-[10px] font-bold uppercase tracking-wider ${c.text} mb-3`}>
                      Step {step.n}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-2">
                      {step.title}
                    </h3>
                    <p className={`text-sm font-semibold ${c.text} mb-3 uppercase tracking-wide`}>
                      {step.tagline}
                    </p>
                    <p className="text-slate-300 text-[0.95rem] leading-relaxed max-w-md lg:inline-block">
                      {step.body}
                    </p>

                    {/* Icon trio */}
                    <div className={`flex items-center gap-3 mt-5 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}>
                      {step.icons.map((Icon, idx) => (
                        <div
                          key={idx}
                          className={`w-11 h-11 rounded-xl bg-white/[0.04] border ${c.border} flex items-center justify-center backdrop-blur-sm`}
                        >
                          <Icon className={`w-5 h-5 ${c.text}`} strokeWidth={1.75} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CENTER node */}
                  <div className="relative flex justify-center lg:order-2">
                    <div className="relative">
                      {/* Outer glow ring */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${c.bg} opacity-40 blur-xl scale-150`} />
                      {/* Main node */}
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center ${c.glow} border-2 ${c.ring}`}>
                        <span className="text-white font-black text-2xl tabular-nums">{step.n}</span>
                      </div>
                      {/* Tiny circuit dots around the node */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
                    </div>
                  </div>

                  {/* RIGHT slot (empty on the alternating side, keeps grid balanced) */}
                  <div className={`${isLeft ? "lg:order-3" : ""} hidden lg:block`} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// 3. ABOUT — Asymmetric Split Screen / Kettering Infographic
// ═══════════════════════════════════════════════════════════════
function AboutSplit() {
  return (
    <section aria-labelledby="about-heading" className="relative py-20 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">

          {/* LEFT — Kettering visual */}
          <div className="relative">
            {/* Outer glow halo */}
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-purple-500/20 blur-3xl" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.4)]">
              {/* Circuit texture */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.08]"
                viewBox="0 0 400 400"
                fill="none"
              >
                <defs>
                  <pattern id="about-circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M25 0 L25 25 L50 25 M0 25 L25 25 M25 25 L25 50" stroke="#a855f7" strokeWidth="0.5" />
                    <circle cx="25" cy="25" r="1.5" fill="#a855f7" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#about-circuit)" />
              </svg>

              <div className="relative p-10 min-h-[460px] flex flex-col">
                {/* Stylized Ohio map */}
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Glow blob for state shape */}
                  <svg
                    viewBox="0 0 320 240"
                    className="w-full max-w-[320px] drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="ohio-fill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
                      </linearGradient>
                      <linearGradient id="ohio-stroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                    {/* Simplified Ohio silhouette */}
                    <path
                      d="M 40 50 L 90 40 L 180 35 L 250 45 L 280 60 L 285 110 L 275 160 L 260 195 L 230 215 L 180 220 L 140 225 L 100 220 L 65 200 L 45 170 L 35 120 L 40 50 Z"
                      fill="url(#ohio-fill)"
                      stroke="url(#ohio-stroke)"
                      strokeWidth="1.5"
                    />
                    {/* Grid lines */}
                    <line x1="40" y1="100" x2="285" y2="100" stroke="#a855f7" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />
                    <line x1="40" y1="150" x2="285" y2="150" stroke="#a855f7" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />
                    <line x1="160" y1="35" x2="160" y2="225" stroke="#a855f7" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.5" />
                    {/* Kettering marker */}
                    <circle cx="135" cy="140" r="6" fill="#c084fc" />
                    <circle cx="135" cy="140" r="12" fill="none" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
                    <circle cx="135" cy="140" r="20" fill="none" stroke="#c084fc" strokeWidth="0.5" opacity="0.4" />
                  </svg>

                  {/* Map label */}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-200">
                      Kettering · Dayton Region
                    </span>
                  </div>
                </div>

                {/* Orbit icons — founder + compliance badges */}
                <div className="relative flex items-center justify-center gap-3 mt-4">
                  {[
                    { I: UserCheck, label: "Founder", c: "indigo" },
                    { I: Shield, label: "Cyber Analyst", c: "violet" },
                    { I: Heart, label: "HIPAA", c: "purple" },
                    { I: Award, label: "OSHA", c: "fuchsia" },
                  ].map((item) => {
                    const I = item.I;
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/15 flex items-center justify-center backdrop-blur-sm shadow-[0_8px_20px_-6px_rgba(139,92,246,0.3)]">
                          <I className="w-5 h-5 text-violet-300" strokeWidth={1.75} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — typography */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-[11px] font-bold uppercase tracking-[0.15em] text-purple-300 mb-5 backdrop-blur-sm">
              <MapPin className="w-3 h-3" />
              Based in Kettering, OH
            </span>
            <h2
              id="about-heading"
              className="text-[2rem] md:text-[2.5rem] lg:text-[2.875rem] font-bold text-white leading-[1.05] tracking-tight mb-5"
            >
              Built to make AI{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                accessible
              </span>{" "}
              and cybersecurity{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                understandable.
              </span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-5 max-w-xl">
              InVision Network was founded in Kettering, Ohio after the founders
              fell victim to a sophisticated scam themselves. That experience
              became the mission: every family and every small business in our
              community deserves enterprise-level protection without the
              enterprise complexity.
            </p>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
              Today our team combines cybersecurity analysts, healthcare
              professionals, and educators — operating under HIPAA and OSHA
              compliance standards to serve seniors, small businesses, and
              nonprofits across the Dayton region.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-7">
              {[
                { v: "100+", l: "Families protected" },
                { v: "5yr", l: "Security experience" },
                { v: "24/7", l: "Monitoring" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-xl font-black text-white leading-none tabular-nums mb-1">
                    {s.v}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-bold tracking-wide shadow-[0_10px_30px_-6px_rgba(99,102,241,0.45)] hover:shadow-[0_16px_40px_-6px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Our Full Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4. TESTIMONIALS — Masonry + Trust Bar
// ═══════════════════════════════════════════════════════════════
const testimonials = [
  {
    quote:
      "They set up our AI receptionist in three days and it's already handling more calls than we ever could. Our front desk actually has time to breathe now.",
    name: "Maria G.",
    role: "Owner, Maria's Family Salon",
    city: "Kettering, OH",
    avatar: "M",
    avatarColor: "from-indigo-500 to-violet-600",
    rating: 5,
  },
  {
    quote:
      "I used to be terrified every time my phone rang. After the workshop I feel like I can actually tell when something's fake — I even caught a deepfake call last week.",
    name: "Donald P.",
    role: "Retired Teacher",
    city: "Dayton, OH",
    avatar: "D",
    avatarColor: "from-violet-500 to-purple-600",
    rating: 5,
  },
  {
    quote:
      "Having their team on call is the best insurance we've ever bought. When our payroll email got spoofed they had us back up and protected in under an hour.",
    name: "Jennifer R.",
    role: "Practice Manager, Dental Group",
    city: "Beavercreek, OH",
    avatar: "J",
    avatarColor: "from-purple-500 to-fuchsia-600",
    rating: 5,
  },
];

const trustBadges = [
  { label: "HIPAA Compliant", I: Shield },
  { label: "OSHA Standards", I: Award },
  { label: "SOC 2 Ready", I: Lock },
  { label: "Dayton CofC", I: Building2 },
  { label: "Veteran Owned", I: Heart },
  { label: "BBB A+", I: CheckCircle2 },
];

function TestimonialsMasonry() {
  return (
    <section aria-labelledby="testimonials-heading" className="relative py-20 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-[11px] font-bold uppercase tracking-[0.15em] text-fuchsia-300 mb-4 backdrop-blur-sm">
            <Star className="w-3 h-3" />
            Social proof
          </span>
          <h2
            id="testimonials-heading"
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-white leading-[1.05] tracking-tight mb-4"
          >
            Loved by{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              the people we protect
            </span>
          </h2>
        </div>

        {/* Masonry — three offset cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`relative rounded-3xl p-7 lg:p-8 border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(99,102,241,0.3)] hover:shadow-[0_30px_80px_-20px_rgba(139,92,246,0.45)] transition-all duration-500 hover:-translate-y-1 ${
                i === 1 ? "md:mt-8" : ""
              }`}
            >
              {/* Glowing corner quote icon */}
              <div aria-hidden="true" className="absolute -top-3 -left-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(139,92,246,0.6)] border border-white/20">
                <Quote className="w-5 h-5 text-white" strokeWidth={2} />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4 mt-2">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <blockquote className="text-slate-200 text-[0.9375rem] lg:text-base leading-relaxed mb-6 italic font-light">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-base border border-white/20 shadow-lg`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} · {t.city}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust bar — low-opacity mono icons */}
        <div className="relative max-w-5xl mx-auto pt-10 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Certifications & local partnerships
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 opacity-70">
            {trustBadges.map((b) => {
              const I = b.I;
              return (
                <div
                  key={b.label}
                  className="flex items-center gap-2 text-slate-400 hover:text-violet-300 transition-colors"
                >
                  <I className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// 5. CONTACT — Dual-Pane Map + Form
// ═══════════════════════════════════════════════════════════════
function ContactDualPane() {
  return (
    <section aria-labelledby="contact-heading" className="relative py-20 md:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300 mb-4 backdrop-blur-sm">
            <Send className="w-3 h-3" />
            Get in touch
          </span>
          <h2
            id="contact-heading"
            className="text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-white leading-[1.05] tracking-tight mb-4"
          >
            Let&rsquo;s{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              start a conversation
            </span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Tell us what you&rsquo;re protecting and we&rsquo;ll map out the
            right plan. No pressure, no jargon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* LEFT — Map pane */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.4)]">
            {/* Circuit overlay */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full opacity-[0.1]"
              viewBox="0 0 400 400"
              fill="none"
            >
              <defs>
                <pattern id="contact-circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M25 0 L25 25 L50 25 M0 25 L25 25 M25 25 L25 50 M15 15 L35 15 L35 35 L15 35 Z" stroke="#818cf8" strokeWidth="0.5" fill="none" />
                  <circle cx="25" cy="25" r="1.5" fill="#c084fc" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#contact-circuit)" />
            </svg>

            {/* Ambient glow */}
            <div aria-hidden="true" className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative p-8 lg:p-10 min-h-[540px] flex flex-col">
              {/* Stylized map */}
              <div className="relative flex-1 flex items-center justify-center mb-6">
                <svg
                  viewBox="0 0 360 260"
                  className="w-full max-w-sm drop-shadow-[0_0_24px_rgba(139,92,246,0.5)]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="map-fill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#312e81" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {/* Grid */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={30 * (i + 1)}
                      x2="360"
                      y2={30 * (i + 1)}
                      stroke="#818cf8"
                      strokeWidth="0.4"
                      opacity="0.3"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={30 * (i + 1)}
                      y1="0"
                      x2={30 * (i + 1)}
                      y2="260"
                      stroke="#818cf8"
                      strokeWidth="0.4"
                      opacity="0.3"
                    />
                  ))}
                  {/* Roads */}
                  <path
                    d="M 30 130 Q 100 100 180 130 T 330 130"
                    stroke="#a5b4fc"
                    strokeWidth="2.5"
                    opacity="0.4"
                  />
                  <path
                    d="M 180 20 L 180 240"
                    stroke="#a5b4fc"
                    strokeWidth="2"
                    opacity="0.35"
                  />
                  <path
                    d="M 60 40 L 300 220"
                    stroke="#a5b4fc"
                    strokeWidth="1.5"
                    opacity="0.3"
                  />
                  {/* Parcels */}
                  <rect x="50" y="50" width="80" height="50" fill="url(#map-fill)" stroke="#818cf8" strokeWidth="0.6" opacity="0.6" />
                  <rect x="230" y="50" width="80" height="60" fill="url(#map-fill)" stroke="#818cf8" strokeWidth="0.6" opacity="0.6" />
                  <rect x="50" y="160" width="90" height="60" fill="url(#map-fill)" stroke="#818cf8" strokeWidth="0.6" opacity="0.6" />
                  <rect x="220" y="160" width="90" height="60" fill="url(#map-fill)" stroke="#818cf8" strokeWidth="0.6" opacity="0.6" />

                  {/* Location marker — Kettering */}
                  <circle cx="180" cy="130" r="24" fill="none" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
                  <circle cx="180" cy="130" r="14" fill="none" stroke="#c084fc" strokeWidth="1.2" opacity="0.55" />
                  <circle cx="180" cy="130" r="6" fill="#c084fc" />
                  {/* Pin stem */}
                  <path
                    d="M 180 130 L 180 90 M 180 90 L 170 70 Q 180 50 190 70 Z"
                    fill="#c084fc"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                  <circle cx="180" cy="62" r="4" fill="#fff" />
                </svg>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {[
                  { I: MapPin, label: "Office", value: "Kettering, OH 45429" },
                  { I: Mail, label: "Email", value: "hello@invisionnetwork.org" },
                  { I: Phone, label: "Phone", value: "(937)\u00A0301-8749" },
                ].map((item) => {
                  const I = item.I;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-400/30 flex items-center justify-center flex-shrink-0">
                        <I className="w-4 h-4 text-indigo-300" strokeWidth={1.75} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social row */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Follow
                </span>
                {[Facebook, Instagram, Linkedin, Twitter].map((I, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 hover:text-violet-300 hover:bg-white/10 hover:border-violet-400/40 transition-all"
                    aria-label={`Social link ${idx + 1}`}
                  >
                    <I className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form pane */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/95 via-violet-950/80 to-slate-900/95 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.4)]">
            <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl" />

            <form
              className="relative p-8 lg:p-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1.5">
                  Send us a message
                </h3>
                <p className="text-sm text-slate-400">
                  We respond within one business day.
                </p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="cf-name"
                    className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5"
                  >
                    Full name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition-all"
                  />
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cf-email"
                      className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-phone"
                      className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      placeholder="(937) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="cf-message"
                    className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    placeholder="Tell us a little about what you're protecting..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-violet-400/60 focus:bg-white/[0.08] transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-bold tracking-wide shadow-[0_10px_30px_-6px_rgba(139,92,246,0.5)] hover:shadow-[0_16px_40px_-6px_rgba(139,92,246,0.65)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>

              <p className="mt-4 text-[11px] text-center text-slate-500">
                This is a design placeholder — wire to your real handler when ready.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROOT EXPORT — wraps everything in a single dark themed container
// ═══════════════════════════════════════════════════════════════
export function HomeMiddleSections() {
  return (
    <section
      aria-label="Services, process, about, testimonials, and contact"
      className="relative isolate bg-gradient-to-b from-[#0a0a15] via-[#0f0a1f] to-[#0a0a15] text-white overflow-hidden"
    >
      <SectionBackdrop />
      <ServicesBento />
      <HowItWorks />
      <AboutSplit />
      <TestimonialsMasonry />
      <ContactDualPane />
    </section>
  );
}

export default HomeMiddleSections;

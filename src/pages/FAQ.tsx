import { useState, useMemo, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Phone,
  Mail,
  Send,
  HelpCircle,
  Bot,
  GraduationCap,
  Shield,
  Receipt,
  Server,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import { HeroCTA } from "@/components/shared/HeroCTA";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { SITE } from "@/config/site";

// ─── TYPES ──────────────────────────────────────────────────────
type FAQCategory =
  | "Getting Started"
  | "AI Business Services"
  | "Cybersecurity Education"
  | "AI Insurance & Support"
  | "Billing & Privacy";

interface FAQEntry {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

// ─── CONTENT (revised to match current project scope) ──────────
// Removed outdated Family Shield / access-link language.
// Aligned with the three core services: AI Business, Education,
// AI Insurance. Kept billing + privacy as a compact fifth bucket.
const faqs: FAQEntry[] = [
  // ══════════════════════════════════════════════════════════
  // Getting Started
  // ══════════════════════════════════════════════════════════
  {
    id: "gs-1",
    category: "Getting Started",
    question: "What does InVision Network actually do?",
    answer:
      "We do three things, all for real non-technical people and small local businesses. We build AI tools like AI receptionists and automation for small shops. We run cybersecurity education and hands-on workshops for seniors and families. And we sell AI Insurance plans — ongoing support subscriptions that keep your AI tools running, updated, and monitored.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "Where are you based and who do you serve?",
    answer:
      "We're based in Kettering, Ohio and we primarily serve the greater Dayton region. That said, most of our services — training sessions, AI deployments, and monitoring — are delivered online, so we work with families and businesses across the country.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "Do I need technical skills to work with you?",
    answer:
      "Not at all. Everything we build is designed for people who don't think of themselves as tech people. Every engagement includes onboarding, plain-English documentation, and a real human you can call when something doesn't make sense.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    question: "How long does it take to get started?",
    answer:
      "Most new clients have a first conversation within 24 hours. From there: education workshops can usually be booked within a week, AI tool deployments typically go live in 2–7 business days, and AI Insurance plans activate the same day you sign up.",
  },

  // ══════════════════════════════════════════════════════════
  // AI Business Services
  // ══════════════════════════════════════════════════════════
  {
    id: "ai-1",
    category: "AI Business Services",
    question: "What's included in your AI Business Services?",
    answer:
      "AI receptionists that answer calls and book appointments 24/7, workflow automation for billing and scheduling, customer engagement tools (review requests, follow-ups, reminders), and custom AI builds tailored to your specific business.",
  },
  {
    id: "ai-2",
    category: "AI Business Services",
    question: "Will the AI receptionist sound natural to my customers?",
    answer:
      "Yes. It's voice-tuned to sound warm and natural, uses your scripts, handles interruptions gracefully, and knows when to escalate to a real person on your team. Most callers don't realize it's AI until we tell them.",
  },
  {
    id: "ai-3",
    category: "AI Business Services",
    question: "Can your AI handle multiple calls at once?",
    answer:
      "Unlike human staff, our AI can handle unlimited simultaneous calls — so you never miss a customer during peak hours, evenings, or weekends.",
  },
  {
    id: "ai-4",
    category: "AI Business Services",
    question: "I already use ChatGPT. Do you work with existing AI tools?",
    answer:
      "Yes, we're vendor-agnostic. Whether you built something in-house, use ChatGPT or Claude, or bought from another provider, we can integrate with it, monitor it, and layer automation on top.",
  },

  // ══════════════════════════════════════════════════════════
  // Cybersecurity Education
  // ══════════════════════════════════════════════════════════
  {
    id: "edu-1",
    category: "Cybersecurity Education",
    question: "Who are your workshops designed for?",
    answer:
      "Seniors, families, non-technical professionals, and small teams. No jargon, no assumptions. Every session is trauma-informed — many of our attendees have already been targeted by a scam, and we treat them with the patience that deserves.",
  },
  {
    id: "edu-2",
    category: "Cybersecurity Education",
    question: "What topics do you cover?",
    answer:
      "Deepfake and voice-clone detection, AI-powered phishing, password and identity protection, safe online banking, romance and grief scams, Medicare and tax scams, and how to help an older relative without taking away their independence.",
  },
  {
    id: "edu-3",
    category: "Cybersecurity Education",
    question: "Do you offer in-person workshops?",
    answer:
      "Yes. We run in-person workshops throughout the Dayton and Columbus areas at senior centers, churches, community centers, and small businesses. Outside that region we offer live online workshops that stay highly interactive.",
  },
  {
    id: "edu-4",
    category: "Cybersecurity Education",
    question: "Can I book a private session for my family or team?",
    answer:
      "Absolutely. Private 1-on-1 or small-group sessions are available at a flat rate — great for families who want to walk a parent through their phone, or small businesses that want their whole team trained in one sitting.",
  },

  // ══════════════════════════════════════════════════════════
  // AI Insurance & Support
  // ══════════════════════════════════════════════════════════
  {
    id: "ins-1",
    category: "AI Insurance & Support",
    question: "What is an 'AI Insurance' plan?",
    answer:
      "It's a monthly subscription that keeps the AI tools we built for you running smoothly. We handle updates, security patches, performance monitoring, and respond when something breaks — so you never have to worry about your AI suddenly stopping working at the worst possible moment.",
  },
  {
    id: "ins-2",
    category: "AI Insurance & Support",
    question: "How fast do you respond when something goes wrong?",
    answer:
      "Critical issues (tool down, customer-facing outage): within 15 minutes, day or night. Non-critical issues: within 4 business hours. We also proactively catch about 95% of problems via monitoring before you ever notice them.",
  },
  {
    id: "ins-3",
    category: "AI Insurance & Support",
    question: "Can I reach a real person?",
    answer: `Yes — that's the whole point. You can email ${SITE.emails.support}, call ${SITE.phone.display}, or submit a ticket from your portal. Our support team is based in Kettering, not offshore.`,
  },
  {
    id: "ins-4",
    category: "AI Insurance & Support",
    question: "Do you offer discounts for nonprofits or veterans?",
    answer: `Yes. Veterans and first responders get ${SITE.veteranDiscountPercent}% off everything. Nonprofits and multi-service bundles can request custom pricing — contact us with details and we'll put together a quote.`,
  },

  // ══════════════════════════════════════════════════════════
  // Billing & Privacy
  // ══════════════════════════════════════════════════════════
  {
    id: "bp-1",
    category: "Billing & Privacy",
    question: "What payment methods do you accept?",
    answer:
      "Credit cards (Visa, Mastercard, Amex, Discover) and ACH bank transfer for monthly plans. For larger business engagements we also accept invoiced net-30 terms.",
  },
  {
    id: "bp-2",
    category: "Billing & Privacy",
    question: "Can I cancel anytime?",
    answer: `Yes. Individual and family plans cancel immediately with no penalties. Business services require 30 days' notice per contract. Every paid plan includes a ${SITE.moneyBackGuaranteeDays}-day money-back guarantee on your first charge.`,
  },
  {
    id: "bp-3",
    category: "Billing & Privacy",
    question: "How do you handle my personal data?",
    answer:
      "We never sell, rent, or share your data. Everything is encrypted in transit and at rest, stored in US data centers, and accessible only to staff who need it to deliver your service. You can request full deletion at any time and we'll complete it within 30 days.",
  },
  {
    id: "bp-4",
    category: "Billing & Privacy",
    question: "What happens to suspicious messages I submit for analysis?",
    answer:
      "Submitted messages are analyzed in an isolated environment. Personal information is redacted before analysis, the raw submission is deleted after 90 days unless you explicitly save it, and nothing is ever used to train external AI models.",
  },
];

// ─── CATEGORY METADATA ──────────────────────────────────────────
// All accents use the warm brand orange family — refined, not heavy.
const categoryMeta: Record<
  FAQCategory,
  { icon: typeof Bot; accent: string }
> = {
  "Getting Started": {
    icon: Sparkles,
    accent: "from-[#e07a55] to-[#d05f3a]",
  },
  "AI Business Services": {
    icon: Bot,
    accent: "from-[#ea8568] to-[#d96c4a]",
  },
  "Cybersecurity Education": {
    icon: GraduationCap,
    accent: "from-[#f39372] to-[#e07a55]",
  },
  "AI Insurance & Support": {
    icon: Server,
    accent: "from-[#fb923c] to-[#ea580c]",
  },
  "Billing & Privacy": {
    icon: Receipt,
    accent: "from-[#f97316] to-[#c2410c]",
  },
};

const categories: ("All" | FAQCategory)[] = [
  "All",
  "Getting Started",
  "AI Business Services",
  "Cybersecurity Education",
  "AI Insurance & Support",
  "Billing & Privacy",
];

// ─── COMPONENT ──────────────────────────────────────────────────
export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | FAQCategory>(
    "All",
  );
  const [askName, setAskName] = useState("");
  const [askEmail, setAskEmail] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    if (activeCategory !== "All") {
      filtered = filtered.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q),
      );
    }
    return filtered;
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: faqs.length };
    faqs.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!askName.trim() || !askEmail.trim() || !askQuestion.trim()) {
      toast.error("Please fill in every field so we can reply.");
      return;
    }
    setSubmitting(true);
    try {
      // Reuse the generic contact-submission edge function
      const { error } = await supabase.functions.invoke(
        "process-contact-form",
        {
          body: {
            name: askName,
            email: askEmail,
            subject: "FAQ — specific question",
            message: askQuestion,
            source: "faq-ask",
          },
        },
      );
      if (error) throw error;
      toast.success("Got it — we'll reply within 1 business day.");
      setAskName("");
      setAskEmail("");
      setAskQuestion("");
    } catch (err) {
      toast.error(err?.message || "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const faqHeroImages = PROFESSIONAL_HERO_IMAGES.faq;
  const faqStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 10).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    [],
  );

  return (
    <PageTransition variant="fade">
      <SEO
        title="Frequently Asked Questions"
        description="Answers about InVision Network's AI business services, cybersecurity education workshops, AI insurance plans, billing, and privacy — straight from our Kettering, Ohio team."
        keywords="FAQ, AI receptionist, cybersecurity education, AI insurance, Kettering Ohio"
        structuredData={faqStructuredData}
        breadcrumbs={[
          { name: "Home", url: "https://www.invisionnetwork.org/" },
          { name: "FAQ", url: "https://www.invisionnetwork.org/faq" },
        ]}
      />
      <Navigation overlay />

      <main>
        {/* ═══════════════════════════════════════════════════════
            HERO — untouched per design rules
            ═══════════════════════════════════════════════════ */}
        <div className="relative">
          <Hero
            backgroundImages={faqHeroImages}
            headline="Frequently Asked Questions"
            subheadline="Clear answers about our AI services, workshops, and support — no jargon, no runaround."
            overlay={true}
            showScrollIndicator={false}
          >
            <HeroCTA
              primaryText="Ask a Question"
              primaryHref="/contact"
              secondaryText="Contact Us"
              secondaryHref="/contact"
            />
          </Hero>
          <HeroFloatingStats />
        </div>

        {/* Spacer for floating stats bar */}
        <div className="hidden lg:block h-9" />
        <div className="lg:hidden h-4" />

        {/* ═══════════════════════════════════════════════════════
            REDESIGNED FAQ BODY — single compressed block with
            a 2-column glass layout (left: accordion, right: ask form).
            Aligned to the site plumb line: container mx-auto
            ═══════════════════════════════════════════════════ */}
        <section
          aria-labelledby="faq-main-heading"
          className="relative isolate py-7 md:py-10 overflow-hidden"
        >
          {/* Ambient backdrop orbs — warm coral / amber / peach
              Was teal + indigo + violet which fought the brand orange. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-32 -left-40 h-[480px] w-[480px] rounded-full bg-[#d96c4a]/15 blur-[140px]" />
            <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-amber-400/15 blur-[150px]" />
            <div className="absolute -bottom-40 left-1/3 h-[440px] w-[440px] rounded-full bg-orange-300/15 blur-[150px]" />
          </div>

          <div className="container mx-auto">
            {/* Section eyebrow + heading — refined warm orange accent */}
            <div className="max-w-3xl mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50/90 backdrop-blur border border-orange-200 shadow-sm mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-[#d96c4a]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8552f]">
                  Everything you wanted to ask
                </span>
              </div>
              <h2
                id="faq-main-heading"
                className="text-[2rem] md:text-[2.5rem] font-extrabold tracking-tight leading-[1.08] text-slate-900 mb-3"
              >
                Straight answers,{" "}
                <span className="bg-gradient-to-r from-[#d96c4a] via-[#e07a55] to-[#d05f3a] bg-clip-text text-transparent">
                  no runaround.
                </span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Most people get what they need in under a minute. If not, use
                the form on the right and we&rsquo;ll reply personally within one
                business day. You can also <Link to="/contact" className="text-primary hover:underline font-medium">reach out to us</Link> directly.
              </p>
            </div>

            {/* Two-column grid: accordion (lg:col-span-8) + sticky form (lg:col-span-4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
              {/* ─────────────────────────────────────────────
                  LEFT — search + categories + accordion
                  ───────────────────────────────────────── */}
              <div className="lg:col-span-8">
                {/* Search bar + category pills — grouped in one compact
                    glass panel so the whole filter UI takes minimal space */}
                <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.18)] p-4 md:p-5 mb-5">
                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search answers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-6 pr-6 h-7 text-sm rounded-xl border-slate-200 bg-white/80 focus-visible:border-[#d96c4a] focus-visible:ring-[#d96c4a]/20"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Category pills — horizontal scroll on mobile */}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat;
                      const count = categoryCounts[cat] || 0;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-gradient-to-b from-[#e07a55] to-[#d05f3a] text-white border border-[#b8552f] shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_12px_-2px_rgba(217,108,74,0.45)]"
                              : "bg-white/70 text-slate-700 border border-slate-200 hover:border-[#d96c4a]/50 hover:text-[#b8552f]"
                          }`}
                        >
                          {cat}
                          <span
                            className={`text-[10px] font-bold ${
                              isActive ? "text-white/80" : "text-slate-500"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results count — only when searching */}
                {searchQuery && (
                  <div className="mb-3 px-1">
                    <Badge variant="secondary" className="text-[11px]">
                      {filteredFAQs.length}{" "}
                      {filteredFAQs.length === 1 ? "result" : "results"}
                    </Badge>
                  </div>
                )}

                {/* Accordion — glass cards, compact.
                    When "All" is active + no search query, questions are
                    grouped by category with sticky subheadings so the list
                    doesn't read as one giant flat 30-row wall. */}
                <div ref={accordionRef}>
                  {filteredFAQs.length > 0 ? (
                    activeCategory === "All" && !searchQuery ? (
                      // Grouped rendering — one Accordion per category
                      <div className="space-y-5">
                        {(Object.keys(categoryMeta) as FAQCategory[])
                          .filter((cat) =>
                            filteredFAQs.some((f) => f.category === cat),
                          )
                          .map((cat) => {
                            const catFaqs = filteredFAQs.filter(
                              (f) => f.category === cat,
                            );
                            const meta = categoryMeta[cat];
                            const CatIcon = meta.icon;
                            return (
                              <section key={cat} aria-labelledby={`faq-cat-${cat}`}>
                                <header className="flex items-center gap-3 mb-3 px-1">
                                  <div
                                    className={`flex-shrink-0 w-6 h-6 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25),inset_0_1px_0_0_rgba(255,255,255,0.4)] border border-white/40`}
                                  >
                                    <CatIcon
                                      className="w-4 h-4 text-white"
                                      strokeWidth={2.25}
                                    />
                                  </div>
                                  <div className="flex items-baseline gap-2 min-w-0">
                                    <h3
                                      id={`faq-cat-${cat}`}
                                      className="text-[15px] font-bold text-slate-900 tracking-tight truncate"
                                    >
                                      {cat}
                                    </h3>
                                    <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                                      {catFaqs.length}
                                    </span>
                                  </div>
                                  <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-1" />
                                </header>
                                <Accordion
                                  type="single"
                                  collapsible
                                  className="space-y-2"
                                >
                                  {catFaqs.map((faq) => {
                                    const Icon = meta.icon;
                                    return (
                                      <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.15)] overflow-hidden data-[state=open]:shadow-[0_16px_40px_-14px_rgba(217,108,74,0.28)] data-[state=open]:border-[#d96c4a]/45 data-[state=open]:bg-gradient-to-br data-[state=open]:from-white/90 data-[state=open]:to-orange-50/70 transition-all duration-300"
                                      >
                                        <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                                          <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                                            <div
                                              className={`flex-shrink-0 w-5 h-5 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25),inset_0_1px_0_0_rgba(255,255,255,0.4)] border border-white/40`}
                                            >
                                              <Icon
                                                className="w-4 h-4 text-white"
                                                strokeWidth={2}
                                              />
                                            </div>
                                            <span className="font-semibold text-[15px] text-slate-900 leading-snug pr-3 group-hover:text-[#b8552f] transition-colors">
                                              {faq.question}
                                            </span>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-4 pb-4">
                                          <div className="pl-7">
                                            <p className="text-[14px] leading-relaxed text-slate-600 whitespace-pre-line">
                                              {faq.answer}
                                            </p>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    );
                                  })}
                                </Accordion>
                              </section>
                            );
                          })}
                      </div>
                    ) : (
                      // Flat rendering — filtered/search results
                      <Accordion type="single" collapsible className="space-y-2">
                        {filteredFAQs.map((faq) => {
                          const meta = categoryMeta[faq.category];
                          const Icon = meta.icon;
                          return (
                            <AccordionItem
                              key={faq.id}
                              value={faq.id}
                              className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.15)] overflow-hidden data-[state=open]:shadow-[0_16px_40px_-14px_rgba(217,108,74,0.28)] data-[state=open]:border-[#d96c4a]/45 data-[state=open]:bg-gradient-to-br data-[state=open]:from-white/90 data-[state=open]:to-orange-50/70 transition-all duration-300"
                            >
                              <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                                <div className="flex items-center gap-3 flex-1 text-left min-w-0">
                                  <div
                                    className={`flex-shrink-0 w-5 h-5 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25),inset_0_1px_0_0_rgba(255,255,255,0.4)] border border-white/40`}
                                  >
                                    <Icon
                                      className="w-4 h-4 text-white"
                                      strokeWidth={2}
                                    />
                                  </div>
                                  <span className="font-semibold text-[15px] text-slate-900 leading-snug pr-3 group-hover:text-[#b8552f] transition-colors">
                                    {faq.question}
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="pl-7">
                                  <p className="text-[14px] leading-relaxed text-slate-600 whitespace-pre-line">
                                    {faq.answer}
                                  </p>
                                  <div className="mt-3 flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-[10px] h-[18px] px-1.5 py-0 border-[#d96c4a]/35 text-[#b8552f] bg-orange-50/50"
                                    >
                                      {faq.category}
                                    </Badge>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    )
                  ) : (
                    <div className="rounded-2xl bg-white/75 backdrop-blur-xl border border-white/70 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.18)] p-5 text-center">
                      <Search className="w-6 h-6 mx-auto mb-3 text-slate-300" />
                      <h3 className="text-base font-semibold text-slate-900 mb-1">
                        No matches for that search
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Try a different keyword, or ask us directly using the
                        form.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("All");
                        }}
                        className="border-[#d96c4a]/40 text-[#b8552f] hover:bg-orange-50"
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  RIGHT — "Ask a specific question" form
                  + contact card. Sticky on desktop.
                  ───────────────────────────────────────── */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-16 space-y-4">
                  {/* Ask form card */}
                  <form
                    onSubmit={handleAskSubmit}
                    className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25),0_4px_16px_-4px_rgba(13,148,136,0.15)] p-5 overflow-hidden"
                  >
                    {/* Top hairline highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    />
                    {/* Per-card accent glow */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#d96c4a]/20 blur-3xl pointer-events-none"
                    />

                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-xl bg-gradient-to-b from-[#e07a55] to-[#d05f3a] border border-[#b8552f] flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(217,108,74,0.5),inset_0_1px_0_0_rgba(255,255,255,0.35)]">
                          <Sparkles className="w-4 h-4 text-white" strokeWidth={2} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-none">
                          Ask your own question
                        </h3>
                      </div>
                      <p className="text-[12px] text-slate-600 mb-3 ml-6">
                        We reply within 1 business day, from a real person in
                        Kettering. Or explore our <Link to="/training" className="text-primary hover:underline font-medium">training sessions</Link> and <Link to="/business" className="text-primary hover:underline font-medium">AI business tools</Link>.
                      </p>

                      <div className="space-y-2.5">
                        <Input
                          value={askName}
                          onChange={(e) => setAskName(e.target.value)}
                          placeholder="Your name"
                          className="h-6 text-sm rounded-lg border-slate-200 bg-white/90 focus-visible:border-[#d96c4a] focus-visible:ring-[#d96c4a]/20"
                          required
                        />
                        <Input
                          value={askEmail}
                          onChange={(e) => setAskEmail(e.target.value)}
                          type="email"
                          placeholder="Email address"
                          className="h-6 text-sm rounded-lg border-slate-200 bg-white/90 focus-visible:border-[#d96c4a] focus-visible:ring-[#d96c4a]/20"
                          required
                        />
                        <Textarea
                          value={askQuestion}
                          onChange={(e) => setAskQuestion(e.target.value)}
                          placeholder="What's your question?"
                          rows={4}
                          className="text-sm rounded-lg border-slate-200 bg-white/90 focus-visible:border-[#d96c4a] focus-visible:ring-[#d96c4a]/20 resize-none leading-snug"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full mt-3 h-6 text-sm rounded-xl text-white border border-[#b8552f] bg-gradient-to-b from-[#e07a55] to-[#d05f3a] hover:from-[#e88560] hover:to-[#d96847] shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_8px_20px_-6px_rgba(217,108,74,0.5)]"
                      >
                        {submitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            Send question
                            <Send className="w-3.5 h-3.5 ml-1.5" />
                          </>
                        )}
                      </Button>

                      <div className="mt-3 pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[10px] text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-[#d96c4a]" />
                        <span>No spam, no newsletters — just an answer.</span>
                      </div>
                    </div>
                  </form>

                  {/* Contact fallback card — warm cream with orange accents */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#fff9f4] via-[#fff2e8] to-[#fff9f4] p-5 shadow-[0_18px_44px_-18px_rgba(217,108,74,0.35),0_2px_8px_-2px_rgba(217,108,74,0.15)] border border-[#d96c4a]/25 overflow-hidden relative">
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#d96c4a]/25 blur-3xl pointer-events-none"
                    />
                    <div className="relative">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b8552f] mb-2">
                        Prefer to talk?
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-3 leading-tight">
                        We answer the phone.
                      </h4>

                      <div className="space-y-2">
                        <a
                          href={SITE.phone.tel}
                          className="flex items-center gap-2.5 text-sm text-slate-800 hover:text-[#b8552f] transition-colors group"
                        >
                          <div className="w-5 h-5 rounded-lg bg-white border border-[#d96c4a]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d96c4a]/10 group-hover:border-[#d96c4a]/45 transition-colors">
                            <Phone className="w-3.5 h-3.5 text-[#d96c4a]" />
                          </div>
                          <span className="font-semibold whitespace-nowrap">
                            {SITE.phone.display.replace(" ", "\u00A0")}
                          </span>
                        </a>
                        <a
                          href={`mailto:${SITE.emails.support}`}
                          className="flex items-center gap-2.5 text-sm text-slate-800 hover:text-[#b8552f] transition-colors group"
                        >
                          <div className="w-5 h-5 rounded-lg bg-white border border-[#d96c4a]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d96c4a]/10 group-hover:border-[#d96c4a]/45 transition-colors">
                            <Mail className="w-3.5 h-3.5 text-[#d96c4a]" />
                          </div>
                          <span className="font-semibold truncate">
                            {SITE.emails.support}
                          </span>
                        </a>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="mt-4 w-full h-6 text-xs rounded-lg bg-white border-[#d96c4a]/30 text-[#b8552f] hover:bg-[#d96c4a]/5 hover:border-[#d96c4a]/50"
                      >
                        <Link to="/contact">
                          Full contact page
                          <ArrowRight className="w-3 h-3 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}

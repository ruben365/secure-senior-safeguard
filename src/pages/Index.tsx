import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  MessageCircle,
  ShieldCheck,
  Siren,
  Sparkles,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { IntroductionSection } from "@/components/home/IntroductionSection";
import { AnimatedSection } from "@/components/AnimatedSection";

import CTASection from "@/components/CTASection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { SITE } from "@/config/site";

// Import critical above-the-fold sections directly (no lazy loading)
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import { TestimonialsShowcase } from "@/components/home/TestimonialsShowcase";
import { FeaturesShowcase } from "@/components/home/FeaturesShowcase";

// Lazy-load below-fold sections only
const SiteOrientationGrid = lazy(() => import("@/components/home/SiteOrientationGrid"));
const AiAnalysisCTA = lazy(() => import("@/components/home/AiAnalysisCTA").then(m => ({ default: m.AiAnalysisCTA })));
const LiveSecurityStats = lazy(() => import("@/components/home/LiveSecurityStats"));
const ScamAlertsSection = lazy(() => import("@/components/home/ScamAlertsSection").then(m => ({ default: m.ScamAlertsSection })));
const FamilyTrustSection = lazy(() => import("@/components/home/FamilyTrustSection").then(m => ({ default: m.FamilyTrustSection })));
const FAQPreview = lazy(() => import("@/components/home/FAQPreview").then(m => ({ default: m.FAQPreview })));
const CompellingCTA = lazy(() => import("@/components/home/CompellingCTA").then(m => ({ default: m.CompellingCTA })));
const ComparisonSection = lazy(() => import("@/components/home/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const QuickWinsSection = lazy(() => import("@/components/home/QuickWinsSection").then(m => ({ default: m.QuickWinsSection })));

// Loading skeleton for lazy sections
const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-96 bg-muted/20 rounded-3xl" />
  </div>
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionSkeleton />}>{children}</Suspense>
);

const quickStartCards = [
  {
    icon: ShieldCheck,
    label: "Family Protection",
    title: "Start Securing Devices Today",
    description:
      "Get guided setup, live monitoring, and scam prevention training in one plan.",
    to: "/training#pricing",
  },
  {
    icon: Brain,
    label: "AI Scanner",
    title: "Analyze Suspicious Messages",
    description:
      "Upload messages, files, or screenshots and get a clear risk verdict in seconds.",
    to: "/training/ai-analysis",
  },
  {
    icon: MessageCircle,
    label: "Expert Help",
    title: "Talk to a Security Specialist",
    description:
      "Ask questions directly and get practical next steps without technical jargon.",
    to: "/contact",
  },
];

const journeyLinks = [
  { label: "Step 1: Learn", href: "#intro" },
  { label: "Step 2: Compare", href: "#comparison" },
  { label: "Step 3: Monitor", href: "#alerts" },
  { label: "Step 4: Act", href: "#final-action" },
];

const Index = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const [enableStats, setEnableStats] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData =
      "connection" in navigator &&
      (
        navigator as Navigator & {
          connection?: { saveData?: boolean };
        }
      ).connection?.saveData;

    if (prefersReducedMotion || saveData) return;

    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEnableStats(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO {...PAGE_SEO.home} />
        <Navigation />

        <main>
          {/* Hero */}
          <section id="hero">
            <HeroHomepage />
          </section>

          {/* Quick Start Redesign (non-hero) */}
          <section id="quick-start" className="relative py-10 lg:py-14 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.14),transparent_48%),radial-gradient(circle_at_85%_80%,hsl(var(--accent)/0.12),transparent_50%)]" />
            <div className="center-container relative z-10">
              <AnimatedSection animation="fade-up">
                <div className="glass-heavy rounded-[2rem] p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Home Quick Start
                      </span>
                      <h2 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
                        Choose Your Next Step in Under 60 Seconds
                      </h2>
                      <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                        The hero stays the same. Everything below it is now organized so families can find protection,
                        guidance, and action paths faster.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500">
                      <Siren className="h-4 w-4" />
                      Active AI scam threats in Ohio
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {quickStartCards.map((card) => (
                      <Link
                        key={card.title}
                        to={card.to}
                        className="group rounded-2xl border border-border/50 bg-background/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
                      >
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                          <card.icon className="h-5 w-5 text-primary" />
                        </div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                          {card.label}
                        </p>
                        <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                          Open path <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {journeyLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="rounded-full border border-border/50 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Learn */}
          <div id="intro">
            <IntroductionSection />
          </div>

          <div id="navigation-paths">
            <LazySection><SiteOrientationGrid /></LazySection>
          </div>

          {/* Proof */}
          <div id="trust-proof">
            <TrustBadgesSection />
          </div>

          <div id="features">
            <FeaturesShowcase />
          </div>

          <section id="stats" ref={statsRef}>
            <AnimatedSection animation="fade-up">
              {enableStats ? (
                <Suspense fallback={<div className="min-h-[320px]" aria-hidden="true" />}>
                  <LiveSecurityStats />
                </Suspense>
              ) : (
                <div className="min-h-[320px]" aria-hidden="true" />
              )}
            </AnimatedSection>
          </section>

          <div id="stories">
            <TestimonialsShowcase />
          </div>

          <div id="quick-wins">
            <LazySection><QuickWinsSection /></LazySection>
          </div>

          <div id="comparison">
            <LazySection><ComparisonSection /></LazySection>
          </div>

          {/* Protection */}
          <section id="alerts">
            <AnimatedSection animation="fade-up">
              <LazySection>
                <ScamAlertsSection onSubmitThreat={() => setScamShieldOpen(true)} />
              </LazySection>
            </AnimatedSection>
          </section>

          <AnimatedSection animation="fade-up">
            <LazySection><AiAnalysisCTA /></LazySection>
          </AnimatedSection>

          <section id="trust">
            <AnimatedSection animation="fade-up">
              <LazySection><FamilyTrustSection /></LazySection>
            </AnimatedSection>
          </section>

          {/* Action */}
          <section id="faq">
            <AnimatedSection animation="fade-up">
              <LazySection><FAQPreview /></LazySection>
            </AnimatedSection>
          </section>

          <LazySection><CompellingCTA variant="secondary" /></LazySection>

          {/* Final CTA */}
          <section id="final-action">
            <AnimatedSection animation="scale-up">
            <CTASection
              headline="Join Our Protected Community"
              variant="image"
              backgroundImage={seniorCoupleActive}
            >
              <p className="text-lg text-white/90 mb-6">
                Join families across Ohio who live confidently, knowing they are
                protected from AI scams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                >
                  <Link to="/training#pricing" className="text-white">
                    Get Protected Today
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/business">Business Solutions</Link>
                </Button>
              </div>
              <p className="text-white/80 mt-4 text-sm">
                ✓ {SITE.veteranDiscountPercent}% Veteran Discount ✓ Privacy-First
                Practices ✓ {SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee
              </p>
            </CTASection>
            </AnimatedSection>
          </section>

          <Footer />

          <ScamShieldSubmission
            open={scamShieldOpen}
            onOpenChange={setScamShieldOpen}
          />
        </main>
      </div>
    </PageTransition>
  );
};
export default Index;

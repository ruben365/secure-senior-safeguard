import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

// Lazy-load below-fold sections
const SiteOrientationGrid = lazy(() => import("@/components/home/SiteOrientationGrid"));
const AiAnalysisCTA = lazy(() => import("@/components/home/AiAnalysisCTA").then(m => ({ default: m.AiAnalysisCTA })));
const LiveSecurityStats = lazy(() => import("@/components/home/LiveSecurityStats"));
const ScamAlertsSection = lazy(() => import("@/components/home/ScamAlertsSection").then(m => ({ default: m.ScamAlertsSection })));
const FamilyTrustSection = lazy(() => import("@/components/home/FamilyTrustSection").then(m => ({ default: m.FamilyTrustSection })));
const FAQPreview = lazy(() => import("@/components/home/FAQPreview").then(m => ({ default: m.FAQPreview })));
const TestimonialsShowcase = lazy(() => import("@/components/home/TestimonialsShowcase").then(m => ({ default: m.TestimonialsShowcase })));
const TrustBadgesSection = lazy(() => import("@/components/home/TrustBadgesSection").then(m => ({ default: m.TrustBadgesSection })));
const CompellingCTA = lazy(() => import("@/components/home/CompellingCTA").then(m => ({ default: m.CompellingCTA })));
const FeaturesShowcase = lazy(() => import("@/components/home/FeaturesShowcase").then(m => ({ default: m.FeaturesShowcase })));
const ComparisonSection = lazy(() => import("@/components/home/ComparisonSection").then(m => ({ default: m.ComparisonSection })));
const QuickWinsSection = lazy(() => import("@/components/home/QuickWinsSection").then(m => ({ default: m.QuickWinsSection })));

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

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

          {/* Introduction */}
          <section id="intro">
            <IntroductionSection />
          </section>

          {/* Live Stats */}
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

          {/* Trust Badges Section */}
          <LazySection><TrustBadgesSection /></LazySection>

          {/* Site Orientation Grid */}
          <LazySection><SiteOrientationGrid /></LazySection>

          {/* Testimonials Showcase */}
          <LazySection><TestimonialsShowcase /></LazySection>

          {/* Interactive Features Showcase */}
          <LazySection><FeaturesShowcase /></LazySection>

          {/* AI Analysis CTA */}
          <AnimatedSection animation="fade-up">
            <LazySection><AiAnalysisCTA /></LazySection>
          </AnimatedSection>

          {/* Quick Wins Timeline */}
          <LazySection><QuickWinsSection /></LazySection>

          {/* Mid-Page CTA - Secondary Variant */}
          <LazySection><CompellingCTA variant="secondary" /></LazySection>

          {/* Comparison Section */}
          <LazySection><ComparisonSection /></LazySection>

          {/* Scam Alerts */}
          <section id="alerts">
            <AnimatedSection animation="fade-up">
              <LazySection>
                <ScamAlertsSection onSubmitThreat={() => setScamShieldOpen(true)} />
              </LazySection>
            </AnimatedSection>
          </section>

          {/* Trust */}
          <section id="trust">
            <AnimatedSection animation="fade-up">
              <LazySection><FamilyTrustSection /></LazySection>
            </AnimatedSection>
          </section>

          {/* FAQ */}
          <AnimatedSection animation="fade-up">
            <LazySection><FAQPreview /></LazySection>
          </AnimatedSection>

          {/* Urgent CTA */}
          <LazySection><CompellingCTA variant="urgent" /></LazySection>

          {/* Final CTA */}
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

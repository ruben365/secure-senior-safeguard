import { lazy, Suspense, useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { SITE } from "@/config/site";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import SiteOrientationGrid from "@/components/home/SiteOrientationGrid";
import PromoStrip from "@/components/home/PromoStrip";
import { ThreatTicker } from "@/components/home/ThreatTicker";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { LiveSecurityStats } from "@/components/home/LiveSecurityStats";
import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
import { FamilyTrustSection } from "@/components/home/FamilyTrustSection";
import { ArrowRight, CheckCircle, Phone, Shield } from "lucide-react";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
  })),
);

const BlogPreview = lazy(() =>
  import("@/components/home/BlogPreview").then((m) => ({
    default: m.BlogPreview,
  })),
);

const NewsletterSection = lazy(() =>
  import("@/components/home/NewsletterSection").then((m) => ({
    default: m.NewsletterSection,
  })),
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-48" />}>{children}</Suspense>
);

const Index = forwardRef<HTMLDivElement>(function Index(_props, _ref) {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCtaVisible(true); observer.disconnect(); } },
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO {...PAGE_SEO.home} />
        <Navigation />

        <main>
          {/* 1. Hero */}
          <section id="hero">
            <HeroHomepage />
          </section>

          {/* 2. Exhibition Marquee Ticker */}
          <ThreatTicker />

          {/* 3. Why InVision Works + Content + Stats */}
          <div id="stats">
            <HomeIntroSection />
          </div>

          {/* 4. Live Security Command Center */}
          <div id="live-security">
            <LiveSecurityStats />
          </div>

          {/* 5. Services Grid - "Find Your Perfect Protection" */}
          <div id="services">
            <SiteOrientationGrid />
          </div>

          {/* 6. Protection Training Promo */}
          <div id="workshops">
            <WorkshopsPromo />
          </div>

          {/* 7. How It Works — Event List Style */}
          <div id="get-protected">
            <PromoStrip />
          </div>

          {/* 8. Family Trust Section */}
          <div id="trust">
            <FamilyTrustSection />
          </div>

          {/* 9. Testimonials */}
          <div id="testimonials">
            <TestimonialCarousel />
          </div>

          {/* 10. Why Choose Us */}
          <div id="why-us">
            <TrustBadgesSection />
          </div>

          {/* 11. Blog Preview */}
          <section id="blog">
            <LazySection>
              <BlogPreview />
            </LazySection>
          </section>

          {/* 12. FAQ */}
          <section id="faq">
            <LazySection>
              <FAQPreview />
            </LazySection>
          </section>

          {/* 13. Newsletter */}
          <section id="newsletter">
            <LazySection>
              <NewsletterSection />
            </LazySection>
          </section>

          {/* 14. Final CTA */}
          <section id="final-action" className="relative overflow-hidden" ref={ctaRef}>
            <div className="absolute inset-0">
              <img
                src={seniorCoupleActive}
                alt="Protected senior couple"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/60 to-foreground/40" />
            </div>

            <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 text-center relative z-10">
              <div
                className={`max-w-3xl mx-auto transition-all duration-500 ease-out ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight">
                  Start Protecting Your Family <span className="font-display italic">Today</span>
                </h2>
                <p className="text-base text-background/70 mb-10 max-w-xl mx-auto leading-relaxed">
                  Join families across Ohio who live confidently, knowing they are
                  protected from AI scams. Get started in minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button asChild size="lg" className="rounded-full h-12 px-8 bg-background text-foreground hover:bg-background/90 font-bold text-sm uppercase tracking-wider">
                    <Link to="/training#pricing">
                      Get Protected Today <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8 border-background/30 text-background hover:bg-background/10 font-semibold">
                    <Link to="/business">Business Solutions</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    `${SITE.veteranDiscountPercent}% Veteran Discount`,
                    "Privacy-First",
                    `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                    "24/7 Support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/10 border border-background/15">
                      <CheckCircle className="w-3.5 h-3.5 text-background/70" />
                      <span className="text-xs font-medium text-background/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
});
export default Index;

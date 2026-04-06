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
import SiteOrientationGrid from "@/components/home/SiteOrientationGrid";
import PromoStrip from "@/components/home/PromoStrip";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import { SectionDivider, MeshBackground } from "@/components/pro";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
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
        <main>
          <Navigation overlay />

          {/* 1. Hero */}
          <section id="hero" aria-label="Hero introduction">
            <HeroHomepage />
          </section>

          {/* 2. Who We Are + Real Results */}
          <div id="stats">
            <HomeIntroSection />
          </div>

          <SectionDivider variant="wave" color="background" />

          {/* 3. Services Grid */}
          <div id="services">
            <SiteOrientationGrid />
          </div>

          {/* 4. Protection Training Promo */}
          <div id="workshops">
            <WorkshopsPromo />
          </div>

          {/* 5. How It Works — 3 Steps */}
          <MeshBackground variant="vibrant">
            <div id="get-protected">
              <PromoStrip />
            </div>
          </MeshBackground>

          {/* 6. Testimonials */}
          <div id="testimonials">
            <TestimonialCarousel />
          </div>

          {/* 7. FAQ */}
          <section id="faq" className="bg-muted/20" aria-label="Frequently asked questions">
            <LazySection>
              <FAQPreview />
            </LazySection>
          </section>

          {/* 8. Newsletter */}
          <section id="newsletter">
            <LazySection>
              <NewsletterSection />
            </LazySection>
          </section>

          {/* 9. Final CTA */}
          <section id="final-action" className="relative overflow-hidden" ref={ctaRef} aria-label="Get started call to action">
            <div className="absolute inset-0">
              <img
                src={seniorCoupleActive}
                alt="Protected senior couple"
                className="w-full h-full object-cover brightness-[0.85] saturate-[0.9]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_18%_6%/0.8)] via-[hsl(260_14%_10%/0.55)] to-[hsl(260_10%_14%/0.3)]" />
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
              <div
                className={`max-w-3xl mx-auto transition-all duration-500 ease-out ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Protected Community
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                  Start Protecting Your Family Today
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
                  Join families across Ohio who live confidently, knowing they are
                  protected from AI scams. Get started in minutes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button asChild size="lg">
                    <Link to="/training#pricing">
                      Get Protected Today <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="heroOutline" size="lg">
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
                    <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                      <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-medium text-white/85">{item}</span>
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

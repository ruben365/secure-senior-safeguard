import { lazy, Suspense, useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import HomeStorySections from "@/components/home/HomeStorySections";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { AnswerSummary } from "@/components/AnswerSummary";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { SITE } from "@/config/site";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
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

          {/* 1. Hero — UNTOUCHED */}
          <section id="hero" aria-label="Hero introduction">
            <HeroHomepage />
          </section>

          {/* Color-wash wrapper — layered overlay of dark 10%, purple 10%,
              white 6%, brown 10%, yellow 7%, burgundy 6%, maroon 3%, red 1%.
              Hero and Footer sit OUTSIDE this wrapper so they stay untouched. */}
          {/* Answer summary — visible to users and AI search engines */}
          <AnswerSummary
            summary="InVision Network provides AI scam protection, cybersecurity training, and business automation for families and companies in Kettering, Dayton, and across Ohio. We stop deepfakes, phishing, and voice-clone scams before they reach you."
            ctaHref="/training"
            ctaLabel="Explore our workshops and protection plans"
            className="py-8"
          />

          <div className="home-color-wash relative isolate">

          {/* 2. Story sections */}
          <section
            id="story"
            aria-label="Who we are, what we offer, how we train you"
          >
            <HomeStorySections />
          </section>

          {/* 3. Testimonials + FAQ — clean container, no decorative noise */}
          <div className="relative">
            <div id="testimonials">
              <TestimonialCarousel />
            </div>

            <section
              id="faq"
              aria-label="Frequently asked questions"
            >
              <LazySection>
                <FAQPreview />
              </LazySection>
            </section>
          </div>

          {/* 9. Final CTA — full-bleed photo with text anchored left
              so the couple's faces stay visible on the right */}
          <section
            id="final-action"
            className="relative w-full overflow-hidden min-h-[600px] lg:min-h-[640px] flex items-center"
            ref={ctaRef}
            aria-label="Get started call to action"
          >
            {/* Full-bleed background photo, edge to edge */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={seniorCoupleActive}
                alt="Protected senior couple"
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] brightness-[0.95] saturate-[1.05] contrast-[1.05]"
                loading="lazy"
                decoding="async"
                width={1920}
                height={1080}
              />
              {/* Left-to-right gradient: dark on the left where the text
                  sits, fading to clear on the right where the faces are */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(260_18%_6%/0.92)] via-[hsl(260_18%_8%/0.55)] to-transparent" />
              {/* Subtle bottom vignette to seat the section */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(260_18%_6%/0.55)] to-transparent" />
            </div>

            {/* Text panel — anchored left, never centered */}
            <div className="relative z-10 w-full">
              <div className="container mx-auto px-6 lg:px-12 py-14 md:py-16 lg:py-20">
                <div
                  className={`max-w-xl transition-all duration-500 ease-out ${
                    ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-md mb-6 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]">
                    <Shield className="w-4 h-4 text-[#fbab8e]" strokeWidth={2.25} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                      Protected Community
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold text-white mb-5 leading-[1.1] tracking-tight">
                    Start Protecting Your Family Today
                  </h2>
                  <p className="text-base md:text-lg text-white/90 mb-8 max-w-md leading-relaxed">
                    Join families across Ohio who live confidently, knowing
                    they are protected from AI scams. Get started in minutes.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button asChild size="lg">
                      <Link to="/training#pricing">
                        Get Protected Today <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="heroPrimary" size="lg">
                      <Link to="/business">Business Solutions</Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {[
                      `${SITE.veteranDiscountPercent}% Veteran Discount`,
                      "Privacy-First",
                      `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                      "24/7 Support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#fbab8e]" />
                        <span className="text-xs font-medium text-white/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          </div>
          {/* /home-color-wash */}

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

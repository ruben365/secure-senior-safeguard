import { lazy, Suspense, useState, useRef, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import HomeStorySections from "@/components/home/HomeStorySections";
import EnterpriseBentoSection from "@/components/home/EnterpriseBentoSection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { AnswerSummary } from "@/components/AnswerSummary";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { SITE } from "@/config/site";
import { ArrowRight, CheckCircle, Shield, Mail, ExternalLink, Phone, Image as ImageScanIcon, Mic, MessageCircle, FileText, QrCode, UserCircle, KeyRound } from "lucide-react";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
  })),
);

const LatestArticles = lazy(() =>
  import("@/components/home/LatestArticles").then((m) => ({
    default: m.LatestArticles,
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
            className="pt-0 pb-0"
          />

          <div className="relative isolate">

          {/* 2. Story sections */}
          <section
            id="story"
            aria-label="Who we are, what we offer, how we train you"
            className="sec-rhythm-sm pt-6 md:pt-10"
          >
            <HomeStorySections />
          </section>

          {/* 2.5 Enterprise Bento */}
          <EnterpriseBentoSection />

          {/* 3. FAQ */}
          <div className="hss-root relative isolate bg-[#fdfaf8]">
            <section
              id="faq"
              aria-label="Frequently asked questions"
              className="relative z-10 sec-rhythm-md"
            >
              <LazySection>
                <FAQPreview />
              </LazySection>
            </section>
          </div>

          {/* 4. Latest Articles — only renders if DB has published articles */}
          <LazySection>
            <LatestArticles />
          </LazySection>

          {/* AI Security Scanning Suite */}
          <section
            id="ai-scanner"
            aria-label="AI Security Scanning Suite"
            className="relative py-16 md:py-24 bg-foreground overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground pointer-events-none" />
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-white/20 bg-white/10 text-white/80">
                  <Shield className="w-3.5 h-3.5 text-[#fbab8e]" />
                  Live AI Detection
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  AI Security Scanning Suite
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  10 specialized scanning modes to protect every corner of your digital life — email, phone, voice, images, documents, and more.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto mb-10">
                {[
                  { icon: Mail, title: "Email Scanner", desc: "Detect phishing attempts before they reach your inbox" },
                  { icon: ExternalLink, title: "Link Checker", desc: "Verify any link is safe before clicking" },
                  { icon: Phone, title: "Phone Lookup", desc: "Check if a caller is associated with known scams" },
                  { icon: ImageScanIcon, title: "Deepfake Detector", desc: "Spot AI-generated and manipulated images" },
                  { icon: Mic, title: "Voice Clone Detector", desc: "Verify if a voice recording is authentic or cloned" },
                  { icon: MessageCircle, title: "Message Analyzer", desc: "Scan SMS and social media messages for scam patterns" },
                  { icon: FileText, title: "Document Scanner", desc: "Check PDFs and documents for hidden threats" },
                  { icon: QrCode, title: "QR Code Scanner", desc: "Decode and verify QR codes before scanning" },
                  { icon: UserCircle, title: "Profile Checker", desc: "Identify fake accounts and catfish profiles" },
                  { icon: KeyRound, title: "Password Checker", desc: "Test your passwords against known breaches" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#fbab8e]" />
                    </div>
                    <h3 className="text-xs font-bold text-white mb-1 leading-tight">{title}</h3>
                    <p className="text-[11px] text-white/55 leading-snug hidden md:block">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/training/ai-analysis"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d96c4a] hover:bg-[#c25e3e] text-white font-semibold text-sm transition-colors duration-200 shadow-lg"
                >
                  Try Our AI Scanner <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

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
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(14,10,8,0.93)] via-[rgba(20,14,10,0.55)] to-transparent" />
              {/* Subtle bottom vignette to seat the section */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(14,10,8,0.55)] to-transparent" />
            </div>

            {/* Text panel — anchored left, never centered */}
            <div className="relative z-10 w-full">
              <div className="container mx-auto py-14 md:py-16 lg:py-20">
                <div
                  className={`max-w-xl transition-[opacity,transform] duration-500 ease-out ${
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

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-8">
                    <Button asChild size="lg" className="w-full max-w-[260px] sm:max-w-none sm:w-auto">
                      <Link to="/training#pricing">
                        Get Protected Today <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="heroOutline" size="lg" className="w-full max-w-[260px] sm:max-w-none sm:w-auto">
                      <Link to="/ai">Business AI Solutions</Link>
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

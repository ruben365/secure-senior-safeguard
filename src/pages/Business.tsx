import { useState, useCallback, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroBusiness } from "@/components/HeroBusiness";
import { PageTransition } from "@/components/PageTransition";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { SEO } from "@/components/SEO";
import { trackButtonClick } from "@/utils/analyticsTracker";

function Business() {
  const [heroInquiryOpen, setHeroInquiryOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const openStrategyCall = useCallback(() => {
    setHeroInquiryOpen(true);
    trackButtonClick("Book Strategy Call", "Business Hero");
  }, []);

  const resizeIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentWindow.document;
      const height = Math.max(
        doc.body?.scrollHeight ?? 0,
        doc.documentElement?.scrollHeight ?? 0,
      );
      if (height > 0) iframe.style.height = `${height}px`;
    } catch {
      // same-origin only; ignore if blocked
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const interval = window.setInterval(resizeIframe, 500);
    window.addEventListener("resize", resizeIframe);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resizeIframe);
    };
  }, [resizeIframe]);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Automation & Business Solutions — Kettering & Dayton, Ohio"
          description="Transform your Ohio business with AI receptionists, automated follow-ups, custom websites, and AI insurance. Your AI front desk runs 24/7 — never miss a call. Serving Kettering, Dayton, and Southwest Ohio."
          keywords="AI receptionist Ohio, business automation Kettering, AI answering service Dayton, virtual receptionist Southwest Ohio, small business AI"
          breadcrumbs={[
            { name: "Home", url: "https://www.invisionnetwork.org/" },
            { name: "AI Services", url: "https://www.invisionnetwork.org/ai" },
          ]}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Services",
            description: "Professional AI automation services",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "AI Receptionist & Virtual Intake Agent",
                description: "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
                provider: { "@type": "Organization", name: "InVision Network" },
                areaServed: { "@type": "State", name: "Ohio" },
                offers: { "@type": "Offer", price: "9500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 2,
                name: "AI Follow-Up Automation",
                description: "Automated lead nurturing, appointment reminders, and customer follow-up systems",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "12500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 3,
                name: "Custom AI Automation",
                description: "Enterprise-grade custom AI solutions tailored to your specific business needs",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "25000", priceCurrency: "USD" },
              },
            ],
          }} />

        <Navigation overlay />
        <HeroBusiness onStrategyCall={openStrategyCall} />
        <iframe
          ref={iframeRef}
          src="/ai-content.html"
          title="AI Services"
          className="w-full border-0 block"
          style={{ minHeight: "6000px", background: "#f7f6f3" }}
          onLoad={resizeIframe}
        />
        <Footer />

        <ServiceInquiryDialog
          open={heroInquiryOpen}
          onOpenChange={setHeroInquiryOpen}
          serviceName="Business Strategy Call"
          servicePrice={0}
          serviceTier="Consultation"
          serviceDescription="Book a paid strategy call ($199, credited toward your build). We map your goals, recommend the right AI setup, and outline a clear plan." />
      </div>
    </PageTransition>
  );
}

export default Business;

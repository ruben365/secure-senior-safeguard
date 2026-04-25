import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroBusiness } from "@/components/HeroBusiness";
import { PageTransition } from "@/components/PageTransition";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { SEO } from "@/components/SEO";
import { AIPageContent } from "@/components/business/AIPageContent";
import { trackButtonClick } from "@/utils/analyticsTracker";

function Business() {
  const [heroInquiryOpen, setHeroInquiryOpen] = useState(false);

  const openStrategyCall = useCallback(() => {
    setHeroInquiryOpen(true);
    trackButtonClick("Book Strategy Call", "Business Hero");
  }, []);

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
        <AIPageContent />
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

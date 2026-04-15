import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "@/config/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/AnimatedSection";

const faqs = [
  {
    question: "How does ScamShield AI protect me?",
    answer:
      "ScamShield uses AI to analyze incoming calls, texts, and emails in real time. When it detects suspicious patterns, known scam numbers, phishing language, or cloned voices, it alerts you and blocks the threat.",
  },
  {
    question: "Is my personal data safe with InVision Network?",
    answer:
      "Yes. We use encryption and never sell your data. As a veteran-supporting company, we take security personally. Your information is stored securely and only used to protect you from scams.",
  },
  {
    question: "What makes you different from other companies?",
    answer:
      "We are Ohio-based, veteran-supporting, and focused on protecting families and seniors from AI-powered scams. We provide education, support, and a personal relationship with every client.",
  },
  {
    question:
      "I want to protect my elderly parents who are not tech-savvy. Is this for them?",
    answer:
      "Yes. That is exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members.",
  },
];

export const FAQPreview = () => {
  return (
    <section
      className="relative z-10 py-14 md:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
          {/* Left sidebar */}
          <AnimatedSection
            animation="fade-up"
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <span className="hss-overline mb-4">
                <span className="hss-overline-dot" />
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1E293B] leading-[1.05] tracking-tight mb-3 mt-4"
              >
                Got questions?
              </h2>
              <p className="text-[#6B7280] text-base md:text-lg leading-relaxed">
                Protecting your family from scams is a big decision. Here is
                what you need to know.
              </p>
            </div>

            {/* Support card — warm soft tint */}
            <div className="hss-soft-tint rounded-3xl p-6 lg:p-7 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-1">
                <div className="hss-icon-tile w-10 h-10 rounded-xl">
                  <MessageCircle className="w-4 h-4" strokeWidth={2.25} />
                </div>
                <h3 className="font-bold text-[#1E293B] text-base">
                  Talk to a Human
                </h3>
              </div>
              <p className="text-[13px] text-[#6B7280] mb-5 ml-[3.25rem]">
                Real experts, not bots
              </p>
              <div className="flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#d96c4a] hover:bg-[#b8552f] text-white text-[14px] font-semibold transition-colors shadow-[0_4px_12px_-2px_rgba(217,108,74,0.4)]"
                >
                  Chat With Expert
                </Link>
                <a
                  href={`tel:${SITE.phone.e164}`}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-white hover:bg-[#1E293B]/[0.04] border border-[#1E293B]/12 hover:border-[#1E293B]/22 text-[#1E293B] text-[14px] font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Accordion */}
          <AnimatedSection
            animation="fade-up"
            delay={150}
            className="lg:col-span-3 space-y-3"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="hss-card rounded-2xl overflow-hidden border-0"
                >
                  <AccordionTrigger className="text-left font-bold text-[#1E293B] hover:no-underline px-6 py-5 [&[data-state=open]]:text-[#b8552f] [&>svg]:text-[#1E293B]/50">
                    <span className="flex items-center gap-4 pr-4">
                      <span className="hss-icon-tile w-9 h-9 rounded-xl text-[13px] font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-[15px] leading-snug">
                        {faq.question}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-[#6B7280] leading-relaxed pb-5 px-6 pl-[4.5rem]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center pt-4">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-[#d96c4a] hover:text-[#b8552f] transition-colors group"
              >
                View All FAQs
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

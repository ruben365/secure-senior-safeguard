import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ThumbsUp, ThumbsDown, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Family Shield
  {
    id: "fs-1",
    category: "Family Shield",
    question: "What is Family Shield?",
    answer: "Family Shield is our AI scam protection service that helps families identify and avoid sophisticated AI-powered scams like deepfake calls, fake texts, and phishing attempts.",
  },
  {
    id: "fs-2",
    category: "Family Shield",
    question: "How does the access link system work?",
    answer: "Instead of creating a password, you receive a unique secure link via email. Click the link anytime to access your personalized protection portal. Your link never expires as long as your subscription is active.",
  },
  {
    id: "fs-3",
    category: "Family Shield",
    question: "Can I share my access link with family members?",
    answer: "Your access link is for your household. While multiple people can use it, each person's activity is logged for security. For separate accounts with individual tracking, consider our Family Plan.",
  },
  {
    id: "fs-4",
    category: "Family Shield",
    question: "What happens if I lose my access link?",
    answer: "Simply email us at support@invisionnetwork.org and we'll resend your link immediately. You can also request a new link from your original confirmation email.",
  },
  {
    id: "fs-5",
    category: "Family Shield",
    question: "How do I submit a suspicious message or call?",
    answer: "Log into your portal using your access link, click 'Submit Suspicious Item,' and upload the message, voicemail, or screenshot. Our AI analyzes it within minutes and sends you a detailed report.",
  },
  {
    id: "fs-6",
    category: "Family Shield",
    question: "What's the difference between plans?",
    answer: "• Starter ($39/mo): Basic protection, submit items, monthly alerts\n• Family ($79/mo): Everything in Starter + family vault, video training\n• Premium ($129/mo): Everything + 24/7 support, personal consultations\n• Custom ($229+/mo): Tailored to your specific needs",
  },
  
  // Business Services
  {
    id: "bs-1",
    category: "Business Services",
    question: "What is an AI Receptionist?",
    answer: "Our AI Receptionist answers calls 24/7, books appointments, transfers calls, and handles common questions—all while sounding completely natural. It never sleeps, never takes breaks, and costs less than hiring staff.",
  },
  {
    id: "bs-2",
    category: "Business Services",
    question: "How long does setup take?",
    answer: "Most clients are up and running within 48-72 hours. We handle everything: system configuration, voice training, script development, and testing.",
  },
  {
    id: "bs-3",
    category: "Business Services",
    question: "Can the AI Receptionist handle multiple calls at once?",
    answer: "Yes! Unlike human staff, our AI can handle unlimited simultaneous calls. No more busy signals or missed opportunities.",
  },
  {
    id: "bs-4",
    category: "Business Services",
    question: "What if a caller needs a real person?",
    answer: "The AI seamlessly transfers to your team when needed. You can set custom rules for when to transfer (complex questions, VIP callers, emergencies).",
  },
  {
    id: "bs-5",
    category: "Business Services",
    question: "How much does an AI Receptionist cost?",
    answer: "Setup: $9,500 one-time. Monthly: starting at $299/month. Includes unlimited calls, 24/7 operation, ongoing updates, and support.",
  },
  
  // AI Insurance
  {
    id: "ai-1",
    category: "AI Insurance",
    question: "What does AI Insurance cover?",
    answer: "We monitor, maintain, and protect your AI systems (chatbots, automation, customer service AI). We handle updates, security patches, performance monitoring, and instant issue resolution.",
  },
  {
    id: "ai-2",
    category: "AI Insurance",
    question: "I already have AI—can you insure it?",
    answer: "Yes! We're vendor-agnostic. Whether you built it in-house, use ChatGPT, or bought from another provider, we can protect it.",
  },
  {
    id: "ai-3",
    category: "AI Insurance",
    question: "What's included in monitoring?",
    answer: "24/7 uptime monitoring, performance tracking, security scans, automatic updates, error alerts, and monthly health reports.",
  },
  {
    id: "ai-4",
    category: "AI Insurance",
    question: "How fast do you respond to issues?",
    answer: "Critical issues: within 15 minutes. Non-critical: within 4 hours. We proactively catch 95% of issues before they affect your users.",
  },
  
  // Billing & Pricing
  {
    id: "bp-1",
    category: "Billing & Pricing",
    question: "What payment methods do you accept?",
    answer: "Credit cards (Visa, Mastercard, Amex, Discover), ACH bank transfer, and for businesses: invoicing with net-30 terms.",
  },
  {
    id: "bp-2",
    category: "Billing & Pricing",
    question: "Can I cancel anytime?",
    answer: "Yes! Individual/family plans: cancel anytime, no penalties. Business services: 30-day notice required (in contract). We'll process your cancellation and provide any final reports.",
  },
  {
    id: "bp-3",
    category: "Billing & Pricing",
    question: "Do you offer refunds?",
    answer: "Individual plans: 30-day money-back guarantee. Business services: custom terms in contract. If you're not satisfied, we'll work to make it right.",
  },
  {
    id: "bp-4",
    category: "Billing & Pricing",
    question: "Are there setup fees?",
    answer: "Family Shield: No setup fees. AI Receptionist: $9,500 setup (one-time). Websites: varies by scope. AI Insurance: no setup fee.",
  },
  {
    id: "bp-5",
    category: "Billing & Pricing",
    question: "Do you offer discounts?",
    answer: "Yes! Veterans: 10% off everything. Cancer patients: 25% off. Churches/nonprofits: custom pricing. Bundled services: save 15%.",
  },
  
  // Technical Support
  {
    id: "ts-1",
    category: "Technical Support",
    question: "What are your support hours?",
    answer: "Email support: 24/7 (respond within 4 hours). Phone support: Mon-Fri 9am-6pm EST, Sat 10am-3pm. Premium clients: 24/7 priority support.",
  },
  {
    id: "ts-2",
    category: "Technical Support",
    question: "How do I contact support?",
    answer: "Email: support@invisionnetwork.org, Phone: (937) 555-0199, Live chat: on our website, or submit ticket through your portal.",
  },
  {
    id: "ts-3",
    category: "Technical Support",
    question: "Do you offer training?",
    answer: "Yes! All business clients receive free onboarding training. Family Shield Premium includes video training library. Custom training sessions available.",
  },
  
  // Account & Access
  {
    id: "aa-1",
    category: "Account & Access",
    question: "How do I access my portal?",
    answer: "Business clients: Log in at invisionnetwork.org/login with your email and password. Individual clients: Use your unique access link (sent via email).",
  },
  {
    id: "aa-2",
    category: "Account & Access",
    question: "I forgot my password—what do I do?",
    answer: "Click 'Forgot Password' on the login page. We'll email you a reset link. For access link users: email us to resend your link.",
  },
  {
    id: "aa-3",
    category: "Account & Access",
    question: "Can I update my payment method?",
    answer: "Yes! Log into your portal, go to Billing, click 'Update Payment Method,' and enter new card details. Changes take effect immediately.",
  },
  {
    id: "aa-4",
    category: "Account & Access",
    question: "How do I upgrade my plan?",
    answer: "Log into your portal, go to Plan & Billing, click 'Upgrade,' choose new plan. Changes take effect immediately, and we'll prorate the difference.",
  },
];

const categories = [
  "All Questions",
  "Family Shield",
  "Business Services",
  "AI Insurance",
  "Billing & Pricing",
  "Technical Support",
  "Account & Access",
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (activeCategory !== "All Questions") {
      filtered = filtered.filter((faq) => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  const handleHelpful = (faqId: string, isHelpful: boolean) => {
    setHelpfulVotes((prev) => ({ ...prev, [faqId]: isHelpful }));
    toast.success(
      isHelpful
        ? "Thanks for your feedback!"
        : "We'll work on improving this answer."
    );
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about InVision Network's AI scam protection, business services, billing, and technical support."
        keywords="FAQ, questions, support, help, InVision Network"
      />
      <Navigation />
      <main id="main-content">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <ScrollRevealSection>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  Find answers to common questions about our services
                </p>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-14 text-lg"
                    aria-label="Search frequently asked questions"
                  />
                </div>

                {searchQuery && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="whitespace-nowrap flex-shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <ScrollRevealSection key={faq.id}>
                      <Card className="overflow-hidden">
                        <AccordionItem value={faq.id} className="border-none">
                          <AccordionTrigger className="px-6 py-4 text-left hover:bg-muted/50 transition-colors text-lg font-semibold hover:no-underline">
                            <span className="pr-4">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <div className="pt-2 space-y-4">
                              <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                                {faq.answer}
                              </p>

                              {/* Was this helpful? */}
                              <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <span className="text-sm text-muted-foreground">
                                  Was this helpful?
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    variant={
                                      helpfulVotes[faq.id] === true
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => handleHelpful(faq.id, true)}
                                    className="gap-2"
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    Yes
                                  </Button>
                                  <Button
                                    variant={
                                      helpfulVotes[faq.id] === false
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => handleHelpful(faq.id, false)}
                                    className="gap-2"
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    No
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Card>
                    </ScrollRevealSection>
                  ))}
                </Accordion>
              ) : (
                <Card className="p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or browse all categories
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("All Questions");
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto px-4">
            <ScrollRevealSection>
              <Card className="max-w-2xl mx-auto p-8 sm:p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Didn't find what you need? Our support team is here to help.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="gap-2">
                    <a href="/contact">
                      <MessageCircle className="w-5 h-5" />
                      Contact Support
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2">
                    <a href="tel:9375550199">
                      <Phone className="w-5 h-5" />
                      Call (937) 555-0199
                    </a>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Support Hours:</strong><br />
                    Email: 24/7 • Phone: Mon-Fri 9am-6pm EST
                  </p>
                </div>
              </Card>
            </ScrollRevealSection>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

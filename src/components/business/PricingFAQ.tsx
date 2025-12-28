import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  title?: string;
  faqs: FAQItem[];
}

function PricingFAQ({ title = "Frequently Asked Questions", faqs }: PricingFAQProps) {
  return (
    <Card className="p-8 mt-12 bg-card/50 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

export const AI_AGENT_FAQS: FAQItem[] = [
  {
    question: "What's included in the one-time price?",
    answer: "The price includes full design, development, training, testing, and 30 days of optimization. After that, you own the agent. Optional ongoing maintenance is available through our AI Service Insurance plans."
  },
  {
    question: "How long does implementation take?",
    answer: "Most AI agents are live within 2-4 weeks depending on complexity. Simple receptionist agents can be ready in as little as 2 weeks. Complex multi-system integrations may take 4-6 weeks."
  },
  {
    question: "Do I need technical knowledge to use the AI agent?",
    answer: "No. We handle all the technical setup and provide a simple dashboard for monitoring. You just review the agent's work and make adjustments through an easy interface."
  },
  {
    question: "What if the AI makes mistakes?",
    answer: "All agents come with 30 days of optimization where we fine-tune responses. We also recommend human review for critical decisions and offer AI Service Insurance for ongoing monitoring and fixes."
  },
  {
    question: "Can I integrate with my existing tools?",
    answer: "Yes. We integrate with most popular CRMs (Salesforce, HubSpot), calendars (Calendly, Google Calendar), and communication tools. Custom integrations are available in the Enterprise tier."
  }
];

export const WEBSITE_FAQS: FAQItem[] = [
  {
    question: "How long does website development take?",
    answer: "Landing pages: 1-2 weeks. Business websites: 3-4 weeks. E-commerce sites: 4-6 weeks. Timelines depend on content readiness and revision rounds."
  },
  {
    question: "Do I own the website after it's built?",
    answer: "Yes, you own 100% of the website, design, and code. We can host it for you or transfer to your preferred hosting provider."
  },
  {
    question: "What do I need to provide?",
    answer: "Content (text, images, logo) and feedback during revisions. We can help with content writing and logo design as add-on services."
  },
  {
    question: "Is hosting included?",
    answer: "Yes! Business websites include 3 months of hosting, and e-commerce includes 6 months. After that, hosting is $29-99/month depending on your needs."
  },
  {
    question: "Can you add AI features to my website?",
    answer: "Absolutely. We offer AI chatbot integration as an add-on ($1,200) that can handle customer questions, book appointments, and capture leads 24/7."
  }
];

export const INSURANCE_FAQS: FAQItem[] = [
  {
    question: "What does AI Service Insurance cover?",
    answer: "Monitoring, maintenance, security updates, bug fixes, performance optimization, and technical support for your AI systems - regardless of where you purchased them."
  },
  {
    question: "Can you support AI tools I bought elsewhere?",
    answer: "Yes! We're vendor-agnostic. Whether you built it yourself, hired another agency, or use a SaaS platform, we can maintain and optimize it."
  },
  {
    question: "What's the difference between plans?",
    answer: "Basic: Monthly checks and email support. Standard: Weekly checks, phone support, and minor fixes. Premium: 24/7 monitoring, dedicated engineer, and faster response times."
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. Pay monthly and cancel anytime. Annual plans offer 10% savings but you can still cancel with a prorated refund."
  },
  {
    question: "What's the response time for issues?",
    answer: "Basic: 48 hours. Standard: 24 hours. Premium: 4 hours for critical issues. Enterprise: Custom SLA based on your needs."
  }
];

export default PricingFAQ;

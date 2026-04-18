import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingCalendar from "@/components/BookingCalendar";
import {
  Shield,
  Users,
  Briefcase,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";

const plans = [
  {
    icon: Shield,
    name: "ScamShield Protection",
    price: "Starting at $79/mo",
    description: "Real-time AI scam monitoring and alerts for your family.",
    features: [
      "Real-time scam monitoring",
      "Instant threat alerts",
      "Family dashboard",
      "Monthly security reports",
      "Email & phone support",
    ],
    cta: "Get Protected",
    highlight: true,
  },
  {
    icon: Users,
    name: "Workshops",
    price: "Starting at $89/session",
    description: "Hands-on scam prevention training for seniors and families.",
    features: [
      "In-person or Zoom",
      "Senior-friendly curriculum",
      "Group discounts available",
      "Take-home resources",
      "Q&A with security experts",
    ],
    cta: "Book a Workshop",
    highlight: false,
  },
  {
    icon: Briefcase,
    name: "Business Consulting",
    price: "Custom pricing",
    description: "Comprehensive cybersecurity solutions for your organization.",
    features: [
      "Security audits",
      "AI automation consulting",
      "Employee training programs",
      "Ongoing monitoring",
      "Dedicated account manager",
    ],
    cta: "Get a Quote",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <SEO
        title={PAGE_SEO.pricing.title}
        description={PAGE_SEO.pricing.description}
        keywords={PAGE_SEO.pricing.keywords}
        structuredData={PAGE_SEO.pricing.structuredData}
        breadcrumbs={PAGE_SEO.pricing.breadcrumbs as Array<{ name: string; url: string }>}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-16 overflow-hidden text-center">
        {/* Subtle warm background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5] via-background to-background pointer-events-none" />
        {/* Decorative glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d96c4a]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-4 bg-[#d96c4a]/10 text-[#c45e3b] border-[#d96c4a]/20 font-semibold tracking-wide">Simple, Transparent Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08]">
            Protection Plans<br className="hidden sm:block" /> for Every Need
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether you're protecting your family, hosting a workshop, or securing your business — we have a plan for you.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <Award className="w-4 h-4 text-[#d96c4a]" />
              10% veteran discount
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <Star className="w-4 h-4 text-[#d96c4a]" />
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                    plan.highlight
                      ? "border-[#d96c4a]/40 shadow-xl shadow-[#d96c4a]/10 bg-gradient-to-b from-[#fff7f4] to-white ring-1 ring-[#d96c4a]/15 hover:-translate-y-1"
                      : "border-border bg-card shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  }`}
                >
                  {plan.highlight && (
                    <Badge className="w-fit mb-4 bg-[#d96c4a] text-white border-0">Most Popular</Badge>
                  )}
                  <div className="mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${plan.highlight ? "bg-[#d96c4a]/10 border border-[#d96c4a]/20" : "bg-primary/10"}`}>
                      <Icon className={`w-6 h-6 ${plan.highlight ? "text-[#d96c4a]" : "text-primary"}`} />
                    </div>
                    <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                    <p className="text-3xl font-bold text-foreground mb-2">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-[#d96c4a]" : "text-primary"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" variant={plan.highlight ? "default" : "outline"}>
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Veteran Discount + Guarantee */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <Award className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Veteran Discount — 10% Off</h3>
              <p className="text-sm text-muted-foreground">
                We proudly support those who served. Active duty military and veterans receive 10% off all plans. Contact us to verify and apply your discount.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <Star className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-semibold mb-1">30-Day Money-Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not satisfied in the first 30 days? We'll refund you — no questions asked. Your trust matters more than the sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingCalendar />

      <Footer />
    </div>
  );
}

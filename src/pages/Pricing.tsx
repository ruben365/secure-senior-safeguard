import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
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
        title="Pricing — AI Scam Protection Plans | InVision Network"
        description="Transparent pricing for AI scam protection, cybersecurity workshops, and business consulting. 10% veteran discount. 30-day money-back guarantee."
      />
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Badge className="mb-4">Simple, Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Protection Plans for Every Need
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Whether you're protecting your family, hosting a workshop, or securing your business — we have a plan for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-primary" />
              10% veteran discount
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary" />
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-8 flex flex-col ${
                    plan.highlight
                      ? "border-primary shadow-lg shadow-primary/10 bg-primary/5 dark:bg-primary/10"
                      : "border-gray-200 bg-white shadow-sm"
                  }`}
                >
                  {plan.highlight && (
                    <Badge className="w-fit mb-4 bg-primary text-white">Most Popular</Badge>
                  )}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                    <p className="text-3xl font-bold text-foreground mb-2">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className={plan.highlight ? "bg-primary hover:bg-primary/90 text-white" : ""} variant={plan.highlight ? "default" : "outline"}>
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-left">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <Award className="w-7 h-7 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Veteran Discount — 10% Off</h3>
              <p className="text-sm text-muted-foreground">
                We proudly support those who served. Active duty military and veterans receive 10% off all plans. Contact us to verify and apply your discount.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
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

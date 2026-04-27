import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  RefreshCw,
  Lock,
  HeadphonesIcon,
  Server,
  CheckCircle2,
  ArrowRight,
  Star,
  AlertTriangle,
  Zap,
} from "lucide-react";

const WebsiteInsurance = () => {
  const plans = [
    {
      name: "Essential",
      price: "$39",
      discountedPrice: "$35.10",
      couponCode: "Na9r2ncn",
      period: "/month",
      description: "Basic protection for small websites",
      features: [
        "Daily backups",
        "SSL certificate monitoring",
        "Uptime monitoring",
        "Email support",
        "Monthly security scans",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      discountedPrice: null,
      couponCode: null,
      period: "/month",
      description: "Complete protection for business sites",
      features: [
        "Everything in Essential",
        "Real-time backups",
        "Malware removal",
        "Performance monitoring",
        "Priority support",
        "Weekly security scans",
        "1-hour response time",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      discountedPrice: null,
      couponCode: null,
      period: "/month",
      description: "Maximum protection for critical sites",
      features: [
        "Everything in Professional",
        "24/7 active monitoring",
        "DDoS protection",
        "WAF (Web Application Firewall)",
        "Instant malware removal",
        "Daily security scans",
        "15-minute response time",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ];

  const coverage = [
    {
      icon: RefreshCw,
      title: "Automatic Backups",
      description:
        "Your site is backed up automatically so you never lose data. Restore with one click.",
    },
    {
      icon: Lock,
      title: "Security Monitoring",
      description:
        "24/7 scanning for malware, vulnerabilities, and suspicious activity.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Speed monitoring and optimization to keep your site fast and responsive.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description:
        "Real humans ready to help when something goes wrong. Not bots.",
    },
    {
      icon: Server,
      title: "Uptime Guarantee",
      description:
        "99.9% uptime guarantee with instant alerts if your site goes down.",
    },
    {
      icon: Shield,
      title: "Hack Recovery",
      description:
        "If your site gets hacked, we clean it up and secure it. Guaranteed.",
    },
  ];

  const risks = [
    "47% of small business websites have been hacked in the past year",
    "Average cost of website downtime: $5,600 per minute",
    "60% of small businesses close within 6 months of a cyber attack",
    "Malware can remain undetected for an average of 287 days",
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO
          title="Website Insurance & Protection Plans"
          description="Protect your website from hackers, malware, and downtime. Website insurance plans starting at $39/month. Daily backups, security monitoring, and expert support."
          keywords="website insurance, website security, malware protection, website backup, DDoS protection, website monitoring Dayton Ohio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Website Insurance & Protection",
            description:
              "Comprehensive website protection including backups, security monitoring, and hack recovery",
            provider: {
              "@type": "Organization",
              name: "InVision Network",
            },
            areaServed: "United States",
            offers: [
              {
                "@type": "Offer",
                name: "Essential Plan",
                price: "39",
                priceCurrency: "USD",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  billingDuration: "P1M",
                },
              },
              {
                "@type": "Offer",
                name: "Professional Plan",
                price: "79",
                priceCurrency: "USD",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  billingDuration: "P1M",
                },
              },
              {
                "@type": "Offer",
                name: "Enterprise Plan",
                price: "149",
                priceCurrency: "USD",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  billingDuration: "P1M",
                },
              },
            ],
          }}
        />
        <Navigation overlay />

        <main>
          {/* Hero Section */}
          <section className="relative overflow-hidden min-h-[100svh] flex items-center pt-[clamp(100px,14vw,140px)] pb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-background to-primary/10" />
            <div className="container mx-auto relative">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-4 px-4 py-2 text-sm border-success/30 bg-success/5"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Website Protection
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  <span className="gradient-text-primary">
                    Website Insurance
                  </span>
                  <br />& Protection Plans
                </h1>
                <p className="text-xl text-muted-foreground mb-5 max-w-2xl mx-auto">
                  Sleep soundly knowing your website is protected 24/7.
                  Automatic backups, security monitoring, and expert support.
                  All in one plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="heroPill" variant="heroPrimary">
                    <Link to="/contact">
                      Get Protected Today
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="heroPill" variant="outline">
                    <Link to="/business">View All Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Alert Section */}
          <section className="py-7 bg-destructive/5 border-y border-destructive/20">
            <div className="container mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <h2 className="text-xl font-bold text-destructive">
                  The Risks Are Real
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {risks.map((risk, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-background rounded-lg border border-destructive/20"
                  >
                    <p className="text-sm text-muted-foreground">{risk}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section className="py-12">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-2xl font-bold mb-4">
                  Choose Your Protection Level
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  All plans include our core protection features. Upgrade for
                  more comprehensive coverage.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch">
                {plans.map((plan, index) => {
                  const isPopular = plan.popular;
                  const hasDiscount = !!plan.discountedPrice;
                  return (
                    <div key={index} className="relative pt-5 flex flex-col">
                      {/* Badge */}
                      {isPopular && (
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-[0_4px_12px_rgba(245,197,67,0.35)]" style={{ background: 'linear-gradient(135deg,#f5c543,#e0a312)', color: '#1a1200' }}>
                            <Star className="w-3 h-3 fill-current" />
                            Recommended
                          </span>
                        </div>
                      )}
                      {hasDiscount && !isPopular && (
                        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.35)]">
                            <Zap className="w-3 h-3 fill-current" />
                            10% OFF this month
                          </span>
                        </div>
                      )}

                      {/* Card */}
                      <div
                        className="relative flex flex-col flex-1 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                        style={isPopular ? {
                          background: 'linear-gradient(135deg,#1a1200 0%,#221900 50%,#1a1200 100%)',
                          border: '1px solid rgba(245,197,67,0.25)',
                          boxShadow: '0 8px 32px rgba(245,197,67,0.15), 0 0 0 1px rgba(245,197,67,0.1)',
                        } : {
                          background: 'var(--card)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                        }}
                      >
                        {/* Top accent bar */}
                        <div className="h-[2px] flex-shrink-0" style={{
                          background: isPopular
                            ? 'linear-gradient(90deg,#f5c543,#e0a312)'
                            : hasDiscount
                            ? 'linear-gradient(90deg,#10b981,#059669)'
                            : 'linear-gradient(90deg,transparent,rgba(99,102,241,0.3),transparent)',
                        }} />

                        <div className="p-4 flex flex-col flex-1">
                          {/* Name */}
                          <h3 className="text-xl font-black tracking-tight mb-1" style={isPopular ? { color: '#f5c543' } : {}}>
                            {plan.name}
                          </h3>
                          <p className={`text-sm mb-5 ${isPopular ? "" : "text-muted-foreground"}`} style={isPopular ? { color: 'rgba(255,255,255,0.6)' } : {}}>
                            {plan.description}
                          </p>

                          {/* Price */}
                          <div className="mb-4">
                            {hasDiscount ? (
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className={`text-sm line-through ${isPopular ? "" : "text-muted-foreground"}`} style={isPopular ? { color: 'rgba(255,255,255,0.35)' } : {}}>
                                    {plan.price}
                                  </span>
                                  <span className="text-3xl font-black tracking-tight text-emerald-500">
                                    {plan.discountedPrice}
                                  </span>
                                </div>
                                <p className={`text-xs ${isPopular ? "" : "text-muted-foreground"}`} style={isPopular ? { color: 'rgba(255,255,255,0.45)' } : {}}>
                                  /month · first month
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black tracking-tight" style={isPopular ? { color: '#f5c543' } : {}}>
                                  {plan.price}
                                </span>
                                <span className={`text-sm ml-0.5 ${isPopular ? "" : "text-muted-foreground"}`} style={isPopular ? { color: 'rgba(255,255,255,0.5)' } : {}}>
                                  {plan.period}
                                </span>
                              </div>
                            )}
                            {plan.couponCode && (
                              <div className="mt-3 flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Code:</span>
                                <code className="text-xs font-mono bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded">
                                  {plan.couponCode}
                                </code>
                              </div>
                            )}
                            {hasDiscount && (
                              <p className="text-xs text-emerald-600 font-medium mt-1">
                                Limited time · then $39/mo
                              </p>
                            )}
                          </div>

                          {/* Features */}
                          <ul className="space-y-3 flex-1 mb-4">
                            {plan.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-2.5">
                                <CheckCircle2
                                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                                  style={{ color: isPopular ? '#f5c543' : '#10b981' }}
                                />
                                <span className="text-sm" style={{ color: isPopular ? 'rgba(255,255,255,0.85)' : undefined }}>
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          {isPopular ? (
                            <Link
                              to="/contact"
                              className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:opacity-90"
                              style={{
                                background: 'linear-gradient(135deg,#f5c543 0%,#e0a312 100%)',
                                color: '#1a1200',
                                boxShadow: '0 1px 0 rgba(255,255,255,0.22) inset, 0 3px 10px rgba(245,197,67,0.28)',
                              }}
                            >
                              Get {plan.name}
                            </Link>
                          ) : (
                            <Button asChild variant="outline" className="w-full rounded-xl">
                              <Link to={plan.couponCode ? `/contact?coupon=${plan.couponCode}` : "/contact"}>
                                Get {plan.name}
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-muted-foreground mt-5">
                All plans include a 30-day money-back guarantee. Cancel anytime.
              </p>
            </div>
          </section>

          {/* Coverage Details */}
          <section className="py-12 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-2xl font-bold mb-4">
                  What's Covered
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive protection for every aspect of your website's
                  health and security.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coverage.map((item, index) => (
                  <Card
                    key={index}
                    className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                        <item.icon className="w-4 h-4 text-success" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Preview */}
          <section className="py-12">
            <div className="container mx-auto">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-2xl font-bold mb-5 text-center">
                  Common Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "What happens if my site gets hacked?",
                      a: "We immediately quarantine the threat, clean your site, and restore it from a clean backup. Professional and Enterprise plans include this at no extra cost.",
                    },
                    {
                      q: "How often are backups taken?",
                      a: "Essential plan: daily. Professional and Enterprise: real-time. All backups are stored securely for 30 days.",
                    },
                    {
                      q: "Can I upgrade or downgrade my plan?",
                      a: "Yes! You can change your plan at any time. Upgrades take effect immediately; downgrades at the next billing cycle.",
                    },
                    {
                      q: "Do you work with any website platform?",
                      a: "We support WordPress, Shopify, Wix, Squarespace, custom sites, and most other platforms.",
                    },
                  ].map((faq, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-2">{faq.q}</h3>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-5">
                  <Button asChild variant="outline">
                    <Link to="/faq">View All FAQs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-gradient-to-br from-success/10 via-background to-primary/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-2xl font-bold mb-4">
                Don't Wait Until It's Too Late
              </h2>
              <p className="text-xl text-muted-foreground mb-5 max-w-2xl mx-auto">
                Protect your website today. Plans start at just $39/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="heroPill" variant="heroPrimary">
                  <Link to="/contact">
                    Start Protection Now
                    <Shield className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="heroPill" variant="outline">
                  <Link to="/business/website-design">Need a New Website?</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default WebsiteInsurance;

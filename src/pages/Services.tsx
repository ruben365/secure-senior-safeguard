import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import TestimonialCard from "@/components/TestimonialCard";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MobileComparisonCards } from "@/components/MobileComparisonCards";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick } from "@/utils/analyticsTracker";
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";
import {
  Shield,
  Bot,
  GraduationCap,
  CheckCircle,
  Users,
  Heart,
  Clock,
  Award,
  TrendingUp,
  Phone,
  ArrowRight,
  Target,
} from "lucide-react";
import heroServices1 from "@/assets/hero-services-1.jpg";
import heroServices2 from "@/assets/hero-services-2.jpg";
import heroServices3 from "@/assets/hero-services-3.jpg";
import heroServices4 from "@/assets/hero-services-4.jpg";
import heroServices5 from "@/assets/hero-services-5.jpg";

const Services = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsTestimonialsLoading(true);
      const { data, error } = await supabase
        .from("testimonials_public")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsTestimonialsLoading(false);
    }
  };
  usePrerenderBlocker(isTestimonialsLoading);

  const services = [
    {
      icon: Shield,
      title: "ScamShield Protection",
      subtitle: "For Individuals & Families",
      description:
        "Comprehensive real-time protection against scams, fraud, and identity theft for you and your loved ones.",
      features: [
        "24/7 AI-powered scam monitoring",
        "Real-time fraud alerts",
        "Identity theft protection",
        "Senior-focused safety measures",
        "Family protection plans",
        "Personal safety training",
      ],
      priceMonthly: 29,
      priceAnnual: 290,
      link: "/training",
      color: "from-primary to-accent",
      popular: false,
    },
    {
      icon: Bot,
      title: "AI Business Solutions",
      subtitle: "For Businesses & Organizations",
      description:
        "Transform your business with custom AI integration, workflow automation, and comprehensive employee training.",
      features: [
        "Custom AI integration",
        "Workflow automation",
        "Employee cybersecurity training",
        "Advanced threat detection",
        "Compliance management",
        "Dedicated account manager",
      ],
      priceMonthly: 499,
      priceAnnual: 4990,
      link: "/business",
      color: "from-accent to-primary",
      popular: true,
    },
    {
      icon: GraduationCap,
      title: "Safety Workshops",
      subtitle: "For Education & Community",
      description:
        "Empowering workshops and sessions for seniors, organizations, and community groups.",
      features: [
        "Senior safety workshops",
        "Corporate training sessions",
        "Community education programs",
        "Hands-on learning materials",
        "Certification programs",
        "Ongoing support resources",
      ],
      priceMonthly: 99,
      priceAnnual: 990,
      link: "/training",
      color: "from-primary to-primary",
      popular: false,
    },
  ];

  const comparisons = [
    {
      feature: "Scam Detection & Alerts",
      scamshield: true,
      business: true,
      training: true,
    },
    {
      feature: "AI-Powered Protection",
      scamshield: true,
      business: true,
      training: false,
    },
    {
      feature: "24/7 Monitoring",
      scamshield: true,
      business: true,
      training: false,
    },
    {
      feature: "Custom Integration",
      scamshield: false,
      business: true,
      training: false,
    },
    {
      feature: "Workflow Automation",
      scamshield: false,
      business: true,
      training: false,
    },
    {
      feature: "Training & Workshops",
      scamshield: true,
      business: true,
      training: true,
    },
    {
      feature: "Family Sharing",
      scamshield: true,
      business: false,
      training: false,
    },
    {
      feature: "Dedicated Support",
      scamshield: false,
      business: true,
      training: false,
    },
  ];

  const faqs = [
    {
      question: "What's included in the ScamShield Protection?",
      answer:
        "ScamShield includes 24/7 AI-powered monitoring, real-time fraud alerts, identity theft protection, personal safety training, and dedicated support for seniors and families.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "Yes! You can upgrade or change your plan at any time. If you upgrade, you'll only pay the prorated difference. Downgrades take effect at the next billing cycle.",
    },
    {
      question: "Do you offer enterprise solutions?",
      answer:
        "Absolutely! Our AI Business Solutions are fully customizable for enterprise needs, including custom integration, dedicated account management, and volume pricing.",
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer:
        "All our services are month-to-month with no long-term contracts. You can cancel anytime with no cancellation fees. Annual plans offer significant savings and include a 30-day money-back guarantee.",
    },
    {
      question: "What kind of training do you provide?",
      answer:
        "We offer hands-on workshops for seniors, corporate cybersecurity training, community education programs, and customized training sessions tailored to your organization's specific needs.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply choose the service that fits your needs, and our team will guide you through setup. We offer free consultations to help you find the right solution for your family or business.",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Tailored Solutions",
      description:
        "Every service is customized to meet your specific needs and circumstances.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our team of cybersecurity analysts, nurses, and educators bring diverse expertise.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock monitoring and support when you need it most.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Thousands of families and businesses protected from scams and fraud.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description:
        "We constantly update our AI models and training to stay ahead of threats.",
    },
    {
      icon: Heart,
      title: "Mission-Driven",
      description:
        "Founded by scam victims, we're passionate about protecting others.",
    },
  ];

  const servicesHeroImages = [
    { src: heroServices1, alt: "Professional services for your business" },
    { src: heroServices2, alt: "Modern workspace solutions" },
    { src: heroServices3, alt: "Collaborative service delivery" },
    { src: heroServices4, alt: "Expert team member ready to assist" },
    { src: heroServices5, alt: "Innovative service offerings" },
  ];

  return (
    <PageTransition variant="fade">
      <SEO
        title="Our Services - Comprehensive Protection Solutions"
        description="Explore InVision Network's complete range of cybersecurity services: ScamShield Protection, AI Business Solutions, Training Programs, and Safety Vault. Protect what matters most."
        keywords="cybersecurity services, scam protection, AI business solutions, security training, password management, fraud prevention"
        breadcrumbs={[
          { name: "Home", url: "https://www.invisionnetwork.org/" },
          { name: "Services", url: "https://www.invisionnetwork.org/services" },
        ]}
      />

      <div className="min-h-screen bg-[#0a0a10]">
        <Navigation overlay />

        <Hero
          backgroundImages={servicesHeroImages}
          headline="Solutions Built to Protect"
          subheadline="Enterprise-grade cybersecurity and AI solutions for individuals, families, and organizations."
          showScrollIndicator
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="group" asChild>
              <Link
                to="#services"
                onClick={() =>
                  trackButtonClick("Explore Services", "Services Hero")
                }
              >
                View Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                to="/contact"
                onClick={() =>
                  trackButtonClick("Contact Sales", "Services Hero")
                }
              >
                Get in Touch
              </Link>
            </Button>
          </div>
        </Hero>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-[#0a0a10]">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Why Choose Us</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Why Choose InVision Network?
                </h2>
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
                  Your partners in digital safety, not just a service provider.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="h-full rounded-2xl bg-[#111118] border border-white/[0.06] p-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-white/70" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1.5 text-white">{benefit.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16 md:py-20 lg:py-24 bg-[#08080e]">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Our Services</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Choose Your Protection
                </h2>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                  Tailored plans for every need and budget
                </p>
              </div>
            </ScrollReveal>

            {/* Billing Toggle */}
            <ScrollReveal delay={100}>
              <div className="flex items-center justify-center gap-4 mb-12">
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm ${isMonthly ? "font-semibold text-white" : "text-white/50"}`}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={!isMonthly}
                  onCheckedChange={(checked) => setIsMonthly(!checked)}
                  aria-label="Toggle yearly billing"
                />
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm ${!isMonthly ? "font-semibold text-white" : "text-white/50"}`}
                >
                  Annual{" "}
                  <Badge variant="success" className="ml-2 text-xs">
                    Save 10%
                  </Badge>
                </Label>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div
                    className={`h-full flex flex-col relative rounded-2xl overflow-hidden bg-[#111118] border hover:-translate-y-1 transition-transform duration-300 ${service.popular ? "border-primary/30" : "border-white/[0.06]"}`}
                  >
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="p-6 pb-0">
                      <div
                        className="w-11 h-11 rounded-lg bg-white/[0.04] flex items-center justify-center mb-5"
                      >
                        <service.icon className="h-5 w-5 text-white/70" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm font-medium text-white/40 mb-2">
                        {service.subtitle}
                      </p>
                      <p className="text-sm text-white/45 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-bold text-white tracking-tight">
                            $
                            {isMonthly
                              ? service.priceMonthly
                              : Math.round(service.priceAnnual / 12)}
                          </span>
                          <span className="text-sm text-white/35">/month</span>
                        </div>
                        {!isMonthly && (
                          <p className="text-xs text-emerald-400/80 mt-1.5">
                            Save $
                            {service.priceMonthly * 12 - service.priceAnnual}
                            /year
                          </p>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8 flex-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-emerald-400/60 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-white/55">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${service.popular ? "" : "bg-white/[0.06] hover:bg-white/[0.1] text-white border-0"}`}
                        variant={service.popular ? "default" : "ghost"}
                        asChild
                      >
                        <Link
                          to={service.link}
                          onClick={() =>
                            trackButtonClick(
                              `Learn More - ${service.title}`,
                              "Services Grid",
                            )
                          }
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 md:py-20 lg:py-24 bg-[#0a0a10]">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Compare</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Compare Services
                </h2>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                  Find the perfect match for your needs
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              {/* Mobile: Card view */}
              <MobileComparisonCards comparisons={comparisons} />

              {/* Desktop: Table view */}
              <div className="hidden md:block max-w-5xl mx-auto overflow-x-auto rounded-2xl bg-[#111118] border border-white/[0.06]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-4 px-6 font-semibold text-white/80 text-sm">
                        Feature
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-white/80 text-sm">
                        ScamShield
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-white/80 text-sm">
                        AI Business
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-white/80 text-sm">
                        Training
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-4 px-6 text-sm text-white/60">{row.feature}</td>
                        <td className="text-center py-4 px-6">
                          {row.scamshield ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400/60 mx-auto" />
                          ) : (
                            <span className="text-white/20">--</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-6">
                          {row.business ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400/60 mx-auto" />
                          ) : (
                            <span className="text-white/20">--</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-6">
                          {row.training ? (
                            <CheckCircle className="h-4 w-4 text-emerald-400/60 mx-auto" />
                          ) : (
                            <span className="text-white/20">--</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-16 md:py-20 lg:py-24 bg-[#08080e]">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="text-center mb-14">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">Testimonials</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                    What Our Clients Say
                  </h2>
                  <p className="text-lg text-white/50 max-w-2xl mx-auto">
                    Real stories from real people we've protected
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <ScrollReveal key={testimonial.id} delay={index * 100}>
                    <TestimonialCard
                      name={testimonial.name}
                      location={testimonial.location || "Client"}
                      quote={testimonial.content}
                      rating={testimonial.rating}
                      image={testimonial.image_url || "/placeholder.svg"}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-[#0a0a10]">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">FAQ</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-white/50 max-w-2xl mx-auto">
                  Everything you need to know about our services
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <div className="rounded-2xl bg-[#111118] border border-white/[0.06] p-6">
                    <h3 className="text-base font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{faq.answer}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          headline="Ready to Get Protected?"
          description="Choose your service and start protecting what matters most today. No contracts, cancel anytime."
          variant="gold"
        >
          <Button size="lg" variant="secondary" asChild>
            <Link
              to="/contact"
              onClick={() => trackButtonClick("Contact Sales", "Services CTA")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link
              to="/training"
              onClick={() =>
                trackButtonClick("Explore Training", "Services CTA")
              }
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Explore Training
            </Link>
          </Button>
        </CTASection>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Check,
  Star,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroValueCards = () => {
  const plans = [
    {
      id: "protection",
      popular: false,
      icon: Shield,
      name: "ScamShield",
      tagline: "Personal & Family",
      price: "39",
      period: "month",
      description: "Comprehensive AI monitoring for individuals and families.",
      features: [
        "Real-time threat detection",
        "Suspicious content analysis",
        "Up to 4 family members",
        "Monthly security reports",
        "Email & chat support"
      ],
      href: "/training#pricing",
      cta: "Get Protected"
    },
    {
      id: "training",
      popular: true,
      icon: GraduationCap,
      name: "Training",
      tagline: "Prevention Programs",
      price: "89",
      period: "one-time",
      description: "Expert-led programs to recognize and prevent scams.",
      features: [
        "Certified cybersecurity trainers",
        "Interactive practice sessions",
        "Reference materials included",
        "Certificate of completion",
        "10% veteran discount"
      ],
      href: "/training#training",
      cta: "Start Learning"
    },
    {
      id: "business",
      popular: false,
      icon: Building2,
      name: "Enterprise",
      tagline: "Business Solutions",
      price: "1,500",
      period: "starting",
      description: "Custom AI automation and security for organizations.",
      features: [
        "Custom AI solutions",
        "Security vulnerability audits",
        "Employee training included",
        "Dedicated account manager",
        "Priority 24/7 support"
      ],
      href: "/business",
      cta: "Get Quote"
    }
  ];

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Flexible Plans</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            Choose Your
            <span className="text-primary"> Protection</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${plan.popular ? 'lg:-mt-6 lg:mb-6' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full rounded-3xl transition-all duration-500 overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-to-b from-primary/10 via-card to-card border-2 border-primary/30 shadow-2xl shadow-primary/10' 
                  : 'bg-card border border-border hover:border-primary/20 hover:shadow-xl'
              }`}>
                {/* Shine Effect for Popular */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                )}

                <div className="p-8 lg:p-10">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-primary to-accent text-white' 
                        : 'bg-primary/10'
                    }`}>
                      <plan.icon className={`w-7 h-7 ${plan.popular ? '' : 'text-primary'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground">$</span>
                      <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-8">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-foreground'}`} />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    asChild 
                    size="lg"
                    className={`w-full rounded-xl h-12 text-base font-semibold gap-2 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <Link to={plan.href}>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-success" />
            <span>Secure payment via Stripe</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroValueCards;

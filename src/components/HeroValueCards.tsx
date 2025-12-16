import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroValueCards = () => {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      audience: "For individuals",
      price: "39",
      description: "Essential protection for personal digital security.",
      features: [
        "Real-time threat detection",
        "Suspicious content analysis",
        "Monthly security reports",
        "Email support"
      ],
      href: "/training#pricing",
      featured: false
    },
    {
      id: "family",
      name: "Family",
      audience: "Most popular",
      price: "79",
      description: "Comprehensive coverage for your entire household.",
      features: [
        "Everything in Starter",
        "Up to 5 family members",
        "Priority 24/7 support",
        "Quarterly security review",
        "Identity monitoring"
      ],
      href: "/training#pricing",
      featured: true
    },
    {
      id: "premium",
      name: "Premium",
      audience: "Maximum protection",
      price: "129",
      description: "Advanced security with dedicated support.",
      features: [
        "Everything in Family",
        "Unlimited family members",
        "Dedicated security advisor",
        "Monthly consultation calls",
        "Recovery assistance"
      ],
      href: "/training#pricing",
      featured: false
    }
  ];

  return (
    <section className="relative py-32 lg:py-40 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-6">
            Protection Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Choose your level of protection
          </h2>
          <p className="text-lg text-muted-foreground">
            All plans include our core ScamShield technology. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.featured ? 'lg:-mt-6 lg:mb-6' : ''}`}
            >
              <div className={`h-full rounded-2xl p-8 lg:p-10 transition-all duration-300 ${
                plan.featured 
                  ? 'bg-foreground text-background ring-1 ring-foreground' 
                  : 'bg-card ring-1 ring-border hover:ring-primary/30'
              }`}>
                {/* Header */}
                <div className="mb-8">
                  <span className={`text-xs font-medium tracking-wide uppercase ${
                    plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {plan.audience}
                  </span>
                  <h3 className="text-2xl font-bold mt-1">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
                    <span className={`ml-2 ${plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      /month
                    </span>
                  </div>
                  <p className={`mt-3 text-sm ${plan.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 shrink-0 mt-0.5 ${
                        plan.featured ? 'text-primary' : 'text-primary'
                      }`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  asChild 
                  className="w-full"
                  variant={plan.featured ? 'secondary' : 'default'}
                  size="lg"
                >
                  <Link to={plan.href}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All prices in USD. Veterans receive 10% discount on all plans.{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact us
          </Link>{" "}
          for custom enterprise solutions.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroValueCards;

import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import serviceScamshield from "@/assets/service-scamshield.jpg";

const pages = [
  {
    icon: GraduationCap,
    title: "Workshops",
    description: "Hands-on workshops that teach you to spot and stop scams before they happen.",
    link: "/training",
    cta: "View Plans",
    featured: true,
    image: serviceTraining,
    gradient: "from-primary/20 to-accent/10",
  },
  {
    icon: Building2,
    title: "AI",
    description: "Security audits, AI automation, and employee training for organizations.",
    link: "/business",
    cta: "Get a Quote",
    image: serviceAiBusiness,
    gradient: "from-accent/20 to-primary/10",
  },
  {
    icon: Shield,
    title: "ScamShield AI",
    description:
      "Real-time AI-powered scanning for calls, texts, and emails. Pay-per-scan from $0.50.",
    link: "/training/ai-analysis",
    cta: "Start a Scan",
    image: serviceScamshield,
    gradient: "from-primary/15 to-accent/15",
  },
  {
    icon: BookOpen,
    title: "Library",
    description: "Guides, e-books, and security tools for your family.",
    link: "/library",
    cta: "Browse Library",
    image: serviceFamilySafety,
    gradient: "from-accent/15 to-primary/10",
  },
];

export const SiteOrientationGrid = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { rootMargin: "-50px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 md:py-18 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto md:px-4 lg:px-5 relative">
        <div className={`text-center mb-9 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Explore Our Services
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            From personal protection to enterprise security, we have a solution
            for every need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {pages.map((page, i) => (
            <AnimatedSection key={page.title} animation="fade-up" delay={i * 120}>
              <Link
                to={page.link}
                className={`group block rounded-2xl border overflow-hidden transition-all h-full hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_30px_60px_-15px_hsl(288_25%_20%/0.2)] ${
                  page.featured
                    ? "border-primary/40 bg-card ring-1 ring-primary/10"
                    : "border-border/50 bg-card hover:border-primary/20"
                }`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={176}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  {page.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                      ⭐ Most Popular
                    </span>
                  )}
                  {/* Floating icon overlay */}
                  <div className="absolute bottom-3 right-3 w-6 h-6 rounded-xl glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <page.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="p-5 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-30 pointer-events-none`} />
                  <div className="relative">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center mb-3 shadow-[0_2px_8px_hsl(var(--primary)/0.15)] border border-primary/15 group-hover:shadow-[0_4px_16px_hsl(var(--primary)/0.25)] group-hover:scale-110 transition-all duration-300">
                      <page.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {page.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                      {page.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className={`mt-7 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <Button asChild size="lg">
            <Link to="/contact">
              Talk to an Expert <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/about">
              About Our Team <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;

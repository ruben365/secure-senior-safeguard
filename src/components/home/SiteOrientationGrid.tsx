import { Link } from "react-router-dom";
import {
  Shield,
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import serviceScamshield from "@/assets/service-scamshield.jpg";

const pages = [
  {
    title: "Learn & Train",
    description: "Hands-on workshops that teach you to spot and stop scams.",
    link: "/training",
    cta: "View Plans",
    image: serviceTraining,
  },
  {
    title: "AI & Business",
    description: "Security audits, AI automation, and employee training.",
    link: "/business",
    cta: "Get a Quote",
    image: serviceAiBusiness,
  },
  {
    title: "ScamShield AI",
    description: "Real-time AI-powered scanning for calls, texts, and emails.",
    link: "/training/ai-analysis",
    cta: "Try Free",
    image: serviceScamshield,
  },
  {
    title: "Resources",
    description: "Free guides, e-books, and security tools for your family.",
    link: "/resources",
    cta: "Browse Free",
    image: serviceFamilySafety,
  },
  {
    title: "Family Plans",
    description: "Comprehensive family protection from digital threats.",
    link: "/training#pricing",
    cta: "See Pricing",
    image: serviceTraining,
  },
  {
    title: "Expert Support",
    description: "24/7 human support when you need it most.",
    link: "/contact",
    cta: "Get Help",
    image: serviceAiBusiness,
  },
];

export const SiteOrientationGrid = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header - fitup "Find Your Perfect Yoga style" */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
            Find Your Perfect{" "}
            <span className="font-display italic text-primary">Protection</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
            Explore different security solutions tailored to your needs, from personal protection to enterprise-grade defense.
          </p>
        </div>

        {/* 3x2 Grid - fitup yoga card style with image + overlay text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {pages.map((page) => (
            <Link
              key={page.title}
              to={page.link}
              className="group relative rounded-3xl overflow-hidden h-56 md:h-64 block"
            >
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

              {/* Large overlay text like fitup "YOGA" */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-black text-white/20 uppercase tracking-widest select-none">
                  {page.title.split(" ")[0]}
                </span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{page.title}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{page.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:gap-2 transition-all">
                  {page.cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Check All button - fitup style */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full h-11 px-8 font-semibold border-foreground/20 hover:bg-foreground hover:text-background transition-all">
            <Link to="/services">
              Check All
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SiteOrientationGrid;

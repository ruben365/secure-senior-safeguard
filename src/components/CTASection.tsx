import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  headline: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "navy";
}

const CTASection = ({ headline, description, children, className, variant = "gold" }: CTASectionProps) => {
  const bgClass = {
    default: "bg-muted",
    gold: "bg-gradient-to-r from-primary to-accent",
    navy: "bg-gradient-hero-primary",
  }[variant];

  const textClass = {
    default: "text-foreground",
    gold: "text-accent-foreground",
    navy: "text-primary-foreground",
  }[variant];

  return (
    <section className={cn("py-12 md:py-16 lg:py-20", bgClass, className)} role="region" aria-label="Call to action">
      <div className="container mx-auto px-4 text-center">
        <h2 className={cn("mb-4 text-2xl md:text-3xl lg:text-4xl", textClass)}>{headline}</h2>
        {description && <p className={cn("text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed", textClass)}>{description}</p>}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center flex-wrap">{children}</div>
      </div>
    </section>
  );
};

export default CTASection;

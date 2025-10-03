import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  backgroundImage: string;
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
}

const Hero = ({ backgroundImage, headline, subheadline, children, className, overlay = true }: HeroProps) => {
  return (
    <div className={cn("relative min-h-[600px] flex items-center", className)}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />}
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-primary-foreground mb-6 animate-fade-in">{headline}</h1>
          {subheadline && (
            <p className="text-primary-foreground/90 text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in">
              {subheadline}
            </p>
          )}
          {children && <div className="animate-fade-in">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Hero;

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroHomeProps {
  children?: ReactNode;
  className?: string;
}

const HeroHome = ({ children, className }: HeroHomeProps) => {
  return (
    <section className={cn("relative min-h-[90vh] flex items-center overflow-hidden", className)}>
      {/* Gradient Background with Tech Pattern */}
      <div className="absolute inset-0 gradient-hero-primary tech-pattern" />
      
      {/* Floating Orbs for Visual Interest */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb" style={{ width: '300px', height: '300px', top: '10%', left: '5%', animationDelay: '0s' }} />
        <div className="floating-orb-gold" style={{ width: '200px', height: '200px', top: '60%', right: '10%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '250px', height: '250px', bottom: '15%', left: '40%', animationDelay: '8s', opacity: 0.5 }} />
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-white mb-6 animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight [text-shadow:0_4px_20px_rgba(0,0,0,0.3)]">
            Stop AI Scammers Before They Strike
          </h1>
          
          {/* Subheadline */}
          <h2 className="text-white/90 text-2xl md:text-3xl lg:text-4xl mb-10 leading-relaxed animate-fade-in-up stagger-1 font-medium [text-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
            Expert training & 24/7 protection for Ohio families and businesses
          </h2>
          
          {/* CTA Buttons */}
          {children && (
            <div className="animate-fade-in-up stagger-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroHome;

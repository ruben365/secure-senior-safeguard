import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroHomeProps {
  children?: ReactNode;
  className?: string;
}

const HeroHome = ({ children, className }: HeroHomeProps) => {
  return (
    <section className={cn("relative min-h-[95vh] flex items-center overflow-hidden", className)}>
      {/* Dark Gradient Background with Motion Lines */}
      <div className="absolute inset-0 gradient-hero-primary">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(330 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(hsl(330 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
        {/* Diagonal Motion Lines */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(275 70% 63% / 0.3) 10px, hsl(275 70% 63% / 0.3) 11px)',
          animation: 'diagonal-move 15s linear infinite'
        }} />
      </div>
      
      {/* Neon Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb" style={{ width: '400px', height: '400px', top: '5%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb-orange" style={{ width: '300px', height: '300px', top: '50%', right: '5%', animationDelay: '3s' }} />
        <div className="floating-orb-purple" style={{ width: '350px', height: '350px', bottom: '10%', left: '45%', animationDelay: '6s' }} />
        <div className="floating-orb-cyan" style={{ width: '250px', height: '250px', top: '30%', right: '30%', animationDelay: '9s' }} />
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* "On Demand" Badge */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/50 bg-primary/10 backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
              <span className="text-white font-bold text-sm uppercase tracking-wider">Live Protection Available</span>
            </div>
          </div>
          
          {/* Main Headline with Multi-Color Typography */}
          <h1 className="text-center mb-6 animate-fade-in-up text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="text-white">Catch </span>
            <span className="gradient-text-pink" style={{ textShadow: '0 0 30px hsl(330 100% 50% / 0.5)' }}>AI Scams</span>
            <span className="text-white"> Before</span>
            <br />
            <span className="text-white">They Catch </span>
            <span className="gradient-text-orange" style={{ textShadow: '0 0 30px hsl(28 100% 60% / 0.5)' }}>You</span>
            <span className="text-white">!</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-center text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed animate-fade-in-up stagger-1 text-white/80 max-w-4xl mx-auto">
            AI-Powered Security Training & Real-Time Scam Detection for Ohio Families
          </p>
          
          {/* CTA Button */}
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

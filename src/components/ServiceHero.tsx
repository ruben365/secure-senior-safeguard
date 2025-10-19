import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { getHeroConfig } from "@/data/heroImages";

interface ServiceHeroProps {
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  serviceType?: string;
  imageIndex?: number;
  isVisible?: boolean;
}

const ServiceHero = ({ 
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = true, 
  showScrollIndicator = false,
  serviceType = "default",
  imageIndex = 0,
  isVisible = true
}: ServiceHeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  
  // Get service-specific image or use elders images for homepage
  const getServiceImage = () => {
    const serviceRoutes: Record<string, string> = {
      'training': '/training',
      'business': '/business',
      'scamshield': '/scamshield',
      'resources': '/resources',
      'contact': '/contact',
      'about': '/about',
      'default': '/'
    };
    
    const route = serviceRoutes[serviceType] || '/';
    const config = getHeroConfig(route);
    
    // For homepage, use the index to cycle through multiple images
    if (route === '/' && config.images.length > 1) {
      return config.images[imageIndex % config.images.length];
    }
    
    return config.images[0];
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentImage = getServiceImage();

  return (
    <div className={cn("relative min-h-[80vh] flex items-center overflow-hidden", className)}>
      {/* Background with smooth transition */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: isVisible ? 1 : 0.7
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            transform: isVisible ? 'scale(1)' : 'scale(1.05)'
          }}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-40 transition-opacity duration-700"
          style={{ 
            backgroundSize: '400% 400%', 
            animation: 'gradient-shift 15s ease infinite',
            opacity: isVisible ? 0.4 : 0.5
          }}
        />
      )}
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb" style={{ width: '120px', height: '120px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '80px', height: '80px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-3xl">
          <h1 
            className={cn(
              "text-white mb-4 [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {headline}
          </h1>
          {subheadline && (
            <p 
              className={cn(
                "text-white/90 text-xl md:text-2xl mb-6 leading-relaxed transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {subheadline}
            </p>
          )}
          {children && (
            <div 
              className={cn(
                "transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default ServiceHero;

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollIndicator from "./ScrollIndicator";
import { ParticleBackground } from "./ParticleBackground";
import { FloatingShapes } from "./FloatingShapes";
import { ProtectionBadge } from "./ProtectionBadge";
import { useImagePreload } from "@/hooks/useImagePreload";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { HeroCarousel } from "./HeroCarousel";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: HeroImage[];
  headline?: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showPrivacyDisclaimer?: boolean;
  showProtectionBadge?: boolean;
  badgeText?: string;
  showTrustIndicators?: boolean;
}

const Hero = ({ backgroundImage, backgroundImages, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showPrivacyDisclaimer = false, showProtectionBadge = false, badgeText, showTrustIndicators = false }: HeroProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const { ref, y, opacity } = useParallax({ speed: 0.5 });
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={ref}
      className={cn("relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden hero-mobile", className)}
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : backgroundImage && (
          <motion.div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 brightness-115",
              singleImagePreloaded ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              opacity
            }}
          />
        )}
        
        {/* Gradient Overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        
        {/* Additional overlay - reduced opacity */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/25" />
        )}
      </motion.div>
      
      {/* Particle Network Background */}
      <ParticleBackground />
      
      {/* Floating Abstract Shapes */}
      <FloatingShapes />
      
      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}
      
      {/* Floating Particles (existing) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content with Stagger Animation */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          {headline && (
            <motion.h1 
              className="text-white mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {headline}
            </motion.h1>
          )}
          {subheadline && (
            <motion.p 
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {subheadline}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
      
      {/* Privacy trust badge - compact and subtle */}
      {showPrivacyDisclaimer && showDisclaimer && (
        <div className="absolute bottom-4 left-4 z-10 group max-w-xs">
          <div className="relative bg-gradient-to-br from-primary/80 to-accent/80 backdrop-blur-xl text-white px-3 py-2 rounded-lg border border-white/10 shadow-2xl drop-shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-xs mb-0.5 flex items-center gap-1.5">
                  Privacy-Protected
                  <Badge variant="secondary" className="text-[8px] px-1.5 py-0 bg-white/15">
                    Safe
                  </Badge>
                </p>
                <p className="text-[10px] text-white/85 leading-snug">
                  AI-generated imagery. Zero personal data.
                </p>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-white/60 hover:text-white transition-colors flex-shrink-0 text-xs"
                aria-label="Dismiss privacy notice"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;

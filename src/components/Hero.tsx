import { ReactNode, useEffect, useState, useRef, Children, isValidElement, memo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import { ProtectionBadge } from "./ProtectionBadge";
import { useImagePreload } from "@/hooks/useImagePreload";
import { HeroCarousel } from "./HeroCarousel";
import { MagneticWrapper } from "./ui/magnetic-button";
import HeroPurpleOverlay from "./HeroPurpleOverlay";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: HeroImage[];
  backgroundVideo?: string;
  headline?: string | ReactNode;
  subheadline?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showProtectionBadge?: boolean;
  badgeText?: string;
  showTrustIndicators?: boolean;
  /** Disable the purple overlay for homepage */
  disablePurpleOverlay?: boolean;
}

// Animation variants
const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const Hero = ({ 
  backgroundImage, 
  backgroundImages, 
  backgroundVideo, 
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = false, 
  showScrollIndicator = false, 
  showProtectionBadge = false, 
  badgeText,
  disablePurpleOverlay = false,
}: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  // Track when single image is fully loaded
  useEffect(() => {
    if (singleImagePreloaded && backgroundImage) {
      const timer = setTimeout(() => setImageLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [singleImagePreloaded, backgroundImage]);

  return (
    <div 
      className={cn(
        "relative w-full min-h-[800px] sm:min-h-[900px] md:min-h-screen lg:min-h-[105vh] xl:min-h-[110vh] flex items-center overflow-hidden hero-mobile", 
        className
      )}
    >
      {/* Transparent fallback - no color flash */}
      <div className="absolute inset-0 bg-transparent" />
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video Background */}
        {useVideo && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Image Carousel (if no video) */}
        {!useVideo && useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : !useVideo && backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Simple dark tint for text readability on inner pages */}
        {!disablePurpleOverlay && <HeroPurpleOverlay />}
      </div>

      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}
      
      {/* Content with Entry Animations */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 py-20 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <motion.div 
          className="max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {headline && (
            <motion.h1 
              variants={fadeSlideUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold"
            >
              {headline}
            </motion.h1>
          )}
          {subheadline && (
            <motion.p 
              variants={fadeSlideUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-10 leading-relaxed max-w-3xl"
            >
              {subheadline}
            </motion.p>
          )}
          {children && (
            <motion.div 
              variants={fadeSlideUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              {Children.map(children, (child) =>
                isValidElement(child) ? (
                  <MagneticWrapper strength={0.3}>{child}</MagneticWrapper>
                ) : (
                  child
                )
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom gradient removed for clean hero edge */}
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;

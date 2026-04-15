import { ReactNode, useState, useRef, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { ProtectionBadge } from "./ProtectionBadge";
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

  // No loading states for images - show immediately for instant page transitions
  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  return (
    <div
      className={cn(
        "relative w-full min-h-[75dvh] sm:min-h-[85dvh] md:min-h-[100dvh] lg:min-h-[110dvh] flex items-start sm:items-center overflow-hidden hero-mobile",
        className,
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
              videoLoaded ? "opacity-100" : "opacity-0",
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
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85] saturate-[0.9]"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Image Carousel (if no video) */}
        {!useVideo && useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : (
          !useVideo &&
          backgroundImage && (
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              width={1920}
              height={1080}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85] saturate-[0.9]"
            />
          )
        )}

        {/* Navy-purple tint for visual consistency */}
        {!disablePurpleOverlay && <HeroPurpleOverlay />}
      </div>

      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}

      {/* Content — constrained to 1200px spine */}
      <div className="w-full max-w-[1200px] mx-auto pt-24 pb-6 sm:py-32 md:py-40 lg:py-56 xl:py-64 relative z-10 text-left px-8">
        <div className="max-w-[640px] animate-fade-in">
          {headline && (
            <h1 className="text-white mb-4 sm:mb-6 md:mb-10 leading-[1.1] text-[clamp(1.75rem,5.75vw,4.5rem)] font-extrabold tracking-tight text-left">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-white/95 text-[15px] sm:text-lg md:text-2xl mb-8 md:mb-12 leading-relaxed text-left line-clamp-3 sm:line-clamp-none">
              {subheadline}
            </p>
          )}
          {children && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-start">
              {Children.map(children, (child) =>
                isValidElement(child) ? (
                  <MagneticWrapper strength={0.3}>{child}</MagneticWrapper>
                ) : (
                  child
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;

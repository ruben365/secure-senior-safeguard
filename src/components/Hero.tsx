import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { ProtectionBadge } from "./ProtectionBadge";
import { HeroCarousel } from "./HeroCarousel";

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

  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  return (
    <div
      className={cn(
        "relative w-full min-h-[65vh] sm:min-h-[75vh] md:min-h-screen flex items-center overflow-hidden",
        className,
      )}
    >
      {/* Background media layer */}
      <div className="absolute inset-0">
        {/* Video background */}
        {useVideo && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
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
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Image carousel or single image */}
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
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        )}

        {/* Cinematic overlay system */}
        {!disablePurpleOverlay && (
          <>
            {/* Left gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

            {/* Bottom fade to page background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

            {/* Top gradient for nav readability */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
          </>
        )}
      </div>

      {/* Protection badge */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}

      {/* Content */}
      <div className="w-full center-container-wide py-20 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          {headline && (
            <h1
              className="text-white mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-bold tracking-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]"
            >
              {headline}
            </h1>
          )}
          {subheadline && (
            <p
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl font-light [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]"
            >
              {subheadline}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;

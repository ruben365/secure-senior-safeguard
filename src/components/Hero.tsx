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
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden bg-[#080b11]">
        {useVideo && (
          <div className={cn("absolute inset-0 transition-opacity duration-300", videoLoaded ? "opacity-100" : "opacity-0")}>
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {!useVideo && useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : (
          !useVideo && backgroundImage && (
            <img
              src={backgroundImage}
              alt="" aria-hidden="true"
              width={1920} height={1080}
              loading="eager" decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        )}

        {/* Cinematic overlays */}
        {!disablePurpleOverlay && (
          <>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #080b11 0%, rgba(8,11,17,0.88) 25%, rgba(8,11,17,0.55) 50%, transparent 75%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, #080b11 0%, rgba(8,11,17,0.5) 25%, transparent 50%)" }}
            />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080b11]/50 to-transparent" />
          </>
        )}
      </div>

      {/* Protection Badge */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}

      {/* Content */}
      <div className="w-full container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1400px] py-24 sm:py-28 md:py-32 lg:py-36 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          {headline && (
            <h1 className="text-white mb-4 sm:mb-6 text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] tracking-[-0.02em] font-extrabold">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-white/50 text-[15px] sm:text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl">
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

      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;

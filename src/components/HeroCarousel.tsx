import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { Play, Pause } from "lucide-react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
  transitionDuration?: number;
}

// Global image cache for instant transitions
const heroImageCache = new Map<string, boolean>();

export const HeroCarousel = ({ 
  images, 
  interval = 5000,
  transitionDuration = 0.6 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();
  
  // Faster transitions for better UX
  const adjustedTransitionDuration = isLowEnd ? 0.3 : transitionDuration;

  // Preload all images immediately on mount
  const preloadAllImages = useCallback(() => {
    let loadedCount = 0;
    const totalImages = images.length;
    
    images.forEach((img, index) => {
      if (heroImageCache.has(img.src)) {
        loadedCount++;
        if (loadedCount >= 1) setImagesReady(true);
        return;
      }
      
      const image = new Image();
      image.onload = () => {
        heroImageCache.set(img.src, true);
        loadedCount++;
        // Set ready after first image loads
        if (loadedCount >= 1) setImagesReady(true);
      };
      image.onerror = () => {
        heroImageCache.set(img.src, true);
        loadedCount++;
        if (loadedCount >= 1) setImagesReady(true);
      };
      // High priority for first image, low for rest
      image.fetchPriority = index === 0 ? 'high' : 'low';
      image.decoding = 'async';
      image.src = img.src;
    });
  }, [images]);

  useEffect(() => {
    preloadAllImages();
  }, [preloadAllImages]);

  useEffect(() => {
    if (!imagesReady || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesReady, isPaused]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length]);

  return (
    <div 
      className="absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Persistent gradient background - prevents white flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#3b0764] to-[#0d9488]" />
      
      {/* First image as immediate fallback */}
      {images.length > 0 && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{
            backgroundImage: `url(${images[0].src})`,
            opacity: imagesReady ? 0.2 : 1,
          }}
        />
      )}
      
      {/* Main carousel with crossfade */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { 
              duration: adjustedTransitionDuration, 
              ease: "easeInOut"
            }
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentIndex].src})`,
            }}
            role="img"
            aria-label={images[currentIndex].alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex]?.alt}
      </div>
    </div>
  );
};
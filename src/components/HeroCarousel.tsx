import { useState, useEffect, useCallback, useRef } from "react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
}

// Simplified carousel - CSS transitions only, no framer-motion
export const HeroCarousel = ({ 
  images, 
  interval = 5000
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const mountedRef = useRef(true);
  
  // Preload first image only
  useEffect(() => {
    mountedRef.current = true;
    
    if (images.length === 0) return;
    
    const img = new Image();
    img.onload = () => {
      if (mountedRef.current) setImagesReady(true);
    };
    img.onerror = () => {
      if (mountedRef.current) setImagesReady(true);
    };
    img.src = images[0].src;
    
    return () => {
      mountedRef.current = false;
    };
  }, [images]);

  // Auto-advance
  useEffect(() => {
    if (!imagesReady || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesReady]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Images with CSS transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ 
            backgroundImage: `url(${image.src})`,
            opacity: imagesReady && index === currentIndex ? 1 : 0
          }}
          role="img"
          aria-label={image.alt}
          aria-hidden={index !== currentIndex}
        />
      ))}

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex]?.alt}
      </div>
    </div>
  );
};

// Export preload function for route prefetching
export const preloadHeroImages = (images: HeroImage[]) => {
  images.forEach(img => {
    const image = new Image();
    image.src = img.src;
  });
};

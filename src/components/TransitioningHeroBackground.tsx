import { useState, useEffect } from "react";
import { useImagePreload } from "@/hooks/useImagePreload";

interface TransitioningHeroBackgroundProps {
  images: string[];
  transitionDuration?: number; // in seconds
}

const TransitioningHeroBackground = ({ 
  images, 
  transitionDuration = 8 
}: TransitioningHeroBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Preload all images
  const imagesPreloaded = useImagePreload(images);

  useEffect(() => {
    if (!imagesPreloaded || images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // After fade out completes, switch images
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // 1 second fade duration
      
    }, transitionDuration * 1000);

    return () => clearInterval(interval);
  }, [imagesPreloaded, images.length, nextIndex, transitionDuration]);

  if (!imagesPreloaded) {
    return (
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Current Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : 1,
        }}
      />
      
      {/* Next Image (for smooth crossfade) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: isTransitioning ? 1 : 0,
        }}
      />
    </div>
  );
};

export default TransitioningHeroBackground;

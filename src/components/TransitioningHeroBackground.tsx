import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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

  return (
    <div className="absolute inset-0">
      {/* First Image - display immediately, even before full preload */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          imagesPreloaded ? "" : "opacity-100"
        )}
        style={{
          backgroundImage: `url(${images[0]})`,
          opacity: currentIndex === 0 && !isTransitioning ? 1 : 0,
        }}
      />
      
      {/* Other Images - only render after preload */}
      {imagesPreloaded && (
        <>
          {images.slice(1).map((image, idx) => {
            const imageIndex = idx + 1;
            return (
              <div
                key={imageIndex}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${image})`,
                  opacity: currentIndex === imageIndex && !isTransitioning ? 1 : 0,
                }}
              />
            );
          })}
          
          {/* Next Image for crossfade effect */}
          {nextIndex !== 0 && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${images[nextIndex]})`,
                opacity: isTransitioning ? 1 : 0,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TransitioningHeroBackground;

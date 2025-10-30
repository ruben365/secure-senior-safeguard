import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-3d-1.jpg';
import eldersHero2 from '@/assets/elders-hero-3d-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3d-3.jpg';
import eldersHero4 from '@/assets/elders-hero-3d-4.jpg';
import heroHomepage from '@/assets/hero-homepage-3d.jpg';

const images = [eldersHero1, eldersHero2, eldersHero3, eldersHero4, heroHomepage];

// Preload all images to prevent flashing
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

interface TransitioningBackgroundProps {
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ interval = 8000, className = '', opacity = 1 }: TransitioningBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 2000);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* All images stacked - only one visible at a time */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === currentIndex ? opacity : 0,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      ))}
      
      {/* Overlay for better text readability - separate layer to prevent transition artifacts */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />
    </div>
  );
};

export default TransitioningBackground;

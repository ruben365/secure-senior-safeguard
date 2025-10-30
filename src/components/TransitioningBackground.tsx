import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-3d-1.jpg';
import eldersHero2 from '@/assets/elders-hero-3d-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3d-3.jpg';
import eldersHero4 from '@/assets/elders-hero-3d-4.jpg';
import heroHomepage from '@/assets/hero-homepage-3d.jpg';

const images = [eldersHero1, eldersHero2, eldersHero3, eldersHero4, heroHomepage];

interface TransitioningBackgroundProps {
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ interval = 8000, className = '', opacity = 1 }: TransitioningBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 2000); // Extended 2-second transition for ultra-smooth effect
    }, interval);

    return () => clearInterval(timer);
  }, [interval, nextIndex]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out will-change-opacity"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Next Image (for smooth transition) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out will-change-opacity"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Overlay for better text readability - separate layer to prevent transition artifacts */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 pointer-events-none" />
    </div>
  );
};

export default TransitioningBackground;

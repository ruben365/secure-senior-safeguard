import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-1.jpg';
import eldersHero2 from '@/assets/elders-hero-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3.jpg';
import eldersHero4 from '@/assets/elders-hero-4.jpg';
import eldersHero5 from '@/assets/elders-hero-5.jpg';
import eldersHero6 from '@/assets/elders-hero-6.jpg';
import eldersHero7 from '@/assets/elders-hero-7.jpg';
import eldersHero8 from '@/assets/elders-hero-8.jpg';
import heroHomepage from '@/assets/hero-homepage.jpg';
import heroAbout from '@/assets/hero-about-new.jpg';
import heroTraining from '@/assets/hero-training.jpg';
import heroBusiness from '@/assets/hero-business-new.jpg';

const images = [
  eldersHero1, 
  eldersHero2, 
  eldersHero3, 
  eldersHero4, 
  eldersHero5,
  eldersHero6,
  eldersHero7,
  eldersHero8,
  heroHomepage,
  heroAbout,
  heroTraining,
  heroBusiness
];

interface TransitioningBackgroundProps {
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ interval = 5000, className = '', opacity = 1 }: TransitioningBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all images immediately to prevent flashing
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = typeof src === 'string' ? src : '';
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      // Start transition
      setIsTransitioning(true);
      
      // After transition completes, update indices
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000); // Match transition duration
    }, interval);

    return () => clearInterval(id);
  }, [interval, nextIndex]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image Layer - Always visible */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Next Image Layer - Fades in during transition */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
    </div>
  );
};

export default TransitioningBackground;

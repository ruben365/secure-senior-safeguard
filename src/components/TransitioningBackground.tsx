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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all images once to prevent flicker on first paint
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = typeof src === 'string' ? src : '';
    });
  }, []);

  useEffect(() => {
    const transitionDuration = 1200; // keep in sync with CSS below
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const upcomingIndex = (currentIndex + 1) % images.length;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image */}
      <div
className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          transform: isTransitioning ? 'scale(1.02)' : 'scale(1)',
        }}
      />
      
      {/* Next Image (for smooth transition) */}
      <div
className="absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[upcomingIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          transform: isTransitioning ? 'scale(1)' : 'scale(1.02)',
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
    </div>
  );
};

export default TransitioningBackground;

import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-1.jpg';
import eldersHero2 from '@/assets/elders-hero-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3.jpg';
import eldersHero4 from '@/assets/elders-hero-4.jpg';
import eldersHero5 from '@/assets/elders-hero-5.jpg';
import eldersHero6 from '@/assets/elders-hero-6.jpg';
import eldersHero7 from '@/assets/elders-hero-7.jpg';
import eldersHero8 from '@/assets/elders-hero-8.jpg';
import eldersHero9 from '@/assets/elders-hero-9.jpg';
import eldersHero10 from '@/assets/elders-hero-10.jpg';

const defaultImages = [eldersHero1, eldersHero2, eldersHero3, eldersHero4, eldersHero5, eldersHero6, eldersHero7, eldersHero8, eldersHero9, eldersHero10];

interface TransitioningBackgroundProps {
  images?: string[]; // array of image URLs to transition between
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ images = defaultImages, interval = 10000, className = '', opacity = 0.25 }: TransitioningBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade transition to complete before updating indices
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 800); // Match the CSS transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [interval, nextIndex, images.length]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image - fades out during transition */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          transform: 'scale(1.05)',
          filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
          transition: 'opacity 0.8s ease-in-out',
          willChange: 'opacity',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 1,
        }}
      />
      
      {/* Next Image - fades in during transition */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          transform: 'scale(1.05)',
          filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
          transition: 'opacity 0.8s ease-in-out',
          willChange: 'opacity',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 2,
        }}
      />
      
      {/* Enhanced Multi-layer Overlay for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-background/70" style={{ opacity, zIndex: 3 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" style={{ opacity, zIndex: 3 }} />
    </div>
  );
};

export default TransitioningBackground;

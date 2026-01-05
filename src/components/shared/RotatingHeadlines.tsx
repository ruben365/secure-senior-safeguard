import { useState, useEffect } from "react";

interface RotatingHeadlinesProps {
  headlines: string[];
  interval?: number;
  className?: string;
}

// Simplified - no framer-motion, just CSS transitions
export const RotatingHeadlines = ({ 
  headlines, 
  interval = 4000,
  className = "text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
}: RotatingHeadlinesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
        setIsVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [headlines.length, interval]);

  // Returns a span, not h1 - parent should wrap in h1
  return (
    <span
      className={`${className} transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {headlines[currentIndex]}
    </span>
  );
};

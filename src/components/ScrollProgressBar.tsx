import { useState, useEffect } from "react";

// Simplified scroll progress bar - no framer-motion spring physics
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-[60]"
      style={{ 
        width: `${progress}%`,
        transition: 'width 100ms linear'
      }}
    />
  );
};

export default ScrollProgressBar;

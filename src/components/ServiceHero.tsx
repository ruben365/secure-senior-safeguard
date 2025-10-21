import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { getHeroConfig } from "@/data/heroImages";

interface ServiceHeroProps {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
}

const ServiceHero = ({ 
  children, 
  className, 
  overlay = true, 
  showScrollIndicator = false
}: ServiceHeroProps) => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const config = getHeroConfig(location.pathname);
  const currentSlide = config.slides[currentSlideIndex];

  // Preload all images
  useEffect(() => {
    const imagePromises = config.slides.map(slide => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = slide.image;
      });
    });
    
    Promise.all(imagePromises).then(() => {
      setCurrentImage(config.slides[0].image);
      setImagesLoaded(true);
    });
  }, [location.pathname]);

  // Auto-rotate slides
  useEffect(() => {
    if (!imagesLoaded || config.slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % config.slides.length);
        setIsVisible(true);
      }, 500);
    }, config.interval || 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded, config.slides.length, config.interval]);

  // Handle image transitions
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const newImage = config.slides[currentSlideIndex].image;
    if (newImage !== currentImage) {
      setNextImage(newImage);
      setShowNext(true);
      
      const timer = setTimeout(() => {
        setCurrentImage(newImage);
        setShowNext(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, imagesLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] flex items-center overflow-hidden", className)}>
      {/* Background with smooth crossfade */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        {/* Base Image Layer - Always visible */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            transform: 'translateZ(0)'
          }}
        />
        {/* Overlay Image Layer - Fades in on top */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out"
          style={{ 
            backgroundImage: showNext ? `url(${nextImage})` : 'none',
            opacity: showNext ? 1 : 0,
            transform: 'translateZ(0)',
            willChange: 'opacity',
            pointerEvents: 'none'
          }}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-40"
          style={{ 
            backgroundSize: '400% 400%', 
            animation: 'gradient-shift 15s ease infinite'
          }}
        />
      )}
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb" style={{ width: '120px', height: '120px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '80px', height: '80px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-3xl">
          <h1 
            className={cn(
              "text-white mb-4 [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {currentSlide.headline}
          </h1>
          {currentSlide.subheadline && (
            <p 
              className={cn(
                "text-white/90 text-xl md:text-2xl mb-6 leading-relaxed transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {currentSlide.subheadline}
            </p>
          )}
          {children && (
            <div 
              className={cn(
                "transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default ServiceHero;

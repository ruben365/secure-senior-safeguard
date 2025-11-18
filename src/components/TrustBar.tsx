import { Shield, MapPin, Award, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TrustBar = () => {
  const [familiesCount, setFamiliesCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Counter animation
  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const startTime = performance.now();
    const end = 500;

    const easeOutQuad = (t: number) => t * (2 - t);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      const currentCount = Math.floor(end * easedProgress);
      setFamiliesCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected", useCounter: true, count: familiesCount },
    { icon: MapPin, text: "Based in Kettering, Ohio" },
    { icon: Award, text: "Veteran Supportive Business" },
    { icon: Globe, text: "BBB A+ Rating • Supporting St. Jude" },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
            Serving 500+ Families in Greater Dayton Since 2024
          </h2>
        </div>
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Enhanced multi-layer glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-2xl opacity-60 group-hover/trust:opacity-90 transition-opacity duration-700 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl opacity-40 group-hover/trust:opacity-70 transition-opacity duration-700" />
          
          {/* Animated shimmer border effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-40 group-hover/trust:opacity-70 transition-opacity duration-500">
            <div 
              className="absolute inset-[-3px] rounded-3xl"
              style={{
                background: 'conic-gradient(from 180deg, transparent 0%, transparent 60%, rgba(59, 130, 246, 0.8) 70%, rgba(147, 51, 234, 0.8) 80%, transparent 90%, transparent 100%)',
                animation: 'spin 4s linear infinite',
              }}
            />
          </div>
          
          {/* Main content card with enhanced styling */}
          <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border-2 border-white/50 group-hover/trust:shadow-[0_20px_60px_rgb(0,0,0,0.2)] group-hover/trust:border-primary/20 transition-all duration-500">
            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 lg:gap-6">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 group/badge flex-shrink-0 opacity-0 animate-trust-badge-in cursor-pointer" 
                  style={{ 
                    animationDelay: `${index * 200 + 300}ms`,
                    animationFillMode: 'forwards',
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? '0.7' : '1',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="listitem"
                >
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/20 to-primary/25 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-500 shadow-[0_4px_20px_rgba(59,130,246,0.25)] group-hover/badge:shadow-[0_8px_30px_rgba(59,130,246,0.5)] border border-white/30 group-hover/badge:border-primary/30" 
                    style={{ animationDelay: `${index * 200 + 500}ms` }}
                    aria-hidden="true"
                  >
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/30 to-accent/30 blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />
                    <item.icon className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary drop-shadow-[0_2px_8px_rgba(59,130,246,0.6)] group-hover/badge:scale-110 group-hover/badge:drop-shadow-[0_4px_12px_rgba(59,130,246,0.8)] transition-all duration-500" />
                  </div>
                  <span className="text-xs md:text-sm lg:text-base font-bold text-foreground drop-shadow-sm group-hover/badge:scale-105 group-hover/badge:text-primary transition-all duration-300 min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: 2x2 grid, vertical on very small screens */}
            <div className="flex sm:hidden flex-col gap-3">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 group/badge opacity-0 animate-trust-badge-in min-h-[44px] px-3 py-2 rounded-xl active:bg-white/10 transition-all duration-300" 
                  style={{ 
                    animationDelay: `${index * 200 + 300}ms`,
                    animationFillMode: 'forwards'
                  }}
                  role="listitem"
                >
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/20 to-primary/25 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-active/badge:scale-110 transition-all duration-500 shadow-[0_4px_20px_rgba(59,130,246,0.25)] group-active/badge:shadow-[0_8px_30px_rgba(59,130,246,0.5)] border border-white/30 group-active/badge:border-primary/30" 
                    style={{ animationDelay: `${index * 200 + 500}ms` }}
                    aria-hidden="true"
                  >
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/30 to-accent/30 blur-md opacity-0 group-active/badge:opacity-100 transition-opacity duration-500" />
                    <item.icon className="relative w-6 h-6 text-primary drop-shadow-[0_2px_8px_rgba(59,130,246,0.6)] group-active/badge:scale-110 group-active/badge:drop-shadow-[0_4px_12px_rgba(59,130,246,0.8)] transition-all duration-500" />
                  </div>
                  <span className="text-sm font-bold text-foreground drop-shadow-sm flex-1">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

import { Shield, MapPin, Award, UserCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
const TrustBar = () => {
  const [familiesCount, setFamiliesCount] = useState(500);
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
      {
        threshold: 0.3,
      },
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
    {
      icon: Shield,
      text: "500+ Families Protected",
      useCounter: true,
      count: familiesCount,
    },
    {
      icon: MapPin,
      text: "Serving Greater Dayton Area",
    },
    {
      icon: Award,
      text: "Veteran Supportive Business",
    },
    {
      icon: UserCheck,
      text: "Expert Cybersecurity Team",
    },
  ];
  return (
    <div
      ref={counterRef}
      className="relative z-10 px-4 sm:px-6"
      role="complementary"
      aria-label="Trust indicators"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-5 border-b border-border/60">
          {trustIndicators.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-default"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${hoveredIndex === i ? "text-[#d96c4a]" : "text-[#d96c4a]/70"}`}
                />
                <span className="font-medium">
                  {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TrustBar;

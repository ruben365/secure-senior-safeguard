import { Shield, MapPin, Award, UserCheck } from "lucide-react";
import { useState } from "react";
const TrustBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const trustIndicators = [
    {
      icon: Shield,
      text: "500+ Families Protected",
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
                <span className="font-medium">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TrustBar;

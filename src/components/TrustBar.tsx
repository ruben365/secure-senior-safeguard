import { Shield, Star, Award, Lock, Globe } from "lucide-react";

const TrustBar = () => {
  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Rating (243 Reviews)" },
    { icon: Award, text: "Veteran-Founded & Operated" },
    { icon: Lock, text: "Privacy-First Guarantee" },
    { icon: Globe, text: "EN • ES • FR" },
  ];

  return (
    <div className="bg-secondary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {trustIndicators.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm md:text-base">
              <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-foreground/80 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

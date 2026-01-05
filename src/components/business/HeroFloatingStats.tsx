import { Shield, Star, Award, Lock } from "lucide-react";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Star Rating" },
    { icon: Award, text: "Cybersecurity Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-20 w-full max-w-5xl px-4">
      <div 
        className="rounded-full py-4 px-8 md:px-12 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)]"
        style={{
          background: "linear-gradient(90deg, #4c1d95 0%, #06b6d4 100%)",
        }}
      >
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 text-white"
            >
              <stat.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                {stat.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFloatingStats;

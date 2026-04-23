import { Shield, Star, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";
import "./HeroFloatingStats.css";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "Client-Reviewed" },
    { icon: Award, text: "Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none hidden lg:block">
      {/* Soft warm aura behind the card — blends into the design system orange */}
      <div
        aria-hidden="true"
        className="hfs-aura absolute inset-0 -z-10 rounded-full blur-3xl opacity-60"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.7, type: "spring", stiffness: 90 }}
        className="hfs-card relative pointer-events-auto rounded-full py-5 px-7 overflow-hidden"
      >
        {/* Top specular highlight — gives the card a glassy "polished" feel */}
        <div
          aria-hidden="true"
          className="hfs-specular absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
        />

        {/* Subtle bottom shadow band for depth */}
        <div
          aria-hidden="true"
          className="hfs-bottom-line absolute inset-x-4 bottom-0 h-px pointer-events-none"
        />

        <div className="relative flex items-center gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.12, duration: 0.5, type: "spring" }}
              className="flex items-center gap-3 group cursor-default"
            >
              <div className="hfs-icon-tile relative w-7 h-7 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                {/* Inner glow on hover */}
                <div
                  aria-hidden="true"
                  className="hfs-icon-glow absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <stat.icon
                  className="relative w-[18px] h-[18px] text-[#0f172a] transition-colors duration-300 group-hover:text-[#d96c4a]"
                  strokeWidth={1.75}
                />
              </div>
              <span className="text-[14px] font-bold text-[#0f172a]/90 whitespace-nowrap tracking-tight">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroFloatingStats;

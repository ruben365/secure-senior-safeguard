import { motion } from "framer-motion";

interface HeroPurpleOverlayProps {
  intensity?: "light" | "medium" | "strong";
}

/**
 * Animated purple gradient overlay for hero sections
 * Provides visual depth with floating orbs and geometric patterns
 * while keeping text clear and readable
 */
export const HeroPurpleOverlay = ({ intensity = "medium" }: HeroPurpleOverlayProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary purple-tinted gradient from left - enhanced for text visibility */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              hsl(260 70% 15% / 0.85) 0%,
              hsl(280 60% 20% / 0.7) 30%,
              hsl(260 50% 30% / 0.5) 60%,
              hsl(260 40% 25% / 0.4) 100%
            )
          `,
        }}
      />
      
      {/* Secondary gradient for depth from left */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to right,
              hsl(220 50% 10% / 0.7) 0%,
              hsl(260 40% 15% / 0.5) 40%,
              transparent 70%
            )
          `,
        }}
      />
      
      {/* Top-to-bottom gradient for vertical text contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              hsl(260 60% 20% / 0.4) 0%,
              transparent 25%,
              transparent 75%,
              hsl(220 50% 10% / 0.5) 100%
            )
          `,
        }}
      />

      {/* Animated floating orb 1 - Large, slow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 50% / 0.25) 0%, transparent 70%)",
          top: "-10%",
          right: "-15%",
        }}
        animate={{
          x: [0, 50, 0, -30, 0],
          y: [0, 30, 60, 20, 0],
          scale: [1, 1.1, 1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated floating orb 2 - Medium, moderate speed */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(260 65% 55% / 0.2) 0%, transparent 70%)",
          bottom: "10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 40, 20, -20, 0],
          y: [0, -40, -20, 30, 0],
          scale: [1, 0.9, 1.05, 1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Animated floating orb 3 - Small accent */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, hsl(300 60% 50% / 0.15) 0%, transparent 70%)",
          top: "40%",
          left: "30%",
        }}
        animate={{
          x: [0, -30, 20, 40, 0],
          y: [0, 20, -30, 10, 0],
          opacity: [0.5, 0.8, 0.6, 0.7, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Geometric accent - Rotating ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] border border-purple-400/10 rounded-full"
        style={{
          top: "20%",
          right: "5%",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Second rotating ring - counter rotation */}
      <motion.div
        className="absolute w-[350px] h-[350px] border border-purple-300/5 rounded-full"
        style={{
          bottom: "15%",
          left: "10%",
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(260 50% 70%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(260 50% 70%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette effect for focus on center content */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 50%,
              transparent 0%,
              hsl(260 50% 10% / 0.3) 100%
            )
          `,
        }}
      />

      {/* Bottom gradient fade for text readability */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: `
            linear-gradient(
              to top,
              hsl(260 50% 8% / 0.5) 0%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
};

export default HeroPurpleOverlay;

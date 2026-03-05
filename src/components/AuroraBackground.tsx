import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  variant?: 'hero' | 'mesh' | 'soft';
  className?: string;
}

/**
 * Animated aurora gradient mesh background with multiple translucent
 * color layers creating depth and vibrancy. Colors:
 * Deep Plum #8B6B8A, Rose Gold #D4A5A5, Peach #E8C4B8,
 * Lavender #B8A9C9, Lilac Mist #D4C4E0, Cream Blush #F5E6DC,
 * Muted Coral #E0B4A8
 */
const AuroraBackground = ({ variant = 'mesh', className = '' }: AuroraBackgroundProps) => {
  const baseClass = variant === 'hero' ? 'gradient-hero' : variant === 'soft' ? 'gradient-soft' : 'gradient-mesh';

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Static gradient base */}
      <div className={`absolute inset-0 ${baseClass}`} />

      {/* Animated aurora blob 1 — Deep Plum, bottom-left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          background: 'rgba(139, 107, 138, 0.45)',
          filter: 'blur(120px)',
          left: '-10%', bottom: '-5%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated aurora blob 2 — Rose Gold, mid-left */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'rgba(212, 165, 165, 0.35)',
          filter: 'blur(100px)',
          left: '-5%', top: '30%',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Animated aurora blob 3 — Peach, bottom-right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 550, height: 550,
          background: 'rgba(232, 196, 184, 0.4)',
          filter: 'blur(120px)',
          right: '-8%', bottom: '5%',
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -40, 25, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Animated aurora blob 4 — Lavender, top-right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'rgba(212, 196, 224, 0.3)',
          filter: 'blur(100px)',
          right: '-10%', top: '0%',
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Animated aurora blob 5 — Cream Blush, center */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          background: 'rgba(245, 230, 220, 0.45)',
          filter: 'blur(120px)',
          left: '30%', top: '25%',
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -25, 35, 0],
          scale: [1, 1.12, 0.88, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Animated aurora blob 6 — Muted Coral, bottom accent */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 350, height: 350,
          background: 'rgba(224, 180, 168, 0.35)',
          filter: 'blur(100px)',
          left: '20%', bottom: '10%',
        }}
        animate={{
          x: [0, -35, 45, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
};

export default AuroraBackground;

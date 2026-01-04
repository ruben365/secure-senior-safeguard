// ============================================
// SIMPLIFIED FRAMER MOTION VARIANTS
// Clean, fast, no blur filters
// ============================================

import { TIMING, EASING } from './animation-config';

// Simple fade up (most common)
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }
};

// Simple fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.out }
  }
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }
};

// Slide from left
export const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }
};

// Slide from right
export const slideRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
};

// Stagger item
export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  }
};

// Modal/Dialog animation
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: TIMING.fast, ease: EASING.out }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: TIMING.instant }
  }
};

// Hover effect
export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03, 
    transition: { duration: TIMING.fast, ease: EASING.out } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: TIMING.instant } 
  }
};

// Float animation (for decorative elements)
export const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Rotate slowly (for icons/decorations)
export const rotateAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// ===== LEGACY EXPORTS (for compatibility) =====

export const blurReveal = fadeUp;
export const elasticPop = scaleIn;
export const sweepUp = fadeUp;
export const diagonalReveal = fadeUp;
export const morphScale = scaleIn;
export const cascadeContainer = staggerContainer;
export const cascadeItem = staggerItem;
export const waveContainer = staggerContainer;
export const waveItem = staggerItem;
export const fadeInUp = fadeUp;
export const fadeInDown = fadeUp;
export const fadeInLeft = slideLeft;
export const fadeInRight = slideRight;
export const slideInFromBottom = fadeUp;
export const glowFloat = floatAnimation;
export const breathe = floatAnimation;
export const orbit = rotateAnimation;
export const magneticHover = hoverScale;
export const pulseGlow = floatAnimation;
export const letterAnimation = staggerItem;
export const textReveal = staggerItem;
export const cardFlip = scaleIn;

// Page transition (simplified)
export const cinematicPage = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: TIMING.fast }
  },
  exit: { 
    opacity: 0,
    transition: { duration: TIMING.instant }
  }
};

export const pageTransition = cinematicPage;
export const curtainReveal = fadeIn;
export const shimmerGradient = floatAnimation;

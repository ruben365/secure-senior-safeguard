// ============================================
// UNIFIED ANIMATION SYSTEM - Single Source of Truth
// ============================================

// Core timing constants (in seconds)
export const TIMING = {
  instant: 0.1,    // 100ms - micro-interactions
  fast: 0.15,      // 150ms - hover states
  normal: 0.2,     // 200ms - reveals, transitions
  slow: 0.3,       // 300ms - page transitions
} as const;

// Standard easing curves
export const EASING = {
  smooth: [0.4, 0, 0.2, 1] as const,      // Material Design standard
  bounce: [0.34, 1.56, 0.64, 1] as const, // Subtle elastic
  out: [0.0, 0, 0.2, 1] as const,         // Ease out
  in: [0.4, 0, 1, 1] as const,            // Ease in
} as const;

// Stagger delays (in seconds)
export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
} as const;

// GPU-accelerated transform presets (no blur filters!)
export const TRANSFORMS = {
  fadeUp: { 
    from: { opacity: 0, y: 12 }, 
    to: { opacity: 1, y: 0 } 
  },
  fadeIn: { 
    from: { opacity: 0 }, 
    to: { opacity: 1 } 
  },
  scaleIn: { 
    from: { opacity: 0, scale: 0.98 }, 
    to: { opacity: 1, scale: 1 } 
  },
  slideLeft: { 
    from: { opacity: 0, x: -20 }, 
    to: { opacity: 1, x: 0 } 
  },
  slideRight: { 
    from: { opacity: 0, x: 20 }, 
    to: { opacity: 1, x: 0 } 
  },
} as const;

// CSS class mappings
export const ANIMATION_CLASSES = {
  'fade-up': 'scroll-fade-up',
  'fade-in': 'scroll-fade-in', 
  'scale': 'scroll-scale-in',
  'slide-left': 'scroll-slide-left',
  'slide-right': 'scroll-slide-right',
} as const;

export type AnimationType = keyof typeof ANIMATION_CLASSES;

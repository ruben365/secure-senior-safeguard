interface AuroraBackgroundProps {
  variant?: 'hero' | 'mesh' | 'soft';
  className?: string;
}

/**
 * Pure-CSS aurora background — no framer-motion, minimal GPU cost.
 * Uses 3 blurred blobs with CSS keyframe animations instead of 6 JS-driven ones.
 */
const AuroraBackground = ({ variant = 'mesh', className = '' }: AuroraBackgroundProps) => {
  const baseClass = variant === 'hero' ? 'gradient-hero' : variant === 'soft' ? 'gradient-soft' : 'gradient-mesh';

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${baseClass}`} />
      <div className="aurora-blob-1 aurora-blob-css" />
      <div className="aurora-blob-2 aurora-blob-css" />
      <div className="aurora-blob-3 aurora-blob-css" />
    </div>
  );
};

export default AuroraBackground;

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Floating3DImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  floatIntensity?: 'subtle' | 'medium' | 'strong';
  hoverScale?: boolean;
}

/**
 * Floating3DImage component for 3D object imagery with floating animations.
 * - Uses responsive containers to prevent cropping
 * - Adds floating/hover animations to objects
 * - Maintains full visibility of the main subject on all screen sizes
 */
export const Floating3DImage = ({
  src,
  alt,
  className,
  containerClassName,
  floatIntensity = 'medium',
  hoverScale = true,
}: Floating3DImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const floatAnimations = {
    subtle: 'animate-float-subtle',
    medium: 'animate-float-medium',
    strong: 'animate-float-strong',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl md:rounded-3xl',
        containerClassName
      )}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Floating image container */}
      <div className={cn(
        'w-full h-full transition-transform duration-700 ease-out',
        floatAnimations[floatIntensity],
        hoverScale && 'hover:scale-[1.02]'
      )}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            // Use object-contain to show full image, object-cover for aesthetic fill
            'object-contain md:object-cover',
            // Background for mobile letterboxing
            'bg-slate-900/50',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5 pointer-events-none opacity-50" />
    </div>
  );
};

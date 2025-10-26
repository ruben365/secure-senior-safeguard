import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  objectPosition = 'center center'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (priority) {
      // Preload high-priority images
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  if (error) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center",
          className
        )}
      >
        <div className="text-muted-foreground text-sm">Image unavailable</div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          objectFit: 'cover',
          objectPosition: objectPosition,
          filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
        }}
      />
    </div>
  );
};

export default OptimizedImage;

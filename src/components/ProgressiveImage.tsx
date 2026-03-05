import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

// Global cache
const loadedImages = new Set<string>();

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
}: ProgressiveImageProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full object-cover",
          className,
        )}
      />
    </div>
  );
}

// Preload critical images
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach((url) => {
    if (!loadedImages.has(url)) {
      const img = new Image();
      img.onload = () => loadedImages.add(url);
      img.src = url;
    }
  });
};

// Check if cached
export const isImageCached = (url: string) => loadedImages.has(url);

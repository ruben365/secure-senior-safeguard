import { memo, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  objectFit = "cover",
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const shouldUseWebP = /\.(jpg|jpeg|png)$/i.test(src);

  return (
    <picture>
      {shouldUseWebP && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        sizes={sizes}
        onError={() => setHasError(true)}
        className={cn(
          hasError && "bg-muted",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          className,
        )}
        {...props}
      />
    </picture>
  );
});

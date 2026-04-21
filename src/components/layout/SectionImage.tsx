import { cn } from "@/lib/utils";

type Variant = "wide" | "split-left" | "split-right" | "compact-trio";

interface SectionImageProps {
  src: string;
  alt: string;
  caption?: string;
  variant?: Variant;
  width?: number;
  height?: number;
  className?: string;
  /** For compact-trio variant only */
  images?: Array<{ src: string; alt: string }>;
  /** For split variants — block of supporting text */
  children?: React.ReactNode;
}

/**
 * SectionImage — Lightweight, opt-in photography block for body sections.
 * Inherits floating-card aesthetic (rounded, soft elevation).
 * All images include explicit dimensions to prevent CLS.
 */
export function SectionImage({
  src,
  alt,
  caption,
  variant = "wide",
  width = 1600,
  height = 900,
  className,
  images,
  children,
}: SectionImageProps) {
  if (variant === "compact-trio" && images && images.length > 0) {
    return (
      <div className={cn("my-8 md:my-10", className)}>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {images.slice(0, 3).map((img, i) => (
            <figure
              key={i}
              className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
        {caption && (
          <p className="mt-3 text-center text-xs text-muted-foreground italic">
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (variant === "split-left" || variant === "split-right") {
    const imageOnRight = variant === "split-right";
    return (
      <div className={cn("my-8 md:my-12", className)}>
        <div
          className={cn(
            "grid gap-6 md:gap-8 items-center",
            "grid-cols-1 md:grid-cols-5",
          )}
        >
          <figure
            className={cn(
              "md:col-span-3 relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-[0_12px_32px_-12px_rgba(15,23,42,0.18)]",
              imageOnRight ? "md:order-2" : "md:order-1",
            )}
            style={{ aspectRatio: "16 / 10" }}
          >
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </figure>
          <div
            className={cn(
              "md:col-span-2 text-left",
              imageOnRight ? "md:order-1" : "md:order-2",
            )}
          >
            {children}
            {caption && !children && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {caption}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // wide (default)
  return (
    <figure className={cn("my-8 md:my-10", className)}>
      <div
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-[0_16px_40px_-16px_rgba(15,23,42,0.20)]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default SectionImage;

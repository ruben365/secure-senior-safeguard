import { ReactNode } from "react";

interface CompactLegalHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string | ReactNode;
  accentColor?: string;
}

/**
 * Lightweight gradient hero for legal/policy pages.
 * No image, no animations on critical path. Honors prefers-reduced-motion.
 */
export function CompactLegalHero({
  eyebrow = "Legal",
  title,
  lede,
  accentColor = "hsl(var(--primary))",
}: CompactLegalHeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-border/40 bg-background min-h-[40dvh] sm:min-h-[45dvh] flex items-center"
      aria-label={`${title} hero`}
    >
      {/* Aurora ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, hsl(var(--primary) / 0.10) 0%, transparent 70%), radial-gradient(50% 45% at 85% 70%, hsl(var(--accent) / 0.08) 0%, transparent 75%)",
        }}
      />

      {/* Soft dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5 border border-border/60 bg-card/60"
            style={{ color: accentColor }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: accentColor }}
              aria-hidden="true"
            />
            {eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-[1.1]">
            {title}
          </h1>
          {lede && (
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {lede}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CompactLegalHero;

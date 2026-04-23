import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";

interface HeroCTAProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  aiScan?: boolean;
  primaryAriaLabel?: string;
  secondaryAriaLabel?: string;
}

/**
 * Shared hero CTA button pair used across public-facing pages.
 * Uses internal Link for relative paths and <a> for tel: hrefs.
 * All buttons stack vertically on mobile (full-width) and row on sm+.
 */
export function HeroCTA({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  aiScan,
  primaryAriaLabel,
  secondaryAriaLabel,
}: HeroCTAProps) {
  const isExternal = (href: string) =>
    href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-start items-stretch sm:items-center">
      {isExternal(primaryHref) ? (
        <Button size="heroPill" variant="heroPrimary" asChild className="w-full sm:w-auto justify-center">
          <a href={primaryHref} aria-label={primaryAriaLabel}>
            {primaryText}
          </a>
        </Button>
      ) : (
        <Button size="heroPill" variant="heroPrimary" asChild className="w-full sm:w-auto justify-center">
          <Link to={primaryHref} aria-label={primaryAriaLabel}>
            {primaryText}
          </Link>
        </Button>
      )}

      {isExternal(secondaryHref) ? (
        <Button size="heroPill" variant="heroOutline" asChild className="w-full sm:w-auto justify-center">
          <a href={secondaryHref} aria-label={secondaryAriaLabel}>
            {secondaryText}
          </a>
        </Button>
      ) : (
        <Button size="heroPill" variant="heroOutline" asChild className="w-full sm:w-auto justify-center">
          <Link to={secondaryHref} aria-label={secondaryAriaLabel}>
            {secondaryText}
          </Link>
        </Button>
      )}

      {aiScan && (
        <Link
          to="/training/ai-analysis"
          aria-label="Try our AI scanner"
          className="inline-flex items-center justify-center gap-1.5 h-[40px] px-4 rounded-full text-[12px] font-semibold text-white/75 border border-white/20 bg-white/[0.07] backdrop-blur-sm hover:bg-white/[0.13] hover:text-white transition-all w-full sm:w-auto"
        >
          <Scan className="w-3 h-3 flex-shrink-0" />
          AI Scan
        </Link>
      )}
    </div>
  );
}

export default HeroCTA;

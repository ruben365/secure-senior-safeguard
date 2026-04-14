import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroCTAProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  primaryAriaLabel?: string;
  secondaryAriaLabel?: string;
}

/**
 * Shared hero CTA button pair used across public-facing pages.
 * Uses internal Link for relative paths and <a> for tel: hrefs.
 */
export function HeroCTA({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  primaryAriaLabel,
  secondaryAriaLabel,
}: HeroCTAProps) {
  const isExternal = (href: string) =>
    href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-start">
      {isExternal(primaryHref) ? (
        <Button size="heroPill" variant="heroPrimary" asChild>
          <a href={primaryHref} aria-label={primaryAriaLabel}>
            {primaryText}
          </a>
        </Button>
      ) : (
        <Button size="heroPill" variant="heroPrimary" asChild>
          <Link to={primaryHref} aria-label={primaryAriaLabel}>
            {primaryText}
          </Link>
        </Button>
      )}

      {isExternal(secondaryHref) ? (
        <Button size="heroPill" variant="heroOutline" asChild>
          <a href={secondaryHref} aria-label={secondaryAriaLabel}>
            {secondaryText}
          </a>
        </Button>
      ) : (
        <Button size="heroPill" variant="heroOutline" asChild>
          <Link to={secondaryHref} aria-label={secondaryAriaLabel}>
            {secondaryText}
          </Link>
        </Button>
      )}
    </div>
  );
}

export default HeroCTA;

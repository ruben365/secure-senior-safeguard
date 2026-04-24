import { memo } from "react";

/**
 * Cinematic overlay for hero text readability
 * Gradient ensures text is legible while preserving image impact
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Desktop: left-to-right dark panel so text column is readable */}
      <div className="absolute inset-0 bg-transparent sm:bg-gradient-to-r sm:from-[rgba(14,10,8,0.65)] sm:via-[rgba(18,12,9,0.30)] sm:to-transparent" />
      {/* Mobile: uniform dark veil so background photos don't overwhelm text */}
      <div className="absolute inset-0 bg-black/50 sm:bg-transparent" />
      {/* All sizes: bottom lift */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,10,8,0.55)] via-transparent to-transparent" />
      {/* Top strip for nav legibility */}
      <div className="absolute inset-x-0 top-0 h-[4.5rem] bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;

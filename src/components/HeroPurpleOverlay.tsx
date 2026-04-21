import { memo } from "react";

/**
 * Cinematic overlay for hero text readability
 * Gradient ensures text is legible while preserving image impact
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-transparent sm:bg-gradient-to-r sm:from-[rgba(14,10,8,0.55)] sm:via-[rgba(18,12,9,0.25)] sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,10,8,0.30)] via-transparent to-transparent" />
    </div>
  );
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;

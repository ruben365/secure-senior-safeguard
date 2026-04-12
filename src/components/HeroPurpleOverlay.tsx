import { memo } from "react";

/**
 * Cinematic overlay for hero text readability
 * Gradient ensures text is legible while preserving image impact
 */
const HeroPurpleOverlay = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(260_18%_12%/0.3)] via-[hsl(260_14%_12%/0.12)] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_18%_8%/0.12)] via-transparent to-transparent" />
    </div>
  );
});

HeroPurpleOverlay.displayName = "HeroPurpleOverlay";

export default HeroPurpleOverlay;

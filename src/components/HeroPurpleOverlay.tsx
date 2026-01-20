import { memo } from "react";

/**
 * Simple dark tint overlay for hero text readability
 * 30% opacity black tint - no animations, no colors, just readability
 */
const HeroPurpleOverlay = memo(() => {
  // Overlay disabled - no dark tint on hero sections
  return null;
});

HeroPurpleOverlay.displayName = 'HeroPurpleOverlay';

export default HeroPurpleOverlay;

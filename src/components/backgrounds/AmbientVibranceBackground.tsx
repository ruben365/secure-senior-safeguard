/**
 * AmbientVibranceBackground
 * Sitewide fixed animated background. Mounted once at the app root.
 * Pure presentational, no props, no state, no effects.
 * Honors prefers-reduced-motion via CSS only.
 * Opt-out: add `no-ambient-vibrance` class to <body> on routes that need it.
 */
export function AmbientVibranceBackground() {
  return (
    <div className="ambient-vibrance-bg" aria-hidden="true">
      <span
        className="vibe-orb vibe-orb--xl vibe-orb--peach"
        style={{ top: "-8%", left: "-6%", animationDelay: "-4s", animationDuration: "32s" }}
      />
      <span
        className="vibe-orb vibe-orb--lg vibe-orb--lavender"
        style={{ top: "20%", right: "-4%", animationDelay: "-10s", animationDuration: "28s" }}
      />
      <span
        className="vibe-orb vibe-orb--xl vibe-orb--coral"
        style={{ bottom: "-10%", left: "30%", animationDelay: "-18s", animationDuration: "36s" }}
      />
      <span
        className="vibe-orb vibe-orb--lg vibe-orb--sky"
        style={{ bottom: "10%", right: "20%", animationDelay: "-26s", animationDuration: "30s" }}
      />
    </div>
  );
}

export default AmbientVibranceBackground;



## Sitewide Animated Vibrance Background

Goal: lift the existing `vibe-orb` + `vibe-mesh` animation system from opt-in section wrappers into a global, fixed background that lives behind the entire site. Colors stay exactly as they are today (cream base, plum/copper/peach/lavender accents) — only the motion and presence change.

### What changes

A single fixed-position background layer mounted once at the app root. It sits behind every page (z-index: -1) and animates softly across the whole viewport. Hero sections and footer keep their existing treatments and will visually layer on top without alteration.

### Design — "Ambient Vibrance"

**Layer stack (bottom to top, all `position: fixed; inset: 0; z-index: -1`)**

1. **Cream base** — existing `--background` (hsl 30 25% 97%), unchanged
2. **Mesh wash** — three soft radial gradients in peach (hsl 28 90% 78%), lavender (hsl 265 60% 75%), and warm coral (hsl 14 85% 70%), all at 8–12% opacity, blended with `mix-blend-mode: multiply`
3. **Drifting orbs** — 4 large blurred orbs (peach, lavender, coral, sky) at 320–480px, blur 80px, opacity 0.18, animated with the existing `vibe-orb-drift` keyframes at 28–36s loops with staggered delays
4. **Optional grain** — existing `vibe-grain` SVG noise at 2% opacity for premium depth

**Motion**
- Orbs drift on existing `vibe-orb-drift` (already defined, 24s ease-in-out infinite) — no new keyframes
- Each orb uses a different `animation-delay` (-4s, -10s, -18s, -26s) so the field never feels in sync
- `prefers-reduced-motion: reduce` → orbs become static, no animation
- `pointer-events: none` on every layer so clicks pass through

**Colors — strictly preserved**
- No new color tokens. Reuses the same HSL values already in `vibrance.css`
- All pages keep their current backgrounds; this layer sits *behind* everything
- Pages with existing solid backgrounds (Auth, Admin) opt out via a body class

### Files touched

```text
NEW   src/components/backgrounds/AmbientVibranceBackground.tsx   (~50 lines — fixed orb container)
EDIT  src/styles/vibrance.css                                    (~60 lines added — .ambient-vibrance-bg utilities, opacity tuning for global use)
EDIT  src/App.tsx                                                (mount <AmbientVibranceBackground /> once inside the providers, before <main>)
EDIT  src/index.css                                              (~10 lines — body class hook to disable on opt-out routes)
```

### Implementation specifics

**`AmbientVibranceBackground.tsx`** — pure presentational component, no props, no state, no effects. Mounts once. Reads `prefers-reduced-motion` via CSS only. Uses existing `.vibe-orb`, `.vibe-orb--lg`, `.vibe-orb--xl`, `.vibe-orb--coral`, `.vibe-orb--lavender`, `.vibe-orb--peach`, `.vibe-orb--sky` classes wrapped in a new `.ambient-vibrance-bg` fixed container.

**`App.tsx`** — single line addition inside the root provider, before `<main>`. No route logic, no conditional rendering at the React level.

**`vibrance.css` additions**
```css
.ambient-vibrance-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  /* base mesh wash */
  background-image:
    radial-gradient(at 18% 22%, hsl(14 85% 78% / 0.10) 0%, transparent 55%),
    radial-gradient(at 82% 28%, hsl(265 60% 80% / 0.09) 0%, transparent 55%),
    radial-gradient(at 50% 88%, hsl(28 90% 80% / 0.08) 0%, transparent 60%);
}
.ambient-vibrance-bg .vibe-orb { opacity: 0.18; }
body.no-ambient-vibrance .ambient-vibrance-bg { display: none; }
```

**Opt-out** (via body class set in route components, not the background itself)
- `/auth/*` — keep its own dedicated background
- `/admin/*`, `/portal/*` — internal dashboards have their own solid surfaces

### Constraints respected

- Colors unchanged — same HSL values already in the codebase
- No new tokens, no token edits
- `pointer-events: none` on every layer
- Honors `prefers-reduced-motion: reduce` — orbs freeze
- `backdrop-filter` not used (orbs use `filter: blur` only — already in spec)
- Honors existing `zoom: 0.75` root scaling
- No `transition: all`
- Hero sections, footer, `stroke-glass` widgets, `pay-card` system — all untouched
- Performance: only 4 fixed orbs total for the entire site (vs. 3 per `MeshBackground` instance previously) — net reduction in animated nodes

### Out of scope

- Hero components and hero CSS
- Footer
- Auth, Admin, Portal pages (opt out via body class)
- Color palette changes
- Existing `MeshBackground`, `GlassmorphismBackground`, `vibe-section` wrappers — kept as-is for components that explicitly use them; the global layer simply adds ambient motion behind them
- Any logic, data, hooks, routes, edge functions
- Pre-existing TypeScript build errors

### Estimated diff

~50 lines new component + ~60 lines CSS + 2 lines in App.tsx + 10 lines in index.css. Zero deletions.


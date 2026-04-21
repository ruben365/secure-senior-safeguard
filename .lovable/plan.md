

## Bento Grid Layout System

Goal: add a reusable CSS-only Bento Grid system (asymmetric tiled layouts inspired by editorial/Apple-style product pages) that any body section can opt into. Pure CSS additions to the existing `gx-*` editorial system. Heroes and footer untouched.

### What gets added

One additive block appended to `src/styles/graphic-enhancement.css` (~140 lines). No new files, no JSX restructuring required to define the system.

### The Bento system — class anatomy

```text
.gx-bento                  → the grid container (12-col, auto-rows, gap)
  .gx-bento-tile           → base tile (cream surface, maroon hairline, layered shadow)
    .gx-bento--feature     → spans 6 cols × 2 rows (hero tile)
    .gx-bento--wide        → spans 8 cols × 1 row
    .gx-bento--tall        → spans 4 cols × 2 rows
    .gx-bento--square      → spans 4 cols × 1 row (default)
    .gx-bento--small       → spans 3 cols × 1 row
  .gx-bento-tile__eyebrow  → maroon eyebrow inside tile
  .gx-bento-tile__title    → plum heading
  .gx-bento-tile__body     → muted body
  .gx-bento-tile__media    → image/illustration slot (aspect-locked)
  .gx-bento-tile--accent   → maroon-tinted background variant
  .gx-bento-tile--dark     → plum background, cream text variant
  .gx-bento-tile--media    → media-first tile (image fills, text overlays bottom)
```

### Visual signature

- 12-column CSS grid, `gap: 18px` desktop / `12px` mobile
- Auto-flow dense so tiles pack tightly without gaps
- Tile radius: 16px (matches `.gx-card-tile`)
- Surface: cream `#faf7f2` with 1px maroon hairline at 14% opacity
- Shadow: layered plum shadow `0 8px 24px -10px rgba(90,42,90,0.14), 0 2px 6px -2px rgba(26,19,32,0.08)`
- Hover: 1.5px maroon ring (24% opacity), `translateY(-2px)`, 240ms ease
- Top-left maroon corner-mark (10×10, 1.5px L-bracket) on `--feature` and `--accent` variants
- Accent variant: `rgba(122,46,42,0.06)` background tint + maroon left rail (3px)
- Dark variant: plum bg `#5a2a5a`, cream text, copper hairline accents
- Media variant: image at top (16/9 or 4/3), gradient fade scrim, text pinned to bottom-left

### Responsive behavior

```text
≥1024px: 12-col grid, full bento layout
640–1023px: 6-col grid, --feature/--wide collapse to 6, --tall stays 3
<640px: 1-col stack, all tiles full-width, --feature keeps emphasis with thicker shadow
```

### Optional row presets

```text
.gx-bento--row-hero     → 1 feature + 2 squares (3 tiles)
.gx-bento--row-trio     → 3 equal squares
.gx-bento--row-asym     → 1 wide + 1 tall + 2 small (4 tiles)
.gx-bento--row-mosaic   → 1 feature + 1 tall + 3 small (5 tiles, dense pack)
```

These let any page drop in a ready-made arrangement with one wrapper class.

### Where it can be used

The system is opt-in — defined now, applied wherever the user wants later. Natural fits include:
- `Resources.tsx` content showcase
- `Business.tsx` services overview
- `Training.tsx` program highlights
- `About.tsx` values/pillars section
- `Index.tsx` home secondary sections (NOT the hero)

No pages are auto-modified in this pass. The classes simply become available.

### Files touched

```text
EDIT  src/styles/graphic-enhancement.css   (~140 lines appended)
```

That is the only file. No new files, no component changes, no JSX edits.

### Constraints respected

- No JSX changes, no new components, no logic, no dependencies
- No edits to heroes, footer, Auth, Admin, Portal
- No edits to Plume tokens, button system, Tailwind config, or `index.css`
- Uses existing maroon/plum/copper/cream from the `gx-*` token layer
- Mobile-first; touch targets ≥44px preserved on interactive tiles
- No `transition: all`, no `backdrop-filter`, no framer-motion
- Honors `prefers-reduced-motion` (lift disabled)
- Honors `zoom: 0.75` root scaling
- WCAG AA contrast on all variants (plum on cream 12:1, cream on plum 11:1, maroon on cream 8.9:1)

### Out of scope

- Auto-applying bento to existing pages (system is defined, application is a separate request)
- Heroes, footer, internal dashboards
- Color tokens, typography tokens
- Pre-existing TypeScript errors

### Estimated diff

~140 lines new CSS in a single file. Zero deletions, zero new files, zero JSX changes.


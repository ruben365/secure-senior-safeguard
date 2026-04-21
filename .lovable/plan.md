

## Reduce Orange, Introduce Warm Maroon Accent

Goal: tone down the dominant copper/orange (`#d96c4a`) used across the editorial graphic system and complement it with a warm maroon (`#7a2e2a`) so the palette reads richer, deeper, and more grounded — without breaking the existing plum/cream identity.

### Color shift

| Token | Before | After | Usage |
|-------|--------|-------|-------|
| Copper accent | `#d96c4a` (vivid orange) | `#b85a3e` (muted terracotta, ~20% less saturated) | Reduced presence, used only for active/hover states |
| **NEW** Maroon | — | `#7a2e2a` (warm maroon) | New primary editorial accent for rules, eyebrows, rails, glyphs |
| **NEW** Maroon-soft | — | `rgba(122, 46, 42, 0.12)` | Backgrounds, halos, subtle fills |
| Plum | `#5a2a5a` (kept) | `#5a2a5a` (kept) | Unchanged — still primary headline color |
| Cream | kept | kept | Unchanged |

The maroon sits between plum and copper on the warm spectrum, giving the site a more editorial, magazine-like feel rather than a citrus/orange feel.

### Where the swap happens

All changes are confined to `src/styles/graphic-enhancement.css` (the `gx-*` system added in the recent passes). The Plume design tokens, button system, and hero styles are NOT touched.

| Class | Change |
|-------|--------|
| `.gx-eyebrow` | Color → maroon `#7a2e2a`, left rule → maroon |
| `.gx-heading::after` underline | Background → maroon |
| `.gx-divider` gradient + glyph | Maroon at 30% opacity |
| `.gx-figure` shadow tint | Maroon-tinted instead of copper |
| `.gx-quote` opening glyph | Maroon |
| `.gx-card-elevated:hover` ring | Maroon at 40% |
| `.gx-card-tile` corner L-bracket | Maroon |
| `.gx-map` inner ring + corner mark | Maroon |
| `.gx-fab` halo + pulse glow | Maroon halo, copper kept ONLY as 1px hairline highlight |
| `.gx-feed` left rail | Maroon |
| `.gx-dialog` top accent bar | Gradient: maroon → muted terracotta → maroon (warmer, less orange) |
| `.gx-accordion` open-state rail + tint | Maroon rail, maroon-soft background |
| `.gx-carousel` active dot | Maroon |
| `.gx-bg-corner-mark` | Maroon |

Copper `#b85a3e` (the muted version) is retained ONLY as a secondary highlight on:
- FAB inner hairline (1px)
- Carousel idle dots (at 30% opacity)
- `gx-card-elevated` subtle top-edge glint

This keeps a hint of warmth/glow without the orange dominance.

### Files touched

```text
EDIT  src/styles/graphic-enhancement.css   (~40 color value swaps, no structural change)
```

That is the only file. Pure find-and-replace within one stylesheet.

### Constraints respected

- No JSX changes, no logic, no new components
- No edits to heroes, footer, Auth, Admin, Portal
- No edits to Plume design tokens, button system, or `index.css`
- Plum, cream, and overall warm light theme preserved
- Contrast ratios: maroon `#7a2e2a` on cream `#FBF7F0` = 8.9:1 (WCAG AAA), exceeds the previous copper's 4.6:1
- No `transition: all`, no new animations
- Honors `prefers-reduced-motion`

### Out of scope

- Plume design tokens (`--background`, `--primary`, etc.)
- Button gradients (terracotta neo-tactile system stays)
- Hero colors and hero CSS
- Footer
- Tailwind config color tokens
- Any logic, data, or routes

### Estimated diff

~40 line edits in a single CSS file. Zero deletions, zero new files.


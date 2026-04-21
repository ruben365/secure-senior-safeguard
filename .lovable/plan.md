

## Apply Heavy Rounded Corners + Floating Card Effect to All Containers

Goal: give every container surface site-wide a unified "floating card" look — heavy `2rem` rounded corners, a subtle 1px stroke, and a soft diffused shadow. Heroes and footer are not touched.

### What "Floating Card" means here

A consistent visual treatment on every container surface (cards, panels, dialogs, popovers, glass surfaces):

| Property | Value | Purpose |
|----------|-------|---------|
| `border-radius` | `2rem` (32px) | Heavy, glass-style rounding |
| `border` | `1px solid rgba(15, 23, 42, 0.06)` | Subtle hairline stroke |
| `box-shadow` | Multi-layer diffused | Floating depth |
| `transition` | `220ms cubic-bezier` | Smooth hover lift |

### What gets added

```text
NEW   src/styles/floating-cards.css        (~140 lines, pure CSS)
EDIT  src/index.css                         (+1 line @import — last in cascade)
```

Zero JSX edits. Zero new dependencies. Zero token changes. Plume palette untouched.

### CSS module — `floating-cards.css`

#### 1. CSS custom properties

```css
:root {
  --float-radius: 2rem;                              /* 32px heavy rounding */
  --float-radius-sm: 1.25rem;                        /* 20px for nested/small */
  --float-border: 1px solid rgba(15, 23, 42, 0.06);  /* subtle 1px stroke */
  --float-shadow:
    0 1px 2px 0 rgba(15, 23, 42, 0.04),
    0 4px 12px -2px rgba(15, 23, 42, 0.05),
    0 16px 32px -8px rgba(15, 23, 42, 0.06);
  --float-shadow-hover:
    0 2px 4px 0 rgba(15, 23, 42, 0.05),
    0 8px 20px -4px rgba(15, 23, 42, 0.07),
    0 24px 48px -12px rgba(15, 23, 42, 0.08);
}
```

#### 2. Auto-applied to container surfaces (heroes + footer excluded)

Every selector uses the same exclusion guard:

```css
/* Cards */
.card:not(.hero-home .card):not(.hero-business .card):not(.hero-workshops .card):not(footer .card):not(.site-footer .card),

/* Glass surfaces */
.glass:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
.glass-card:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
.glass-vibe:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
.glass-vibe-card:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),

/* Panels */
.panel:not(.hero-home .panel):not(.hero-business .panel):not(.hero-workshops .panel):not(footer .panel):not(.site-footer .panel),
[data-widget="panel"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
[data-widget="card"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *) {
  border-radius: var(--float-radius) !important;
  border: var(--float-border) !important;
  box-shadow: var(--float-shadow) !important;
  transition:
    box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### 3. Hover lift

```css
.card:not(.hero-home .card)…:hover,
.glass:not(.hero-home *)…:hover,
[data-widget="card"]:not(.hero-home *)…:hover {
  box-shadow: var(--float-shadow-hover) !important;
  border-color: rgba(15, 23, 42, 0.10) !important;
}
```

#### 4. Dialogs, popovers, dropdowns (Radix surfaces)

```css
[role="dialog"]:not(.hero-home *):not(footer *),
[role="alertdialog"]:not(.hero-home *):not(footer *),
[data-radix-popper-content-wrapper]:not(.hero-home *):not(footer *) > *,
[role="menu"]:not(.hero-home *):not(footer *),
[role="listbox"]:not(.hero-home *):not(footer *),
[role="tooltip"]:not(.hero-home *):not(footer *) {
  border-radius: var(--float-radius) !important;
  border: var(--float-border) !important;
  box-shadow: var(--float-shadow) !important;
}

/* Tooltips stay smaller */
[role="tooltip"]:not(.hero-home *):not(footer *) {
  border-radius: var(--float-radius-sm) !important;
}
```

#### 5. Override the global zero-shadow reset

`src/index.css` (lines 67-73) zeroes `--tw-shadow` globally. The new file uses direct `box-shadow` declarations with `!important` to bypass that reset (same pattern already used by `soft-elevation.css`).

#### 6. Honor existing rules

- `prefers-reduced-motion` disables transitions and hover lift
- `@media print` strips all radius, border, and shadow
- Honors `zoom: 0.75` (rem-based values scale correctly)
- Honors `backdrop-filter ≤ 12px` (no backdrop changes)
- Buttons, inputs, badges, chips: NOT touched (they keep their own pill/rounded radii from the Neo-Tactile system)

#### 7. Composition with existing layers

| Layer | Owns |
|-------|------|
| `figma-sharpness.css` | Hairline rendering, type smoothing |
| `soft-elevation.css` | Multi-level `el-1` … `el-5` utility shadows |
| `floating-cards.css` | **Container radius + border + base shadow (THIS FILE)** |

Imported last so its `!important` declarations win on container surfaces.

### Constraints respected

- **Hero pages and footer fully excluded** (`.hero-home`, `.hero-business`, `.hero-workshops`, `footer`, `.site-footer`)
- No JS, no logic, no new components, no JSX edits, no dependencies
- Honors `prefers-reduced-motion`, `zoom: 0.75`, `backdrop-filter ≤ 12px` rules
- Plume palette untouched — uses neutral `rgba(15, 23, 42, …)` only
- WCAG AA contrast preserved (decorative only)
- Buttons keep their pill shape (Neo-Tactile button system untouched)
- Print mode strips all decoration

### Out of scope

- Hero pages (homepage, business, workshops) — fully excluded
- Footer (any `footer` element or `.site-footer`) — fully excluded
- Buttons, inputs, badges, chips, avatars (keep existing radii)
- Plume tokens, Tailwind config, JSX, logic, routes, data
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/floating-cards.css        (~140 lines)
EDIT  src/index.css                         (+1 line @import after soft-elevation)
```

### Estimated diff

~140 lines new CSS + 1 line `@import` in `src/index.css`. Zero deletions, zero JSX changes, zero logic changes.


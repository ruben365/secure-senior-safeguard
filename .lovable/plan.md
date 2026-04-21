

## Add Soft Elevation: Low-Opacity Drop Shadow Widget Design

Goal: introduce a subtle, low-opacity drop-shadow elevation system across widgets (cards, panels, buttons, popovers, dialogs) so the UI gains gentle depth without harsh edges. Heroes and footer are not touched.

### What "Soft Elevation" means here

A modern "soft elevation" system uses **low-opacity, multi-layer shadows** that sit just barely visible — they suggest depth rather than announcing it. Think Linear, Vercel, or Notion: shadows you feel but don't see directly.

Five elevation levels, each a stack of 2-3 low-opacity shadows:

| Level | Use case | Y-offset | Blur | Opacity |
|-------|----------|----------|------|---------|
| `el-1` | Resting cards, inputs | 1px | 2-4px | 0.03-0.05 |
| `el-2` | Hovered cards, chips | 2-4px | 6-12px | 0.04-0.06 |
| `el-3` | Popovers, dropdowns | 4-8px | 16-24px | 0.05-0.08 |
| `el-4` | Dialogs, modals | 8-16px | 24-40px | 0.06-0.10 |
| `el-5` | Overlays, command palettes | 16-24px | 40-60px | 0.08-0.12 |

### What gets added

```text
NEW   src/styles/soft-elevation.css        (~160 lines, pure CSS)
EDIT  src/index.css                         (+1 line @import after figma-sharpness)
```

Zero JSX edits. Zero new dependencies. Zero token changes. Plume palette untouched.

### CSS module — `soft-elevation.css`

#### 1. CSS custom properties (the system)

```css
:root {
  /* Soft elevation tokens — low-opacity, multi-layer */
  --el-1:
    0 1px 2px 0 rgba(15, 23, 42, 0.04),
    0 1px 3px 0 rgba(15, 23, 42, 0.03);
  --el-2:
    0 2px 4px -1px rgba(15, 23, 42, 0.05),
    0 4px 8px -2px rgba(15, 23, 42, 0.04);
  --el-3:
    0 4px 8px -2px rgba(15, 23, 42, 0.06),
    0 12px 24px -4px rgba(15, 23, 42, 0.05);
  --el-4:
    0 8px 16px -4px rgba(15, 23, 42, 0.08),
    0 24px 40px -8px rgba(15, 23, 42, 0.06);
  --el-5:
    0 16px 32px -8px rgba(15, 23, 42, 0.10),
    0 40px 60px -16px rgba(15, 23, 42, 0.08);
  
  /* Warm tint variant — uses plum from Plume palette */
  --el-warm-2:
    0 2px 4px -1px rgba(122, 46, 42, 0.04),
    0 4px 8px -2px rgba(122, 46, 42, 0.03);
  --el-warm-3:
    0 4px 8px -2px rgba(122, 46, 42, 0.05),
    0 12px 24px -4px rgba(122, 46, 42, 0.04);
}
```

#### 2. Utility classes (opt-in)

```css
.el-1 { box-shadow: var(--el-1); }
.el-2 { box-shadow: var(--el-2); }
.el-3 { box-shadow: var(--el-3); }
.el-4 { box-shadow: var(--el-4); }
.el-5 { box-shadow: var(--el-5); }
.el-warm-2 { box-shadow: var(--el-warm-2); }
.el-warm-3 { box-shadow: var(--el-warm-3); }

/* Smooth elevation transitions on hover */
.el-hover {
  transition: box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
.el-hover:hover {
  box-shadow: var(--el-3);
  transform: translateY(-1px);
}
```

#### 3. Auto-applied to common widget surfaces (with hero/footer guards)

Every selector excludes hero pages and footer:

```css
/* Cards — resting el-1, hovered el-2 */
.card:not(.hero-home .card):not(.hero-business .card):not(.hero-workshops .card):not(footer .card):not(.site-footer .card),
[data-widget="card"] {
  box-shadow: var(--el-1);
  transition: box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Popovers, dropdowns — el-3 */
[role="menu"]:not(.hero-home *):not(footer *),
[role="listbox"]:not(.hero-home *):not(footer *),
[role="tooltip"]:not(.hero-home *):not(footer *),
[data-radix-popper-content-wrapper]:not(.hero-home *):not(footer *) > * {
  box-shadow: var(--el-3);
}

/* Dialogs, modals — el-4 */
[role="dialog"]:not(.hero-home *):not(footer *),
[role="alertdialog"]:not(.hero-home *):not(footer *) {
  box-shadow: var(--el-4);
}

/* Buttons — gentle el-1 at rest, el-2 on hover */
button:not([class*="ghost"]):not([class*="link"])
  :not(.hero-home button):not(.hero-business button):not(.hero-workshops button):not(footer button) {
  /* applied via filter to coexist with existing shadows */
}
```

#### 4. Composition rule (coexists with `figma-sharpness.css`)

The existing figma-sharpness layer adds a hairline ring shadow. Soft elevation **stacks underneath** that ring rather than replacing it, so widgets get both:
- The crisp Figma hairline (from `figma-sharpness.css`)
- Plus the soft low-opacity drop (from `soft-elevation.css`)

This is achieved by writing the soft-elevation rules with lower specificity, letting figma-sharpness's `box-shadow` declaration win where both apply, OR by using `filter: drop-shadow()` on widgets that need both layers.

```css
/* Use filter for widgets where both layers are desired */
.el-stack {
  filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.04))
          drop-shadow(0 4px 12px rgba(15, 23, 42, 0.05));
}
```

#### 5. Reduced-motion + dark-mode safety

```css
@media (prefers-reduced-motion: reduce) {
  .el-hover { transition: none; }
  .el-hover:hover { transform: none; }
}

/* Print: strip all elevation */
@media print {
  [class*="el-"] { box-shadow: none !important; filter: none !important; }
}
```

### Constraints respected

- **Hero pages and footer untouched** — every auto-applied selector guards with `:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *)`
- No JS, no logic, no new components, no JSX edits, no dependencies
- Honors `prefers-reduced-motion` (transitions/transforms disabled)
- Honors `zoom: 0.75` root scaling (uses px values that survive zoom)
- Honors existing `backdrop-filter ≤ 12px` rule (no backdrop changes)
- Plume palette untouched — uses `rgba(15, 23, 42, …)` (slate) and `rgba(122, 46, 42, …)` (existing plum) only
- Coexists with `figma-sharpness.css` via lower specificity and optional `filter: drop-shadow()` stacking
- WCAG AA contrast preserved (decorative only)
- Print mode strips all elevation

### Out of scope

- Hero pages (homepage, business, workshops) — fully excluded
- Footer (any `footer` element or `.site-footer`) — fully excluded
- Plume tokens, Tailwind config, JSX, logic, routes, data
- Dark mode (project is light-only per Plume rules)
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/soft-elevation.css        (~160 lines)
EDIT  src/index.css                         (+1 line @import after figma-sharpness)
```

### Estimated diff

~160 lines new CSS + 1 line `@import` in `src/index.css`. Zero deletions, zero JSX changes, zero logic changes.


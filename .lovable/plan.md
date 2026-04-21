

## Soft Drop Shadows — Widgets, Forms, Cards, Buttons

Goal: add a unified, editorial "soft drop shadow" system to widgets, form controls, cards, and buttons sitewide. Pure CSS additions to the existing `gx-*` system. Heroes and footer untouched.

### Shadow philosophy

Layered, low-opacity, plum-tinted shadows (matching the Plume theme) that create depth without harshness. Three intensities: **rest → hover → active**. Warm tone (uses plum + maroon mix) so shadows feel cohesive with the cream/maroon/plum palette rather than generic gray.

### Shadow tokens (added to `:root` in `graphic-enhancement.css`)

```text
--gx-shadow-xs   → 0 1px 2px rgba(90,42,90,0.06), 0 1px 1px rgba(26,19,32,0.04)
--gx-shadow-sm   → 0 2px 6px -1px rgba(90,42,90,0.08), 0 1px 3px rgba(26,19,32,0.05)
--gx-shadow-md   → 0 6px 16px -4px rgba(90,42,90,0.10), 0 2px 6px -2px rgba(26,19,32,0.06)
--gx-shadow-lg   → 0 12px 28px -8px rgba(90,42,90,0.14), 0 4px 10px -4px rgba(26,19,32,0.08)
--gx-shadow-xl   → 0 20px 44px -12px rgba(90,42,90,0.18), 0 8px 16px -6px rgba(26,19,32,0.10)
--gx-shadow-focus → 0 0 0 3px rgba(122,46,42,0.18), 0 2px 8px -2px rgba(122,46,42,0.20)
--gx-shadow-press → 0 1px 2px rgba(90,42,90,0.10), inset 0 1px 2px rgba(26,19,32,0.06)
```

### Utility classes added (~120 lines)

```text
.gx-shadow-soft         → md shadow at rest
.gx-shadow-soft-sm      → sm shadow
.gx-shadow-soft-lg      → lg shadow
.gx-shadow-soft-xl      → xl shadow (for floating widgets)
.gx-shadow-lift         → md → lg on hover, translateY(-2px), 240ms
.gx-shadow-float        → lg → xl on hover, translateY(-3px) (widgets)
.gx-shadow-press-fx     → press shadow on :active
.gx-shadow-focus-ring   → focus-visible ring with maroon halo
```

### Auto-applied via attribute selectors (no JSX needed)

The system auto-targets common UI primitives so existing widgets/forms/cards/buttons gain shadows without className edits:

```text
/* Cards (shadcn data-slot="card") */
[data-slot="card"]                    → gx-shadow-soft at rest
[data-slot="card"]:hover              → gx-shadow-soft-lg + translateY(-2px)

/* Buttons (shadcn data-slot="button") — except hero/auth/admin scoped */
[data-slot="button"]:not(.no-gx-shadow)
  → gx-shadow-sm at rest
  → gx-shadow-md on hover
  → gx-shadow-press on active
  → gx-shadow-focus on focus-visible

/* Form inputs */
input, textarea, select, [data-slot="input"], [data-slot="textarea"], [data-slot="select-trigger"]
  → gx-shadow-xs at rest
  → gx-shadow-sm on hover
  → gx-shadow-focus on focus-visible (replaces default ring)

/* Floating widgets — FAB, tooltips, popovers */
[data-slot="popover-content"], [data-slot="tooltip-content"],
[data-slot="dropdown-menu-content"], [data-slot="hover-card-content"]
  → gx-shadow-soft-xl

/* Dialogs already handled by .gx-dialog — left untouched */
```

### Scoping (what does NOT receive shadows)

To respect existing styling on heroes/footer/internal screens, the auto-shadow rules are gated by an `:not()` exclusion list:

```text
.hero-section *, [data-hero] *, .hero *,
footer *, [data-slot="footer"] *,
.no-gx-shadow, .no-gx-shadow *
  → opt-out, no shadow change
```

The `.no-gx-shadow` escape class lets any element opt out cleanly.

### Bento, glass, and gx-card-* tiles

Already have layered shadows — left untouched. The new system only touches surfaces that currently have flat or default Tailwind shadows.

### Files touched

```text
EDIT  src/styles/graphic-enhancement.css   (~120 lines appended)
```

That is the only file. No JSX changes, no component edits, no new files.

### Constraints respected

- No JSX changes, no logic, no new components, no dependencies
- No edits to heroes, footer, Auth, Admin, Portal screens
- No edits to Plume tokens, button neo-tactile gradients, Tailwind config, or `index.css`
- Neo-Tactile button system preserved — shadows stack additively under existing gradient/border styling
- Honors `prefers-reduced-motion` (lift translate disabled, shadows still applied)
- Honors `zoom: 0.75` (all values relative)
- WCAG focus visibility improved (maroon focus ring at 3px, exceeds 2px minimum)
- Touch targets unchanged
- No `transition: all`, no `backdrop-filter`, no framer-motion

### Out of scope

- Heroes, footer, internal dashboards
- Color tokens, typography
- Pre-existing TypeScript errors

### Estimated diff

~120 lines new CSS appended to a single file. Zero deletions, zero new files, zero JSX changes.


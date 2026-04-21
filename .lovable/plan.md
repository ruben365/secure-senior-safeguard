

## Expand Widget Design System: More Styles + Better Content Density

Goal: build on the existing layers (`figma-sharpness`, `soft-elevation`, `floating-cards`, `button-contrast-fix`) by adding a richer widget vocabulary — more visual variants, better content scaffolding (eyebrows, dividers, metrics, status pills, empty states) — so cards stop looking identical and start communicating hierarchy. Heroes and footer untouched.

### What's missing today

The current system gives every card the same look: 2rem radius, hairline border, soft shadow. That's a great baseline, but every widget reads identically — there's no visual difference between a KPI card, a list card, a feature card, or a metric card. Content inside also lacks scaffolding: no eyebrows, no dividers, no status chips, no compact metric rows.

### What gets added

```text
NEW   src/styles/widget-variants.css       (~220 lines, pure CSS)
NEW   src/styles/widget-content.css        (~180 lines, pure CSS)
EDIT  src/index.css                         (+2 lines @import — last in cascade)
```

Zero JSX edits. Zero new dependencies. Zero token changes. Plume palette respected.

### Layer 1 — `widget-variants.css` (visual styles)

Six opt-in widget variants, applied via `data-variant="…"` or class. All respect hero/footer exclusions.

| Variant | Look | Use case |
|---------|------|----------|
| `data-variant="elevated"` | Stronger shadow, no border | Hero KPIs, primary metrics |
| `data-variant="outlined"` | 1.5px border, no shadow | Secondary panels, forms |
| `data-variant="tinted"` | Cream/plum tint background | Featured/highlighted cards |
| `data-variant="accent-bar"` | 4px left accent stripe | Status, alerts, categories |
| `data-variant="gradient"` | Subtle warm-to-cream gradient | Hero metrics, CTAs |
| `data-variant="ghost"` | Transparent, dashed border | Empty states, drop zones |

Plus three accent-bar color tokens that piggyback on Plume:
- `data-accent="terracotta"` (default brand)
- `data-accent="plum"` (secondary)
- `data-accent="success" | "warning" | "danger"` (status)

Example rule:
```css
[data-variant="accent-bar"]:not(.hero-home *):not(footer *) {
  border-left: 4px solid #d96c4a !important;
  padding-left: 1.25rem;
}
[data-variant="accent-bar"][data-accent="success"]:not(.hero-home *):not(footer *) {
  border-left-color: #16a34a !important;
}
```

Also adds:
- **`data-density="compact"`** — tighter padding (`1rem` vs `1.5rem`), smaller radius (`1.25rem`)
- **`data-density="spacious"`** — generous padding (`2.5rem`), larger radius (`2.5rem`)
- **`data-interactive="true"`** — adds cursor pointer + hover lift + focus ring

### Layer 2 — `widget-content.css` (scaffolding inside widgets)

Reusable content primitives — pure CSS, opt-in via class:

**Eyebrow labels** (`.widget-eyebrow`)
```css
.widget-eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #d96c4a;
  margin-bottom: 0.5rem;
}
```

**Metric rows** (`.widget-metric`, `.widget-metric-value`, `.widget-metric-label`)
- Big number + small caption pattern
- Auto-sized: `2.25rem` value, `0.875rem` label, slate ink
- Supports inline trend indicator slot

**Status pills** (`.widget-pill`, `.widget-pill--success | warning | danger | info | neutral`)
- Soft tinted background, dark text, 999px radius
- Sizes: `--sm`, default, `--lg`

**Dividers** (`.widget-divider`, `.widget-divider--dashed`)
- 1px hairline using existing `--float-border` token
- Horizontal default, `.widget-divider--vertical` for inline use

**Section headers** (`.widget-section-title`)
- Smaller than card title, `font-weight: 600`, slate ink
- Optional right-aligned action slot (`.widget-section-action`)

**Empty states** (`.widget-empty`)
- Centered layout, muted text, optional icon slot, optional CTA slot
- Soft cream background with dashed border

**Stat trio rows** (`.widget-stat-row`)
- 3-column flex layout for compact "Total / Active / Pending"-style displays
- Auto-divides with vertical hairlines

**Inline list rows** (`.widget-list-row`)
- Hover-tinted, padded `0.75rem 1rem`, with leading icon + trailing meta slots
- Last child has no bottom border

**KPI card preset** (`.widget-kpi`)
- Combines: eyebrow + big metric + trend + accent stripe
- One class drops in a complete KPI surface

### Composition with existing layers

| Layer | Owns |
|-------|------|
| `figma-sharpness.css` | Hairline rendering, type smoothing |
| `soft-elevation.css` | `el-1` … `el-5` utility shadows |
| `floating-cards.css` | Container radius + border + base shadow |
| `button-contrast-fix.css` | Light-on-light button visibility |
| `widget-variants.css` (NEW) | **Per-card visual variants and density** |
| `widget-content.css` (NEW) | **Reusable scaffolding inside widgets** |

Variants override `floating-cards.css` defaults via higher-specificity attribute selectors (`[data-variant]`) and `!important` only where needed.

### How users adopt it

Existing JSX needs zero edits — every widget keeps its current look. To upgrade a card, add one or two attributes:

```tsx
// Before — generic floating card
<div className="card p-6">…</div>

// After — KPI elevated card with terracotta accent
<div className="card p-6" data-variant="accent-bar" data-accent="terracotta">
  <span className="widget-eyebrow">Pending</span>
  <div className="widget-metric">
    <span className="widget-metric-value">12</span>
    <span className="widget-metric-label">Bookings awaiting review</span>
  </div>
</div>
```

### Constraints respected

- **Hero pages and footer fully excluded** on every selector
- No JS, no new components, no JSX edits, no dependencies
- Honors `prefers-reduced-motion`, `zoom: 0.75`, `backdrop-filter ≤ 12px`
- Plume palette only (terracotta `#d96c4a`, plum `#7a2e2a`, cream `#fff7f2`, slate ink `#1e293b`)
- WCAG AA contrast preserved on all status pills and tinted variants
- Print mode strips variant decoration
- Coexists with Tailwind utilities — opt-in only, never auto-mutates content

### Out of scope

- Hero pages, footer (excluded)
- JSX edits to existing components (variants are opt-in)
- New React components
- Plume tokens, Tailwind config, routes, data, logic

### Files touched

```text
NEW   src/styles/widget-variants.css       (~220 lines)
NEW   src/styles/widget-content.css        (~180 lines)
EDIT  src/index.css                         (+2 lines @import after button-contrast-fix)
```

### Estimated diff

~400 lines new CSS + 2 lines `@import`. Zero deletions, zero JSX changes, zero logic changes.


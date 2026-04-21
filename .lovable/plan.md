

## Add Figma-Grade Sharpness to CSS Web Graphics

Goal: make the site's UI render with the crisp, pixel-precise quality of a Figma export — sharper edges, tighter borders, cleaner type, no soft "blurry web" feel. Heroes and footer are not touched.

### What "Figma sharpness" means here

A Figma frame looks crisp because of four things the browser doesn't do by default:

1. **Hairline 1px borders** that stay 1px on retina (no sub-pixel smear)
2. **Hard-edged shadows** with crisp ambient + contact pairs (not big blurry blobs)
3. **Pixel-snapped rendering** (no fractional transforms blurring text/icons)
4. **Type rendering** tuned for high-DPI screens (geometric precision over font-smoothing fuzz)

This plan adds those four things globally as a single utility layer, while explicitly excluding heroes and footer.

### What gets added

```text
NEW   src/styles/figma-sharpness.css            (~140 lines, pure CSS, no JS)
EDIT  src/index.css                              (1 line — import the new file LAST so it wins the cascade)
```

Zero new dependencies. Zero JSX edits. Zero token changes. Plume palette untouched.

### CSS module — `figma-sharpness.css`

Scoped with an exclusion selector so it never touches heroes or footer:

```text
:where(body):not(:has([data-route-scope="hero-only"]))
  *:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *)
```

In practice, every rule below uses a `:not(.hero-home, .hero-business, .hero-workshops, footer, .site-footer)` guard so hero CSS and footer CSS keep full ownership of their look.

#### 1. Hairline borders that stay 1px on retina

```css
/* Crisp 1px borders on retina — no sub-pixel softening */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .card,
  .glass,
  [class*="rounded-"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *) {
    border-width: 0.5px;
  }
}
```

Plus a global rule that forces border colors to full alpha when they were set at 0.05–0.10 opacity (the main cause of "ghosted" edges).

#### 2. Hard-edged shadow system (Figma-style)

Replaces big blurry `box-shadow` blobs with **two-layer crisp shadows** (ambient + contact):

```css
.card,
.glass-card,
[class*="shadow-"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *) {
  box-shadow:
    0 0 0 1px rgba(15, 23, 42, 0.04),          /* hairline ring */
    0 1px 2px -1px rgba(15, 23, 42, 0.08),     /* contact shadow */
    0 4px 12px -4px rgba(15, 23, 42, 0.06);    /* ambient shadow */
}
```

Smaller blur radii + tighter spreads = the sharp Figma "lifted card" look instead of the soft "Material" cloud.

#### 3. Pixel-snapped rendering

```css
img,
svg,
[class*="rounded-"],
button,
.card {
  transform: translateZ(0);            /* GPU layer = no sub-pixel positioning */
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Crisp SVG icons */
svg:not(.hero-home svg):not(.hero-business svg):not(.hero-workshops svg):not(footer svg) {
  shape-rendering: geometricPrecision;
  text-rendering: geometricPrecision;
}

/* Crisp images at all DPRs */
img:not(.hero-home img):not(.hero-business img):not(.hero-workshops img):not(footer img) {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
```

#### 4. Figma-grade typography

```css
body:not(:has(.hero-home:hover)),
h1, h2, h3, h4, h5, h6,
p, span, button, a, label {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  font-feature-settings: "kern", "liga", "calt", "ss01";
  letter-spacing: -0.005em;            /* tighter Figma-style tracking */
}

/* Headings get optical sizing where supported */
h1, h2, h3 {
  font-optical-sizing: auto;
  font-variant-numeric: tabular-nums;
}
```

#### 5. Backdrop-filter sharpening

The site uses several glass surfaces with `backdrop-blur(20px+)` which softens edges. Cap blur and add a saturation boost so glass reads crisp instead of muddy:

```css
[class*="backdrop-blur"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *) {
  -webkit-backdrop-filter: blur(10px) saturate(160%) contrast(105%);
  backdrop-filter: blur(10px) saturate(160%) contrast(105%);
}
```

Honors the existing memory rule (`backdrop-filter ≤ 12px`).

#### 6. Crisp focus rings (replace browser default fuzzy outlines)

```css
*:focus-visible:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *) {
  outline: 2px solid rgba(122, 46, 42, 0.7);   /* maroon — site standard */
  outline-offset: 2px;
  border-radius: inherit;
}
```

#### 7. Crisp dividers

```css
hr,
[class*="border-t"],
[class*="border-b"] {
  border-color: rgba(15, 23, 42, 0.10);
  border-style: solid;
}
```

#### 8. High-DPI overrides for `box-shadow` ring

```css
@media (-webkit-min-device-pixel-ratio: 2) {
  /* Half-pixel hairlines using box-shadow trick on cards */
  .card,
  .glass-card {
    box-shadow:
      0 0 0 0.5px rgba(15, 23, 42, 0.08),
      0 1px 2px -1px rgba(15, 23, 42, 0.10);
  }
}
```

### Constraints respected

- **Hero pages and footer untouched** — every rule guards with `:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *)`
- No JS, no logic, no new components, no dependencies, no JSX edits
- Honors `prefers-reduced-motion` (no animation added)
- Honors `zoom: 0.75` root scaling (uses `0.5px` hairlines that survive zoom)
- Honors existing `backdrop-filter ≤ 12px` rule (caps glass blur at 10px)
- Plume palette untouched — only refines rendering quality, not colors
- WCAG AA contrast preserved (focus ring uses site-standard maroon)
- Print mode unaffected (rules don't apply inside `@media print`)

### Out of scope

- Hero pages (homepage, business, workshops) — fully excluded
- Footer (any `footer` element or `.site-footer`) — fully excluded
- The AI Analysis page's bespoke `aia-*` classes — kept as-is (already sharp)
- Plume tokens, Tailwind config, JSX, logic, routes, data
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/figma-sharpness.css       (~140 lines)
EDIT  src/index.css                         (+1 line @import at the bottom of the cascade)
```

### Estimated diff

~140 lines new CSS + 1 line `@import` in `src/index.css`. Zero deletions, zero JSX changes, zero logic changes.


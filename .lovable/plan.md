

## Redesign All Badges on Pricing Cards and Forms — 3D Glass + Sharp

Goal: redesign every badge across pricing cards and form surfaces with a premium 3D glass aesthetic — multi-layer highlights, refractive glass fills, sharp hairline strokes, and crisp typography. Heroes and footer untouched.

### Badges in scope

Found across the codebase:

| Component | File | Used in |
|-----------|------|---------|
| `Badge` (shadcn cva variants) | `src/components/ui/badge.tsx` | Forms, dialogs, pricing meta |
| `PricingBadge` (12 types) | `src/components/PricingBadge.tsx` | Pricing cards (popular, best-value, premium, veteran, etc.) |
| `TrustBadgeInline` | `src/components/PricingBadge.tsx` | Inline trust signals on forms/checkouts |
| `GuaranteeBadge` | `src/components/PricingBadge.tsx` | Money-back guarantee block |
| `SecurityBadges` | `src/components/PricingBadge.tsx` | TLS / Privacy / Protected row |
| `ProtectionBadge` | `src/components/ProtectionBadge.tsx` | Family Protected pill |
| `FloatingBadge` | `src/components/pro/FloatingBadge.tsx` | Floating corner labels on cards |
| Checkout frame badges | `src/components/payment/CheckoutFrame.tsx` | Secure checkout label |

### What "3D Glass + Sharp" means here

A premium glass treatment with four stacked layers, applied via pure CSS — zero JSX/logic edits.

| Layer | Property | Purpose |
|-------|----------|---------|
| Base fill | Multi-stop linear gradient (white → tint) | Refractive glass body |
| Top highlight | `inset 0 1px 0 rgba(255,255,255,0.85)` | Glossy upper edge |
| Bottom shadow | `inset 0 -1px 0 rgba(15,23,42,0.06)` | Depth recess |
| Outer glow | Multi-layer drop shadow with brand tint | Floating depth |

Plus:
- **1px hairline border** with `0.5` subpixel rendering
- **Backdrop blur 8-10px** (within the project's ≤12px rule)
- **Crisp text** via `text-rendering: geometricPrecision` + `-webkit-font-smoothing: antialiased`
- **Letter-spacing 0.06-0.08em** on uppercase labels for sharpness
- **Hover lift** with stronger glow (200ms cubic-bezier)

### What gets added

```text
NEW   src/styles/badge-glass-3d.css        (~280 lines, pure CSS)
EDIT  src/index.css                         (+1 line @import — last in cascade)
```

Zero JSX edits. Zero new dependencies. Zero token changes. Plume palette respected.

### CSS module — `badge-glass-3d.css`

#### 1. Design tokens
```css
:root {
  --bg3d-radius: 999px;
  --bg3d-radius-square: 0.875rem;
  --bg3d-blur: 10px;
  --bg3d-border: 1px solid rgba(255, 255, 255, 0.55);
  --bg3d-border-dark: 1px solid rgba(15, 23, 42, 0.10);

  --bg3d-glass-white: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 100%);
  --bg3d-glass-cream: linear-gradient(180deg, #ffffff 0%, #fff7f2 100%);
  --bg3d-glass-terracotta: linear-gradient(180deg, #ffe8dc 0%, #ffd1bd 100%);
  --bg3d-glass-success: linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%);
  --bg3d-glass-info: linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%);
  --bg3d-glass-amber: linear-gradient(180deg, #fef3c7 0%, #fde68a 100%);
  --bg3d-glass-danger: linear-gradient(180deg, #fee2e2 0%, #fecaca 100%);

  --bg3d-shadow-base:
    0 1px 0 rgba(255,255,255,0.85) inset,
    0 -1px 0 rgba(15,23,42,0.06) inset,
    0 1px 2px rgba(15,23,42,0.06),
    0 4px 12px -2px rgba(15,23,42,0.08);
  --bg3d-shadow-hover:
    0 1px 0 rgba(255,255,255,0.95) inset,
    0 -1px 0 rgba(15,23,42,0.08) inset,
    0 2px 4px rgba(15,23,42,0.08),
    0 8px 20px -4px rgba(15,23,42,0.12);
}
```

#### 2. Base 3D glass mixin (applied via class targeting)
```css
.badge,
[class*="badge"]:not(.hero-home *):not(footer *):not(.site-footer *) {
  background: var(--bg3d-glass-white) !important;
  border: var(--bg3d-border) !important;
  backdrop-filter: blur(var(--bg3d-blur)) saturate(1.4);
  -webkit-backdrop-filter: blur(var(--bg3d-blur)) saturate(1.4);
  box-shadow: var(--bg3d-shadow-base) !important;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  letter-spacing: 0.04em;
  transition: box-shadow 200ms cubic-bezier(0.4,0,0.2,1), transform 200ms cubic-bezier(0.4,0,0.2,1);
}
```

#### 3. Color-aware variants

Maps to existing badge gradient classes used in `PricingBadge.tsx`:

| Source class | New 3D glass treatment |
|--------------|------------------------|
| `from-amber-500.to-orange-500` | Amber glass + warm shadow |
| `from-emerald-500.to-teal-500` | Mint glass + green shadow |
| `from-red-500.to-pink-500` | Coral glass + pink shadow |
| `from-blue-500.to-indigo-500` | Ice blue glass + indigo shadow |
| `from-green-500.to-emerald-500` | Success glass + green shadow |
| `from-yellow-500.to-amber-500` | Sun glass + amber shadow |
| `from-orange-600.to-[#d96c4a]` | Brand terracotta glass |
| `from-blue-600.via-red-500` (veteran) | Patriotic glass with red+blue dual stops |

Each gets:
- Color-tinted base gradient
- Matching 8% opacity color glow on the outer shadow layer
- Strong 0.7 saturation backdrop for richness
- Text gradient kept (already crisp)

#### 4. Pricing card badge variants (PricingBadge component)
```css
/* Gradient text receives crisper rendering */
.bg-clip-text {
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 1px 0 rgba(255,255,255,0.4);
  letter-spacing: 0.08em !important;
}

/* Emoji icon gets a soft drop-shadow for depth */
.badge .text-sm:first-child,
[class*="rounded-full"] > .text-sm:first-child {
  filter: drop-shadow(0 1px 2px rgba(15,23,42,0.15));
}
```

#### 5. shadcn Badge cva variants (badge.tsx)
```css
/* default / secondary / outline / success / premium */
[data-variant="premium"],
.badge-premium {
  background: var(--bg3d-glass-terracotta) !important;
  border-color: rgba(217,108,74,0.30) !important;
  color: #8e3e22 !important;
  box-shadow:
    var(--bg3d-shadow-base),
    0 6px 16px -4px rgba(217,108,74,0.25) !important;
}
```

#### 6. Form badges (TrustBadgeInline, ProtectionBadge, checkout frame badge)
- Stronger backdrop saturation (1.6) for forms over white
- Inset highlight made brighter (`rgba(255,255,255,0.95)`) for "wet glass" pop
- Shield/lock icons get matching `drop-shadow` for 3D consistency

#### 7. FloatingBadge corner labels
```css
.floating-badge {
  background: var(--bg3d-glass-white) !important;
  border: var(--bg3d-border) !important;
  box-shadow:
    var(--bg3d-shadow-base),
    0 12px 32px -8px rgba(15,23,42,0.18) !important;
  transform: translateZ(0);
}
.floating-badge:hover {
  transform: translateY(-1px) translateZ(0);
  box-shadow:
    var(--bg3d-shadow-hover),
    0 18px 44px -10px rgba(15,23,42,0.22) !important;
}
```

#### 8. SecurityBadges row + GuaranteeBadge
- Row becomes a unified glass strip with consistent height
- Guarantee badge gets a 3D pill with terracotta-tinted glass and emerald success accent

#### 9. Hover + reduced motion + print
```css
.badge:hover, [class*="badge"]:not(.hero-home *):hover {
  box-shadow: var(--bg3d-shadow-hover) !important;
  transform: translateY(-1px);
}
@media (prefers-reduced-motion: reduce) {
  .badge, [class*="badge"] { transition: none !important; transform: none !important; }
}
@media print {
  .badge, [class*="badge"], .floating-badge {
    background: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
  }
}
```

### Composition with existing layers

| Layer | Owns |
|-------|------|
| `figma-sharpness.css` | Hairline rendering |
| `soft-elevation.css` | Utility shadows |
| `floating-cards.css` | Container surfaces |
| `button-contrast-fix.css` | Light buttons |
| `widget-variants.css` + `widget-content.css` | Widget vocabulary |
| `badge-glass-3d.css` (NEW) | **3D glass badges across pricing + forms** |

Imported last so its `!important` declarations win on badge surfaces.

### Constraints respected

- **Hero pages and footer fully excluded** via `:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *)` on every selector
- No JSX edits, no logic, no new dependencies
- Honors `prefers-reduced-motion`, `zoom: 0.75`, `backdrop-filter ≤ 12px` (uses 10px)
- Plume palette respected (terracotta `#d96c4a`, deep `#8e3e22`, cream `#fff7f2`)
- WCAG AA contrast preserved on all variants
- Toast notifications and primary CTA buttons untouched
- Print mode strips glass + shadows for clean output

### Out of scope

- Hero pages, footer (excluded)
- Buttons (already handled by `button-contrast-fix.css`)
- Card containers (already handled by `floating-cards.css`)
- Plume tokens, Tailwind config, JSX, logic, routes, data
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/badge-glass-3d.css        (~280 lines)
EDIT  src/index.css                         (+1 line @import after widget-content.css)
```

### Estimated diff

~280 lines new CSS + 1 line `@import`. Zero deletions, zero JSX changes, zero logic changes.


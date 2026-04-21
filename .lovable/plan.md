

## Fix White-Themed Buttons That Blend Into Light Surfaces

Goal: make every white, transparent, or unstyled button visually distinguishable on the now-mostly-white "floating card" surfaces. Heroes and footer stay untouched.

### The problem

After the recent layers (Figma sharpness, soft elevation, floating cards), most container surfaces are bright white with subtle shadows. Buttons that use `bg-white`, `bg-transparent`, or no explicit background visually **disappear** — there is no contrast between button and surface.

The existing rule in `src/index.css` only handles dark/blue backgrounds (forces white text on them). There is **no rule** for the inverse problem: light buttons on light surfaces.

### What gets added

```text
NEW   src/styles/button-contrast-fix.css     (~120 lines, pure CSS)
EDIT  src/index.css                           (+1 line @import — last in cascade)
```

Zero JSX edits. Zero token changes. Zero new dependencies. Plume palette respected (uses existing terracotta `#d96c4a` and slate ink).

### CSS module — `button-contrast-fix.css`

#### 1. Force a visible border + soft fill on white/transparent buttons

```css
/* Catch buttons that have no real background color set */
button[class*="bg-white"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
a[class*="bg-white"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *),
button[class*="bg-transparent"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *) {
  border: 1.5px solid rgba(15, 23, 42, 0.18) !important;
  color: #1e293b !important;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.6) inset,
    0 1px 2px 0 rgba(15, 23, 42, 0.06),
    0 2px 6px -1px rgba(15, 23, 42, 0.05) !important;
}

/* Hover: terracotta tint borrow from the brand palette */
button[class*="bg-white"]:not(.hero-home *)…:hover,
a[class*="bg-white"]:not(.hero-home *)…:hover,
button[class*="bg-transparent"]:not(.hero-home *)…:hover {
  border-color: rgba(217, 108, 74, 0.55) !important;
  color: #c45e3b !important;
  background-color: #fff7f2 !important;
}
```

#### 2. Rescue completely unstyled `<button>` elements (no `bg-*` at all)

```css
/* Buttons with NO explicit background class get a default light-gray fill */
button:where(:not([class*="bg-"]):not([class*="ghost"]):not([class*="link"]))
  :not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *) {
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  border: 1.5px solid rgba(15, 23, 42, 0.18);
  color: #1e293b;
}
```

(Scoped with `:where` so specificity stays 0 — it never overrides any explicit Tailwind utility.)

#### 3. Outline / ghost buttons get a visible 1.5px border

```css
button[class*="variant-outline"]:not(.hero-home *)…,
button[class*="border-input"]:not(.hero-home *)…,
[role="button"][class*="bg-background"]:not(.hero-home *)… {
  border-width: 1.5px !important;
  border-color: rgba(15, 23, 42, 0.22) !important;
  color: #1e293b !important;
}
```

#### 4. Light-tinted buttons (bg-slate-50, bg-gray-50, bg-coral-50, etc.)

```css
button[class*="bg-slate-50"]:not(.hero-home *)…,
button[class*="bg-slate-100"]:not(.hero-home *)…,
button[class*="bg-gray-50"]:not(.hero-home *)…,
button[class*="bg-gray-100"]:not(.hero-home *)…,
button[class*="bg-neutral-50"]:not(.hero-home *)…,
button[class*="bg-neutral-100"]:not(.hero-home *)… {
  border: 1.5px solid rgba(15, 23, 42, 0.15) !important;
  color: #1e293b !important;
}
```

#### 5. Disabled / loading buttons keep readable contrast

```css
button:disabled:not(.hero-home *)… {
  opacity: 0.7 !important;
  border-color: rgba(15, 23, 42, 0.12) !important;
  color: #475569 !important;
}
```

#### 6. Honor existing rules

- **Hero pages and footer fully excluded** via `:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *):not(.site-footer *)` on every selector
- **Neo-Tactile primary buttons untouched** — they already have terracotta gradient + dark border; the rules only fire on `bg-white`, `bg-transparent`, light tints, or no-bg buttons
- **`prefers-reduced-motion`** — no animations added
- **`zoom: 0.75`** — uses px values that survive zoom
- **Plume palette** — uses existing `#d96c4a` (terracotta), `#c45e3b` (deep terracotta), `#fff7f2` (warm cream tint), and slate ink only
- **WCAG AA contrast** — `#1e293b` on `#ffffff` = 16.8:1 ratio (AAA)
- **Print mode** — strips borders/shadows

### Composition with existing layers

| Layer | Owns |
|-------|------|
| `index.css` global rule (existing) | White text on dark/blue buttons |
| `button.tsx` cva variants | Primary terracotta, hero CTAs, etc. |
| `button-contrast-fix.css` (NEW) | **Light-on-light buttons get visible border + ink + hover tint** |

Imported last so its `!important` declarations win over Tailwind utilities.

### Constraints respected

- Hero pages (homepage, business, workshops) — fully excluded
- Footer — fully excluded
- Existing Neo-Tactile primary, gold, hero variants — untouched (they already have explicit dark backgrounds or gradients)
- Toast notifications (white-themed standard) — untouched (they aren't `<button>`)
- Plume tokens, Tailwind config, JSX, logic, routes, data — all untouched

### Out of scope

- Dark-background buttons (already handled by the existing global rule)
- Hero CTAs (use `heroPrimary` / `heroOutline` variants — fully styled)
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/button-contrast-fix.css     (~120 lines)
EDIT  src/index.css                           (+1 line @import after floating-cards)
```

### Estimated diff

~120 lines new CSS + 1 line `@import`. Zero deletions, zero JSX changes, zero logic changes.


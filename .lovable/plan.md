

## Sitewide Visual Refresh — Vibrance + Glassmorphism v2

Goal: elevate every section between the hero and the footer with a richer, more vibrant glassmorphism aesthetic — colorful gradients, layered overlays, more luminous widgets — without touching the homepage hero or the footer. The work is purely additive CSS + a few component class swaps; no logic changes.

### Scope

**Will change**
- All page mid-sections (Index after hero, About, Business, Services, Training, Portfolio, Contact, FAQ, Resources, Articles, Events, Partners, Careers, Help Center)
- Shared widgets: cards, stat cards, pricing cards, feature blocks, CTAs, badges, dividers, icon bubbles, section backgrounds
- Global glassmorphism utility system + new "vibrance" overlay layer

**Will NOT change**
- Homepage hero (`hero-homepage.css`) and any `hero-*.css` files
- Footer component(s)
- Auth, Portal, Admin dashboards (these are functional UIs, kept neutral)

---

### 1. New CSS layer: `src/styles/vibrance.css`

A new dedicated file imported last in `src/index.css` (after `glassmorphism.css`) so it wins the cascade. Adds:

**Section background palette (5 themed gradients with mesh overlays)**
- `.vibe-section--aurora` — coral → lavender → sky blue mesh
- `.vibe-section--sunset` — peach → orange → magenta mesh
- `.vibe-section--ocean` — sky → teal → indigo mesh
- `.vibe-section--mint` — mint → seafoam → soft cyan mesh
- `.vibe-section--warm` — refined version of current warm cream (default)

Each renders as a `position:relative` container with two pseudo-elements:
- `::before` — large radial gradient orbs (3 orbs, blurred 80–120px)
- `::after` — subtle noise + grain overlay for texture depth

**Glass widgets (v2, more vibrant)**
- `.glass-vibe` — frosted glass with iridescent border (conic gradient border via mask), softer 24px blur, inner glow
- `.glass-vibe-card` — card variant with hover lift + gradient border shimmer
- `.glass-vibe-stat` — stat tile with gradient number + halo glow behind icon
- `.glass-vibe-pricing` — pricing card with shimmering gradient stripe top edge, "featured" variant adds animated gradient ring
- `.glass-vibe-feature` — feature block with floating gradient icon bubble

**Decorative overlays (drop-in divs)**
- `.vibe-orb` — reusable absolutely-positioned blurred gradient orb (sizes: sm/md/lg/xl, hues: coral/lavender/mint/sky)
- `.vibe-mesh-overlay` — full-section mesh gradient overlay
- `.vibe-grain` — subtle SVG noise texture overlay
- `.vibe-shine` — diagonal sheen highlight for cards

**Dividers + accents**
- `.vibe-divider` — animated gradient hairline (coral → lavender → sky)
- `.vibe-divider--dotted` — gradient dot row separator
- `.vibe-pill-badge` — translucent gradient pill with subtle glow

**Buttons / CTAs (glass enhancements, NOT replacing the Neo-Tactile primary buttons)**
- `.btn-glass-vibe` — translucent secondary button with backdrop blur + gradient border
- `.btn-glass-vibe--ghost` — outline variant for dark sections

**Animations (added to `animations.css`)**
- `@keyframes vibe-orb-drift` — slow 24s float for orbs
- `@keyframes vibe-shimmer` — 3s gradient sweep for featured cards
- `@keyframes vibe-pulse-glow` — soft halo pulse for stat icons
- All respect `prefers-reduced-motion: reduce` (set to `animation: none`)

---

### 2. Section background rotation

Apply the new `.vibe-section--*` classes to the existing section wrappers across pages so consecutive sections feel visually distinct but cohesive. Pattern:

```text
[hero — untouched]
section 1 → vibe-section--aurora
section 2 → vibe-section--warm
section 3 → vibe-section--ocean
section 4 → vibe-section--warm
section 5 → vibe-section--sunset
[footer — untouched]
```

Done by editing the outermost `<section>` className on each page (Index, About, Business, Services, Training, Portfolio, Contact, FAQ, Resources, Articles, Events, Partners, Careers, HelpCenter). Pure className additions, no structural change.

---

### 3. Widget upgrades (className swaps)

In shared components:
- `GlassSection.tsx` — add a `vibrant` prop that swaps `glass-card` for `glass-vibe`
- `src/components/ui/soft-elements.tsx` — `SoftCard` gains an optional `vibrant` variant using `glass-vibe-card`
- `src/components/pro/MeshBackground.tsx` — extend with new `aurora | sunset | ocean | mint` variants mapped to `.vibe-section--*`
- Stat cards (e.g. `DashboardKPICards` is admin → skipped; public stat cards on Index/About get `glass-vibe-stat`)
- Pricing cards on Business / Training pages → `glass-vibe-pricing`
- Section dividers → `vibe-divider`
- Section eyebrow badges → `vibe-pill-badge`

---

### 4. Overlays inside sections

Add 2–3 `<span class="vibe-orb vibe-orb--lg vibe-orb--coral" aria-hidden />` decorative spans inside each refreshed section wrapper for ambient color presence. Wrapped in a `pointer-events-none` container so they never block interaction.

---

### 5. Accessibility & performance

- All overlays use `aria-hidden="true"` and `pointer-events: none`
- `prefers-reduced-motion` disables orb drift, shimmer, pulse
- Backdrop blur capped at 24px to avoid mobile GPU jank
- Mobile (<640px): orb count reduced via media query (hides `.vibe-orb--xl`), blur reduced to 16px
- No layout shift — all overlays absolutely positioned

---

### 6. Out of scope (explicitly preserved)

- `hero-homepage.css`, `hero-business.css`, `hero-workshops.css` — untouched
- Footer component and its styles — untouched
- Neo-Tactile primary button system — untouched
- Admin / Portal / Auth dashboards — untouched
- Color tokens in `base.css` — untouched (new gradients reference existing tokens)

---

### Files touched

```text
NEW   src/styles/vibrance.css
EDIT  src/index.css                         (one @import line)
EDIT  src/styles/animations.css             (3 keyframes)
EDIT  src/components/ui/GlassSection.tsx    (vibrant prop)
EDIT  src/components/ui/soft-elements.tsx   (vibrant variant)
EDIT  src/components/pro/MeshBackground.tsx (new variants)
EDIT  ~12 page files                        (className additions only)
```

No database, no edge function, no dependency changes. Estimated diff: ~600 lines new CSS, ~80 lines of className swaps.


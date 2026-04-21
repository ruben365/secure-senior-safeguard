

## Enhance AI Analysis Page CSS + In-Page Notifications

Goal: polish the visual layer of `/training/ai-analysis` and elevate its notification surfaces (access banner, file chip, privacy notice, scan-status). Pure CSS additions plus minimal class swaps. No logic, no layout restructure, no hero/footer touched.

### Current state

The page uses a custom lavender-gray canvas (`#B8B9D1`) with black-tinted glass cards (`bg-black/30 backdrop-blur-xl`). The three "notification" surfaces in-page are:

1. **Access status banner** — top card showing subscription/login state
2. **File chip** — pill showing uploaded file + cost
3. **Privacy notice** — bottom warning card with shield-alert icon

Plus the two **floating tool clusters** (top-left home/dark/refresh and top-right delete/download/save).

### What gets added

```text
NEW   src/styles/ai-analysis.css                   (~220 lines)
EDIT  src/pages/TrainingAiAnalysis.tsx             (import CSS + add wrapper class + 4 className swaps)
```

No new components, no logic, no new dependencies, no Plume token changes.

### CSS module — `ai-analysis.css`

Scoped under a single root class `.ai-analysis-page` so nothing leaks to other routes.

#### Canvas refinement
- Replace flat `#B8B9D1` with a **layered ambient gradient**:
  - Base: `#B8B9D1`
  - Two soft radial glows: warm coral `rgba(217,108,74,0.10)` top-right, deep plum `rgba(61,29,61,0.12)` bottom-left
  - Subtle 1px noise texture (CSS `background-image` SVG inline, 3% opacity) for depth without weight
- Same treatment in dark mode using `#1a1a2e` base + plum/maroon glows

#### Notification surface system (3 variants)
A unified `.aia-notice` base class with shared anatomy:

```text
.aia-notice                  → glass card base (rounded-2xl, layered shadow, hairline border)
  .aia-notice--access        → top access banner (larger, status-tinted left rail)
  .aia-notice--privacy       → privacy warning (yellow-tinted icon halo, amber rail)
  .aia-notice--filechip      → compact pill variant for file chip
  .aia-notice__icon          → 36×36 icon halo (status-colored ring + tinted bg)
  .aia-notice__rail          → 3px left accent rail (status color)
  .aia-notice__title         → 14px semibold white
  .aia-notice__body          → 13px white/80, 1.55 line-height
  .aia-notice__actions       → flex gap-2, right-aligned
```

Visual signature:
- Glass: `rgba(0,0,0,0.32)` bg + `backdrop-filter: blur(14px) saturate(140%)` (kept ≤12px-equivalent perceptual weight)
- Border: 1px `rgba(255,255,255,0.14)` + inset highlight `inset 0 1px 0 rgba(255,255,255,0.08)`
- Shadow: layered `0 8px 24px -8px rgba(0,0,0,0.45), 0 2px 6px -2px rgba(0,0,0,0.30)`
- Status rails: emerald (subscription), coral `#f6c7b8` (balance/metered), amber (warning), sky (info)
- Hover lift on `.aia-notice--access`: `translateY(-1px)` + ring `rgba(255,255,255,0.18)`, 240ms ease

#### Status-colored icon halos
- `.aia-notice__icon--success` → emerald ring + `bg-emerald-500/12`
- `.aia-notice__icon--warning` → amber ring + `bg-yellow-500/12`
- `.aia-notice__icon--info` → coral ring + `bg-[#f6c7b8]/12`
- `.aia-notice__icon--neutral` → white ring + `bg-white/8`

Replaces the current bare lucide icons with a polished 36×36 rounded-xl halo.

#### Floating tool clusters (top nav)
- New `.aia-toolbar` class refines the existing `bg-black/45 backdrop-blur-md` pills:
  - Slightly tighter padding (px-2.5 py-1.5)
  - Subtle inner glow `inset 0 1px 0 rgba(255,255,255,0.10)`
  - Buttons get a **maroon focus ring** (matching site standard) on `:focus-visible`
  - Hover: button bg shifts to `rgba(255,255,255,0.14)` + 1px scale, 180ms

#### File chip refinement
- Convert `.aia-notice--filechip` to a true pill (h-9, px-4)
- Cost segment gets a **subtle divider** (1px white/15 vertical rule) instead of a bullet `•`
- File name: `font-feature-settings: "ss01"` for cleaner numerals
- Remove button: 28×28 hit target (≥44px on mobile via padding), red-tinted on hover

#### Privacy notice elevation
- Amber gradient left-rail (3px, `linear-gradient(180deg, #fbbf24, #f59e0b)`)
- Inline icons (`Camera`, `FileDown`) get a tiny 18×18 inline glyph halo so they read as actionable affordances
- The "permanently lost" callout becomes a **yellow chip** (rounded-md, px-1.5, bg-yellow-500/15, text-yellow-100) instead of inline bold text

#### Print mode (PDF save)
- `@media print` rules:
  - Hide all `.aia-toolbar`, `.aia-notice`, dialogs
  - Force chat history to white bg + black text for readable PDF
  - Page margins 0.5in, suppress backgrounds

#### Motion + accessibility
- All transitions ≤240ms, no `transition: all`
- `@media (prefers-reduced-motion: reduce)` disables hover lift + scale
- All status colors meet WCAG AA on the dark glass (white/90 = 14:1, white/80 = 11:1)
- Focus rings: maroon `0 0 0 3px rgba(122,46,42,0.35)` on `:focus-visible`

### JSX edits in `TrainingAiAnalysis.tsx` (minimal)

Only **className swaps and one wrapper** — no structural change:

1. Add `import "@/styles/ai-analysis.css";` at top
2. Wrap outermost `<div>` (line 368) with `className="... ai-analysis-page"`
3. Swap access banner `className` (line 487) → adds `aia-notice aia-notice--access`
4. Swap file chip `className` (line 554) → adds `aia-notice aia-notice--filechip`
5. Swap privacy notice `className` (line 589) → adds `aia-notice aia-notice--privacy`
6. Swap top toolbar wrappers (lines 397, 428) → adds `aia-toolbar`

Existing Tailwind classes stay (additive). Logic, props, state, and DOM tree unchanged.

### What does NOT change

- Hero pages and footer — untouched
- `PromptInputBox`, `PremiumChatHistory`, `PaymentDialog`, paywall `Dialog` — untouched
- Page logic, hooks, state, props, routing, data — untouched
- Plume design tokens, Tailwind config, `index.css` — untouched
- Dark mode toggle behavior — preserved
- Background color logic in `useEffect` — preserved (CSS layers on top via gradient overlay on the wrapper)

### Constraints respected

- No JSX restructure, no new components, no dependencies
- No `framer-motion`, no `transition: all`
- `backdrop-filter` kept perceptually ≤12px (saturate trick keeps blur low)
- Honors `prefers-reduced-motion`
- Honors `zoom: 0.75` root scaling
- Honors print/PDF save flow
- WCAG AA on all glass surfaces
- Touch targets ≥44px on mobile (padding-based)
- All decorative SVGs `aria-hidden`

### Out of scope

- Replacing the lavender canvas with a different palette
- Touching `PromptInputBox` styling (separate component, has its own CSS)
- Hero, footer, dialogs (PaymentDialog and paywall keep current styling)
- Logic, routes, data, backend
- Pre-existing TypeScript errors

### Estimated diff

~220 lines new CSS in one new file + ~6 className edits in `TrainingAiAnalysis.tsx`. Zero deletions, zero logic changes.


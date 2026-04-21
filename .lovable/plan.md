

## Normalize Button Text Color: White on Dark/Blue Backgrounds

Goal: ensure every button that has a dark or blue background already uses white text. Audit and fix any inconsistencies where dark or blue buttons render text in another color (slate, gray, primary blue on blue, etc.).

### Approach

A targeted CSS + className sweep. No logic, no layout, no new components.

### What gets changed

1. **Global safety rule (CSS)** — add a low-specificity utility in `src/index.css` that forces white text on any element matching dark or blue background utility classes when text color is unspecified or inherits a non-white tone:
   - `bg-slate-900`, `bg-slate-800`, `bg-slate-700`
   - `bg-blue-600`, `bg-blue-700`, `bg-blue-800`, `bg-blue-900`
   - `bg-indigo-*`, `bg-sky-700/800/900`
   - `bg-primary` (when primary resolves to a dark/blue tone)
   - `bg-[#1E293B]`, `bg-[#0F172A]`, `bg-[#1e3a8a]`, etc. (arbitrary dark hex backgrounds used in the codebase)

   Rule shape:
   ```css
   button.bg-slate-900,
   button.bg-slate-800,
   button.bg-blue-600,
   button.bg-blue-700,
   button.bg-blue-800,
   a.bg-slate-900,
   a.bg-blue-600,
   /* …etc */ {
     color: #ffffff;
   }
   button.bg-slate-900 *,
   button.bg-blue-600 *,
   /* …etc */ {
     color: inherit;
   }
   ```

2. **Component-level audit** — sweep button-bearing files and replace any `text-slate-*`, `text-gray-*`, `text-blue-*`, `text-foreground`, or missing text class on dark/blue buttons with `text-white`. Files known to contain such buttons:
   - `src/components/ui/button.tsx` (verify destructive/secondary/dark variants)
   - `src/components/Footer.tsx` — *skipped per prior rule (footer untouched)*
   - `src/components/home/HomeStorySections.tsx`
   - `src/components/home/FAQPreview.tsx`
   - `src/components/home/NewsletterSection.tsx`
   - `src/pages/About.tsx`, `Business.tsx`, `Training.tsx`, `Contact.tsx`, `Careers.tsx`, `Resources.tsx`, `Partners.tsx`, `Events.tsx`, `HelpCenter.tsx`
   - `src/components/dashboard/QuickActionsGrid.tsx` (gradient tile buttons — confirm white labels)
   - `src/components/pro/GlowButton.tsx` (primary variant)
   - Auth page CTAs (`src/pages/Auth.tsx`)
   - Any inline `<a>` styled as button with `bg-[#d96c4a]`, `bg-[#1E293B]`, `bg-blue-*`

3. **Hover/active states** — same rule extended so hover variants on dark/blue buttons stay white (e.g. `hover:bg-blue-700`, `hover:bg-slate-800`).

### Detection method

Search the codebase for these patterns and fix any match where text color is not `text-white`:
- `bg-slate-(700|800|900)` without `text-white`
- `bg-blue-(600|700|800|900)` without `text-white`
- `bg-indigo-` without `text-white`
- `bg-[#0F172A]`, `bg-[#1E293B]`, `bg-[#1e3a8a]`, `bg-[#0b1220]` without `text-white`
- `bg-primary` on `<button>` / `<a>` without explicit text color
- Gradient tiles `bg-gradient-to-* from-(blue|slate|indigo|sky|navy|cyan)-*` without `text-white`

### Files touched

```text
EDIT  src/index.css                              (~25 lines added — global dark/blue button text rule)
EDIT  src/components/ui/button.tsx               (verify dark variants force text-white)
EDIT  src/components/home/HomeStorySections.tsx  (className sweep)
EDIT  src/components/home/FAQPreview.tsx
EDIT  src/components/home/NewsletterSection.tsx
EDIT  src/components/pro/GlowButton.tsx
EDIT  src/components/dashboard/QuickActionsGrid.tsx
EDIT  src/pages/About.tsx
EDIT  src/pages/Business.tsx
EDIT  src/pages/Training.tsx
EDIT  src/pages/Contact.tsx
EDIT  src/pages/Careers.tsx
EDIT  src/pages/Resources.tsx
EDIT  src/pages/Partners.tsx
EDIT  src/pages/Events.tsx
EDIT  src/pages/HelpCenter.tsx
EDIT  src/pages/Auth.tsx
```

All edits are className/CSS additive. No JSX restructuring.

### Untouched

- Buttons on light, cream, white, or transparent backgrounds (their dark text is correct)
- Outlined buttons (border only — text stays dark by design)
- Hero components (per prior rule)
- Footer (per prior rule)
- Icon-only ghost buttons where the icon is already correctly colored
- Color tokens, button sizes, spacing, radius

### Constraints respected

- WCAG AA contrast: white on dark/blue backgrounds passes AAA
- No `transition: all`, no animation changes
- No removal of existing classes — only color overrides
- Honors existing `zoom: 0.75` root scaling
- Plume design system preserved

### Out of scope

- Buttons on light backgrounds (no change needed)
- Disabled state styling
- Loading spinners (already inherit color)
- Dark-themed admin/portal panels (separate design system)
- Any pre-existing build errors unrelated to button text color

### Estimated diff

~25 lines new CSS + ~30 className tweaks across ~16 files. Zero deletions.


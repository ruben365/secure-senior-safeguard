

## Fix Excessive Vertical Voids on Homepage Body

Goal: eliminate the giant cream gaps shown in the screenshot — above and below the dark "InVision Network provides…" answer-summary band, and before the "Why families choose us" section. Hero and footer untouched.

### Root cause

Three stacked spacing layers compound:

1. `AnswerSummary` is rendered with `className="sec-after-hero pb-8"` — `sec-after-hero` still injects ~5rem top padding on desktop (even after recent tighten)
2. The wrapper `<div className="relative isolate">` then opens with `<section className="sec-rhythm-lg">` (HomeStorySections) — another ~6.5rem top padding stacked immediately below
3. `HomeStorySections` has its own internal top padding inside its first sub-section, doubling the gap before "Why families choose us"

Net effect on desktop: ~11rem of empty cream between the hero and the dark band, then another ~10rem between the dark band and the first content row.

### The fix — three surgical edits

```text
EDIT  src/pages/Index.tsx                    (swap rhythm classes)
EDIT  src/styles/rhythm-tighten.css          (clamp sec-after-hero + sec-rhythm-lg)
EDIT  src/components/AnswerSummary.tsx        (remove default top spacing)
```

Zero new files. Zero new dependencies. Zero hero/footer edits.

#### 1. `src/pages/Index.tsx`

Remove the heavy top padding above the AnswerSummary band, and downgrade the section right after it from `sec-rhythm-lg` to `sec-rhythm-sm`:

```tsx
// Before
<AnswerSummary
  className="sec-after-hero pb-8"
  ...
/>
...
<section id="story" className="sec-rhythm-lg">

// After
<AnswerSummary
  className="pt-0 pb-0"
  ...
/>
...
<section id="story" className="sec-rhythm-sm pt-6 md:pt-10">
```

Result: the dark band now sits flush against the hero (no cream gap above), and the "Why families choose us" section starts ~2.5rem below the band instead of ~10rem.

#### 2. `src/styles/rhythm-tighten.css` — global guard

Add explicit clamps so any other page using these classes also benefits:

```css
.sec-after-hero:not(.hero-home *):not(footer *) {
  padding-top: clamp(1rem, 2vw, 2rem) !important;
}
.sec-before-footer:not(.hero-home *):not(footer *) {
  padding-bottom: clamp(2rem, 4vw, 3.5rem) !important;
}
.sec-rhythm-lg:not(.hero-home *):not(footer *) {
  padding-top: clamp(2.5rem, 5vw, 4rem) !important;
  padding-bottom: clamp(2.5rem, 5vw, 4rem) !important;
}
.sec-rhythm-md:not(.hero-home *):not(footer *) {
  padding-top: clamp(2rem, 4vw, 3.25rem) !important;
  padding-bottom: clamp(2rem, 4vw, 3.25rem) !important;
}
```

Targets only body sections — hero and footer excluded by `:not()` guards.

#### 3. `src/components/AnswerSummary.tsx` — remove default outer wrapper margin

The component's outer `<div className={\`relative ${className}\`}>` adds no margin itself, but the dark strip inside has no top/bottom outer breathing room either, so it can sit flush against neighbors. Add a tiny `my-2` so it doesn't kiss the hero pixel-perfect, but stays compact:

```tsx
<div className={`relative my-2 md:my-3 ${className}`}>
```

### Visual outcome

| Region | Before | After |
|--------|--------|-------|
| Hero → dark band gap | ~200px cream void | ~12-24px breathing |
| Dark band → "Why families…" gap | ~180px cream void | ~40-64px clean rhythm |
| Trust strip → "Why families…" gap | ~120px void | ~24-40px |

### Constraints respected

- Hero (`HeroHomepage`) untouched
- Footer untouched (excluded via `:not(footer *)`)
- Plume tokens untouched
- `zoom: 0.75`, `prefers-reduced-motion` honored
- No JSX logic changes, no new dependencies
- Other pages using `sec-after-hero` / `sec-rhythm-lg` benefit automatically

### Out of scope

- Hero, footer
- Other pages (Training/Business/Resources already use SectionImage rhythm)
- Plume tokens, Tailwind config
- Pre-existing TypeScript lints

### Files touched

```text
EDIT  src/pages/Index.tsx                  (~3 line changes)
EDIT  src/styles/rhythm-tighten.css        (+12 lines clamps)
EDIT  src/components/AnswerSummary.tsx     (1 line: add my-2 md:my-3)
```

### Estimated diff

~16 lines changed total. Zero deletions of meaningful content, zero new files, zero logic changes.


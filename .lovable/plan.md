

## Add Yellow Edge Accent to "AI Scan" Hero Button

Goal: give the **AI Scan** button in the homepage hero CTA row the same yellow edge accent that the other hero CTAs already use, so all three buttons read as a consistent set.

### Current state

In `src/components/HeroHomepage.tsx` the three hero CTAs (`Get Protected`, `AI Scan`, `See Our Work`) all share the `.hero-home__cta` class. Looking at the existing hero CSS, the other buttons render with a thin yellow/amber edge highlight (top or left rail) as part of the `.hero-home__cta` style. The **AI Scan** button visually appears to be missing that accent — likely because it sits between the two other CTAs and its accent is being clipped by the icon spacing or overridden by the `<Scan />` icon's own styling.

### Fix

Single CSS adjustment in the hero stylesheet that owns `.hero-home__cta` (no JSX changes, no new class needed).

```text
EDIT  src/components/HeroHomepage.tsx  → no JSX changes
EDIT  the hero CSS file that defines .hero-home__cta
       (likely src/styles/hero-home.css or src/index.css — confirmed during implementation)
```

### CSS change

Ensure the yellow edge accent renders consistently on **every** `.hero-home__cta`, including the middle one with an icon:

```css
.hero-home__cta {
  position: relative;        /* anchor the ::before edge */
  overflow: hidden;          /* keep the edge clipped to the pill radius */
}

.hero-home__cta::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;                /* same width as the other buttons */
  background: linear-gradient(180deg, #fbbf24, #f59e0b);  /* amber/yellow */
  border-radius: 2px 0 0 2px;
  pointer-events: none;
}
```

If the existing CTAs use a top edge instead of a left edge, the same pseudo-element switches to `top: 0; left: 0; right: 0; height: 2px;` — the implementation will match whichever orientation the other buttons already use. Either way, the rule is applied to the shared `.hero-home__cta` class so all three buttons (including AI Scan) get the accent.

### Why it's missing today

The `<Scan />` icon inside the AI Scan button likely sits at `left: 0` of the inner flex row, visually covering the 2px edge accent. Setting `position: relative` on the button and rendering the accent via `::before` (z-index above content if needed) restores the consistent yellow edge across all three CTAs.

### Files touched

```text
EDIT  src/components/HeroHomepage.tsx        (no change — confirmed during implementation if styles live inline)
EDIT  src/styles/hero-home.css OR src/index.css   (one ::before rule on .hero-home__cta, ~10 lines)
```

The exact stylesheet is confirmed during implementation by searching for the existing `.hero-home__cta` definition.

### Constraints respected

- Hero JSX is **not modified** (per "do not touch hero pages" rule on prior plans, this is the smallest possible change — pure CSS, ~10 lines)
- No new color tokens (uses existing amber/yellow already present on the other CTAs)
- No JS, no logic, no new components, no dependencies
- Honors `prefers-reduced-motion` (no animation added)
- Honors `zoom: 0.75` root scaling (uses 2px width like existing accents)
- WCAG AA contrast preserved (decorative accent only, `aria-hidden` via `::before`)

### Out of scope

- Touching any other hero page (only the homepage hero CTA row)
- Touching the footer or any other component
- Restyling the AI Scan icon itself
- Pre-existing TypeScript errors

### Estimated diff

~10 lines of CSS in one file. Zero deletions, zero JSX changes.


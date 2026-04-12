

# Plan: Enhance Below-Fold Design, Fix Build Error, Rename AI Workshop

## Summary
Five changes: (1) fix the TypeScript build error, (2) rename "AI Workshop" to "AI" in the hero heading and navigation, (3) enhance below-fold CSS with 3D glassmorphism cards, premium badges, and responsive polish, (4) ensure Login and Get Protected buttons are consistently orange, (5) add order and professional styling to all page body sections.

---

## 1. Fix Build Error — `useStripeKey.ts`
- Fix the return type of `ensureStripePromise` from `Promise<Promise<Stripe | null>>` to `Promise<Stripe | null>`
- Restore the state type to `Promise<Stripe | null> | null` if it was changed

## 2. Rename "AI Workshop" → "AI"
- **`HeroBusiness.tsx`** line 80: Change hero `<h1>` from "AI Workshop Systems" to "AI Systems"
- **`Navigation.tsx`** line 21: Change nav link name from "AI Workshop" to "AI"
- **`HeroHomepage.tsx`** line 101: Change "Explore AI Workshop" CTA text to "Explore AI"
- Only the display labels on the hero heading and navigation — no content changes, no URL changes

## 3. Enhance Below-Fold CSS — `premium-body.css`
Add/update styles for all body content between hero and footer:

- **3D Card system**: Add `transform: perspective(800px)` with subtle rotateX on hover, deeper layered box-shadows (3-level shadow stack), and smooth transitions for all `.bg-card` and card-like elements
- **Glassmorphism badges**: Create `.glass-badge` utility — frosted `backdrop-blur-xl`, translucent warm background, white/plum border, rounded-full pill shape
- **Section spacing and order**: Standardize vertical rhythm with consistent `py-20 md:py-28` sections, add subtle section separators
- **Responsive polish**: Ensure cards stack cleanly on mobile (single column), touch targets are 44px+, and 3D transforms are disabled on touch devices (`@media (hover: none)`)
- **Image frames**: Add subtle warm-tinted shadow and rounded corners with hover lift
- **Interactive elements**: Add glow ring on focus, smooth color transitions on hover

## 4. Button Consistency — Orange Theme
- Verify the `default` button variant in `button.tsx` already uses orange gradient (`#c2410c` to `#9a3412`) — it does
- Ensure the `heroPrimary` variant also uses the same orange — it does
- Check that "Get Protected" buttons across all pages use the `default` or `heroPrimary` variant consistently
- Login button in Navigation already uses inline orange gradient — confirmed consistent

## 5. Files Changed
| File | Change |
|------|--------|
| `src/hooks/useStripeKey.ts` | Fix return type (build error) |
| `src/components/HeroBusiness.tsx` | "AI Workshop Systems" → "AI Systems" |
| `src/components/Navigation.tsx` | "AI Workshop" → "AI" in nav link |
| `src/components/HeroHomepage.tsx` | "Explore AI Workshop" → "Explore AI" |
| `src/styles/premium-body.css` | Major enhancements: 3D cards, glassmorphism, responsive polish, badges, section order |
| `src/styles/components.css` | Add glass-badge utility and enhanced card depth classes if needed |


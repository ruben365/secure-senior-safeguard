

## Enhance Glassmorphism Effects Across the Site

### Assessment

The project already has a solid glassmorphism foundation (`glass-card`, `glass-card-strong`, `glass-card-dark`, `glass-button` classes). Most pages use these classes extensively. The enhancements below add **new visual effects** and apply glass styling to the remaining unstyled elements.

### Changes

**1. `src/index.css` — New glassmorphism utility classes**
- Add `.glass-input` class for form inputs (translucent bg, backdrop-blur, soft border glow on focus)
- Add `.glass-section` class for full-width page sections (very subtle frosted panel behind content)
- Add `.glass-shimmer` animated border effect that can be applied to any glass card for a slow-moving light refraction along edges
- Add `.glass-glow-hover` — on hover, cards get a soft radial glow emanating from cursor direction
- Add `.glass-badge` — smaller version of glass-card for inline badges/chips with tighter blur

**2. `src/components/ui/input.tsx` and `src/components/ui/textarea.tsx`**
- Add glassmorphism default styling: translucent background, backdrop-blur, soft white/plum border, focus glow ring

**3. `src/pages/Index.tsx` — Enhance hero and sections**
- Wrap countdown grid numbers in individual mini glass panels for depth
- Add glass-shimmer effect to the main hero tagline badge
- Apply glass-section to the CTA/RSVP bottom section

**4. `src/pages/Story.tsx`, `src/pages/Guestbook.tsx`, `src/pages/Enquiries.tsx`, `src/pages/Registry.tsx`**
- Apply `glass-section` wrapper around main content areas for cohesive frosted panel feel
- Timeline cards on Story page: add glass-shimmer border animation on hover

**5. `src/components/Navigation.tsx`**
- Add a subtle inner glass reflection line (1px gradient across top of nav bar)

**6. `src/components/Footer.tsx`**
- Add frosted glass overlay strip at the top edge of footer for blended transition

### Technical Details

New CSS classes added to `src/index.css`:

```css
.glass-input {
  background: rgba(255,255,255,0.35);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  transition: all 0.3s;
}
.glass-input:focus {
  border-color: hsl(var(--primary) / 0.5);
  box-shadow: 0 0 20px hsl(var(--primary) / 0.1);
}

.glass-section {
  background: rgba(255,255,255,0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 32px;
}

.glass-shimmer {
  position: relative;
  overflow: hidden;
}
.glass-shimmer::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: glass-shimmer-move 4s ease-in-out infinite;
  pointer-events: none;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: 1px;
}
```

All dark mode variants included. This enhances the frosted glass aesthetic consistently across every page.


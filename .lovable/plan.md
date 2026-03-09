

# Remove framer-motion from Shared & Homepage Components

## Scope

**16 components** to clean up, split into two tiers: homepage critical path (eagerly loaded) and shared/global components.

### Tier 1: Homepage Critical Path (highest impact)

| Component | Lines | motion usages | Strategy |
|-----------|-------|---------------|----------|
| `HomeIntroSection.tsx` | 514 | ~20 `motion.*`, `useInView`, `useMotionValue`, `useTransform`, `TiltCard` subcomponent | Replace `useInView` with custom IntersectionObserver (already used in `useCountUp`). Replace all `motion.div` with `div` + `AnimatedSection` for entrances. Remove `TiltCard` (uses `useMotionValue`/`useTransform` for 3D tilt) — replace with static container. Floating widgets lose their `animate={{ y: [0,-6,0] }}` bobbing — make static. |
| `SiteOrientationGrid.tsx` | 178 | 6 `motion.*`, `useInView` | Replace `useInView` with IntersectionObserver + state. Replace `motion.div` cards with `AnimatedSection` wrappers. Remove `whileHover` 3D transforms — use CSS `hover-lift`. |
| `ThreatTicker.tsx` | 40 | 1 `motion.div` for infinite marquee | Replace with CSS `@keyframes marquee` animation (`translateX(0)` to `translateX(-50%)`). Pure CSS infinite scroll. |
| `TestimonialCarousel.tsx` | 148 | `AnimatePresence` + `motion.div` for slide transitions | Replace with CSS transition: swap content via state, use `animate-fade-in` class on key change. Simpler than AnimatePresence but visually equivalent. |
| `LiveSecurityStats.tsx` | 135 | `useInView` only (for counter animation) | Replace `useInView` with a local IntersectionObserver hook. No `motion.*` elements to replace — just the import. |
| `FAQPreview.tsx` | 151 | 5 `motion.*`, `useInView` | Lazy-loaded, so lower priority but still worth cleaning. Replace with `AnimatedSection` + CSS hover. |

### Tier 2: Shared/Global Components

| Component | Strategy |
|-----------|----------|
| `PremiumChatMessage.tsx` | Replace `motion.div` with plain `div` + CSS `animate-fade-in`. Remove hover animations. |
| `AnimatedButton.tsx` | Replace with plain `Button` + CSS `hover-scale` class + `active:scale-95` Tailwind. |
| `ScrollProgressIndicator.tsx` | This uses `useScroll`/`useSpring` for the progress bar — needs a vanilla JS `scroll` event listener + CSS `scaleX` transform. Replace `motion.circle` with SVG `stroke-dashoffset`. |
| `ImageZoom.tsx` | Replace with plain `div` + CSS `hover:scale-105 transition-transform`. |
| `SocialProofTicker.tsx` | Replace `AnimatePresence`/`motion` with CSS transitions + conditional rendering via `className` toggling. |
| `SuccessCelebration.tsx` | Replace `AnimatePresence`/`motion` with CSS `animate-scale-in`/`animate-fade-in` classes + conditional rendering. |
| `GlassQuickMenu.tsx` | Activity feed uses `AnimatePresence` for expand/collapse — replace with CSS `transition-[height]` + `overflow-hidden`. List item stagger: remove (instant render is fine for 6 items). |
| `InspirationalQuote.tsx` | Replace `motion.div` with `AnimatedSection` wrapper. |
| `TestimonialBubble.tsx` | Replace `motion.div` with `AnimatedSection` + CSS `hover:-translate-y-1 transition-transform`. |

### Orphaned Components (bonus cleanup)

These 3 components have zero imports in any page file — they're dead code:
- `CompanyIntroSection.tsx` (286 lines)
- `TrustedExpertsBar.tsx` (222 lines)  
- `PremiumGlassmorphismWidgets.tsx` (580 lines)
- `FeatureBar.tsx` (284 lines)

**Recommend deletion** to reduce codebase size by ~1,370 lines.

## Technical Details

### ThreatTicker CSS Marquee Replacement
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee { animation: marquee 30s linear infinite; }
```

### ScrollProgressIndicator Vanilla Replacement
- Listen to `scroll` event, calculate `scrollY / (scrollHeight - clientHeight)`
- Apply as `style={{ transform: scaleX(progress) }}` to a regular `div`
- Scroll-to-top button visibility via scroll threshold state

### LiveSecurityStats useInView Replacement
```tsx
const [isInView, setIsInView] = useState(false);
const ref = useRef(null);
useEffect(() => {
  const observer = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { setIsInView(true); observer.disconnect(); }
  }, { once: true });
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);
```

## Files to Modify

| File | Action |
|------|--------|
| `src/components/HomeIntroSection.tsx` | Remove framer-motion, replace ~20 motion elements |
| `src/components/home/SiteOrientationGrid.tsx` | Remove framer-motion, replace 6 motion elements |
| `src/components/home/ThreatTicker.tsx` | Replace motion marquee with CSS keyframes |
| `src/components/home/TestimonialCarousel.tsx` | Replace AnimatePresence with CSS transitions |
| `src/components/home/LiveSecurityStats.tsx` | Replace useInView with IntersectionObserver |
| `src/components/home/FAQPreview.tsx` | Remove framer-motion, use AnimatedSection |
| `src/components/training/PremiumChatMessage.tsx` | Replace motion with CSS classes |
| `src/components/AnimatedButton.tsx` | Replace with CSS hover/active |
| `src/components/ScrollProgressIndicator.tsx` | Rewrite with vanilla scroll listener |
| `src/components/ImageZoom.tsx` | Replace with CSS hover scale |
| `src/components/SocialProofTicker.tsx` | Replace with CSS transitions |
| `src/components/SuccessCelebration.tsx` | Replace with CSS animations |
| `src/components/GlassQuickMenu.tsx` | Replace AnimatePresence with CSS |
| `src/components/home/InspirationalQuote.tsx` | Replace with AnimatedSection |
| `src/components/home/TestimonialBubble.tsx` | Replace with CSS hover |

### Files to Delete (orphaned)
| File | Lines |
|------|-------|
| `src/components/home/CompanyIntroSection.tsx` | 286 |
| `src/components/home/TrustedExpertsBar.tsx` | 222 |
| `src/components/home/PremiumGlassmorphismWidgets.tsx` | 580 |
| `src/components/home/FeatureBar.tsx` | 284 |

## Impact
- Removes framer-motion from ~19 components (93 → ~74 remaining)
- All homepage components become framer-motion-free — the library won't load on the critical path at all
- ~1,370 lines of dead component code deleted
- Significant reduction in JS bundle for initial page load


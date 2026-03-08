

# Remove framer-motion from Non-Critical Pages

## Scope

Three pages to clean up, with very different complexity levels:

### 1. ArticleDetail.tsx — Simple (1 `motion.div` wrapper)
- Single `motion.div` with `initial={{ opacity: 0, y: 20 }}` / `animate={{ opacity: 1, y: 0 }}` wrapping the article content
- Replace with a plain `div` + CSS class `animate-fade-in` (already defined in tailwind config)

### 2. Business.tsx — Heavy (108 `motion.*` usages across 2,052 lines)
- Used for: card entrance animations, 3D rotateX reveals, hover scale effects, staggered children, `useInView` triggers
- Strategy: Replace all `motion.div` with plain `div`. For entrance animations tied to `useInView`, use the existing `AnimatedSection` component (already imported on line 19). For hover effects (`whileHover: { y: -8, scale: 1.03 }`), use CSS `hover-lift` or `hover-scale` classes. Remove `useInView` and `useRef` refs that only served animation.

### 3. WebsiteDesign.tsx — Heavy (many `motion.*` usages)
- Floating orbs with infinite animations, floating widgets with hover 3D effects, staggered entrance animations
- Strategy: Replace floating orbs with static `div`s (they're blurred background elements — motion is barely perceptible). Replace entrance animations with CSS `animate-fade-in`. Remove hover 3D transforms (rotateY) — use `hover-scale` instead.

## Approach for Business.tsx & WebsiteDesign.tsx

Since these are massive files with motion deeply embedded, the cleanest approach is:
1. Replace `import { motion, useInView } from "framer-motion"` → remove entirely
2. Global find-replace within each file:
   - `<motion.div` → `<div`
   - `</motion.div>` → `</div>`
   - `<motion.span` → `<span`
   - `</motion.span>` → `</span>`
   - `<motion.h1` → `<h1` (etc.)
3. Remove all framer-motion-specific props: `initial`, `animate`, `whileInView`, `whileHover`, `whileTap`, `transition`, `viewport`, `variants`, `exit`
4. Add CSS equivalents where the animation was meaningful (entrance fades, hover lifts)
5. Remove orphaned `useRef` / `useInView` hooks that only served framer-motion

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ArticleDetail.tsx` | Replace 1 `motion.div` with `div` + `animate-fade-in` class |
| `src/pages/Business.tsx` | Replace ~108 `motion.*` → plain elements, remove import, add CSS animation classes |
| `src/pages/business/WebsiteDesign.tsx` | Replace all `motion.*` → plain elements, remove import, add CSS classes |

## Impact
- Removes framer-motion from 3 page-level chunks
- Combined with the earlier Index.tsx cleanup, all top-level pages will be framer-motion-free
- framer-motion will still load via shared components (admin panels, portal pages, etc.) but only when those routes are visited


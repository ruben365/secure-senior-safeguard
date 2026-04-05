
# Site-Wide "Plume" Redesign Plan

The Plume color tokens are already in `base.css`, but many components still use hardcoded colors and old styling patterns. This plan brings every visible element into alignment with the Midjourney references.

## Phase 1: Global Foundation (this message)
1. **Fix base.css utility classes** — Update `.glass-card`, `.glass-section`, `.btn-primary`, `.gradient-primary`, and other utility classes to use Plume tokens
2. **Navigation** — Restyle to match the clean, warm cream nav bar with plum accents shown in references
3. **Footer** — Update to match the warm, professional footer style
4. **Button variants** — Update shadcn button component to use Plume gradients

## Phase 2: Homepage (this message)
5. **HeroHomepage** — Redesign with the warm light layout, better gradient overlays, metric cards with plum styling
6. **Home sections** — Update ThreatTicker, FamilyTrustSection, LiveSecurityStats, TestimonialCarousel to use Plume tokens consistently

## Phase 3: Inner Pages (follow-up)
7. **About, Contact, FAQ, Services** — Update page layouts
8. **Business page** — Align 3D cards with Plume palette
9. **Training, Resources, Library** — Update card grids
10. **Auth pages** — Restyle login/signup

## Key Style Targets from References:
- Warm cream background (`hsl(30 20% 96%)`) ✅ already set
- Deep plum primary ✅ already set  
- Glassmorphic cards with plum-tinted shadows
- Clean, minimal nav with subtle border
- Orange/coral accent for CTAs alongside plum
- Dashboard-style metric widgets with warm tones
- Soft rounded corners (0.75rem) ✅ already set

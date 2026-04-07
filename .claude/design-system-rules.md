# InVision Network — Design System Rules

> Figma-to-code integration guide for the InVision Network project.
> Use these rules when translating Figma designs into React + Tailwind components.

---

## 1. Token Definitions

### Where tokens live
All design tokens are CSS custom properties defined in `src/styles/base.css` inside `@layer base { :root { ... } }`.

### Color format
HSL without `hsl()` wrapper — consumed as `hsl(var(--token))` or with opacity `hsl(var(--token) / 0.5)`.

### Core palette (igloo-inspired warm minimal)

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--background` | `40 33% 97%` | `#FAF9F5` | Page background (warm off-white) |
| `--foreground` | `60 4% 8%` | `#141413` | Primary text (warm near-black) |
| `--card` | `40 33% 99%` | `#FEFEFC` | Card surfaces |
| `--muted` | `40 10% 93%` | `#EEEDEA` | Muted backgrounds |
| `--muted-foreground` | `40 5% 40%` | `#6B6965` | Secondary text |
| `--border` | `40 8% 85%` | `#DAD8D3` | Borders |
| `--primary` | `207 89% 34%` | `#066DB3` | Trust blue (links, key UI) |
| `--accent` | `25 95% 53%` | `#F97316` | Signal orange (CTAs) |
| `--success` | `142 71% 32%` | `#15803D` | Success / protected |
| `--destructive` | `0 72% 51%` | `#DC2626` | Errors |

### Extended spectrums
Each has 5-9 shades (e.g., `--blue-50` through `--blue-950`):
- **Blue** — security, trust
- **Green** — success, protection
- **Slate** — neutrals
- **Purple/Violet** — admin theme
- **Navy** — dark surfaces
- **Lavender** — admin sidebar
- **Coral** — warm alerts
- **Teal** — tech success
- **Cyan** — info links
- **Gold** — ratings, badges

### Shadow system
```css
--shadow-xs    /* subtle lift */
--shadow-sm    /* default card */
--shadow-md    /* hover state */
--shadow-lg    /* elevated */
--shadow-card  /* card resting */
--shadow-card-hover /* card hover */
--shadow-elevated   /* modals, dropdowns */
--shadow-cta        /* orange CTA glow */
```

### Radius
`--radius: 0.5rem` (8px base). Cards use `rounded-2xl` (1rem/16px). Pills use `rounded-full`.

---

## 2. Component Library

### Base: shadcn/ui
- **Location:** `src/components/ui/`
- **Config:** `components.json` (style: "default", no RSC, TSX, CSS variables)
- **70+ components** including all Radix primitives (accordion, dialog, dropdown, tabs, etc.)
- **Install new:** `npx shadcn@latest add <component>`

### Custom components
- **Location:** Feature-organized under `src/components/<feature>/`
- **Naming:** PascalCase files matching the exported component name
- **Pattern:** Named exports preferred, default exports for lazy-loaded components

### Key custom components
| Component | Location | Purpose |
|-----------|----------|---------|
| `HeroHomepage` | `src/components/HeroHomepage.tsx` | Main landing hero |
| `Navigation` | `src/components/Navigation.tsx` | Site-wide nav |
| `Footer` | `src/components/Footer.tsx` | Site-wide footer |
| `AnimatedSection` | `src/components/AnimatedSection.tsx` | Scroll-reveal wrapper |
| `PageTransition` | `src/components/PageTransition.tsx` | Route transitions |
| `SEO` | `src/components/SEO.tsx` | Meta tags (react-helmet-async) |

### Homepage sections (lazy-loaded)
| Component | File |
|-----------|------|
| `WhyInVision` | `src/components/home/WhyInVision.tsx` |
| `ThreatTicker` | `src/components/home/ThreatTicker.tsx` |
| `LiveSecurityStats` | `src/components/home/LiveSecurityStats.tsx` |
| `SiteOrientationGrid` | `src/components/home/SiteOrientationGrid.tsx` |
| `PromoStrip` | `src/components/home/PromoStrip.tsx` |
| `TestimonialCarousel` | `src/components/home/TestimonialCarousel.tsx` |
| `FAQPreview` | `src/components/home/FAQPreview.tsx` |

---

## 3. Frameworks & Libraries

| Layer | Library | Version |
|-------|---------|---------|
| UI Framework | React | 18.3.1 |
| Language | TypeScript | ~5.8.3 |
| Bundler | Vite | 7.3.1 |
| Styling | Tailwind CSS | 3.4.17 |
| Component Lib | shadcn/ui (Radix) | latest |
| State | @tanstack/react-query | 5.83.0 |
| Forms | react-hook-form + zod | 7.61.1 |
| Animation | framer-motion | 12.23.24 |
| Routing | react-router-dom | 6.30.1 |
| Icons | lucide-react | 0.462.0 |
| Charts | recharts | 2.15.4 |
| Backend | Supabase | 2.76.1 |
| Payments | Stripe | latest |
| i18n | i18next | 25.8.14 |

### Path alias
`@/` maps to `./src/` (configured in `tsconfig.json` and `vite.config.ts`).

---

## 4. Asset Management

### Location
- **Static images:** `src/assets/` (200+ files, imported via ES modules)
- **Public assets:** `public/` (favicon, manifest, OG images)

### Import pattern
```tsx
import heroImage from "@/assets/hero-homepage-cinematic.jpg";
<img src={heroImage} alt="..." loading="lazy" />
```

### Optimization
- **Vite plugin:** `ViteImageOptimizer` — JPEG 55%, PNG 60%, WebP/AVIF auto
- **Naming:** descriptive slugs with variants (`-small`, `-opt`, `-gallery`, `-thumb`)
- **Lazy loading:** `loading="lazy"` on all below-fold images
- **LCP image:** Preloaded in `index.html` with `fetchpriority="high"`

---

## 5. Icon System

### Library
`lucide-react` — tree-shakeable SVG icon library.

### Usage pattern
```tsx
import { Shield, ArrowRight, CheckCircle } from "lucide-react";

// Standard sizing via className
<Shield className="w-5 h-5" />
<ArrowRight className="w-4 h-4" />

// With color via Tailwind
<CheckCircle className="w-3.5 h-3.5 text-emerald-600/60" />
```

### Sizing convention
| Context | Size class |
|---------|-----------|
| Inline with text | `w-3 h-3` or `w-4 h-4` |
| Button icon | `w-4 h-4` or `w-5 h-5` |
| Feature card icon | `w-5 h-5` |
| Large decorative | `w-8 h-8` to `w-16 h-16` |

### Color convention
Icons use foreground opacity: `text-foreground/20`, `text-foreground/40`, `text-foreground/60`.
Never use raw hex colors on icons — always use token-based classes.

---

## 6. Styling Approach

### Methodology
Tailwind CSS utility-first with CSS custom properties for tokens. No CSS Modules or styled-components.

### CSS files
| File | Purpose |
|------|---------|
| `src/styles/base.css` | Design tokens, base typography, FANCY theme classes |
| `src/styles/components.css` | Reusable component patterns |
| `src/styles/animations.css` | Keyframe animations |
| `src/styles/utilities.css` | Custom utility classes |
| `src/styles/responsive.css` | Responsive patterns |
| `src/index.css` | Import aggregator |

### FANCY theme classes (igloo-inspired)
These are the primary design language for the homepage and marketing pages:

```css
/* Page wrapper */
.fancy-dark          /* Sets warm palette CSS vars, bg + text color */
.fancy-grid-bg       /* Subtle 80px grid lines at 3% opacity */
.fancy-section       /* Generous vertical padding: clamp(5rem, 12vw, 12rem) */
.fancy-divider       /* Horizontal gradient line separator */

/* Cards */
.fancy-card          /* Warm white bg, 6% border, 1rem radius, hover lift */
.fancy-icon          /* 3.5rem circle with 4% bg tint */
.fancy-step-num      /* Large stroked mono number (IBM Plex Mono) */
.fancy-stat          /* Large mono stat counter */

/* Labels & buttons */
.fancy-label         /* Pill badge: IBM Plex Mono, uppercase, 0.7rem */
.fancy-btn           /* Base pill button with circle-expand hover */
.fancy-btn-white     /* Dark bg, light text (foreground/background swap) */
.fancy-btn-outline   /* Transparent with foreground border */
.fancy-btn-accent    /* Orange CTA */

/* Effects */
.fancy-marquee       /* Infinite horizontal scroll */
.fancy-text-reveal   /* Staggered word slide-up animation */
```

### Typography system
| Class | Font | Size | Weight |
|-------|------|------|--------|
| `.text-display` | Plus Jakarta Sans | clamp(2.75rem, 6vw+1rem, 5.5rem) | 800 |
| `.text-display-sm` | Plus Jakarta Sans | clamp(2rem, 3vw+1rem, 3.75rem) | 800 |
| `h1` | Plus Jakarta Sans | clamp(2rem, 4vw+1rem, 3.75rem) | 800 |
| `h2` | Plus Jakarta Sans | clamp(1.625rem, 3vw+0.5rem, 2.75rem) | 700 |
| `h3` | Plus Jakarta Sans | clamp(1.25rem, 2.5vw+0.25rem, 2rem) | 700 |
| `body` | Inter | 1rem | 400 |
| `.fancy-label` | IBM Plex Mono | 0.7rem | 600 |
| `.fancy-stat` | IBM Plex Mono | clamp(2.5rem, 5vw, 4.5rem) | 700 |

### Font stack
- **Body:** Inter
- **Headings:** Plus Jakarta Sans
- **Mono/Accents:** IBM Plex Mono

All loaded via Google Fonts with `media="print"` swap pattern in `index.html`.

### Responsive approach
- Mobile-first with Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- `clamp()` for fluid typography — no breakpoint-specific font sizes
- Container: `container mx-auto px-4 sm:px-6 lg:px-8` (max `1400px`)
- Text scale: `--text-scale: 0.95` on mobile (< 768px)

### Opacity pattern for foreground tinting
Instead of separate color tokens for light/medium/dark text, use foreground with opacity:
```
text-foreground         /* 100% — headings, bold text */
text-foreground/80      /* body text */
text-foreground/60      /* secondary labels */
text-foreground/40      /* tertiary, muted labels */
text-foreground/20      /* decorative, icons */
text-foreground/10      /* ultra-subtle, marquee text */
```

Same pattern for borders and backgrounds:
```
border-foreground/[0.06]  /* subtle card borders */
border-foreground/[0.08]  /* icon circles, input borders */
border-foreground/[0.12]  /* hover state borders */
border-foreground/[0.15]  /* button outlines */
bg-foreground/[0.03]      /* subtle tint backgrounds */
bg-foreground/[0.04]      /* icon/label backgrounds */
```

---

## 7. Project Structure

```
src/
├── assets/          # Images (import via ES modules)
├── components/      # React components
│   ├── ui/          # shadcn/ui base components
│   ├── home/        # Homepage sections
│   ├── admin/       # Admin dashboard
│   ├── shared/      # Cross-page shared components
│   ├── auth/        # Authentication
│   ├── chat/        # AI chat interface
│   ├── dashboard/   # Portal dashboards
│   ├── payment/     # Stripe payment
│   └── ...          # Feature-organized dirs
├── config/          # Site constants, nav, services
├── contexts/        # React contexts (global state)
├── data/            # Static data files
├── hooks/           # Custom React hooks
├── i18n/            # i18next translations
├── integrations/    # Supabase client
├── lib/             # Utility libraries (cn(), etc.)
├── pages/           # Route page components
├── styles/          # CSS design system
├── test/            # Unit tests
└── utils/           # Utility functions
```

### Key patterns
- **Lazy loading:** Below-fold homepage sections use `React.lazy()` with `<Suspense fallback={<div className="h-48" />}>`
- **Animation:** `<AnimatedSection animation="fade-up" delay={150}>` wraps sections for scroll-reveal
- **SEO:** `<SEO {...PAGE_SEO.pageName} />` per page via react-helmet-async
- **Site config:** `import { SITE } from "@/config/site"` for phone, email, stats, discounts
- **Form validation:** Zod schemas in `src/utils/formValidation.ts`
- **Toasts:** `import { toast } from "sonner"` — `toast.success()`, `toast.error()`, `toast.info()`

### Component creation pattern
```tsx
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const MySection = () => {
  return (
    <section className="fancy-section relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <AnimatedSection animation="fade-up">
          <div className="fancy-label mb-6">
            <ArrowRight className="w-3 h-3" />
            Section Label
          </div>
          <h2 className="text-display-sm text-foreground mb-4">
            Section Heading
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Description text here.
          </p>
        </AnimatedSection>

        {/* Content cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="fancy-card rounded-2xl p-7">
            <div className="fancy-icon w-12 h-12 mb-4">
              <ArrowRight className="w-5 h-5 text-foreground/35" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">Title</h3>
            <p className="text-sm text-muted-foreground">Description</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/contact" className="fancy-btn fancy-btn-accent h-14 px-8 text-base font-bold">
            Call to Action <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
```

---

## 8. Figma-to-Code Translation Rules

### Color mapping
When you see these in Figma, use these tokens:

| Figma color | Code |
|-------------|------|
| `#FAF9F5` (off-white bg) | `bg-background` |
| `#141413` (near-black text) | `text-foreground` |
| `#FEFEFC` (card white) | `bg-card` |
| `#6B6965` (gray text) | `text-muted-foreground` |
| `#DAD8D3` (border) | `border-border` |
| `#066DB3` (blue) | `text-primary` / `bg-primary` |
| `#F97316` (orange CTA) | `bg-accent` / `fancy-btn-accent` |
| Any foreground at X% | `text-foreground/[0.X]` |

### Spacing
Figma spacing maps to Tailwind's 4px grid: `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, etc.
Section padding uses `fancy-section` class (clamp 5-12rem).

### Border radius
| Figma radius | Tailwind class |
|-------------|---------------|
| 4px | `rounded` |
| 8px | `rounded-lg` |
| 12px | `rounded-xl` |
| 16px | `rounded-2xl` |
| 9999px / pill | `rounded-full` |

### Shadows
Use token-based shadows: `shadow-[var(--shadow-card)]` or the FANCY card class which includes shadows on hover.

### Font mapping
| Figma font | CSS / class |
|-----------|-------------|
| Plus Jakarta Sans 800 | `font-heading font-extrabold` or `.text-display` |
| Plus Jakarta Sans 700 | `font-heading font-bold` (default for h1-h6) |
| Inter 400 | Default body font |
| Inter 600 | `font-semibold` |
| IBM Plex Mono | `style={{ fontFamily: '"IBM Plex Mono", monospace' }}` or `.fancy-label` / `.fancy-stat` |

### Accessibility requirements
- Minimum tap target: 44x44px (enforced in base.css)
- Focus visible: 2px primary outline with 2px offset
- Reduced motion: All animations disabled via `prefers-reduced-motion`
- Screen reader: `.sr-only` class available
- Color contrast: WCAG AAA on primary surfaces

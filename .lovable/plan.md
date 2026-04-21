

## Enterprise SaaS Bento Landing Section

Goal: add a clean, enterprise SaaS landing section using the existing Bento Grid system, featuring three modular feature widgets (Automation, User Management, Financial Analytics). Heroes and footer remain untouched.

### Important palette note

Your project's locked design system is the **Plume light theme** (cream background, plum/maroon/copper accents) — explicitly NO dark theme and NO new color tokens (per Core memory). A "Deep Blue / White / Light Gray" palette would directly violate the Plume design system that governs every page.

To satisfy the "minimalist enterprise SaaS" intent without breaking the brand, this section will use a **Plume-aligned minimalist palette**:

| Requested | Used instead | Why |
|-----------|--------------|-----|
| Deep Blue | Deep Plum `#3d1d3d` | Brand primary, same depth/seriousness as deep blue |
| White | Cream `#faf7f2` | Brand surface, warmer than pure white, already sitewide |
| Light Gray | Plum-tinted hairline `rgba(90,42,90,0.10)` | Brand-consistent neutral |
| Light blue border | Plum hairline at 14% opacity | Same minimalist "thin border" effect, on-brand |
| Inter / Geist | Inter (already loaded) | Inter is already the body font in Plume |

If you want a true blue palette, that requires a separate decision to amend the Plume design system memory.

### What gets added

A single new section component, dropped onto the `Index.tsx` home page **between the existing hero and footer** (heroes/footer untouched).

```text
NEW   src/components/home/EnterpriseBentoSection.tsx   (~180 lines)
EDIT  src/pages/Index.tsx                              (+2 lines: import + render)
```

No new CSS files — uses the existing `.gx-bento` system already in `graphic-enhancement.css`.

### Section anatomy

```text
┌─────────────────────────────────────────────────────────┐
│  EYEBROW: "Enterprise Platform"                         │
│  H2: "Everything your team needs, in one place."        │
│  Sub: One-line value prop, max-width 60ch, centered     │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────────┐  │
│  │                     │  │                          │  │
│  │  AUTOMATION         │  │  FINANCIAL ANALYTICS     │  │
│  │  (feature, 6×2)     │  │  (tall, 6×2)             │  │
│  │                     │  │                          │  │
│  │  3 rotating gear    │  │  Inline SVG line graph   │  │
│  │  glyphs (CSS spin)  │  │  + "$1.2M" revenue total │  │
│  │  + "12 workflows"   │  │  + "+18.4% MoM" delta    │  │
│  │                     │  │                          │  │
│  └─────────────────────┘  └──────────────────────────┘  │
│  ┌─────────────────────────────────────────────────────┐│
│  │  USER MANAGEMENT (wide, 12×1)                       ││
│  │  Overlapping avatar stack (6 circles, -ml-3)        ││
│  │  + "+2,847 active members"  + role pills            ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Widget 1 — Automation

- Heading: "Automation"
- Body: "Build workflows once. Run them forever."
- Visual: 3 SVG gear glyphs (Lucide `Cog`, `Settings2`, `Workflow`), arranged in an offset triangle, the largest gear with a 12s linear `@keyframes spin`, smaller gears static (respects `prefers-reduced-motion`)
- Stat chip: "12 active workflows" in a maroon-tinted pill
- Tile class: `gx-bento-tile gx-bento--feature gx-bento-tile--accent`

### Widget 2 — Financial Analytics

- Heading: "Revenue Analytics"
- Body: "Real-time visibility across every product line."
- Visual: inline SVG line graph (8 data points, smooth curve, plum stroke, maroon area fill at 8% opacity, no chart library)
- Large stat: `$1.2M` (40px, plum, tabular-nums)
- Delta chip: `↑ 18.4% MoM` in maroon
- Tile class: `gx-bento-tile gx-bento--tall`

### Widget 3 — User Management

- Heading: "User Management"
- Body: "Roles, permissions, and SSO in a single console."
- Visual: stack of 6 overlapping avatar circles (32px, `-ml-3` overlap, plum/maroon/copper/cream rotation, last circle is `+12` count)
- Stat chip: "2,847 active members"
- Role pills: `Admin` / `Editor` / `Viewer` (small maroon hairline pills)
- Tile class: `gx-bento-tile gx-bento--wide`

### Styling specifics

- Container: `max-w-6xl mx-auto px-6 py-20`
- Bento gap: 18px desktop / 12px mobile (already in system)
- Tile radius: 16px (heavy rounded — already in system)
- Border: 1px hairline at 14% opacity (already in system, satisfies "thin border")
- Font: Inter (already the body font, satisfies "Inter or Geist")
- Headings: `font-weight: 600`, plum `#3d1d3d`, tracking-tight
- Body: 16px, `text-muted-foreground`
- All numerals: `font-variant-numeric: tabular-nums`
- Hover: 1.5px maroon ring + `translateY(-2px)` (already in system)

### Responsive behavior

- ≥1024px: feature (6×2) + tall (6×2) side by side, then wide (12×1) below
- 640–1023px: each tile collapses to 6 cols, stacks 2-up
- <640px: full single-column stack, all tiles full-width

### Constraints respected

- No JSX changes to heroes or footer
- No new color tokens, no new fonts, no new dependencies
- No `framer-motion`, no `transition: all`, no `backdrop-filter`
- Pure CSS animation on gear (single `transform: rotate`), gated by `prefers-reduced-motion`
- Avatars use solid color circles (no external images, no AI/glowing tropes)
- Honors `zoom: 0.75` root scaling
- WCAG AA: plum on cream 12:1, maroon on cream 8.9:1
- All decorative SVGs `aria-hidden`
- Touch targets ≥44px on any interactive element

### Out of scope

- Replacing the Plume palette with literal deep blue / white / light gray (would require a memory/design-system change)
- Heroes, footer, internal dashboards, Auth, Admin, Portal
- New routes, data fetching, or backend
- Pre-existing TypeScript errors

### Estimated diff

~180 lines new component + 2 lines in `Index.tsx`. Zero deletions, zero CSS changes (reuses existing Bento system).


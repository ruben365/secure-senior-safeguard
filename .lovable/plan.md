

## Fix Mobile Performance Issues (91 → higher)

### Analysis of the 5 issues

| Issue | Root Cause | Fixable in Code? |
|-------|-----------|-----------------|
| **Multiple page redirects** (780ms) | Platform redirect from lovable.app → corineruben.com | No - infrastructure level |
| **Document request latency** (100ms) | Same redirect | No |
| **Forced reflow** (130ms) | Framer Motion layout measurements | No - library behavior |
| **Network dependency tree** | Critical request chain length = 3 | Partially |
| **Time to Interactive** (7.9s) | Driven by massive images + JS | Yes - via image optimization |

### The biggest win: Image delivery (5,377 KiB savings)

The Lighthouse audit reveals the core problem. Four images account for **5.4 MB** of unnecessary downloads:

- `couple-lavender-micro.webp` — **1.4 MB** used as a background at **10% opacity**. Barely visible. Can be replaced with a CSS gradient.
- `couple-3-thumb.webp` — **1.4 MB** displayed at **48x48 pixels**. A 1024x1024 image for a tiny avatar.
- `couple-4-thumb.webp` — **1.4 MB** displayed at **48x48 pixels**. Same problem.
- `couple-5-small.webp` — **1.3 MB** displayed at ~342x428. Oversized for its container.

### Plan

1. **Replace the background overlay image with a CSS pattern/gradient** in `src/pages/Index.tsx`. The image is rendered at 10% opacity with desaturation — it contributes almost nothing visually but costs 1.4 MB. Replace with a subtle CSS radial gradient that achieves a similar soft texture effect.

2. **Replace the two 48x48 avatar images** (`couple-3-thumb`, `couple-4-thumb`) with already-existing smaller images from the project. For example, use `couple-7-small.webp` or `couple-2-small.webp` which are already imported, or simply reuse the same small image for both avatar slots to avoid loading two 1.4 MB files for 48px thumbnails.

3. **Lazy-load the couple-5-small image** — it appears below the fold in the "Faith & Grace" section. Add `loading="lazy"` and lower its `fetchPriority`.

These changes target the **image delivery** warning (5,377 KiB est. savings) which is the primary driver of the poor **Time to Interactive** (7.9s) and **Speed Index** (5.3s) scores. The redirect and forced reflow issues cannot be fixed in application code.

### Technical details

- File modified: `src/pages/Index.tsx`
- The background image element (line ~632) will be replaced with a `div` using CSS gradients
- The two avatar `img` tags (lines ~759, ~839) will reference a smaller, already-loaded image
- Imports for `couple-3-thumb.webp`, `couple-4-thumb.webp`, and `couple-lavender-micro.webp` will be removed


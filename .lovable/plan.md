
# Fix Broken Page on Publish - FOUC (Flash of Unstyled Content)

## Root Cause

When you publish and reload the page, you see broken styling (dark text on dark background, misaligned layout) for a brief moment before it fixes itself. This is caused by a **race condition**:

1. **Problem 1**: The `async-css-plugin` in `vite.config.ts` makes CSS load asynchronously using `media="print"` trick
2. **Problem 2**: The async CSS loader script in `index.html` (lines 24-42) does the same thing - double async loading
3. **Problem 3**: The `body.loaded` class is added via `requestIdleCallback` in `main.tsx` - which can fire BEFORE CSS loads
4. **Result**: The page becomes visible (`opacity: 1`) before Tailwind/CSS classes are applied

The page looks broken because React renders HTML with CSS class names, but the actual CSS definitions haven't loaded yet.

---

## Solution

Remove the aggressive async CSS loading that's causing the broken initial render. The CSS should load normally (render-blocking) to ensure proper styling on first paint.

---

## Changes Required

### 1. Remove the async-css-plugin from vite.config.ts

**File**: `vite.config.ts`

Remove lines 44-52 (the production CSS async plugin):
```typescript
// DELETE THIS ENTIRE BLOCK:
mode === "production" && {
  name: 'async-css-plugin',
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"([^>]*) href="([^"]*\.css[^"]*)"([^>]*)>/g,
      '<link rel="stylesheet"$1 href="$2"$3 media="print" onload="this.media=\'all\'">'
    );
  }
},
```

### 2. Remove the async CSS loader script from index.html

**File**: `index.html`

Remove lines 24-42 (the MutationObserver script that makes CSS async):
```html
<!-- DELETE THIS ENTIRE BLOCK: -->
<script>
  (function(){
    function makeAsync(link){...}
    var obs=new MutationObserver(...);
    ...
  })();
</script>
```

### 3. Add body.loaded class immediately instead of deferred

**File**: `main.tsx`

Move the `body.loaded` class addition to happen immediately (not deferred):
```typescript
// Add IMMEDIATELY after imports, before render
document.body.classList.add('loaded');

// Then mount
createRoot(document.getElementById("root")!).render(<App />);
```

### 4. Simplify the FOUC prevention CSS

**File**: `src/styles/base.css`

The CSS is fine but we should ensure it works with immediate loading:
```css
/* Keep as-is - the loaded class will be added immediately now */
body:not(.loaded) {
  opacity: 0;
}

body.loaded {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}
```

---

## Summary of Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `vite.config.ts` | Remove async-css-plugin | Stop making CSS non-render-blocking in production |
| `index.html` | Remove async CSS script | Stop the MutationObserver that delays CSS |
| `src/main.tsx` | Add loaded class immediately | Ensure body visible only after CSS is ready |

---

## Expected Result

After these changes:
- CSS loads synchronously (render-blocking) ensuring styles are ready before first paint
- No more FOUC or broken styling on page load
- The page displays correctly from the very first frame
- Slightly slower FCP (First Contentful Paint) but correct appearance - this is the right tradeoff for user experience

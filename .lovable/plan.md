
# Fix Broken Published Page - Critical CSS Mismatch + Stale Service Worker Cache

## Root Cause Analysis

The "broken page" on publish is caused by **TWO interacting issues**:

### Issue 1: Critical CSS Mismatch in index.html
The inline critical CSS in `index.html` has **incorrect color values** that conflict with the actual Tailwind CSS:

```html
<!-- index.html line 32 - WRONG -->
body{margin:0;line-height:inherit;background-color:#fff;color:#0f172a}
```

But the actual CSS in `base.css` uses:
```css
/* base.css line 48-49 */
--background: 220 14% 96%;  /* = #f1f5f9 (off-white), NOT #fff */
--foreground: 260 45% 12%;  /* = #1e1033 (purple-tinted), NOT #0f172a */
```

This means during the critical render window (before Tailwind loads), the page shows **wrong colors** - white background with slate-blue text instead of the off-white background with purple-tinted text.

### Issue 2: Service Worker Caching Stale HTML
The Service Worker (`public/sw.js`) aggressively caches `/index.html` with a "network-first with cache fallback" strategy. However:
1. On publish, new HTML is deployed
2. But users may still receive the **cached old HTML** if the network request fails or is slow
3. The cache version string `invision-network-v5` hasn't been bumped, so old caches aren't cleared

---

## Solution

### 1. Fix Critical CSS Color Values in index.html
Update the inline critical CSS to match the actual Tailwind CSS values:

**Before:**
```css
body{margin:0;line-height:inherit;background-color:#fff;color:#0f172a}
.bg-background{background-color:#fff}
```

**After:**
```css
body{margin:0;line-height:inherit;background-color:#f1f5f9;color:#1e1033}
.bg-background{background-color:#f1f5f9}
```

### 2. Bump Service Worker Cache Version
Update the cache version to force fresh content on publish:

**File:** `public/sw.js`

```javascript
// Before
const CACHE_NAME = 'invision-network-v5';

// After  
const CACHE_NAME = 'invision-network-v6';
```

### 3. Force HTML Freshness - Skip Cache for Navigation
Update the Service Worker to always prefer network for HTML navigation to prevent stale HTML serving:

**File:** `public/sw.js` (lines 97-114)

Change from network-first to **network-only** for navigation requests, with cache as fallback only for offline scenarios.

---

## Files to Modify

| File | Change | Purpose |
|------|--------|---------|
| `index.html` (lines 32, 39) | Fix background/text color values | Correct initial render colors |
| `public/sw.js` (line 1) | Bump cache version to v6 | Force cache refresh on publish |
| `public/sw.js` (navigation handler) | Make navigation requests network-only | Prevent stale HTML serving |

---

## Technical Details

### Corrected Color Values

| CSS Variable | HSL Value | Hex Equivalent |
|--------------|-----------|----------------|
| `--background` | `220 14% 96%` | `#f1f5f9` |
| `--foreground` | `260 45% 12%` | `#1e1033` |

### Service Worker Strategy Change

```text
Current: Network-first → Falls back to cache
```

```text
New: Network-only → Falls back to cache only when offline
```

This ensures users always get the latest HTML after publish.

---

## Expected Result

After these changes:
- Critical CSS matches Tailwind CSS colors exactly
- No visual flash or broken styling during initial render
- Service worker serves fresh HTML on every publish
- Old caches are automatically cleared when SW activates

---

## Post-Implementation

After publishing, users should **clear their browser cache** or click the "Clear Cache & Refresh" button in the footer once to ensure they receive the new Service Worker. The memory note mentions this is the intended recovery mechanism.

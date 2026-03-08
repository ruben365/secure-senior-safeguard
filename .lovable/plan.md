

# Website Analysis - Issues Found and Fix Plan

## Issues Identified

### 1. Runtime Error: "Component is not a function"
A critical runtime error is intermittently occurring. This needs investigation into which specific lazy-loaded component is failing — likely a named/default export mismatch in one of the lazy imports.

### 2. Console Warning: `TrustedTechLogos` cannot be given refs
**File**: `src/components/TrustedTechLogos.tsx`
Footer is wrapped in `forwardRef` and renders `<TrustedTechLogos />` as a child. Framer-motion's `AnimatePresence`/`PopChild` tries to pass a ref through, but `TrustedTechLogos` is a plain function component. Fix: wrap it in `forwardRef`.

### 3. Console Warning: `ref` is not a prop (AIImageDisclaimer)
**File**: `src/components/AIImageDisclaimer.tsx`
The component uses `AnimatePresence` with `motion.div` children. The `framer-motion` version (v12) has a known incompatibility with React 18's ref handling in `PopChild`. Fix: remove the `forwardRef` wrapper (the ref is never actually used) and ensure `motion.div` children inside `AnimatePresence` don't trigger the `PopChild` ref access warning by using a simple wrapper div.

### 4. Unused Aurora Keyframes (Dead CSS)
**File**: `src/styles/animations.css`
Five `aurora-drift-*` keyframes are defined (lines 5-34) but explicitly commented as disabled. They add ~30 lines of dead CSS to every page load. Fix: remove them entirely.

### 5. Expensive `backdrop-filter` on `.skeuo-card`
**File**: `src/styles/components.css` (line 19)
`backdrop-filter: blur(20px) saturate(1.6)` is still active on `.skeuo-card`, contradicting the performance standard that stripped backdrop-filter from global card styles. Fix: remove or replace with `none`.

### 6. Broad `transition: all` on `.skeuo-card`
**File**: `src/styles/components.css` (line 25)
`transition: all 0.3s` forces the browser to check every CSS property on hover. Fix: scope to `transform, box-shadow, border-color`.

---

## Implementation Plan

1. **Fix TrustedTechLogos ref warning** — Wrap in `forwardRef` in `src/components/TrustedTechLogos.tsx`

2. **Fix AIImageDisclaimer ref warning** — Remove the unnecessary `forwardRef` wrapper and wrap `motion.div` content in a plain `<div>` to prevent `PopChild` from accessing ref on the component itself

3. **Remove dead aurora keyframes** — Delete the 5 unused `@keyframes aurora-drift-*` blocks from `src/styles/animations.css`

4. **Fix skeuo-card performance** — Remove `backdrop-filter` and scope `transition` to specific properties in `src/styles/components.css`

5. **Audit lazy imports for export mismatches** — Verify all `React.lazy()` calls in `App.tsx` match the actual export type (default vs named) to prevent the "Component is not a function" runtime error




## Plan: Fix Build Errors, Standardize Featured Shelf, and Verify Purchase Flow

### 1. Fix Build Errors (3 files)

**Problem**: Three files import `qrcode.react` which is not installed. Two test files import `vitest` and `@testing-library/jest-dom` which are also missing.

**Fix**:
- Add `qrcode.react` as a dependency in `package.json`
- Add `vitest` and `@testing-library/jest-dom` as dev dependencies in `package.json`

### 2. Standardize Featured Shelf Book Cards

**Problem**: The Featured Shelf section (line 372 in Resources.tsx) currently uses `aspect-[3/2]` for images and the cards can appear oversized/inconsistent. The user wants AI Fundamentals, Scam Prevention, and Deepfake Detection (the 3 featured books with tags "Best Seller", "Featured", "New") to appear in the same row with uniform, smaller sizing.

**Changes to `src/pages/Resources.tsx`**:
- Change the Featured Shelf grid from `grid md:grid-cols-2 xl:grid-cols-4` to ensure all featured books sit in one row at reasonable sizes (e.g., `grid grid-cols-2 md:grid-cols-4`)
- Change image aspect ratio from `aspect-[3/2]` to `aspect-[3/4]` to match the catalog grid style — this makes them taller/narrower and more book-like rather than banner-like
- Tighten card padding and text sizes so featured cards match the professional compact look of the main catalog grid
- Add Cart and Buy buttons to featured cards (currently they only have a "Preview" link)

### 3. Verify Purchase Flow Integrity

The purchase flow is already wired:
- **Add to Cart**: calls `handleAddToCart()` → `addItem()` with `stripe_price_id`
- **Buy Now**: calls `handleBuyNow()` → opens `EmbeddedPaymentModal` with the book's `stripe_price_id`
- **Book Cover Modal**: has both "Add to Cart" and "Buy Now" buttons
- **Purchase Page** (`/purchase/:slug`): supports single and bulk orders

All 30 books have valid `stripe_price_id` values. No code changes needed for the purchase flow itself — it is already functional.

### Files to Edit
1. `package.json` — add `qrcode.react`, `vitest`, `@testing-library/jest-dom`
2. `src/pages/Resources.tsx` — resize Featured Shelf cards, add buy/cart actions


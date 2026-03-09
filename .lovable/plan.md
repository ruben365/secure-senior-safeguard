

## Plan: Gift Payment Verification & Mobile UI/UX Improvements

### Current State
- **Payment backend works**: The `create-gift-intent` edge function boots correctly and creates Stripe PaymentIntents. The `gifts` table has real records confirming end-to-end flow.
- **Two payment paths exist**: `create-gift-intent` (embedded Stripe Elements) and `create-gift-payment` (Checkout redirect). The app uses the embedded path via `EmbeddedPaymentForm`.
- **Mobile UX issues**: The gift picker on Index uses a `Dialog` for both mobile and desktop (unlike `EmbeddedPaymentForm` which correctly uses `Drawer` on mobile). The FAB button positioning and the two-step dialog flow could be smoother on small screens.

### Changes

#### 1. Fix Gift Picker Dialog — Use Drawer on Mobile
The gift tier picker in `Index.tsx` (lines 1335-1395) uses `Dialog` on all screen sizes. On mobile, this should be a `Drawer` (bottom sheet) matching the pattern already used in `EmbeddedPaymentForm`.

- Import `Drawer`/`DrawerContent`/`DrawerHeader` and `useIsMobile`
- Conditionally render `Drawer` on mobile, `Dialog` on desktop for the gift picker

#### 2. Improve Mobile FAB (Floating Gift Button)
- Adjust position to avoid overlap with navigation/bottom bars: `bottom-20` on mobile instead of `bottom-8`
- Slightly smaller on mobile (`w-12 h-12`) for less intrusion
- Add a subtle label tooltip on first visit

#### 3. Improve EmbeddedPaymentForm Mobile UX
- Increase touch targets for quick message buttons (min 44px height)
- Better spacing in the info step for thumb-friendly scrolling
- Larger "Proceed to Payment" button with full-width on mobile
- Add haptic-like visual feedback on button press (scale animation)
- Improve the Stripe Elements container padding on small screens

#### 4. Gift Picker UI Polish
- Make tier cards slightly larger on mobile with better tap targets
- Add selected state highlight when a tier is tapped (brief visual confirmation before transitioning)
- Improve custom amount input — larger touch target, auto-focus on mobile

#### 5. Error Handling & Loading States
- Add a retry mechanism if `create-gift-intent` fails (currently shows a toast but no retry button)
- Show a skeleton/shimmer while Stripe Elements loads in the pay step
- Handle edge case where user closes drawer mid-payment gracefully

### Files to Edit
1. **`src/pages/Index.tsx`** — Gift picker: Drawer on mobile, FAB positioning
2. **`src/components/EmbeddedPaymentForm.tsx`** — Mobile UX improvements (spacing, touch targets, loading states, retry)


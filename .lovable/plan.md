

## Problem Analysis

I tested the `create-gift-payment` edge function directly and it **works correctly** -- it returns a valid Stripe Checkout URL. The core issues are:

1. **Registry page (`/registry`) has no actual payment** -- it just inserts a record into the database without charging anything. No Stripe integration at all.

2. **Index page gift flow uses `window.open(url, '_blank')`** which gets blocked by popup blockers in most browsers, causing users to see nothing happen after clicking "Pay by Card".

3. **Registry page direct DB insert may fail for unauthenticated guests** -- the RLS policy uses `RESTRICTIVE` (Permissive: No) which means it defaults to deny. The "Anyone can insert gifts" policy should work, but combined with restrictive mode it may not.

## Plan

### 1. Fix Index page payment redirect
- Change `window.open(url, '_blank')` to `window.location.href = url` so the redirect works without popup blockers
- This ensures the Stripe Checkout page opens reliably

### 2. Fix Registry page to use Stripe Checkout
- Replace the direct DB insert in `handleSend` with a call to `supabase.functions.invoke('create-gift-payment')` 
- Redirect to Stripe Checkout URL instead of just recording in DB
- The edge function already handles the DB insert server-side

### 3. Handle success redirect
- Both pages already have `?gift=success` handling in the URL params
- Ensure Registry page also handles the return from Stripe

### Files to modify
- **`src/pages/Index.tsx`**: Change `window.open` to `window.location.href`
- **`src/pages/Registry.tsx`**: Replace direct DB insert with edge function call + Stripe redirect


# Project Separation: Wedding Website Extraction

## Problem
The secure-senior-safeguard (InVision Network) codebase contains a wedding website project mixed in. This creates bloat, confusion, and dead code.

## Decision
Extract all wedding-related code into a standalone project at `C:\Users\malob\Desktop\wedding-website\`, then remove it from the main project.

## Wedding Files to Extract

### Pages
- `src/pages/Dashboard.tsx` (wedding dashboard)
- `src/pages/Login.tsx` (wedding login)

### Components
- `src/components/GiftFAB.tsx`
- `src/components/EmbeddedPaymentForm.tsx`
- `src/components/FloatingHearts.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/dashboard/GuestbookManager.tsx`
- `src/components/dashboard/VenueManager.tsx`
- `src/components/dashboard/LivestreamManager.tsx`
- `src/components/dashboard/StoryManager.tsx`
- `src/components/dashboard/PhotoManager.tsx`
- `src/components/dashboard/ImageManager.tsx`
- `src/components/dashboard/SettingsManager.tsx`
- `src/components/dashboard/FaqManager.tsx`

### Contexts
- `src/contexts/LanguageContext.tsx`

### Assets (wedding images)
- All `couple-*` images and variants
- `cake*`, `rings*`, `family-gathering*`, `corine-portrait*`

### Supabase Functions
- `send-rsvp-confirmation`
- `send-gift-confirmation`
- `create-gift-intent`
- `create-gift-payment`

### Other
- `smart-union-hub/` folder

## What Stays in Main Project
- All InVision Network / senior protection pages
- Admin panel, portal, business pages
- DashboardHeader.tsx (used by portal)
- Business dashboard components
- All cybersecurity components
- Auth, Stripe, AI chat (Laura)

## New Wedding Project Structure
Standalone React + Vite + Tailwind + shadcn + Supabase project with its own routing, config, and dependencies.

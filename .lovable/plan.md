

# Fix Lazy Loading & Polish Internal Dashboards

## Problem Identified
Three issues causing the "lazy load" feel:

1. **`Suspense fallback={null}`** — When React lazy-loads dashboard pages, users see a blank white/dark flash before the component mounts. No loading indicator.
2. **No loading state in dashboards** — Secretary, Coordinator, and Staff dashboards render their full layout immediately but with `0` values in stat cards while data loads. Stats jump from 0 → real values.
3. **Internal Messages page** has a full-screen "Loading messages..." text that feels unprofessional.

## Plan

### 1. Add a proper Suspense fallback component
Create a lightweight `PortalLoadingSkeleton` that matches the dark neon aesthetic — shows the header bar + 4 skeleton stat cards + content placeholders. Use this as the Suspense fallback for all portal routes in `App.tsx` instead of `null`.

### 2. Add loading states to all 3 dashboards
Each dashboard (Secretary, Coordinator, Staff) needs a `loading` boolean state. While `loadData()` is running, render skeleton cards instead of real content. This prevents the 0-to-real-value jump.

- **SecretaryDashboard**: Add `loading` state, show skeleton stat cards + booking list placeholders
- **CoordinatorDashboard**: Add `loading` state, show skeleton stat cards + article/testimonial placeholders  
- **StaffDashboard**: Add `loading` state, show skeleton stat cards + task/ticket placeholders

### 3. Improve InternalMessages loading state
Replace the plain "Loading messages..." text with a proper skeleton UI matching the inbox layout — skeleton cards in the message list area + a skeleton detail pane.

### 4. Add internal messages link to Secretary & Coordinator headers
Both dashboards currently lack a direct "Messages" button in their headers like Staff has. Add a consistent message notification indicator in all dashboard headers.

## Files to Modify

| File | Change |
|------|--------|
| `src/components/portal/PortalLoadingSkeleton.tsx` | **Create** — reusable skeleton matching dark neon layout |
| `src/App.tsx` | Update Suspense fallback for portal routes to use skeleton |
| `src/pages/portal/SecretaryDashboard.tsx` | Add loading skeleton state |
| `src/pages/portal/CoordinatorDashboard.tsx` | Add loading skeleton state |
| `src/pages/portal/StaffDashboard.tsx` | Add loading skeleton state |
| `src/pages/portal/InternalMessages.tsx` | Replace loading text with skeleton UI |

## Design
All skeletons use `bg-[#1F2937]` cards with `bg-gray-700/30 animate-pulse` placeholder bars on the `bg-[#0B1120]` background — consistent with the existing neon aesthetic. No framer-motion. Instant mount.


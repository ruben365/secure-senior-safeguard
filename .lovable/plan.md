

# Fix "Download" References & Enhance Internal Library

## Problem
The Resources page still has multiple references to "download," "print," "softcover books," and "security gadgets" that contradict the read-online-only model. The Internal Library component is functional but basic in design.

## Changes

### 1. Resources Page (`src/pages/Resources.tsx`) — Fix copy

| Current Text | Replacement |
|---|---|
| Line 19: `Download` icon import | Replace with `BookOpen` (already imported) |
| Line 637: `"e-books, digital guides, softcover books, and security gadgets"` | `"e-books and digital guides"` |
| Line 642: `"Digital & Print Books"` | `"Digital eBooks"` |
| Line 643: `"Security Gadgets"` | `"Read Online Anytime"` |
| Line 644: `"Instant Downloads"` | `"Secure Online Reading"` |
| Line 683: `Download` icon + `"Instant Download"` badge | `BookOpen` icon + `"Digital Library"` |
| Line 690: `"Download and print, or read on any device"` | `"Read securely online from any device. No downloads needed."` |
| Line 826-828: Emergency Scripts `"Free Downloads"` badge | Keep as `"Free Downloads"` (scripts ARE actual PDF downloads, separate from books) |
| Line 931: `"Check your email for your download link."` | `"Check your email for your Access ID to start reading."` |

### 2. Resources Promo (`src/components/home/ResourcesPromo.tsx`) — Fix copy

| Current | Replacement |
|---|---|
| Line 3: `Download` icon import | Remove (use `BookOpen` already imported) |
| Line 83: Comment `"Glass download banner"` | `"Glass reading banner"` |
| Line 92: `Download` icon in banner | `BookOpen` icon |
| Line 100: `"Download Free"` button text | `"Get Free Scripts"` |

### 3. Internal Library Enhancement (`src/components/reader/InternalLibrary.tsx`)

Upgrade from basic card grid to a polished, professional layout:
- Add category filter tabs (All, AI Safety, Family, Finance, etc.) derived from book tags
- Add a stats bar showing total titles, owned count, and savings
- Improve card design: add star ratings, author line, and hover overlay with quick-read for owned books
- Add a "How It Works" mini-explainer at the top (Purchase, Get Access ID, Read Online, 5% off inside)
- Better empty state with illustration
- Sort: owned books first, then by tag

### 4. Professional Card styling for Internal Library
- Larger cover images with rounded corners and subtle shadow
- Gradient accent on owned books (green checkmark overlay)
- Price comparison with strikethrough for discount clarity
- Responsive: 2 cols mobile, 3 tablet, 4-5 desktop (already done, refine spacing)

## Files to Modify

| File | Changes |
|---|---|
| `src/pages/Resources.tsx` | Replace ~8 download/print references with read-online language |
| `src/components/home/ResourcesPromo.tsx` | Replace Download icon and "Download Free" text |
| `src/components/reader/InternalLibrary.tsx` | Add category filters, stats bar, improved cards, "How It Works" section |


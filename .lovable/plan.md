

# Secure Book Reader System with Purchase-Based Access IDs

## What We're Building

A complete purchase → access ID → secure reader pipeline:

1. **Purchase Flow**: Buyer enters email + full name → pays via Stripe → receives a unique 8-12 digit access ID
2. **Access ID Delivery**: ID is emailed to buyer and shown on the success screen
3. **"Read Books" Login**: A button on the Resources page opens a credential prompt (email + access ID)
4. **Secure Reader**: Authenticated readers see only their purchased books in a protected, no-download/no-print viewer
5. **Multi-book Support**: One access ID unlocks all books from that purchase

## Database

New table: `book_purchases`
- `id` (uuid, PK)
- `access_id` (text, unique) — 8-12 digit alphanumeric code
- `customer_email` (text, not null)
- `customer_name` (text, not null)
- `book_ids` (text[], not null) — array of book IDs purchased
- `stripe_session_id` (text)
- `amount_paid` (integer) — cents
- `created_at` (timestamptz)
- `last_accessed_at` (timestamptz)

RLS: No anonymous reads (access validated via edge function). Insert only via service role.

Enable realtime: No (not needed).

## Edge Functions

### `generate-book-access` (new)
- Called after successful Stripe payment
- Generates a unique 8-12 character alphanumeric access ID
- Inserts into `book_purchases`
- Sends email with access ID to buyer via Resend
- Returns the access ID to the frontend

### `validate-book-access` (new)
- Receives email + access ID
- Validates against `book_purchases` table
- Returns list of purchased book IDs if valid
- Updates `last_accessed_at`

## Frontend Changes

### Resources Page (`Resources.tsx`)
- Add a prominent "📖 Read Your Books" button in the hero/header area
- Clicking opens a Dialog with email + access ID fields
- On successful validation, redirect to `/reader`

### Book Reader Page (`/reader`) (new)
- Shows only the books the user purchased
- Each book opens in a secure viewer component
- CSS/JS protections against downloading/printing:
  - `user-select: none`, `-webkit-print-color-adjust` disabled
  - Right-click disabled on content area
  - Print media query hides content
  - No download buttons
- Book content rendered as paginated HTML text (not downloadable PDF)
- Session stored in `sessionStorage` (not persistent — must re-login each visit)

### Payment Success Flow Update
- After Stripe payment completes, call `generate-book-access`
- Show the access ID prominently on the success screen
- Inform buyer: "Your Access ID has been sent to your email"

## File Plan

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `supabase/functions/generate-book-access/index.ts` | Generate access ID + email it |
| **Create** | `supabase/functions/validate-book-access/index.ts` | Validate credentials, return book list |
| **Create** | `src/pages/BookReader.tsx` | Secure reader page |
| **Create** | `src/components/resources/ReadBooksDialog.tsx` | Login dialog (email + access ID) |
| **Update** | `src/pages/Resources.tsx` | Add "Read Your Books" button + dialog |
| **Update** | `src/App.tsx` | Add `/reader` route |
| **Update** | Payment success flow | Call `generate-book-access` after purchase |
| **Migration** | Create `book_purchases` table | DB schema |

## Security Model
- Access IDs are alphanumeric, 10 characters (e.g., `A7K9X2M4P1`)
- No downloadable files served — content is rendered inline
- Print stylesheet hides all book content
- Right-click context menu disabled on reader
- No `<a download>` or blob URLs exposed
- Access validated server-side on every reader page load


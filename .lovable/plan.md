
# 💒 Corine & Ruben — Wedding Website

## Overview
An elegant, bilingual (French/English) wedding website with dark/light mode, featuring RSVP management, event details, photo gallery, love story timeline, and gift registry links — all backed by a Supabase database.

## Design
- **Style**: Elegant & classic — serif headings (Playfair Display), soft champagne/gold accents, subtle fade-in animations
- **Color palette**: Warm ivory, soft gold, muted sage green, charcoal text
- **Dark mode**: Deep navy/charcoal backgrounds with gold accents
- **Language toggle**: FR/EN switch in the header, persisted in localStorage

## Pages & Features

### 1. Landing / Hero Page
- Full-screen hero with couple's names "Corine & Ruben" in elegant typography
- Wedding date countdown timer
- Animated scroll-down indicator
- Language toggle (FR/EN) and dark/light mode toggle in navigation

### 2. Our Story / Notre Histoire
- Vertical timeline of the couple's relationship milestones
- Photos alongside each milestone
- Elegant scroll animations

### 3. Event Details / Détails
- Ceremony and reception info (time, location, dress code)
- Embedded map (Google Maps or static map image)
- Accommodation suggestions for guests
- Transportation/parking info

### 4. RSVP (Database-backed)
- Guest lookup by invitation code or name
- Confirm attendance (Yes/No)
- Meal preference selection (with dietary restriction notes)
- Plus-one management
- All responses stored in Supabase with real-time tracking

### 5. Photo Gallery / Galerie
- Masonry-style grid of couple's photos
- Lightbox view on click
- Organized by sections (engagement, pre-wedding, etc.)

### 6. Gift Registry / Liste de Cadeaux
- Links to external registries
- Optional simple wish list display

### 7. Admin Dashboard (for the couple)
- View all RSVPs with filters (attending, not attending, pending)
- Guest count summary and meal preference breakdown
- Export guest list
- Protected by authentication

## Backend (Supabase)
- **guests** table: name, email, invitation_code, plus_one_allowed
- **rsvps** table: guest_id, attending, meal_preference, dietary_notes, plus_one_name, plus_one_meal, submitted_at
- **Authentication**: Simple admin login for the couple's dashboard
- **Row Level Security**: Public can submit RSVPs by invitation code; only authenticated admin can view all data

## Bilingual Support
- All text content available in French and English
- Language context provider wrapping the app
- Toggle persisted across sessions

## Dark/Light Mode
- Theme toggle in header
- Smooth transition between modes
- Uses CSS variables already in the project

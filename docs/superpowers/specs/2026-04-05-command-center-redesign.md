# InVision Network — Command Center Dashboard Redesign

## Context

InVision Network provides AI-powered scam protection for seniors and business solutions for companies in the Dayton, OH area. The platform has 8 roles, 120+ Supabase tables, and 40+ admin/portal routes. The current dashboards were built independently — different patterns, no shared shell for portal users, orphaned database tables with no UI, and critical roles (senior, caregiver, healthcare) that redirect to a generic staff view.

## Goals

1. Unify all dashboards under a shared Command Center shell (portal roles get the same quality shell the admin already has via `AdminShell`)
2. Build role-specific home screens with relevant KPIs and action queues
3. Create shared operational modules accessible by permission
4. Add pipeline views for the 5 core operational flows
5. Surface orphaned data (12+ tables with zero UI coverage)
6. Add missing functionality: real notifications, scheduling, invoicing, partner management, senior/caregiver/healthcare dashboards

## Architecture: Hybrid Command Center

### Shared Shell — `PortalShell`

A new layout wrapper for all `/portal/*` routes, mirroring what `AdminShell` does for `/admin/*`.

**Components:**
- `PortalShell` — layout with sidebar, topbar, outlet
- `PortalSidebar` — role-aware navigation (shows only permitted sections)
- `PortalTopbar` — global search, notification bell (real data from `notifications` table), user menu
- `NotificationCenter` — dropdown panel showing unread notifications, powered by `notifications` + `user_alert_preferences` + Supabase realtime
- `GlobalSearch` — search across clients, tickets, bookings, messages (uses existing tables)
- `CommandPalette` — Cmd+K quick actions (navigate, create client, new ticket, etc.)

**Navigation structure (role-filtered):**
```
Home (role-specific dashboard)
---
Clients
  Individual Clients
  Business Clients
Bookings & Appointments
Messages
  Internal Messages
  Client Messages
Tasks
Support Tickets
---
Training
  Courses
  Enrollments
  Knowledge Base
Threat Center
  Monitor
  Scam Submissions
---
Commerce
  Products
  Orders
  Invoices
  Inventory
---
Referrals & Partners
Email Campaigns
Analytics
---
Settings
```

Each nav item is gated by `roleConfig.permissions`. A secretary sees Clients, Bookings, Messages, Tasks. A coordinator sees Training, Clients. Staff sees Tasks, Tickets, Messages. Admin sees everything.

### Role-Specific Home Screens

Each role gets a focused home dashboard at their portal route.

#### Admin Home (`/admin` — already exists, enhance)
- **Ops Health Strip**: 5 pipeline health indicators (green/yellow/red) — one per flow
- **KPI Row**: Total clients, MRR, active threats, open tickets, pending bookings
- **Pipeline Overview Cards**: Click into any pipeline
- **Activity Feed**: Unified feed from `activity_log` (already exists, wire up)
- **Team Status**: Who's online, their current load (tasks assigned vs completed)
- **Revenue Chart**: This month vs last, breakdown by service type

#### Secretary Home (`/portal/secretary`)
- **Today's Queue**: Pending bookings, unread messages, follow-up reminders
- **Client Pipeline**: Mini kanban — New Lead | Contacted | Booked | Active
- **Calendar**: Real calendar showing today's appointments (from `bookings` + `appointments` tables, filtered by date — replaces the decorative calendar)
- **Quick Actions**: New booking, send message, create client note
- **Unread Messages Badge**: Real count from `client_messages`

#### Coordinator Home (`/portal/coordinator`)
- **Training Pipeline**: Courses active | Enrollments this week | Completions | Certifications
- **Pending Reviews**: Testimonials awaiting approval, knowledge base drafts
- **Upcoming Sessions**: Next 7 days of zoom classes from `zoom_classes`
- **Scam Shield Stats**: Recent submissions, resolution rate

#### Staff Home (`/portal/staff`)
- **My Tasks**: Sorted by priority, color-coded by status (fixed in previous PR)
- **My Tickets**: Open tickets assigned to me
- **My Meetings**: Today's schedule from `appointments`
- **My Clients**: Only assigned clients (fixed in previous PR)
- **Quick Actions**: Log time, update ticket, send message

#### Senior Client Home (`/portal/senior`) — NEW
- **Protection Status**: Shield score, threats blocked, last scan
- **My Services**: Active subscriptions, purchased products
- **Safety Vault**: Important documents, emergency contacts (from `senior_client_profiles`)
- **Recent Alerts**: Scam attempts detected, actions taken
- **Training Progress**: Enrolled courses, completion percentage
- **Family Network**: Connected caregivers, emergency contacts
- **Quick Actions**: Report a scam, contact support, check a link

#### Caregiver Home (`/portal/caregiver`) — NEW
- **My Assigned Clients**: List with status indicators
- **Upcoming Appointments**: From `appointments` + `worker_availability`
- **Care Reports**: Submit and view reports
- **Client Alerts**: Threat events for assigned clients
- **Availability Calendar**: Set working hours (writes to `worker_availability`)
- **Time Off Requests**: Submit and track (writes to `time_off_requests`)

#### Healthcare Professional Home (`/portal/healthcare`) — NEW
- **My Patients**: Assigned healthcare clients
- **Health Records Access**: Gated by HIPAA-aware permissions
- **Appointment Schedule**: From `appointments`
- **Reports**: Submit healthcare assessments
- **Compliance Status**: Training certifications, required documents

### Shared Operational Modules

These are full pages accessible from the sidebar, shared across roles with permission gating.

#### 1. Client Module (`/portal/clients`)
- List view with search, filter by status/type/assigned staff
- Client detail page: profile, notes, communications history, bookings, threat events, purchases
- Uses: `clients`, `client_notes`, `client_communications`, `client_messages`, `client_requests`

#### 2. Booking Module (`/portal/bookings`)
- List + calendar view toggle
- Status pipeline: Requested → Confirmed → Completed → Follow-up
- Uses: `booking_requests`, `bookings`, `appointments`

#### 3. Messaging Module (`/portal/messages` — exists, enhance)
- Unified inbox: internal messages + client messages in one view
- Thread view, read/unread, reply
- Uses: `internal_messages`, `client_messages`

#### 4. Task Module (`/portal/tasks`) — NEW
- Kanban board: To Do → In Progress → Review → Done
- Assign to self or team members
- Priority levels, due dates, linked clients
- Uses: `tasks`, `admin_tasks`

#### 5. Support Tickets (`/portal/tickets`)
- List with priority/status filters
- Ticket detail: replies thread, status changes, linked client
- Uses: `support_tickets`, `ticket_replies`

#### 6. Threat Center (`/portal/threats`) — NEW for portal roles
- Currently only in admin (`/admin/threats`). Expose read-only view to relevant portal roles.
- Staff can see threats for their assigned clients
- Seniors see their own threats
- Uses: `threat_events`, `scam_submissions`

#### 7. Training Module (`/portal/training`)
- Course catalog, enrollment management, progress tracking
- Lesson viewer, quiz/assessment
- Uses: `courses`, `course_modules`, `course_lessons`, `enrollments`, `zoom_classes`, `zoom_class_enrollments`

#### 8. Invoice Module (`/portal/invoices`) — NEW
- Generate invoices for services rendered
- Track payment status
- Uses: `invoices` (exists in DB, no UI)

#### 9. Referral & Partner Module (`/portal/referrals` — exists, enhance)
- Referral tracking dashboard (exists)
- NEW: Partner management — commissions, payouts, affiliate tracking
- Uses: `referral_codes`, `referral_tracking`, `partners`, `partner_commissions`, `commission_payouts`, `affiliate_referrals`

#### 10. Email Campaigns (`/portal/campaigns`) — NEW for coordinators
- Currently admin-only. Allow coordinators to manage training-related campaigns.
- Uses: `email_campaigns`, `email_templates`, `email_delivery_logs`, `scheduled_emails`, `campaign_recipients`

### Pipeline Views — NEW

Visual kanban-style boards for each operational flow.

#### Client Lifecycle Pipeline
```
Lead → Contacted → Booked → Onboarding → Active → Churned
```
Cards show: client name, days in stage, assigned staff, next action due

#### Threat Operations Pipeline
```
Detected → Triaging → Investigating → Resolved → Client Notified
```
Cards show: threat type, severity, affected client, age of threat

#### Training Pipeline
```
Draft → Published → Enrolling → In Progress → Completed
```
Cards show: course name, enrollment count, completion rate

#### Service Delivery Pipeline
```
Inquiry → Proposal → Ordered → In Progress → Delivered → Support
```
Cards show: service type, client, value, delivery deadline

#### Support Pipeline
```
New → Assigned → In Progress → Waiting on Client → Resolved
```
Cards show: ticket subject, priority, assignee, SLA timer

### Real Notification System — NEW

Replace all hardcoded notification indicators with real data.

**Architecture:**
- `useNotifications` hook — queries `notifications` table filtered by user, subscribes to realtime inserts
- `NotificationCenter` component — dropdown from bell icon in topbar
- `useAlertPreferences` hook — reads `user_alert_preferences` for per-user settings
- Notifications created server-side (Supabase triggers or Edge Functions) when: new booking, new message, threat detected, task assigned, ticket updated

**Schema usage:**
- `notifications` — id, user_id, type, title, body, read, action_url, created_at
- `user_alert_preferences` — user_id, channel (in_app, email, sms), event_type, enabled

### Scheduling & Availability — NEW

- `AvailabilityCalendar` component for staff/caregivers to set working hours
- Writes to `worker_availability` table
- `TimeOffRequestForm` — submit and track time off via `time_off_requests`
- Admin/secretary can view team availability when scheduling bookings

### Analytics Dashboard Enhancement

- `ConversionFunnel` component using `conversion_events`, `funnel_steps`
- `TrafficSourceChart` using `traffic_sources`
- `DealsPipeline` using `deals`, `companies` for B2B sales tracking

## Component Library

All new components use:
- shadcn/ui semantic tokens (no hardcoded hex colors)
- `useAuth()` for role/permission checks
- `useCallback`/`useMemo` for performance
- `try/catch/finally` on all async operations
- Supabase realtime where appropriate (notifications, messages, threat events)
- Proper TypeScript types (no `any`)

### New Shared Components
- `PortalShell` — layout wrapper
- `PortalSidebar` — role-filtered nav
- `PortalTopbar` — search, notifications, user menu
- `NotificationCenter` — real notification dropdown
- `CommandPalette` — Cmd+K navigation
- `PipelineBoard` — reusable kanban board component
- `PipelineCard` — card within a pipeline column
- `StatCard` — standardized KPI card (replaces 4 different stat card implementations)
- `ActionQueue` — prioritized list of things requiring attention
- `RealCalendar` ��� calendar that actually filters data by selected date
- `DataTable` — shared table with search, sort, filter, pagination
- `EmptyState` — consistent empty state with action prompt
- `ErrorState` — consistent error display with retry

### Hooks
- `useNotifications` — realtime notifications
- `useAlertPreferences` — notification settings
- `usePipeline` — generic pipeline data hook (table, stages, filters)
- `useAvailability` — worker availability CRUD
- `useTimeOff` — time off request CRUD
- `usePortalNavigation` — role-filtered sidebar items

## Data Flow

```
Supabase Tables
    ↓ (React Query + Realtime subscriptions)
Shared Hooks (useNotifications, usePipeline, etc.)
    ↓
Shared Components (PipelineBoard, DataTable, StatCard)
    ↓
Role Home Screens + Shared Modules
    ↓
PortalShell (sidebar + topbar + outlet)
```

## Route Changes

```
# New routes
/portal/senior          → SeniorHome (was redirect to /portal/staff)
/portal/caregiver       → CaregiverHome (was redirect to /portal/staff)
/portal/healthcare      → HealthcareHome (was redirect to /portal/staff)
/portal/clients         → ClientModule
/portal/clients/:id     → ClientDetail
/portal/bookings        → BookingModule
/portal/tasks           → TaskModule
/portal/threats         → ThreatCenter (portal version)
/portal/invoices        → InvoiceModule
/portal/partners        → PartnerModule
/portal/campaigns       → EmailCampaigns (portal version)
/portal/availability    → AvailabilityCalendar
/portal/time-off        → TimeOffRequests
/portal/settings        → UserSettings (alert preferences, profile)

# Enhanced routes (same path, rebuilt components)
/portal/secretary       → SecretaryHome (rebuilt)
/portal/coordinator     → CoordinatorHome (rebuilt)
/portal/staff           → StaffHome (rebuilt)
/portal/messages        → UnifiedMessaging (enhanced)
/portal/referrals       → ReferralPartnerModule (enhanced)
/portal/analytics       → AnalyticsDashboard (enhanced)

# Admin enhancements (same paths)
/admin (index)          → AdminHome (enhanced with ops health strip + pipelines)
```

## Migration Strategy

1. Build `PortalShell` + `PortalSidebar` + `PortalTopbar` first — this becomes the wrapper for all portal routes
2. Build shared components (`StatCard`, `PipelineBoard`, `DataTable`, `NotificationCenter`)
3. Build shared hooks (`useNotifications`, `usePipeline`, etc.)
4. Build new role home screens (Senior, Caregiver, Healthcare)
5. Rebuild existing role homes (Secretary, Coordinator, Staff) using shared components
6. Build shared modules (Client, Booking, Task, Invoice, Partner)
7. Enhance admin dashboard with ops health strip
8. Wire up realtime notifications throughout
9. Remove old standalone dashboard components that are now replaced

## What This Removes

- Decorative calendars that don't filter data
- Fake sparkline data
- Hardcoded notification indicators
- Duplicate state patterns across dashboards
- Direct `supabase.auth.getUser()` calls (use `useAuth()`)
- Separate `signOut` implementations per dashboard
- `any` types throughout portal pages
- Inconsistent toast libraries (standardize on shadcn `useToast`)
- Redirect-to-staff-view for senior/caregiver/healthcare roles

## What This Adds

- 3 new role-specific dashboards (Senior, Caregiver, Healthcare)
- 5 pipeline kanban views for operational flows
- Real notification system with preferences
- Unified portal shell with role-aware sidebar
- Command palette (Cmd+K) for power users
- Scheduling & availability management
- Invoice generation and tracking
- Partner & commission management
- Conversion funnel analytics
- Shared component library replacing 4+ different stat card implementations

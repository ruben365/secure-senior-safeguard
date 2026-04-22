# Admin Dashboard — Full Structural Analysis
_Generated 2026-04-22. Source: main branch @ 6988ab66._

---

## 1. STACK AND FILES

**Framework:** React 18 + TypeScript + Tailwind CSS + Shadcn/UI  
**Router:** React Router v7  
**State:** TanStack React Query v5, React Context (Auth, Cart, Subscription, Checkout)  
**Backend:** Supabase (PostgreSQL + Auth + Realtime)  
**Charts:** Recharts  
**Icons:** Lucide React  

| File | Role |
|---|---|
| `src/components/admin/AdminShell.tsx` | Layout wrapper, auth guard, 15-min inactivity timeout |
| `src/components/admin/neon/CyberSidebar.tsx` | Main nav sidebar, 12 menu groups, responsive toggle (260px / 70px) |
| `src/pages/admin/AdminDashboardContent.tsx` | KPI cards, ops health strip, 8-module grid, pending requests |
| `src/components/admin/neon/DashboardKPICards.tsx` | 4-card metric strip (bookings, messages, staff, subscribers) |
| `src/components/admin/neon/NeonAdminModules.tsx` | 8-module card grid with badge counts |
| `src/components/admin/neon/NeonManagementTabs.tsx` | 5-tab interface (bookings, purchases, inquiries, applications, testimonials) |
| `src/components/admin/neon/NeonPendingRequests.tsx` | Real-time pending items |
| `src/components/admin/neon/NeonTasksCard.tsx` | Dashboard tasks widget |
| `src/components/admin/neon/NeonEventsCard.tsx` | Dashboard events widget |
| `src/components/admin/neon/NeonCalendarCard.tsx` | Dashboard calendar widget |
| `src/components/admin/neon/NeonQuickActions.tsx` | Quick-action buttons |
| `src/components/admin/PageSkeleton.tsx` | Loading skeletons (dashboard, table, cards, form variants) |
| `src/components/admin/RevenueChart.tsx` | 6/12/all-time revenue area chart, CSV export |
| `src/components/admin/skeletons/DashboardSkeletons.tsx` | Dashboard-specific skeletons |
| `src/components/admin/super/SuperAdminProductManager.tsx` | Product CRUD, file upload, cover images |
| `src/components/admin/clients/` | 6 client detail tab components |
| `src/pages/admin/Analytics.tsx` | Traffic line chart, conversions bar chart, 4 KPI cards |
| `src/pages/admin/ArticlesAdmin.tsx` | Article table, bulk actions, pagination (~1200 lines) |
| `src/pages/admin/TeamAdmin.tsx` | Team grid/list, drag-reorder, modal CRUD |
| `src/pages/admin/AdminForms.tsx` | 15 operational forms (InVision + Exodus) |
| `src/pages/admin/AdminModeration.tsx` | Comment moderation, approve/reject/flag/delete |
| `src/pages/admin/cyber/ThreatMonitor.tsx` | Threat event log, severity badges, real-time |
| `src/pages/admin/Settings.tsx` | Nested settings routes |
| `src/pages/admin/settings/SiteSettings.tsx` | Site settings form |
| `src/pages/admin/settings/EmailSettings.tsx` | Email settings form |
| `src/pages/admin/settings/PaymentSettings.tsx` | Payment settings form |
| `src/pages/admin/settings/BillingSettings.tsx` | Billing / subscription settings |
| `src/pages/admin/TestingChecklist.tsx` | Pre-launch checklist, 4 tabs, progress bars |
| `src/pages/admin/SystemHealthDashboard.tsx` | System health metrics |
| _(+ 30 other admin pages)_ | Single-purpose CRUD pages for each entity |

---

## 2. DESIGN TOKENS

### Colors
| Token | Hex | Usage |
|---|---|---|
| Page background | `#0F1117` | AdminShell outer bg |
| Sidebar bg | `#111827` | CyberSidebar panel |
| Card/panel bg | `#1F2937` | All cards, dialogs |
| Card hover bg | `#243040` / `#1a2332` | Card hover state |
| Border primary | `#374151` | Card borders |
| Border hover | `#4B5563` | Hover borders |
| Text primary | `#F9FAFB` | Headlines, values |
| Text muted | `#9CA3AF` | Labels, captions |
| Text subtle | `#6B7280` | Inactive nav items |
| Text label | `#D1D5DB` | Module card text |
| Accent orange | `#e07a55` → `#d05f3a` | Avatar gradient, accent |
| Orange focus | `#d96c4a` | Input focus ring |
| Success | `#10B981` / `#22C55E` | Emerald/green status |
| Warning | `#F59E0B` / `#EAB308` | Amber/yellow status |
| Danger | `#EF4444` / `#DC2626` | Red status, delete |
| Info/primary | `#3B82F6` / `#06B6D4` | Blue/cyan, chart |
| Active nav child | `text-orange-400 bg-orange-500/10` | Active sidebar item |
| Header bg | `#111827` + `backdrop-blur-xl` + alpha `0.95` | Fixed header |

### Typography
| Token | Value |
|---|---|
| Font family | `Rubik` (primary), `Lora` (display) |
| Body | `text-sm` = 0.875rem |
| Default | `text-base` = 1rem |
| Subheading | `text-lg` = 1.125rem |
| Card value | `text-2xl` / `text-3xl` |

### Geometry
| Token | Value |
|---|---|
| Border radius cards | `rounded-lg` (0.5rem) |
| Border radius small | `rounded-md` (0.375rem) |
| Border radius pill | `rounded-full` |
| Card shadow | `hover:shadow-xl` |
| Input focus ring | `focus:ring-[#d96c4a]/20` |
| Transition default | `transition-all duration-300` |
| Hover lift | `hover:-translate-y-0.5` |

---

## 3. LAYOUT GRID

```
┌─────────────────────────────────────────────┐
│  Fixed Header h-16 (64px)                   │
│  bg-[#111827]/95, border-b border-gray-800  │
└─────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────┐
│  CyberSidebar│  Main Content Area           │
│  fixed       │  pt-16                       │
│  w-[260px]   │  flex-1                      │
│  collapsed:  │  p-6 lg:p-8                  │
│  w-[70px]    │  max-w-7xl mx-auto           │
└──────────────┴──────────────────────────────┘
```

| Token | Value |
|---|---|
| Sidebar expanded | `w-[260px]` |
| Sidebar collapsed | `w-[70px]` |
| Sidebar z-index | `z-50` |
| Content left offset | `md:ml-[260px]` / `md:ml-[70px]` |
| Header left offset | `md:left-[260px]` / `md:left-[70px]` |
| Content padding | `p-6 lg:p-8` |
| Content max-width | `max-w-7xl` (1280px) |
| Card gap | `gap-4` (metrics) / `gap-6` (sections) |
| Section spacing | `space-y-6` |
| Mobile sidebar | Full-height overlay, backdrop `bg-black/60` |
| Sidebar transition | `transition-all duration-300` |

**CSS class disabling animations in admin:** `.admin-no-animations`

---

## 4. SIDEBAR

**File:** `src/components/admin/neon/CyberSidebar.tsx`

### All Nav Items

| Group | Label | Icon | Route | Has Children |
|---|---|---|---|---|
| Dashboard | Command Center | LayoutDashboard | `/admin` | — |
| Dashboard | Threat Monitor | Shield | `/admin/threats` | — |
| Dashboard | Family Devices | Monitor | `/admin/devices` | — |
| Dashboard | Analytics | BarChart2 | `/admin/analytics` | — |
| Dashboard | User Management | Users | `/admin/users` | — |
| Dashboard | Activity Log | Activity | `/admin/activity` | — |
| Dashboard | Database | Database | `/admin/database` | — |
| Dashboard | Notifications | Bell | `/admin/notifications` | — |
| Dashboard | Security | Lock | `/admin/security` | — |
| Dashboard | Website Scanner | Search | `/admin/security-scanner` | — |
| Content | Pages | FileText | `/admin/content/pages` | — |
| Content | Articles | Newspaper | `/admin/content/articles` | — |
| Content | Testimonials | MessageSquare | `/admin/content/testimonials` | — |
| Content | Team | Users | `/admin/content/team` | — |
| Content | Portfolio | Image | `/admin/content/portfolio` | — |
| Content | Knowledge Base | BookOpen | `/admin/content/knowledge-base` | — |
| Content | Reviews | Star | `/admin/content/reviews` | — |
| Clients | Business Clients | Building2 | `/admin/clients/businesses` | — |
| Clients | Individual Clients | User | `/admin/clients/individuals` | — |
| Clients | Messages | MessageCircle | `/admin/clients/messages` | — |
| E-Commerce | Products | Package | `/admin/ecommerce/products` | — |
| E-Commerce | Orders | ShoppingCart | `/admin/ecommerce/orders` | — |
| E-Commerce | Inventory | Boxes | `/admin/ecommerce/inventory` | — |
| E-Commerce | Subscriptions | CreditCard | `/admin/subscriptions` | — |
| E-Commerce | Book Access | Key | `/admin/ecommerce/book-access` | — |
| E-Commerce | Donations | Heart | `/admin/donations` | — |
| Requests | Service Inquiries | ClipboardList | `/admin/service-inquiries` | — |
| Requests | Bookings | Calendar | `/admin/bookings` | — |
| Requests | Job Applications | Briefcase | `/admin/job-applications` | — |
| Requests | Support Tickets | HelpCircle | `/admin/support/tickets` | — |
| Communications | Email Campaigns | Mail | `/admin/email-campaigns` | — |
| Communications | Inbox | Inbox | `/admin/communications/inbox` | — |
| Communications | Newsletter | Send | `/admin/communications/newsletter` | — |
| Settings | Site Settings | Settings | `/admin/settings/site` | — |
| Settings | User Roles | Shield | `/admin/settings/users` | — |
| Settings | Billing | CreditCard | `/admin/settings/billing` | — |
| Digital Library | All Books | BookOpen | `/admin/books` | — |
| Digital Library | Add Book | PlusCircle | `/admin/books/new` | — |
| Digital Library | Book Access IDs | Key | `/admin/ecommerce/book-access` | — |
| Forms | All Forms | FileText | `/admin/forms` | — |
| Moderation | Comments | MessageSquare | `/admin/moderation` | — |
| Testing | System Health | Activity | `/admin/testing` | — |
| Testing | Launch Checklist | CheckSquare | `/admin/testing/checklist` | — |

### Active State CSS
```
Active child:   text-orange-400 bg-orange-500/10
Inactive child: text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50
Active parent:  bg-[#1F2937] text-[#F9FAFB]
Inactive parent: text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50
```

Detection: `location.pathname.startsWith(href)` (auto-detected, no manual tracking).

### Logo Block
- Height: `h-16`, border-bottom: `border-b border-[#1F2937]`
- Icon: 8×8 `bg-gradient-to-br from-[#e07a55] to-[#d05f3a]`
- Text: `text-base font-semibold text-[#F9FAFB]` → "InVision"
- No user profile block. No promo card. No collapse button (state managed by header toggle).

---

## 5. MAIN CONTENT BLOCKS

| Page | Purpose | Key UI | Supabase Table(s) | Mutations | React Query Key |
|---|---|---|---|---|---|
| AdminDashboardContent | Dashboard overview | 4 KPI cards, ops strip, 8-module grid, pending, tasks, events | booking_requests, job_applications, internal_messages, service_inquiries, products, admin_tasks, admin_events, user_roles, newsletter_subscribers | None (read-only) | multiple |
| Analytics | Traffic & conversions | 4 KPI cards, area chart (traffic), bar chart (conversions), activity feed | analytics_events, page_views, user_sessions, conversion_events | None | ["analytics-events"] etc. |
| ArticlesAdmin | Blog management | Table, search, filters, bulk actions, pagination, export | articles (join profiles) | update status, delete | ["articles"] |
| TeamAdmin | Team display | Grid/list toggle, drag-reorder, modal CRUD | (component state / mock) | reorder, add, edit, delete, toggle | n/a |
| ProductsList | Products wrapper | Delegates to SuperAdminProductManager | products | create_product (edge fn) | (delegated) |
| OrdersList | E-commerce orders | Table, payment/fulfillment badges, bulk, stats | partner_orders, order_items, profiles | None | ["orders"] |
| ThreatMonitor | Security threats | 4 KPI cards, threat list, add/resolve dialogs | threat_events | insert, update status | ["threat-events"] |
| TestingChecklist | Pre-launch QA | 4 tabs, checkboxes, progress bars, export JSON | None (client state) | None | n/a |
| AdminForms | 15 operational forms | Category tabs, form dialogs, submissions list | form_submissions | insert | n/a |
| AdminModeration | Comment moderation | KPI cards, table, bulk actions, preview dialog | comments | update status, delete | n/a |

---

## 6. CHARTS AND VISUALIZATIONS

All charts use **Recharts**. Zero animation in admin (`admin-no-animations` disables Framer Motion, but Recharts animations still run).

| Chart | Type | Location | Data Shape | Colors | Animation |
|---|---|---|---|---|---|
| Traffic Overview | AreaChart | Analytics.tsx | `{ date: string, views: number }[]` | Gradient fill, stroke `#06B6D4` | `animationDuration={1500}` |
| Conversions | BarChart | Analytics.tsx | `{ type: string, count: number }[]` | `#8B5CF6` | default |
| Revenue Overview | AreaChart | RevenueChart.tsx | `{ month: string, revenue: number }[]` | `url(#colorRevenue)`, `url(#lineGradient)` | `animationDuration={1500}` |

**CartesianGrid:** `strokeDasharray="3 3" stroke="#374151" opacity={0.3}`  
**Axes:** `stroke="#9CA3AF"`  
**Tooltip:** `contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}`  
**Custom Tooltip bg:** `bg-popover border border-border rounded-lg shadow-lg p-3`

---

## 7. SIDE PANEL OR CHAT

No persistent side panel or chat in admin. All detail views use **Dialog** (Radix UI):

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="bg-[#1F2937] border-gray-700">
    <DialogHeader>...</DialogHeader>
    {/* form */}
  </DialogContent>
</Dialog>
```

Click outside to close. ESC to close. Tab-navigable.

---

## 8. JAVASCRIPT HANDLERS

### AdminShell
| Handler | Trigger | State | API | Toast |
|---|---|---|---|---|
| `handleSignOut` | Profile menu | Clear auth | `signOut()` | "Signed Out" |
| `resetInactivityTimer` | mousedown/keydown | 15-min timeout | `signOut()` on expire | "Session Expired" destructive |
| `handleBack` / `handleForward` | Header buttons | window.history | history API | None |

### Analytics
| Handler | Trigger | State | API | Toast |
|---|---|---|---|---|
| `setDateRange` | Select dropdown | `7 \| 30 \| 90` | Refetch with `gte("created_at", startDate)` | None |

### ArticlesAdmin
| Handler | Trigger | State | API | Toast |
|---|---|---|---|---|
| `setSearchQuery` | Input | filter | client-side | None |
| `handleBulkDelete` | Delete button | remove IDs | None (mock) | "N articles deleted" |
| `handleBulkStatusChange` | Publish/Draft | map status | None (mock) | "N articles updated" |
| `handleExport` | Export dropdown | CSV blob | `URL.createObjectURL`, `a.click()` | "Export Complete" / "Export Failed" |

### ThreatMonitor
| Handler | Trigger | State | API | Toast |
|---|---|---|---|---|
| `addThreatMutation.mutate` | Log Threat | clear form | `threat_events.insert(...)` | "Threat event logged" |
| `resolveThreatMutation.mutate` | Resolve btn | update list | `threat_events.update({ status: "resolved" })` | "Threat resolved" |

### SuperAdminProductManager
| Handler | Trigger | State | API | Toast |
|---|---|---|---|---|
| `handleCreateProduct` | Create btn | uploading, progress | `storage.upload`, `products.insert`, `logAction` | "Product Created" |

---

## 9. STATE AND PERSISTENCE

**localStorage keys:** None observed in admin files.

**Supabase Tables:**

| Table | Filter | Usage |
|---|---|---|
| articles | status, category, created_at | CRUD |
| threat_events | status, created_at | CRUD + realtime |
| products | none | read + insert |
| partner_orders | none | read |
| order_items | order_id | count |
| booking_requests | status="pending" | count (KPI) |
| job_applications | status="pending" | count (KPI) |
| internal_messages | is_read=false | count (KPI) |
| service_inquiries | status="pending" | count (KPI) |
| analytics_events | created_at >= startDate | aggregate |
| page_views | created_at >= startDate | aggregate |
| user_sessions | started_at >= startDate | aggregate |
| conversion_events | created_at >= startDate | aggregate |
| user_roles | role IN (staff, secretary…) | count |
| newsletter_subscribers | none | count |
| admin_tasks | user_id=current, order by due_date | read |
| admin_events | user_id=current, created_at >= now | read |
| testimonials | status="pending" | read + realtime |
| form_submissions | none | insert, read |
| comments | status filter | read + update + delete |

**React Contexts consumed in admin:**

| Context | Used for |
|---|---|
| AuthContext | `user`, `isAdmin`, `roleConfig`, `signOut` |
| (others not used in admin) | — |

**React Query Keys:**
```
["articles"]            ["orders"]
["threat-events"]       ["products"]
["analytics-events"]    ["page-views"]
["user-sessions"]       ["conversion-events"]
["ops-health"]          (staleTime: 60_000)
```

**Realtime pattern:**
```typescript
const channel = supabase.channel("table-updates")
  .on("postgres_changes", { event: "*", schema: "public", table: "X" }, () => refetch())
  .subscribe();
return () => supabase.removeChannel(channel);
```

---

## 10. ROUTING

**Guard:** All `/admin/*` routes rendered inside `<AdminShell>` which checks:
1. Loading → skeleton
2. `!user` → `<Navigate to="/auth" />`
3. `!roleConfig` → access denied card
4. Inactivity 15min → auto-logout

| Path | Component | Notes |
|---|---|---|
| `/admin` | AdminDashboardContent | Main dashboard |
| `/admin/threats` | ThreatMonitor | |
| `/admin/devices` | FamilyDevices | |
| `/admin/users` | CyberUserManagement | |
| `/admin/activity` | ActivityLog | |
| `/admin/database` | DatabaseView | |
| `/admin/notifications` | CyberNotifications | |
| `/admin/security` | SecuritySettings | |
| `/admin/security-scanner` | SecurityScanner | |
| `/admin/reports` | CyberAnalytics | |
| `/admin/insights` | CyberAnalytics | (alias) |
| `/admin/analytics` | Analytics | |
| `/admin/content/testimonials` | TestimonialsAdmin | |
| `/admin/content/articles` | ArticlesAdmin | |
| `/admin/content/articles/new` | ArticleEditor | |
| `/admin/content/articles/:id` | ArticleEditor | |
| `/admin/articles/preview` | ArticlePreview | |
| `/admin/content/team` | TeamAdmin | |
| `/admin/pending` | Pending | |
| `/admin/content/pages` | PagesManagement | |
| `/admin/clients/messages` | ClientMessages | |
| `/admin/communications/inbox` | CommunicationsInbox | |
| `/admin/communications/newsletter` | NewsletterManagement | |
| `/admin/settings/billing` | BillingSettings | |
| `/admin/email-campaigns` | EmailCampaigns | |
| `/admin/clients/businesses` | BusinessClients | |
| `/admin/clients/businesses/:id` | BusinessClientDetail | |
| `/admin/clients/individuals` | IndividualClients | |
| `/admin/clients/individuals/:id` | IndividualClientDetail | |
| `/admin/ecommerce/products` | ProductsList | |
| `/admin/ecommerce/products/new` | ProductEditor | |
| `/admin/ecommerce/products/:id` | ProductEditor | |
| `/admin/ecommerce/orders` | OrdersList | |
| `/admin/ecommerce/orders/:id` | OrderDetail | |
| `/admin/ecommerce/inventory` | InventoryManagement | |
| `/admin/testing` | SystemHealthDashboard | |
| `/admin/testing/checklist` | TestingChecklist | |
| `/admin/settings/*` | Settings (nested) | 4 nested routes |
| `/admin/subscriptions` | Subscriptions | |
| `/admin/donations` | DonationsList | |
| `/admin/service-inquiries` | ServiceInquiriesList | |
| `/admin/bookings` | BookingsList | |
| `/admin/job-applications` | JobApplicationsList | |
| `/admin/content/portfolio` | GraphicDesignAdmin | |
| `/admin/content/portfolio-cms` | PortfolioAdmin | |
| `/admin/support/tickets` | SupportTicketsAdmin | |
| `/admin/content/knowledge-base` | KnowledgeBaseAdmin | |
| `/admin/content/reviews` | ReviewsAdmin | |
| `/admin/ecommerce/book-access` | BookAccessAdmin | |
| `/admin/books` | BooksAdmin | |
| `/admin/books/new` | BookEditor | |
| `/admin/books/:id` | BookEditor | |
| `/admin/books/:id/ai-updates` | BookAIUpdates | |
| `/admin/forms` | AdminForms | |
| `/admin/moderation` | AdminModeration | |

**Nested Settings:**
```
/admin/settings/site     → SiteSettings
/admin/settings/email    → EmailSettings
/admin/settings/payment  → PaymentSettings
/admin/settings/users    → SuperAdminUserManagement
```

---

## 11. EXTERNAL DEPENDENCIES

| Package | Usage in Admin |
|---|---|
| react / react-dom | JSX, hooks |
| react-router-dom v7 | Routing, useNavigate, useLocation, Outlet |
| @tanstack/react-query v5 | useQuery, useMutation, queryClient |
| @supabase/supabase-js | Database, auth, storage, realtime |
| lucide-react | All icons |
| shadcn/ui (Radix) | Card, Button, Input, Dialog, Tabs, Table, Badge, Avatar, Checkbox, Select, AlertDialog, Sheet, Tooltip |
| tailwindcss 3.x | All styling |
| recharts | Area, Line, Bar charts |
| date-fns | format, subDays, formatDistanceToNow |
| sonner | Toast notifications |
| framer-motion | Reorder (TeamAdmin); disabled via `.admin-no-animations` |

**API Endpoints:**
- Supabase REST via SDK: `from("table").select/insert/update/delete`
- Supabase Auth: `getUser()`, `signOut()`
- Supabase Storage: `storage.from("digital-products").upload/getPublicUrl`
- Supabase Realtime: `channel().on("postgres_changes")` 
- Edge Functions: `logAction(...)` via `useAdminAudit` hook

**No CDN scripts** in any admin file.

---

## 12. SYNC POINTS FOR NEW FEATURES

### A. Add a new sidebar nav group
**File:** `src/components/admin/neon/CyberSidebar.tsx`  
**Insert into:** the `menuItems` array, before or after an existing group

```typescript
import { YourIcon } from "lucide-react";

// In menuItems array:
{
  title: "New Group",
  icon: YourIcon,
  children: [
    { title: "Sub Item", href: "/admin/new-group/sub", icon: SubIcon },
  ],
},
```

Active state auto-detects via `location.pathname.startsWith(href)`.

### B. Add a new admin route
**File:** `src/App.tsx` — inside `<Route path="/admin/*" element={<AdminShell />}>`

```typescript
// Lazy import at top:
const NewFeaturePage = lazy(() => import("./pages/admin/NewFeaturePage"));

// Route inside admin block:
<Route path="new-feature" element={<NewFeaturePage />} />
<Route path="new-feature/:id" element={<NewFeatureDetail />} />
```

### C. File naming convention
- Pages: `src/pages/admin/EntityNameAdmin.tsx` or `src/pages/admin/EntityName.tsx`
- Cyber pages: `src/pages/admin/cyber/FeatureName.tsx`
- Settings pages: `src/pages/admin/settings/FeatureSettings.tsx`
- Components: `src/components/admin/ComponentName.tsx`
- Neon widgets: `src/components/admin/neon/NeonFeatureName.tsx`
- Super-admin: `src/components/admin/super/SuperAdminFeature.tsx`

### D. CSS class conventions
- Admin-specific: `.admin-*` prefix
- Use Tailwind arbitrary values: `bg-[#0F1117]`, `text-[#F9FAFB]`
- Never create a new CSS file for admin — use Tailwind + inline styles only

### E. KPI card pattern
```typescript
// bg-[#1F2937] border border-[#374151] border-l-4 {accent} rounded-lg p-5
// Value: text-3xl font-semibold text-[#F9FAFB]
// Label: text-sm text-[#9CA3AF] mt-1
// Icon: h-5 w-5 {iconColor}
// Hover: hover:border-[#4B5563] hover:bg-[#243040] transition-all
```

### F. Data table pattern (full)
```typescript
const { data: items = [], isLoading, refetch } = useQuery({
  queryKey: ["entity-name"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("table_name")
      .select("*, relation:foreign_table(fields)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  staleTime: 60_000,
});

// Realtime
useEffect(() => {
  const ch = supabase.channel("table-updates")
    .on("postgres_changes", { event: "*", schema: "public", table: "table_name" }, () => refetch())
    .subscribe();
  return () => supabase.removeChannel(ch);
}, [refetch]);

// Local filter/sort/paginate
const filtered = items.filter(...).sort(...);
const paginated = filtered.slice(startIdx, endIdx);

// Bulk selection
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

// Mutation
const mutation = useMutation({
  mutationFn: async (payload) => {
    const { data, error } = await supabase.from("table_name").insert(payload).select().single();
    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["entity-name"] });
    toast({ title: "Success" });
  },
  onError: (err) => toast({ title: "Error", description: err.message, variant: "destructive" }),
});
```

### G. Module card pattern (NeonAdminModules)
```typescript
// Grid: grid-cols-2 sm:grid-cols-4 gap-3
// Card: bg-[#1F2937] border-[#374151] p-4 hover:border-[#4B5563] hover:bg-[#1a2332] transition-colors
// Badge: absolute top-2 right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5
// Icon: w-5 h-5 mx-auto mb-2 {color} group-hover:scale-110 transition-transform
// Label: text-xs font-medium text-[#D1D5DB]
```

---

## OBSERVATIONS

| Issue | Detail | Recommendation |
|---|---|---|
| Naming ambiguity | `Subscriptions.tsx` vs `SubscriptionsRoute.tsx` | Consolidate; delete the unused one |
| Mock mutations | ArticlesAdmin bulk delete/publish — no DB call, modifies local array only | Wire to real Supabase mutations |
| Missing error states | Analytics page has no error fallback if queries fail | Add `if (error) return <ErrorCard />` |
| No global permission matrix | All pages hidden behind single `isAdmin` check; no row-level action guards | Add RLS policies per table |
| TeamAdmin has no persistence | Reorder and toggle state not saved to DB | Wire to a `team_members` table |
| GraphicDesignAdmin vs PortfolioAdmin | Two separate portfolio pages at different routes | Clarify ownership or merge |
| No localStorage | Session state fully ephemeral — good, but means no draft persistence | Consider draft save to Supabase for long forms |
| Recharts animations | `.admin-no-animations` suppresses Framer Motion but not Recharts | Consider `isAnimationActive={false}` on chart components |

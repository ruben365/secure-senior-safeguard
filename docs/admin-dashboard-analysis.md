Perfect! Now I have comprehensive coverage of the admin dashboard codebase. Let me compile the complete structural analysis report:

---

# ADMIN DASHBOARD CODEBASE - COMPLETE STRUCTURAL ANALYSIS

## 1. STACK AND FILES

### Framework & Build Tool
- **Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 7.3.1 with `@vitejs/plugin-react` 5.1.4
- **Router**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0 (data fetching & caching)
- **Styling**: Tailwind CSS 3.4.17 with Class Variance Authority 0.7.1
- **UI Component Library**: Radix UI (all versions ^1.1-2.2) + shadcn/ui pattern
- **Animation**: Framer Motion 12.23.24
- **Editor**: TipTap 3.10.7 (rich text editing)
- **Database**: Supabase JS Client 2.76.1
- **Charts**: Recharts 2.15.4
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76 (validation)
- **Toast Notifications**: Sonner 1.7.4
- **Icons**: Lucide React 0.462.0

### Admin Files Inventory

**Pages (`src/pages/admin/`)** — 55 files
- **Dashboard**: AdminDashboardContent.tsx
- **Content Management**: ArticlesAdmin.tsx, ArticleEditor.tsx, ArticlePreview.tsx, PagesManagement.tsx, TestimonialsAdmin.tsx, ReviewsAdmin.tsx, KnowledgeBaseAdmin.tsx, GraphicDesignAdmin.tsx, PortfolioAdmin.tsx
- **Clients**: BusinessClients.tsx, BusinessClientDetail.tsx, IndividualClients.tsx, IndividualClientDetail.tsx
- **E-Commerce**: ProductsList.tsx, ProductEditor.tsx, OrdersList.tsx, OrderDetail.tsx, InventoryManagement.tsx
- **Requests**: BookingsList.tsx, ServiceInquiriesList.tsx, JobApplicationsList.tsx, DonationsList.tsx, Subscriptions.tsx, SupportTickets.tsx
- **Communications**: ClientMessages.tsx, CommunicationsInbox.tsx, NewsletterManagement.tsx, EmailCampaigns.tsx
- **Books & Library**: BooksAdmin.tsx, BookEditor.tsx, BookAccessAdmin.tsx, BookAIUpdates.tsx
- **Settings**: Settings.tsx, TeamAdmin.tsx, Analytics.tsx, SystemHealthDashboard.tsx
- **Moderation**: AdminModeration.tsx, AdminForms.tsx, TestingChecklist.tsx, Pending.tsx
- **Cyber Dashboard** (`cyber/`): ThreatMonitor.tsx, FamilyDevices.tsx, UserManagement.tsx, ActivityLog.tsx, DatabaseView.tsx, Notifications.tsx, SecuritySettings.tsx, CyberAnalytics.tsx, SecurityScanner.tsx
- **Settings Subpages** (`settings/`): SiteSettings.tsx, EmailSettings.tsx, PaymentSettings.tsx, BillingSettings.tsx

**Components (`src/components/admin/`)** — 41 files
- **Shell & Layout**: AdminShell.tsx, PageSkeleton.tsx
- **Sidebars**: AdminSidebar.tsx (legacy), CyberSidebar.tsx (new)
- **KPI & Metrics**: DashboardKPICards.tsx, RevenueChart.tsx
- **Tables**: BookingRequestsTable.tsx, PurchaseRequestsTable.tsx, InquiriesTable.tsx, JobApplicationsTable.tsx, TestimonialsTable.tsx
- **Modals**: AddTeamMemberModal.tsx, AddTestimonialModal.tsx, EditUserModal.tsx, PublishConfirmationModal.tsx, PublishSuccessModal.tsx
- **Editors & Forms**: RichTextEditor.tsx, ArticlePublishingSidebar.tsx, BookAccessManager.tsx
- **Tabs & Management**: NeonManagementTabs.tsx (bookings, purchases, inquiries, applications, testimonials tabs)
- **Dashboard Widgets** (`neon/`): DashboardKPICards.tsx, NeonAdminModules.tsx, NeonCalendarCard.tsx, NeonEventsCard.tsx, NeonManagementTabs.tsx, NeonPendingRequests.tsx, NeonQuickActions.tsx, NeonTasksCard.tsx, CyberSidebar.tsx
- **Super Admin** (`super/`): SuperAdminActivityFeed.tsx, SuperAdminDashboardHealth.tsx, SuperAdminProductManager.tsx, SuperAdminSalesOverview.tsx, SuperAdminUserManagement.tsx
- **Client Tabs** (`clients/`): ClientBillingTab.tsx, ClientMessagesTab.tsx, ClientNotesTab.tsx, ClientOverviewTab.tsx, ClientPortalAccessTab.tsx, ClientServicesTab.tsx
- **Utilities**: UpcomingTasks.tsx, VideoTestimonialUpload.tsx

**Hooks (`src/hooks/`)** — 32 custom hooks
- **Admin-specific**: useAdminAudit.ts, useAdminStatus.ts, useDashboardMetrics.ts
- **Data Fetching**: useArticles.ts, useTestimonials.ts, useCourses.ts, useBookPurchase.ts, useBookingRequests.ts, useGraphicDesignCMS.ts, usePortfolioCMS.ts, useSiteContent.ts
- **Communications**: useClientMessages.ts, useClientNotes.ts, useInternalMessages.ts, useLauraChat.ts, useAiChat.ts, useNotifications.ts
- **Business Logic**: usePipeline.ts, usePaymentFlow.ts, useScanAccess.ts, useScamSubmissions.ts, useGuestScanner.ts, useHostedCheckoutFallback.ts, useStripePayment.ts, useStripeElementLifecycle.ts, useStripeKey.ts, useBookingRequests.ts
- **UI/Navigation**: useSectionNavigation.ts, usePortalNavigation.ts, useSmoothAnchorScroll.ts, useResponsive.ts, use-toast.ts (shadcn custom hook)

**Utilities (`src/lib/`)** — 7 files
- animation-config.ts, animations.ts
- bookReaderSession.ts (admin book reader logic)
- email.ts (email templates)
- guestScannerUtils.ts (threat scanner logic)
- lauraConfig.ts (AI assistant configuration)
- utils.ts (cn() function for Tailwind merging)

---

## 2. DESIGN TOKENS

### Color Palette (Dark Theme - Cybersecurity Dashboard)

**Primary Brand Colors:**
- **Orange/Rust**: `#e07a55` → `#d05f3a` (gradient)
  - Used for: Accent buttons, highlights, badges
  - Hover: Slightly darker shade

**Dark Background Scale:**
- **Base Background**: `#0F1117` (darkest)
- **Surface Primary**: `#111827` (cards, modal backgrounds)
- **Surface Secondary**: `#1F2937` (panels, widgets)
- **Surface Tertiary**: `#374151` (borders, dividers)
- **Hover State**: `#2A2540` (interactive elements)
- **Focus State**: `#4B5563` (enhanced borders)

**Text Colors:**
- **Primary Text**: `#F9FAFB` (white-ish for main content)
- **Secondary Text**: `#9CA3AF` (muted gray for labels)
- **Tertiary Text**: `#6B7280` (dark gray for hints)

**Status & Semantic Colors:**
- **Success**: `#10b981` (green-500)
- **Warning**: `#f59e0b` (amber-500)
- **Error**: `#ef4444` (red-500)
- **Info**: `#3b82f6` (blue-500)

**Chart Colors (from RevenueChart):**
- Linear gradients for area charts
- Primary color + accent color for multi-series
- Border colors match text secondary

### Typography Scale

```
Heading 1 (Page Title): font-size 28px, font-weight 700, letter-spacing -0.5px
Heading 2 (Section): font-size 20px, font-weight 600
Heading 3 (Subsection): font-size 18px, font-weight 600
Body Large: font-size 16px, font-weight 400, line-height 1.5
Body Regular: font-size 14px, font-weight 400
Body Small: font-size 13px, font-weight 400
Label: font-size 12px, font-weight 500
Hint/Caption: font-size 11px, font-weight 400, color #6B7280
```

**Font Family**: System default (fallback to -apple-system, BlinkMacSystemFont, Segoe UI, Roboto)

### Spacing Scale

```
xs:  2px   (0.125rem)
sm:  4px   (0.25rem)
md:  8px   (0.5rem)
lg:  16px  (1rem)
xl:  24px  (1.5rem)
2xl: 32px  (2rem)
3xl: 48px  (3rem)
4xl: 64px  (4rem)
```

**Padding Convention:**
- Containers: `p-6` (24px) or `p-8` (32px)
- Cards: `p-5` or `p-6`
- Small components: `p-3` or `p-4`

### Border Radius

```
sm:   4px   (0.25rem)
md:   8px   (0.5rem)
lg:   12px  (0.75rem)
full: 9999px (circles, avatars)
```

**Border Widths:**
- Default: 1px
- Focus/Accent: 2px or 4px ring

### Shadows

**Card/Modal Shadow:**
```css
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

**Sidebar Shadow:**
```css
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
```

**Elevation Levels:**
- Level 0: No shadow (base)
- Level 1: sm (small interactive elements)
- Level 2: md (cards, panels)
- Level 3: lg (modals, dropdowns, fixed headers)

---

## 3. LAYOUT STRUCTURE

### Outer Shell (AdminShell.tsx)

**Structure:**
```
<div class="flex min-h-screen bg-[#0F1117]">
  <!-- Persistent Sidebar (left, z-50) -->
  <CyberSidebar isOpen={sidebarOpen} isMobileOpen={mobileSidebarOpen} />
  
  <!-- Fixed Header (z-40, h-16) -->
  <header class="fixed top-0 right-0 left-0">
    <!-- Left: Menu Toggle, Navigation, Search -->
    <!-- Right: Home, Notifications, Settings, Profile Dropdown -->
  </header>
  
  <!-- Main Content Area -->
  <main class="flex-1 pt-16">
    <Outlet /> <!-- Route pages render here -->
  </main>
</div>
```

### Sidebar Layout

**CyberSidebar Dimensions:**
- Desktop: `w-[260px]` when open, `w-[70px]` when collapsed (smooth transition)
- Mobile: `w-[260px]` (full-width overlay when open)
- Height: Full viewport (`h-full`)
- Z-index: 50 (desktop), 50 (mobile overlay)

**Sidebar Structure:**
```
<nav class="flex-1 px-2 py-3 space-y-0.5">
  <!-- Logo Section (h-16) -->
  <div class="h-16 flex items-center px-4">
    <Link>Logo + "InVision" text (when open)</Link>
  </div>
  
  <!-- Menu Items (flex-1, overflow-y-auto) -->
  {menuItems.map(item => (
    item.children ? <Collapsible> : <Link>
  ))}
</nav>
```

**Menu Structure:**
```typescript
const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, children: [
    { title: "Command Center", href: "/admin", icon: LayoutDashboard },
    { title: "Threat Monitor", href: "/admin/threats", icon: Shield },
    // ... 8 more dashboard items
  ]},
  // "Content", "Clients", "E-Commerce", "Requests", "Communications", 
  // "Settings", "Digital Library", "Forms", "Moderation", "Testing"
]
```

**Active State Styling:**
```
// Parent active:
bg-[#1F2937] text-[#F9FAFB]

// Child active:
text-orange-400 bg-orange-500/10
```

### Header Layout

**Top Bar Structure:**
```
<header class="fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800">
  <div class="flex items-center justify-between h-full px-4 lg:px-6">
    <!-- Left Section -->
    <div class="flex items-center gap-4 flex-1">
      <!-- Menu Toggle Button -->
      <!-- Back/Forward Navigation (2 buttons) -->
      <!-- Search Bar (hidden on mobile) -->
    </div>
    
    <!-- Right Section -->
    <div class="flex items-center gap-3">
      <!-- Home Button -->
      <!-- Notifications Bell -->
      <!-- Settings Gear -->
      <!-- Profile Dropdown (Avatar + Name + Chevron) -->
    </div>
  </div>
</header>
```

### Main Content Grid Pattern

**Standard Dashboard Layout (AdminDashboardContent):**
```
<div class="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
  <!-- Page Header -->
  
  <!-- Ops Health Strip (flex flex-wrap gap-3) -->
  
  <!-- KPI Cards (grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4) -->
  
  <!-- Admin Modules (full width) -->
  
  <!-- Two-Column Layout (grid grid-cols-1 lg:grid-cols-12 gap-6) -->
  <div class="lg:col-span-8">
    <!-- Wide Content: Management Tabs + Pending Requests -->
  </div>
  <div class="lg:col-span-4">
    <!-- Sidebar: Quick Actions + Calendar -->
  </div>
  
  <!-- Bottom Row (grid grid-cols-1 lg:grid-cols-2 gap-6) -->
  <!-- Tasks & Events -->
</div>
```

### Responsive Breakpoints

```
sm:  640px  (hide Search bar, collapse icons)
md:  768px  (sidebar collapse toggle, show desktop layout)
lg:  1024px (2-column layouts, full spacing)
xl:  1280px (max-w-[1400px] containers)
2xl: 1536px (reserved for future)
```

**Sidebar Behavior:**
- Mobile (<md): Hidden by default, open in overlay when menu clicked
- Desktop (≥md): Always visible, collapsible via toggle

**Header Behavior:**
- Mobile: Full-width, compact spacing
- Desktop (≥md): Adjusts left margin based on sidebar state

### Z-Index Layers

```
z-50: Sidebar (mobile overlay), Mobile sidebar close button
z-40: Fixed header, Dropdown menus (stacked above content)
z-30: Desktop sidebar (persistent, lower than overlay)
z-20: Backdrop overlay (mobile sidebar)
z-10: Content layers, tooltips
z-0:  Base content
```

---

## 4. SIDEBAR NAV

### Complete Menu Structure

**1. Dashboard (collapsible group)**
```
Dashboard → /admin
  ├─ Command Center → /admin
  ├─ Threat Monitor → /admin/threats
  ├─ Family Devices → /admin/devices
  ├─ Analytics → /admin/analytics
  ├─ User Management → /admin/users
  ├─ Activity Log → /admin/activity
  ├─ Database → /admin/database
  ├─ Notifications → /admin/notifications
  ├─ Security → /admin/security
  └─ Website Scanner → /admin/security-scanner
```

**2. Content (collapsible group)**
```
Content → (no direct href)
  ├─ Pages → /admin/content/pages
  ├─ Articles → /admin/content/articles
  ├─ Testimonials → /admin/content/testimonials
  ├─ Team → /admin/content/team
  ├─ Portfolio → /admin/content/portfolio
  ├─ Knowledge Base → /admin/content/knowledge-base
  └─ Reviews → /admin/content/reviews
```

**3. Clients (collapsible group)**
```
Clients → (no direct href)
  ├─ Business Clients → /admin/clients/businesses
  ├─ Individual Clients → /admin/clients/individuals
  └─ Messages → /admin/clients/messages
```

**4. E-Commerce (collapsible group)**
```
E-Commerce → (no direct href)
  ├─ Products → /admin/ecommerce/products
  ├─ Orders → /admin/ecommerce/orders
  ├─ Inventory → /admin/ecommerce/inventory
  ├─ Subscriptions → /admin/subscriptions
  ├─ Book Access → /admin/ecommerce/book-access
  └─ Donations → /admin/donations
```

**5. Requests (collapsible group)**
```
Requests → (no direct href)
  ├─ Service Inquiries → /admin/service-inquiries
  ├─ Bookings → /admin/bookings
  ├─ Job Applications → /admin/job-applications
  └─ Support Tickets → /admin/support/tickets
```

**6. Communications (collapsible group)**
```
Communications → (no direct href)
  ├─ Email Campaigns → /admin/email-campaigns
  ├─ Inbox → /admin/communications/inbox
  └─ Newsletter → /admin/communications/newsletter
```

**7. Settings (collapsible group)**
```
Settings → (no direct href)
  ├─ Site Settings → /admin/settings/site
  ├─ User Roles → /admin/settings/users
  └─ Billing → /admin/settings/billing
```

**8. Digital Library (collapsible group)**
```
Digital Library → (no direct href)
  ├─ All Books → /admin/books
  ├─ Add Book → /admin/books/new
  └─ Book Access IDs → /admin/ecommerce/book-access
```

**9. Forms**
```
Forms → (no direct href)
  └─ All Forms → /admin/forms
```

**10. Moderation**
```
Moderation → (no direct href)
  └─ Comments → /admin/moderation
```

**11. Testing (collapsible group)**
```
Testing → (no direct href)
  ├─ System Health → /admin/testing
  └─ Launch Checklist → /admin/testing/checklist
```

### Navigation Item Styling

**Parent (Collapsible Trigger):**
```jsx
className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
  ${active ? "bg-[#1F2937] text-[#F9FAFB]" : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"}`}
```

**Child Items:**
```jsx
className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
  ${(location.pathname === child.href || location.pathname.startsWith(child.href + "/"))
    ? "text-orange-400 bg-orange-500/10"
    : "text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"}`}
```

### Collapse Behavior

**State Management:**
```typescript
const [expandedMenus, setExpandedMenus] = useState<string[]>(["Dashboard"]);

const toggleMenu = (title: string) => {
  setExpandedMenus((prev) => 
    prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
  );
};
```

**Chevron Animation:**
```jsx
<ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
```

### Badge/Count Indicators

**Current Implementation:**
- No count badges in CyberSidebar
- Pending requests count shown in DashboardKPICards and NeonPendingRequests

**Pattern for Future:**
```jsx
{item.badge && (
  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 ml-auto text-xs">
    {item.badge}
  </Badge>
)}
```

---

## 5. CONTENT BLOCK PATTERNS

### KPI Card Pattern

**Component**: `DashboardKPICards.tsx`

**JSX Structure:**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {kpis.map((kpi) => {
    const Icon = kpi.icon;
    const value = stats[kpi.key];
    return (
      <Link key={kpi.key} to={kpi.href}>
        <div className={`bg-[#1F2937] border border-[#374151] border-l-4 ${kpi.accent} 
          rounded-lg p-5 hover:border-[#4B5563] hover:bg-[#243040] transition-all cursor-pointer`}>
          
          <!-- Icon + Value Section -->
          <div className="flex items-center justify-between mb-3">
            <Icon className={`h-5 w-5 ${kpi.iconColor}`} />
          </div>
          
          <!-- Large Number -->
          <p className="text-3xl font-semibold text-[#F9FAFB] tracking-tight">
            {value ?? 0}
          </p>
          
          <!-- Label -->
          <p className="text-sm text-[#9CA3AF] mt-1">{kpi.label}</p>
        </div>
      </Link>
    );
  })}
</div>
```

**Data Structure:**
```typescript
interface KPIStats {
  pendingBookings: number;
  unreadMessages: number;
  totalStaff: number;
  newsletterSubscribers: number;
}

const kpis = [
  {
    key: "pendingBookings" as const,
    label: "Pending Bookings",
    icon: Calendar,
    accent: "border-l-orange-500",
    iconColor: "text-orange-400",
    href: "/admin/bookings",
  },
  // ... 3 more
];
```

**Hover States:**
- Border changes from `#374151` → `#4B5563`
- Background becomes `#243040`
- Subtle lift effect

### Data Table Pattern

**Component Examples**: `BookingRequestsTable.tsx`, `ProductsList.tsx`, `OrdersList.tsx`

**JSX Structure:**
```jsx
<div className="space-y-4">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-bold">{title} ({count})</h3>
    <Button onClick={loadRequests} variant="outline" size="sm">Refresh</Button>
  </div>

  {/* Empty State */}
  {items.length === 0 ? (
    <Card className="p-8 text-center text-muted-foreground">
      No items yet
    </Card>
  ) : (
    /* Card-based List (responsive stacking) */
    items.map((item) => (
      <Card key={item.id} className="p-6 space-y-4">
        {/* Item Header with Badge */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-lg">{item.title}</h4>
              {item.badge && <Badge>{item.badge}</Badge>}
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          </div>
          <div className="text-sm text-muted-foreground">{item.date}</div>
        </div>

        {/* Two-column info grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold mb-1">Section 1</p>
            {/* content */}
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">Section 2</p>
            {/* content */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button size="sm" variant="outline">Mark Contacted</Button>
          <Button size="sm" variant="default">Confirm</Button>
          <Button size="sm" variant="secondary">Complete</Button>
          <Button size="sm" variant="destructive">Cancel</Button>
        </div>
      </Card>
    ))
  )}
</div>
```

**Status Color Function:**
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-500";
    case "contacted": return "bg-primary/50";
    case "confirmed": return "bg-green-500";
    case "completed": return "bg-gray-500";
    case "cancelled": return "bg-red-500";
    default: return "bg-gray-400";
  }
};
```

### Module Card Pattern

**Component**: `NeonAdminModules.tsx`

**Grid Layout:**
```jsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
  {modules.map((module) => {
    const Icon = module.icon;
    return (
      <Card key={module.key} className="p-4 hover:bg-[#243040] transition-colors cursor-pointer">
        <div className="space-y-3">
          {/* Icon */}
          <div className="p-3 bg-[#374151]/50 rounded-lg w-fit">
            <Icon className={`h-6 w-6 ${module.color}`} />
          </div>
          
          {/* Count - Large & Bold */}
          <div>
            <p className="text-2xl font-bold text-[#F9FAFB]">
              {module.value}
            </p>
            <p className="text-xs text-[#6B7280]">{module.label}</p>
          </div>
          
          {/* Link */}
          <Link className="text-xs text-[#9CA3AF] hover:text-[#F9FAFB]">
            Manage →
          </Link>
        </div>
      </Card>
    );
  })}
</div>
```

**Colors by Module:**
- Bookings: Orange (`text-orange-400`)
- Inquiries: Green (`text-emerald-400`)
- Applications: Purple (`text-purple-400`)
- Messages: Yellow (`text-amber-400`)
- Low Stock: Red (`text-red-400`)

### Section Header Pattern

**Usage**: At top of admin pages

```jsx
<div className="mb-6">
  <h1 className="text-2xl font-bold text-[#F9FAFB]">Page Title</h1>
  <p className="text-[#9CA3AF]">Brief description of section</p>
</div>
```

**With Actions:**
```jsx
<div className="flex items-center justify-between mb-6">
  <div>
    <h1 className="text-2xl font-bold text-[#F9FAFB]">Title</h1>
    <p className="text-[#9CA3AF]">Description</p>
  </div>
  <Button onClick={() => navigate("/admin/path/new")}>
    <Plus className="w-4 h-4 mr-2" />
    Add New
  </Button>
</div>
```

### Empty State Pattern

**Usage**: When no data available

```jsx
<div className="p-8 text-center text-muted-foreground">
  <span className="text-4xl mb-4 block">📊</span>
  <h3 className="text-lg font-semibold text-foreground mb-2">
    No Data Available
  </h3>
  <p className="text-sm">
    Description of what to do or why data is missing
  </p>
</div>
```

**With Search/Filter Empty State:**
```jsx
<Card className="p-12 text-center">
  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
  <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
  <p className="text-muted-foreground">
    Try adjusting your filters or search terms
  </p>
</Card>
```

---

## 6. CHARTS AND VISUALIZATIONS

### Chart Library

**Primary**: Recharts 2.15.4
- Used for area charts, line charts, bar charts
- Responsive container support
- Custom tooltips and legends

### Charts Used by Page

**RevenueChart.tsx** (appears on Analytics/Dashboard):
- Type: AreaChart (with gradient fill)
- Data: Monthly revenue aggregation
- Features:
  - Time frame selector (6M, 12M, All)
  - Custom tooltip with month + $ amount
  - Gradient fill from primary color
  - Summary stats below (Total, Average, Highest Month)
  - Export to CSV button

**Analytics Page** (Analytics.tsx):
- LineChart: Page views over time
- BarChart: Conversion rates
- Legend: Multiple series
- Date range filter (7d default)

### Recharts Config Pattern

**Area Chart with Gradient:**
```jsx
<ResponsiveContainer width="100%" height="100%">
  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <defs>
      {/* Gradient definitions */}
      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
      </linearGradient>
    </defs>
    
    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
    <Tooltip content={<CustomTooltip />} />
    
    <Area
      type="monotone"
      dataKey="revenue"
      stroke="url(#lineGradient)"
      fill="url(#colorRevenue)"
      dot={{ fill: "hsl(var(--primary))", r: 4 }}
      activeDot={{ r: 6 }}
    />
  </AreaChart>
</ResponsiveContainer>
```

### Custom Tooltip Pattern

```jsx
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground">
          {payload[0].payload.month}
        </p>
        <p className="text-lg font-bold text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};
```

### Color Palette for Charts

**Primary Series**: HSL variable `--primary` (orange accent)
**Secondary Series**: HSL variable `--accent`
**Grid/Axes**: `--border` and `--muted-foreground` colors
**Tooltip Background**: `--popover` with `--border`

### Responsive Behavior

```jsx
<div className="h-64 sm:h-80 admin-chart">
  <ResponsiveContainer width="100%" height="100%">
    {/* chart */}
  </ResponsiveContainer>
</div>
```

---

## 7. SIDE PANELS AND MODALS

### Modal/Dialog Components Used

**From Radix UI + shadcn:**
- `Dialog` (DialogContent, DialogHeader, DialogTitle, DialogDescription)
- `Sheet` (for side panels - not used in current admin, reserved)
- `AlertDialog` (for confirmations)
- `DropdownMenu` (profile, actions)

### AddTeamMemberModal Pattern

**File**: `src/components/admin/AddTeamMemberModal.tsx`

**JSX Structure:**
```jsx
<Dialog open={isOpen} onOpenChange={handleClose}>
  <DialogContent className="sm:max-w-[640px] max-h-[86vh] overflow-hidden flex flex-col p-5 gap-0">
    {/* Header */}
    <DialogHeader className="pb-3">
      <DialogTitle>{isEditMode ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
      <DialogDescription>Instructions or info</DialogDescription>
    </DialogHeader>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Photo Upload with Drag-Drop */}
          {/* Full Name Input */}
          {/* Job Title Input */}
          {/* Bio Textarea */}
          {/* LinkedIn URL */}
          {/* Email + Display Toggle */}
          {/* Phone + Display Toggle */}
          {/* Display Order */}
        </div>

        {/* Right: Live Preview (sticky) */}
        <div className="sticky top-0">
          {/* Shows how card will look on About page */}
        </div>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="flex justify-end gap-3 px-6 py-4 border-t">
      <Button variant="outline" onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSubmit}>{isEditMode ? "Save Changes" : "Add Team Member"}</Button>
    </div>
  </DialogContent>
</Dialog>
```

**Trigger Pattern:**
```jsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>
  <Plus className="w-4 h-4 mr-2" />
  Add Member
</Button>

<AddTeamMemberModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onAdd={handleAddMember}
  onUpdate={handleUpdateMember}
  nextOrderNumber={teamMembers.length + 1}
  editMember={editingMember}
/>
```

### AlertDialog Pattern

**Confirmation for Destructive Actions:**
```jsx
const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

<AlertDialog open={deleteTarget !== null}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. {deleteTarget?.name} will be permanently deleted.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => handleDelete(deleteTarget?.id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Width & Animation Classes

**Modal Size:**
```
sm (small):       max-w-[400px]
md (medium):      sm:max-w-[500px]
lg (large):       sm:max-w-[640px]  ← Default for forms
xl (extra large): sm:max-w-[800px]
```

**Height Constraints:**
```
Full screen responsive: max-h-[86vh] (leaves space for OS/browser)
Overflow handling:      overflow-hidden flex flex-col (with scrollable sections)
```

**Animation:**
- Default: Fade + slight zoom in
- Implemented via Radix dialog (no explicit Framer Motion)
- Zero-Distraction protocol: No excessive animations

**Z-index:**
- Dialog backdrop: z-40+ (automatically managed by Radix)
- Highest layer above everything

---

## 8. EVENT HANDLERS AND ACTIONS

### CRUD Pattern - Create

**Example: BookEditor.tsx**

```typescript
const saveMutation = useMutation({
  mutationFn: async (data: BookForm) => {
    if (isNew) {
      // CREATE
      const { data: newBook, error } = await supabase
        .from("books")
        .insert([{
          title: data.title,
          slug: data.slug,
          description: data.description,
          status: data.status,
          // ...
        }])
        .select()
        .single();
      
      if (error) throw error;
      return newBook;
    } else {
      // UPDATE
      const { error } = await supabase
        .from("books")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id);
      
      if (error) throw error;
      return { id };
    }
  },
  onSuccess: (result) => {
    queryClient.invalidateQueries({ queryKey: ["admin-books"] });
    toast.success(isNew ? "Book created" : "Book updated");
    navigate("/admin/books");
  },
  onError: (error) => {
    toast.error(error instanceof Error ? error.message : "Failed to save");
  },
});

const handleSave = async () => {
  if (!validateForm()) return;
  await saveMutation.mutateAsync(form);
};
```

### CRUD Pattern - Read with Realtime

**Example: BookingRequestsTable.tsx**

```typescript
useEffect(() => {
  loadRequests();

  // Subscribe to realtime updates
  const channel = supabase
    .channel("booking_requests_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "booking_requests" },
      () => loadRequests()  // Refresh on any change
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);

const loadRequests = async () => {
  const { data, error } = await supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    toast({ title: "Error", variant: "destructive" });
  } else {
    setRequests(data || []);
  }
};
```

### CRUD Pattern - Update with Optimistic

**Example: updateStatus function**

```typescript
const updateStatus = async (id: string, status: string) => {
  setUpdatingId(id);
  
  // Optimistic update (local state)
  setRequests((prev) =>
    prev.map((r) => (r.id === id ? { ...r, status } : r))
  );

  // Server update
  const { error } = await supabase
    .from("booking_requests")
    .update({ status })
    .eq("id", id);

  if (error) {
    // Revert on failure
    toast({ title: "Update Failed", variant: "destructive" });
    loadRequests();
  } else {
    toast({ title: "Status Updated", description: `Marked as ${status}` });
  }
  
  setUpdatingId(null);
};
```

### CRUD Pattern - Delete with Confirmation

**Example: Archive/Delete pattern**

```typescript
const archiveMutation = useMutation({
  mutationFn: async (bookId: string) => {
    const { error } = await supabase
      .from("books")
      .update({ status: "archived", updated_at: new Date().toISOString() })
      .eq("id", bookId);
    if (error) throw error;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["admin-books"] });
    toast.success("Book archived");
    setArchiveTarget(null);
  },
});

const handleArchive = () => {
  if (!archiveTarget) return;
  archiveMutation.mutate(archiveTarget.id);
};

// In JSX - trigger dialog
<AlertDialog open={archiveTarget !== null}>
  <AlertDialogContent>
    <AlertDialogTitle>Archive Book?</AlertDialogTitle>
    <AlertDialogDescription>
      "{archiveTarget?.title}" will be archived and hidden from users.
    </AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setArchiveTarget(null)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleArchive} className="bg-red-600">
        Archive
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Toast/Notification Pattern

**Using Sonner Library:**

```typescript
import { toast } from "@/components/ui/sonner";

// Success
toast.success("Item created successfully");

// Error
toast.error("Failed to delete item");

// Info
toast.info("Changes will be reflected shortly");

// With custom UI
toast({
  title: "Success",
  description: "Your changes have been saved",
  duration: 3000,
});

// Destructive variant
toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive",
});
```

### Form Submission Pattern

**With Validation (AddTeamMemberModal):**

```typescript
const [formData, setFormData] = useState({ name: "", title: "", bio: "", ... });
const [errors, setErrors] = useState<Record<string, string>>({});
const [isSaving, setIsSaving] = useState(false);

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  // Name validation
  const nameParts = formData.name.trim().split(/\s+/);
  if (nameParts.length < 2) {
    newErrors.name = "Please enter first and last name";
  }
  
  // Title validation
  if (!formData.title.trim()) {
    newErrors.title = "Job title is required";
  }
  
  // Email validation
  if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    newErrors.email = "Please enter a valid email address";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    toast({ title: "Validation Error", variant: "destructive" });
    return;
  }

  setIsSaving(true);
  
  try {
    const memberData: TeamMember = {
      id: editMember?.id || Math.random().toString(36).substring(7),
      name: formData.name,
      role: formData.title,
      // ...
    };

    if (isEditMode && onUpdate) {
      onUpdate(memberData);
    } else {
      onAdd(memberData);
    }

    toast({ title: isEditMode ? "Updated" : "Added" });
    handleClose();
  } catch (error) {
    toast({ title: "Error", variant: "destructive" });
  } finally {
    setIsSaving(false);
  }
};
```

### Batch Operations Pattern

**Example: Select multiple + bulk action**

```typescript
const [selectedItems, setSelectedItems] = useState<string[]>([]);

const toggleSelection = (id: string) => {
  setSelectedItems((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );
};

const toggleSelectAll = () => {
  setSelectedItems((prev) =>
    prev.length === filteredItems.length ? [] : filteredItems.map((i) => i.id)
  );
};

const handleBulkDelete = async () => {
  const { error } = await supabase
    .from("items")
    .delete()
    .in("id", selectedItems);
  
  if (error) {
    toast({ title: "Error", variant: "destructive" });
  } else {
    toast.success(`Deleted ${selectedItems.length} items`);
    setSelectedItems([]);
    refetch();
  }
};

// In JSX
<Checkbox
  checked={selectedItems.length === filteredItems.length}
  onCheckedChange={toggleSelectAll}
/>

{selectedItems.length > 0 && (
  <div className="bg-blue-50 p-4 rounded">
    <p>{selectedItems.length} selected</p>
    <Button variant="destructive" onClick={handleBulkDelete}>
      Delete Selected
    </Button>
  </div>
)}
```

---

## 9. STATE MANAGEMENT

### React Query Setup

**QueryClient Config (App.tsx):**
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60_000,      // 5 min — avoid unnecessary refetches
      gcTime: 15 * 60_000,        // 15 min — keep cache longer
      retry: 1,                    // Retry once on failure
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
```

### Query Key Patterns

```typescript
// Simple resource
queryKey: ["books"]

// With ID
queryKey: ["book", id]
queryKey: ["admin-book", id]

// With filters
queryKey: ["articles", statusFilter, dateRange]

// Dashboard metrics
queryKey: ["dashboard-metrics"]
queryKey: ["ops-health"]

// Realtime
queryKey: ["page-views", startDate]
queryKey: ["analytics-events", startDate]

// Statistics
queryKey: ["admin-books-stats"]
queryKey: ["threat-events", limit]
```

### useQuery Pattern

```typescript
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["books"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Book[];
  },
  staleTime: 5 * 60_000,
  gcTime: 15 * 60_000,
});

// Usage
{isLoading ? <Skeleton /> : data?.map(item => ...)}
```

### useMutation Pattern

```typescript
const queryClient = useQueryClient();

const createMutation = useMutation({
  mutationFn: async (payload: CreatePayload) => {
    const { data, error } = await supabase
      .from("books")
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    // Invalidate related queries
    queryClient.invalidateQueries({ queryKey: ["books"] });
    queryClient.invalidateQueries({ queryKey: ["admin-books-stats"] });
    toast.success("Created successfully");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

// Usage
const handleCreate = async () => {
  await createMutation.mutateAsync({ ...formData });
};

// Button state
<Button disabled={createMutation.isPending}>
  {createMutation.isPending ? "Creating..." : "Create"}
</Button>
```

### Local useState Patterns

**Simple Toggle:**
```typescript
const [isOpen, setIsOpen] = useState(false);
```

**Form State with Validation:**
```typescript
const [formData, setFormData] = useState<BookForm>({
  title: "",
  slug: "",
  description: "",
  cover_image: "",
  total_pages: "",
  price: "",
  bulk_price: "",
  status: "draft",
});

const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (field: keyof BookForm, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

**Complex State with Multiple Concerns:**
```typescript
const [modules, setModules] = useState<Module[]>([]);
const [filteredModules, setFilteredModules] = useState<Module[]>([]);
const [selectedModule, setSelectedModule] = useState<Module | null>(null);
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(true);
```

### Context Providers Used

**AuthContext** (`src/contexts/AuthContext`):
```typescript
const { 
  user,
  isAdmin,
  roleConfig,
  adminName,
  adminEmail,
  signOut,
  loading,
  initialized,
} = useAuth();
```

**Integrated in App.tsx:**
```jsx
<AuthProvider>
  <QueryClientProvider client={queryClient}>
    <SubscriptionProvider>
      <CartProvider>
        {/* ... rest of app */}
      </CartProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
</AuthProvider>
```

### Supabase Realtime Subscriptions

**Pattern:**
```typescript
useEffect(() => {
  const channel = supabase
    .channel("table_changes")
    .on(
      "postgres_changes",
      {
        event: "*",  // Listen to INSERT, UPDATE, DELETE
        schema: "public",
        table: "booking_requests",
      },
      (payload) => {
        // Refresh data when changes detected
        refetch();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [refetch]);
```

**Multiple Table Subscriptions:**
```typescript
useEffect(() => {
  const channel = supabase
    .channel("orders_updates")
    .on("postgres_changes", { event: "*", schema: "public", table: "partner_orders" }, () => refetch())
    .on("postgres_changes", { event: "*", schema: "public", table: "order_items" }, () => refetch())
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [refetch]);
```

---

## 10. ROUTING

### Admin Routes (App.tsx)

**Route Structure:**
```jsx
<Route path="/admin/*" element={<AdminShell />}>
  <Route index element={<AdminDashboardContent />} />
  
  {/* Cyber Dashboard Routes */}
  <Route path="threats" element={<ThreatMonitor />} />
  <Route path="devices" element={<FamilyDevices />} />
  <Route path="users" element={<CyberUserManagement />} />
  <Route path="activity" element={<ActivityLog />} />
  <Route path="database" element={<DatabaseView />} />
  <Route path="notifications" element={<CyberNotifications />} />
  <Route path="security" element={<SecuritySettings />} />
  <Route path="security-scanner" element={<SecurityScanner />} />
  <Route path="reports" element={<CyberAnalytics />} />
  <Route path="insights" element={<CyberAnalytics />} />
  
  {/* Content Management */}
  <Route path="content/testimonials" element={<TestimonialsAdmin />} />
  <Route path="content/articles" element={<ArticlesAdmin />} />
  <Route path="content/articles/new" element={<ArticleEditor />} />
  <Route path="content/articles/:id" element={<ArticleEditor />} />
  <Route path="articles/preview" element={<ArticlePreview />} />
  <Route path="content/team" element={<TeamAdmin />} />
  <Route path="content/pages" element={<PagesManagement />} />
  <Route path="content/portfolio" element={<GraphicDesignAdmin />} />
  <Route path="content/portfolio-cms" element={<PortfolioAdmin />} />
  <Route path="content/knowledge-base" element={<KnowledgeBaseAdmin />} />
  <Route path="content/reviews" element={<ReviewsAdmin />} />
  
  {/* Clients */}
  <Route path="clients/messages" element={<ClientMessages />} />
  <Route path="clients/businesses" element={<BusinessClients />} />
  <Route path="clients/businesses/:id" element={<BusinessClientDetail />} />
  <Route path="clients/individuals" element={<IndividualClients />} />
  <Route path="clients/individuals/:id" element={<IndividualClientDetail />} />
  
  {/* E-Commerce */}
  <Route path="ecommerce/products" element={<ProductsList />} />
  <Route path="ecommerce/products/new" element={<ProductEditor />} />
  <Route path="ecommerce/products/:id" element={<ProductEditor />} />
  <Route path="ecommerce/orders" element={<OrdersList />} />
  <Route path="ecommerce/orders/:id" element={<OrderDetail />} />
  <Route path="ecommerce/inventory" element={<InventoryManagement />} />
  <Route path="ecommerce/book-access" element={<BookAccessAdmin />} />
  
  {/* Requests & Support */}
  <Route path="bookings" element={<BookingsList />} />
  <Route path="service-inquiries" element={<ServiceInquiriesList />} />
  <Route path="job-applications" element={<JobApplicationsList />} />
  <Route path="donations" element={<DonationsList />} />
  <Route path="subscriptions" element={<Subscriptions />} />
  <Route path="support/tickets" element={<SupportTicketsAdmin />} />
  
  {/* Communications */}
  <Route path="clients/messages" element={<ClientMessages />} />
  <Route path="communications/inbox" element={<CommunicationsInbox />} />
  <Route path="communications/newsletter" element={<NewsletterManagement />} />
  <Route path="email-campaigns" element={<EmailCampaigns />} />
  
  {/* Books */}
  <Route path="books" element={<BooksAdmin />} />
  <Route path="books/new" element={<BookEditor />} />
  <Route path="books/:id" element={<BookEditor />} />
  <Route path="books/:id/chapters" element={<BookEditor />} />
  <Route path="books/:id/ai-updates" element={<BookAIUpdates />} />
  
  {/* Settings & System */}
  <Route path="settings/*" element={<Settings />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="testing" element={<SystemHealthDashboard />} />
  <Route path="testing/checklist" element={<TestingChecklist />} />
  <Route path="pending" element={<Pending />} />
  <Route path="forms" element={<AdminForms />} />
  <Route path="moderation" element={<AdminModeration />} />
</Route>
```

### Protected Route Wrapper

**Pattern (ProtectedRoute.tsx):**
```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageSkeleton />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// Usage
<Route path="/admin/*" element={<ProtectedRoute><AdminShell /></ProtectedRoute>}>
```

### Role-Based Access Control

**In AdminShell.tsx:**
```typescript
// Auth check
if (!user) {
  return <Navigate to="/auth" replace />;
}

// Role check
if (!roleConfig) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardContent className="pt-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-gray-400">
            Your account does not have permission to access the admin portal.
          </p>
          <Button onClick={() => navigate("/")}>Return to Homepage</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Navigation Patterns

**Using useNavigate():**
```typescript
const navigate = useNavigate();

// Simple navigation
<Button onClick={() => navigate("/admin/books")}>View Books</Button>

// With replace (replace history entry)
navigate("/admin/auth", { replace: true });

// Back button
const handleBack = () => window.history.back();

// Forward button
const handleForward = () => window.history.forward();
```

**Using Link Component:**
```jsx
<Link to="/admin/settings/site">
  <div className="p-4">Site Settings</div>
</Link>
```

---

## 11. DEPENDENCIES

### npm Packages Used by Admin Components

**Core React & Routing:**
- react 18.3.1
- react-dom 18.3.1
- react-router-dom 6.30.1

**Data Fetching & State:**
- @tanstack/react-query 5.83.0
- @supabase/supabase-js 2.76.1

**UI Components (Radix UI + shadcn):**
- @radix-ui/react-accordion 1.2.11
- @radix-ui/react-alert-dialog 1.1.14
- @radix-ui/react-avatar 1.1.10
- @radix-ui/react-badge (implicit via shadcn)
- @radix-ui/react-checkbox 1.3.2
- @radix-ui/react-collapsible 1.1.11
- @radix-ui/react-dialog 1.1.14
- @radix-ui/react-dropdown-menu 2.1.15
- @radix-ui/react-label 2.1.7
- @radix-ui/react-popover 1.1.14
- @radix-ui/react-progress 1.1.7
- @radix-ui/react-scroll-area 1.2.9
- @radix-ui/react-select 2.2.5
- @radix-ui/react-separator 1.1.7
- @radix-ui/react-slider 1.3.5
- @radix-ui/react-switch 1.2.5
- @radix-ui/react-tabs 1.1.12
- @radix-ui/react-toast 1.2.14
- @radix-ui/react-toggle 1.1.9

**Forms & Validation:**
- react-hook-form 7.61.1
- @hookform/resolvers 3.10.0
- zod 3.25.76

**Rich Text Editor:**
- @tiptap/react 3.10.7
- @tiptap/starter-kit 3.10.7
- @tiptap/extension-link 3.10.7
- @tiptap/extension-image 3.10.7
- @tiptap/extension-table 3.10.7
- @tiptap/extension-underline 3.10.7

**Charts & Visualization:**
- recharts 2.15.4

**Styling:**
- tailwindcss 3.4.17
- @tailwindcss/typography 0.5.16
- class-variance-authority 0.7.1
- clsx 2.1.1
- tailwind-merge 2.6.0
- tailwindcss-animate 1.0.7

**Animation:**
- framer-motion 12.23.24

**Icons:**
- lucide-react 0.462.0

**Notifications:**
- sonner 1.7.4

**Utilities:**
- date-fns 3.6.0

### Supabase Tables Queried by Admin

**User Management:**
- `profiles` (user profile data)
- `user_roles` (role assignments)
- `auth.users` (Supabase auth)

**Content:**
- `articles` (with author relationship to profiles)
- `testimonials`
- `books` (with book_content for chapters)
- `book_content` (chapters within books)

**E-Commerce:**
- `products` (products & inventory)
- `partner_orders` (orders)
- `order_items` (line items)
- `purchases` (book purchases)
- `access_ids` (book access tokens)

**Clients & Services:**
- `service_inquiries` (service requests)
- `booking_requests` (booking requests)
- `job_applications` (job applications)
- `clients` (client database)

**Communications:**
- `internal_messages` (unread count)
- `newsletter_subscribers`

**Admin:**
- `admin_tasks` (admin task list)
- `admin_events` (admin calendar)

**Analytics:**
- `analytics_events`
- `page_views`
- `user_sessions`
- `conversion_events`

**Cyber:**
- `threat_events` (threat monitoring)
- `threat_logs` (activity history)

**System:**
- `enrollments` (training enrollments)
- `courses` (courses database)

### External API Calls

**Stripe** (`useStripePayment.ts`, `useStripeElementLifecycle.ts`):
- @stripe/react-stripe-js 5.3.0
- @stripe/stripe-js 8.4.0

---

## 12. SYNC POINTS FOR NEW FEATURES

### Adding a New Admin Page

**Step 1: Create the Page Component**

Path: `src/pages/admin/MyNewPage.tsx`

```typescript
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageSkeleton } from "@/components/admin/PageSkeleton";
import { toast } from "@/components/ui/sonner";

export default function MyNewPage() {
  const [loading, setLoading] = useState(true);

  // Fetch data
  const { data: items = [], isLoading, refetch } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("my_table")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <PageSkeleton variant="table" />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">My New Page</h1>
        <p className="text-[#9CA3AF]">Description of this section</p>
      </div>

      {/* Content */}
      <Card className="bg-[#1F2937] border-[#374151]">
        <CardContent className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#9CA3AF]">No items found</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="p-4">
                {/* Item content */}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

**Step 2: Register in App.tsx Routes**

```typescript
// 1. Add lazy import at top
const MyNewPage = lazy(() => import("./pages/admin/MyNewPage"));

// 2. Add route inside <Route path="/admin/*" element={<AdminShell />}>
<Route path="my-new-page" element={<MyNewPage />} />
```

**Step 3: Add Sidebar Menu Item**

File: `src/components/admin/neon/CyberSidebar.tsx`

```typescript
// In menuItems array, add to appropriate section:
{
  title: "My Section",  // or add to existing section
  icon: MyIcon,
  children: [
    { 
      title: "My New Page", 
      href: "/admin/my-new-page", 
      icon: MyIcon 
    },
  ]
}
```

### Adding a New Supabase Table Query

**Pattern:**

```typescript
// 1. Define interface at top of component
interface MyData {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

// 2. Use useQuery
const { data: myData = [], isLoading } = useQuery({
  queryKey: ["my-data", filters],  // Include filters in key
  queryFn: async () => {
    let query = supabase
      .from("my_table")
      .select("*, related_table(*)");  // Join if needed

    // Add filters
    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    // Order and limit
    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return data as MyData[];
  },
  staleTime: 5 * 60_000,
});

// 3. Add realtime subscription if needed
useEffect(() => {
  const channel = supabase
    .channel("my_table_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "my_table" },
      () => refetch()
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [refetch]);
```

### Pattern for Adding a Form with Supabase Storage

**Example: File Upload + Database**

```typescript
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function MyForm() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (e.g., 5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
    }
  };

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !title.trim()) {
        throw new Error("Please fill all fields");
      }

      setIsSaving(true);

      try {
        // 1. Upload file to storage
        const fileExtension = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("my-bucket")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("my-bucket")
          .getPublicUrl(filePath);

        // 3. Save record to database
        const { error: dbError } = await supabase
          .from("my_items")
          .insert([
            {
              title,
              file_url: publicUrlData.publicUrl,
              file_path: filePath,
              file_size: file.size,
              created_at: new Date().toISOString(),
            },
          ]);

        if (dbError) throw dbError;

        toast({ title: "Uploaded successfully" });
        setTitle("");
        setFile(null);
      } finally {
        setIsSaving(false);
      }
    },
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          {file ? file.name : "Choose File"}
        </Button>
      </div>

      <Button
        onClick={() => uploadMutation.mutate()}
        disabled={uploadMutation.isPending}
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}
```

### Pattern for Adding Realtime Subscription

**Step-by-step:**

```typescript
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useRealtime(tableName: string) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 1. Fetch initial data
    const loadInitial = async () => {
      const { data } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });
      setItems(data || []);
    };

    loadInitial();

    // 2. Subscribe to changes
    const channel = supabase
      .channel(`${tableName}_changes`)
      .on(
        "postgres_changes",
        {
          event: "*",  // Listen to all events
          schema: "public",
          table: tableName,
        },
        (payload) => {
          const newPayload = payload.new;
          const oldPayload = payload.old;

          if (payload.eventType === "INSERT") {
            // Add new item to top
            setItems((prev) => [newPayload, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            // Update item
            setItems((prev) =>
              prev.map((item) =>
                item.id === newPayload.id ? newPayload : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            // Remove item
            setItems((prev) => prev.filter((item) => item.id !== oldPayload.id));
          }
        }
      )
      .subscribe();

    // 3. Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  return { items };
}

// Usage in component:
export function MyComponent() {
  const { items } = useRealtime("my_table");

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

---

## OBSERVATIONS

### 1. **Architecture Strengths**

- **Zero-Distraction Protocol**: Dark, minimalist design eliminates visual noise. No animations on dashboard (class: `admin-no-animations`)
- **Query Caching Strategy**: 5-minute stale time prevents excessive refetches; 15-minute garbage collection balances freshness with performance
- **Nested Routing Pattern**: AdminShell wraps all admin routes, centralizing auth, layout, and session management
- **Real-time Capability**: Supabase channel subscriptions provide live updates without polling (booking updates, article changes, etc.)

### 2. **Sidebar Navigation Design**

- **Collapsible Groups**: All menu items organized into 11 semantic sections (Dashboard, Content, Clients, E-Commerce, Requests, Communications, Settings, Digital Library, Forms, Moderation, Testing)
- **Compact Mobile**: 260px width on desktop, collapses to 70px icon-only, hidden completely on mobile (overlay instead)
- **Active State Clarity**: Child items use orange accent (`text-orange-400 bg-orange-500/10`) distinctly separate from parent hover (`bg-[#1F2937]`)
- **Icon Consistency**: All icons from Lucide React, consistent sizing (h-4 w-4 for children, h-5 w-5 for parents)

### 3. **Data Flow Patterns**

- **Optimistic Updates**: Not used consistently; most components refetch after mutations rather than updating local state first
- **Batch Queries**: Multiple parallel queries (e.g., DashboardKPICards fetches 5 pipelines in Promise.all) for efficiency
- **Unread Counts**: Fetched via `.select("*", { count: "exact", head: true })` to avoid downloading full data
- **Cascading Refreshes**: Single refetch() call invalidates multiple query keys (e.g., archives trigger both books and stats refresh)

### 4. **Form & Modal Patterns**

- **Validation First**: All forms validate before submission (AddTeamMemberModal has email regex, name split check, LinkedIn URL validation)
- **Live Preview**: Modals with split-screen form + preview (AddTeamMemberModal shows how team member will appear on About page)
- **Photo Upload with Zoom**: Drag-drop support + zoom slider for precise positioning (relevant for avatar photos)
- **Disabled Founder Fields**: Special handling for founder profile (display_order locked to 1, cannot be deleted)

### 5. **Chart Implementation**

- **Gradient Fills**: RevenueChart uses linear gradients from primary color → transparent for area fills
- **Responsive Height**: Charts flex between 64px and 80px (h-64 sm:h-80) based on screen size
- **Custom Tooltips**: Styled to match dark theme, display formatted currency with thousands separator
- **Export to CSV**: RevenueChart includes download functionality for data portability

### 6. **Performance Considerations**

- **Lazy Loading**: All admin pages lazy-loaded via React.lazy() in App.tsx
- **Pagination**: Limits applied (e.g., `.limit(50)` for bookings) to prevent huge queries
- **Skeleton Screens**: PageSkeleton component provides instant visual feedback during loading
- **Throttled Realtime**: Channel updates trigger refetch() instead of individual item operations (batches changes)

### 7. **Accessibility & UX**

- **Color Contrast**: Orange accent (`#e07a55`) on dark backgrounds meets WCAG AA
- **Button States**: Disabled states clear (via `disabled={isSaving}`), loading states show spinner or "Saving..." text
- **Keyboard Navigation**: Tabs, collapsibles, and dropdowns fully keyboard-accessible (Radix primitives)
- **Error Handling**: Explicit error toasts with variant="destructive" and red styling

### 8. **Inconsistencies & Gaps**

- **AdminSidebar vs CyberSidebar**: Two different sidebar implementations exist; only CyberSidebar is used in AdminShell
- **Pagination Missing**: Tables fetch limited results but don't implement next/previous pagination UI
- **Bulk Actions Incomplete**: Selected items pattern exists (BookingsList) but bulk delete UI not fully implemented
- **Search Bar Non-functional**: Header search bar placeholder-only, no actual search logic hooked up
- **Realtime Lifecycle**: Some components subscribe to changes but don't unsubscribe properly if unmounted mid-request

### 9. **Testing & System Health**

- **TestingChecklist Page**: Exists but appears to be a manual checklist (not automated test runner)
- **SystemHealthDashboard**: Shows ops health but relies on manual row counts (not proactive monitoring)
- **No Error Boundaries**: Admin pages lack error boundaries; crashes will unmount entire admin panel

### 10. **Future Expansion Points**

- **Dashboard Customization**: No user-configurable widgets or dashboard layouts
- **Batch Operations**: Framework exists for multi-select but no bulk export, bulk email, or bulk status change
- **Advanced Filtering**: Search and filters exist separately; no combined filter UI
- **Audit Logging**: No admin action logging visible (who changed what, when)
- **Dark/Light Theme Toggle**: Hardcoded dark theme; no theme switching in settings
- **Mobile Admin**: Sidebar overlay exists but forms/tables not mobile-optimized (narrow input fields, stacked layout)

---

**Report Complete.** This analysis covers every structural aspect of the admin dashboard codebase. All 12 sections detail exact patterns, code snippets, and usage guidelines for building new admin features aligned with existing architecture.
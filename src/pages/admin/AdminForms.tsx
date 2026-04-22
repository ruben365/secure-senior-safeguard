import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  FileText,
  AlertTriangle,
  BookOpen,
  Calendar,
  UserPlus,
  Receipt,
  Handshake,
  Truck,
  ClipboardCheck,
  Car,
  Route,
  ShieldCheck,
  MessageSquarePlus,
  FileBarChart,
  Search,
  Printer,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Send,
  X,
} from "lucide-react";
import { format } from "date-fns";

// ── Form definitions ────────────────────────────────────────────────────────

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormDef {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  category: "invision" | "exodus";
  fields: FormField[];
}

const FORMS: FormDef[] = [
  // ── InVision Network ──────────────────────────────────────────────────────
  {
    id: "client-intake",
    title: "Client Intake",
    icon: Users,
    description: "New client onboarding information and consent",
    category: "invision",
    fields: [
      { name: "full_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "address", label: "Home / Business Address", type: "text" },
      { name: "service_interest", label: "Service of Interest", type: "select", options: ["ScamShield Personal", "ScamShield Business", "Workshop", "Consulting", "Other"] },
      { name: "referral_source", label: "How did you hear about us?", type: "text" },
      { name: "consent_data", label: "I consent to data collection and processing", type: "checkbox", required: true },
      { name: "notes", label: "Additional Notes", type: "textarea" },
    ],
  },
  {
    id: "service-agreement",
    title: "Service Agreement",
    icon: FileText,
    description: "Formal agreement for InVision Network services",
    category: "invision",
    fields: [
      { name: "client_name", label: "Client Full Name", type: "text", required: true },
      { name: "client_email", label: "Client Email", type: "email", required: true },
      { name: "company_name", label: "Company / Organization", type: "text" },
      { name: "service_tier", label: "Service Tier", type: "select", required: true, options: ["Basic", "Standard", "Premium", "Enterprise"] },
      { name: "start_date", label: "Service Start Date", type: "date", required: true },
      { name: "billing_cycle", label: "Billing Cycle", type: "select", options: ["Monthly", "Quarterly", "Annually"] },
      { name: "special_terms", label: "Special Terms / Notes", type: "textarea" },
      { name: "signature_name", label: "Authorized Signatory Name", type: "text", required: true },
    ],
  },
  {
    id: "incident-report",
    title: "Incident Report",
    icon: AlertTriangle,
    description: "Log cybersecurity incidents for clients",
    category: "invision",
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "incident_date", label: "Date of Incident", type: "date", required: true },
      { name: "incident_type", label: "Incident Type", type: "select", required: true, options: ["Phishing", "Scam Call", "Malware", "Ransomware", "Account Compromise", "Data Breach", "Deepfake", "Social Engineering", "Other"] },
      { name: "description", label: "Incident Description", type: "textarea", required: true },
      { name: "financial_impact", label: "Financial Impact ($)", type: "text" },
      { name: "reported_to", label: "Reported To (FBI, FTC, etc.)", type: "text" },
      { name: "resolution_status", label: "Resolution Status", type: "select", options: ["Open", "In Progress", "Resolved", "Escalated"] },
      { name: "follow_up_needed", label: "Follow-up action required", type: "textarea" },
    ],
  },
  {
    id: "workshop-registration",
    title: "Workshop Registration",
    icon: BookOpen,
    description: "Register attendees for cybersecurity workshops",
    category: "invision",
    fields: [
      { name: "attendee_name", label: "Attendee Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "workshop_name", label: "Workshop Name", type: "text", required: true },
      { name: "workshop_date", label: "Workshop Date", type: "date", required: true },
      { name: "organization", label: "Organization / Church / Group", type: "text" },
      { name: "dietary_needs", label: "Dietary / Accessibility Needs", type: "textarea" },
      { name: "group_size", label: "Number of Attendees (group)", type: "text" },
    ],
  },
  {
    id: "consultation-booking",
    title: "Consultation Booking",
    icon: Calendar,
    description: "Book a one-on-one security consultation",
    category: "invision",
    fields: [
      { name: "client_name", label: "Full Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "preferred_date", label: "Preferred Date", type: "date" },
      { name: "preferred_time", label: "Preferred Time", type: "select", options: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"] },
      { name: "consultation_type", label: "Consultation Type", type: "select", options: ["Personal Security Review", "Business Assessment", "Incident Response", "Training Planning", "General Inquiry"] },
      { name: "concerns", label: "Concerns / Topics to Discuss", type: "textarea" },
    ],
  },
  {
    id: "employee-onboarding",
    title: "Employee Onboarding",
    icon: UserPlus,
    description: "Onboard new InVision Network team members",
    category: "invision",
    fields: [
      { name: "employee_name", label: "Employee Full Name", type: "text", required: true },
      { name: "email", label: "Work Email", type: "email", required: true },
      { name: "phone", label: "Mobile Phone", type: "tel", required: true },
      { name: "role", label: "Role / Position", type: "text", required: true },
      { name: "start_date", label: "Start Date", type: "date", required: true },
      { name: "emergency_contact", label: "Emergency Contact Name & Phone", type: "text" },
      { name: "equipment_needed", label: "Equipment / Access Needed", type: "textarea" },
      { name: "background_check", label: "Background check consent obtained", type: "checkbox", required: true },
    ],
  },
  {
    id: "invoice-receipt",
    title: "Invoice / Receipt",
    icon: Receipt,
    description: "Generate invoices and receipts for clients",
    category: "invision",
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "client_email", label: "Client Email", type: "email", required: true },
      { name: "invoice_date", label: "Invoice Date", type: "date", required: true },
      { name: "due_date", label: "Due Date", type: "date" },
      { name: "service_description", label: "Service Description", type: "textarea", required: true },
      { name: "amount", label: "Amount ($)", type: "text", required: true },
      { name: "payment_method", label: "Payment Method", type: "select", options: ["Cash", "Check", "Credit Card", "ACH Transfer", "PayPal", "Other"] },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
  {
    id: "vendor-partner-application",
    title: "Vendor / Partner Application",
    icon: Handshake,
    description: "Application for new vendors and partners",
    category: "invision",
    fields: [
      { name: "company_name", label: "Company Name", type: "text", required: true },
      { name: "contact_name", label: "Primary Contact", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "website", label: "Website", type: "text" },
      { name: "service_offered", label: "Services / Products Offered", type: "textarea", required: true },
      { name: "partnership_type", label: "Partnership Type", type: "select", options: ["Referral Partner", "Technology Partner", "Reseller", "Subcontractor", "Other"] },
      { name: "references", label: "References (name & phone)", type: "textarea" },
    ],
  },

  // ── Exodus Health Couriers ────────────────────────────────────────────────
  {
    id: "driver-daily-log",
    title: "Driver Daily Log",
    icon: Truck,
    description: "Record driver daily activity, deliveries, and mileage",
    category: "exodus",
    fields: [
      { name: "driver_name", label: "Driver Name", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "vehicle_id", label: "Vehicle ID / License Plate", type: "text", required: true },
      { name: "start_mileage", label: "Start Mileage", type: "text", required: true },
      { name: "end_mileage", label: "End Mileage", type: "text", required: true },
      { name: "deliveries_made", label: "Number of Deliveries", type: "text", required: true },
      { name: "routes_completed", label: "Routes / Stops Completed", type: "textarea" },
      { name: "incidents", label: "Incidents / Issues (if any)", type: "textarea" },
    ],
  },
  {
    id: "chain-of-custody",
    title: "Specimen Chain of Custody",
    icon: ClipboardCheck,
    description: "HIPAA-compliant chain of custody for medical specimens",
    category: "exodus",
    fields: [
      { name: "specimen_id", label: "Specimen ID / Tracking #", type: "text", required: true },
      { name: "collection_date", label: "Collection Date & Time", type: "text", required: true },
      { name: "collected_by", label: "Collected By", type: "text", required: true },
      { name: "facility_origin", label: "Facility of Origin", type: "text", required: true },
      { name: "destination_lab", label: "Destination Laboratory", type: "text", required: true },
      { name: "specimen_type", label: "Specimen Type", type: "select", options: ["Blood", "Urine", "Swab", "Tissue", "Other"] },
      { name: "temperature_maintained", label: "Temperature maintained (°F)", type: "text" },
      { name: "driver_name", label: "Driver Name", type: "text", required: true },
      { name: "received_by", label: "Received By (lab technician)", type: "text" },
      { name: "delivery_timestamp", label: "Delivery Timestamp", type: "text" },
    ],
  },
  {
    id: "vehicle-inspection",
    title: "Vehicle Inspection",
    icon: Car,
    description: "Pre/post-trip vehicle inspection checklist",
    category: "exodus",
    fields: [
      { name: "vehicle_id", label: "Vehicle ID", type: "text", required: true },
      { name: "driver_name", label: "Driver Name", type: "text", required: true },
      { name: "inspection_date", label: "Inspection Date", type: "date", required: true },
      { name: "inspection_type", label: "Inspection Type", type: "select", options: ["Pre-Trip", "Post-Trip", "Weekly", "Monthly"] },
      { name: "tires_ok", label: "Tires: All OK", type: "checkbox" },
      { name: "brakes_ok", label: "Brakes: Functioning", type: "checkbox" },
      { name: "lights_ok", label: "Lights: All Working", type: "checkbox" },
      { name: "fluid_levels_ok", label: "Fluid Levels: OK", type: "checkbox" },
      { name: "cleanliness_ok", label: "Interior/Exterior: Clean", type: "checkbox" },
      { name: "issues_found", label: "Issues Found (describe)", type: "textarea" },
      { name: "mileage", label: "Current Mileage", type: "text" },
    ],
  },
  {
    id: "route-sheet",
    title: "Route Sheet",
    icon: Route,
    description: "Daily route manifest with stops and delivery details",
    category: "exodus",
    fields: [
      { name: "driver_name", label: "Driver Name", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "vehicle_id", label: "Vehicle ID", type: "text", required: true },
      { name: "route_name", label: "Route Name / Number", type: "text" },
      { name: "stops", label: "Stops (list facility names & addresses)", type: "textarea", required: true },
      { name: "priority_pickups", label: "Priority / Stat Pickups", type: "textarea" },
      { name: "estimated_completion", label: "Estimated Completion Time", type: "text" },
      { name: "dispatcher_notes", label: "Dispatcher Notes", type: "textarea" },
    ],
  },
  {
    id: "hipaa-acknowledgment",
    title: "HIPAA Compliance Acknowledgment",
    icon: ShieldCheck,
    description: "Annual HIPAA compliance acknowledgment for drivers/staff",
    category: "exodus",
    fields: [
      { name: "employee_name", label: "Employee Full Name", type: "text", required: true },
      { name: "employee_id", label: "Employee ID", type: "text" },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "acknowledgment_date", label: "Date", type: "date", required: true },
      { name: "training_completed", label: "HIPAA training completed this year", type: "checkbox", required: true },
      { name: "understands_phi", label: "I understand PHI handling requirements", type: "checkbox", required: true },
      { name: "understands_breach", label: "I understand breach reporting obligations", type: "checkbox", required: true },
      { name: "signature_name", label: "Printed Name (as signature)", type: "text", required: true },
    ],
  },
  {
    id: "customer-complaint",
    title: "Customer Complaint",
    icon: MessageSquarePlus,
    description: "Log and track customer complaints and resolutions",
    category: "exodus",
    fields: [
      { name: "client_name", label: "Client / Facility Name", type: "text", required: true },
      { name: "contact_name", label: "Contact Name", type: "text" },
      { name: "contact_phone", label: "Contact Phone", type: "tel" },
      { name: "complaint_date", label: "Complaint Date", type: "date", required: true },
      { name: "complaint_type", label: "Complaint Type", type: "select", options: ["Late Delivery", "Specimen Handling", "Driver Conduct", "Billing Issue", "Communication", "Other"] },
      { name: "description", label: "Complaint Description", type: "textarea", required: true },
      { name: "severity", label: "Severity", type: "select", options: ["Low", "Medium", "High", "Critical"] },
      { name: "resolution", label: "Resolution / Action Taken", type: "textarea" },
    ],
  },
  {
    id: "bid-proposal",
    title: "Bid / Proposal Template",
    icon: FileBarChart,
    description: "Generate bids and proposals for new clients",
    category: "exodus",
    fields: [
      { name: "prospect_name", label: "Prospective Client Name", type: "text", required: true },
      { name: "contact_name", label: "Contact Person", type: "text", required: true },
      { name: "email", label: "Contact Email", type: "email", required: true },
      { name: "proposal_date", label: "Proposal Date", type: "date", required: true },
      { name: "service_area", label: "Service Area (cities/counties)", type: "textarea" },
      { name: "pickup_frequency", label: "Estimated Pickup Frequency", type: "select", options: ["Daily", "3x per week", "Weekly", "As needed"] },
      { name: "specimen_volume", label: "Estimated Monthly Specimen Volume", type: "text" },
      { name: "proposed_rate", label: "Proposed Rate (per pickup / per route)", type: "text" },
      { name: "special_requirements", label: "Special Requirements / Notes", type: "textarea" },
      { name: "valid_until", label: "Proposal Valid Until", type: "date" },
    ],
  },
];

// ── Reusable form renderer ──────────────────────────────────────────────────

function FormRenderer({ form, onClose }: { form: FormDef; onClose: () => void }) {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (name: string, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("form_submissions").insert({
      form_type: form.id,
      data: values,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error saving form", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Form submitted", description: `${form.title} saved successfully.` });
    }
  };

  const handlePrint = () => window.print();

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
          <Send className="w-7 h-7 text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-[#F9FAFB]">Form Submitted</h3>
        <p className="text-[#6B7280] text-sm">Saved to Supabase form_submissions table.</p>
        <div className="flex gap-3 mt-2">
          <Button variant="outline" size="sm" onClick={() => { setValues({}); setSubmitted(false); }}>
            Fill Again
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 print:space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {form.fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            <Label htmlFor={field.name} className="text-[#D1D5DB] text-sm mb-1.5 block">
              {field.label}
              {field.required && <span className="text-orange-400 ml-1">*</span>}
            </Label>

            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={(values[field.name] as string) || ""}
                onChange={(e) => set(field.name, e.target.value)}
                className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] placeholder:text-[#6B7280] focus:border-orange-500/50 min-h-[80px]"
              />
            ) : field.type === "select" ? (
              <Select
                value={(values[field.name] as string) || ""}
                onValueChange={(v) => set(field.name, v)}
                required={field.required}
              >
                <SelectTrigger className="bg-[#1F2937] border-[#374151] text-[#F9FAFB]">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-[#374151]">
                  {field.options?.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-[#F9FAFB] focus:bg-[#374151]">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "checkbox" ? (
              <div className="flex items-center gap-3 h-10">
                <input
                  type="checkbox"
                  id={field.name}
                  required={field.required}
                  checked={!!(values[field.name])}
                  onChange={(e) => set(field.name, e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <label htmlFor={field.name} className="text-[#9CA3AF] text-sm">{field.label}</label>
              </div>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={(values[field.name] as string) || ""}
                onChange={(e) => set(field.name, e.target.value)}
                className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] placeholder:text-[#6B7280] focus:border-orange-500/50"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-[#1F2937]">
        <Button type="button" variant="ghost" size="sm" onClick={handlePrint}
          className="text-[#6B7280] hover:text-[#F9FAFB] gap-2">
          <Printer className="w-4 h-4" /> Print
        </Button>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={onClose} className="text-[#6B7280] hover:text-[#F9FAFB]">
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}
            className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
            <Send className="w-4 h-4" />
            {submitting ? "Saving..." : "Submit Form"}
          </Button>
        </div>
      </div>
    </form>
  );
}

// ── Submissions list ────────────────────────────────────────────────────────

interface Submission {
  id: string;
  form_type: string;
  submitter_name: string | null;
  submitter_email: string | null;
  status: string;
  created_at: string;
  data: Record<string, unknown>;
}

function SubmissionsList({ formType }: { formType: string | null }) {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["form_submissions", formType],
    queryFn: async () => {
      let q = supabase.from("form_submissions").select("*").order("created_at", { ascending: false }).limit(50);
      if (formType) q = q.eq("form_type", formType);
      const { data, error } = await q;
      if (error) throw error;
      return data as Submission[];
    },
  });

  if (isLoading) return <p className="text-[#6B7280] text-sm py-4">Loading submissions...</p>;
  if (!submissions?.length) return <p className="text-[#6B7280] text-sm py-4">No submissions yet.</p>;

  const statusColors: Record<string, string> = {
    submitted: "bg-blue-500/20 text-blue-400",
    reviewed: "bg-green-500/20 text-green-400",
    archived: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#1F2937]">
            <TableHead className="text-[#6B7280]">Form Type</TableHead>
            <TableHead className="text-[#6B7280]">Submitted</TableHead>
            <TableHead className="text-[#6B7280]">Status</TableHead>
            <TableHead className="text-[#6B7280]">Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((s) => {
            const form = FORMS.find((f) => f.id === s.form_type);
            return (
              <TableRow key={s.id} className="border-[#1F2937] hover:bg-[#1F2937]/40">
                <TableCell className="text-[#F9FAFB] text-sm font-medium">
                  {form?.title || s.form_type}
                </TableCell>
                <TableCell className="text-[#9CA3AF] text-sm">
                  {format(new Date(s.created_at), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs ${statusColors[s.status] || "bg-gray-500/20 text-gray-400"}`}>
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-[#6B7280] text-xs max-w-[200px] truncate">
                  {Object.entries(s.data || {}).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "invision", label: "InVision Network" },
  { id: "exodus", label: "Exodus Health Couriers" },
] as const;

export default function AdminForms() {
  const [category, setCategory] = useState<"invision" | "exodus">("invision");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState<FormDef | null>(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [filterFormType, setFilterFormType] = useState<string | null>(null);

  const filtered = FORMS.filter(
    (f) => f.category === category && f.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Operational Forms</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">Fill, submit, and track all business forms</p>
        </div>
        <Button
          onClick={() => setShowSubmissions((s) => !s)}
          variant="outline"
          className="border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] gap-2"
        >
          {showSubmissions ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {showSubmissions ? "Hide" : "View"} Submissions
        </Button>
      </div>

      {/* Submissions panel */}
      {showSubmissions && (
        <Card className="bg-[#111827] border-[#1F2937]">
          <CardHeader className="flex-row items-center justify-between pb-3">
            <CardTitle className="text-[#F9FAFB] text-base">Recent Submissions</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={filterFormType || "__all__"} onValueChange={(v) => setFilterFormType(v === "__all__" ? null : v)}>
                <SelectTrigger className="w-44 bg-[#1F2937] border-[#374151] text-[#9CA3AF] h-8 text-xs">
                  <SelectValue placeholder="All forms" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-[#374151]">
                  <SelectItem value="__all__" className="text-[#F9FAFB] focus:bg-[#374151] text-xs">All Forms</SelectItem>
                  {FORMS.map((f) => (
                    <SelectItem key={f.id} value={f.id} className="text-[#F9FAFB] focus:bg-[#374151] text-xs">{f.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6B7280] hover:text-[#F9FAFB]">
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <SubmissionsList formType={filterFormType} />
          </CardContent>
        </Card>
      )}

      {/* Category tabs */}
      <div className="flex gap-1 p-1 bg-[#111827] border border-[#1F2937] rounded-lg w-fit">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              category === cat.id
                ? "bg-orange-600 text-white"
                : "text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
        <Input
          placeholder="Search forms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-[#111827] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]"
        />
      </div>

      {/* Form cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((form) => {
          const Icon = form.icon;
          return (
            <Card
              key={form.id}
              className="bg-[#111827] border-[#1F2937] hover:border-orange-500/40 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setOpenForm(form)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/25 transition-colors">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[#F9FAFB] font-semibold text-sm leading-tight">{form.title}</h3>
                    <p className="text-[#6B7280] text-xs mt-0.5 leading-relaxed">{form.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[#4B5563] text-xs">{form.fields.length} fields</span>
                  <span className="text-orange-400 text-xs font-medium group-hover:underline">Open →</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-[#6B7280] py-10 text-sm">No forms found.</p>
        )}
      </div>

      {/* Form dialog */}
      <Dialog open={!!openForm} onOpenChange={(open) => !open && setOpenForm(null)}>
        <DialogContent className="bg-[#111827] border-[#1F2937] text-[#F9FAFB] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F9FAFB] flex items-center gap-2">
              {openForm && (() => { const Icon = openForm.icon; return <Icon className="w-5 h-5 text-orange-400" />; })()}
              {openForm?.title}
            </DialogTitle>
          </DialogHeader>
          {openForm && <FormRenderer form={openForm} onClose={() => setOpenForm(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

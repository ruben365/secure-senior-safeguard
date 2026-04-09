import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, DollarSign, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import type { JobPosition } from "@/config/jobPositions";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  resumeUrl: z.string().trim().url("Please enter a valid URL").or(z.literal("")),
  coverLetter: z.string().trim().max(2000, "Cover letter must be under 2000 characters"),
});

interface JobApplicationModalProps {
  job: JobPosition | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobApplicationModal({ job, open, onOpenChange }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("booking_requests").insert({
        full_name: result.data.fullName,
        email: result.data.email,
        phone: result.data.phone,
        service_name: job.title,
        service_type: "job_application",
        message: result.data.coverLetter || null,
        metadata: {
          department: job.department,
          location: job.location,
          resume_url: result.data.resumeUrl || null,
          job_id: job.id,
        },
        status: "pending",
      });

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Application error:", err);
      toast({
        title: "Submission failed",
        description: "Please try again or email us at careers@invisionnetwork.org",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form on close
      setTimeout(() => {
        setFormData({ fullName: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
        setErrors({});
        setSubmitted(false);
      }, 300);
    }
    onOpenChange(open);
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* Compact: no scrollbar, teal accent on success icon */}
      <DialogContent className="sm:max-w-[380px] overflow-hidden rounded-2xl p-4 gap-0">
        {submitted ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/15 to-indigo-500/15 border border-teal-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
            </div>
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-base font-semibold leading-tight">Application Received!</DialogTitle>
              <DialogDescription className="text-[11px] mt-1">
                Thank you for applying for <span className="font-semibold text-foreground">{job.title}</span>.
                Our team will review your application and reach out within 3-5 business days.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleClose(false)} className="mt-2" size="sm">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-0 pb-3">
              <DialogTitle className="text-base font-semibold leading-tight">Apply for {job.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-1.5 pt-1.5">
                <Badge variant="outline" className="text-[10px] h-[18px] px-1.5 py-0">
                  <Briefcase className="w-2.5 h-2.5 mr-1" />
                  {job.department}
                </Badge>
                <Badge variant="outline" className="text-[10px] h-[18px] px-1.5 py-0">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {job.salary}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resumeUrl">Resume / Portfolio Link</Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/janedoe"
                  value={formData.resumeUrl}
                  onChange={(e) => handleChange("resumeUrl", e.target.value)}
                  className={errors.resumeUrl ? "border-destructive" : ""}
                />
                {errors.resumeUrl && <p className="text-xs text-destructive">{errors.resumeUrl}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coverLetter">Why do you want to join InVision?</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Tell us about yourself and why this role excites you..."
                  rows={4}
                  value={formData.coverLetter}
                  onChange={(e) => handleChange("coverLetter", e.target.value)}
                  className={errors.coverLetter ? "border-destructive" : ""}
                />
                {errors.coverLetter && <p className="text-xs text-destructive">{errors.coverLetter}</p>}
                <p className="text-xs text-muted-foreground text-right">
                  {formData.coverLetter.length}/2000
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By applying, you agree to our privacy policy. We'll only use your information for recruitment purposes.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

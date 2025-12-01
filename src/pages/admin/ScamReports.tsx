import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { Eye, Shield, Loader2, AlertTriangle } from "lucide-react";

export default function ScamReports() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const { data: reports, refetch, isLoading } = useQuery({
    queryKey: ["scam-reports", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("scam_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("scam_submissions")
        .update({ 
          status: newStatus,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Status updated successfully");
      refetch();
    } catch (error: any) {
      toast.error("Failed to update status: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNotes = async () => {
    if (!selectedReport || !adminNotes.trim()) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("scam_submissions")
        .update({ 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedReport.id);

      if (error) throw error;

      toast.success("Notes added successfully");
      setAdminNotes("");
      setSelectedReport(null);
      refetch();
    } catch (error: any) {
      toast.error("Failed to add notes: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "default",
      reviewed: "secondary",
      resolved: "secondary",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getRiskBadge = (riskLevel: string | null) => {
    if (!riskLevel) return null;
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      low: "secondary",
      medium: "default",
      high: "destructive",
      critical: "destructive",
    };
    return <Badge variant={variants[riskLevel] || "default"}>{riskLevel}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Scam Reports</h1>
            <p className="text-muted-foreground mt-2">
              Review and manage scam submissions
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : reports && reports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submission #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitter</TableHead>
                  <TableHead>AI Risk Level</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-mono text-sm">
                      {report.submission_number}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.submission_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.submitter_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.submitter_email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.ai_analysis?.risk_level ? (
                        <div className="space-y-1">
                          {getRiskBadge(report.ai_analysis.risk_level)}
                          {report.ai_analysis.confidence_score && (
                            <p className="text-xs text-muted-foreground">
                              {Math.round(report.ai_analysis.confidence_score * 100)}% confidence
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not analyzed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={report.urgency_level === "high" ? "destructive" : "secondary"}>
                        {report.urgency_level}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      {format(new Date(report.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReport(report);
                                setAdminNotes(report.admin_notes || "");
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Scam Report Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium">Suspicious Content</p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {report.suspicious_content}
                                </p>
                              </div>
                              {report.sender_info && (
                                <div>
                                  <p className="text-sm font-medium">Sender Information</p>
                                  <p className="text-sm text-muted-foreground">
                                    {report.sender_info}
                                  </p>
                                </div>
                              )}
                              {report.ai_analysis && (
                                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                                  <p className="text-sm font-medium">AI Analysis</p>
                                  {report.ai_analysis.threats_detected && (
                                    <div>
                                      <p className="text-xs font-medium">Detected Threats:</p>
                                      <ul className="text-xs text-muted-foreground list-disc list-inside">
                                        {report.ai_analysis.threats_detected.map((threat: string, i: number) => (
                                          <li key={i}>{threat}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {report.ai_analysis.recommendations && (
                                    <div>
                                      <p className="text-xs font-medium">Recommendations:</p>
                                      <p className="text-xs text-muted-foreground">
                                        {report.ai_analysis.recommendations}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium mb-2">Admin Notes</p>
                                <Textarea
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="Add notes about this report..."
                                  rows={4}
                                />
                                <Button
                                  onClick={handleAddNotes}
                                  disabled={updating}
                                  className="mt-2"
                                >
                                  {updating ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    "Save Notes"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Select
                          value={report.status}
                          onValueChange={(value) => handleStatusUpdate(report.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No scam reports found</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

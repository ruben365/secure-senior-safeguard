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
import { Eye, CheckCircle, XCircle, Loader2, MessageSquare } from "lucide-react";

export default function ServiceInquiries() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const { data: inquiries, refetch, isLoading } = useQuery({
    queryKey: ["service-inquiries", statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("service_inquiries")
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
      const { error } = await supabase
        .from("service_inquiries")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
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
    if (!selectedInquiry || !adminNotes.trim()) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("service_inquiries")
        .update({ 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq("id", selectedInquiry.id);

      if (error) throw error;

      toast.success("Notes added successfully");
      setAdminNotes("");
      setSelectedInquiry(null);
      refetch();
    } catch (error: any) {
      toast.error("Failed to add notes: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      new: "default",
      reviewed: "secondary",
      contacted: "secondary",
      resolved: "secondary",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Service Inquiries</h1>
            <p className="text-muted-foreground mt-2">
              Manage service consultation requests
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Inquiries</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : inquiries && inquiries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inquiry #</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-mono text-sm">
                      {inquiry.inquiry_number}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.service_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {inquiry.service_type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inquiry.full_name}</p>
                        {inquiry.company_name && (
                          <p className="text-sm text-muted-foreground">
                            {inquiry.company_name}
                          </p>
                        )}
                        {inquiry.is_veteran && (
                          <Badge variant="secondary" className="mt-1">
                            Veteran
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{inquiry.email}</p>
                        {inquiry.phone && <p>{inquiry.phone}</p>}
                      </div>
                    </TableCell>
                    <TableCell>{inquiry.budget || "Not specified"}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell>
                      {format(new Date(inquiry.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setAdminNotes(inquiry.admin_notes || "");
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Inquiry Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium">Service</p>
                                <p className="text-sm text-muted-foreground">
                                  {inquiry.service_name} - ${inquiry.service_price?.toLocaleString()}
                                </p>
                              </div>
                              {inquiry.requirements && (
                                <div>
                                  <p className="text-sm font-medium">Requirements</p>
                                  <p className="text-sm text-muted-foreground">
                                    {inquiry.requirements}
                                  </p>
                                </div>
                              )}
                              {inquiry.timeline && (
                                <div>
                                  <p className="text-sm font-medium">Timeline</p>
                                  <p className="text-sm text-muted-foreground">
                                    {inquiry.timeline}
                                  </p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium mb-2">Admin Notes</p>
                                <Textarea
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  placeholder="Add notes about this inquiry..."
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
                          value={inquiry.status}
                          onValueChange={(value) => handleStatusUpdate(inquiry.id, value)}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
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
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No service inquiries found</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}

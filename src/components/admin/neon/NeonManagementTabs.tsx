import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingRequestsTable } from "@/components/admin/BookingRequestsTable";
import { PurchaseRequestsTable } from "@/components/admin/PurchaseRequestsTable";
import { InquiriesTable } from "@/components/admin/InquiriesTable";
import { JobApplicationsTable } from "@/components/admin/JobApplicationsTable";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";
import { BookOpen, ShoppingCart, MessageSquare, Briefcase, Star } from "lucide-react";

const tabItems = [
  { value: "bookings", label: "Bookings", icon: BookOpen },
  { value: "purchases", label: "Purchases", icon: ShoppingCart },
  { value: "inquiries", label: "Inquiries", icon: MessageSquare },
  { value: "applications", label: "Applications", icon: Briefcase },
  { value: "testimonials", label: "Testimonials", icon: Star },
];

export function NeonManagementTabs() {
  return (
    <Card className="bg-[#1F2937] border-[#374151] p-4">
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="w-full bg-[#111827] border border-[#374151] p-1 rounded-lg grid grid-cols-5 gap-1 mb-4">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex items-center gap-2 text-[#6B7280] data-[state=active]:bg-[#374151] data-[state=active]:text-[#F9FAFB] rounded-md transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="[&_table]:bg-[#111827] [&_th]:text-[#6B7280] [&_th]:border-[#374151] [&_td]:border-[#374151] [&_tr:hover]:bg-[#374151]/50 [&_.border]:border-[#374151]">
          <TabsContent value="bookings"><BookingRequestsTable /></TabsContent>
          <TabsContent value="purchases"><PurchaseRequestsTable /></TabsContent>
          <TabsContent value="inquiries"><InquiriesTable /></TabsContent>
          <TabsContent value="applications"><JobApplicationsTable /></TabsContent>
          <TabsContent value="testimonials"><TestimonialsTable /></TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}

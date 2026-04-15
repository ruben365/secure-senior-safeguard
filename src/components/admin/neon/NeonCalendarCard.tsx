import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

interface NeonCalendarCardProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function NeonCalendarCard({ date, onSelect }: NeonCalendarCardProps) {
  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2 mb-4">
        <CalendarDays className="w-4 h-4 text-purple-400" />
        Calendar
      </h2>
      <div className="[&_.rdp]:bg-[#111827] [&_.rdp]:rounded-lg [&_.rdp]:border [&_.rdp]:border-[#374151] [&_.rdp]:p-3 [&_.rdp-day]:text-[#D1D5DB] [&_.rdp-day:hover]:bg-[#374151] [&_.rdp-day_button:hover]:bg-[#374151] [&_.rdp-day_button]:text-[#D1D5DB] [&_.rdp-day_button.rdp-day_selected]:bg-primary/50 [&_.rdp-day_button.rdp-day_selected]:text-white [&_.rdp-caption]:text-[#F9FAFB] [&_.rdp-head_cell]:text-[#6B7280] [&_.rdp-nav_button]:text-[#6B7280] [&_.rdp-nav_button:hover]:bg-[#374151] [&_.rdp-button:focus-visible]:ring-blue-500">
        <Calendar mode="single" selected={date} onSelect={onSelect} className="rounded-md" />
      </div>
    </Card>
  );
}

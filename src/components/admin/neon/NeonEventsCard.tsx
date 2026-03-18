import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Event { id: string; title: string; start_time: string; location?: string; event_type?: string; }

const typeStyle: Record<string, string> = {
  meeting: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  training: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  deadline: "bg-red-500/15 text-red-400 border-red-500/30",
  review: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export function NeonEventsCard({ events }: { events: Event[] }) {
  const fmt = (d: string) => {
    const date = new Date(d);
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  };

  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-purple-400" />
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center py-10">
          <Calendar className="w-8 h-8 text-[#374151] mx-auto mb-2" />
          <p className="text-[#6B7280] text-sm">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-2">
          {events.map((event) => {
            const { date, time } = fmt(event.start_time);
            return (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-[#111827] rounded-lg border border-[#374151] hover:border-[#4B5563] transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/10 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-[10px] text-purple-400 uppercase">{date.split(" ")[0]}</span>
                  <span className="text-base font-semibold text-[#F9FAFB]">{date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F9FAFB] truncate">{event.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[#6B7280]"><Clock className="w-3 h-3" />{time}</span>
                    {event.location && <span className="flex items-center gap-1 text-xs text-[#6B7280] truncate"><MapPin className="w-3 h-3" />{event.location}</span>}
                  </div>
                </div>
                {event.event_type && <Badge className={`border text-xs ${typeStyle[event.event_type.toLowerCase()] || typeStyle.meeting}`}>{event.event_type}</Badge>}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

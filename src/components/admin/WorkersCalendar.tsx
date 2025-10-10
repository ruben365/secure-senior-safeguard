import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface ZoomClass {
  id: string;
  title: string;
  scheduled_date: string;
  duration_minutes: number;
  zoom_link: string;
}

interface WorkersCalendarProps {
  zoomClasses: ZoomClass[];
}

export const WorkersCalendar = ({ zoomClasses }: WorkersCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const ohioTimezone = "America/New_York";

  // Convert dates to Ohio timezone
  const getOhioDate = (dateString: string) => {
    return toZonedTime(new Date(dateString), ohioTimezone);
  };

  // Get events for selected date
  const selectedEvents = selectedDate
    ? zoomClasses.filter((cls) => {
        const eventDate = getOhioDate(cls.scheduled_date);
        return (
          format(eventDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
        );
      })
    : [];

  // Get dates that have events
  const eventDates = zoomClasses.map((cls) => getOhioDate(cls.scheduled_date));

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Workers Calendar (Ohio Time)</h2>
        <Badge variant="outline" className="ml-auto">
          America/New_York (EST/EDT)
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              event: eventDates,
            }}
            modifiersStyles={{
              event: {
                fontWeight: "bold",
                textDecoration: "underline",
              },
            }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">
            {selectedDate
              ? `Events on ${format(selectedDate, "MMMM d, yyyy")}`
              : "Select a date"}
          </h3>

          {selectedEvents.length === 0 ? (
            <p className="text-muted-foreground">No events scheduled for this date</p>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((event) => {
                const ohioTime = getOhioDate(event.scheduled_date);
                return (
                  <Card key={event.id} className="p-4 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>
                            {format(ohioTime, "h:mm a")} ({event.duration_minutes} min)
                          </span>
                        </div>
                      </div>
                      <a
                        href={event.zoom_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Join
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

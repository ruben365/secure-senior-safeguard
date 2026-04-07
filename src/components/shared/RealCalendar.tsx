import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/portal";

interface RealCalendarProps {
  events: CalendarEvent[];
  title?: string;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

export function RealCalendar({
  events,
  title = "Calendar",
  onDateSelect,
  onEventClick,
  className,
}: RealCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const eventDates = new Set(
    events.map((e) => new Date(e.date).toDateString())
  );

  const selectedEvents = events.filter(
    (e) => new Date(e.date).toDateString() === selectedDate.toDateString()
  );

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 pt-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          modifiers={{
            hasEvent: (date) => eventDates.has(date.toDateString()),
          }}
          modifiersClassNames={{
            hasEvent: "font-bold text-primary",
          }}
          className="rounded-md border border-border p-2"
        />

        <div>
          <p className="text-sm font-medium text-foreground mb-2">
            {selectedDate.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>

          {selectedEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No events on{" "}
              {selectedDate.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : (
            <ScrollArea className="max-h-48">
              <ul className="flex flex-col gap-2 pr-2">
                {selectedEvents.map((event) => (
                  <li
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={cn(
                      "flex items-start gap-2 rounded-md p-2 text-sm",
                      "border border-border bg-muted/30",
                      onEventClick && "cursor-pointer hover:bg-muted/60 transition-colors"
                    )}
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-medium text-foreground truncate">
                        {event.title}
                      </span>
                      <div className="flex items-center gap-2">
                        {event.time && (
                          <span className="text-xs text-muted-foreground">
                            {event.time}
                          </span>
                        )}
                        {event.type && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {event.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

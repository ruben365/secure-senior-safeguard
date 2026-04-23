import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineVisualizationProps {
  events: TimelineEvent[];
}

export function TimelineVisualization({ events }: TimelineVisualizationProps) {
  return (
    <div className="relative py-4">
      {/* Vertical gradient line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.3)]" />

      <div className="space-y-4 md:space-y-5">
        {events.map((event, index) => (
          <ScrollReveal
            key={event.year}
            delay={index * 80}
            animation="fade-up"
          >
            <div
              className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline marker */}
              <div className="absolute left-4 md:left-1/2 -ml-3 w-4 h-4 rounded-full bg-primary ring-2 ring-background flex items-center justify-center z-10 shadow-[0_0_12px_hsl(var(--primary)/0.5)]">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
              </div>

              {/* Content card */}
              <Card
                className={`ml-9 md:ml-0 ${index % 2 === 0 ? "md:mr-[calc(50%+3rem)]" : "md:ml-[calc(50%+3rem)]"} p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-secondary/20`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="text-xl md:text-2xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent leading-tight">
                      {event.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground mb-1 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

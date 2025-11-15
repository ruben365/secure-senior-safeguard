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
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <ScrollReveal key={event.year} delay={index * 0.1}>
            <div className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline marker */}
              <div className="absolute left-8 md:left-1/2 -ml-3 w-6 h-6 rounded-full bg-primary ring-4 ring-background flex items-center justify-center z-10">
                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
              </div>

              {/* Content card */}
              <Card className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-[calc(50%+3rem)]' : 'md:ml-[calc(50%+3rem)]'} p-6 hover:shadow-lg transition-shadow duration-300`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="text-3xl font-bold text-primary">{event.year}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
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

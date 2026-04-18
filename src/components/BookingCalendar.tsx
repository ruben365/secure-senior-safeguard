import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Placeholder until Calendly embed is ready (https://calendly.com/invisionnetwork)

export default function BookingCalendar() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-orange-500" />
          <Clock className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Schedule a Free Call</h2>
        <p className="text-muted-foreground mb-6">
          Book a free 15-minute assessment call — we'll review your situation and recommend the best protection plan.
        </p>
        <Button asChild size="lg">
          <Link to="/contact">Book Free Assessment</Link>
        </Button>
      </div>
    </section>
  );
}

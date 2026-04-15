import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Video, Users } from "lucide-react";

interface Event {
  date: string;
  title: string;
  location: string;
  type: "In-Person" | "Virtual";
  description: string;
}

const upcomingEvents: Event[] = [
  {
    date: "May 8, 2026",
    title: "AI Scam Prevention Workshop",
    location: "Kettering Senior Center, Kettering OH",
    type: "In-Person",
    description: "Learn to spot deepfakes, voice clones, and phishing scams.",
  },
  {
    date: "May 15, 2026",
    title: "Business Cybersecurity Training",
    location: "Dayton Chamber of Commerce, Dayton OH",
    type: "In-Person",
    description: "Protect your small business from AI-powered fraud and data breaches.",
  },
  {
    date: "June 3, 2026",
    title: "Family Digital Safety Day",
    location: "Virtual — Zoom",
    type: "Virtual",
    description: "A fun, interactive session for the whole family. Learn safe browsing, password tips, and how to spot scams.",
  },
  {
    date: "June 19, 2026",
    title: "Senior Safety Tech Talk",
    location: "Beavercreek Community Library, Beavercreek OH",
    type: "In-Person",
    description: "Phone safety, Medicare fraud prevention, and grandparent scam protection.",
  },
];

export default function Events() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Workshops & Events in Ohio — InVision Network"
        description="Upcoming AI scam prevention workshops and cybersecurity events in Kettering, Dayton, and Southwest Ohio. Free and paid sessions for seniors, families, and businesses."
      />
      <Navigation />

      {/* Hero */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
          <Badge className="mb-4">Ohio Cybersecurity Events</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Upcoming Workshops &amp; Events
          </h1>
          <p className="text-lg text-muted-foreground">
            Join us in-person across Southwest Ohio or online from anywhere. Sessions designed for seniors, families, and businesses.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.title + event.date}
                className="rounded-2xl border bg-card p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Date badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 flex flex-col items-center justify-center text-center">
                    <Calendar className="w-5 h-5 text-orange-500 mb-1" />
                    <span className="text-xs font-bold text-orange-600 leading-tight text-center px-1">
                      {event.date}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <Badge variant={event.type === "Virtual" ? "secondary" : "default"} className="text-xs">
                      {event.type === "Virtual" ? (
                        <><Video className="w-3 h-3 mr-1" />{event.type}</>
                      ) : (
                        <><Users className="w-3 h-3 mr-1" />{event.type}</>
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {event.location}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <Button asChild size="sm">
                    <Link to="/contact">Register</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-4">Past Events</h2>
          <p className="text-muted-foreground">No past events to display yet.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">Want to Host a Workshop?</h2>
          <p className="text-muted-foreground mb-6">
            We bring cybersecurity workshops to senior centers, libraries, businesses, and community organizations across Ohio. Reach out to discuss bringing a session to your group.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

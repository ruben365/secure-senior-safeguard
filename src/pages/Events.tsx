import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingCalendar from "@/components/BookingCalendar";
import {
  Calendar,
  MapPin,
  Video,
  Users,
  ArrowRight,
  CalendarDays,
  Clock,
} from "lucide-react";

interface Event {
  date: string;
  month: string;
  day: string;
  title: string;
  location: string;
  type: "In-Person" | "Virtual";
  description: string;
  time?: string;
}

const upcomingEvents: Event[] = [
  {
    date: "May 8, 2026",
    month: "MAY",
    day: "8",
    title: "AI Scam Prevention Workshop",
    location: "Kettering Senior Center, Kettering OH",
    type: "In-Person",
    description:
      "Learn to spot deepfakes, voice clones, and phishing scams with hands-on demonstrations.",
    time: "10:00 AM – 12:00 PM",
  },
  {
    date: "May 15, 2026",
    month: "MAY",
    day: "15",
    title: "Business Cybersecurity Training",
    location: "Dayton Chamber of Commerce, Dayton OH",
    type: "In-Person",
    description:
      "Protect your small business from AI-powered fraud, data breaches, and social engineering.",
    time: "9:00 AM – 11:30 AM",
  },
  {
    date: "June 3, 2026",
    month: "JUN",
    day: "3",
    title: "Family Digital Safety Day",
    location: "Virtual — Zoom",
    type: "Virtual",
    description:
      "A fun, interactive session for the whole family. Safe browsing, password tips, and scam awareness.",
    time: "6:00 PM – 7:30 PM",
  },
  {
    date: "June 19, 2026",
    month: "JUN",
    day: "19",
    title: "Senior Safety Tech Talk",
    location: "Beavercreek Community Library, Beavercreek OH",
    type: "In-Person",
    description:
      "Phone safety, Medicare fraud prevention, and grandparent scam protection for seniors.",
    time: "1:00 PM – 3:00 PM",
  },
];

export default function Events() {
  return (
    <div className="min-h-screen">
      <SEO
        title={PAGE_SEO.events.title}
        description={PAGE_SEO.events.description}
        keywords={PAGE_SEO.events.keywords}
        structuredData={PAGE_SEO.events.structuredData}
        breadcrumbs={
          PAGE_SEO.events.breadcrumbs as Array<{ name: string; url: string }>
        }
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-16 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5] via-background to-background pointer-events-none" />
        <div className="hss-hero-glow" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-4 bg-[#d96c4a]/10 text-[#c45e3b] border-[#d96c4a]/20 font-semibold tracking-wide">
            Ohio Cybersecurity Events
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08]">
            Upcoming Workshops<br className="hidden sm:block" /> &amp; Events
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Join us in-person across Southwest Ohio or online from anywhere.
            Sessions designed for seniors, families, and businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <Users className="w-4 h-4 text-[#d96c4a]" />
              In-person &amp; virtual
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <CalendarDays className="w-4 h-4 text-[#d96c4a]" />
              4 upcoming events
            </span>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
          <div className="space-y-5">
            {upcomingEvents.map((event) => (
              <div
                key={event.title + event.date}
                className="hss-event-card rounded-2xl border bg-card overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Date column */}
                  <div className="sm:w-28 flex-shrink-0 bg-gradient-to-b from-[#fff8f5] to-[#fdf3ee] border-b sm:border-b-0 sm:border-r border-[#d96c4a]/15 flex flex-row sm:flex-col items-center justify-center gap-3 sm:gap-1 px-6 py-4 sm:py-6">
                    <span className="text-[11px] font-bold tracking-widest text-[#d96c4a] uppercase">
                      {event.month}
                    </span>
                    <span className="text-4xl font-extrabold text-foreground leading-none">
                      {event.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <h3 className="text-lg font-bold flex-1">{event.title}</h3>
                      <Badge
                        variant={event.type === "Virtual" ? "secondary" : "default"}
                        className="text-xs shrink-0"
                      >
                        {event.type === "Virtual" ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            {event.type}
                          </>
                        ) : (
                          <>
                            <Users className="w-3 h-3 mr-1" />
                            {event.type}
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#d96c4a]" />
                        {event.location}
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-[#d96c4a]" />
                          {event.time}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    <Button asChild size="sm">
                      <Link to="/contact" className="gap-1.5">
                        Register
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="py-16 section-warm-alt text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="hss-icon-bubble-lg mx-auto mb-5">
            <Calendar className="w-6 h-6 text-[#d96c4a]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Want to Host a Workshop?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We bring cybersecurity workshops to senior centers, libraries,
            businesses, and community organizations across Ohio. Reach out to
            discuss bringing a session to your group.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact" className="gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/training">View Training Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <BookingCalendar />
      <Footer />
    </div>
  );
}

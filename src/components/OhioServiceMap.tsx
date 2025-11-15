import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const serviceCities = [
  { name: "Cleveland", top: "25%", left: "75%" },
  { name: "Columbus", top: "50%", left: "60%" },
  { name: "Cincinnati", top: "80%", left: "35%" },
  { name: "Toledo", top: "15%", left: "65%" },
  { name: "Akron", top: "30%", left: "73%" },
  { name: "Dayton", top: "65%", left: "40%" },
  { name: "Youngstown", top: "25%", left: "85%" },
  { name: "Canton", top: "40%", left: "75%" },
  { name: "Parma", top: "27%", left: "70%" },
  { name: "Lorain", top: "22%", left: "68%" },
  { name: "Springfield", top: "60%", left: "50%" },
  { name: "Mansfield", top: "45%", left: "62%" }
];

export function OhioServiceMap() {
  return (
    <section className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
            <MapPin className="w-4 h-4 mr-2" />
            Service Areas
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Proudly Serving Ohio Families
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12">
            Based in Cleveland, serving communities across the state
          </p>
        </div>

        {/* Ohio Map Visualization */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border-4 border-primary/20 shadow-2xl overflow-hidden">
            {/* Ohio state outline using SVG */}
            <svg 
              viewBox="0 0 800 600" 
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified Ohio outline */}
              <path
                d="M 150 100 L 650 100 L 680 200 L 700 350 L 650 500 L 400 550 L 200 520 L 150 400 L 120 250 Z"
                fill="hsl(var(--primary) / 0.1)"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="3"
                className="transition-all duration-300"
              />
              
              {/* Grid pattern overlay */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* City markers */}
            {serviceCities.map((city, index) => (
              <div
                key={city.name}
                className="absolute group cursor-pointer"
                style={{ 
                  top: city.top, 
                  left: city.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pulsing ring animation */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" 
                     style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }} />
                
                {/* City marker */}
                <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent border-3 border-background shadow-lg flex items-center justify-center transition-transform hover:scale-125">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>

                {/* City label tooltip */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg px-3 py-1.5 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  <p className="text-sm font-semibold text-foreground">{city.name}</p>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-1px]">
                    <div className="border-4 border-transparent border-b-background/95" />
                  </div>
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent border border-background" />
                <span className="text-xs font-medium text-foreground">Service Location</span>
              </div>
            </div>
          </div>
        </div>

        {/* City badges */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          {serviceCities.map((city) => (
            <Badge 
              key={city.name} 
              variant="outline" 
              className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 hover:bg-primary/10 transition-colors cursor-pointer hover:border-primary"
            >
              {city.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

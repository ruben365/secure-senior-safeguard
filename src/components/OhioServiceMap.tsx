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
    <section className="py-8 md:py-12 lg:py-20 xl:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Badge className="mb-3 md:mb-4 text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 py-1.5 md:py-2" variant="secondary">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Service Areas
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 px-2">
            Proudly Serving Ohio Families
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-12 px-2">
            Based in Cleveland, serving communities across the state
          </p>
        </div>

        {/* Ohio Map Visualization */}
        <div className="max-w-5xl mx-auto mb-6 md:mb-8 px-2 sm:px-0">
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl md:rounded-2xl border-2 md:border-4 border-primary/20 shadow-xl md:shadow-2xl overflow-hidden">
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
                <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 sm:border-3 border-background shadow-md sm:shadow-lg flex items-center justify-center transition-transform hover:scale-125">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>

                {/* City label tooltip */}
                <div className="absolute top-full mt-1 sm:mt-2 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-primary/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg sm:shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{city.name}</p>
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
        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 justify-center px-2">
          {serviceCities.map((city) => (
            <Badge 
              key={city.name} 
              variant="outline" 
              className="text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 lg:py-3 hover:bg-primary/10 transition-colors cursor-pointer hover:border-primary"
            >
              {city.name}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

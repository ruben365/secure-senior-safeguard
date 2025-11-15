import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const verses = [
  {
    text: "The LORD is my light and my salvation—whom shall I fear? The LORD is the stronghold of my life—of whom shall I be afraid?",
    reference: "Psalm 27:1",
    theme: "Protection"
  },
  {
    text: "Be strong and courageous. Do not be afraid or terrified because of them, for the LORD your God goes with you; he will never leave you nor forsake you.",
    reference: "Deuteronomy 31:6",
    theme: "Courage"
  },
  {
    text: "For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    reference: "2 Timothy 1:7",
    theme: "Strength"
  },
  {
    text: "The name of the LORD is a fortified tower; the righteous run to it and are safe.",
    reference: "Proverbs 18:10",
    theme: "Safety"
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust"
  }
];

export function InspirationalVerses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verses.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + verses.length) % verses.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % verses.length);
  };

  const currentVerse = verses[currentIndex];

  return (
    <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <Badge className="mb-3 md:mb-4 text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 py-1.5 md:py-2" variant="secondary">
            <Quote className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Words of Encouragement
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 px-2">
            Faith & Protection
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Finding strength and courage in times of digital uncertainty
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-2 sm:px-0">
          <Card className="p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary/40 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif italic text-foreground leading-relaxed mb-4 md:mb-6">
                  "{currentVerse.text}"
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-primary">
                      — {currentVerse.reference}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs sm:text-sm">
                      {currentVerse.theme}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-6 md:mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              {/* Dots indicator */}
              <div className="flex gap-1.5 sm:gap-2">
                {verses.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? "bg-primary w-6 sm:w-8" 
                        : "w-1.5 sm:w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

import { Star, Play } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  age?: string;
  location: string;
  quote: string;
  image: string;
  rating?: number;
  videoUrl?: string;
  onVideoClick?: () => void;
}

const TestimonialCard = ({
  name,
  age,
  location,
  quote,
  image,
  rating = 5,
  videoUrl,
  onVideoClick,
}: TestimonialCardProps) => {
  return (
    <div className="ui-premium-panel ui-premium-panel--soft group relative isolate overflow-hidden rounded-[28px] p-5 sm:p-6 md:p-7">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0))]" />
      <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      {/* Large gradient quote mark background */}
      <div className="absolute -top-4 left-6 text-[120px] font-bold gradient-text-primary opacity-10 leading-none pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-500">
        "
      </div>

      <div className="relative z-10">
        <div className="mb-4 flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <Star
                className="w-3 h-3 fill-white text-white group-hover:rotate-12 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            </div>
          ))}
        </div>

        <p className="mb-6 text-[1.02rem] leading-relaxed text-foreground md:text-[1.085rem]">
          "{quote}"
        </p>

        <div className="flex items-center gap-4 border-t border-border/50 pt-4">
          <div className="relative">
            <img
              src={image}
              alt={`${name}'s testimonial`}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500 premium-4k-image"
              loading="lazy"
              decoding="async"
            />
            {videoUrl && onVideoClick && (
              <button
                onClick={onVideoClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full hover:bg-black/60 transition-all group/play"
                aria-label="Play video testimonial"
              >
                <Play
                  className="w-6 h-6 text-white group-hover/play:scale-110 transition-transform"
                  fill="white"
                />
              </button>
            )}
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
              {name}
              {age && `, ${age}`}
            </h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

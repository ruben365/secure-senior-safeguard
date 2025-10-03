import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  age?: string;
  location: string;
  quote: string;
  image: string;
  rating?: number;
}

const TestimonialCard = ({ name, age, location, quote, image, rating = 5 }: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-medium hover:shadow-large transition-shadow">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-foreground/80 mb-6 text-base leading-relaxed italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-bold text-foreground">
            {name}
            {age && `, ${age}`}
          </p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

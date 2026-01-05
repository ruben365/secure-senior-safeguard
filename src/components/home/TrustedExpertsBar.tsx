import { Star } from "lucide-react";

// Static placeholder avatars - no external image loading
const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-accent/20 text-accent", 
  "bg-emerald-500/20 text-emerald-600",
  "bg-amber-500/20 text-amber-600",
  "bg-rose-500/20 text-rose-600",
];

const initials = ["MC", "SW", "DP", "JR", "AL"];

export const TrustedExpertsBar = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Avatar Stack - CSS only, no external images */}
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {initials.map((initial, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-semibold ${avatarColors[i]}`}
                  style={{ zIndex: initials.length - i }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="ml-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">200+</span>
            <span>Satisfied Ohio Families</span>
          </div>
        </div>
      </div>
    </section>
  );
};

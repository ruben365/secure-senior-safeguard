import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpandableServiceCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  children: React.ReactNode;
  delay?: number;
  image?: string;
}

export const ExpandableServiceCard = ({
  icon,
  title,
  summary,
  children,
  image,
}: ExpandableServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={cn(
        "bg-[#111118] rounded-2xl border border-white/[0.06] hover:border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/[0.04] transition-all duration-300 overflow-hidden cursor-pointer",
        isExpanded && "border-amber-500/25 shadow-lg shadow-amber-500/[0.06]",
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            width={768}
            height={512}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111118]/90 to-transparent" />
        </div>
      )}

      <div className="p-5 min-h-[120px] flex items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {summary}
            </p>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="overflow-hidden">
          <div
            className="px-5 pb-5 pt-3 border-t border-white/[0.06]"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </Card>
  );
};

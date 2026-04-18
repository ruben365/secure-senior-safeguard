import { ArrowRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { memo, KeyboardEvent } from "react";

interface DashboardStatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  value: number;
  subtitle: string;
  subtitleColor?: "success" | "warning" | "destructive";
  gradientFrom: string;
  gradientTo: string;
  index: number;
  link?: string;
  isPulsing?: boolean;
  prefix?: string;
}

function DashboardStatCardBase({
  icon: Icon,
  iconBgColor,
  title,
  value,
  subtitle,
  subtitleColor = "success",
  gradientFrom,
  gradientTo,
  index,
  link,
  isPulsing = false,
  prefix = "",
}: DashboardStatCardProps) {
  const navigate = useNavigate();
  const { count: animatedValue, ref } = useCounterAnimation({
    end: value,
    duration: 1500,
  });

  const handleClick = () => {
    if (link) navigate(link);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!link) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const subtitleColorClass = {
    success: "text-emerald-400",
    warning: "text-yellow-400",
    destructive: "text-red-400",
  }[subtitleColor];

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={link ? "button" : undefined}
      tabIndex={link ? 0 : undefined}
      aria-label={link ? `${title} details` : undefined}
      className={`${link ? "cursor-pointer" : ""} transition-transform duration-200 hover:-translate-y-1`}
    >
      <Card
        className="relative overflow-hidden p-5 rounded-xl border-0 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBgColor} ${
            isPulsing ? "animate-pulse" : ""
          }`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-white mb-1 tabular-nums">
          {prefix}
          {animatedValue.toLocaleString()}
        </div>

        {/* Title */}
        <div className="text-sm text-white/70 mb-1.5">{title}</div>

        {/* Subtitle */}
        <div
          className={`text-xs font-medium flex items-center gap-1 ${subtitleColorClass}`}
        >
          {subtitle}
        </div>

        {/* Link arrow */}
        {link && (
          <div className="absolute bottom-3 right-3 text-white/40">
            <ArrowRight className="w-4 h-4" aria-hidden />
          </div>
        )}
      </Card>
    </div>
  );
}

export const DashboardStatCard = memo(DashboardStatCardBase);

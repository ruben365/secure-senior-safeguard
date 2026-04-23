import { ReactNode } from "react";
import {
  Shield,
  Star,
  Zap,
  Award,
  CheckCircle,
  TrendingUp,
  Heart,
  Clock,
  Lock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingBadgeProps {
  type:
    | "popular"
    | "recommended"
    | "best-value"
    | "limited"
    | "trusted"
    | "secure"
    | "fast"
    | "guaranteed"
    | "premium"
    | "new"
    | "hot"
    | "save"
    | "veteran";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const badgeConfig = {
  popular: {
    icon: Star,
    label: "MOST POPULAR",
    gradient: "from-primary via-accent to-primary",
    emoji: "⭐",
  },
  recommended: {
    icon: Award,
    label: "RECOMMENDED",
    gradient: "from-amber-500 to-orange-500",
    emoji: "🏆",
  },
  "best-value": {
    icon: TrendingUp,
    label: "BEST VALUE",
    gradient: "from-emerald-500 to-teal-500",
    emoji: "💎",
  },
  limited: {
    icon: Clock,
    label: "LIMITED TIME",
    gradient: "from-red-500 to-pink-500",
    emoji: "🔥",
  },
  trusted: {
    icon: Shield,
    label: "TRUSTED",
    gradient: "from-blue-500 to-indigo-500",
    emoji: "✅",
  },
  secure: {
    icon: Lock,
    label: "100% SECURE",
    gradient: "from-green-500 to-emerald-500",
    emoji: "🔒",
  },
  fast: {
    icon: Zap,
    label: "FAST SETUP",
    gradient: "from-yellow-500 to-amber-500",
    emoji: "⚡",
  },
  guaranteed: {
    icon: CheckCircle,
    label: "GUARANTEED",
    gradient: "from-orange-500 to-amber-500",
    emoji: "✓",
  },
  premium: {
    icon: Star,
    label: "PREMIUM",
    gradient: "from-orange-600 to-[#d96c4a]",
    emoji: "👑",
  },
  new: {
    icon: Zap,
    label: "NEW",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "🆕",
  },
  hot: {
    icon: TrendingUp,
    label: "HOT",
    gradient: "from-orange-500 to-red-500",
    emoji: "🔥",
  },
  save: {
    icon: TrendingUp,
    label: "SAVE 10%",
    gradient: "from-green-500 to-teal-500",
    emoji: "💰",
  },
  veteran: {
    icon: Heart,
    label: "VETERAN DISCOUNT",
    gradient: "from-blue-600 via-red-500 to-blue-600",
    emoji: "🇺🇸",
  },
};

export function PricingBadge({
  type,
  className = "",
  size = "md",
}: PricingBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-4 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };

  const solidBg: Record<string, string> = {
    popular: "bg-gradient-to-r from-orange-500 to-[#d96c4a] text-white border-orange-400/30 shadow-[0_4px_16px_rgba(217,108,74,0.4)]",
    recommended: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400/30 shadow-[0_4px_12px_rgba(245,158,11,0.35)]",
    "best-value": "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400/30 shadow-[0_4px_12px_rgba(16,185,129,0.35)]",
    limited: "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400/30 shadow-[0_4px_12px_rgba(239,68,68,0.35)]",
    trusted: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400/30 shadow-[0_4px_12px_rgba(59,130,246,0.35)]",
    secure: "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400/30 shadow-[0_4px_12px_rgba(34,197,94,0.35)]",
    fast: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-yellow-400/30 shadow-[0_4px_12px_rgba(234,179,8,0.35)]",
    guaranteed: "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-400/30 shadow-[0_4px_12px_rgba(249,115,22,0.35)]",
    premium: "bg-gradient-to-r from-orange-600 to-[#d96c4a] text-white border-orange-500/30 shadow-[0_4px_16px_rgba(217,108,74,0.4)]",
    new: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-400/30 shadow-[0_4px_12px_rgba(6,182,212,0.35)]",
    hot: "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400/30 shadow-[0_4px_12px_rgba(249,115,22,0.35)]",
    save: "bg-gradient-to-r from-green-500 to-teal-500 text-white border-green-400/30 shadow-[0_4px_12px_rgba(34,197,94,0.35)]",
    veteran: "bg-gradient-to-r from-blue-700 via-red-500 to-blue-700 text-white border-blue-400/30 shadow-[0_4px_12px_rgba(59,130,246,0.35)]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        "border font-bold tracking-wider rounded-full",
        solidBg[type] ?? solidBg.popular,
        sizeClasses[size],
        className,
      )}
    >
      <span className="text-sm leading-none">{config.emoji}</span>
      <span>{config.label}</span>
    </div>
  );
}

export function TrustBadgeInline({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium backdrop-blur-sm">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}

export function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-2 p-3 bg-background/70 backdrop-blur-xl border border-border/30 rounded-xl shadow-[0_2px_8px_hsl(var(--coral-300)/0.08),0_4px_12px_hsl(var(--lavender-300)/0.06)]">
      <Shield className="w-5 h-5 text-success" />
      <span className="text-sm font-semibold text-success">
        30-Day Money-Back Guarantee
      </span>
      <CheckCircle className="w-4 h-4 text-success" />
    </div>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Lock className="w-3.5 h-3.5 text-primary" />
        <span className="text-primary font-medium">TLS Encryption</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Shield className="w-3.5 h-3.5 text-success" />
        <span className="text-success font-medium">Privacy-First</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Users className="w-3.5 h-3.5 text-accent" />
        <span className="text-accent font-medium">500+ Protected</span>
      </div>
    </div>
  );
}

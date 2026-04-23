import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface GlowButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  size?: "default" | "lg";
  className?: string;
}

export function GlowButton({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "default",
  className,
}: GlowButtonProps) {
  const classes = cn(
    variant === "primary" && "btn-premium",
    variant === "outline" &&
      "inline-flex items-center gap-2 font-semibold border-2 border-[hsl(var(--primary)/0.3)] text-[hsl(var(--primary))] bg-transparent hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.5)] transition-all rounded-xl cursor-pointer",
    size === "default" && "px-4 py-3 text-sm",
    size === "lg" && "px-5 py-4 text-base",
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

import { useRef } from "react";

interface UseCounterAnimationOptions {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
}

export const useCounterAnimation = ({
  end,
  suffix = "",
  prefix = "",
}: UseCounterAnimationOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const displayValue = `${prefix}${end.toLocaleString()}${suffix}`;

  return { ref, count: end, displayValue, isVisible: true };
};

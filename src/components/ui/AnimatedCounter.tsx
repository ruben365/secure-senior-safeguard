interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) => {
  return (
    <span className={className}>
      {prefix}
      {end.toFixed(decimals)}
      {suffix}
    </span>
  );
};

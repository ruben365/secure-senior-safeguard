import { useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

export const useParallax = ({ speed = 0.5, offset = 0 }: UseParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (1000 * speed)]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.7]);

  return { ref, y, opacity };
};

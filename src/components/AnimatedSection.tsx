import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  stagger?: boolean;
}

const AnimatedSection = ({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0,
  stagger = false
}: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 }
  };

  const variants = {
    hidden: { 
      opacity: 0, 
      ...directions[direction]
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.9] as const,
        delay
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger ? staggerVariants : variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

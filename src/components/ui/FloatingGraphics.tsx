interface FloatingGraphicsProps {
  variant?: "orbs" | "shapes" | "particles" | "mesh" | "hexagons";
  className?: string;
  intensity?: "light" | "medium" | "strong";
}

// Simplified - no floating graphics, removed for performance
export const FloatingGraphics = (_props: FloatingGraphicsProps) => null;

export default FloatingGraphics;

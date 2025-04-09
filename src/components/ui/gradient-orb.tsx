import { cn } from "@/lib/utils";

interface GradientOrbProps {
  color: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  opacity?: number;
  delay?: number;
}

const sizeMap = {
  xs: "w-1/12 h-1/12",
  sm: "w-1/6 h-1/6",
  md: "w-1/35 h-1/35",
  lg: "w-1/3 h-1/3",
  xl: "w-1/2 h-1/2",
  xxl: "w-full h-full",
};

const positionMap = {
  "top-left": "-top-1/5 -left-1/5",
  "top-right": "-top-1/5 -right-1/5",
  "bottom-left": "-bottom-1/5 -left-1/5",
  "bottom-right": "-bottom-1/5 -right-1/5",
};

export function GradientOrb({
  color,
  size = "md",
  position,
  opacity = 0.1,
  delay = 0,
}: GradientOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl animate-pulse",
        sizeMap[size],
        positionMap[position]
      )}
      style={{
        backgroundColor: color,
        opacity: opacity,
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

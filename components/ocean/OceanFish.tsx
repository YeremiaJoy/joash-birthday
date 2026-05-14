// components/ocean/OceanFish.tsx
import { CSSProperties } from "react";

interface OceanFishProps {
  className?: string;
  size?: number;
  animationDuration?: string;
  animationDelay?: string;
  flipY?: boolean;
  style?: CSSProperties;
}

export default function OceanFish({
  className = "",
  size = 40,
  animationDuration = "12s",
  animationDelay = "0s",
  flipY = false,
  style,
}: OceanFishProps) {
  const h = Math.round(size * 0.7);
  return (
    <div
      className={`pointer-events-none select-none absolute ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: h,
        animation: `fish-swim ${animationDuration} linear ${animationDelay} infinite`,
        transform: flipY ? "scaleY(-1)" : undefined,
        ...style,
      }}
    >
      <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Tail */}
        <path d="M 16,28 L 0,14 Q 10,28 0,42 Z" fill="#D4845A" />
        {/* Body */}
        <ellipse cx="44" cy="28" rx="30" ry="18" fill="#E8A87C" />
        {/* Top fin */}
        <path d="M 36,10 Q 48,3 54,14 Q 44,14 36,10 Z" fill="#E8A87C" />
        {/* Bottom fin */}
        <path d="M 30,38 Q 36,47 44,45 Q 36,38 30,38 Z" fill="#D4845A" opacity="0.8" />
        {/* Scale stripes */}
        <path d="M 52,14 Q 58,28 52,42" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.5" />
        <path d="M 38,11 Q 44,28 38,45" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.4" />
        {/* Eye */}
        <circle cx="64" cy="24" r="5.5" fill="white" />
        <circle cx="65" cy="24" r="3.5" fill="#2C5F7A" />
        <circle cx="66" cy="23" r="1.2" fill="white" />
        {/* Mouth */}
        <path d="M 72,29 Q 76,32 72,35" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        {/* Highlight */}
        <ellipse cx="50" cy="21" rx="9" ry="5" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}

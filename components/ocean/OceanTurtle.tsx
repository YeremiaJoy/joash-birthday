// components/ocean/OceanTurtle.tsx
interface OceanTurtleProps {
  className?: string;
  size?: number;
  animationDuration?: string;
  animationDelay?: string;
}

export default function OceanTurtle({
  className = "",
  size = 70,
  animationDuration = "18s",
  animationDelay = "0s",
}: OceanTurtleProps) {
  return (
    <div
      className={`pointer-events-none select-none absolute ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        animation: `turtle-swim ${animationDuration} linear ${animationDelay} infinite`,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Back flippers */}
        <path d="M 25,68 Q 10,80 12,68 Q 22,62 28,64 Z" fill="#6BAF9A" />
        <path d="M 25,32 Q 10,20 12,32 Q 22,38 28,36 Z" fill="#6BAF9A" />
        {/* Front flippers */}
        <path d="M 68,68 Q 84,80 82,68 Q 72,62 67,64 Z" fill="#6BAF9A" />
        <path d="M 68,32 Q 84,20 82,32 Q 72,38 67,36 Z" fill="#6BAF9A" />
        {/* Shell */}
        <ellipse cx="48" cy="50" rx="26" ry="22" fill="#8FC4B7" />
        {/* Shell pattern */}
        <line x1="48" y1="28" x2="48" y2="72" stroke="#2C5F7A" strokeWidth="1" opacity="0.35" />
        <line x1="22" y1="50" x2="74" y2="50" stroke="#2C5F7A" strokeWidth="1" opacity="0.35" />
        <line x1="30" y1="32" x2="66" y2="68" stroke="#2C5F7A" strokeWidth="1" opacity="0.3" />
        <line x1="66" y1="32" x2="30" y2="68" stroke="#2C5F7A" strokeWidth="1" opacity="0.3" />
        <ellipse cx="48" cy="50" rx="12" ry="10" fill="#6BAF9A" opacity="0.5" />
        {/* Shell highlight */}
        <ellipse cx="42" cy="42" rx="8" ry="5" fill="white" opacity="0.25" />
        {/* Head */}
        <ellipse cx="76" cy="50" rx="11" ry="9" fill="#6BAF9A" />
        {/* Eye */}
        <circle cx="81" cy="46" r="3" fill="#2C5F7A" />
        <circle cx="82" cy="45" r="1.2" fill="white" />
        {/* Mouth */}
        <path d="M 82,54 Q 86,57 83,60" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tail */}
        <path d="M 22,50 Q 8,46 6,50 Q 8,54 22,50 Z" fill="#6BAF9A" />
      </svg>
    </div>
  );
}

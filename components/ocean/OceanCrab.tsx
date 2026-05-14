// components/ocean/OceanCrab.tsx
interface OceanCrabProps {
  className?: string;
  size?: number;
}

export default function OceanCrab({ className = "", size = 50 }: OceanCrabProps) {
  const h = Math.round(size * 0.8);
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: h }}
    >
      <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Walking legs */}
        <line x1="30" y1="52" x2="14" y2="68" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="60" x2="20" y2="74" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="52" x2="86" y2="68" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="60" x2="80" y2="74" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left claw */}
        <path
          d="M 26,46 Q 10,36 8,26 Q 16,20 20,30 Q 22,26 26,22 Q 32,28 24,34 Q 24,40 26,46 Z"
          fill="#E8967A"
        />
        {/* Right claw */}
        <path
          d="M 74,46 Q 90,36 92,26 Q 84,20 80,30 Q 78,26 74,22 Q 68,28 76,34 Q 76,40 74,46 Z"
          fill="#E8967A"
        />
        {/* Body */}
        <ellipse cx="50" cy="50" rx="26" ry="19" fill="#E8967A" />
        {/* Shell texture dots */}
        <circle cx="44" cy="46" r="3" fill="#C4735A" opacity="0.5" />
        <circle cx="56" cy="46" r="3" fill="#C4735A" opacity="0.5" />
        <circle cx="50" cy="40" r="2.5" fill="#C4735A" opacity="0.45" />
        <circle cx="50" cy="56" r="2" fill="#C4735A" opacity="0.4" />
        {/* Eye stalks */}
        <line x1="42" y1="34" x2="39" y2="26" stroke="#C4735A" strokeWidth="2" />
        <circle cx="39" cy="23" r="4.5" fill="#2C5F7A" />
        <circle cx="40" cy="22" r="1.8" fill="white" />
        <line x1="58" y1="34" x2="61" y2="26" stroke="#C4735A" strokeWidth="2" />
        <circle cx="61" cy="23" r="4.5" fill="#2C5F7A" />
        <circle cx="62" cy="22" r="1.8" fill="white" />
        {/* Body highlight */}
        <ellipse cx="44" cy="42" rx="10" ry="5" fill="white" opacity="0.2" />
      </svg>
    </div>
  );
}

// components/ocean/OceanShell.tsx
interface OceanShellProps {
  className?: string;
  size?: number;
}

export default function OceanShell({ className = "", size = 40 }: OceanShellProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Main shell body */}
        <path
          d="M 35,6 Q 64,18 60,48 Q 52,66 35,64 Q 18,66 10,48 Q 6,18 35,6 Z"
          fill="#E8D5B7"
        />
        {/* Spiral ridges */}
        <path
          d="M 35,6 Q 56,18 52,38 Q 47,54 35,56"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.8"
        />
        <path
          d="M 35,6 Q 14,18 18,38 Q 23,54 35,56"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.8"
        />
        <path
          d="M 35,56 Q 56,50 56,38 Q 56,22 46,16"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.2"
        />
        <path
          d="M 35,56 Q 14,52 14,38 Q 14,24 24,16"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.2"
        />
        {/* Center point */}
        <circle cx="35" cy="56" r="5.5" fill="#C4A882" />
        <circle cx="35" cy="56" r="2.5" fill="#E8D5B7" />
        {/* Highlight */}
        <ellipse
          cx="28"
          cy="24"
          rx="7"
          ry="11"
          fill="white"
          opacity="0.3"
          transform="rotate(-20 28 24)"
        />
      </svg>
    </div>
  );
}

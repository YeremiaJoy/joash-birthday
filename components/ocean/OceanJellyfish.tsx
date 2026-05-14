// components/ocean/OceanJellyfish.tsx
interface OceanJellyfishProps {
  className?: string;
  size?: number;
  animationDelay?: string;
}

export default function OceanJellyfish({
  className = "",
  size = 70,
  animationDelay = "0s",
}: OceanJellyfishProps) {
  const h = Math.round(size * 1.4);
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: h,
        animation: `jellyfish-float 3.5s ease-in-out ${animationDelay} infinite`,
      }}
    >
      <svg viewBox="0 0 80 112" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Dome */}
        <path
          d="M 5,52 Q 5,4 40,4 Q 75,4 75,52 Z"
          fill="#C5DFF0"
          opacity="0.75"
        />
        {/* Inner dome highlight */}
        <path
          d="M 14,52 Q 14,18 40,14 Q 66,18 66,52 Z"
          fill="white"
          opacity="0.35"
        />
        {/* Dome spots */}
        <circle cx="28" cy="26" r="5" fill="white" opacity="0.45" />
        <circle cx="50" cy="20" r="4" fill="white" opacity="0.4" />
        <circle cx="46" cy="38" r="3" fill="white" opacity="0.35" />
        {/* Tentacles */}
        <path d="M 20,52 Q 16,64 22,76 Q 16,88 22,100" stroke="#A8D8EA" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30,54 Q 26,66 32,78 Q 26,90 32,104" stroke="#A8D8EA" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 40,55 Q 36,67 42,79 Q 36,91 42,106" stroke="#C5DFF0" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 50,54 Q 54,66 48,78 Q 54,90 48,104" stroke="#A8D8EA" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 60,52 Q 64,64 58,76 Q 64,88 58,100" stroke="#A8D8EA" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        {/* Face */}
        <circle cx="33" cy="40" r="2.5" fill="#2C5F7A" opacity="0.6" />
        <circle cx="47" cy="40" r="2.5" fill="#2C5F7A" opacity="0.6" />
        <path d="M 36,46 Q 40,50 44,46" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    </div>
  );
}

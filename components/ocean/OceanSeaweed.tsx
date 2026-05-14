// components/ocean/OceanSeaweed.tsx
interface OceanSeaweedProps {
  className?: string;
  size?: number;
  animationDelay?: string;
}

export default function OceanSeaweed({
  className = "",
  size = 80,
  animationDelay = "0s",
}: OceanSeaweedProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size * 1.25,
        transformOrigin: "bottom center",
        animation: `seaweed-sway 2.5s ease-in-out ${animationDelay} infinite alternate`,
      }}
    >
      <svg
        viewBox="0 0 60 100"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
      >
        {/* Left stalk */}
        <path
          d="M 15,100 Q 8,82 18,66 Q 8,50 16,34 Q 8,18 16,4"
          stroke="#6BAF9A"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path d="M 15,80 Q 2,70 5,58 Q 14,62 16,72 Z" fill="#6BAF9A" />
        <path d="M 15,54 Q 2,44 5,32 Q 14,36 16,46 Z" fill="#6BAF9A" />
        <path d="M 15,28 Q 3,18 6,6 Q 15,10 16,20 Z" fill="#6BAF9A" />

        {/* Right stalk */}
        <path
          d="M 44,100 Q 52,82 42,66 Q 52,50 44,34 Q 52,18 44,4"
          stroke="#8FC4B7"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <path d="M 44,76 Q 57,66 55,54 Q 46,58 44,68 Z" fill="#8FC4B7" />
        <path d="M 44,50 Q 57,40 55,28 Q 46,32 44,42 Z" fill="#8FC4B7" />
      </svg>
    </div>
  );
}

// components/ocean/WaveDivider.tsx
interface WaveDividerProps {
  fill: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ fill, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 430 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 60, display: "block" }}
      >
        <path
          d="M0,30 C72,52 144,8 216,30 C288,52 360,8 430,30 L430,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

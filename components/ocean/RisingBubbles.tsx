// components/ocean/RisingBubbles.tsx
"use client";

const BUBBLES = [
  { size: 12, left: "8%",  duration: "8s",   delay: "0s" },
  { size: 20, left: "18%", duration: "11s",  delay: "1.5s" },
  { size: 8,  left: "30%", duration: "7s",   delay: "0.8s" },
  { size: 16, left: "44%", duration: "9s",   delay: "2.2s" },
  { size: 10, left: "58%", duration: "10s",  delay: "0.3s" },
  { size: 24, left: "68%", duration: "12s",  delay: "1.1s" },
  { size: 14, left: "78%", duration: "8.5s", delay: "3s" },
  { size: 9,  left: "88%", duration: "7.5s", delay: "0.6s" },
  { size: 18, left: "95%", duration: "10.5s",delay: "2.8s" },
];

export default function RisingBubbles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full border border-white/50"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            backgroundColor: "rgba(248, 251, 255, 0.5)",
            animation: `bubble-rise ${b.duration} ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

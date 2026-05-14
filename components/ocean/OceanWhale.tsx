// components/ocean/OceanWhale.tsx
"use client";

import { motion } from "framer-motion";

interface OceanWhaleProps {
  className?: string;
  size?: number;
}

export default function OceanWhale({ className = "", size = 180 }: OceanWhaleProps) {
  const h = Math.round(size * 0.6);
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      style={{ width: size, height: h }}
    >
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={h}
      >
        {/* Main body */}
        <path
          d="M 38,62 C 38,28 150,22 168,62 C 150,100 38,98 38,62 Z"
          fill="#8BAFC7"
        />
        {/* Belly highlight */}
        <path
          d="M 42,70 C 70,88 135,88 162,72 C 135,95 70,95 42,70 Z"
          fill="#C5DFF0"
          opacity="0.75"
        />
        {/* Tail flukes */}
        <path
          d="M 38,62 L 8,38 Q 22,60 8,84 Z"
          fill="#7A9EBA"
        />
        {/* Pectoral fin */}
        <path
          d="M 95,78 L 78,102 Q 100,88 115,80 Z"
          fill="#7A9EBA"
        />
        {/* Dorsal fin */}
        <path
          d="M 110,28 L 100,22 Q 95,30 105,36 Z"
          fill="#7A9EBA"
        />
        {/* Eye */}
        <circle cx="152" cy="54" r="5" fill="#2C5F7A" />
        <circle cx="153" cy="53" r="2" fill="white" />
        {/* Smile */}
        <path
          d="M 155,62 Q 162,67 157,72"
          stroke="#2C5F7A"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body highlight */}
        <ellipse
          cx="120"
          cy="38"
          rx="22"
          ry="9"
          fill="white"
          opacity="0.25"
        />
        {/* Barnacle dots */}
        <circle cx="70" cy="58" r="3" fill="#6A8FAA" opacity="0.4" />
        <circle cx="85" cy="72" r="2.5" fill="#6A8FAA" opacity="0.35" />
        <circle cx="55" cy="66" r="2" fill="#6A8FAA" opacity="0.3" />
      </svg>
    </motion.div>
  );
}

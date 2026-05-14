// components/PersonalizedBanner.tsx
"use client";

import { motion } from "framer-motion";

interface PersonalizedBannerProps {
  name: string;
}

export default function PersonalizedBanner({ name }: PersonalizedBannerProps) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full bg-gradient-to-r from-[#A8D8EA] to-[#C5DFF0] px-4 py-4 text-center relative overflow-hidden"
    >
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🐚
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🐚
      </span>

      <p className="font-heading text-base text-lg text-[#2C5F7A] px-10 drop-shadow leading-tight">
        Hi, {name}! 👋{" "}
        <span className="block text-sm mt-0.5">
          You&apos;re personally invited to Joash&apos;s 1st Birthday! 🐠
        </span>
      </p>
    </motion.div>
  );
}

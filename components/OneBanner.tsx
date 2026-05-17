"use client";

import { motion } from "framer-motion";

export default function OneBanner() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#E8F4FD] via-[#C5DFF0] to-[#A8D8EA] px-4 py-3 text-center"
    >
      <h1 className="font-heading text-xl text-[#2C5F7A] drop-shadow leading-tight">
        Joash's ONEderful Year 🐚
      </h1>
    </motion.header>
  );
}

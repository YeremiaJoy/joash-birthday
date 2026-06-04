"use client";

import { motion } from "framer-motion";

export default function OneBanner() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.5 }}
      className="w-full overflow-hidden h-[120px]"
    >
      <img src="/image/banner.png" alt="Joash's ONEderful Year" className="w-full h-full object-cover" />
    </motion.header>
  );
}

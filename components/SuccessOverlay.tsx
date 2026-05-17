// components/SuccessOverlay.tsx
"use client";

import { motion } from "framer-motion";

interface SuccessOverlayProps {
  onClose: () => void;
}

export default function SuccessOverlay({ onClose }: SuccessOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C5F7A]/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-[#F8FBFF] rounded-4xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-[#A8D8EA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🐠🌊🐚</div>
        <h2 className="font-heading text-3xl text-[#2C5F7A] mb-2">Hore!</h2>
        <p className="font-heading text-2xl text-[#2C5F7A] mb-6">
          Sampai jumpa di pestanya! 🐠🎉
        </p>
        <p className="text-[#8FC4B7] text-sm mb-6 font-body">
          Kami tidak sabar menunggu bertemu kamu!
        </p>
        <button
          onClick={onClose}
          className="bg-[#E8967A] text-[#F8FBFF] font-heading text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Tutup 🐚
        </button>
      </motion.div>
    </motion.div>
  );
}

// components/BirthdayHighlight.tsx
"use client";

import { motion } from "framer-motion";
import OceanTurtle from "./ocean/OceanTurtle";
import OceanFish from "./ocean/OceanFish";
import WaveDivider from "./ocean/WaveDivider";

export default function BirthdayHighlight() {
  return (
    <>
      <WaveDivider fill="#F8FBFF" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative px-4 py-10 bg-[#F8FBFF] overflow-hidden"
      >
        {/* Decorative fish swimming across */}
        <OceanFish
          size={38}
          animationDuration="14s"
          animationDelay="2s"
          style={{ top: 22 }}
        />
        <OceanFish
          size={28}
          animationDuration="18s"
          animationDelay="6s"
          flipY
          style={{ top: 80 }}
        />

        <div className="bg-gradient-to-br from-[#E8F4FD] to-[#C5DFF0] rounded-4xl shadow-sm mb-6 relative">
          <div className="px-6 pt-6">
            <div className="text-center mb-4">
              <span className="text-4xl">🐋 🌊 🐠</span>
            </div>
            <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-4">
              The Birthday Boy!
            </h2>
            <div className="space-y-2 text-center font-body text-[#2C5F7A]">
              <p className="text-xl font-bold">Joash Jidly Yakobus</p>
              <p>Born: July 6, 2025 👶</p>
              <p className="font-bold text-lg text-[#E8967A]">Turning 1 Year Old 🐚</p>
              <p>Party: July 11, 2026 🎉</p>
            </div>
          </div>

          {/* Turtle swimming at the bottom of the card */}
          <div className="relative h-16 mt-4 mb-6 overflow-hidden rounded-xl">
            <OceanTurtle size={60} animationDuration="20s" animationDelay="1s" />
          </div>
        </div>

        <p className="font-body text-center text-[#2C5F7A] text-base mb-6 leading-relaxed">
          Little Joash is turning{" "}
          <span className="font-bold text-[#E8967A]">ONE</span> and we want{" "}
          <span className="font-bold">YOU</span> there to celebrate! 🥳
        </p>

        <div
          className="relative w-full rounded-3xl overflow-hidden border-4 border-dashed border-[#8FC4B7] bg-[#E8F4FD] flex flex-col items-center justify-center"
          style={{ aspectRatio: "16/9" }}
        >
          <span className="text-5xl mb-2">▶️</span>
          <span className="text-sm font-body text-[#8FC4B7] text-center px-4">
            [ Birthday Video / Slideshow Here ]
          </span>
        </div>
      </motion.section>
    </>
  );
}

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
          animationDelay="1s"
          style={{ top: 22 }}
        />
        <OceanFish
          size={28}
          animationDuration="18s"
          animationDelay="1s"
          flipY
          style={{ top: 95 }}
        />

        <h2 className="font-heading text-3xl text-center text-[#2C5F7A] relative z-10">
          Joash's Video
        </h2>
        <p className="font-body text-center text-[#2C5F7A] text-base mb-4 px-4">
          From birth to his first birthday!
        </p>

        <div
          className="relative w-full rounded-3xl overflow-hidden border-4 border-dashed border-[#8FC4B7] bg-[#E8F4FD] flex flex-col items-center justify-center"
          style={{ aspectRatio: "16/9" }}
        >
          <span className="text-5xl mb-2">▶️</span>
          <span className="text-sm font-body text-[#8FC4B7] text-center px-4">
            [ Video / Slideshow Ulang Tahun Di Sini ]
          </span>
        </div>

        <div className="relative h-16 mt-4 overflow-hidden rounded-xl">
          <OceanTurtle size={60} animationDuration="20s" animationDelay="1s" />
        </div>
      </motion.section>
    </>
  );
}

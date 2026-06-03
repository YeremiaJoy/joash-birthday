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

        <div className="relative w-full rounded-3xl overflow-hidden border-4 border-[#8FC4B7] bg-black">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/video/PhotoClip-Joash.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative h-16 mt-4 overflow-hidden rounded-xl">
          <OceanTurtle size={60} animationDuration="20s" animationDelay="1s" />
        </div>
      </motion.section>
    </>
  );
}

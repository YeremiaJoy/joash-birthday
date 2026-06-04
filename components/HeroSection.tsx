// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import RisingBubbles from "./ocean/RisingBubbles";
import OceanWhale from "./ocean/OceanWhale";
import OceanJellyfish from "./ocean/OceanJellyfish";
import OceanSeaweed from "./ocean/OceanSeaweed";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E8F4FD] via-[#C5DFF0] to-[#A8D8EA] px-4">
      <RisingBubbles />

      {/* Whale — right side */}
      <OceanWhale
        className="absolute right-[-10px] top-1/3 z-0 opacity-80"
        size={170}
      />

      {/* Jellyfish — upper left */}
      <OceanJellyfish
        className="absolute left-4 top-16 z-0"
        size={65}
        animationDelay="0s"
      />
      {/* Jellyfish — center-right mid */}
      <OceanJellyfish
        className="absolute right-12 top-40 z-0"
        size={48}
        animationDelay="1.8s"
      />

      {/* Seaweed — bottom left */}
      <OceanSeaweed
        className="absolute bottom-0 left-2 z-0 opacity-90"
        size={70}
        animationDelay="0s"
      />
      {/* Seaweed — bottom right */}
      <OceanSeaweed
        className="absolute bottom-0 right-6 z-0 opacity-80"
        size={55}
        animationDelay="0.8s"
      />

      <div className="relative z-10 flex flex-col items-center text-center pt-8 pb-12">
        <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-4">
          The Birthday Boy!
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-ocean-foam rounded-2xl p-3 shadow-xl mb-8 border-4 border-[#A8D8EA]"
        >
          <div
            className="border-4 border-dashed border-[#8FC4B7] rounded-xl flex flex-col items-center justify-center text-[#8FC4B7] bg-[#E8F4FD]"
            style={{ width: 380, height: 280, backgroundColor: "#eef9fc" }}
          >
            <video
              src="/video/ai-Joash.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-md"
              style={{ width: 360, height: 240, objectFit: "cover" }}
              aria-label="Video Joash"
            />
          </div>
          <div className="space-y-2 text-center font-body text-[#2C5F7A] mt-2">
            <p className="text-xl font-bold">Joash Jidly Yakobus</p>
            <p>Born: 6 Juli 2025 👶</p>
            <p className="font-bold text-lg text-[#E8967A]">Turning 1 Year Old! 🐚</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-md text-[#2C5F7A] max-w-xs"
        >
          Little Joash is turning <strong>ONE</strong> and we want YOU there to celebrate with us! 🥳
        </motion.p>
        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 inline-block text-[#2C5F7A] hover:text-[#E8967A]"
          aria-label="Scroll to RSVP"
        >
          <span className="text-2xl animate-bounce" aria-hidden="true">⬇️</span>
        </motion.a>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 bg-[#E8967A] text-[#F8FBFF] font-heading text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-block min-h-[44px]"
        >
          RSVP Now 🐠
        </motion.a>
      </div>
    </section>
  );
}

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-ocean-foam rounded-2xl p-3 shadow-xl mb-8 border-4 border-[#A8D8EA]"
        >
          <div
            className="border-4 border-dashed border-[#8FC4B7] rounded-xl flex flex-col items-center justify-center text-[#8FC4B7] bg-[#E8F4FD]"
            style={{ width: 216, height: 280 }}
          >
            <span className="text-5xl mb-3">📸</span>
            <span className="text-sm font-body text-center px-2">
              [ Joash&apos;s Photo Here ]
            </span>
          </div>
          <p className="font-heading text-[#2C5F7A] text-xs text-center mt-2">
            Joash Jidly Yakobus
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl text-[#2C5F7A] mb-3 drop-shadow leading-tight px-4"
        >
          Joash&apos;s ONEderful Year 🐚
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-lg text-[#2C5F7A] max-w-xs"
        >
          Come celebrate Joash&apos;s 1st Birthday! 🐚
        </motion.p>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 bg-[#E8967A] text-[#F8FBFF] font-heading text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-block min-h-[44px]"
        >
          RSVP Now 🐠
        </motion.a>
      </div>
    </section>
  );
}

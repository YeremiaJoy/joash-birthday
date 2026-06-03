// components/LyricsSection.tsx
"use client";

import { motion } from "framer-motion";
import WaveDivider from "./ocean/WaveDivider";
import OceanJellyfish from "./ocean/OceanJellyfish";
import RisingBubbles from "./ocean/RisingBubbles";

interface LyricBlock {
  section: string;
  lines: string[];
  highlight?: boolean;
}

const LYRICS: LyricBlock[] = [
  {
    section: "Verse 1",
    lines: [
      "One year old today",
      "Joash Jidly Yakobus",
      "Tiny feet on the sand",
      "Little star in the blue",
      "",
      "Sea turtles smile wide",
      "Fish parade all around",
      "Coral crowns in the foam",
      "For your birthday sound",
    ],
  },
  {
    section: "Pre-Chorus",
    lines: [
      "Ooh, the waves go high",
      "Ooh, the shells reply",
      "One sweet year of you",
      "Shining through the tide",
    ],
  },
  {
    section: "Chorus 1",
    lines: [
      "Happy birthday, Joash",
      "Happy birthday, Joash",
      "Happy birthday to you",
      "Happy, happy birthday",
      "One year old, hooray",
      "Under the sea today",
    ],
    highlight: true,
  },
  {
    section: "Chorus 2",
    lines: [
      "Happy birthday, Joash",
      "Happy birthday, Joash",
      "Happy birthday, hooray",
      "Happy, happy birthday",
      "Bubble up and play",
      "Under the sea today",
    ],
  },
  {
    section: "Verse 2",
    lines: [
      "Blue balloons in the bay",
      "Seahorse dancing near you",
      "Starfish claps with the tide",
      "Everybody loves you",
      "",
      "Cake with ocean-blue swirls",
      "Smiles like silver fish",
      "Mama, papa, and all",
      "Send you every wish",
    ],
  },
  {
    section: "Bridge",
    lines: [
      "Little king of the reef",
      "Little joy in the sea",
      "May your days grow bright",
      "May your heart stay free",
    ],
  },
];

export default function LyricsSection() {
  return (
    <>
      <WaveDivider fill="#071B2A" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative -mt-px px-4 py-10 bg-gradient-to-b from-[#071B2A] to-[#0D2D42] overflow-hidden"
      >
        <RisingBubbles />

        <OceanJellyfish
          className="absolute top-4 right-3 opacity-25"
          size={58}
          animationDelay="0.4s"
        />
        <OceanJellyfish
          className="absolute top-28 left-2 opacity-15"
          size={42}
          animationDelay="1.8s"
        />

        {/* Header */}
        <div className="relative z-10 mb-6 text-center">
          <h2 className="font-heading text-3xl text-[#A8D8EA]">
            Theme Song 🎵
          </h2>
          <p className="font-body text-sm text-[#8FC4B7] mt-2 px-4 leading-relaxed">
            Lagu ini dibuat khusus buat Joash, temen-temen semua nanti kita nyanyi bareng bagian chorus 1 di hokben ya
          </p>
        </div>

        {/* Lyrics blocks */}
        <div className="relative z-10 space-y-5">
          {LYRICS.map((block, i) => (
            <motion.div
              key={block.section}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`rounded-2xl px-5 py-4 ${
                block.highlight
                  ? "bg-[#A8D8EA]/15 border border-[#A8D8EA]/30"
                  : "bg-white/5 border border-white/8"
              }`}
            >
              <p
                className={`font-heading text-xs tracking-widest uppercase mb-3 ${
                  block.highlight ? "text-[#A8D8EA]" : "text-[#8FC4B7]/70"
                }`}
              >
                {block.section}
                {block.highlight && (
                  <span className="ml-2 text-[10px] normal-case tracking-normal bg-[#A8D8EA]/20 text-[#A8D8EA] px-2 py-0.5 rounded-full">
                    nyanyi bareng!
                  </span>
                )}
              </p>
              <div className="space-y-1">
                {block.lines.map((line, j) =>
                  line === "" ? (
                    <div key={j} className="h-2" />
                  ) : (
                    <p
                      key={j}
                      className={`font-body text-base leading-relaxed ${
                        block.highlight ? "text-white" : "text-[#A8D8EA]/80"
                      }`}
                    >
                      {line}
                    </p>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

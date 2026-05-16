"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OceanSeaweed from "./ocean/OceanSeaweed";
import OceanFish from "./ocean/OceanFish";
import OceanJellyfish from "./ocean/OceanJellyfish";
import OceanCrab from "./ocean/OceanCrab";
import OceanShell from "./ocean/OceanShell";
import OceanTurtle from "./ocean/OceanTurtle";

const BUBBLES = [
  { size: 8,  left: "7%",  dur: 7,  delay: 0 },
  { size: 14, left: "17%", dur: 10, delay: 1.2 },
  { size: 6,  left: "28%", dur: 6,  delay: 0.5 },
  { size: 18, left: "40%", dur: 9,  delay: 2.1 },
  { size: 10, left: "55%", dur: 8,  delay: 0.8 },
  { size: 22, left: "67%", dur: 11, delay: 1.6 },
  { size: 7,  left: "78%", dur: 7.5,delay: 3.0 },
  { size: 12, left: "88%", dur: 9,  delay: 0.3 },
  { size: 16, left: "94%", dur: 10, delay: 2.5 },
];

export default function EnvelopeIntro({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [vh, setVh] = useState<number>(700);

  useEffect(() => {
    if (typeof window !== "undefined") setVh(window.innerHeight);
  }, []);

  function handleOpen() {
    setOpened(true);
    setTimeout(() => setRevealed(true), 1200);
  }

  if (revealed) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: "linear-gradient(to bottom, #E8F4FD 0%, #D4ECF7 20%, #C5DFF0 45%, #A8D8EA 70%, #8FC4B7 88%, #c4a265 100%)" }}
    >
      {/* ── God rays from surface ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 origin-top"
            style={{
              left: `${10 + i * 15}%`,
              width: `${30 + i * 10}px`,
              height: "55%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, transparent 100%)",
              transform: `rotate(${-12 + i * 5}deg)`,
              borderRadius: "0 0 50% 50%",
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}
      </div>

      {/* ── Rising bubbles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 rounded-full border border-sky-300/50"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
            animate={{ y: [0, -vh], opacity: [0.7, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* ── Floating particles (plankton) ── */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-400/20 pointer-events-none"
          style={{
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
            left: `${(i * 17 + 5) % 90}%`,
            top: `${(i * 13 + 10) % 85}%`,
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 12 : -12), 0],
            y: [0, (i % 3 === 0 ? -10 : 8), 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* ── Sea creatures ── */}
      {/* Fish left→right top */}
      <OceanFish
        className="top-[12%]"
        size={48}
        animationDuration="14s"
        animationDelay="0s"
      />
      {/* Fish right→left mid */}
      <OceanFish
        className="top-[38%]"
        size={36}
        animationDuration="18s"
        animationDelay="3s"
        flipY
      />
      {/* Jellyfish left */}
      <OceanJellyfish
        className="absolute left-3 top-[15%]"
        size={54}
        animationDelay="0s"
      />
      {/* Jellyfish right */}
      <OceanJellyfish
        className="absolute right-5 top-[8%]"
        size={40}
        animationDelay="1.8s"
      />
      {/* Turtle */}
      <OceanTurtle
        className="absolute right-4 top-[45%]"
        size={60}
        animationDelay="0.5s"
      />

      {/* ── Sandy floor ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" aria-hidden="true"
        style={{ background: "linear-gradient(to top, #c4a265 0%, #d4b87a 40%, transparent 100%)" }}
      />
      {/* Seaweed left */}
      <div className="absolute bottom-16 left-4 pointer-events-none" aria-hidden="true">
        <OceanSeaweed size={60} animationDelay="0s" />
      </div>
      <div className="absolute bottom-16 left-16 pointer-events-none" aria-hidden="true">
        <OceanSeaweed size={44} animationDelay="0.8s" />
      </div>
      {/* Seaweed right */}
      <div className="absolute bottom-16 right-4 pointer-events-none" aria-hidden="true">
        <OceanSeaweed size={55} animationDelay="0.4s" />
      </div>
      <div className="absolute bottom-16 right-16 pointer-events-none" aria-hidden="true">
        <OceanSeaweed size={38} animationDelay="1.2s" />
      </div>
      {/* Crab */}
      <div className="absolute bottom-16 left-1/2 -translate-x-16 pointer-events-none" aria-hidden="true">
        <OceanCrab size={44} />
      </div>
      {/* Shells */}
      <OceanShell className="absolute bottom-14 left-[35%]" size={28} />
      <OceanShell className="absolute bottom-12 right-[30%]" size={22} />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Greeting */}
        <motion.p
          className="font-body text-xs font-semibold tracking-[0.25em] uppercase mb-5"
          style={{ color: "rgba(44,95,122,0.75)" }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          🌊 Undangan dari Joash 🌊
        </motion.p>

        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer select-none"
          style={{ width: 288, height: 192 }}
          animate={opened ? { y: -24, scale: 1.04 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Glow behind envelope */}
          <div className="absolute inset-0 rounded-2xl blur-xl opacity-50"
            style={{ background: "radial-gradient(ellipse, #b8e2f5 0%, #7ec8e3 60%, transparent 100%)" }}
          />

          {/* Envelope body */}
          <div className="absolute inset-0 rounded-2xl shadow-2xl border border-sky-200/60 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6ab8d8 0%, #57a9cc 50%, #4497bb 100%)" }}
          />

          {/* Coral / shell decorations on the envelope */}
          <div className="absolute bottom-3 left-5 pointer-events-none z-20" aria-hidden="true">
            <OceanShell size={22} />
          </div>
          <div className="absolute bottom-3 right-5 pointer-events-none z-20" aria-hidden="true">
            <OceanShell size={18} />
          </div>

          {/* Side flaps */}
          <div className="absolute bottom-0 left-0 top-0 z-[1]"
            style={{ width: 0, height: 0, borderTop: "96px solid transparent", borderBottom: "96px solid transparent", borderLeft: "144px solid rgba(90,160,196,0.85)" }}
          />
          <div className="absolute bottom-0 right-0 top-0 z-[1]"
            style={{ width: 0, height: 0, borderTop: "96px solid transparent", borderBottom: "96px solid transparent", borderRight: "144px solid rgba(68,151,187,0.85)" }}
          />
          {/* Bottom fold */}
          <div className="absolute bottom-0 left-0 right-0 z-[1]"
            style={{ width: 0, height: 0, borderLeft: "144px solid transparent", borderRight: "144px solid transparent", borderBottom: "96px solid rgba(120,190,220,0.75)" }}
          />

          {/* Top flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-[3]"
            style={{ transformOrigin: "top center" }}
            animate={opened ? { rotateX: -165, opacity: 0.6 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            <div style={{ width: 0, height: 0, borderLeft: "144px solid transparent", borderRight: "144px solid transparent", borderTop: "96px solid rgba(68,151,187,0.9)" }} />
          </motion.div>

          {/* Seal */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full shadow-lg flex items-center justify-center"
                style={{ background: "radial-gradient(circle, #b8e8f8, #5ab8dc)" }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-white text-base leading-none">🐚</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter peeking out */}
          <AnimatePresence>
            {opened && (
              <motion.div
                className="absolute left-4 right-4 rounded-xl shadow-xl z-10 overflow-hidden"
                style={{ bottom: "12px" }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -64, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.65, ease: "easeOut" }}
              >
                <div className="w-full h-24 flex flex-col items-center justify-center gap-1 px-3"
                  style={{ background: "linear-gradient(135deg, #C5DFF0, #A8D8EA)" }}
                >
                  <span className="text-2xl">🎂</span>
                  <p className="font-heading text-sm text-center leading-tight"
                    style={{ color: "#2C5F7A" }}
                  >
                    Kamu diundang ke Joash&apos;s 1st Birthday Party
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Button */}
        <AnimatePresence>
          {!opened && (
            <motion.button
              onClick={handleOpen}
              className="mt-9 px-9 py-3.5 rounded-full font-heading text-lg text-white shadow-xl relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #5ab4d4, #3a9ab8, #2a7a98)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Shimmer */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Buka Undangan 🐠</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Fade-out to white then page ── */}
      <AnimatePresence>
        {opened && !revealed && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "linear-gradient(to bottom, #E8F4FD, #C5DFF0)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.55 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// components/WishesWall.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WaveDivider from "./ocean/WaveDivider";

interface Wish {
  name: string;
  message: string;
  submitted_at: string;
}

const CARD_COLORS = [
  "bg-[#E8F4FD]",
  "bg-[#D6EAF8]",
  "bg-[#C5DFF0]",
  "bg-[#E8D5B7]",
  "bg-[#F0F9FF]",
];

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishes() {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch {
      // silently fail — wishes wall is non-critical
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWishes();

    // Listen for external updates (e.g., after a new RSVP with a message)
    function handleWishesUpdated() {
      fetchWishes();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("wishes:updated", handleWishesUpdated);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wishes:updated", handleWishesUpdated);
      }
    };
  }, []);

  return (
    <>
      <WaveDivider fill="#A8D8EA" />
      <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-4 py-10 bg-gradient-to-b from-[#A8D8EA] to-[#C5DFF0]"
    >
      <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-6">
        Wishes for Joash 🐚
      </h2>

      {loading && (
        <div className="text-center text-gray-400 font-body py-8">
          Loading wishes...
        </div>
      )}

      {!loading && wishes.length === 0 && (
        <div className="text-center text-[#2C5F7A] font-body py-8 text-lg">
          Be the first to leave Joash a birthday wish! 🌟
        </div>
      )}

      <div className="grid gap-4">
        {wishes.map((wish, i) => (
          <motion.div
            key={`${wish.name}-${wish.submitted_at}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${CARD_COLORS[i % CARD_COLORS.length]} rounded-3xl p-4 shadow-sm`}
          >
            <p className="font-body text-[#2C5F7A] mb-2">&ldquo;{wish.message}&rdquo;</p>
            <p className="font-heading text-sm text-[#8FC4B7]">— {wish.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
    </>
  );
}

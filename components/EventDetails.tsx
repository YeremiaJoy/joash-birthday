// components/EventDetails.tsx
"use client";

import { motion } from "framer-motion";
import OceanCrab from "./ocean/OceanCrab";
import OceanShell from "./ocean/OceanShell";
import OceanSeaweed from "./ocean/OceanSeaweed";
import WaveDivider from "./ocean/WaveDivider";

const MAPS_URL =
  "https://www.google.com/maps?vet=10CAAQoqAOahcKEwi4ws2M0LiUAxUAAAAAHQAAAAAQCQ..i&rlz=1C5FPAB_en&pvq=CgsvZy8xdGRocDNtdyIQCgpob2thIGJlbnRvEAIYAw&lqi=ChRob2thIGJlbnRvIGJ1YWggYmF0dUj7nOrH5YCAgAhaIhAAEAEYAhgDIhRob2thIGJlbnRvIGJ1YWggYmF0dTICaWSSARNqYXBhbmVzZV9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5CYVU5ZmFsbG5FQUU6AQcKBWJlbnRv-gEECAAQJA&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KWdNOxJj6GguMWUKfyRhSTPK&daddr=Jl.+Buah+Batu+No.229,+Turangga,+Kec.+Lengkong,+Kota+Bandung,+Jawa+Barat+40264";

export default function EventDetails() {
  return (
    <>
      <WaveDivider fill="#E8D5B7" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative -mt-px px-4 py-10 bg-gradient-to-b from-[#E8D5B7] to-[#C5DFF0] overflow-hidden"
      >
        {/* Seaweed left edge */}
        <OceanSeaweed
          className="absolute bottom-0 left-1 z-0 opacity-70"
          size={60}
          animationDelay="0.4s"
        />

        <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-6 relative z-10">
          Event Details 🌊
        </h2>

        <div className="bg-[#F8FBFF] rounded-4xl p-6 shadow-sm space-y-4 mb-6 relative z-10">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-heading text-lg text-[#2C5F7A]">
                Saturday, 11 July 2026
              </p>
              <p className="font-body text-[#8FC4B7] text-sm">Date</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🕞</span>
            <div>
              <p className="font-heading text-lg text-[#2C5F7A]">
                15.30 WIB
              </p>
              <p className="font-body text-[#8FC4B7] text-sm">Time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🍱</span>
            <div>
              <p className="font-heading text-lg text-[#2C5F7A]">
                HokBen Trina Buah Batu
              </p>
              <p className="font-body text-[#8FC4B7] text-sm">Venue</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-body text-[#2C5F7A] text-sm leading-relaxed">
                Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung,
                Jawa Barat 40264
              </p>
            </div>
          </div>

          {/* Sandy floor decoration */}
          <div className="flex items-end justify-between pt-4 border-t border-[#E8D5B7]">
            <OceanSeaweed size={40} animationDelay="1s" className="opacity-60" />
            <div className="flex items-end gap-3">
              <OceanShell size={32} />
              <OceanCrab size={44} />
              <OceanShell size={28} />
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-4 border-dashed border-[#8FC4B7] rounded-3xl bg-[#E8F4FD] flex flex-col items-center justify-center mb-6 relative z-10">
          <img
            src="/maps.png"
            alt="Map preview"
            className="w-full rounded-2xl shadow-sm"
          />
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#E8967A] text-[#F8FBFF] font-heading text-xl text-center py-4 rounded-full hover:scale-105 active:scale-95 transition-transform min-h-[44px] relative z-10"
        >
          📍 Get directions
        </a>
      </motion.section>
    </>
  );
}

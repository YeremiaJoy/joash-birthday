// components/Footer.tsx
import OceanShell from "./ocean/OceanShell";
import WaveDivider from "./ocean/WaveDivider";

export default function Footer() {
  return (
    <>
      <WaveDivider fill="#2C5F7A" />
      <footer className="px-4 py-10 bg-[#2C5F7A] text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <OceanShell size={32} />
          <span className="text-3xl">🌊</span>
          <OceanShell size={28} />
        </div>
        <p className="font-heading text-xl text-[#F8FBFF] mb-1">
          With love, The Yakobus Family 💕
        </p>
        <p className="font-body text-sm text-[#A8D8EA]">
          © 2026 Joash&apos;s 1st Birthday
        </p>
      </footer>
    </>
  );
}

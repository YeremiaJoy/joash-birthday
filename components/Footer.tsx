// components/Footer.tsx
import OceanShell from "./ocean/OceanShell";
import WaveDivider from "./ocean/WaveDivider";

export default function Footer() {
  return (
    <>
      <WaveDivider fill="#2C5F7A" />
      <footer className="-mt-px px-4 py-10 bg-[#2C5F7A] text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <OceanShell size={32} />
          <span className="text-3xl">🌊</span>
          <OceanShell size={28} />
        </div>
        <p className="font-heading text-xl text-[#F8FBFF] mb-1">
          With Love, The Yakobus Family 💕
        </p>
        <div className="flex items-center justify-center gap-1 mb-1">
          <p className="font-body text-sm text-[#A8D8EA]">
            © 2026
          </p>
          <p className="font-body text-sm text-[#A8D8EA]">
            Created by{" "}
            <a
              href="https://www.instagram.com/yrjoy_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F8FBFF] transition-colors"
            >
              Yeremia Joy
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

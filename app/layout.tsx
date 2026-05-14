// app/layout.tsx
import type { Metadata } from "next";
import { Bubblegum_Sans, Nunito } from "next/font/google";
import "./globals.css";

const bubblegum = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bubblegum",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joash's 1st Birthday 🎂",
  description:
    "You're invited to celebrate Joash Jidly Yakobus's 1st Birthday on July 11, 2026!",
  openGraph: {
    title: "Joash's 1st Birthday 🎂",
    description: "Come celebrate with us! July 11, 2026 — HokBen Trina Buah Batu, Bandung",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bubblegum.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}

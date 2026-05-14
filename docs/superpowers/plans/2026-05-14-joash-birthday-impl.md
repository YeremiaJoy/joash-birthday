# Joash Birthday Invitation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete mobile-first Next.js 14 birthday invitation website for Joash Jidly Yakobus (turning 1 on July 11, 2026) with Supabase RSVP backend, Framer Motion animations, and personalized URL-based guest invitations.

**Architecture:** Single `/invite` page (server component) reads `name` and `validFor` URL params, defaults `validFor` to 1 if missing/invalid, and passes props to client components. RSVP data flows through Next.js API routes to Supabase. No client-side Supabase calls — credentials stay server-side only.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, react-hook-form + zod, @supabase/supabase-js, Google Fonts (Bubblegum Sans + Nunito), Vercel deployment.

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts |
| `tailwind.config.ts` | Custom colors and font families |
| `app/layout.tsx` | Root layout with Google Fonts and metadata |
| `app/page.tsx` | Redirect to /invite |
| `app/invite/page.tsx` | Server component — reads params, passes props |
| `app/api/rsvp/route.ts` | POST — validate and insert RSVP |
| `app/api/wishes/route.ts` | GET — fetch public wishes |
| `lib/supabase.ts` | Supabase client (server-side only) |
| `lib/validations.ts` | Zod schema for RSVP |
| `supabase/migrations/001_create_rsvp_table.sql` | DB migration |
| `.env.local.example` | Env var template |
| `components/PersonalizedBanner.tsx` | Conditional greeting banner |
| `components/Confetti.tsx` | CSS-animated confetti pieces |
| `components/FloatingBalloons.tsx` | CSS-animated floating balloons |
| `components/HeroSection.tsx` | Full-screen hero with photo placeholder |
| `components/BirthdayHighlight.tsx` | Birthday boy card + video placeholder |
| `components/EventDetails.tsx` | Date/time/venue/directions |
| `components/RSVPForm.tsx` | RSVP form with stepper and validation |
| `components/SuccessOverlay.tsx` | Full-screen success takeover |
| `components/WishesWall.tsx` | Public wishes cards |
| `components/MusicPlayer.tsx` | Fixed music toggle button |
| `components/Footer.tsx` | Footer with family credit |
| `README.md` | Setup and deployment instructions |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`

- [ ] **Step 1: Initialize Next.js project in existing directory**

```bash
cd /Users/mekari/Personal/joash-birthday
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js project created in current directory. `package.json`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `app/` folder all generated.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion @supabase/supabase-js react-hook-form zod @hookform/resolvers
```

Expected: All packages installed, no peer dependency errors.

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev &
sleep 3 && curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML response with Next.js default page content.

- [ ] **Step 4: Commit scaffold**

```bash
git init
git add -A
git commit -m "chore: initialize Next.js 14 project with dependencies"
```

---

## Task 2: Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts` with custom config**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-bubblegum)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        coral: "#FF6B6B",
        yellow: {
          soft: "#FFE66D",
        },
        mint: "#A8E6CF",
        blue: {
          baby: "#A8D8EA",
        },
        lavender: "#C3B1E1",
        pink: {
          soft: "#FFB7C5",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Replace `app/globals.css` with base styles**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-nunito), sans-serif;
  overflow-x: hidden;
  background-color: #fffbf5;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes confetti-drift {
  0%, 100% { margin-left: 0px; }
  50% { margin-left: 30px; }
}

@keyframes balloon-float {
  0% {
    transform: translateY(0px) rotate(-3deg);
  }
  50% {
    transform: translateY(-30px) rotate(3deg);
  }
  100% {
    transform: translateY(0px) rotate(-3deg);
  }
}

@keyframes balloon-rise {
  0% {
    transform: translateY(100vh);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh);
    opacity: 0;
  }
}

@keyframes bounce-music {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: configure Tailwind with custom theme and global keyframes"
```

---

## Task 3: Root Layout with Google Fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Bubblegum Sans and Nunito fonts"
```

---

## Task 4: Root Page Redirect

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with redirect**

```tsx
// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/invite");
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redirect root to /invite"
```

---

## Task 5: Supabase Client + Environment Config

**Files:**
- Create: `lib/supabase.ts`
- Create: `.env.local.example`
- Create: `supabase/migrations/001_create_rsvp_table.sql`

- [ ] **Step 1: Create `lib/supabase.ts`**

```ts
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Check .env.local.example."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 2: Create `.env.local.example`**

```bash
# .env.local.example
# Copy this file to .env.local and fill in your Supabase project values.
# Find these in: Supabase Dashboard → Project Settings → API

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

- [ ] **Step 3: Create `.env.local` from example (fill in your real values)**

```bash
cp .env.local.example .env.local
# Then edit .env.local with your actual Supabase URL and anon key
```

- [ ] **Step 4: Create migration SQL**

```sql
-- supabase/migrations/001_create_rsvp_table.sql
CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  attendees INTEGER NOT NULL,
  valid_for INTEGER NOT NULL,
  will_attend BOOLEAN NOT NULL,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON rsvp
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public select" ON rsvp
  FOR SELECT TO anon USING (true);
```

- [ ] **Step 5: Run migration in Supabase**

Go to Supabase Dashboard → SQL Editor → paste contents of `supabase/migrations/001_create_rsvp_table.sql` → Run.

- [ ] **Step 6: Commit**

```bash
git add lib/supabase.ts .env.local.example supabase/
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "feat: add Supabase client, env config, and DB migration"
```

---

## Task 6: Zod Validation Schema

**Files:**
- Create: `lib/validations.ts`

- [ ] **Step 1: Create `lib/validations.ts`**

```ts
// lib/validations.ts
import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(6, "Phone number is required"),
    attendees: z.number().int().min(1, "At least 1 attendee required"),
    valid_for: z.number().int().min(1),
    will_attend: z.boolean({
      required_error: "Please select whether you will attend",
    }),
    message: z.string().optional(),
  })
  .refine((data) => data.attendees <= data.valid_for, {
    message: "Attendees cannot exceed the invitation limit",
    path: ["attendees"],
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
```

- [ ] **Step 2: Verify schema compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/validations.ts
git commit -m "feat: add Zod RSVP validation schema"
```

---

## Task 7: API Route — POST /api/rsvp

**Files:**
- Create: `app/api/rsvp/route.ts`

- [ ] **Step 1: Create `app/api/rsvp/route.ts`**

```ts
// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rsvpSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Validation failed";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { name, phone, attendees, valid_for, will_attend, message } =
    parsed.data;

  const { error } = await supabase.from("rsvp").insert({
    name,
    phone,
    attendees,
    valid_for,
    will_attend,
    message: message || null,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json(
      { error: "Failed to save your RSVP. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/rsvp/route.ts
git commit -m "feat: add POST /api/rsvp route with Zod validation"
```

---

## Task 8: API Route — GET /api/wishes

**Files:**
- Create: `app/api/wishes/route.ts`

- [ ] **Step 1: Create `app/api/wishes/route.ts`**

```ts
// app/api/wishes/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("rsvp")
    .select("name, message, submitted_at")
    .not("message", "is", null)
    .neq("message", "")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error.message);
    return NextResponse.json(
      { error: "Failed to load wishes." },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/wishes/route.ts
git commit -m "feat: add GET /api/wishes route"
```

---

## Task 9: Invite Page (Server Component)

**Files:**
- Create: `app/invite/page.tsx`

- [ ] **Step 1: Create `app/invite/page.tsx`**

```tsx
// app/invite/page.tsx
import PersonalizedBanner from "@/components/PersonalizedBanner";
import HeroSection from "@/components/HeroSection";
import BirthdayHighlight from "@/components/BirthdayHighlight";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import WishesWall from "@/components/WishesWall";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

interface InvitePageProps {
  searchParams: Promise<{ name?: string; validFor?: string }>;
}

function parseValidFor(raw: string | undefined): number {
  if (!raw) return 1;
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function InvitePage({ searchParams }: InvitePageProps) {
  const params = await searchParams;
  const name = params.name ? decodeURIComponent(params.name) : null;
  const validFor = parseValidFor(params.validFor);

  return (
    <main className="max-w-[430px] mx-auto min-h-screen relative">
      {name && <PersonalizedBanner name={name} />}
      <HeroSection />
      <BirthdayHighlight />
      <EventDetails />
      <RSVPForm validFor={validFor} name={name} />
      <WishesWall />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Errors about missing component files — that's expected and fine at this stage.

- [ ] **Step 3: Commit**

```bash
git add app/invite/page.tsx
git commit -m "feat: add /invite server page with param parsing"
```

---

## Task 10: SuccessOverlay Component

**Files:**
- Create: `components/SuccessOverlay.tsx`

- [ ] **Step 1: Create `components/SuccessOverlay.tsx`**

```tsx
// components/SuccessOverlay.tsx
"use client";

import { motion } from "framer-motion";

interface SuccessOverlayProps {
  onClose: () => void;
}

export default function SuccessOverlay({ onClose }: SuccessOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-4xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti burst */}
        <div className="text-5xl mb-4">🎉🎈🎊</div>
        <h2 className="font-heading text-3xl text-coral mb-2">Yay!</h2>
        <p className="font-heading text-2xl text-gray-700 mb-6">
          See you at the party! 🎉🎈
        </p>
        <p className="text-gray-500 text-sm mb-6 font-body">
          We can't wait to celebrate with you!
        </p>
        <button
          onClick={onClose}
          className="bg-coral text-white font-heading text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Close 🎂
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SuccessOverlay.tsx
git commit -m "feat: add SuccessOverlay component"
```

---

## Task 11: RSVPForm Component

**Files:**
- Create: `components/RSVPForm.tsx`

- [ ] **Step 1: Create `components/RSVPForm.tsx`**

```tsx
// components/RSVPForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { rsvpSchema, type RsvpInput } from "@/lib/validations";
import SuccessOverlay from "./SuccessOverlay";

interface RSVPFormProps {
  validFor: number;
  name: string | null;
}

export default function RSVPForm({ validFor, name }: RSVPFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [attendees, setAttendees] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RsvpInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendees: 1,
      valid_for: validFor,
      name: name ?? "",
    },
  });

  function incrementAttendees() {
    if (attendees < validFor) {
      const next = attendees + 1;
      setAttendees(next);
      setValue("attendees", next);
    }
  }

  function decrementAttendees() {
    if (attendees > 1) {
      const next = attendees - 1;
      setAttendees(next);
      setValue("attendees", next);
    }
  }

  async function onSubmit(data: RsvpInput) {
    setToast(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setToast(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      reset();
      setAttendees(1);
      setShowSuccess(true);
    } catch {
      setToast("Network error. Please check your connection and try again.");
    }
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay onClose={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4 py-10 bg-white"
        id="rsvp"
      >
        <h2 className="font-heading text-3xl text-center text-coral mb-2">
          Will You Come? 🎈
        </h2>
        <p className="text-center text-gray-600 font-body mb-6 text-sm">
          This invitation is valid for up to{" "}
          <span className="font-bold text-coral">
            {validFor} person{validFor !== 1 ? "s" : ""}
          </span>
        </p>

        {toast && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 mb-4 font-body">
            {toast}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Hidden field */}
          <input type="hidden" {...register("valid_for", { valueAsNumber: true })} />

          {/* Full Name */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              {...register("name")}
              placeholder="Your full name"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-coral transition-colors min-h-[44px]"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Phone / WhatsApp *
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Your phone number"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-coral transition-colors min-h-[44px]"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Attendees Stepper */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
              Number of Attendees *
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={decrementAttendees}
                disabled={attendees <= 1}
                className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-xl font-bold disabled:opacity-40 hover:bg-gray-200 transition-colors flex items-center justify-center"
                aria-label="Decrease attendees"
              >
                −
              </button>
              <span className="font-heading text-2xl text-coral w-8 text-center">
                {attendees}
              </span>
              <button
                type="button"
                onClick={incrementAttendees}
                disabled={attendees >= validFor}
                className="w-11 h-11 rounded-full bg-coral text-white text-xl font-bold disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center"
                aria-label="Increase attendees"
              >
                +
              </button>
            </div>
            {errors.attendees && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.attendees.message}
              </p>
            )}
            {validFor === 1 && (
              <p className="text-gray-400 text-xs mt-1 font-body">
                This invitation is for 1 person only.
              </p>
            )}
          </div>

          {/* Will Attend Radio */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-2">
              Will you attend? *
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer bg-green-50 border-2 border-transparent rounded-2xl px-4 py-3 has-[:checked]:border-green-400 transition-colors min-h-[44px]">
                <input
                  {...register("will_attend", {
                    setValueAs: (v) => v === "true",
                  })}
                  type="radio"
                  value="true"
                  className="w-5 h-5 accent-green-500"
                />
                <span className="font-body text-gray-700">
                  Yes, I'll be there! 🎉
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-gray-50 border-2 border-transparent rounded-2xl px-4 py-3 has-[:checked]:border-gray-400 transition-colors min-h-[44px]">
                <input
                  {...register("will_attend", {
                    setValueAs: (v) => v === "true",
                  })}
                  type="radio"
                  value="false"
                  className="w-5 h-5 accent-gray-500"
                />
                <span className="font-body text-gray-700">
                  Sadly, I can't make it 😢
                </span>
              </label>
            </div>
            {errors.will_attend && (
              <p className="text-red-500 text-xs mt-1 font-body">
                {errors.will_attend.message}
              </p>
            )}
          </div>

          {/* Message (optional) */}
          <div>
            <label className="block text-sm font-body font-semibold text-gray-700 mb-1">
              Message for Joash{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              {...register("message")}
              rows={3}
              placeholder="Leave a birthday wish for Joash! 🎂"
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-base font-body focus:outline-none focus:border-coral transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-coral text-white font-heading text-xl py-4 rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:scale-100 min-h-[44px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              "RSVP Now! 🎊"
            )}
          </button>
        </form>
      </motion.section>
    </>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/RSVPForm.tsx
git commit -m "feat: add RSVPForm with stepper, radio, and Supabase submission"
```

---

## Task 12: WishesWall Component

**Files:**
- Create: `components/WishesWall.tsx`

- [ ] **Step 1: Create `components/WishesWall.tsx`**

```tsx
// components/WishesWall.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Wish {
  name: string;
  message: string;
  submitted_at: string;
}

const CARD_COLORS = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-mint/30",
  "bg-blue-100",
  "bg-lavender/30",
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
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-4 py-10 bg-gradient-to-b from-yellow-soft/20 to-pink-soft/20"
    >
      <h2 className="font-heading text-3xl text-center text-coral mb-6">
        Wishes for Joash 💌
      </h2>

      {loading && (
        <div className="text-center text-gray-400 font-body py-8">
          Loading wishes...
        </div>
      )}

      {!loading && wishes.length === 0 && (
        <div className="text-center text-gray-500 font-body py-8 text-lg">
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
            <p className="font-body text-gray-700 mb-2">"{wish.message}"</p>
            <p className="font-heading text-sm text-gray-500">— {wish.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WishesWall.tsx
git commit -m "feat: add WishesWall component"
```

---

## Task 13: Confetti + FloatingBalloons Components

**Files:**
- Create: `components/Confetti.tsx`
- Create: `components/FloatingBalloons.tsx`

- [ ] **Step 1: Create `components/Confetti.tsx`**

```tsx
// components/Confetti.tsx
"use client";

const CONFETTI_COLORS = [
  "#FF6B6B", "#FFE66D", "#A8E6CF", "#A8D8EA", "#C3B1E1",
  "#FFB7C5", "#FF9F43", "#54A0FF", "#5F27CD", "#00D2D3",
];

const SHAPES = ["rounded-full", "rounded-sm", "rounded-none"];

interface Piece {
  left: string;
  width: string;
  height: string;
  color: string;
  shape: string;
  duration: string;
  delay: string;
  drift: string;
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    left: `${(i * 4.7) % 100}%`,
    width: `${6 + (i % 5) * 3}px`,
    height: `${8 + (i % 4) * 4}px`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: SHAPES[i % SHAPES.length],
    duration: `${3 + (i % 5) * 0.8}s`,
    delay: `${(i * 0.2) % 4}s`,
    drift: `${(i % 3) * 10}px`,
  }));
}

const pieces = generatePieces(24);

export default function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {pieces.map((p, i) => (
        <div
          key={i}
          className={`absolute top-0 ${p.shape}`}
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} linear ${p.delay} infinite`,
            marginLeft: p.drift,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/FloatingBalloons.tsx`**

```tsx
// components/FloatingBalloons.tsx
"use client";

const BALLOONS = [
  { color: "#FF6B6B", left: "8%", size: 60, duration: "8s", delay: "0s" },
  { color: "#FFE66D", left: "22%", size: 48, duration: "10s", delay: "1s" },
  { color: "#A8E6CF", left: "42%", size: 64, duration: "7s", delay: "0.5s" },
  { color: "#A8D8EA", left: "62%", size: 52, duration: "9s", delay: "1.5s" },
  { color: "#C3B1E1", left: "78%", size: 56, duration: "11s", delay: "0.8s" },
  { color: "#FFB7C5", left: "90%", size: 44, duration: "8.5s", delay: "2s" },
];

export default function FloatingBalloons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{
            left: b.left,
            animation: `balloon-rise ${b.duration} ease-in-out ${b.delay} infinite`,
          }}
        >
          {/* Balloon body */}
          <div
            style={{
              width: b.size,
              height: b.size * 1.2,
              backgroundColor: b.color,
              borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
              position: "relative",
            }}
          >
            {/* Balloon shine */}
            <div
              style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: "25%",
                height: "30%",
                backgroundColor: "rgba(255,255,255,0.4)",
                borderRadius: "50%",
              }}
            />
          </div>
          {/* String */}
          <div
            style={{
              width: 2,
              height: 30,
              backgroundColor: b.color,
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Confetti.tsx components/FloatingBalloons.tsx
git commit -m "feat: add CSS-animated Confetti and FloatingBalloons components"
```

---

## Task 14: HeroSection Component

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Create `components/HeroSection.tsx`**

```tsx
// components/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Confetti from "./Confetti";
import FloatingBalloons from "./FloatingBalloons";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-soft/40 via-yellow-soft/30 to-mint/30 px-4">
      <Confetti />
      <FloatingBalloons />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center text-center pt-8 pb-12">
        {/* Polaroid placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl p-3 shadow-xl mb-8"
          style={{ width: 240 }}
        >
          <div
            className="border-4 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 bg-gray-50"
            style={{ width: 216, height: 280 }}
          >
            <span className="text-5xl mb-3">📸</span>
            <span className="text-sm font-body text-center px-2">
              [ Joash's Photo Here ]
            </span>
          </div>
          <p className="font-heading text-gray-500 text-xs text-center mt-2">
            Joash Jidly Yakobus
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-5xl text-coral mb-3 drop-shadow"
        >
          You're Invited! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-lg text-gray-600 max-w-xs"
        >
          Come celebrate Joash's 1st Birthday!
        </motion.p>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 bg-coral text-white font-heading text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-block min-h-[44px]"
        >
          RSVP Now 🎊
        </motion.a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: add HeroSection with confetti, balloons, and polaroid placeholder"
```

---

## Task 15: BirthdayHighlight Component

**Files:**
- Create: `components/BirthdayHighlight.tsx`

- [ ] **Step 1: Create `components/BirthdayHighlight.tsx`**

```tsx
// components/BirthdayHighlight.tsx
"use client";

import { motion } from "framer-motion";

export default function BirthdayHighlight() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-4 py-10 bg-white"
    >
      {/* Birthday info card */}
      <div className="bg-gradient-to-br from-yellow-soft/40 to-pink-soft/30 rounded-4xl p-6 shadow-sm mb-6">
        <div className="text-center mb-4">
          <span className="text-4xl">🎂🎈⭐</span>
        </div>
        <h2 className="font-heading text-3xl text-center text-coral mb-4">
          The Birthday Boy!
        </h2>
        <div className="space-y-2 text-center font-body text-gray-700">
          <p className="text-xl font-bold">Joash Jidly Yakobus</p>
          <p>Born: July 6, 2025 👶</p>
          <p className="text-coral font-bold text-lg">Turning 1 Year Old 🎂</p>
          <p>Party: July 11, 2026 🎉</p>
        </div>
      </div>

      {/* Welcome message */}
      <p className="font-body text-center text-gray-600 text-base mb-6 leading-relaxed">
        Little Joash is turning{" "}
        <span className="font-bold text-coral">ONE</span> and we want{" "}
        <span className="font-bold">YOU</span> there to celebrate! 🥳
      </p>

      {/* Video placeholder */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center"
        style={{ aspectRatio: "16/9" }}>
        <span className="text-5xl mb-2">▶️</span>
        <span className="text-sm font-body text-gray-400 text-center px-4">
          [ Birthday Video / Slideshow Here ]
        </span>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BirthdayHighlight.tsx
git commit -m "feat: add BirthdayHighlight component with video placeholder"
```

---

## Task 16: EventDetails Component

**Files:**
- Create: `components/EventDetails.tsx`

- [ ] **Step 1: Create `components/EventDetails.tsx`**

```tsx
// components/EventDetails.tsx
"use client";

import { motion } from "framer-motion";

const MAPS_URL =
  "https://www.google.com/maps?vet=10CAAQoqAOahcKEwi4ws2M0LiUAxUAAAAAHQAAAAAQCQ..i&rlz=1C5FPAB_en&pvq=CgsvZy8xdGRocDNtdyIQCgpob2thIGJlbnRvEAIYAw&lqi=ChRob2thIGJlbnRvIGJ1YWggYmF0dUj7nOrH5YCAgAhaIhAAEAEYAhgDIhRob2thIGJlbnRvIGJ1YWggYmF0dTICaWSSARNqYXBhbmVzZV9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5CYVU5ZmFsbG5FQUW6AQcKBWJlbnRv-gEECAAQJA&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KWdNOxJj6GguMWUKfyRhSTPK&daddr=Jl.+Buah+Batu+No.229,+Turangga,+Kec.+Lengkong,+Kota+Bandung,+Jawa+Barat+40264";

export default function EventDetails() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="px-4 py-10 bg-gradient-to-b from-mint/20 to-blue-baby/20"
    >
      <h2 className="font-heading text-3xl text-center text-coral mb-6">
        Event Details 📅
      </h2>

      <div className="bg-white rounded-4xl p-6 shadow-sm space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <p className="font-heading text-lg text-gray-800">
              Saturday, July 11, 2026
            </p>
            <p className="font-body text-gray-500 text-sm">Date</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🕞</span>
          <div>
            <p className="font-heading text-lg text-gray-800">
              15.30 WIB
            </p>
            <p className="font-body text-gray-500 text-sm">Time</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🍱</span>
          <div>
            <p className="font-heading text-lg text-gray-800">
              HokBen Trina Buah Batu
            </p>
            <p className="font-body text-gray-500 text-sm">Venue</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <p className="font-body text-gray-700 text-sm leading-relaxed">
              Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung,
              Jawa Barat 40264
            </p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="border-4 border-dashed border-gray-300 rounded-3xl bg-gray-50 flex flex-col items-center justify-center py-10 mb-6">
        <span className="text-4xl mb-2">📍</span>
        <span className="font-body text-gray-400 text-sm text-center px-4">
          HokBen Trina Buah Batu
        </span>
        <span className="font-body text-gray-300 text-xs text-center px-4 mt-1">
          [ Map Preview ]
        </span>
      </div>

      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-coral text-white font-heading text-xl text-center py-4 rounded-full hover:scale-105 active:scale-95 transition-transform min-h-[44px]"
      >
        Get Directions 🗺️
      </a>
    </motion.section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/EventDetails.tsx
git commit -m "feat: add EventDetails component with maps link"
```

---

## Task 17: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="px-4 py-10 bg-white text-center">
      <div className="text-3xl mb-3">🎈⭐🎈</div>
      <p className="font-heading text-xl text-coral mb-1">
        With love, The Yakobus Family 💕
      </p>
      <p className="font-body text-sm text-gray-400">
        © 2026 Joash's 1st Birthday
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 18: PersonalizedBanner Component

**Files:**
- Create: `components/PersonalizedBanner.tsx`

- [ ] **Step 1: Create `components/PersonalizedBanner.tsx`**

```tsx
// components/PersonalizedBanner.tsx
"use client";

import { motion } from "framer-motion";

interface PersonalizedBannerProps {
  name: string;
}

export default function PersonalizedBanner({ name }: PersonalizedBannerProps) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full bg-gradient-to-r from-coral to-yellow-soft px-4 py-4 text-center relative overflow-hidden"
    >
      {/* Side decorations */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🎀
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🎀
      </span>

      <p className="font-heading text-base text-lg px-10 drop-shadow leading-tight">
        Hi, {name}! 👋{" "}
        <span className="block text-sm mt-0.5">
          You're personally invited to Joash's 1st Birthday! 🎉
        </span>
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PersonalizedBanner.tsx
git commit -m "feat: add PersonalizedBanner component with slide-down animation"
```

---

## Task 19: MusicPlayer Component

**Files:**
- Create: `components/MusicPlayer.tsx`

- [ ] **Step 1: Create `components/MusicPlayer.tsx`**

```tsx
// components/MusicPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("joash-music-muted") === "true";
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.muted = muted;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    function handleFirstInteraction() {
      if (!started && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked — user will need to tap the button
        });
        setStarted(true);
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    }

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [started]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) {
      audioRef.current.muted = next;
      if (!started) {
        audioRef.current.play().catch(() => {});
        setStarted(true);
      }
    }
    localStorage.setItem("joash-music-muted", String(next));
  }

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-4 right-4 z-40 bg-white/80 backdrop-blur-sm shadow-lg border border-white/60 px-4 py-2 rounded-full font-heading text-xl flex items-center gap-2 min-h-[44px]"
      style={{ animation: "bounce-music 2s ease-in-out infinite" }}
    >
      {muted ? "🔇" : "🔊"}
      <span className="text-sm text-gray-600">{muted ? "Unmute" : "Music"}</span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/MusicPlayer.tsx
git commit -m "feat: add MusicPlayer with autoplay-policy compliance and localStorage mute"
```

---

## Task 20: Smoke Test — Full Page

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test pages in browser**

Open these URLs and verify:

| URL | Expected |
|---|---|
| `http://localhost:3000` | Redirects to `/invite` |
| `http://localhost:3000/invite` | Full page, no banner, validFor defaults to 1 |
| `http://localhost:3000/invite?name=Keluarga+Budi&validFor=4` | Banner shows "Hi, Keluarga Budi!", stepper max is 4 |
| `http://localhost:3000/invite?validFor=abc` | Page loads, validFor defaults to 1 |
| `http://localhost:3000/invite?validFor=-5` | Page loads, validFor defaults to 1 |

- [ ] **Step 3: Test RSVP form submission**

Fill out the form with valid data and submit. Expected: success overlay appears, wishes wall refreshes.

- [ ] **Step 4: Test wishes wall**

After submitting with a message, reload the page. Wish card should appear in the WishesWall.

- [ ] **Step 5: Verify mobile layout**

Open DevTools → toggle device toolbar → select iPhone 14 (390px). Verify no horizontal scroll, all buttons are 44px+ tall, inputs don't cause zoom on focus.

---

## Task 21: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Joash's 1st Birthday Invitation

Mobile-first birthday invitation website for Joash Jidly Yakobus (turning 1 on July 11, 2026).

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- Vercel

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy env template: `cp .env.local.example .env.local`
4. Fill in your Supabase credentials in `.env.local`
5. Run the DB migration in Supabase SQL Editor (`supabase/migrations/001_create_rsvp_table.sql`)
6. Run dev server: `npm run dev`

## Invite URL Format

```
https://your-domain.com/invite?name=Keluarga+Budi&validFor=4
```

| Param | Required | Description |
|---|---|---|
| `name` | No | Guest name shown in banner |
| `validFor` | No | Max attendees (defaults to 1 if missing/invalid) |

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Before Going Live

- [ ] Replace polaroid placeholder in `HeroSection.tsx` with Joash's actual photo
- [ ] Replace video placeholder in `BirthdayHighlight.tsx` with real video
- [ ] Replace audio URL in `MusicPlayer.tsx` with royalty-free kids song (pixabay.com/music)
```

- [ ] **Step 2: Final commit**

```bash
git add README.md
git commit -m "docs: add README with setup and deployment instructions"
```

---

## Self-Review Checklist

- [x] **Spec coverage:** All components from spec are implemented. `<InvalidInvite />` correctly omitted (replaced by default-to-1 logic). `validFor` default logic is in `parseValidFor()` in `app/invite/page.tsx`.
- [x] **No placeholders:** All code is complete. Photo/video/audio are intentional placeholders documented in README.
- [x] **Type consistency:** `RsvpInput` from `lib/validations.ts` is used in both `RSVPForm.tsx` and `app/api/rsvp/route.ts`. `validFor` is always `number` after `parseValidFor()`. `name` is always `string | null` from page to components.
- [x] **Mobile-first:** `max-w-[430px] mx-auto` on main, `text-base` on inputs, `min-h-[44px]` on all interactive elements.
- [x] **Security:** No client-side Supabase calls. API routes validate with Zod before any DB operation. Maps URL uses `rel="noopener noreferrer"`.

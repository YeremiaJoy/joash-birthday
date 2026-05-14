# Under the Sea Retheme — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the Joash birthday invitation site from a generic pastel birthday theme to a full watercolor Under the Sea theme with inline SVG illustrations, rising bubbles, ocean creatures, and a pastel ocean color palette. Tagline: "Joash's ONEderful Year".

**Architecture:** New SVG ocean components live in `components/ocean/`. `globals.css` gets a new `@theme` block with ocean colors and new CSS keyframes. All page components are updated with ocean colors and ocean SVG creatures as decorative overlays. `Confetti.tsx` and `FloatingBalloons.tsx` are removed.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (CSS custom properties via `@theme`), Framer Motion, inline SVG, CSS keyframes.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `app/globals.css` | Modify | Ocean `@theme` palette + new CSS keyframes |
| `components/ocean/WaveDivider.tsx` | Create | SVG wave shape between sections |
| `components/ocean/RisingBubbles.tsx` | Create | CSS-animated rising bubbles (replaces FloatingBalloons) |
| `components/ocean/OceanSeaweed.tsx` | Create | SVG seaweed with CSS sway animation |
| `components/ocean/OceanWhale.tsx` | Create | SVG whale with Framer Motion bob animation |
| `components/ocean/OceanJellyfish.tsx` | Create | SVG jellyfish with CSS float animation |
| `components/ocean/OceanFish.tsx` | Create | SVG fish with CSS swim animation |
| `components/ocean/OceanTurtle.tsx` | Create | SVG turtle with CSS swim animation |
| `components/ocean/OceanCrab.tsx` | Create | Static SVG crab decoration |
| `components/ocean/OceanShell.tsx` | Create | Static SVG shell decoration |
| `components/HeroSection.tsx` | Modify | Ocean bg, whale, jellyfish, seaweed, bubbles, new heading |
| `components/PersonalizedBanner.tsx` | Modify | Ocean gradient, shell emoji |
| `components/BirthdayHighlight.tsx` | Modify | Ocean bg, turtle, fish, new emojis |
| `components/EventDetails.tsx` | Modify | Sandy bg, crab, shell, seaweed, ocean button |
| `components/RSVPForm.tsx` | Modify | Teal bg, ocean heading, coral button |
| `components/WishesWall.tsx` | Modify | Ocean gradient, ocean card colors, fish decor |
| `components/Footer.tsx` | Modify | Deep ocean bg, shell emojis |
| `components/SuccessOverlay.tsx` | Modify | Ocean bg, bubble animation, ocean colors |
| `components/MusicPlayer.tsx` | Modify | Ocean-deep bg |
| `components/Confetti.tsx` | Delete | Replaced by ocean theme |
| `components/FloatingBalloons.tsx` | Delete | Replaced by RisingBubbles |

---

## Task 1: Update globals.css — Ocean Palette + Keyframes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the full globals.css content**

```css
/* app/globals.css */
@import "tailwindcss";

/* Ocean theme: custom colors and font families for Tailwind v4 */
@theme {
  /* Ocean palette */
  --color-ocean-sky: #E8F4FD;
  --color-ocean-shallow: #C5DFF0;
  --color-ocean-mid: #A8D8EA;
  --color-ocean-teal: #8FC4B7;
  --color-ocean-sand: #E8D5B7;
  --color-ocean-coral: #E8967A;
  --color-ocean-foam: #F8FBFF;
  --color-ocean-deep: #2C5F7A;
  --color-ocean-seaweed: #6BAF9A;

  /* Legacy alias — components using text-coral/bg-coral get ocean-coral */
  --color-coral: #E8967A;

  --font-heading: var(--font-bubblegum), cursive;
  --font-body: var(--font-nunito), sans-serif;

  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-nunito), sans-serif;
  overflow-x: hidden;
  background-color: #E8F4FD;
}

/* Rising bubbles */
@keyframes bubble-rise {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-50vh) translateX(8px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-110vh) translateX(-4px);
    opacity: 0;
  }
}

/* Jellyfish gentle float */
@keyframes jellyfish-float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

/* Turtle slowly swimming across */
@keyframes turtle-swim {
  0%   { transform: translateX(-120px); }
  100% { transform: translateX(calc(100vw + 120px)); }
}

/* Fish swimming right-to-left */
@keyframes fish-swim {
  0%   { transform: translateX(calc(100vw + 80px)); }
  100% { transform: translateX(-120px); }
}

/* Seaweed gentle sway */
@keyframes seaweed-sway {
  0%   { transform: rotate(-8deg); }
  100% { transform: rotate(8deg); }
}

/* Music button bounce */
@keyframes bounce-music {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors (CSS changes don't affect TS).

---

## Task 2: Create WaveDivider.tsx

**Files:**
- Create: `components/ocean/WaveDivider.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/WaveDivider.tsx
interface WaveDividerProps {
  fill: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ fill, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 430 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 60, display: "block" }}
      >
        <path
          d="M0,30 C72,52 144,8 216,30 C288,52 360,8 430,30 L430,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 3: Create RisingBubbles.tsx

**Files:**
- Create: `components/ocean/RisingBubbles.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/RisingBubbles.tsx
"use client";

const BUBBLES = [
  { size: 12, left: "8%",  duration: "8s",  delay: "0s" },
  { size: 20, left: "18%", duration: "11s", delay: "1.5s" },
  { size: 8,  left: "30%", duration: "7s",  delay: "0.8s" },
  { size: 16, left: "44%", duration: "9s",  delay: "2.2s" },
  { size: 10, left: "58%", duration: "10s", delay: "0.3s" },
  { size: 24, left: "68%", duration: "12s", delay: "1.1s" },
  { size: 14, left: "78%", duration: "8.5s","delay": "3s" },
  { size: 9,  left: "88%", duration: "7.5s","delay": "0.6s" },
  { size: 18, left: "95%", duration: "10.5s","delay":"2.8s" },
];

export default function RisingBubbles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full border border-white/50"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            backgroundColor: "rgba(248, 251, 255, 0.5)",
            animation: `bubble-rise ${b.duration} ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 4: Create OceanSeaweed.tsx

**Files:**
- Create: `components/ocean/OceanSeaweed.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanSeaweed.tsx
interface OceanSeaweedProps {
  className?: string;
  size?: number;
  animationDelay?: string;
}

export default function OceanSeaweed({
  className = "",
  size = 80,
  animationDelay = "0s",
}: OceanSeaweedProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size * 1.25,
        transformOrigin: "bottom center",
        animation: `seaweed-sway 2.5s ease-in-out ${animationDelay} infinite alternate`,
      }}
    >
      <svg
        viewBox="0 0 60 100"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.25}
      >
        {/* Left stalk */}
        <path
          d="M 15,100 Q 8,82 18,66 Q 8,50 16,34 Q 8,18 16,4"
          stroke="#6BAF9A"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path d="M 15,80 Q 2,70 5,58 Q 14,62 16,72 Z" fill="#6BAF9A" />
        <path d="M 15,54 Q 2,44 5,32 Q 14,36 16,46 Z" fill="#6BAF9A" />
        <path d="M 15,28 Q 3,18 6,6 Q 15,10 16,20 Z" fill="#6BAF9A" />

        {/* Right stalk */}
        <path
          d="M 44,100 Q 52,82 42,66 Q 52,50 44,34 Q 52,18 44,4"
          stroke="#8FC4B7"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <path d="M 44,76 Q 57,66 55,54 Q 46,58 44,68 Z" fill="#8FC4B7" />
        <path d="M 44,50 Q 57,40 55,28 Q 46,32 44,42 Z" fill="#8FC4B7" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 5: Create OceanWhale.tsx

**Files:**
- Create: `components/ocean/OceanWhale.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanWhale.tsx
"use client";

import { motion } from "framer-motion";

interface OceanWhaleProps {
  className?: string;
  size?: number;
}

export default function OceanWhale({ className = "", size = 180 }: OceanWhaleProps) {
  const h = Math.round(size * 0.6);
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      style={{ width: size, height: h }}
    >
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={h}
      >
        {/* Main body */}
        <path
          d="M 38,62 C 38,28 150,22 168,62 C 150,100 38,98 38,62 Z"
          fill="#8BAFC7"
        />
        {/* Belly highlight */}
        <path
          d="M 42,70 C 70,88 135,88 162,72 C 135,95 70,95 42,70 Z"
          fill="#C5DFF0"
          opacity="0.75"
        />
        {/* Tail flukes */}
        <path
          d="M 38,62 L 8,38 Q 22,60 8,84 Z"
          fill="#7A9EBA"
        />
        {/* Pectoral fin */}
        <path
          d="M 95,78 L 78,102 Q 100,88 115,80 Z"
          fill="#7A9EBA"
        />
        {/* Dorsal fin */}
        <path
          d="M 110,28 L 100,22 Q 95,30 105,36 Z"
          fill="#7A9EBA"
        />
        {/* Eye */}
        <circle cx="152" cy="54" r="5" fill="#2C5F7A" />
        <circle cx="153" cy="53" r="2" fill="white" />
        {/* Smile */}
        <path
          d="M 155,62 Q 162,67 157,72"
          stroke="#2C5F7A"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Body highlight */}
        <ellipse
          cx="120"
          cy="38"
          rx="22"
          ry="9"
          fill="white"
          opacity="0.25"
        />
        {/* Barnacle dots */}
        <circle cx="70" cy="58" r="3" fill="#6A8FAA" opacity="0.4" />
        <circle cx="85" cy="72" r="2.5" fill="#6A8FAA" opacity="0.35" />
        <circle cx="55" cy="66" r="2" fill="#6A8FAA" opacity="0.3" />
      </svg>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 6: Create OceanJellyfish.tsx

**Files:**
- Create: `components/ocean/OceanJellyfish.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanJellyfish.tsx
interface OceanJellyfishProps {
  className?: string;
  size?: number;
  animationDelay?: string;
}

export default function OceanJellyfish({
  className = "",
  size = 70,
  animationDelay = "0s",
}: OceanJellyfishProps) {
  const h = Math.round(size * 1.4);
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: h,
        animation: `jellyfish-float 3.5s ease-in-out ${animationDelay} infinite`,
      }}
    >
      <svg viewBox="0 0 80 112" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Dome */}
        <path
          d="M 5,52 Q 5,4 40,4 Q 75,4 75,52 Z"
          fill="#C5DFF0"
          opacity="0.75"
        />
        {/* Inner dome highlight */}
        <path
          d="M 14,52 Q 14,18 40,14 Q 66,18 66,52 Z"
          fill="white"
          opacity="0.35"
        />
        {/* Dome spots */}
        <circle cx="28" cy="26" r="5" fill="white" opacity="0.45" />
        <circle cx="50" cy="20" r="4" fill="white" opacity="0.4" />
        <circle cx="46" cy="38" r="3" fill="white" opacity="0.35" />
        {/* Tentacles */}
        <path d="M 20,52 Q 16,64 22,76 Q 16,88 22,100" stroke="#A8D8EA" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30,54 Q 26,66 32,78 Q 26,90 32,104" stroke="#A8D8EA" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 40,55 Q 36,67 42,79 Q 36,91 42,106" stroke="#C5DFF0" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 50,54 Q 54,66 48,78 Q 54,90 48,104" stroke="#A8D8EA" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M 60,52 Q 64,64 58,76 Q 64,88 58,100" stroke="#A8D8EA" fill="none" strokeWidth="2.5" strokeLinecap="round" />
        {/* Face */}
        <circle cx="33" cy="40" r="2.5" fill="#2C5F7A" opacity="0.6" />
        <circle cx="47" cy="40" r="2.5" fill="#2C5F7A" opacity="0.6" />
        <path d="M 36,46 Q 40,50 44,46" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 7: Create OceanFish.tsx

**Files:**
- Create: `components/ocean/OceanFish.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanFish.tsx
interface OceanFishProps {
  className?: string;
  size?: number;
  animationDuration?: string;
  animationDelay?: string;
  flipY?: boolean;
}

export default function OceanFish({
  className = "",
  size = 40,
  animationDuration = "12s",
  animationDelay = "0s",
  flipY = false,
}: OceanFishProps) {
  const h = Math.round(size * 0.7);
  return (
    <div
      className={`pointer-events-none select-none absolute ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: h,
        animation: `fish-swim ${animationDuration} linear ${animationDelay} infinite`,
        transform: flipY ? "scaleY(-1)" : undefined,
      }}
    >
      <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Tail */}
        <path d="M 16,28 L 0,14 Q 10,28 0,42 Z" fill="#D4845A" />
        {/* Body */}
        <ellipse cx="44" cy="28" rx="30" ry="18" fill="#E8A87C" />
        {/* Top fin */}
        <path d="M 36,10 Q 48,3 54,14 Q 44,14 36,10 Z" fill="#E8A87C" />
        {/* Bottom fin */}
        <path d="M 30,38 Q 36,47 44,45 Q 36,38 30,38 Z" fill="#D4845A" opacity="0.8" />
        {/* Scale stripes */}
        <path d="M 52,14 Q 58,28 52,42" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.5" />
        <path d="M 38,11 Q 44,28 38,45" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.4" />
        {/* Eye */}
        <circle cx="64" cy="24" r="5.5" fill="white" />
        <circle cx="65" cy="24" r="3.5" fill="#2C5F7A" />
        <circle cx="66" cy="23" r="1.2" fill="white" />
        {/* Mouth */}
        <path d="M 72,29 Q 76,32 72,35" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        {/* Highlight */}
        <ellipse cx="50" cy="21" rx="9" ry="5" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 8: Create OceanTurtle.tsx

**Files:**
- Create: `components/ocean/OceanTurtle.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanTurtle.tsx
interface OceanTurtleProps {
  className?: string;
  size?: number;
  animationDuration?: string;
  animationDelay?: string;
}

export default function OceanTurtle({
  className = "",
  size = 70,
  animationDuration = "18s",
  animationDelay = "0s",
}: OceanTurtleProps) {
  return (
    <div
      className={`pointer-events-none select-none absolute ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        animation: `turtle-swim ${animationDuration} linear ${animationDelay} infinite`,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Back flippers */}
        <path d="M 25,68 Q 10,80 12,68 Q 22,62 28,64 Z" fill="#6BAF9A" />
        <path d="M 25,32 Q 10,20 12,32 Q 22,38 28,36 Z" fill="#6BAF9A" />
        {/* Front flippers */}
        <path d="M 68,68 Q 84,80 82,68 Q 72,62 67,64 Z" fill="#6BAF9A" />
        <path d="M 68,32 Q 84,20 82,32 Q 72,38 67,36 Z" fill="#6BAF9A" />
        {/* Shell */}
        <ellipse cx="48" cy="50" rx="26" ry="22" fill="#8FC4B7" />
        {/* Shell pattern */}
        <line x1="48" y1="28" x2="48" y2="72" stroke="#2C5F7A" strokeWidth="1" opacity="0.35" />
        <line x1="22" y1="50" x2="74" y2="50" stroke="#2C5F7A" strokeWidth="1" opacity="0.35" />
        <line x1="30" y1="32" x2="66" y2="68" stroke="#2C5F7A" strokeWidth="1" opacity="0.3" />
        <line x1="66" y1="32" x2="30" y2="68" stroke="#2C5F7A" strokeWidth="1" opacity="0.3" />
        <ellipse cx="48" cy="50" rx="12" ry="10" fill="#6BAF9A" opacity="0.5" />
        {/* Shell highlight */}
        <ellipse cx="42" cy="42" rx="8" ry="5" fill="white" opacity="0.25" />
        {/* Head */}
        <ellipse cx="76" cy="50" rx="11" ry="9" fill="#6BAF9A" />
        {/* Eye */}
        <circle cx="81" cy="46" r="3" fill="#2C5F7A" />
        <circle cx="82" cy="45" r="1.2" fill="white" />
        {/* Mouth */}
        <path d="M 82,54 Q 86,57 83,60" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        {/* Tail */}
        <path d="M 22,50 Q 8,46 6,50 Q 8,54 22,50 Z" fill="#6BAF9A" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 9: Create OceanCrab.tsx

**Files:**
- Create: `components/ocean/OceanCrab.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanCrab.tsx
interface OceanCrabProps {
  className?: string;
  size?: number;
}

export default function OceanCrab({ className = "", size = 50 }: OceanCrabProps) {
  const h = Math.round(size * 0.8);
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: h }}
    >
      <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Walking legs */}
        <line x1="30" y1="52" x2="14" y2="68" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="60" x2="20" y2="74" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="70" y1="52" x2="86" y2="68" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="60" x2="80" y2="74" stroke="#C4735A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left claw */}
        <path
          d="M 26,46 Q 10,36 8,26 Q 16,20 20,30 Q 22,26 26,22 Q 32,28 24,34 Q 24,40 26,46 Z"
          fill="#E8967A"
        />
        {/* Right claw */}
        <path
          d="M 74,46 Q 90,36 92,26 Q 84,20 80,30 Q 78,26 74,22 Q 68,28 76,34 Q 76,40 74,46 Z"
          fill="#E8967A"
        />
        {/* Body */}
        <ellipse cx="50" cy="50" rx="26" ry="19" fill="#E8967A" />
        {/* Shell texture dots */}
        <circle cx="44" cy="46" r="3" fill="#C4735A" opacity="0.5" />
        <circle cx="56" cy="46" r="3" fill="#C4735A" opacity="0.5" />
        <circle cx="50" cy="40" r="2.5" fill="#C4735A" opacity="0.45" />
        <circle cx="50" cy="56" r="2" fill="#C4735A" opacity="0.4" />
        {/* Eye stalks */}
        <line x1="42" y1="34" x2="39" y2="26" stroke="#C4735A" strokeWidth="2" />
        <circle cx="39" cy="23" r="4.5" fill="#2C5F7A" />
        <circle cx="40" cy="22" r="1.8" fill="white" />
        <line x1="58" y1="34" x2="61" y2="26" stroke="#C4735A" strokeWidth="2" />
        <circle cx="61" cy="23" r="4.5" fill="#2C5F7A" />
        <circle cx="62" cy="22" r="1.8" fill="white" />
        {/* Body highlight */}
        <ellipse cx="44" cy="42" rx="10" ry="5" fill="white" opacity="0.2" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 10: Create OceanShell.tsx

**Files:**
- Create: `components/ocean/OceanShell.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ocean/OceanShell.tsx
interface OceanShellProps {
  className?: string;
  size?: number;
}

export default function OceanShell({ className = "", size = 40 }: OceanShellProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Main shell body */}
        <path
          d="M 35,6 Q 64,18 60,48 Q 52,66 35,64 Q 18,66 10,48 Q 6,18 35,6 Z"
          fill="#E8D5B7"
        />
        {/* Spiral ridges */}
        <path
          d="M 35,6 Q 56,18 52,38 Q 47,54 35,56"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.8"
        />
        <path
          d="M 35,6 Q 14,18 18,38 Q 23,54 35,56"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.8"
        />
        <path
          d="M 35,56 Q 56,50 56,38 Q 56,22 46,16"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.2"
        />
        <path
          d="M 35,56 Q 14,52 14,38 Q 14,24 24,16"
          stroke="#C4A882"
          fill="none"
          strokeWidth="1.2"
        />
        {/* Center point */}
        <circle cx="35" cy="56" r="5.5" fill="#C4A882" />
        <circle cx="35" cy="56" r="2.5" fill="#E8D5B7" />
        {/* Highlight */}
        <ellipse
          cx="28"
          cy="24"
          rx="7"
          ry="11"
          fill="white"
          opacity="0.3"
          transform="rotate(-20 28 24)"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 11: Update HeroSection.tsx

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Replace full file content**

```tsx
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
          style={{ width: 240 }}
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 12: Update PersonalizedBanner.tsx

**Files:**
- Modify: `components/PersonalizedBanner.tsx`

- [ ] **Step 1: Replace full file content**

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
      className="w-full bg-gradient-to-r from-[#A8D8EA] to-[#C5DFF0] px-4 py-4 text-center relative overflow-hidden"
    >
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🐚
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl select-none">
        🐚
      </span>

      <p className="font-heading text-base text-lg text-[#2C5F7A] px-10 drop-shadow leading-tight">
        Hi, {name}! 👋{" "}
        <span className="block text-sm mt-0.5">
          You&apos;re personally invited to Joash&apos;s 1st Birthday! 🐠
        </span>
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 13: Update BirthdayHighlight.tsx

**Files:**
- Modify: `components/BirthdayHighlight.tsx`

- [ ] **Step 1: Replace full file content**

```tsx
// components/BirthdayHighlight.tsx
"use client";

import { motion } from "framer-motion";
import OceanTurtle from "./ocean/OceanTurtle";
import OceanFish from "./ocean/OceanFish";
import WaveDivider from "./ocean/WaveDivider";

export default function BirthdayHighlight() {
  return (
    <>
      <WaveDivider fill="#F8FBFF" />
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative px-4 py-10 bg-[#F8FBFF] overflow-hidden"
      >
        {/* Decorative fish swimming across */}
        <OceanFish
          size={38}
          animationDuration="14s"
          animationDelay="2s"
          className="top-8"
          style={{ top: 32 }}
        />
        <OceanFish
          size={28}
          animationDuration="18s"
          animationDelay="6s"
          flipY
          className="top-20"
          style={{ top: 80 }}
        />

        <div className="bg-gradient-to-br from-[#E8F4FD] to-[#C5DFF0] rounded-4xl p-6 shadow-sm mb-6 relative">
          <div className="text-center mb-4">
            <span className="text-4xl">🐋🌊🐠</span>
          </div>
          <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-4">
            The Birthday Boy!
          </h2>
          <div className="space-y-2 text-center font-body text-[#2C5F7A]">
            <p className="text-xl font-bold">Joash Jidly Yakobus</p>
            <p>Born: July 6, 2025 👶</p>
            <p className="font-bold text-lg text-[#E8967A]">Turning 1 Year Old 🐚</p>
            <p>Party: July 11, 2026 🎉</p>
          </div>

          {/* Turtle swimming at the bottom of the card */}
          <div className="relative h-16 mt-4 overflow-hidden rounded-xl">
            <OceanTurtle size={60} animationDuration="20s" animationDelay="1s" />
          </div>
        </div>

        <p className="font-body text-center text-[#2C5F7A] text-base mb-6 leading-relaxed">
          Little Joash is turning{" "}
          <span className="font-bold text-[#E8967A]">ONE</span> and we want{" "}
          <span className="font-bold">YOU</span> there to celebrate! 🥳
        </p>

        <div
          className="relative w-full rounded-3xl overflow-hidden border-4 border-dashed border-[#8FC4B7] bg-[#E8F4FD] flex flex-col items-center justify-center"
          style={{ aspectRatio: "16/9" }}
        >
          <span className="text-5xl mb-2">▶️</span>
          <span className="text-sm font-body text-[#8FC4B7] text-center px-4">
            [ Birthday Video / Slideshow Here ]
          </span>
        </div>
      </motion.section>
    </>
  );
}
```

Note: `OceanFish` uses `className` and an inline `style` for the `top` position. Update `OceanFish.tsx` to also accept and pass through `style` prop:

- [ ] **Step 2: Add `style` prop to OceanFish.tsx**

Open `components/ocean/OceanFish.tsx` and update the interface and component:

```tsx
// components/ocean/OceanFish.tsx
import { CSSProperties } from "react";

interface OceanFishProps {
  className?: string;
  size?: number;
  animationDuration?: string;
  animationDelay?: string;
  flipY?: boolean;
  style?: CSSProperties;
}

export default function OceanFish({
  className = "",
  size = 40,
  animationDuration = "12s",
  animationDelay = "0s",
  flipY = false,
  style,
}: OceanFishProps) {
  const h = Math.round(size * 0.7);
  return (
    <div
      className={`pointer-events-none select-none absolute ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: h,
        animation: `fish-swim ${animationDuration} linear ${animationDelay} infinite`,
        transform: flipY ? "scaleY(-1)" : undefined,
        ...style,
      }}
    >
      <svg viewBox="0 0 80 56" xmlns="http://www.w3.org/2000/svg" width={size} height={h}>
        {/* Tail */}
        <path d="M 16,28 L 0,14 Q 10,28 0,42 Z" fill="#D4845A" />
        {/* Body */}
        <ellipse cx="44" cy="28" rx="30" ry="18" fill="#E8A87C" />
        {/* Top fin */}
        <path d="M 36,10 Q 48,3 54,14 Q 44,14 36,10 Z" fill="#E8A87C" />
        {/* Bottom fin */}
        <path d="M 30,38 Q 36,47 44,45 Q 36,38 30,38 Z" fill="#D4845A" opacity="0.8" />
        {/* Scale stripes */}
        <path d="M 52,14 Q 58,28 52,42" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.5" />
        <path d="M 38,11 Q 44,28 38,45" stroke="#D4845A" fill="none" strokeWidth="1.5" opacity="0.4" />
        {/* Eye */}
        <circle cx="64" cy="24" r="5.5" fill="white" />
        <circle cx="65" cy="24" r="3.5" fill="#2C5F7A" />
        <circle cx="66" cy="23" r="1.2" fill="white" />
        {/* Mouth */}
        <path d="M 72,29 Q 76,32 72,35" stroke="#2C5F7A" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        {/* Highlight */}
        <ellipse cx="50" cy="21" rx="9" ry="5" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 14: Update EventDetails.tsx

**Files:**
- Modify: `components/EventDetails.tsx`

- [ ] **Step 1: Replace full file content**

```tsx
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
        className="relative px-4 py-10 bg-gradient-to-b from-[#E8D5B7] to-[#C5DFF0] overflow-hidden"
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
                Saturday, July 11, 2026
              </p>
              <p className="font-body text-[#8FC4B7] text-sm">Date</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🕞</span>
            <div>
              <p className="font-heading text-lg text-[#2C5F7A]">
                15.30 WIB (Jakarta Time)
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

        <div className="border-4 border-dashed border-[#8FC4B7] rounded-3xl bg-[#E8F4FD] flex flex-col items-center justify-center py-10 mb-6 relative z-10">
          <span className="text-4xl mb-2">📍</span>
          <span className="font-body text-[#8FC4B7] text-sm text-center px-4">
            HokBen Trina Buah Batu
          </span>
          <span className="font-body text-[#A8D8EA] text-xs text-center px-4 mt-1">
            [ Map Preview ]
          </span>
        </div>

        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#E8967A] text-[#F8FBFF] font-heading text-xl text-center py-4 rounded-full hover:scale-105 active:scale-95 transition-transform min-h-[44px] relative z-10"
        >
          Get Directions 🗺️
        </a>
      </motion.section>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 15: Update RSVPForm.tsx

**Files:**
- Modify: `components/RSVPForm.tsx`

- [ ] **Step 1: Add WaveDivider import**

Add to existing imports at the top of the file:
```tsx
import WaveDivider from "./ocean/WaveDivider";
```

- [ ] **Step 2: Add WaveDivider before the motion.section**

Inside the returned `<>` fragment, add `<WaveDivider fill="#8FC4B7" />` immediately before `<motion.section`:

```tsx
    <>
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay onClose={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
      <WaveDivider fill="#8FC4B7" />
      <motion.section
```

- [ ] **Step 3: Replace the section wrapper and heading only — targeted replacements**

Change the `<motion.section>` className from `"px-4 py-10 bg-white"` to ocean-teal, and update the heading and other color references.

Replace this block:
```tsx
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
```

With:
```tsx
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-4 py-10 bg-[#8FC4B7]"
        id="rsvp"
      >
        <h2 className="font-heading text-3xl text-center text-[#F8FBFF] mb-2">
          RSVP 🐠
        </h2>
        <p className="text-center text-[#F8FBFF] font-body mb-6 text-sm">
          This invitation is valid for up to{" "}
          <span className="font-bold text-[#E8D5B7]">
            {validFor} person{validFor !== 1 ? "s" : ""}
          </span>
        </p>
```

- [ ] **Step 2: Wrap the form in a white card**

Replace the `{toast && ...}` block opening (first occurrence) and wrap form content. Find this line:

```tsx
        {toast && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 mb-4 font-body">
```

Replace with:

```tsx
        <div className="bg-[#F8FBFF] rounded-4xl p-6 shadow-sm">
        {toast && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3 mb-4 font-body">
```

And close the white card div just before `</motion.section>` closing. Add `</div>` right before the final `</>`:

The last line before `</>` is currently:
```tsx
    </>
```

It should become:
```tsx
        </div>
    </>
```

- [ ] **Step 3: Update input focus ring color**

The inputs use `focus:border-coral`. Replace both instances with `focus:border-[#8FC4B7]`:
- In the name input: `focus:outline-none focus:border-coral` → `focus:outline-none focus:border-[#8FC4B7]`
- In the phone input: same replacement
- In the textarea: same replacement

Also update the attendees count color:
```tsx
              <span className="font-heading text-2xl text-coral w-8 text-center">
```
Replace with:
```tsx
              <span className="font-heading text-2xl text-[#2C5F7A] w-8 text-center">
```

- [ ] **Step 4: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 16: Update WishesWall.tsx

**Files:**
- Modify: `components/WishesWall.tsx`

- [ ] **Step 1: Replace CARD_COLORS and section className**

Replace:
```tsx
const CARD_COLORS = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
];
```

With:
```tsx
const CARD_COLORS = [
  "bg-[#E8F4FD]",
  "bg-[#D6EAF8]",
  "bg-[#C5DFF0]",
  "bg-[#E8D5B7]",
  "bg-[#F0F9FF]",
];
```

Replace section className:
```tsx
      className="px-4 py-10 bg-gradient-to-b from-yellow-50 to-pink-50"
```
With:
```tsx
      className="px-4 py-10 bg-gradient-to-b from-[#A8D8EA] to-[#C5DFF0]"
```

Replace heading:
```tsx
      <h2 className="font-heading text-3xl text-center text-coral mb-6">
        Wishes for Joash 💌
      </h2>
```
With:
```tsx
      <h2 className="font-heading text-3xl text-center text-[#2C5F7A] mb-6">
        Wishes for Joash 🐚
      </h2>
```

Replace empty state text color:
```tsx
        <div className="text-center text-gray-500 font-body py-8 text-lg">
```
With:
```tsx
        <div className="text-center text-[#2C5F7A] font-body py-8 text-lg">
```

Replace wish card text colors:
```tsx
            <p className="font-body text-gray-700 mb-2">"{wish.message}"</p>
            <p className="font-heading text-sm text-gray-500">— {wish.name}</p>
```
With:
```tsx
            <p className="font-body text-[#2C5F7A] mb-2">&ldquo;{wish.message}&rdquo;</p>
            <p className="font-heading text-sm text-[#8FC4B7]">— {wish.name}</p>
```

- [ ] **Step 2: Add WaveDivider import and prepend to section**

Add import at top:
```tsx
import WaveDivider from "./ocean/WaveDivider";
```

Wrap the returned JSX in a fragment and add wave before the section:
```tsx
  return (
    <>
      <WaveDivider fill="#A8D8EA" />
      <motion.section
        ...rest of existing section...
      </motion.section>
    </>
  );
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 17: Update Footer.tsx

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace full file content**

```tsx
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 18: Update SuccessOverlay.tsx

**Files:**
- Modify: `components/SuccessOverlay.tsx`

- [ ] **Step 1: Replace full file content**

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C5F7A]/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-[#F8FBFF] rounded-4xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-[#A8D8EA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🐠🌊🐚</div>
        <h2 className="font-heading text-3xl text-[#2C5F7A] mb-2">Yay!</h2>
        <p className="font-heading text-2xl text-[#2C5F7A] mb-6">
          See you at the party! 🐠🎉
        </p>
        <p className="text-[#8FC4B7] text-sm mb-6 font-body">
          We can&apos;t wait to celebrate with you!
        </p>
        <button
          onClick={onClose}
          className="bg-[#E8967A] text-[#F8FBFF] font-heading text-lg px-8 py-3 rounded-full hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Close 🐚
        </button>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 19: Update MusicPlayer.tsx

**Files:**
- Modify: `components/MusicPlayer.tsx`

- [ ] **Step 1: Replace the button className only**

Replace:
```tsx
      className="fixed bottom-4 right-4 z-40 bg-white/80 backdrop-blur-sm shadow-lg border border-white/60 px-4 py-2 rounded-full font-heading text-xl flex items-center gap-2 min-h-[44px]"
```

With:
```tsx
      className="fixed bottom-4 right-4 z-40 bg-[#2C5F7A]/80 backdrop-blur-sm shadow-lg border border-[#A8D8EA]/60 px-4 py-2 rounded-full font-heading text-xl flex items-center gap-2 min-h-[44px]"
```

Replace the span text color:
```tsx
      <span className="text-sm text-gray-600">{muted ? "Unmute" : "Music"}</span>
```
With:
```tsx
      <span className="text-sm text-[#A8D8EA]">{muted ? "Unmute" : "Music"}</span>
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

---

## Task 20: Remove Old Components + Final Build Check

**Files:**
- Delete: `components/Confetti.tsx`
- Delete: `components/FloatingBalloons.tsx`

- [ ] **Step 1: Delete old components**

```bash
cd /Users/mekari/Personal/joash-birthday && rm components/Confetti.tsx components/FloatingBalloons.tsx
```

- [ ] **Step 2: Verify no remaining imports**

```bash
cd /Users/mekari/Personal/joash-birthday && grep -r "Confetti\|FloatingBalloons" components/ app/ --include="*.tsx" --include="*.ts"
```

Expected: no output (both are now unreferenced).

- [ ] **Step 3: Full TypeScript check**

```bash
cd /Users/mekari/Personal/joash-birthday && npx tsc --noEmit 2>&1
```

Expected: no errors.

- [ ] **Step 4: Production build check**

```bash
cd /Users/mekari/Personal/joash-birthday && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/mekari/Personal/joash-birthday && git add -A && git commit -m "feat: Under the Sea retheme with SVG ocean illustrations"
```

Expected: commit created with all new/modified files.

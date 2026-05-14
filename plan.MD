# 🎂 Joash's 1st Birthday Invitation — Project Plan

## Project Summary

A mobile-first birthday invitation website for **Joash Jidly Yakobus** (born July 6, 2025, turning 1 on July 11, 2026), built with **Next.js 14+ App Router**, **Supabase**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**. Guests receive a unique URL containing their name, guest count, and (optionally) their invited name displayed on the page.

**Example URL:**
```
https://yourdomain.com/invite?name=Keluarga+Budi&validFor=4
```

---

## URL Parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `name` | string | optional | Invited guest's name, shown in the personalized greeting banner |
| `validFor` | integer | required | Max number of attendees allowed for this invitation |

- If `validFor` is missing, not a number, or < 1 → show full-page invalid link error
- If `name` is missing → greeting banner is hidden (graceful fallback)

---

## Phase 1 — Project Setup

- [ ] Initialize Next.js 14+ project with App Router and TypeScript
- [ ] Install dependencies:
  - `tailwindcss`, `postcss`, `autoprefixer`
  - `framer-motion`
  - `react-hook-form`, `zod`, `@hookform/resolvers`
  - `@supabase/supabase-js`
- [ ] Configure `tailwind.config.ts` with custom colors and font families
- [ ] Set up Google Fonts in `app/layout.tsx`: **Bubblegum Sans** (headings) + **Nunito** (body)
- [ ] Create `.env.local.example` with Supabase keys
- [ ] Set up `lib/supabase.ts` client

---

## Phase 2 — Supabase Database

- [ ] Create Supabase project
- [ ] Write migration: `supabase/migrations/001_create_rsvp_table.sql`

```sql
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

- [ ] Run migration in Supabase dashboard SQL editor
- [ ] Confirm anon key has insert + select permissions

---

## Phase 3 — API Routes

### `POST /api/rsvp`
- Validate: `name`, `phone`, `attendees`, `valid_for`, `will_attend` (all required)
- Validate: `attendees <= valid_for`
- Insert row into `rsvp` table
- Return: `{ success: true }` or `{ error: string }`

### `GET /api/wishes`
- Fetch all rows where `message IS NOT NULL AND message <> ''`
- Order by `submitted_at DESC`
- Return: `{ name, message, submitted_at }[]`

---

## Phase 4 — Page Structure (`/invite`)

The page reads `searchParams.name` and `searchParams.validFor` on the server.  
Passes them as props to client components.

### Validation (server-side, in `app/invite/page.tsx`)
```
validFor missing or NaN or < 1 → render <InvalidInvite /> full-page error
name missing → pass null, greeting banner hidden
name present → pass decoded string to <PersonalizedBanner />
```

---

## Phase 5 — Components

### `<PersonalizedBanner />` *(NEW)*
- Shown at the very top of the page, above the hero section
- Appears only when `name` param is present
- Content: **"Hi, [name]! 👋 You're personally invited to Joash's 1st Birthday! 🎉"**
- Design: full-width soft gradient banner (pink-to-yellow), bold Bubblegum Sans text, ribbon/badge decoration on the sides
- Framer Motion: slides down from top on mount

### `<Confetti />`
- 20+ CSS-animated confetti pieces
- Varied colors, shapes (circle, square, rectangle), fall speed, horizontal drift, delay

### `<FloatingBalloons />`
- 5–7 balloons, different pastel colors
- Float upward from bottom, gentle left-right sway via CSS keyframes

### `<HeroSection />`
- Full-screen with confetti + balloons layered behind
- Polaroid photo placeholder: dashed border, 📸 emoji, `[ Joash's Photo Here ]`, ~240×300px
- Heading: "You're Invited! 🎉"
- Subheading: "Come celebrate Joash's 1st Birthday!"
- Staggered Framer Motion fade+slide-up

### `<BirthdayHighlight />`
- Card with balloon/star icons
- Full name, born date (July 6, 2025), party age (1 Year Old), party date (July 11, 2026)
- Video placeholder: 16:9, dashed border, centered ▶️, `[ Birthday Video / Slideshow Here ]`
- Welcome message copy

### `<EventDetails />`
- Date: Saturday, July 11, 2026
- Time: 15.30 WIB (Jakarta Time)
- Venue: HokBen Trina Buah Batu
- Address: Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264
- "Get Directions" button → opens Google Maps URL in new tab
- Decorative map placeholder block

### `<RSVPForm />`
- Reads `validFor` prop (number)
- Shows: "This invitation is valid for up to [validFor] person(s)"
- Fields:
  1. Full Name (required)
  2. Phone / WhatsApp (required)
  3. Attendees stepper — +/- buttons, min 1, max validFor
  4. Will Attend — radio: Yes 🎉 / No 😢
  5. Message for Joash — textarea, **optional**
- Zod schema validation
- Submit → POST `/api/rsvp`
- On success → show `<SuccessOverlay />`
- On error → inline toast

### `<SuccessOverlay />`
- Full-screen takeover
- Confetti burst animation
- Scale-in message card: "Yay! See you at the party! 🎉🎈"
- Close/dismiss button

### `<WishesWall />`
- Fetches from GET `/api/wishes` on mount
- Each wish: guest name + message in a pastel card (randomized from 5 colors)
- Staggered fade-in with Framer Motion
- Empty state: "Be the first to leave Joash a birthday wish! 🌟"

### `<MusicPlayer />`
- Fixed bottom-right, pill-shaped, 🔊/🔇 toggle
- Audio triggered on first page tap/click
- Loops continuously
- Persists mute state in `localStorage`
- Placeholder audio URL (developer replaces with real kids birthday tune)

### `<Footer />`
- "With love, The Yakobus Family 💕"
- "© 2026 Joash's 1st Birthday"
- Balloon + star decorations

---

## Phase 6 — Zod Validation Schema (`lib/validations.ts`)

```ts
const rsvpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(6, "Phone number is required"),
  attendees: z.number().min(1),
  valid_for: z.number().min(1),
  will_attend: z.boolean(),
  message: z.string().optional(),
}).refine(data => data.attendees <= data.valid_for, {
  message: "Attendees cannot exceed the invitation limit",
  path: ["attendees"],
});
```

---

## Phase 7 — Animations Checklist

| Animation | Method | Trigger |
|---|---|---|
| Confetti rain | CSS keyframes | Page load |
| Floating balloons | CSS keyframes | Page load |
| Personalized banner slide-down | Framer Motion | Mount |
| Hero elements fade+slide | Framer Motion stagger | Mount |
| Section reveals | Framer Motion `whileInView` | Scroll |
| Wishes cards stagger | Framer Motion | Data loaded |
| Submit button pulse | CSS / Tailwind | Hover |
| Submit loading spinner | React state | Form submit |
| Success overlay scale-in | Framer Motion | Success state |
| Music button bounce | CSS keyframes | Mount |

---

## Phase 8 — Mobile-First Standards

- Design width: 375–430px (full width on mobile, centered max-430px on desktop)
- Touch targets: minimum 44px height
- Input font size: minimum 16px (prevents iOS auto-zoom)
- No horizontal overflow at any breakpoint
- `scroll-behavior: smooth`
- Music button z-index must not overlap active form inputs

---

## File Structure

```
joash-birthday/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Redirects to /invite
│   └── invite/
│       └── page.tsx                # Server component: reads name + validFor params
│   └── api/
│       ├── rsvp/route.ts           # POST — submit RSVP
│       └── wishes/route.ts         # GET — fetch public wishes
├── components/
│   ├── PersonalizedBanner.tsx      # NEW — "Hi [name]!" top banner
│   ├── Confetti.tsx
│   ├── FloatingBalloons.tsx
│   ├── HeroSection.tsx
│   ├── BirthdayHighlight.tsx
│   ├── EventDetails.tsx
│   ├── RSVPForm.tsx
│   ├── SuccessOverlay.tsx
│   ├── WishesWall.tsx
│   ├── MusicPlayer.tsx
│   └── Footer.tsx
├── lib/
│   ├── supabase.ts
│   └── validations.ts
├── supabase/
│   └── migrations/
│       └── 001_create_rsvp_table.sql
├── public/
│   └── (place your photo/audio files here)
├── .env.local.example
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## Invite Link Generator Examples

| Scenario | URL |
|---|---|
| Single guest, no name | `/invite?validFor=1` |
| Family of 4, with name | `/invite?name=Keluarga+Budi&validFor=4` |
| Couple, with name | `/invite?name=Budi+%26+Sari&validFor=2` |
| Large group | `/invite?name=Tim+Kantor&validFor=10` |
| Invalid (will show error) | `/invite?validFor=abc` |

---

## Replaceable Placeholders Checklist

Before going live, the developer must replace:

- [ ] **Hero photo** — replace the polaroid placeholder component with an `<Image />` tag pointing to Joash's actual photo
- [ ] **Birthday video** — replace the video placeholder with a `<video>` tag or YouTube embed
- [ ] **Background music** — replace the SoundHelix URL in `MusicPlayer.tsx` with a real kids birthday song (royalty-free recommended source: pixabay.com/music)
- [ ] **`[TIME PLACEHOLDER]`** — already set to 15.30 WIB ✅
- [ ] **`[VENUE]`** — already set to HokBen Trina Buah Batu ✅
- [ ] **`[ADDRESS]`** — already set ✅
- [ ] **`[MAPS LINK]`** — already set ✅

---

## Deployment (Vercel — Recommended)

1. Push repo to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy
5. Share invite links:
   ```
   https://your-vercel-url.vercel.app/invite?name=Keluarga+Budi&validFor=4
   ```

---

## Final Prompt (paste into AI coding tool)

```
You are an expert Next.js and Supabase developer. Build a complete, production-ready birthday invitation website with the following specifications:

---

## PROJECT OVERVIEW

Create a kids-themed birthday digital invitation website for Joash Jidly Yakobus who is turning 1 year old on July 11, 2026 (born July 6, 2025). The site must be fully mobile-first (optimized for mobile view), built with Next.js 14+ (App Router) and Supabase for the registration database.

---

## TECH STACK

- Framework: Next.js 14+ (App Router)
- Database: Supabase (PostgreSQL)
- Styling: Tailwind CSS
- Language: TypeScript
- Fonts: Google Fonts — "Bubblegum Sans" for headings, "Nunito" for body text
- Animation: Framer Motion
- Form: react-hook-form + zod
- Sound: HTML5 Audio API

---

## DESIGN THEME

Kids-themed, joyful, colorful:
- Bright pastel palette: soft yellow, mint green, baby blue, coral pink, lavender
- Confetti, balloons, stars, sparkles via CSS/SVG (no external image dependencies for decorations)
- Rounded, bubbly UI — border-radius 2xl and above throughout
- Mobile viewport: max-width 430px centered on desktop, full width on mobile

---

## URL PARAMETERS

The invitation URL supports two query params:

  https://yourdomain.com/invite?name=Keluarga+Budi&validFor=4

- `name` (string, optional): The invited guest's display name. Shown in a personalized greeting banner at the top of the page. If absent, the banner is hidden entirely.
- `validFor` (integer, required): Max attendees allowed for this invite. If missing, not a number, or less than 1 → show a full-page friendly error: "Oops! This invitation link seems to be invalid. Please contact the host. 🎈"

---

## PAGE STRUCTURE — /invite (single scrollable page)

### COMPONENT 0: <PersonalizedBanner />
- Rendered at the very top of the page, above the hero
- Only shown if `name` param is present
- Content: "Hi, [name]! 👋 You're personally invited to Joash's 1st Birthday! 🎉"
- Design: full-width gradient banner (coral pink to soft yellow), bold Bubblegum Sans, ribbon/badge decoration on sides
- Framer Motion: slides down from top on mount

### SECTION 1: Hero
- Full-screen with CSS confetti rain (20+ pieces, varied colors/shapes/speeds/delays) and floating balloons (5–7, different colors, upward float with left-right sway)
- Polaroid photo placeholder: dashed border, 📸 emoji, label "[ Joash's Photo Here ]", ~240×300px
- Heading: "You're Invited! 🎉"
- Subheading: "Come celebrate Joash's 1st Birthday!"
- Staggered Framer Motion fade+slide-up entrance

### SECTION 2: Birthday Boy Highlight
- Card with balloon/star icons
- Full name: Joash Jidly Yakobus
- Born: July 6, 2025
- Turning: 1 Year Old 🎂
- Party date: July 11, 2026
- Video placeholder: 16:9 block, dashed border, centered ▶️, label "[ Birthday Video / Slideshow Here ]"
- Welcome message: "Little Joash is turning ONE and we want YOU there to celebrate! 🥳"

### SECTION 3: Event Details
- Date: Saturday, July 11, 2026
- Time: 15.30 WIB (Jakarta Time)
- Venue: HokBen Trina Buah Batu
- Address: Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264
- "Get Directions" button → href: https://www.google.com/maps?vet=10CAAQoqAOahcKEwi4ws2M0LiUAxUAAAAAHQAAAAAQCQ..i&rlz=1C5FPAB_en&pvq=CgsvZy8xdGRocDNtdyIQCgpob2thIGJlbnRvEAIYAw&lqi=ChRob2thIGJlbnRvIGJ1YWggYmF0dUj7nOrH5YCAgAhaIhAAEAEYAhgDIhRob2thIGJlbnRvIGJ1YWggYmF0dTICaWSSARNqYXBhbmVzZV9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5CYVU5ZmFsbG5FQUW6AQcKBWJlbnRv-gEECAAQJA&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=id&sa=X&geocode=KWdNOxJj6GguMWUKfyRhSTPK&daddr=Jl.+Buah+Batu+No.229,+Turangga,+Kec.+Lengkong,+Kota+Bandung,+Jawa+Barat+40264
  Opens in new tab.
- Decorative map placeholder block with 📍 and dashed border

### SECTION 4: RSVP Form
- Heading: "Will You Come? 🎈"
- Show prominently: "This invitation is valid for up to [validFor] person(s)"
- Fields:
  1. Full Name — text, required
  2. Phone / WhatsApp — tel, required
  3. Number of Attendees — stepper (+/- buttons), min 1, max validFor. Error if exceeded: "Sorry, this invitation is only valid for [validFor] guest(s)."
  4. Will Attend — radio: "Yes, I'll be there! 🎉" / "Sadly, I can't make it 😢" — required
  5. Message for Joash — textarea, OPTIONAL, no required validation, placeholder: "Leave a birthday wish for Joash! 🎂"
- Submit button: "RSVP Now! 🎊", pulse on hover, spinner on submit
- On success: show <SuccessOverlay /> full-screen with confetti burst + "Yay! See you at the party! 🎉🎈"
- On error: inline toast

### SECTION 5: Wishes Wall
- Heading: "Wishes for Joash 💌"
- Fetch from GET /api/wishes on mount
- Display each wish as a pastel card: guest name + message
- Randomize card background from 5 pastel colors
- Staggered Framer Motion fade-in
- Empty state: "Be the first to leave Joash a birthday wish! 🌟"

### SECTION 6: Footer
- "With love, The Yakobus Family 💕"
- "© 2026 Joash's 1st Birthday"
- Balloon + star decorations

---

## BACKGROUND MUSIC

- Trigger on first user tap/click (browser autoplay policy compliance)
- Loop continuously
- Placeholder URL: https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
  (developer replaces with real kids birthday song)
- Floating mute/unmute button fixed bottom-right: 🔊/🔇, pill-shaped, semi-transparent, bounce animation on mount
- Persist mute preference in localStorage

---

## SUPABASE

### Migration — supabase/migrations/001_create_rsvp_table.sql

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
CREATE POLICY "Allow public insert" ON rsvp FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select" ON rsvp FOR SELECT TO anon USING (true);

### .env.local.example

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

### lib/supabase.ts
Create Supabase client using @supabase/supabase-js.

### app/api/rsvp/route.ts — POST
- Server-side validate all required fields
- Validate attendees <= valid_for
- Insert into rsvp table
- Return { success: true } or { error: string }

### app/api/wishes/route.ts — GET
- SELECT name, message, submitted_at FROM rsvp WHERE message IS NOT NULL AND message <> '' ORDER BY submitted_at DESC
- Return as JSON array

---

## ZOD SCHEMA — lib/validations.ts

const rsvpSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  attendees: z.number().min(1),
  valid_for: z.number().min(1),
  will_attend: z.boolean(),
  message: z.string().optional(),
}).refine(data => data.attendees <= data.valid_for, {
  message: "Attendees cannot exceed the invitation limit",
  path: ["attendees"],
});

---

## ANIMATIONS

| Animation | Method | Trigger |
|---|---|---|
| Confetti rain | CSS keyframes | Page load |
| Floating balloons | CSS keyframes | Page load |
| Personalized banner slide-down | Framer Motion | Mount |
| Hero elements stagger | Framer Motion | Mount |
| Section reveals | Framer Motion whileInView | Scroll |
| Wishes cards stagger | Framer Motion | Data loaded |
| Submit button pulse | CSS/Tailwind | Hover |
| Loading spinner | React state | Submit |
| Success overlay scale-in | Framer Motion | Success |
| Music button bounce | CSS keyframes | Mount |

---

## MOBILE-FIRST

- Design for 375–430px width
- Touch targets: min 44px height
- Input font size: min 16px (prevent iOS zoom)
- No horizontal overflow
- scroll-behavior: smooth
- Music button must not overlap form inputs

---

## FILE STRUCTURE

app/
  layout.tsx
  page.tsx                        (redirect to /invite)
  invite/page.tsx                 (server component: reads name + validFor searchParams)
  api/rsvp/route.ts               (POST)
  api/wishes/route.ts             (GET)
components/
  PersonalizedBanner.tsx
  Confetti.tsx
  FloatingBalloons.tsx
  HeroSection.tsx
  BirthdayHighlight.tsx
  EventDetails.tsx
  RSVPForm.tsx
  SuccessOverlay.tsx
  WishesWall.tsx
  MusicPlayer.tsx
  Footer.tsx
lib/
  supabase.ts
  validations.ts
supabase/migrations/001_create_rsvp_table.sql
.env.local.example
tailwind.config.ts
package.json
README.md

---

## DELIVERABLES

Generate complete file-by-file code. Show the full path and full code for every single file. Do not abbreviate, skip, or use "// ... rest of code" shortcuts. Generate files in this order:

1. package.json
2. tailwind.config.ts
3. app/layout.tsx
4. app/page.tsx
5. app/invite/page.tsx
6. components/PersonalizedBanner.tsx
7. components/Confetti.tsx
8. components/FloatingBalloons.tsx
9. components/HeroSection.tsx
10. components/BirthdayHighlight.tsx
11. components/EventDetails.tsx
12. components/RSVPForm.tsx
13. components/SuccessOverlay.tsx
14. components/WishesWall.tsx
15. components/MusicPlayer.tsx
16. components/Footer.tsx
17. app/api/rsvp/route.ts
18. app/api/wishes/route.ts
19. lib/supabase.ts
20. lib/validations.ts
21. supabase/migrations/001_create_rsvp_table.sql
22. .env.local.example
23. README.md
```
# Joash's 1st Birthday Invitation — Design Spec

**Date:** 2026-05-14  
**Project:** Joash Jidly Yakobus — 1st Birthday Digital Invitation  
**Party date:** Saturday, July 11, 2026, 15.30 WIB  
**Venue:** HokBen Trina Buah Batu, Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Bubblegum Sans (headings), Nunito (body) — Google Fonts |
| Animation | Framer Motion + CSS keyframes |
| Form | react-hook-form + zod + @hookform/resolvers |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

---

## URL Parameters

| Param | Type | Behavior |
|---|---|---|
| `name` | string | Optional. If present, shown in `<PersonalizedBanner />`. If absent, banner is hidden. |
| `validFor` | integer | Optional. If missing, not a number, or < 1 → **silently default to 1**. No error page. |

**No `<InvalidInvite />` component.** All edge cases for `validFor` resolve to 1.

---

## Architecture

### Routing

- `app/page.tsx` — redirects to `/invite`
- `app/invite/page.tsx` — **server component**: reads `searchParams`, resolves `validFor` (default 1), passes `name` (string | null) and `validFor` (number, always ≥ 1) as props to client components

### Data Flow

```
Browser
  │
  ├─ RSVPForm (client)
  │     └─ POST /api/rsvp (server route)
  │           └─ Supabase: INSERT into rsvp
  │
  └─ WishesWall (client)
        └─ GET /api/wishes (server route)
              └─ Supabase: SELECT from rsvp WHERE message IS NOT NULL
```

- **Supabase client** lives only in `lib/supabase.ts`, used exclusively inside API routes (server-side). Credentials never sent to the browser.
- `WishesWall` re-fetches after a successful RSVP so a new wish appears immediately.

---

## Page Layout (top → bottom on `/invite`)

1. `<PersonalizedBanner />` — conditional on `name` param
2. `<HeroSection />` — full-screen; contains `<Confetti />` and `<FloatingBalloons />`
3. `<BirthdayHighlight />` — birthday boy card + video placeholder
4. `<EventDetails />` — date/time/venue/directions
5. `<RSVPForm />` — form; owns `<SuccessOverlay />`
6. `<WishesWall />` — fetched wishes
7. `<Footer />`
8. `<MusicPlayer />` — fixed bottom-right, outside page flow

---

## Component Specifications

### `<PersonalizedBanner />`
- Rendered only when `name` prop is non-null
- Content: `"Hi, [name]! 👋 You're personally invited to Joash's 1st Birthday! 🎉"`
- Full-width gradient banner (coral pink → soft yellow), Bubblegum Sans bold
- Framer Motion: slides down from top on mount

### `<HeroSection />`
- Full-screen section
- Contains `<Confetti />` (20+ CSS-animated pieces) and `<FloatingBalloons />` (5–7 balloons) layered behind content
- Polaroid placeholder: dashed border, 📸 emoji, label `[ Joash's Photo Here ]`, ~240×300px
- Heading: `"You're Invited! 🎉"` (Bubblegum Sans)
- Subheading: `"Come celebrate Joash's 1st Birthday!"`
- Framer Motion staggered fade+slide-up

### `<Confetti />` (sub-component of HeroSection)
- 20+ pieces, CSS keyframes only
- Varied: colors, shapes (circle/square/rectangle), fall speed, horizontal drift, delay

### `<FloatingBalloons />` (sub-component of HeroSection)
- 5–7 balloons, pastel colors, CSS keyframes
- Float upward from bottom, gentle left-right sway

### `<BirthdayHighlight />`
- Card with balloon/star icons
- Info: full name, born July 6 2025, turning 1 Year Old, party July 11 2026
- Video placeholder: 16:9 block, dashed border, centered ▶️, label `[ Birthday Video / Slideshow Here ]`
- Welcome copy: `"Little Joash is turning ONE and we want YOU there to celebrate! 🥳"`
- Framer Motion `whileInView` reveal

### `<EventDetails />`
- Date: Saturday, July 11, 2026
- Time: 15.30 WIB
- Venue: HokBen Trina Buah Batu
- Address: Jl. Buah Batu No.229, Turangga, Kec. Lengkong, Kota Bandung, Jawa Barat 40264
- "Get Directions" button → Google Maps link, `target="_blank" rel="noopener noreferrer"`
- Decorative map placeholder with 📍 and dashed border
- Framer Motion `whileInView` reveal

### `<RSVPForm />`
- Receives `validFor` (number) and `name` (string | null) as props
- Shows: `"This invitation is valid for up to [validFor] person(s)"`
- Fields:
  1. Full Name — text, required, min 2 chars
  2. Phone / WhatsApp — tel, required, min 6 chars
  3. Attendees stepper — +/- buttons, min 1, max `validFor`. If `validFor=1`, stepper is static (both buttons disabled at 1)
  4. Will Attend — radio: `"Yes, I'll be there! 🎉"` / `"Sadly, I can't make it 😢"`, required
  5. Message for Joash — textarea, **optional**, placeholder: `"Leave a birthday wish for Joash! 🎂"`
- Submit: `"RSVP Now! 🎊"`, pulse on hover, spinner on submit
- Success → renders `<SuccessOverlay />`
- Error → inline toast

### `<SuccessOverlay />`
- Full-screen takeover
- Confetti burst animation
- Scale-in message: `"Yay! See you at the party! 🎉🎈"`
- Dismiss button to close

### `<WishesWall />`
- Fetches `GET /api/wishes` on mount; re-fetches after RSVP success
- Pastel card per wish (name + message), background randomized from 5 colors
- Framer Motion staggered fade-in
- Empty state: `"Be the first to leave Joash a birthday wish! 🌟"`

### `<MusicPlayer />`
- Fixed `bottom-4 right-4`, pill-shaped, semi-transparent
- Audio triggered on first user tap/click (autoplay policy compliance)
- Placeholder URL: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`
- Loops continuously; mute state persisted in `localStorage`
- 🔊 / 🔇 toggle; CSS bounce animation on mount
- z-index below active form overlays

### `<Footer />`
- `"With love, The Yakobus Family 💕"`
- `"© 2026 Joash's 1st Birthday"`
- Balloon + star decorations

---

## Database

### Table: `rsvp`

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

---

## API Routes

### `POST /api/rsvp`
- Server-side validates: `name`, `phone`, `attendees`, `valid_for`, `will_attend` (all required)
- Validates `attendees <= valid_for`
- Inserts into `rsvp`
- Returns `{ success: true }` or `{ error: string }`

### `GET /api/wishes`
- `SELECT name, message, submitted_at FROM rsvp WHERE message IS NOT NULL AND message <> '' ORDER BY submitted_at DESC`
- Returns JSON array of `{ name, message, submitted_at }`

---

## Zod Schema (`lib/validations.ts`)

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

## Animations

| Animation | Method | Trigger |
|---|---|---|
| Confetti rain | CSS keyframes | Page load |
| Floating balloons | CSS keyframes | Page load |
| Music button bounce | CSS keyframes | Mount |
| PersonalizedBanner slide-down | Framer Motion | Mount |
| Hero elements stagger | Framer Motion | Mount |
| Section reveals | Framer Motion `whileInView` | Scroll |
| Wishes cards stagger | Framer Motion | Data loaded |
| Submit button pulse | Tailwind hover | Hover |
| Submit loading spinner | React state | Submit |
| Success overlay scale-in | Framer Motion | Success state |

---

## Under the Sea Retheme (v2)

**Decision:** Full watercolor Under the Sea theme using inline SVG illustrations.  
**Tagline:** *"Joash's ONEderful Year"*  
**Reference image:** Soft pastel baby blue/teal/sandy watercolor party backdrop with illustrated ocean creatures.

### Pastel Color Palette

| Role | Hex | Usage |
|---|---|---|
| Hero sky | `#E8F4FD` | Hero section top gradient |
| Shallow water | `#C5DFF0` | Hero mid gradient, section borders |
| Mid water | `#A8D8EA` | General water bg, cards |
| Seafoam teal | `#8FC4B7` | Section dividers, accents |
| Sandy floor | `#E8D5B7` | EventDetails background base |
| Muted coral | `#E8967A` | Accent color (replaces `--color-coral`) |
| Off-white foam | `#F8FBFF` | Card backgrounds, foam highlights |
| Deep navy text | `#2C5F7A` | All headings and body text |
| Sandy beige (dark) | `#C4A882` | Shell/crab details |
| Seaweed green | `#6BAF9A` | Seaweed SVG fills |

Replace entire `@theme` block in `globals.css`:
- `--color-ocean-sky: #E8F4FD`
- `--color-ocean-shallow: #C5DFF0`
- `--color-ocean-mid: #A8D8EA`
- `--color-ocean-teal: #8FC4B7`
- `--color-ocean-sand: #E8D5B7`
- `--color-ocean-coral: #E8967A`
- `--color-ocean-foam: #F8FBFF`
- `--color-ocean-deep: #2C5F7A`
- `--color-ocean-seaweed: #6BAF9A`
- Keep `--font-heading` and `--font-body` unchanged

### Section Background Flow (top → bottom)

| Section | Background |
|---|---|
| `PersonalizedBanner` | Gradient `ocean-sky → ocean-shallow` |
| `HeroSection` | Gradient `ocean-sky → ocean-mid` with SVG creature overlay |
| `BirthdayHighlight` | `ocean-foam` (off-white) with aqua watercolor wash |
| `EventDetails` | Gradient `ocean-sand → ocean-shallow` (sandy floor feel) |
| `RSVPForm` | `ocean-teal` (deep water, medium dark) |
| `WishesWall` | Gradient `ocean-mid → ocean-shallow` |
| `Footer` | `ocean-deep` (darkest blue, seafloor) |

All section transitions use `<WaveDivider />` SVG between each section.

### New SVG Illustration Components

All live in `components/ocean/`. All are `aria-hidden`, `pointer-events-none`, purely decorative.

#### `OceanWhale.tsx`
- Watercolor-style humpback whale, soft blue-grey fills with white belly highlight
- Size: ~180px wide (mobile), positioned right side of hero
- Animation: Framer Motion `animate={{ y: [0, -10, 0] }}` infinite 4s ease-in-out

#### `OceanJellyfish.tsx`
- Round dome with trailing tentacles, soft translucent fills (`#C5DFF0` with 0.7 opacity dome, `#A8D8EA` tentacles)
- Size: ~60-80px, 2 instances in hero at different positions/sizes
- Animation: CSS `@keyframes jellyfish-float` — `translateY(-12px)` + gentle `rotate(5deg)` sway, 3s infinite

#### `OceanTurtle.tsx`
- Round shell (hexagonal patch pattern), soft green-grey fills
- Size: ~70px, placed in `BirthdayHighlight` section lower-left
- Animation: CSS `@keyframes turtle-swim` — slow `translateX(110%)` across section over 18s, infinite

#### `OceanFish.tsx`
- Simple cartoon fish, golden/orange watercolor fill (like the image)
- Size: ~40px, 3-4 instances across sections at different y positions/sizes
- Animation: CSS `@keyframes fish-swim` — `translateX(-110%)` (right to left), varying speed 10-16s

#### `OceanCrab.tsx`
- Small round body, claw arms, orange-red fill
- Size: ~50px, placed at base of `EventDetails` section on sandy floor
- No animation (static decor on "sandy floor")

#### `OceanShell.tsx`
- Spiral shell, warm sandy/cream fills with dark outline hints
- Size: ~35-45px, 2 instances — one in `EventDetails`, one in `Footer`
- No animation (static)

#### `OceanSeaweed.tsx`
- Two wavy stalk shapes with rounded leaf tips, seafoam green fill
- Size: ~80px tall, placed bottom-left and bottom-right of `HeroSection` and `EventDetails`
- Animation: CSS `@keyframes seaweed-sway` — `rotate(8deg)` from `transform-origin: bottom center`, 2.5s ease-in-out infinite alternate

#### `RisingBubbles.tsx` (replaces `FloatingBalloons.tsx`)
- 8-12 circles, varied sizes (8-24px), `ocean-foam` fill at 40-70% opacity
- CSS `@keyframes bubble-rise` — `translateY(-110vh)` from bottom, slight horizontal drift, 6-12s per bubble, staggered delays
- Replaces the current `BALLOONS` array + `balloon-rise` keyframe entirely

#### `WaveDivider.tsx`
- SVG `<path>` using a gentle sine wave curve
- Props: `fill` (string), `flip` (boolean, defaults false — flips vertically for downward wave)
- Used between every section as a visual transition

### Hero Section Changes (`HeroSection.tsx`)
- Background: `bg-gradient-to-b from-[#E8F4FD] via-[#C5DFF0] to-[#A8D8EA]`
- Remove `<Confetti />` — confetti doesn't fit the ocean theme
- Replace `<FloatingBalloons />` with `<RisingBubbles />`
- Add `<OceanWhale />` positioned `absolute right-0 top-1/3`
- Add 2× `<OceanJellyfish />` at different hero positions
- Add `<OceanSeaweed />` at bottom-left and bottom-right
- Change `<h1>` text to `"Joash's ONEderful Year"` in `ocean-deep` color
- Change subtext to `"Come celebrate Joash's 1st Birthday! 🐚"`
- RSVP button: background `ocean-coral`, text `ocean-foam`
- Polaroid border: change from `border-gray-300` to `border-[#A8D8EA]`

### PersonalizedBanner Changes
- Gradient: `from-[#A8D8EA] to-[#C5DFF0]` (ocean blues, replacing coral→yellow)
- Replace `🎀` emoji with `🐚`
- Text color: `ocean-deep` (`#2C5F7A`)

### BirthdayHighlight Changes
- Background: `bg-[#F8FBFF]` with inner card `bg-gradient-to-br from-[#E8F4FD] to-[#C5DFF0]`
- Replace `🎂🎈⭐` with `🐋🌊🐠`
- Add `<OceanTurtle />` as decorative element lower-left
- Add 2× `<OceanFish />` as decorative elements
- `text-coral` → `text-[#2C5F7A]` (ocean-deep)
- Keep `"The Birthday Boy!"` heading text unchanged

### EventDetails Changes
- Background: `bg-gradient-to-b from-[#E8D5B7] to-[#C5DFF0]` (sandy floor → water)
- Add `<OceanCrab />` and `<OceanShell />` at bottom of card
- Add `<OceanSeaweed />` on left edge
- Replace `📅` icon with `🌊`, keep other emoji as-is
- "Get Directions" button: `bg-[#E8967A]` (ocean-coral)
- Card background: `bg-[#F8FBFF]`

### RSVPForm Changes
- Section background: `bg-[#8FC4B7]` (ocean-teal)
- Card/form area: `bg-[#F8FBFF]` white
- Heading: `"RSVP 🐠"` in `ocean-deep`
- Submit button: `bg-[#E8967A]` ocean-coral
- Error toast: same coral bg
- Will Attend radio highlight color: `ocean-coral`

### WishesWall Changes
- Background: `bg-gradient-to-b from-[#A8D8EA] to-[#C5DFF0]`
- Card colors: replace current `bg-pink-100` etc. with ocean pastels:
  `["bg-[#E8F4FD]", "bg-[#D6EAF8]", "bg-[#C5DFF0]", "bg-[#E8D5B7]", "bg-[#F0F9FF]"]`
- Add 2-3 small `<OceanFish />` as decorative floaters behind cards
- Heading: `"Wishes for Joash 🐚"` in `ocean-deep`

### Footer Changes
- Background: `bg-[#2C5F7A]` (ocean-deep)
- Text: `ocean-foam` (`#F8FBFF`)
- Replace `🎈⭐🎈` with `🐚🌊🐚`
- Add `<OceanShell />` decorative elements
- Keep `"With love, The Yakobus Family 💕"` text

### SuccessOverlay Changes
- Background: `bg-[#A8D8EA]` with ocean-foam card
- Replace confetti burst with CSS bubble-burst animation (radial scatter of bubble dots)
- Message: `"Yay! See you at the party! 🐠🎉"` in `ocean-deep`
- Dismiss button: `ocean-coral` bg

### MusicPlayer Changes
- Background: `bg-[#2C5F7A]/80` (semi-transparent ocean-deep)
- Icon: `🎵` → same, text color `ocean-foam`

### New CSS Keyframes to add to `globals.css`
```css
@keyframes bubble-rise {
  0% { transform: translateY(0) translateX(0); opacity: 0.7; }
  50% { transform: translateY(-50vh) translateX(8px); opacity: 0.5; }
  100% { transform: translateY(-110vh) translateX(-4px); opacity: 0; }
}

@keyframes jellyfish-float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
}

@keyframes turtle-swim {
  0% { transform: translateX(-110%); }
  100% { transform: translateX(110vw); }
}

@keyframes fish-swim {
  0% { transform: translateX(110%) scaleX(-1); }
  100% { transform: translateX(-110vw) scaleX(-1); }
}

@keyframes seaweed-sway {
  0% { transform: rotate(-8deg); }
  100% { transform: rotate(8deg); }
}
```

Remove: `@keyframes balloon-rise`, `@keyframes confetti-fall` (no longer used)

### Files to Create
- `components/ocean/OceanWhale.tsx`
- `components/ocean/OceanJellyfish.tsx`
- `components/ocean/OceanTurtle.tsx`
- `components/ocean/OceanFish.tsx`
- `components/ocean/OceanCrab.tsx`
- `components/ocean/OceanShell.tsx`
- `components/ocean/OceanSeaweed.tsx`
- `components/ocean/RisingBubbles.tsx`
- `components/ocean/WaveDivider.tsx`

### Files to Modify
- `app/globals.css` — palette + keyframes
- `components/HeroSection.tsx`
- `components/PersonalizedBanner.tsx`
- `components/BirthdayHighlight.tsx`
- `components/EventDetails.tsx`
- `components/RSVPForm.tsx`
- `components/WishesWall.tsx`
- `components/Footer.tsx`
- `components/SuccessOverlay.tsx`
- `components/MusicPlayer.tsx`

### Files to Delete
- `components/Confetti.tsx` (replaced by ocean theme — no confetti)
- `components/FloatingBalloons.tsx` (replaced by `RisingBubbles.tsx`)

---

## Mobile-First Rules

- Max width 430px, centered on desktop (`mx-auto`)
- All inputs: `text-base` (16px minimum) — prevents iOS auto-zoom
- Touch targets: minimum 44px height on all interactive elements
- No horizontal overflow — confetti clipped with `overflow-hidden` on hero container
- `scroll-behavior: smooth`
- MusicPlayer z-index must not overlap active form overlays

---

## File Structure

```
joash-birthday/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # redirect to /invite
│   └── invite/
│       └── page.tsx                    # server component
│   └── api/
│       ├── rsvp/route.ts               # POST
│       └── wishes/route.ts             # GET
├── components/
│   ├── PersonalizedBanner.tsx
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
├── .env.local.example
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## Implementation Order (Vertical Slice — Option A)

1. Project scaffold: Next.js init, Tailwind, Google Fonts, `tailwind.config.ts`
2. `app/invite/page.tsx` — param parsing, default logic, prop passing
3. `lib/supabase.ts` + `.env.local.example`
4. `supabase/migrations/001_create_rsvp_table.sql`
5. `lib/validations.ts`
6. `app/api/rsvp/route.ts`
7. `app/api/wishes/route.ts`
8. `components/RSVPForm.tsx` + `components/SuccessOverlay.tsx`
9. `components/WishesWall.tsx`
10. `components/HeroSection.tsx` (with Confetti + FloatingBalloons inline)
11. `components/BirthdayHighlight.tsx`
12. `components/EventDetails.tsx`
13. `components/Footer.tsx`
14. `components/PersonalizedBanner.tsx`
15. `components/MusicPlayer.tsx`
16. `app/layout.tsx`, `app/page.tsx`, `README.md`

---

## Replaceable Placeholders (pre-launch checklist)

- [ ] Hero photo — replace polaroid placeholder with `<Image />` pointing to Joash's photo
- [ ] Birthday video — replace video placeholder with `<video>` or YouTube embed
- [ ] Background music — replace SoundHelix URL with royalty-free kids song (pixabay.com/music)

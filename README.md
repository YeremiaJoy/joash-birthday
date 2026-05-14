# Joash's 1st Birthday Invitation

Mobile-first birthday invitation website for Joash Jidly Yakobus (turning 1 on July 11, 2026).

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
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
| `name` | No | Guest name shown in personalized banner |
| `validFor` | No | Max attendees (defaults to 1 if missing/invalid, capped at 20) |

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Before Going Live

- [ ] Replace polaroid placeholder in `components/HeroSection.tsx` with `<Image />` pointing to Joash's actual photo
- [ ] Replace video placeholder in `components/BirthdayHighlight.tsx` with real video embed
- [ ] Replace audio URL in `components/MusicPlayer.tsx` with royalty-free kids song (pixabay.com/music)

## Example Invite URLs

| Scenario | URL |
|---|---|
| Single guest (default) | `/invite` |
| Family of 4 with name | `/invite?name=Keluarga+Budi&validFor=4` |
| Couple with name | `/invite?name=Budi+%26+Sari&validFor=2` |
| Large group | `/invite?name=Tim+Kantor&validFor=10` |

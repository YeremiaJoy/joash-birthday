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
  return Math.min(parsed, 20);
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

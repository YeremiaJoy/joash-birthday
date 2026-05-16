// app/invite/page.tsx
import PersonalizedBanner from "@/components/PersonalizedBanner";
import HeroSection from "@/components/HeroSection";
import BirthdayHighlight from "@/components/BirthdayHighlight";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import WishesWall from "@/components/WishesWall";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import { findInvitee } from "@/lib/invitation";

interface InvitePageProps {
  searchParams: Promise<{ name?: string }>;
}

export default async function InvitePage({ searchParams }: InvitePageProps) {
  const params = await searchParams;
  const name = params.name ? decodeURIComponent(params.name) : null;
  const invitee = name ? findInvitee(name) : null;

  return (
    <EnvelopeIntro>
      <main className="max-w-[430px] mx-auto min-h-screen relative">
        {name && <PersonalizedBanner name={name} />}
        <HeroSection />
        <BirthdayHighlight />
        <EventDetails />
        <RSVPForm
          maxAdults={invitee?.adults ?? null}
          maxChildren={invitee?.children ?? null}
          name={name}
        />
        <WishesWall />
        <Footer />
        <MusicPlayer />
      </main>
    </EnvelopeIntro>
  );
}

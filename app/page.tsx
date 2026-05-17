// app/invite/page.tsx
import OneBanner from "@/components/OneBanner";
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
  const rawName = params.name ? decodeURIComponent(params.name) : null;
  const invitee = rawName ? findInvitee(rawName) : null;
  const displayName = invitee?.fullName ?? rawName;

  return (
    <EnvelopeIntro>
      <main className="max-w-[430px] mx-auto min-h-screen relative">
        <OneBanner />
        {displayName && <PersonalizedBanner name={displayName} />}
        <HeroSection />
        <BirthdayHighlight />
        <EventDetails />
        <RSVPForm
          maxAdults={invitee?.adults ?? null}
          maxChildren={invitee?.children ?? null}
          name={displayName}
        />
        <WishesWall />
        <Footer />
        <MusicPlayer />
      </main>
    </EnvelopeIntro>
  );
}

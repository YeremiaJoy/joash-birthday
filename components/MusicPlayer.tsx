// components/MusicPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { registerAudio } from "@/lib/audioContext";

const AUDIO_URL = '/audio/joash-birthday.mp3';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.muted = false;
    registerAudio(audioRef.current);

    audioRef.current.play().then(() => {
      setStarted(true);
    }).catch(() => {
      // Autoplay blocked — playback will start on first user interaction
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    function handleFirstInteraction() {
      if (!started && audioRef.current) {
        audioRef.current.play().catch(() => {});
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
  }

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className="fixed bottom-4 right-4 z-40 bg-[#2C5F7A]/80 backdrop-blur-sm shadow-lg border border-[#A8D8EA]/60 px-4 py-2 rounded-full font-heading text-xl flex items-center gap-2 min-h-[44px]"
      style={{ animation: "bounce-music 2s ease-in-out infinite" }}
    >
      {muted ? "🔇" : "🔊"}
      <span className="text-sm text-[#A8D8EA]">{muted ? "Unmute" : "Music"}</span>
    </button>
  );
}

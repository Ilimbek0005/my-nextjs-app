"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  autoPlayTrigger: boolean;
  src?: string;
}

export default function MusicPlayer({
  autoPlayTrigger,
  src = "/music/kereksinmaga.mp3",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Автозапуск заблокирован браузером — гость включит вручную
        });
    }
  }, [autoPlayTrigger]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0 }}
        animate={{ opacity: autoPlayTrigger ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed top-4 left-4 z-50 w-11 h-11 rounded-full bg-[#fcf8f5]/90 border border-[#e6dad0] shadow-sm flex items-center justify-center text-[#8b263e] backdrop-blur-sm"
        aria-label={isPlaying ? "Пауза" : "Включить музыку"}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3.5" height="12" />
            <rect x="9.5" y="2" width="3.5" height="12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2 L14 8 L4 14 Z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}

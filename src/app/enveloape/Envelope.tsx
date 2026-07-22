"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EnvelopeFlap from "./EnvelopeFlap";
import EnvelopeSeal from "./EnvelopeSeal";
import SealSparkles from "../SealShape/SealSparkles";
import EnvelopeSeams from "./EnvelopeSeams";

interface EnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

export default function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const [isBreaking, setIsBreaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isBreaking) return;
    setIsBreaking(true);
    setIsOpen(true);
    setTimeout(() => onOpen(), 500); // почти сразу — сайт проявляется, пока конверт ещё открывается
  };

  return (
    <motion.div
      key="envelope"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center bg-[#f3e6dd] overflow-hidden"
    >
      <div
        className="relative w-full h-full sm:w-[92vw] sm:h-[92vh] sm:max-w-xl sm:max-h-[820px] sm:rounded-md sm:shadow-2xl overflow-hidden"
        style={{ perspective: 1800 }}
      >
        <EnvelopeFlap position="top" isOpen={isOpen} />
        <EnvelopeFlap position="bottom" isOpen={isOpen} />
        <EnvelopeFlap position="left" isOpen={isOpen} />
        <EnvelopeFlap position="right" isOpen={isOpen} />

        <EnvelopeSeams isOpen={isOpen} />
        <EnvelopeSeal isBreaking={isBreaking} />

        <motion.p
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[190px] sm:-translate-y-[170px] font-serif italic text-[#8b263e] text-lg sm:text-xl tracking-wide text-center px-6 z-10 leading-snug"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Приглашение на свадьбу
        </motion.p>
        <SealSparkles trigger={isBreaking} />

        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-16 sm:pb-20 pointer-events-none"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#a18c7e] mb-2">
            Приглашение для
          </p>
          <p className="font-serif italic text-xl sm:text-2xl text-[#5c4738] mb-8">
            {guestName}
          </p>
          <button
            onClick={handleClick}
            disabled={isBreaking}
            className="pointer-events-auto px-8 py-3 rounded-full border border-[#8b263e] text-[#8b263e] text-sm tracking-widest uppercase hover:bg-[#8b263e] hover:text-[#fcf8f5] transition-colors duration-300 disabled:opacity-50"
          >
            Открыть приглашение
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

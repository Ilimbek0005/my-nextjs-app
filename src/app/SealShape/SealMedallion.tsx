"use client";

import { motion } from "framer-motion";

export default function SealMedallion({ isBreaking }: { isBreaking: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="absolute w-40 h-40 sm:w-48 sm:h-48 z-10 pointer-events-none"
      animate={
        isBreaking
          ? { opacity: 0, scale: 1.15 }
          : { opacity: 1, scale: 1, rotate: 360 }
      }
      transition={
        isBreaking
          ? { duration: 0.6 }
          : {
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }
      }
    >
      <circle cx="100" cy="100" r="92" stroke="#c9a15a" strokeWidth="0.5" opacity="0.35" fill="none" strokeDasharray="1 6" />
      <circle cx="100" cy="100" r="78" stroke="#c9a15a" strokeWidth="0.5" opacity="0.3" fill="none" />
    </motion.svg>
  );
}
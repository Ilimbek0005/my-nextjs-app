"use client";

import { motion } from "framer-motion";
import { Marck_Script } from "next/font/google";
import SealShape from "../SealShape/SealShape";

const monogram = Marck_Script({ weight: "400", subsets: ["cyrillic", "latin"] });

interface EnvelopeSealProps {
  isBreaking: boolean;
}

export default function EnvelopeSeal({ isBreaking }: EnvelopeSealProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28"
        style={{ clipPath: "inset(0 50% 0 0)" }}
        animate={
          isBreaking
            ? { x: -18, y: 6, rotate: -12, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <SealShape />
      </motion.div>

      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28"
        style={{ clipPath: "inset(0 0 0 50%)" }}
        animate={
          isBreaking
            ? { x: 18, y: 6, rotate: 12, opacity: 0 }
            : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.6, ease: "easeIn" }}
      >
        <SealShape />
      </motion.div>

      <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-[-50%]"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)",
          }}
          animate={isBreaking ? { opacity: 0 } : { x: ["-30%", "30%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28"
        animate={isBreaking ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <span className={`${monogram.className} text-[#f3e4de] text-3xl sm:text-4xl`}>
          А&А
        </span>
      </motion.div>

      <motion.div
        className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 49%, rgba(0,0,0,0.35) 50%, transparent 51%)",
        }}
        initial={{ opacity: 0 }}
        animate={isBreaking ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}
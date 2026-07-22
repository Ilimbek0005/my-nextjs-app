"use client";

import { motion } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";
import { TornEdgeTop, TornEdgeBottom } from "./TornEdge";

const heroFont = Cormorant_Garamond({ weight: ["500", "600"], style: ["italic"], subsets: ["latin", "cyrillic"] });

export default function Hero({
  groomName,
  brideName,
  imageUrl,
}: {
  groomName: string;
  brideName: string;
  imageUrl?: string | null;
}) {
  return (
    <section className="relative min-h-[65vh] sm:min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl || "/img/foto.png"}')`,
        }}
      />

      {/* Многослойный градиент: тёмный сверху, кремовый растворяющийся снизу, золотое свечение вокруг центра */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(139,38,62,0.35) 0%, transparent 35%),
            linear-gradient(0deg, rgba(254,252,250,1) 0%, rgba(254,252,250,0.75) 10%, transparent 30%),
            radial-gradient(ellipse at 50% 40%, rgba(201,161,90,0.22) 0%, transparent 55%),
            linear-gradient(180deg, rgba(61,15,26,0.15) 0%, rgba(61,15,26,0.4) 100%)
          `,
        }}
      />

      {/* Тонкая орнаментальная рамка по периметру */}
      <div className="absolute inset-3 sm:inset-4 border border-[#c9a15a]/35 rounded-xl pointer-events-none" />
      <svg className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 opacity-60" viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M2 20 C 2 8, 8 2, 20 2"
          stroke="#c9a15a"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </svg>
      <svg className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 opacity-60 scale-x-[-1]" viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M2 20 C 2 8, 8 2, 20 2"
          stroke="#c9a15a"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </svg>
      <svg className="absolute bottom-4 left-4 w-8 h-8 sm:w-10 sm:h-10 opacity-60 scale-y-[-1]" viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M2 20 C 2 8, 8 2, 20 2"
          stroke="#c9a15a"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </svg>
      <svg className="absolute bottom-4 right-4 w-8 h-8 sm:w-10 sm:h-10 opacity-60 scale-x-[-1] scale-y-[-1]" viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M2 20 C 2 8, 8 2, 20 2"
          stroke="#c9a15a"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </svg>

      <TornEdgeTop />
      <TornEdgeBottom />

      <div className="relative z-10 px-6 py-16 space-y-4">
        <h1
          className={`${heroFont.className} text-4xl sm:text-6xl text-[#fcf8f5] flex flex-wrap items-center justify-center gap-3`}
          style={{ textShadow: "0 0 40px rgba(201,161,90,0.5), 0 2px 6px rgba(0,0,0,0.35)" }}
        >
          <motion.span
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.05 }}
          >
            {groomName}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-3xl sm:text-5xl"
          >
            &amp;
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.05 }}
          >
            {brideName}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm tracking-[0.35em] uppercase text-[#f3e6dd]"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
        >
          Приглашаем на свадьбу
        </motion.p>
      </div>
    </section>
  );
}
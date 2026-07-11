"use client";

import { motion } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";
import { TornEdgeTop, TornEdgeBottom } from "./TornEdge";

const heroFont = Cormorant_Garamond({ weight: ["500", "600"], style: ["italic"], subsets: ["latin", "cyrillic"] });

export default function Hero({ groomName, brideName }: { groomName: string; brideName: string }) {
  return (
    <section className="relative min-h-[65vh] sm:min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(92,71,56,0.3), rgba(61,15,26,0.55)), url('/img/wedding.png')",
        }}
      />

      <TornEdgeTop />
      <TornEdgeBottom />

      <div className="relative z-10 px-6 py-16 space-y-4">
        <h1 className={`${heroFont.className} text-4xl sm:text-6xl text-[#fcf8f5] flex flex-wrap items-center justify-center gap-3`}>
          <motion.span
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
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
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          >
            {brideName}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm tracking-[0.35em] uppercase text-[#f3e6dd]"
        >
          Приглашаем на свадьбу
        </motion.p>
      </div>
    </section>
  );
}
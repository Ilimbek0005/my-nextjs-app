"use client";

import { motion } from "framer-motion";

export default function AmbientBloom() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <motion.div
        className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(139,38,62,0.14), transparent 70%)",
          top: "-15%",
          left: "-15%",
        }}
        animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(201,161,90,0.16), transparent 70%)",
          bottom: "-15%",
          right: "-15%",
        }}
        animate={{ x: [0, -15, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
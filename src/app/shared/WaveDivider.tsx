"use client";

import { motion } from "framer-motion";

export default function WaveDivider() {
  return (
    <div className="relative h-10 flex items-center justify-center overflow-visible">
      <motion.svg
        viewBox="0 0 300 24"
        className="w-40 sm:w-56 h-6"
        fill="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M0 12 C 25 2, 50 22, 75 12 C 100 2, 125 22, 150 12 C 175 2, 200 22, 225 12 C 250 2, 275 22, 300 12"
          stroke="#c9a15a"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        <motion.circle
          cx="150"
          cy="12"
          r="2.5"
          fill="#8b263e"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
      </motion.svg>
    </div>
  );
}
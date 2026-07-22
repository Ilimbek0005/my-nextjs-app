"use client";

import { motion } from "framer-motion";

export default function SectionMotif() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.svg
        viewBox="0 0 240 240"
        className="w-[280px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-[0.25]"
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      >
        <g stroke="#8b263e" strokeWidth="1.5" fill="none">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M120 30 C 145 55, 145 80, 120 105 C 145 80, 175 80, 195 105 C 175 80, 175 55, 120 30 Z"
              transform={`rotate(${deg} 120 120)`}
            />
          ))}
          <circle cx="120" cy="120" r="90" strokeDasharray="1 6" />
          <circle cx="120" cy="120" r="10" fill="#c9a15a" stroke="none" />
        </g>
      </motion.svg>
    </div>
  );
}

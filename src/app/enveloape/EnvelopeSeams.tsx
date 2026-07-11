"use client";

import { motion } from "framer-motion";

export default function EnvelopeSeams({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      animate={{ opacity: isOpen ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Швы-сгибы от каждого угла к центру — намёк, что конверт раскрывается на 4 стороны */}
      <line x1="0" y1="0" x2="50" y2="50" stroke="#c9a15a" strokeWidth="0.25" opacity="0.4" />
      <line x1="100" y1="0" x2="50" y2="50" stroke="#c9a15a" strokeWidth="0.25" opacity="0.4" />
      <line x1="0" y1="100" x2="50" y2="50" stroke="#c9a15a" strokeWidth="0.25" opacity="0.4" />
      <line x1="100" y1="100" x2="50" y2="50" stroke="#c9a15a" strokeWidth="0.25" opacity="0.4" />

      {/* Более тёмная тень вдоль тех же линий — создаёт лёгкий объём сгиба */}
      <line x1="0" y1="0" x2="50" y2="50" stroke="#5c4738" strokeWidth="0.15" opacity="0.15" />
      <line x1="100" y1="0" x2="50" y2="50" stroke="#5c4738" strokeWidth="0.15" opacity="0.15" />
      <line x1="0" y1="100" x2="50" y2="50" stroke="#5c4738" strokeWidth="0.15" opacity="0.15" />
      <line x1="100" y1="100" x2="50" y2="50" stroke="#5c4738" strokeWidth="0.15" opacity="0.15" />
    </motion.svg>
  );
}
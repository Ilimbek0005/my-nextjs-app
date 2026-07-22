
"use client";

import { motion } from "framer-motion";

const particles = [
  { angle: 0, distance: 60 },
  { angle: 45, distance: 70 },
  { angle: 90, distance: 55 },
  { angle: 135, distance: 65 },
  { angle: 180, distance: 60 },
  { angle: 225, distance: 70 },
  { angle: 270, distance: 55 },
  { angle: 315, distance: 65 },
];

export default function SealSparkles({ trigger }: { trigger: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
      {particles.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * p.distance;
        const y = Math.sin(rad) * p.distance;
        return (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#c9a15a]"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={
              trigger
                ? { opacity: [1, 0], x, y, scale: [1, 0.4] }
                : { opacity: 0 }
            }
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          />
        );
      })}
    </div>
  );
}
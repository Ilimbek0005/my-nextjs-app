"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxOrnamentProps {
  side: "left" | "right";
  speed?: number;
  size?: number;
}

export default function ParallaxOrnament({ side, speed = 0.3, size = 90 }: ParallaxOrnamentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 * speed, -60 * speed]);

  return (
    <div ref={ref} className="relative h-0 pointer-events-none">
      <motion.div
        style={{ y }}
        className={`absolute top-0 ${side === "left" ? "-left-2 sm:left-2" : "-right-2 sm:right-2"} opacity-[0.09]`}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} fill="none">
          <g stroke="#8b263e" strokeWidth="1">
            <path d="M50 15 C 60 30, 60 40, 50 55 C 60 40, 75 40, 85 55 C 75 40, 75 30, 50 15 Z" />
            <path d="M50 15 C 40 30, 40 40, 50 55 C 40 40, 25 40, 15 55 C 25 40, 25 30, 50 15 Z" />
            <circle cx="50" cy="55" r="30" strokeDasharray="1 5" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

function Dove({
  delay,
  top,
  scale,
  duration,
}: {
  delay: number;
  top: string;
  scale: number;
  duration: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 60 30"
      className="absolute"
      style={{ top, width: 40 * scale, height: 20 * scale, opacity: 0.4 }}
      initial={{ x: "-10vw" }}
      animate={{ x: "110vw" }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <motion.path
        fill="#a18c7e"
        animate={{
          d: [
            "M30 15 C 20 5, 5 8, 0 15 C 5 12, 18 13, 30 15 Z",
            "M30 15 C 20 10, 5 12, 0 15 C 5 14, 18 14, 30 15 Z",
            "M30 15 C 20 5, 5 8, 0 15 C 5 12, 18 13, 30 15 Z",
          ],
        }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        fill="#a18c7e"
        animate={{
          d: [
            "M30 15 C 40 5, 55 8, 60 15 C 55 12, 42 13, 30 15 Z",
            "M30 15 C 40 10, 55 12, 60 15 C 55 14, 42 14, 30 15 Z",
            "M30 15 C 40 5, 55 8, 60 15 C 55 12, 42 13, 30 15 Z",
          ],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.05,
        }}
      />
    </motion.svg>
  );
}

function FloatingPetal({
  left,
  delay,
  duration,
  size,
}: {
  left: string;
  delay: number;
  duration: number;
  size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left,
        width: size,
        height: size * 0.7,
        background:
          "radial-gradient(circle at 30% 30%, rgba(139,38,62,0.45), rgba(139,38,62,0.15))",
        top: "-5%",
      }}
      animate={{
        y: ["0vh", "115vh"],
        x: [0, 20, -15, 10, 0],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function SpinningMotif({
  left,
  top,
  size,
  duration,
  reverse,
}: {
  left: string;
  top: string;
  size: number;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute opacity-[0.12]"
      style={{ left, top, width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <g stroke="#8b263e" strokeWidth="1" fill="none">
        <path d="M50 10 C 60 25, 60 35, 50 50 C 60 35, 75 35, 85 50 C 75 35, 75 25, 50 10 Z" />
        <path d="M50 10 C 40 25, 40 35, 50 50 C 40 35, 25 35, 15 50 C 25 35, 25 25, 50 10 Z" />
        <circle cx="50" cy="50" r="35" strokeDasharray="1 5" />
      </g>
    </motion.svg>
  );
}

export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#fcf8f5]">
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,38,62,0.12), transparent 70%)",
          top: "-10%",
          left: "-15%",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,161,90,0.15), transparent 70%)",
          top: "35%",
          right: "-15%",
        }}
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,38,62,0.11), transparent 70%)",
          bottom: "-10%",
          left: "20%",
        }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <SpinningMotif left="8%" top="10%" size={200} duration={95} />
      <SpinningMotif left="65%" top="28%" size={90} duration={85} reverse />
      <SpinningMotif left="12%" top="55%" size={100} duration={75} reverse />
      <SpinningMotif left="60%" top="72%" size={120} duration={90} />
      <SpinningMotif left="20%" top="88%" size={80} duration={65} />
      <FloatingPetal left="10%" delay={0} duration={22} size={10} />
      <FloatingPetal left="30%" delay={5} duration={26} size={7} />
      <FloatingPetal left="55%" delay={10} duration={24} size={9} />
      <FloatingPetal left="75%" delay={3} duration={28} size={6} />
      <FloatingPetal left="90%" delay={14} duration={23} size={8} />
      <Dove delay={0} top="14%" scale={1} duration={26} />
      <Dove delay={9} top="42%" scale={0.7} duration={32} />
      <Dove delay={18} top="68%" scale={0.85} duration={28} />
    </div>
  );
}

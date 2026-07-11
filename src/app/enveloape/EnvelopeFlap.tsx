"use client";

import { motion } from "framer-motion";

type FlapPosition = "top" | "bottom" | "left" | "right";

interface EnvelopeFlapProps {
  position: FlapPosition;
  isOpen: boolean;
}

const clipPaths: Record<FlapPosition, string> = {
  top: "polygon(0% 0%, 100% 0%, 50% 50%)",
  bottom: "polygon(0% 100%, 100% 100%, 50% 50%)",
  left: "polygon(0% 0%, 0% 100%, 50% 50%)",
  right: "polygon(100% 0%, 100% 100%, 50% 50%)",
};

const openTarget: Record<FlapPosition, { rotateX?: number; rotateY?: number }> =
  {
    top: { rotateX: -130 },
    bottom: { rotateX: 130 },
    left: { rotateY: 130 },
    right: { rotateY: -130 },
  };

const transformOrigins: Record<FlapPosition, string> = {
  top: "top center",
  bottom: "bottom center",
  left: "center left",
  right: "center right",
};

export default function EnvelopeFlap({ position, isOpen }: EnvelopeFlapProps) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        clipPath: clipPaths[position],
        transformOrigin: transformOrigins[position],
      }}
      animate={
        isOpen
          ? { ...openTarget[position], opacity: 0 }
          : { rotateX: 0, rotateY: 0, opacity: 1 }
      }
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    >
      <div
        className="w-full h-full relative"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,161,90,0.06), transparent 60%), " +
            "repeating-linear-gradient(45deg, rgba(139,38,62,0.035) 0px, rgba(139,38,62,0.035) 1px, transparent 1px, transparent 14px), " +
            "linear-gradient(135deg, #fdfaf7, #fcf8f5 50%, #f3e6dd)",
        }}
      >
        <div className="absolute inset-4 border border-[#c9a15a]/25" />
        <div className="absolute inset-6 border border-[#c9a15a]/10" />
      </div>
    </motion.div>
  );
}

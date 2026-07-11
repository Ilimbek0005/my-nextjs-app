"use client";

import { motion } from "framer-motion";

export default function ScrollingPhotoBand() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="flex h-full w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Дублируем изображение дважды подряд — при уходе первой копии вторая идентична ей по позиции, стык не виден */}
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-full w-[100vw] sm:w-[600px] shrink-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/img/wedding3.png')" }}
          />
        ))}
      </motion.div>

      {/* Затемнение поверх фото, чтобы текст поверх оставался читаемым */}
      <div className="absolute inset-0 bg-[#fcf8f5]/85" />
    </div>
  );
}
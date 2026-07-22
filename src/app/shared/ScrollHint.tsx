"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollHint({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    const showTimer = setTimeout(() => setVisible(true), 4000);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <motion.div
            className="absolute inset-0 -m-3 rounded-full bg-[#8b263e]/10 blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <span className="relative text-xs font-medium uppercase tracking-widest text-[#8b263e] bg-[#fcf8f5]/90 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
            Листайте вниз
          </span>

          <motion.div
            className="relative w-10 h-10 rounded-full bg-[#8b263e] flex items-center justify-center shadow-lg shadow-[#8b263e]/30"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="#fcf8f5"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
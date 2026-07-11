"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RsvpReminderBar() {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-[420px]"
        >
          <div className="flex items-start gap-3 bg-[#fdfaf7] border border-[#e6dad0] rounded-2xl shadow-lg px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-semibold text-[#5c4738] flex items-center gap-1.5">
                Не забудьте ответить на приглашение
              </p>
       

              <button
                onClick={scrollToRsvp}
                className="mt-3 inline-flex items-center gap-1.5 bg-[#c9a15a] hover:bg-[#b8904d] text-[#fcf8f5] text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                Ответить
                <span aria-hidden>→</span>
              </button>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              aria-label="Закрыть напоминание"
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[#a18c7e] hover:bg-[#f3e6dd] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
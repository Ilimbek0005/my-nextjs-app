"use client";

import { motion } from "framer-motion";

interface WishEntry {
  id: string;
  name: string;
  comment: string | null;
  respondedAt: Date | string | null;
}

const CARD_ACCENTS = ["#8b263e", "#c9a15a", "#6e1b2e"];

function formatDate(date: Date | string | null) {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

export default function WishesTicker({ wishes }: { wishes: WishEntry[] }) {
  const valid = wishes.filter((w) => w.comment && w.comment.trim().length > 0);

  if (valid.length === 0) return null;

  const loopItems = [...valid, ...valid];

  return (
    <section className="space-y-4">
      <div className="text-center space-y-2 px-6">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">Пожелания гостей</h3>
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#fcf8f5] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#fcf8f5] to-transparent z-10" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: Math.max(20, valid.length * 6), repeat: Infinity, ease: "linear" }}
          whileHover={{ transitionDuration: "60s" }}
        >
          {loopItems.map((w, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            const initial = w.name.trim().charAt(0).toUpperCase();
            const dateLabel = formatDate(w.respondedAt);

            return (
              <div
                key={`${w.id}-${i}`}
                className="relative shrink-0 w-60 sm:w-72 rounded-2xl border border-[#e6dad0] bg-[#fdfaf7] px-5 pt-8 pb-4 text-left shadow-sm"
              >
                <span
                  className="absolute -top-1 left-4 font-serif text-6xl leading-none select-none"
                  style={{ color: accent, opacity: 0.18 }}
                  aria-hidden
                >
                  &ldquo;
                </span>

                <p className="text-sm text-[#5c4738] leading-relaxed line-clamp-4 min-h-[4.5rem]">
                  {w.comment}
                </p>

                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[#e6dad0]">
                  <div
                    className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-serif text-[#fcf8f5]"
                    style={{ backgroundColor: accent }}
                  >
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#5c4738] truncate">{w.name}</p>
                    {dateLabel && (
                      <p className="text-[10px] uppercase tracking-wide text-[#a18c7e]">{dateLabel}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RsvpFormProps {
  slug: string;
  maxSeats: number;
  initialStatus: string;
  onResponseSubmit: (
    status: "YES" | "NO",
    confirmedSeats: number,
    comment: string,
  ) => Promise<void>;
}

function ConfettiBurst() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (360 / 24) * i + Math.random() * 15;
    const distance = 80 + Math.random() * 60;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      color: i % 3 === 0 ? "#c9a15a" : i % 3 === 1 ? "#8b263e" : "#e8d5a3",
      rotate: Math.random() * 360,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 0.4 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function RsvpForm({
  maxSeats,
  initialStatus,
  onResponseSubmit,
}: RsvpFormProps) {
  const [choice, setChoice] = useState<"YES" | "NO" | null>(null);
  const [seats, setSeats] = useState(maxSeats);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    initialStatus === "CONFIRMED" || initialStatus === "DECLINED",
  );

  const handleSubmit = async () => {
    if (!choice) return;
    setIsSubmitting(true);
    await onResponseSubmit(choice, choice === "YES" ? seats : 0, comment);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative text-center space-y-3 px-6 py-10"
      >
        <ConfettiBurst />
        <motion.div
          className="relative w-16 h-16 mx-auto rounded-full border-2 border-[#8b263e] flex items-center justify-center text-[#8b263e]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M4 12 L9 17 L20 6"
              stroke="#8b263e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </svg>
        </motion.div>
        <h3 className="text-xl font-serif italic text-[#5c4738]">Спасибо за ответ!</h3>
        <p className="text-sm text-[#6b584c] max-w-xs mx-auto">
          Мы получили ваше подтверждение. До встречи на свадьбе!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 px-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">Подтверждение присутствия</h3>
        <div className="w-12 h-[1px] bg-[#8b263e]/40 mx-auto" />
      </div>

      <p className="text-xs uppercase tracking-widest text-[#a18c7e] text-center">Ваш выбор</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
        <motion.button
          type="button"
          onClick={() => setChoice("YES")}
          whileTap={{ scale: 0.97 }}
          className="rounded-2xl px-4 py-5 text-sm text-left relative overflow-hidden"
          style={{
            background: choice === "YES" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
            backdropFilter: "blur(10px)",
            border: choice === "YES" ? "1.5px solid #8b263e" : "1.5px solid rgba(139,38,62,0.2)",
            boxShadow:
              choice === "YES"
                ? "0 0 0 3px rgba(201,161,90,0.2), 0 8px 26px rgba(139,38,62,0.18)"
                : "0 4px 16px rgba(92,71,56,0.06)",
          }}
        >
          <span className="font-medium text-[#5c4738]">С удовольствием приду</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setChoice("NO")}
          whileTap={{ scale: 0.97 }}
          className="rounded-2xl px-4 py-5 text-sm text-left relative overflow-hidden"
          style={{
            background: choice === "NO" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
            backdropFilter: "blur(10px)",
            border: choice === "NO" ? "1.5px solid #8b263e" : "1.5px solid rgba(139,38,62,0.2)",
            boxShadow:
              choice === "NO"
                ? "0 0 0 3px rgba(201,161,90,0.2), 0 8px 26px rgba(139,38,62,0.18)"
                : "0 4px 16px rgba(92,71,56,0.06)",
          }}
        >
          <span className="font-medium text-[#5c4738]">К сожалению, не смогу</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {choice === "YES" && maxSeats > 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-sm mx-auto overflow-hidden"
          >
            <p className="text-xs uppercase tracking-widest text-[#a18c7e] text-center mb-3">
              Сколько человек придёт (доступно {maxSeats})
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setSeats((s) => Math.max(1, s - 1))}
                className="w-9 h-9 rounded-full border-2 border-[#8b263e]/30 bg-[#fdfaf7] text-[#8b263e] hover:border-[#8b263e] transition-colors"
              >
                −
              </button>
              <span className="text-xl font-serif text-[#5c4738] w-8 text-center">{seats}</span>
              <button
                type="button"
                onClick={() => setSeats((s) => Math.min(maxSeats, s + 1))}
                className="w-9 h-9 rounded-full border-2 border-[#8b263e]/30 bg-[#fdfaf7] text-[#8b263e] hover:border-[#8b263e] transition-colors"
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-sm mx-auto space-y-2">
        <p className="text-xs uppercase tracking-widest text-[#a18c7e]">Комментарий (по желанию)</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Пожелания..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#8b263e]/20 bg-[#fdfaf7] text-sm text-[#5c4738] outline-none focus:border-[#8b263e] transition-colors resize-none"
        />
      </div>

      <div className="max-w-sm mx-auto">
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!choice || isSubmitting}
          whileTap={{ scale: 0.98 }}
          className="relative w-full px-6 py-3.5 rounded-full text-[#fcf8f5] text-sm tracking-widest uppercase overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #8b263e, #a3324d)",
            boxShadow: "0 8px 24px rgba(139,38,62,0.3)",
          }}
        >
          {!isSubmitting && choice && (
            <motion.span
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
            />
          )}
          <span className="relative">{isSubmitting ? "Отправляем..." : "Отправить"}</span>
        </motion.button>
      </div>
    </div>
  );
}
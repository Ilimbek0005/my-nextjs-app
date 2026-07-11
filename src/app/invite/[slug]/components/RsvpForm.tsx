"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RsvpFormProps {
  slug: string;
  maxSeats: number;
  initialStatus: string;
  onResponseSubmit: (status: "YES" | "NO", confirmedSeats: number, comment: string) => Promise<void>;
}

export default function RsvpForm({ maxSeats, initialStatus, onResponseSubmit }: RsvpFormProps) {
  const [choice, setChoice] = useState<"YES" | "NO" | null>(null);
  const [seats, setSeats] = useState(maxSeats);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(initialStatus === "CONFIRMED" || initialStatus === "DECLINED");

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
        className="text-center space-y-3 py-6"
      >
        <div className="w-14 h-14 mx-auto rounded-full border border-[#8b263e] flex items-center justify-center text-[#8b263e] text-2xl">
          ✓
        </div>
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
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <p className="text-xs uppercase tracking-widest text-[#a18c7e] text-center">Ваш выбор</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setChoice("YES")}
          className={`rounded-2xl border px-4 py-4 text-sm text-left transition-all duration-200 ${
            choice === "YES"
              ? "border-[#8b263e] bg-[#8b263e]/5 shadow-sm"
              : "border-[#e6dad0] hover:border-[#c9a15a]"
          }`}
        >
          <span className="block text-lg mb-1">🎉</span>
          <span className="font-medium text-[#5c4738]">С удовольствием приду</span>
        </button>

        <button
          type="button"
          onClick={() => setChoice("NO")}
          className={`rounded-2xl border px-4 py-4 text-sm text-left transition-all duration-200 ${
            choice === "NO"
              ? "border-[#8b263e] bg-[#8b263e]/5 shadow-sm"
              : "border-[#e6dad0] hover:border-[#c9a15a]"
          }`}
        >
          <span className="block text-lg mb-1">🙏</span>
          <span className="font-medium text-[#5c4738]">К сожалению, не смогу</span>
        </button>
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
                className="w-9 h-9 rounded-full border border-[#e6dad0] text-[#8b263e] hover:border-[#8b263e] transition-colors"
              >
                −
              </button>
              <span className="text-xl font-serif text-[#5c4738] w-8 text-center">{seats}</span>
              <button
                type="button"
                onClick={() => setSeats((s) => Math.min(maxSeats, s + 1))}
                className="w-9 h-9 rounded-full border border-[#e6dad0] text-[#8b263e] hover:border-[#8b263e] transition-colors"
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
          className="w-full px-4 py-3 rounded-xl border border-[#e6dad0] bg-[#fdfaf7] text-sm text-[#5c4738] outline-none focus:border-[#8b263e] transition-colors resize-none"
        />
      </div>

      <div className="max-w-sm mx-auto">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!choice || isSubmitting}
          className="w-full px-6 py-3.5 rounded-full bg-[#8b263e] text-[#fcf8f5] text-sm tracking-widest uppercase hover:bg-[#6e1b2e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Отправляем..." : "Отправить"}
        </button>
      </div>
    </div>
  );
}
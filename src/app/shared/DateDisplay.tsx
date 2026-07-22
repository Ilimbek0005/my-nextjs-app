"use client";

import { motion } from "framer-motion";
import CountdownTimer from "../invite/[slug]/components/CountdownTimer";

const MONTHS = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];
const WEEKDAYS = ["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"];

export default function DateDisplay({ date }: { date: Date }) {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const weekdayIndex = (date.getDay() + 6) % 7;
  const nearbyDays = [day - 2, day - 1, day, day + 1, day + 2];

  return (
    <section className="relative text-center px-6">
      {/* Фоновое фото именно для этого блока — видно только по центру */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/img/wedding2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative space-y-6"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-serif italic text-[#5c4738]">Дата торжества</h3>
          <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
        </div>

        <p className="text-sm tracking-[0.35em] uppercase text-[#a18c7e]">{month}</p>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {nearbyDays.map((d) =>
            d === day ? (
<motion.div
  key={d}
  className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
  animate={{ scale: [1, 1.08, 1] }}
  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
>
  <motion.svg
    viewBox="0 0 100 100"
    className="absolute inset-0 w-full h-full"
    animate={{
      filter: [
        "drop-shadow(0 0 4px rgba(139,38,62,0.4))",
        "drop-shadow(0 0 10px rgba(201,161,90,0.5))",
        "drop-shadow(0 0 4px rgba(139,38,62,0.4))",
      ],
    }}
    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M50 88 C 20 65, 5 45, 5 28 C 5 12, 18 2, 32 2 C 42 2, 50 10, 50 20 C 50 10, 58 2, 68 2 C 82 2, 95 12, 95 28 C 95 45, 80 65, 50 88 Z"
      fill="#8b263e"
    />
  </motion.svg>
  <span className="relative z-10 text-base sm:text-lg font-serif text-[#fcf8f5]">{d}</span>
</motion.div>
            ) : (
              <span key={d} className="text-lg text-[#c8b9ae]">{d}</span>
            )
          )}
        </div>

        <p className="text-sm text-[#6b584c]">в {hours}:{minutes}</p>
        <p className="text-5xl sm:text-6xl font-serif text-[#5c4738]">{year}</p>

        <div className="space-y-1">
          {WEEKDAYS.map((w, i) =>
            i === weekdayIndex ? (
              <p key={w} className="text-base sm:text-lg font-semibold uppercase tracking-widest border border-[#8b263e] text-[#8b263e] inline-block px-6 py-2 rounded-full">
                {w}
              </p>
            ) : (
              <p key={w} className="text-xs uppercase tracking-widest text-[#c8b9ae]">{w}</p>
            )
          )}
        </div>

        <div className="pt-4">
          <p className="text-xs uppercase tracking-widest text-[#a18c7e] mb-3">До торжества осталось</p>
          <CountdownTimer targetDate={date} />
        </div>
      </motion.div>
    </section>
  );
}
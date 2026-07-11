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
              <div key={d} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#8b263e] flex items-center justify-center text-lg font-serif text-[#8b263e]">
                {d}
              </div>
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
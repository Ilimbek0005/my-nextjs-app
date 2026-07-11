"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { GuestsIcon, RingsIcon, DinnerIcon, DanceIcon, CakeIcon } from "./ScheduleIcons";
import ScrollingPhotoBand from "../../../shared/ScrollingPhotoBand";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const items: ScheduleItem[] = [
  { time: "17:00", title: "Сбор гостей", description: "Встречаем друзей и родных, напитки и живая музыка", icon: <GuestsIcon /> },
  { time: "18:00", title: "Церемония", description: "Выездная регистрация брака", icon: <RingsIcon /> },
  { time: "19:00", title: "Свадебный ужин", description: "Банкет, тосты и первый танец молодых", icon: <DinnerIcon /> },
  { time: "21:00", title: "Танцевальная часть", description: "Диджей и танцпол", icon: <DanceIcon /> },
  { time: "22:00", title: "Завершение вечера", description: "Финальные поздравления и торт", icon: <CakeIcon /> },
];

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
   <section className="relative overflow-hidden space-y-12 text-center px-6 py-8 rounded-2xl">
  <ScrollingPhotoBand />
      <div className="space-y-2">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">Программа дня</h3>
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <div ref={containerRef} className="relative max-w-md mx-auto pl-2">
        <div className="absolute left-[22px] top-2 bottom-2 w-[1px] bg-[#e6dad0]" />
        <motion.div
          className="absolute left-[22px] top-2 w-[1px] bg-[#8b263e] origin-top"
          style={{ height: lineHeight }}
        />

        <div className="space-y-10 relative">
          {items.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              className="relative flex gap-4 items-start text-left"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.05 }}
                className="w-11 h-11 shrink-0 rounded-full bg-[#fdfaf7] border border-[#e6dad0] flex items-center justify-center shadow-sm z-10"
              >
                {item.icon}
              </motion.div>
              <div className="pt-1">
                <span className="font-serif text-lg font-semibold text-[#5c4738] block">{item.time}</span>
                <span className="text-sm font-medium block text-[#5c4738]">{item.title}</span>
                <span className="text-xs text-[#a18c7e]">{item.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
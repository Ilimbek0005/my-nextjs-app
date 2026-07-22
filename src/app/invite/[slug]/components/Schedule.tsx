"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ICON_MAP } from "./ScheduleIcons";
import SectionMotif from "../../../shared/SectionMotif";

interface ScheduleItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  iconKey: string;
}

export default function Schedule({ items }: { items: ScheduleItemData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (items.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden space-y-14 text-center px-6 py-10 rounded-2xl">
      <SectionMotif />

      <div className="space-y-2">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">Программа дня</h3>
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <div ref={containerRef} className="relative max-w-sm mx-auto">
        <div className="absolute left-1/2 top-2 bottom-2 w-[1px] bg-[#e6dad0] -translate-x-1/2" />
        <motion.div
          className="absolute left-1/2 top-2 w-[1px] bg-[#8b263e] origin-top -translate-x-1/2"
          style={{ height: lineHeight }}
        />

        <div className="space-y-12 relative">
          {items.map((item, i) => {
            const IconComponent = ICON_MAP[item.iconKey];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="relative flex items-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.05 }}
                  className="absolute left-1/2 -translate-x-1/2 w-11 h-11 shrink-0 rounded-full bg-[#fdfaf7] border border-[#8b263e]/30 flex items-center justify-center shadow-sm z-10 text-lg"
                >
                  {IconComponent ? <IconComponent /> : item.iconKey || "✨"}
                </motion.div>

                <div className={`w-1/2 ${isEven ? "pr-8 text-right" : "order-2 pl-8 text-left ml-auto"}`}>
                  <span className="font-serif text-lg font-semibold text-[#5c4738] block">{item.time}</span>
                  <span className="text-sm font-medium block text-[#5c4738]">{item.title}</span>
                  <span className="text-xs text-[#a18c7e]">{item.description}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

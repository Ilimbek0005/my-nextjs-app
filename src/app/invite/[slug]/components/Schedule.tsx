"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { Marck_Script } from "next/font/google";
import { ICON_MAP } from "./ScheduleIcons";
import SectionMotif from "../../../shared/SectionMotif";

const scriptFont = Marck_Script({
  weight: "400",
  subsets: ["latin", "cyrillic"],
});

interface ScheduleItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  iconKey: string;
}

function buildZigzagPath(count: number) {
  if (count < 2) return "M50 0 L50 100";
  const points = Array.from({ length: count }, (_, i) => ({
    x: i % 2 === 0 ? 42 : 58,
    y: (i / (count - 1)) * 100,
  }));

  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function ScheduleRow({
  item,
  isLeft,
}: {
  item: ScheduleItemData;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "start 0.35"],
  });
  const focus = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const scale = useTransform(focus, [0.35, 1], [0.92, 1]);

  const IconComponent = ICON_MAP[item.iconKey];

  return (
    <motion.div
      ref={ref}
      style={{ opacity: focus, scale }}
      className={`relative py-6 flex ${isLeft ? "justify-start pr-[8%]" : "justify-end pl-[8%]"}`}
    >
      <span
        className={`${scriptFont.className} absolute ${isLeft ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 text-5xl sm:text-6xl text-[#8b263e] pointer-events-none select-none`}
        style={{ opacity: 0.08 }}
      >
        {item.time}
      </span>

      <div className="relative flex flex-col items-center text-center gap-2 px-2 w-[46%]">
<motion.div
  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fdfaf7] flex items-center justify-center text-lg sm:text-xl"
  animate={{
    boxShadow: [
      "0 0 0 3px rgba(201,161,90,0.3), 0 4px 14px rgba(139,38,62,0.2)",
      "0 0 0 6px rgba(139,38,62,0.15), 0 6px 22px rgba(139,38,62,0.4)",
      "0 0 0 3px rgba(201,161,90,0.3), 0 4px 14px rgba(139,38,62,0.2)",
    ],
  }}
  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: (item.time.charCodeAt(0) % 5) * 0.2 }}
>
  {IconComponent ? <IconComponent /> : item.iconKey || "✨"}
</motion.div>
        <span className="font-serif text-lg sm:text-xl font-semibold text-[#8b263e]">
          {item.time}
        </span>
        <span className="text-sm sm:text-base font-medium text-[#5c4738]">
          {item.title}
        </span>
        <span className="text-xs text-[#a18c7e]">{item.description}</span>
      </div>
    </motion.div>
  );
}

export default function Schedule({ items }: { items: ScheduleItemData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const pathD = useMemo(() => buildZigzagPath(items.length), [items.length]);

  // Позиция искры вдоль кривой считается через getPointAtLength в рантайме
  const pathRef = useRef<SVGPathElement>(null);
  const [sparkPos, setSparkPos] = useState({ x: 50, y: 0 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      const point = path.getPointAtLength(Math.min(Math.max(v, 0), 1) * length);
      setSparkPos({ x: point.x, y: point.y });
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (items.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden space-y-10 text-center px-4 py-10 rounded-2xl">
      <SectionMotif />

      <div className="space-y-2">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">
          Программа дня
        </h3>
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <div ref={containerRef} className="relative max-w-md mx-auto">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="scheduleLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a15a" />
              <stop offset="100%" stopColor="#8b263e" />
            </linearGradient>
          </defs>
          <path
            d={pathD}
            stroke="#e6dad0"
            strokeWidth="0.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            ref={pathRef}
            d={pathD}
            stroke="url(#scheduleLine)"
            strokeWidth="0.8"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
        </svg>

        {/* Искра, бегущая точно вдоль кривой линии */}

        <div
          className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${sparkPos.x}%`,
            top: `${sparkPos.y}%`,
            background: "#c9a15a",
            boxShadow: "0 0 10px 3px rgba(201,161,90,0.7)",
          }}
        />

        <div>
          {items.map((item, i) => (
            <ScheduleRow key={item.id} item={item} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

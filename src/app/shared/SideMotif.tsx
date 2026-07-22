"use client";

import { motion } from "framer-motion";

interface SideMotifProps {
  side: "left" | "right";
  top: string;
  size?: number;
  color?: string;
  duration?: number;
}

// Один "рог" — от центра к краю, с завитком. Четыре копии с поворотом на 90° дают полный симметричный узор, как на образце.
function HornUnit() {
  return (
    <path
      d="M50 50
         C 50 35, 44 22, 50 6
         C 56 22, 50 35, 50 50
         M50 50
         C 38 44, 24 44, 14 30
         C 24 38, 34 42, 44 46
         C 34 42, 24 40, 16 26
         C 26 36, 38 40, 50 50
         M50 50
         C 62 44, 76 44, 86 30
         C 76 38, 66 42, 56 46
         C 66 42, 76 40, 84 26
         C 74 36, 62 40, 50 50
         Z"
      fill="currentColor"
    />
  );
}

export default function SideMotif({
  side,
  top,
  size = 180,
  color = "#8b263e",
  duration = 130,
}: SideMotifProps) {
  // z-index намеренно не отрицательный: -z-10 на fixed-элементе уводит его за
  // непрозрачный на вид (но формально прозрачный) слой motion.div с overflow-hidden
  // в InviteClientPage — Chromium создаёт для него отдельный composite-слой, который
  // перекрывает всё с отрицательным z-index. auto + порядок в DOM (рендерится раньше
  // основного контента) достаточно, чтобы узор остался позади контента.
  return (
    <motion.div
      className="fixed -z-10 pointer-events-none opacity-[0.16] hidden lg:!block"
      style={{
        top,
        [side]: "1%",
        width: size,
        height: size,
        color,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g>
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 50 50)`}>
              <HornUnit />
            </g>
          ))}
          <rect
            x="46"
            y="46"
            width="8"
            height="8"
            transform="rotate(45 50 50)"
            fill="currentColor"
          />
        </g>
      </svg>
    </motion.div>
  );
}

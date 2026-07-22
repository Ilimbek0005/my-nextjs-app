"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

const stroke = "#8b263e";
const accent = "#c9a15a";

export function GuestsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "10px 24px" }}
      >
        <path d="M10 24 L10 14" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M6 14 L10 8 L14 14 Z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.g>
      <motion.g
        animate={{ rotate: [4, -4, 4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "22px 24px" }}
      >
        <path d="M22 24 L22 14" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M18 14 L22 8 L26 14 Z" stroke={accent} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

export function RingsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      <motion.circle
        cx="13" cy="18" r="6"
        stroke={stroke} strokeWidth="1.6"
        animate={{ x: [0, 1.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="19" cy="18" r="6"
        stroke={accent} strokeWidth="1.6"
        animate={{ x: [0, -1.5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function DinnerIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      <motion.g
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 20px" }}
      >
        <path d="M16 26 L16 18" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 8 C9 15, 23 15, 23 8 C23 15, 16 15, 16 18 C16 15, 9 15, 9 8 Z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      </motion.g>
      <motion.circle
        cx="16" cy="9" r="1.4" fill={accent}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

export function DanceIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      <motion.path
        d="M8 24 Q10 12 16 12 Q22 12 24 24"
        stroke={stroke} strokeWidth="1.4" strokeLinecap="round"
        animate={{ pathLength: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="16" cy="8" r="2.5" stroke={accent} strokeWidth="1.4"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function CakeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
      <path d="M8 26 L8 18 L24 18 L24 26 Z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 22 L24 22" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <path d="M16 18 L16 13" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <motion.path
        d="M16 13 C14.5 11, 14.5 9, 16 7 C17.5 9, 17.5 11, 16 13 Z"
        fill={accent}
        animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 13px" }}
      />
    </svg>
  );
}

import type { ReactElement } from "react";
// ...
export const ICON_MAP: Record<string, () => ReactElement> = {
  guests: GuestsIcon,
  rings: RingsIcon,
  dinner: DinnerIcon,
  dance: DanceIcon,
  cake: CakeIcon,
};

export const ICON_OPTIONS = [
  { key: "guests", label: "Гости" },
  { key: "rings", label: "Кольца" },
  { key: "dinner", label: "Ужин" },
  { key: "dance", label: "Танцы" },
  { key: "cake", label: "Торт" },
];
"use client";

import { motion } from "framer-motion";

const fadeUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const VENUE_NAME = "Ресторан «Palazzo»";
const VENUE_ADDRESS = "г. Бишкек, ул. Сухэ-Батора, 3/2";
const TWO_GIS_URL = "https://2gis.kg/bishkek/search/Palazzo"; // замени на реальную ссылку
const LAT = 42.8746; // замени на реальные координаты
const LNG = 74.5698;

export default function Venue() {
  return (
    <motion.section {...fadeUpProps} className="text-center space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif italic text-[#5c4738]">Место проведения</h3>
        <div className="w-12 h-[1px] bg-[#e6dad0] mx-auto" />
      </div>

      <div className="space-y-1">
        <p className="font-medium text-[#5c4738] text-base">{VENUE_NAME}</p>
        <p className="text-sm text-[#6b584c]">{VENUE_ADDRESS}</p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[#e6dad0] shadow-sm">
        <iframe
          title="Карта места проведения"
          src={`https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`}
          className="w-full h-64 sm:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={TWO_GIS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-full border border-[#8b263e] text-[#8b263e] text-sm tracking-widest uppercase hover:bg-[#8b263e] hover:text-[#fcf8f5] transition-colors duration-300"
      >
        Открыть в 2ГИС
      </a>
    </motion.section>
  );
}
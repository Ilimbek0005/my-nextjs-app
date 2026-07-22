"use client";

import { motion } from "framer-motion";
import { Marck_Script } from "next/font/google";
import OrnamentDivider from "./OrnamentDivider";
import SectionMotif from "./SectionMotif";

const scriptFont = Marck_Script({ weight: "400", subsets: ["latin", "cyrillic"] });

const DEFAULT_WELCOME_TEXT =
  "Дорогой(ая) {guestName}! С большим удовольствием приглашаем вас разделить радость этого дня с {groomName} и {brideName}, чтобы насладиться праздником и подарить нам своё благословение!";

interface WelcomeMessageProps {
  guestName: string;
  groomName?: string;
  brideName?: string;
  organizerName?: string;
  welcomeText?: string;
}

export default function WelcomeMessage({
  guestName,
  groomName = "Аяр",
  brideName = "Айдана",
  organizerName = "Казиева Камилла",
  welcomeText,
}: WelcomeMessageProps) {
  const finalText = (welcomeText || DEFAULT_WELCOME_TEXT)
    .replaceAll("{guestName}", guestName)
    .replaceAll("{groomName}", groomName)
    .replaceAll("{brideName}", brideName);

  return (
    <div className="relative isolate overflow-hidden rounded-2xl">
      {/* Вне анимируемой секции: не должна зависеть от whileInView текста, иначе исчезает вместе с ним.
          isolate обязателен: без него -z-10 у SectionMotif "убегает" за пределы этого контейнера
          и рисуется за произвольным контентом дальше по странице. */}
      <SectionMotif />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`${scriptFont.className} relative text-center space-y-6 px-6 py-8`}
      >
        <h3 className="text-4xl sm:text-5xl text-[#5c4738] leading-tight">
          Уважаемые гости!
        </h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <OrnamentDivider />
        </motion.div>

        <p className="text-2xl sm:text-3xl text-[#5c4738] leading-relaxed max-w-sm mx-auto">
          {finalText}
        </p>

        <div className="pt-4 flex flex-col items-center gap-1 not-italic">
          <span className="w-8 h-[1px] bg-[#e6dad0]" />
          <p className="text-sm sm:text-base uppercase tracking-widest text-[#a18c7e] pt-2 font-sans">
            Приглашение от:
          </p>
          <p className={`${scriptFont.className} text-xl text-[#5c4738]`}>
            {organizerName}
          </p>
        </div>
      </motion.section>
    </div>
  );
}
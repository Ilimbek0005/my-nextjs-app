"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../../enveloape/Envelope";
import Hero from "../../shared/Hero";
import RsvpReminderBar from "../../shared/RsvpReminderBar";
import WelcomeMessage from "../../shared/WelcomeMessage";
import DateDisplay from "../../shared/DateDisplay";
import MusicPlayer from "../../shared/MusicPlayer";
import PageBackground from "../../shared/PageBackground";
import WishesTicker from "../../shared/WishesTicker";
import Schedule from "./components/Schedule";
import Venue from "./components/Venue";
import RsvpForm from "./components/RsvpForm";
import { updateRsvp } from "../../actions/auth";

interface Guest {
  id: string;
  slug: string;
  name: string;
  seatsCount: number;
  rsvpStatus: string;
  confirmedSeats: number | null;
  comment: string | null;
}

interface WishEntry {
  id: string;
  name: string;
  comment: string | null;
  respondedAt: Date | string | null;
}
const WEDDING_DATE = new Date("2026-09-27T17:00:00"); // подставь свою дату

const fadeUpProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

export default function InviteClientPage({
  guest,
  wishes,
}: {
  guest: Guest;
  wishes: WishEntry[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRsvpSubmit = async (
    status: "YES" | "NO",
    confirmedSeats: number,
    comment: string,
  ) => {
    await updateRsvp(guest.slug, status, confirmedSeats, comment);
  };

  return (
    <div className="min-h-screen text-[#5c4738] font-sans selection:bg-[#8b263e]/10">
      <PageBackground />
      <MusicPlayer autoPlayTrigger={isOpen} />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope guestName={guest.name} onOpen={() => setIsOpen(true)} />
        ) : (
          <motion.div
            className="overflow-hidden"
            key="site-content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <RsvpReminderBar />
            <div className="max-w-xl mx-auto px-4 py-16 space-y-24">
              <Hero groomName="Аяр" brideName="Айдана" />

              <motion.div {...fadeUpProps}>
                <WelcomeMessage guestName={guest.name} />
              </motion.div>

              <motion.div {...fadeUpProps}>
                <DateDisplay date={WEDDING_DATE} />
              </motion.div>

              <motion.section {...fadeUpProps}>
                <Schedule />
              </motion.section>

              <motion.section {...fadeUpProps}>
                <Venue />
              </motion.section>

              <motion.section {...fadeUpProps} id="rsvp">
                <RsvpForm
                  slug={guest.slug}
                  maxSeats={guest.seatsCount}
                  initialStatus={guest.rsvpStatus}
                  onResponseSubmit={handleRsvpSubmit}
                />
              </motion.section>

              <motion.section {...fadeUpProps}>
                <WishesTicker wishes={wishes} />
              </motion.section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
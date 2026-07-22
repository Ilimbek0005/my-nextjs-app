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
import SideMotif from "../../shared/SideMotif";
import ScrollHint from "../../shared/ScrollHint";

interface Guest {
  id: string;
  slug: string;
  name: string;
  seatsCount: number;
  rsvpStatus: string;
  confirmedSeats: number | null;
  comment: string | null;
}

interface ScheduleItemData {
  id: string;
  time: string;
  title: string;
  description: string;
  iconKey: string;
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
  welcomeText,
  organizerName,
  scheduleItems,
  heroImageUrl,
}: {
  guest: Guest;
  wishes: WishEntry[];
  welcomeText: string | null;
  organizerName: string | null;
  scheduleItems: ScheduleItemData[];
  heroImageUrl: string | null;
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
      <ScrollHint show={isOpen} />
      <SideMotif side="left" top="15%" />
      <SideMotif side="right" top="50%" duration={110} />
      <SideMotif side="left" top="80%" size={140} duration={150} />
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
            <div className="max-w-xl mx-auto px-4 py-16 space-y-24 bg-gradient-to-b from-[#faeae7] to-[#f5ddd8] sm:rounded-3xl sm:shadow-sm">
              <Hero
                groomName="Аяр"
                brideName="Айдана"
                imageUrl={heroImageUrl}
              />

              <WelcomeMessage
                guestName={guest.name}
                welcomeText={welcomeText || undefined}
                organizerName={organizerName || undefined}
              />

              <motion.div {...fadeUpProps}>
                <DateDisplay date={WEDDING_DATE} />
              </motion.div>

              <motion.section {...fadeUpProps}>
                <Schedule items={scheduleItems} />
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

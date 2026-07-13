"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth";

const DEFAULT_WELCOME_TEXT =
  "Дорогой(ая) {guestName}! С большим удовольствием приглашаем вас разделить радость этого дня с {groomName} и {brideName}, чтобы насладиться праздником и подарить нам своё благословение!";

const DEFAULT_ORGANIZER = "Казиева Камилла";

export async function getEventInfo() {
  let info = await prisma.eventInfo.findFirst();

  if (!info) {
    info = await prisma.eventInfo.create({
      data: {
        coupleNames: "Аяр & Айдана",
        eventDate: new Date(),
        venueName: "",
        venueAddress: "",
        welcomeText: DEFAULT_WELCOME_TEXT,
        organizerName: DEFAULT_ORGANIZER,
      },
    });
  }

  return info;
}

export async function updateWelcomeMessage(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  const welcomeText = (formData.get("welcomeText") as string) || DEFAULT_WELCOME_TEXT;
  const organizerName = (formData.get("organizerName") as string) || DEFAULT_ORGANIZER;

  const existing = await prisma.eventInfo.findFirst();

  if (existing) {
    await prisma.eventInfo.update({
      where: { id: existing.id },
      data: { welcomeText, organizerName },
    });
  } else {
    await prisma.eventInfo.create({
      data: {
        coupleNames: "Аяр & Айдана",
        eventDate: new Date(),
        venueName: "",
        venueAddress: "",
        welcomeText,
        organizerName,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/invite", "layout");
  return { success: true };
}
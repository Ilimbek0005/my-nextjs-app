"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth";

function generateSlug(name: string): string {
  const cyrillicToTranslit: { [key: string]: string } = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  const cleanName = name.toLowerCase().trim();
  let translited = "";
  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    translited +=
      cyrillicToTranslit[char] !== undefined
        ? cyrillicToTranslit[char]
        : char === " "
          ? "-"
          : "";
  }

  const randomSalt = Math.random().toString(36).substring(2, 6);
  return `${translited || "guest"}-${randomSalt}`;
}

export async function getGuests() {
  if (!(await checkAuth())) throw new Error("Не авторизован");
  return await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function addGuest(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  const name = formData.get("name") as string;
  const seatsCount = parseInt(formData.get("invitedSeats") as string, 10);

  if (!name || isNaN(seatsCount))
    return { success: false, error: "Заполните все поля" };

  const slug = generateSlug(name);

  const newGuest = await prisma.guest.create({
    data: {
      name,
      seatsCount,
      slug,
      rsvpStatus: "PENDING",
    },
  });

  revalidatePath("/admin");
  return { success: true, guest: newGuest };
}

export async function deleteGuest(id: string) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  await prisma.guest.delete({ where: { id } });
  revalidatePath("/admin");
  return { success: true };
}

export async function clearGuestComment(id: string) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  await prisma.guest.update({
    where: { id },
    data: { comment: null },
  });

  revalidatePath("/admin");
  revalidatePath("/invite", "layout");
  return { success: true };
}
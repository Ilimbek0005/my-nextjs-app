"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addWish(name: string, message: string) {
  if (!name.trim() || !message.trim()) {
    return { success: false, error: "Заполните имя и пожелание" };
  }
  await prisma.wish.create({ data: { name: name.trim(), message: message.trim() } });
  revalidatePath("/invite", "layout");
  return { success: true };
}
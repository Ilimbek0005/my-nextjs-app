"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth";

const DEFAULT_ITEMS = [
  { time: "17:00", title: "Сбор гостей", description: "Встречаем друзей и родных, напитки и живая музыка", iconKey: "guests", order: 0 },
  { time: "18:00", title: "Церемония", description: "Выездная регистрация брака", iconKey: "rings", order: 1 },
  { time: "19:00", title: "Свадебный ужин", description: "Банкет, тосты и первый танец молодых", iconKey: "dinner", order: 2 },
  { time: "21:00", title: "Танцевальная часть", description: "Диджей и танцпол", iconKey: "dance", order: 3 },
  { time: "22:00", title: "Завершение вечера", description: "Финальные поздравления и торт", iconKey: "cake", order: 4 },
];

export async function getScheduleItems() {
  const count = await prisma.scheduleItem.count();

  if (count === 0) {
    await prisma.scheduleItem.createMany({ data: DEFAULT_ITEMS });
  }

  return prisma.scheduleItem.findMany({ orderBy: { order: "asc" } });
}

export async function addScheduleItem(formData: FormData) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  const time = formData.get("time") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const iconKey = formData.get("iconKey") as string;

  if (!time || !title) return { success: false, error: "Заполните время и название" };

  const maxOrder = await prisma.scheduleItem.aggregate({ _max: { order: true } });

  const item = await prisma.scheduleItem.create({
    data: {
      time,
      title,
      description: description || "",
      iconKey: iconKey || "guests",
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/invite", "layout");
  return { success: true, item };
}

export async function updateScheduleItem(id: string, formData: FormData) {
  if (!(await checkAuth())) throw new Error("Не авторизован");

  const time = formData.get("time") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const iconKey = formData.get("iconKey") as string;

  await prisma.scheduleItem.update({
    where: { id },
    data: { time, title, description, iconKey },
  });

  revalidatePath("/admin");
  revalidatePath("/invite", "layout");
  return { success: true };
}

export async function deleteScheduleItem(id: string) {
 if (!(await checkAuth())) throw new Error("Не авторизован");

  await prisma.scheduleItem.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/invite", "layout");
  return { success: true };
}
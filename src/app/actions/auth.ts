"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function loginAdmin(formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  if (
    login === process.env.ADMIN_LOGIN &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET);


    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, 
      path: "/",
    });

    return { success: true };
  }

  return { success: false, error: "Неверный логин или пароль" };
}


export async function checkAuth() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("admin_session")?.value;

  if (!token) return false;

  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch (err) {
    return false;
  }
}


export async function logoutAdmin() {
  const cookieStore = await cookies(); 
  cookieStore.delete("admin_session");
}
export async function updateRsvp(slug: string, status: 'YES' | 'NO', confirmedSeats: number, comment: string) {
  try {
    const dbStatus = status === 'YES' ? 'CONFIRMED' : 'DECLINED';

    await prisma.guest.update({
      where: { slug },
      data: {
        rsvpStatus: dbStatus,
        confirmedSeats: status === 'YES' ? confirmedSeats : 0,
        comment: comment || null,
        respondedAt: new Date(),
      },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Ошибка при сохранении ответа' };
  }
}
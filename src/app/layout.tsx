import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👇 Заменили стандартный текст на ваши данные
export const metadata: Metadata = {
  title: "Аяр & Айдана — Приглашение на свадьбу",
  description: "Приглашение на свадьбу Аяра и Айданы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru" // 💡 Маленький совет: замените "en" на "ru", чтобы браузеры понимали, что сайт на русском
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
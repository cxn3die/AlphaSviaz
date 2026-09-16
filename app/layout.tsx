import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Альфа-Связь — Системы безопасности по всей России",
  description:
    "Видеонаблюдение, СКУД, пожарная сигнализация и сети под ключ. Более 1148 реализованных объектов с 2014 года.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

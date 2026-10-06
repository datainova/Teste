import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FridayMode } from "@/components/layout/FridayMode";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Friday Feelings · work hard. feel friday.",
    template: "%s · Friday Feelings",
  },
  description:
    "A gente não vende camiseta. Vende a sensação de ter ralado a semana inteira e poder, enfim, desligar. Camisetas minimalistas premium.",
};

export const viewport: Viewport = {
  themeColor: "#f4f1ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen">
        <FridayMode />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

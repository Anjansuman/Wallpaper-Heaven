import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar2 from "@/Components/Nav-Bar/NavBar2";
import Footer from "@/Components/Footer/Footer";
import ContactBanner from "@/Components/Banners/ContactBanner";
import OfferBanner from "@/Components/Banners/OfferBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wallpaper Heaven",
  description: "Luxury Wallpapers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ffffff] text-[#0B2814]`}
      >
        <NavBar2 />
        <OfferBanner tag="Offer" highlightedText={"20% off"} />
        {children}
        <Footer />
        <ContactBanner />
      </body>
    </html>
  );
}

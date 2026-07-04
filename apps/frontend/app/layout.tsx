import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar2 from "@/Components/Nav-Bar/NavBar2";
import ContactBanner from "@/Components/Banners/ContactBanner";
import OfferBanner from "@/Components/Banners/OfferBanner";
import Providers from "./providers";
import HomeScreenFooter from "@/Components/Base/HomeFooter";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wallpaper Heaven | Best Wallpapers & Curtains in Gurgaon",
  description:
    "Wallpaper Heaven is Gurgaon's premier destination for luxury wallpapers, designer curtains, and premium home decor. Transform your living spaces with our exclusive collection — the best in home interiors.",
  keywords: [
    "wallpapers in Gurgaon",
    "curtains in Gurgaon",
    "best wallpapers Gurgaon",
    "home decor Gurgaon",
    "luxury wallpapers",
    "designer curtains",
    "interior decor Gurgaon",
    "wall coverings Gurgaon",
  ],
  openGraph: {
    title: "Wallpaper Heaven | Best Wallpapers & Curtains in Gurgaon",
    description:
      "Discover Gurgaon's finest collection of luxury wallpapers, curtains, and home decor. Elevate every room with Wallpaper Heaven.",
    type: "website",
  },
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
        <Providers>
          <OfferBanner  />
          {children}
        </Providers>
        <HomeScreenFooter/>
        <ContactBanner />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

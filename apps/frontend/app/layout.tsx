import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Wallpaper Heaven | Luxury Home Interior Wallpapers',
  description: 'Transform your space with premium wallpapers from Wallpaper Heaven. Explore our curated collection of luxury patterns, textures, and designs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#FAF9F6]">
        {children}
      </body>
    </html>
  );
}
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavbarMain() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed select-none flex justify-between left-1/2 -translate-x-1/2 px-7 py-4 z-[100]
      transition-all duration-500 ease-in-out rounded-2xl
      ${isScrolled ? 'top-3 border shadow-lg bg-neutral-100 backdrop-blur-sm ' : 'top-1 border-none'}`}
            style={{
                maxWidth: isScrolled ? '66rem' : '100%',
                width: '100%',
                transition: 'max-width 0.6s ease, top 0.4s ease',
            }}
        >
            <Link href="/" className="flex items-center">
                <span className="transition-all duration-500 text-2xl font-light">
                    Wallpaper Heaven
                </span>
            </Link>

            <div className="flex items-center gap-x-8 text-[16px]">
                <span>Collections</span>
                <span>Genre</span>
                <span>Brand</span>
                <span>Designers</span>
            </div>
        </nav>
    );
}

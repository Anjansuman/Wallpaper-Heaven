"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavbarMain() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Collections", href: "/inventory/collections" },
        { label: "Genre", href: "/inventory/genre" },
        { label: "Brand", href: "/inventory/brands" },
        { label: "Designers", href: "/designers" },
    ]

    return (
        <>
            <nav
                className={`fixed select-none flex flex-col left-1/2 -translate-x-1/2 px-4 sm:px-7 py-4 z-[100]
          transition-all duration-500 ease-in-out rounded-2xl
          ${isScrolled ? 'top-3 border shadow-lg bg-neutral-100 backdrop-blur-sm' : 'top-1 border-none'}`}
                style={{
                    maxWidth: isScrolled ? '66rem' : '100%',
                    width: '100%',
                    transition: 'max-width 0.6s ease, top 0.4s ease',
                }}
            >
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="flex items-center">
                        <span className="transition-all duration-500 text-xl sm:text-2xl font-light">
                            Wallpaper Heaven
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-x-6 lg:gap-x-8 text-[16px]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="hover:opacity-70 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex items-center p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col gap-y-3 pt-4 pb-1 text-[16px]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:opacity-70 transition-opacity"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
}

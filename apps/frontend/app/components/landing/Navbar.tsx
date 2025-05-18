"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#ffffff] text-black bg-opacity-90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className={` ${isScrolled ? " text-black text-2xl font-semibold font-playfair" : "text-2xl font-semibold font-playfair text-neutral-100"}`}>Wallpaper Heaven</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#collections"
            className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-neutral-100 hover:text-white'}`}
          >
            Collections
          </Link>

          <Link
            href="#inspiration"
            className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-neutral-100 hover:text-white'}`}
          >
            Genre
          </Link>

          <Link
            href="#about"
            className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-neutral-100 hover:text-white'}`}
          >
            Brands
          </Link>

          <Link
            href="#contact"
            className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-neutral-100 hover:text-white'}`}
          >
            Designers
          </Link>

          <Link
            href="/signin"
            className={`nav-item px-6 py-2 rounded-full transition-colors duration-300 ${isScrolled ? 'bg-black text-white hover:bg-gray-800' : ' bg-black text-neutral-100 hover:bg-[#111] hover:text-neutral-200'}`}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="#collections" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">Collections</Link>
            <Link href="#inspiration" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">Inspiration</Link>
            <Link href="#about" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">About Us</Link>
            <Link href="#contact" className="text-gray-800 hover:text-gray-600 transition-colors duration-300">Contact</Link>
            <Link href="/signin" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 inline-block text-center w-full">Sign In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

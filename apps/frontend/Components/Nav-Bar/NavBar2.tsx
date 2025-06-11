"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { MoreVertical } from 'lucide-react';
import SignIn from '../Auth/Signin';

export default function Navbar2() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [signinOption, setSigninOption] = useState<boolean>(false);
  const [signin, setSignin] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#ffffff] text-black bg-opacity-90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="relative container mx-auto px-2 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={` ${isScrolled ? " text-black text-2xl font-semibold font-playfair" : "text-2xl font-semibold font-playfair text-neutral-100"}`}>Wallpaper Heaven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['#collections', '#inspiration', '#about', '#contact'].map((href, idx) => (
              <Link
                key={href}
                href={href}
                className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-neutral-100 hover:text-white'}`}
              >
                {['Collections', 'Genre', 'Brands', 'Designers'][idx]}
              </Link>
            ))}

            {/* MoreVertical Button */}
            <div className="relative">
              <button
                title="Only For Admin"
                onClick={() => setSigninOption(prev => !prev)}
                className={`nav-item px-4 py-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-black hover:text-[#9e9e9e]' : 'text-neutral-100 hover:text-neutral-600'}`}
              >
                <MoreVertical />
              </button>

              {/* Dropdown */}
              {signinOption && (
                <div className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-sm border border-neutral-200 z-20">
                  <div
                    onClick={() => {
                      setSignin(true);
                      setSigninOption(false);
                    }}
                    className="flex text-[18px] p-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex pl-2 pr-2 w-[70px] whitespace-nowrap">Sign In</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          <div className="md:hidden bg-white py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {['#collections', '#inspiration', '#about', '#contact'].map((href, idx) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
                >
                  {['Collections', 'Inspiration', 'About Us', 'Contact'][idx]}
                </Link>
              ))}
              <button
                onClick={() => setSignin(true)}
                className="bg-black text-white px-2 w-auto rounded-full hover:bg-gray-800 transition duration-300"
              >
                SignIn
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SignIn Modal */}
      {signin && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-sm transition-opacity duration-300">
          <div className="relative z-50">
            <SignIn handleClick={() => setSignin(false)} />
          </div>
        </div>
      )}
    </>
  );
}

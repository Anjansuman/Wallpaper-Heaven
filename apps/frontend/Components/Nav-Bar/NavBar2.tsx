"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRightFromLine, MoreVertical, User } from 'lucide-react';
import SignIn from '../Auth/Signin';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar2() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [signinOption, setSigninOption] = useState<boolean>(false);
  const [signin, setSignin] = useState<boolean>(false);
  const [logoutPanel, setLogoutPanel] = useState<boolean>(false);
  const { data: session, status } = useSession();


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

            {/* User Button */}
            <div className="relative cursor-pointer">
              <button
                title="Only For Admin"
                onClick={() => setSigninOption(prev => !prev)}
                className={`nav-item px-4 py-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-black hover:text-[#9e9e9e]' : 'text-neutral-100 hover:text-neutral-600 cursor-pointer'}`}
              >
                <User />
              </button>

              {/* Dropdown */}
              {signinOption && (
                <div className="absolute top-12 right-0 bg-white text-black hover:bg-white/70 shadow-lg rounded-sm border border-neutral-400 z-20 transition-colors duration-200">
                  {session ? (
                    <div className='flex justify-center items-center px-2'>
                      <div className="flex text-[18px] p-2 font-medium whitespace-nowrap">
                        Hello, {session.user?.name || "User"}
                      </div>
                      <span
                        onClick={() => setLogoutPanel(true)}
                        title='Logout'
                        className='text-red-700 hover:text-red-600 cursor-pointer transition-colors duration-200'>
                        <ArrowRightFromLine />
                      </span>

                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSignin(true);
                        setSigninOption(false);
                      }}
                      className="flex text-[18px] p-2  hover:text-black transition-colors cursor-pointer"
                    >
                      <div className="flex pl-2 pr-2 w-[70px] whitespace-nowrap">Sign In</div>
                    </div>
                  )}

                  {logoutPanel && (
                    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
                      <div className="bg-white text-black p-6 rounded-lg shadow-xl shadow-black/50 text-center space-y-4 w-[90%] max-w-sm">
                        <p className="text-xl font-semibold">Are you sure?</p>
                        <div className="flex justify-center space-x-5">
                          <button
                            onClick={() => {
                              setLogoutPanel(false);
                              signOut({ callbackUrl: "/" })
                              console.log('Logging out...');
                            }}
                            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md shadow-md cursor-pointer transition-colors duration-200"
                          >
                            Logout
                          </button>
                          <button
                            onClick={() => setLogoutPanel(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md shadow-md cursor-pointer transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}


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
                className="bg-
                 text-white px-2 w-auto rounded-full hover:bg-gray-800 transition duration-300"
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

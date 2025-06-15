"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRightFromLine, User } from 'lucide-react';
import SignIn from '../Auth/Signin';
import { signOut, useSession } from 'next-auth/react';
import { IconCaretDownFilled, IconSearch, IconSquarePlus } from '@tabler/icons-react';
import { getToken } from "next-auth/jwt";

export async function handler(req: any, res: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(token);
  res.end();
}

export default function Navbar2() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [signinOption, setSigninOption] = useState<boolean>(false);
  const [signin, setSignin] = useState<boolean>(false);
  const [logoutPanel, setLogoutPanel] = useState<boolean>(false);
  const [adminPanel, setAdminPanel] = useState<boolean>(false);
  const [searchPanel, setSearchPanel] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null);
  const adminPanelRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

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

  useEffect(() => {
    if (signinOption && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [signinOption]);

  useEffect(() => {
    if (adminPanel && adminPanelRef.current) {
      gsap.fromTo(
        adminPanelRef.current,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [adminPanel]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-black shadow-md py-2' : 'bg-transparent text-white py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-semibold font-playfair ${isScrolled ? 'text-black' : 'text-white'}`}>
              Wallpaper Heaven
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['collections', 'inspiration', 'about', 'contact'].map((href, idx) => (
              <Link
                key={href}
                href={href}
                className={`nav-item transition-colors duration-300 ${isScrolled ? 'text-neutral-800 hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
              >
                {['Collections', 'Genre', 'Brands', 'Designers'][idx]}
              </Link>
            ))}

            {/* User Dropdown */}
            <div className="relative ">
              <button 
              onClick={() => setSearchPanel(prev => !prev)}
              className='relative mr-3 cursor-pointer'>
                <IconSearch />
              </button>
              <button
                title="Only For Admin"
                onClick={() => setSigninOption(prev => !prev)}
                className={`nav-item px-4 py-2 rounded-full transition-colors duration-300 cursor-pointer ${isScrolled ? 'text-black hover:text-[9e9e9e]' : 'text-white hover:text-neutral-400'}`}
              >
                <User />
              </button>

              {searchPanel && (
                <input placeholder='search' className='absolute justify-center items-start hover:text-gray-500 px-8 top-15 right-10 bg-white/80 h-[35px] w-[340px] text-[#949494] rounded-full '>
                  
                </input>
              )}


              {signinOption && (
                <div
                  ref={dropdownRef}
                  className="absolute top-12 right-0 bg-white text-black shadow-lg rounded-md border border-neutral-300 min-w-[240px] z-30"
                >
                  {session ? (
                    <div className="p-4 space-y-3">
                      <div className="text-sm font-semibold text-gray-800">
                        Hello, {session.user?.name || "User"}
                      </div>

                      <div className="flex gap-3">
                        <div
                          onClick={() => setAdminPanel(prev => !prev)}
                          className="px-4 py-2 flex items-center gap-2 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                        >
                          <span>Admin</span>
                          <IconCaretDownFilled />
                        </div>

                        <div
                          onClick={() => setLogoutPanel(true)}
                          className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 shadow-sm cursor-pointer"
                        >
                          <ArrowRightFromLine className="w-4 h-4" />
                          Logout
                        </div>
                      </div>

                      {adminPanel && (
                        <div ref={adminPanelRef} className="mt-2 flex flex-col space-y-2">
                          {['Tag', 'Product', 'Brand', 'Creator'].map((item, i) => (
                            <button
                              key={i}
                              onClick={() => console.log(`${item} clicked`, session)}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                            >
                              <IconSquarePlus className="w-4 h-4" />
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setSignin(true);
                        setSigninOption(false);
                      }}
                      className="p-4 text-[18px] hover:text-black cursor-pointer"
                    >
                      <div className="pl-2 pr-2">Sign In</div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" stroke="currentColor" fill="none">
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
              {['#collections', '#inspiration', '#about', '#contact'].map((href, idx) => (
                <Link key={href} href={href} className="text-gray-800 hover:text-gray-600">
                  {['Collections', 'Inspiration', 'About Us', 'Contact'][idx]}
                </Link>
              ))}
              <button
                onClick={() => setSignin(true)}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {logoutPanel && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl text-center space-y-4 w-[90%] max-w-sm">
            <p className="text-xl font-semibold">Are you sure?</p>
            <div className="flex justify-center space-x-5">
              <button
                onClick={() => {
                  setLogoutPanel(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md"
              >
                Logout
              </button>
              <button
                onClick={() => setLogoutPanel(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {signin && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="relative z-50">
            <SignIn handleClick={() => setSignin(false)} />
          </div>
        </div>
      )}
    </>
  );
}

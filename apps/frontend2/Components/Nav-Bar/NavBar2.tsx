"use client";

import { IconMenu2, IconSearch } from "@tabler/icons-react";
import BrandName from "../ui/Customs/BrandName";
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../ui/Customs/SearchBar";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PhoneNavElements from "./PhoneNavElements";

export const NavBar2 = () => {
  const [searchPanel, setSearchPanel] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [hamburgerPanel, setHamburgerPanel] = useState<boolean>(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // Animate search panel
  useEffect(() => {
    if (searchRef.current) {
      if (searchPanel) {
        gsap.fromTo(
          searchRef.current,
          { y: -20, opacity: 0, visibility: "hidden" },
          {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(searchRef.current, {
          y: -20,
          opacity: 0,
          visibility: "hidden",
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [searchPanel]);

  // Optional: reset display to block (if using display logic elsewhere)
  useEffect(() => {
    if (searchRef.current && searchPanel) {
      searchRef.current.style.display = "block";
    }
  }, [searchPanel]);

  // Detect scroll and toggle shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (hamburgerRef.current) {
      if (hamburgerPanel) {
        gsap.fromTo(
          hamburgerRef.current,
          { x: "100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(hamburgerRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [hamburgerPanel]);

  useEffect(() => {
    if (hamburgerPanel) {
      setShowHamburger(true);
    } else {
      // Delay removal to let animation play
      setTimeout(() => setShowHamburger(false), 300);
    }
  }, [hamburgerPanel]);

  return (
    <div
      className={cn(
        "w-screen bg-[#faf0e640] backdrop-blur-2xl pt-3 md:py-5 px-6 md:px-16 fixed z-50 flex flex-col items-center transition-shadow duration-300",
        isScrolled && "shadow-lg"
      )}
    >
      <div className="w-full flex justify-between items-center ">
        <div className="hidden md:flex">
          <Link href={"/"}>
            <BrandName size={"sm"} />
          </Link>
        </div>
        <div className="md:hidden">
          <Link href={"/"}>
            <BrandName size={"xs"} />
          </Link>
        </div>

        <div className="flex items-center gap-x-3 relative">

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center gap-x-6 text-[#0B2814] font-semibold">
            {["Designs", "Genre", "Brands", "Designers"].map((e, key) => (
              <div className="hover:underline cursor-pointer" key={key}>
                <Link href={`/inventory/${e.toLowerCase()}`} >
                  {e}
                </Link>
              </div>
            ))}
            <div className="relative">
              <IconSearch
                onClick={() => setSearchPanel((value) => !value)}
                className="cursor-pointer"
              />
              <div
                ref={searchRef}
                className="search-bar absolute right-0 top-16 z-10 opacity-0 invisible w-[400px] transition-all duration-300"
              >
                <SearchBar />
              </div>
            </div>
            <div className="h-7 w-7 border-2 border-red-500 rounded-full"></div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden cursor-pointer"
            onClick={() => setHamburgerPanel((value) => !value)}
          >
            <IconMenu2 />
          </div>
        </div>
      </div>
      <div className="w-full mt-2 md:hidden flex justify-center items-center text-center overflow-x-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] scroll-smooth gap-x-5 py-1 ">
        {["Best Sellers", "New Arrivals", "Indian", "Pichwai", "Floral", "Kids Room", "Premium", "3D Designs", "Space", "Bedroom", "Living Room", "Pooja Room"].map((value, index) => (
          <div
            key={index}
            className="w-full text-sm font-normal whitespace-nowrap ">
            {value}
          </div>
        ))}
      </div>

      {/* Hamburger panel */}
      {hamburgerPanel ? (
        <div
          ref={hamburgerRef}
          className="md:hidden h-screen w-full sm:w-[50%] absolute z-50 top-0 right-0 ">
          <PhoneNavElements close={() => setHamburgerPanel(false)} />
        </div>
      ) : ""}
    </div>
  );
};
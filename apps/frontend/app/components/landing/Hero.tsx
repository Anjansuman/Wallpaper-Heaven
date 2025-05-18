"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(heroRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    tl.from('.hero-text > *', {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    }, "-=0.5");

    gsap.to(textRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/testMainBG.jpeg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
      </div>

      {/* Hero Content */}
      <div
        ref={textRef}
        className="container mx-auto px-4 z-10 text-center hero-text"
      >
        <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6">
          Transform Your Space
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
          Discover our exclusive collection of luxury wallpapers designed to elevate your interior
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#collections"
            className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-300 transition-colors duration-300"
          >
            Explore Collection
          </Link>
          <Link
            href="#contact"
            className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-[#c0a98f] hover:border-[#c0a98f] hover:bg-opacity-10 transition-colors duration-300"
          >
            Request Consultation
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce w-6 h-10 flex justify-center items-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

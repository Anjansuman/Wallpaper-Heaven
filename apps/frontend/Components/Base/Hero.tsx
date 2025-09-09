"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1,
            }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        setIsVisible(true);

        return () => {
            if (heroRef.current) observer.unobserve(heroRef.current);
        };
    }, []);

    return (
        <div
            ref={heroRef}
            className={`w-full h-full flex flex-col py-2 items-center gap-y-4 transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
        >
            <span className="border border-black px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-3xl transition-all duration-1000">
                Luxury you can live within
            </span>

            <div className="w-full flex flex-col items-center text-[70px] font-semibold leading-18 transition-all duration-1000">
                <span>Every home deserves</span>
                <span className="text-[70px]">a masterpiece</span>
            </div>
            <div className="w-full flex flex-col items-center transition-all duration-1000">
                <span>Bring your interiors to life with designs that inspire,</span>
                <span>impress, and elevate your space.</span>
            </div>
        </div>
    );
}

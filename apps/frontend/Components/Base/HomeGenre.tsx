"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function HomeGenre() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const [selected, setSelected] = useState<null | { title: string; bgColor: string; image: string }>({
        title: "Pichwai",
        bgColor: "#D0C1E9",
        image: "/images/curtains.png",
    });

    const allGenre = [
        { title: "Pichwai", bgColor: "#C5B4E3", image: "/images/curtains.png" },
        { title: "Tropical", bgColor: "#FFD9A6", image: "/images/decor-items.png" },
        { title: "Minimal", bgColor: "#E0E0E0", image: "/images/home.png" },
        { title: "Vintage", bgColor: "#F3CBB7", image: "" },
        { title: "Abstract", bgColor: "#B3E5FC", image: "" },
        { title: "Floral", bgColor: "#F8BBD0", image: "" },
        { title: "Bohemian", bgColor: "#F6E2A1", image: "" },
        { title: "Geometric", bgColor: "#A8E6CF", image: "" },
        { title: "Rustic", bgColor: "#EBD5B3", image: "" },
        { title: "Modern", bgColor: "#CFD8DC", image: "" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px 0px -50px 0px'
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-[500px] w-full flex mt-40 max-w-7xl"
        >
            <div className="h-full w-[60%] flex flex-col">
                <div
                    className={cn(
                        "text-6xl transition-all duration-1000 ease-out",
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    )}
                >
                    Genre
                </div>

                <div
                    className={cn(
                        "text-xl transition-all duration-1000 ease-out delay-200",
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    )}
                >
                    Explore the range of genres that suits your home and requirements
                </div>

                <div
                    className={cn(
                        "flex flex-wrap gap-3 mt-8 transition-all duration-1000 ease-out delay-400",
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    )}
                >
                    {allGenre.map((genre, index) => (
                        <div
                            key={index}
                            onClick={() => setSelected(genre)}
                            style={{
                                backgroundColor: genre.bgColor,
                            }}
                            className={cn(
                                "text-xl px-4 py-1.5 rounded-full cursor-pointer",
                                "shadow-sm transition-all duration-200 ease-out transform hover:scale-105",
                                isVisible
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-4 scale-95"
                            )}
                        >
                            {genre.title}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-full w-[40%] flex items-center justify-center py-6">
                {selected ? (
                    <div
                        className={cn(
                            "relative p-6 rounded-3xl text-2xl h-full w-full overflow-hidden shadow-lg",
                            "transition-all duration-1000 ease-out delay-800",
                            isVisible
                                ? "opacity-100 translate-x-0 scale-100"
                                : "opacity-0 translate-x-8 scale-95"
                        )}
                    >
                        <button
                            onClick={() => router.push(`/collections/${selected.title}`)}
                            className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 hover:scale-105 transition-all"
                        >
                            <ArrowRight className="size-5" />
                        </button>

                        <Image
                            src={selected.image}
                            alt={selected.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <span
                        className={cn(
                            "text-white text-xl transition-all duration-1000 ease-out delay-800",
                            isVisible
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-8"
                        )}
                    >
                        Select a Genre →
                    </span>
                )}
            </div>
        </div>
    );
}
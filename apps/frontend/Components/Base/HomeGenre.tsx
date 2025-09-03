"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function HomeGenre() {
    const router = useRouter();

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

    return (
        <div className="h-[500px] w-full flex mt-40 max-w-7xl">

            <div className="h-full w-[60%] flex flex-col">
                <div className="text-6xl">Genre</div>
                <div className="text-xl">
                    Explore the range of genres that suits your home and requirements
                </div>

                <div className="flex flex-wrap gap-3 mt-8">
                    {allGenre.map((genre, index) => (
                        <div
                            key={index}
                            onClick={() => setSelected(genre)}
                            style={{ backgroundColor: genre.bgColor }}
                            className={cn(
                                "text-xl px-4 py-1.5 rounded-full cursor-pointer",
                                "shadow-sm transition-transform transform hover:scale-105"
                            )}
                        >
                            {genre.title}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-full w-[40%] flex items-center justify-center py-6">
                {selected ? (
                    <div className="relative p-6 rounded-3xl text-2xl h-full w-full overflow-hidden shadow-lg">
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
                    <span className="text-white text-xl">Select a Genre →</span>
                )}
            </div>
        </div>
    );
}

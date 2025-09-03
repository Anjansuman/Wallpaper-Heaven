"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const designers = [
    {
        name: "Nayan Suman",
        role: "Wallpaper Designer",
        description:
            "I specialize in giving people what they want and need, ensuring my designs align with their vision through creativity and art.",
        image: "/images/man.png",
    },
    {
        name: "Riya Kapoor",
        role: "Interior Stylist",
        description:
            "I craft immersive spaces that blend aesthetics with functionality, creating interiors that speak to your lifestyle.",
        image: "/images/decor-items.png",
    },
    {
        name: "Arjun Mehta",
        role: "3D Visualization Artist",
        description:
            "I bring imagination to life by designing realistic 3D models and concepts for modern and traditional interiors.",
        image: "/images/home.png",
    },
    {
        name: "Simran Sharma",
        role: "Textile & Fabric Designer",
        description:
            "I design unique fabric patterns and wallpapers that add personality and vibrance to every living space.",
        image: "/images/curtains.png",
    },
];

export default function HomeDesigners() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? designers.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === designers.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="w-full max-w-7xl mt-50">

            <div className="mb-10">
                <div className="text-6xl">Designers</div>
                <div className="text-xl py-3 mb-5">
                    Explore the range of genres that suits your home and requirements
                </div>
            </div>

            <div className="w-full h-[350px] flex relative">

                <div className="w-[50%] h-full flex justify-start items-center relative">
                    {designers.map((designer, index) => {
                        const isActive = index === currentIndex;
                        const rotateValue = (index - currentIndex) * 4;
                        const zIndex =
                            isActive ? 30 : 10 - Math.abs(index - currentIndex);

                        return (
                            <div
                                key={designer.name}
                                className={`absolute w-[450px] h-[300px] rounded-3xl transition-all duration-500`}
                                style={{
                                    transform: `rotate(${rotateValue}deg) translateX(${isActive ? "0" : "20px"
                                        })`,
                                    zIndex,
                                }}
                            >
                                <div className="relative p-6 rounded-3xl text-2xl h-full w-full overflow-hidden shadow-lg z-20">
                                    <Image
                                        src={designer.image}
                                        alt={designer.name}
                                        fill
                                        className="object-cover rounded-3xl"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-[50%] h-full flex flex-col p-4 py-10 gap-y-5 relative">
                    <div className="text-2xl flex flex-col">
                        <span>{designers[currentIndex].name}</span>
                        <span className="text-[15px] text-neutral-800">
                            {designers[currentIndex].role}
                        </span>
                    </div>

                    <div className="text-[18px]">
                        {designers[currentIndex].description}
                    </div>

                    <div className="flex justify-start absolute bottom-10 left-4 gap-x-4">
                        <button
                            onClick={handlePrev}
                            className="h-[40px] w-15 bg-neutral-950 text-neutral-100 rounded-md flex justify-center items-center hover:-translate-y-0.5 transition-all transform duration-200 shadow-sm"
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            onClick={handleNext}
                            className="h-[40px] w-15 bg-neutral-950 text-neutral-100 rounded-md flex justify-center items-center hover:-translate-y-0.5 transition-all transform duration-200 shadow-sm"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomeImageChangingBanner() {
    const imageInfo = [
        {
            src: "/images/home.png",
            title: "Amanora",
            description:
                "This is the description of the Amanora image, it is a very beautiful image, I like that image wowwwwwwwwww",
        },
        {
            src: "/images/home.png",
            title: "Amanora 2",
            description:
                "Another description for Amanora image, stunning view and amazing vibes",
        },
        {
            src: "/images/home.png",
            title: "Amanora 3",
            description: "Yet another description for this beautiful image",
        },
        {
            src: "/images/home.png",
            title: "Amanora 4",
            description: "Final description of the image in this banner",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % imageInfo.length);
                setFade(true);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentImage = imageInfo[currentIndex];

    return (
        <div className="h-[400px] w-full relative overflow-hidden mt-20">
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                    }`}
            >
                <Image
                    src={currentImage.src}
                    alt={`home-image-${currentIndex}`}
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>


            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/50 to-transparent text-white transition-opacity duration-500">
                <h2 className="text-4xl font-bold">{currentImage.title}</h2>
                <p className="text-xl mt-2">{currentImage.description}</p>
            </div>
        </div>
    );
}

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import UserPageNavbar from "@/Components/Nav-Bar/UserPageNavbar";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";

const images = [
    {
        src: "/col1.jpeg",
        title: "Product 1",
        description: "This is for Anjan.",
    },
    {
        src: "/col2.jpeg",
        title: "Product 2",
        description: "This is for Nayan Bhaiya.",
    },
    {
        src: "/col3.jpeg",
        title: "Product 3",
        description: "This is for Gunnu Bhaiya.",
    },
];

export default function Product() {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const { data: session } = useSession();
    const zoomRef = useRef<HTMLDivElement>(null);

    const handleSmallBlockHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomRef.current) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
    };

    const resetZoom = () => {
        if (zoomRef.current) {
            zoomRef.current.style.backgroundSize = "contain";
            zoomRef.current.style.backgroundPosition = "center";
        }
    };

    const activateZoom = () => {
        if (zoomRef.current) {
            zoomRef.current.style.backgroundImage = `url(${selectedImage.src})`;
            zoomRef.current.style.backgroundSize = "200%";
        }
    };

    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <UserPageNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10  pt-30">

                {/* Left: Thumbnails */}
                <div className="order-2 md:order-1 flex md:flex-col gap-4 justify-center items-center md:items-start">
                    {images.map((img, idx) => {
                        const isActive = img.src === selectedImage.src;
                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                onMouseMove={isActive ? handleSmallBlockHover : undefined}
                                onMouseEnter={isActive ? activateZoom : undefined}
                                onMouseLeave={isActive ? resetZoom : undefined}
                                className={`relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden cursor-pointer border-2 group transition-all duration-200 ${isActive ? "border-black scale-[1.03]" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Center: Large Image */}
                <div className="order-1 md:order-2 col-span-2 flex flex-col items-center md:items-start">
                    <div
                        ref={zoomRef}
                        className="relative w-full h-[400px] md:h-[500px] rounded-xl border bg-center bg-no-repeat bg-contain"
                        style={{ backgroundImage: `url(${selectedImage.src})` }}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            fill
                            className="opacity-0"
                            priority
                        />
                    </div>

                    <div className="mt-6 text-center md:text-left w-full">
                        <h1 className="text-3xl font-bold">{selectedImage.title}</h1>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            {selectedImage.description}
                        </p>
                    </div>

                    {session && (
                        <Button text="View More" onClick={handleClick}/>
                    )}
                </div>

            </div>
        </div>
    );
}
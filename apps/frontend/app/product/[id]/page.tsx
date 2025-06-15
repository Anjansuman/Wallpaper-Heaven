"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import UserPageNavbar from "@/Components/Nav-Bar/UserPageNavbar";
import { useSession } from "next-auth/react";

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

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <UserPageNavbar />
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Left: Large Image */}
                <div className="col-span-2">
                    <div
                        ref={zoomRef}
                        className="relative w-full h-[500px] rounded-xl border bg-center bg-no-repeat bg-contain"
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

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {images.map((img, idx) => {
                            const isActive = img.src === selectedImage.src;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    onMouseMove={isActive ? handleSmallBlockHover : undefined}
                                    onMouseEnter={isActive ? activateZoom : undefined}
                                    onMouseLeave={isActive ? resetZoom : undefined}
                                    className={`relative w-full h-50 rounded-xl overflow-hidden cursor-pointer border-2 group transition-transform ${isActive ? "border-black scale-[1.02]" : "border-gray-200"
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
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col justify-start gap-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{selectedImage.title}</h1>
                        <p className="text-gray-600 mt-2 text-base leading-relaxed">
                            {selectedImage.description}
                        </p>
                    </div>

                    {session && (
                        <button className="w-fit px-6 py-3 rounded-full bg-black text-white font-medium cursor-pointer hover:bg-white hover:text-black border border-black transition-colors duration-200">
                            View More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

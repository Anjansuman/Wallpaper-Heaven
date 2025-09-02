"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomeEnlargedImage() {
    const mainImages = [
        {
            src: "/images/home.png",
            title: "Wallpapers",
            desc: "Turn walls into works of art — our wallpapers bring texture, color, and personality to every room, making a bold statement without saying a word.",
            smallImages: ["/col1.jpeg", "/col2.jpeg", "/col3.jpeg", "/col4.jpeg"],
        },
        {
            src: "/images/curtains.png",
            title: "Curtains",
            desc: "Frame your windows with elegance — our curtains blend style and function, adding warmth, privacy, and a touch of luxury to your space.",
            smallImages: ["/col1.jpeg", "/col2.jpeg", "/col3.jpeg", "/col4.jpeg"],
        },
        {
            src: "/images/decor-items.png",
            title: "Decor Items",
            desc: "Small details, big impact — our curated décor pieces add character, charm, and a signature style to every corner of your home.",
            smallImages: ["/col1.jpeg", "/col2.jpeg", "/col3.jpeg", "/col4.jpeg"],
        },
    ];

    const [selected, setSelected] = useState<number>(0);

    return (
        <div className="w-full h-[620px] px-10 overflow-hidden flex gap-x-5 pt-5">
            {mainImages.map((img, index) => {
                const isSelected = selected === index;
                return (
                    <div
                        key={index}
                        className={`relative h-full rounded-xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg ${isSelected ? "flex-[3]" : "flex-[1] flex items-center justify-center"
                            }`}
                        onClick={() => setSelected(index)}
                    >
                        <Image
                            src={img.src}
                            alt={`home-image-${index}`}
                            fill
                            className="object-cover"
                            unoptimized
                        />

                        {!isSelected && (
                            <div
                                className="absolute inset-0 flex items-center justify-center z-10 select-none bg-black/20"
                            >
                                <div
                                    className="text-neutral-100 text-4xl font-medium tracking-widest"
                                    style={{
                                        transform: "rotate(-90deg)",
                                        transformOrigin: "center",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {img.title}
                                </div>
                            </div>
                        )}

                        {isSelected && (
                            <div className="absolute bottom-4 left-6 w-full max-w-3xl text-white z-10">
                                <div className="h-[300px] rounded-2xl overflow-hidden flex bg-white/20 backdrop-blur-xl">
                                    <div className="w-[40%] h-full p-5 flex flex-col justify-between">
                                        <div className="flex justify-around gap-2">
                                            {img.smallImages.slice(0, 2).map((src, i) => (
                                                <div
                                                    key={i}
                                                    className="h-32 w-32 border-3 border-transparent rounded-xl overflow-hidden relative"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`small-${i}`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-around gap-2">
                                            {img.smallImages.slice(2, 4).map((src, i) => (
                                                <div
                                                    key={i}
                                                    className="h-32 w-32 border-3 border-transparent rounded-xl overflow-hidden relative"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`small-${i + 2}`}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-[60%] h-full flex flex-col p-6 px-8 gap-y-4">
                                        <div className="text-3xl">{img.title}</div>
                                        <div className="text-xl text-neutral-100 tracking-wide">
                                            {img.desc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

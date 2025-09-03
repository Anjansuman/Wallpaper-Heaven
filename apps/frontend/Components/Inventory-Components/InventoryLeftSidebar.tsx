"use client";

import { Circle } from "lucide-react";
import { useState } from "react";

export default function LeftSidebar() {
    const [active, setActive] = useState<string | null>(null);

    const products = ["Wallpaper", "Paintings", "Murals"];
    const designs = ["Modern", "Classic", "Tropical"];

    return (
        <div className="fixed top-[5rem] left-0 w-[14%] h-[400px] rounded-r-xl border bordet-l-none border-neutral-400 p-4 px-7 flex flex-col gap-y-8 bg-[#e9e9e9]">
            
            <div className="w-full">
                <span className="block text-xl tracking-wider mb-3 uppercase">Products</span>

                <div className="flex flex-col gap-y-3">
                    {products.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-x-2 cursor-pointer"
                            onClick={() => setActive(item)}
                        >
                            {active === item ? (
                                <span className="w-5 h-5 rounded-full border-2 border-[#a48bb4] flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-[#a48bb4]" />
                                </span>
                            ) : (
                                <Circle className="size-5 text-neutral-600" strokeWidth={1.5} />
                            )}
                            <span
                                className={`${active === item ? "font-medium text-black" : "text-neutral-700"
                                    }`}
                            >
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full">
                <span className="block text-xl tracking-wider mb-3 uppercase">
                    Designs
                </span>

                <div className="flex flex-col gap-y-2">
                    {designs.map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-x-2 cursor-pointer"
                            onClick={() => setActive(item)}
                        >
                            {active === item ? (
                                <span className="w-5 h-5 rounded-full border-2 border-[#a48bb4] flex items-center justify-center">
                                    <span className="w-3 h-3 rounded-full bg-[#a48bb4]" />
                                </span>
                            ) : (
                                <Circle className="size-5 text-neutral-600" strokeWidth={1.5} />
                            )}
                            <span
                                className={`${active === item ? "font-medium text-black" : "text-neutral-700"
                                    }`}
                            >
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

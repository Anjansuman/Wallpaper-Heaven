"use client";

import { useState } from "react";

export default function ChooseProduct() {
    const productTypes = [
        "Wallpapers", "Curtains", "Blinds",
        "Upholstery", "Wood Flooring", "Wall Panels",
        "Artificial Grass", "Vertical Gardens", "Decor Items",
    ];

    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="h-full text-[#6DA165] px-6 ">
            <div className="flex flex-col items-start mb-6 ">
                <div className="font-semibold text-3xl">Choose a Product</div>
                <div className="">Choose a type that fits your product well.</div>
            </div>

            <div className="w-full flex justify-start items-center">
                <div className="w-fit grid grid-cols-3 gap-4 ">
                    {productTypes.map((type, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelected(type)}
                            className={`cursor-pointer max-w-40 border rounded-lg px-4 py-3 text-center hover:shadow-md transition-all duration-200 ${selected === type
                                ? "bg-[#6DA165] text-white border-[#6DA165] shadow-md"
                                : "border-[#6DA165] hover:bg-[#f0fdf4]"
                                }`}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

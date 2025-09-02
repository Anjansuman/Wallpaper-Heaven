"use client";

import { useAddProductStore } from "@/store/useAddProductStore";
import { useState } from "react";

export default function ChooseProduct() {
    const productTypes = [
        "Wallpapers", "Curtains", "Blinds",
        "Upholstery", "Wood Flooring", "Wall Panels",
        "Artificial Grass", "Vertical Gardens", "Decor Items",
    ];

    const [selected, setSelected] = useState<string | null>(null);
    const { product, updateProduct } = useAddProductStore();

    return (
        <div className="text-[#3D5A40] bg-[#F9FAF8] p-6 rounded-xl shadow-sm w-full max-w-3xl">
            <div className="flex flex-col items-start mb-6">
                <div className="font-bold text-3xl">Choose a Product</div>
                <div className="text-[#6D7278] text-base mt-1">
                    Choose a type that fits your product well.
                </div>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                {productTypes.map((type, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(type)}
                        className={`px-5 py-3 rounded-md text-md font-medium transition-all duration-200 border
              ${product?.productType === type
                                ? "bg-[#6DA165] text-white border-[#6DA165] shadow"
                                : "bg-white text-[#3D5A40] border-[#D1D5DB] hover:bg-[#f1f5f3]"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}

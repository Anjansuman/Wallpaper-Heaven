"use client";

import LeftSidebar from "@/Components/Inventory-Components/InventoryLeftSidebar";
import ProductGrid from "@/Components/Inventory-Components/ProductGrid";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import { ChevronRight, ChevronDown, Maximize2, X, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function ProductDetails({
    product,
    collapsed,
    toggleCollapse,
}: {
    product: Product;
    collapsed: boolean;
    toggleCollapse: () => void;
}) {
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <>
            <div
                className={`transition-all duration-500 overflow-hidden border-b border-neutral-400 flex ${collapsed ? "h-[80px]" : "h-[400px]"
                    }`}
            >
                <div
                    className={`w-[40%] h-full p-4 px-10 flex flex-col gap-y-2 justify-center ${collapsed ? "" : "border-r border-neutral-400"
                        }`}
                >
                    <div
                        className="text-2xl uppercase tracking-wide flex justify-between items-center cursor-pointer "
                        onClick={toggleCollapse}
                    >
                        <span className="flex items-center">
                            <span className="flex h-6 w-6 justify-center items-center rounded-full bg-neutral-300 mr-3">
                                {collapsed ? (
                                    <ChevronDown className="size-5" />
                                ) : (
                                    <ChevronRight className="size-5" />
                                )}
                            </span>
                            {product.name}
                        </span>
                        {collapsed && (
                            <span className="w-30 h-12 rounded-md shadow-md overflow-hidden absolute right-30">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </span>
                        )}
                    </div>

                    {!collapsed && (
                        <>
                            <div className="flex flex-col pb-3">
                                <span>MRP: ₹ {product.mrp}</span>
                                <span className="text-[15px]">
                                    Inclusive of all taxes
                                </span>
                            </div>

                            <div className="flex w-full h-full py-3 text-xl flex-col gap-y-0.5 ">
                                <span>Other details</span>
                                <span className="text-base pt-2">
                                    Color: {product.color}
                                </span>
                                <span className="text-base">
                                    Customizable: Yes
                                </span>
                                <span className="text-base">
                                    Paper type: Canvas
                                </span>
                            </div>

                            <div className="flex w-full h-full pt-3 text-xl flex-col gap-y-0.5 ">
                                <span>Description</span>
                                <span className="text-base pt-2">
                                    {product.description}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {!collapsed && (
                    <div className="w-[60%] h-full p-4">
                        <div className="relative p-6 rounded-xl text-2xl h-full w-full overflow-hidden shadow-lg">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />

                            <button
                                onClick={() => setFullscreen(true)}
                                className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 hover:scale-105 cursor-pointer transition-all transform duration-200"
                            >
                                <Maximize2 className="size-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {fullscreen && (
                <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-6 right-6 bg-black/60 text-white p-2 rounded-full hover:bg-black/80"
                    >
                        <X className="size-6" />
                    </button>
                </div>
            )}
        </>
    );
}

export type Product = {
    id: number;
    name: string;
    color: string;
    mrp: number;
    image: string;
    description: string;
};

export default function Collections() {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const products: Product[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Curtain ${i + 1}`,
        color: i % 2 === 0 ? "Beige" : "Grey",
        mrp: 1000 + i * 100,
        image: "/images/curtains.png",
        description: `This is a description for Curtain ${i + 1}.`,
    }));

    const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center bg-[#EFEFEF] overflow-hidden select-none">
            <NavbarMain />

            <div className="mt-[5rem] border-t border-neutral-400 w-full h-full flex">
                <LeftSidebar />

                <div className="ml-[15%] w-[85%] h-full flex flex-col border-l border-neutral-400 relative">
                    <div className="h-[80px] w-full border-b border-neutral-400 flex justify-between items-center text-3xl font-light tracking-wider px-10 uppercase">
                        <span className="bg-[#171418] text-neutral-300 px-5 py-1.5 shadow-md rounded-md flex">
                            Collections
                        </span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-1.5 rounded-full border border-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a5a8f] w-64 placeholder:text-[#7a5a8f]"
                            />
                            <button className="p-2 rounded-full bg-[#7a5a8f] text-white hover:bg-[#6d5081] transition-all transform duration-150">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <ProductDetails
                        product={selectedProduct}
                        collapsed={collapsed}
                        toggleCollapse={() => setCollapsed(!collapsed)}
                    />

                    <ProductGrid
                        products={products}
                        onSelect={(product) => {
                            setSelectedProduct(product);
                            setCollapsed(false);

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

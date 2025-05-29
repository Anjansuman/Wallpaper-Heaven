"use client";

import { useRef } from "react";
import { SliderBlock } from "../../ui/Customs/SliderBlock";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons
import image from "../../../public/home2.png";
import tree from "../../../public/tree.jpeg";
import Image from "next/image";
import Link from "next/link";
import { IconCaretRightFilled } from "@tabler/icons-react";

export default function Brands() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-3 ">
            <div>
                <div className="text-lg md:text-3xl text-[#0B2814] font-bold ">
                    <Link href={`/inventory/brands`} className="flex justify-start items-center ">
                        <div>
                            Brands
                        </div>
                        <IconCaretRightFilled className="size-4 md:size-5 ml-2" />
                    </Link>

                </div>
                <div className="text-xs md:text-md text-[#0B2814]  ">
                    get a tag, get a BRAND
                </div>
            </div>
            <div className="relative w-full flex flex-col gap-y-2 ">

                <div className="relative w-full ">
                    {/* Left Button */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-md"
                    >
                        <ChevronLeft className="w-6 h-6 text-black dark:text-white" />
                    </button>

                    {/* Content */}
                    <div
                        ref={scrollRef}
                        className=" pb-2 flex gap-x-4 overflow-x-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none] scroll-smooth "
                    >
                        {[...Array(10)].map((_, i) => (
                            <SliderBlock key={i} image={"jk"} title={"title"} />
                        ))}
                        <SliderBlock children={<div className="flex flex-col justify-center items-center" >
                            <div className="flex flex-col items-center justify-center ">
                                <div className="text-red-500 font-bold text-lg ">Explore</div>
                                <div>our exclusive Brands</div>
                            </div>
                            <Link href={`/inventory/brands`}>
                                <div className="bg-[#0B2814] w-fit px-4 py-2 rounded-md text-[#E6E0C5] ">See more</div>
                            </Link>
                        </div>} />
                    </div>


                    {/* Right Button */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-md"
                    >
                        <ChevronRight className="w-6 h-6 text-black dark:text-white" />
                    </button>
                </div>

                {/* bottom bar */}
                <div className="lg:h-28 sm:h-20 h-16 w-full relative">
                    <Image
                        src={tree}
                        alt="tree"
                        className="w-full h-full object-cover object-[center_70%] rounded-lg"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 2xl:text-3xl lg:text-xl md:text-lg sm:text-xl text-xs font-extrabold text-white text-center px-2">
                        The names you know. The quality you expect.
                    </div>
                </div>

            </div>
        </div>
    );
}

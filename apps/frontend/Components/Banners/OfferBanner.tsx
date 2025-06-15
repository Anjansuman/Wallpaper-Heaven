"use client"

import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

type Tag = "Offer" | "New"

interface OfferBannerProps {
    tag: Tag,
    highlightedText: String
}

const tags: Record<Tag, string> = {
    Offer: "get a flat",
    New: "Stocks renewed!"
};

export default function OfferBanner({ tag, highlightedText }: OfferBannerProps) {

    const [closeOffer, setCloseOffer] = useState<boolean>(false);
    const offerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(() => {

        if (!offerRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        if (hovered) {
            tl.to(offerRef.current, {
                width: "240px",
                duration: 0.4,
            })
        } else {
            tl.to(offerRef.current, {
                width: "176px",
                duration: 0.4
            })
        }

    }, [hovered]);

    return <div >
        {closeOffer &&
            <div className="flex flex-col">
                <div
                    onClick={() => setCloseOffer(false)}
                    className="fixed flex z-50 right-0 top-50 text-lg font-semibold backdrop-blur-2xl -rotate-90 border-[1px] border-[#c9c483] p-2 text-gray-300 rounded-lg bg-black/20 cursor-pointer "
                >
                    <div className="w-full h-auto flex justify-center items-center">
                        <div className=" w-2 h-2 bg-green-500 rounded-full flex animate-pulse mr-1"></div>
                    </div>
                    {tag}
                </div>
            </div>
        }
        {!closeOffer && <div
            ref={offerRef}
            className={`fixed z-50 right-0 top-40 h-40 w-44 p-2 bg-black/20 border-[1px] backdrop-blur-lg border-[#ffffff] rounded-l-lg flex flex-col items-center justify-between `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div onClick={() => setCloseOffer(true)} className="absolute top-2 right-2 h-4 w-4 bg-red-700 text-white rounded-full flex items-center justify-center hover:text-black transition-colors duration-150 cursor-pointer">
                ×
            </div>


            {/* <IconX className="size-4 absolute right-2 top-2 cursor-pointer text-[#ee2828] transition-colors " onClick={() => setCloseOffer(true)} /> */}

            <div className="w-full flex flex-col justify-center items-center text-lg font-semibold ">
                <div>
                    {tag}
                </div>
                <div className="border-[1px] border-[#ffffff] w-full"></div>
            </div>
            <div className="w-full flex flex-col items-center ">
                <div className="">
                    {tags[tag]}
                </div>
                <div className="text-[#9e1b1b] font-semibold ">
                    {highlightedText}
                </div>
            </div>
            <Link href={`/terms&conditions/offers`} className="flex justify-center items-center gap-x-1 text-xs" >
                <div className="text-[#0000ff] underline flex justify-center items-center text-center ">
                    terms & conditions
                </div>
                <div>
                    applied
                </div>
            </Link>
        </div>}
    </div>
}
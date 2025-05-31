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

    return <div>
        {closeOffer && <div
            onClick={() => setCloseOffer(false)}
            className="fixed z-50 left-0 top-50 text-lg font-semibold -rotate-90 border border-[#6DA165] p-2 rounded-lg bg-white/40 cursor-pointer "
        >
            {tag}
        </div>}
        {!closeOffer && <div
            ref={offerRef}
            className={`fixed z-50 left-0 top-40 h-40 w-44 p-2 bg-white/40 border border-[#6DA165] rounded-r-lg flex flex-col items-center justify-between `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <IconX className="size-4 absolute right-1 top-1 cursor-pointer text-[red] transition-colors " onClick={() => setCloseOffer(true)} />

            <div className="w-full flex flex-col justify-center items-center text-lg font-semibold ">
                <div>
                    {tag}
                </div>
                <div className="border border-[#6DA165] w-full"></div>
            </div>
            <div className="w-full flex flex-col items-center ">
                <div className="">
                    {tags[tag]}
                </div>
                <div className="text-[red] font-semibold ">
                    {highlightedText}
                </div>
            </div>
            <Link href={`/terms&conditions/offers`} className="flex justify-center items-center gap-x-1 text-xs" >
                <div className="text-[blue] underline flex justify-center items-center text-center ">
                    terms & conditions
                </div>
                <div>
                    applied
                </div>
            </Link>
        </div>}
    </div>
}
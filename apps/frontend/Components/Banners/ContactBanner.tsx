"use client"

import { IconBrandWhatsapp, IconPhone } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function ContactBanner() {
    const [hovered, setHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !numberRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (hovered) {
            tl.to(containerRef.current, {
                width: "240px",
                duration: 0.4,
            }, 0)
                .to(numberRef.current, {
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.3,
                }, 0.1);
        } else {
            tl.to(numberRef.current, {
                x: -20,
                autoAlpha: 0,
                duration: 0.2,
            }, 0)
                .to(containerRef.current, {
                    width: "100px",
                    duration: 0.3,
                }, 0.1);
        }
    }, [hovered]);

    return (
        <div
            ref={containerRef}
            className="h-16 fixed z-50 bottom-10 right-10 border border-[#6DA165] rounded-full bg-white/60 flex items-center py-2 pr-4 pl-2 gap-3 overflow-hidden "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ width: "100px" }}
        >
            <div
                ref={numberRef}
                className="absolute left-4 text-lg font-semibold opacity-0 whitespace-nowrap pointer-events-none"
                style={{ transform: "translateX(-20px)" }}
            >
                8882448998
            </div>
            <div className="flex justify-center items-center gap-x-2 absolute right-4 h-full ">
                <Link target={"_blank"} href={`tel:88824489998`}>
                    <IconPhone className="size-8 shrink-0" title={"call us"} />
                </Link>
                <Link target={"_blank"} href={`https://wa.me/918882448998`}>
                    <IconBrandWhatsapp className="size-8 shrink-0" title={"whatsapp us"} />
                </Link>
            </div>
        </div>
    );
}

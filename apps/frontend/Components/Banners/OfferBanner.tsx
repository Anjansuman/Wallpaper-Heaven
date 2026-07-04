"use client";

import { IconX, IconSparkles, IconFlame } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import axios from "axios";
import { ACTIVE_OFFER_URL } from "@/routes/routes";

type Tag = "Offer" | "New";

const tags: Record<Tag, string> = {
    Offer: "Limited Time",
    New: "Just Dropped!"
};

const tagIcons: Record<Tag, any> = {
    Offer: IconFlame,
    New: IconSparkles
};

interface Offer {
    badge: Tag;
    discount: string;
    productName: string;
    productType: string;
    validTill: string;
}

export default function OfferBanner() {
    const [offer, setOffer] = useState<Offer | null>(null);
    const [closeOffer, setCloseOffer] = useState(false);
    const offerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        fetchOffer();
    }, []);

    const fetchOffer = async () => {
        try {
            const res = await axios.get(ACTIVE_OFFER_URL);
            if (res.data?.offer) {
                setOffer(res.data.offer);
            }
        } catch {
            // no active offer — banner stays hidden
        }
    };

    useEffect(() => {
        if (!offerRef.current) return;
        gsap.to(offerRef.current, {
            width: hovered ? "320px" : "220px",
            duration: 0.5,
            ease: "power3.out"
        });
    }, [hovered]);

    if (!offer || closeOffer) {
        return (
            <div className="flex flex-col">
                <div
                    onClick={() => setCloseOffer(false)}
                    className="fixed flex z-50 right-0 top-50 -rotate-90 cursor-pointer group"
                >
                    <div className="bg-[#253249] p-[2px] rounded-lg shadow-lg hover:-translate-y-0.5 transition-all transform-3d duration-200">
                        <div className="bg-[#253249] backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center gap-2 transition-all duration-300">
                            <div className="relative">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                            </div>
                            {/* <IconGift size={16} className="text-gray-300" /> */}
                            <span className="text-white font-medium tracking-wider">
                                Hot Deals
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const TagIcon = tagIcons[offer.badge];

    return (
        <div
            ref={offerRef}
            className="fixed z-50 right-0 top-40 h-52 w-55 cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gray-900/30 rounded-l-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Main Card */}
            <div className="relative bg-gray-900 backdrop-blur-xl border border-gray-700 rounded-l-2xl overflow-hidden shadow-2xl">
                
                {/* Animated Border */}
                <div className="absolute inset-0 bg-gray-600 opacity-50 animate-pulse"></div>
                <div className="absolute inset-[1px] bg-gray-900 rounded-l-2xl"></div>
                
                {/* Content Container */}
                <div className="relative h-full flex flex-col bg-white">
                    
                    {/* Close Button */}
                    <button
                        onClick={() => setCloseOffer(true)}
                        className="absolute top-3 right-3 w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-all duration-300 z-20 group/close"
                    >
                        <IconX size={12} className="group-hover/close:rotate-90 transition-transform duration-300" />
                    </button>

                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TagIcon size={16} className="text-red-500" />
                                <span className="text-gray-800 font-semibold text-sm">
                                    {tags[offer.badge]}
                                </span>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 px-4 py-6 flex flex-col justify-center text-center space-y-4">
                        
                        {/* Discount Display */}
                        <div className="text-3xl font-bold text-gray-900">
                            {offer.discount}
                        </div>

                        {/* Product Info */}
                        {offer.productType && offer.productName && (
                            <div className="space-y-1">
                                <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                                    on {offer.productType}
                                </div>
                                <div className="text-gray-800 font-medium text-sm">
                                    {offer.productName}
                                </div>
                            </div>
                        )}

                        {/* Simple Status */}
                        <div className="text-blue-600 text-xs font-medium">
                            Limited time offer
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t border-gray-100">
                        <Link 
                            href="/terms&conditions/offers" 
                            className="block text-center text-xs text-gray-500 hover:text-blue-600 transition-colors duration-200"
                        >
                            Terms apply
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
                    50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
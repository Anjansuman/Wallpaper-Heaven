"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import brandIcon from "../../../public/home2.png"


// Types
interface Brand {
    id: string;
    name: string;
    logo: string;
    description: string;
    wallpaperCount: number;
    featured: boolean;
    slug: string;
}

interface BrandsProps {
    brands?: Brand[];
    className?: string;
}

const mockBrands: Brand[] = [
    {
        id: "1",
        name: "Prestigious",
        logo: "../../../public/home2.png",
        description: "Luxury wallpapers with timeless elegance",
        wallpaperCount: 245,
        featured: true,
        slug: "prestigious-textiles"
    },
    {
        id: "2",
        name: "Cole",
        logo: "/api/placeholder/200/120",
        description: "Heritage designs meet contemporary style",
        wallpaperCount: 189,
        featured: true,
        slug: "cole-and-son"
    },
    {
        id: "3",
        name: "Farrow & Ball",
        logo: "/api/placeholder/200/120",
        description: "Handcrafted with the finest ingredients",
        wallpaperCount: 156,
        featured: false,
        slug: "farrow-and-ball"
    },
    {
        id: "4",
        name: "Morris & Co",
        logo: "/api/placeholder/200/120",
        description: "Victorian artistry for modern homes",
        wallpaperCount: 203,
        featured: true,
        slug: "morris-and-co"
    },
    {
        id: "5",
        name: "Sanderson",
        logo: "/api/placeholder/200/120",
        description: "British design heritage since 1860",
        wallpaperCount: 178,
        featured: false,
        slug: "sanderson"
    },
    {
        id: "6",
        name: "Ralph Lauren",
        logo: "/api/placeholder/200/120",
        description: "American luxury and sophistication",
        wallpaperCount: 134,
        featured: true,
        slug: "ralph-lauren"
    },
    {
        id: "7",
        name: "Designers Guild",
        logo: "/api/placeholder/200/120",
        description: "Contemporary patterns and bold colors",
        wallpaperCount: 167,
        featured: false,
        slug: "designers-guild"
    },
    {
        id: "8",
        name: "Zoffany",
        logo: "/api/placeholder/200/120",
        description: "Sophisticated designs with global inspiration",
        wallpaperCount: 142,
        featured: false,
        slug: "zoffany"
    }
];

// Brand Card Component
const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Link
            href={`/brands/${brand.slug}`}
            className="group relative flex-shrink-0 w-80 h-64 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
        >
            {/* Featured */}
            {brand.featured && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-md">
                    Featured
                </div>
            )}

            {/* Brand Logo Container */}
            <div className="relative h-50 bg-gray-50 flex items-center justify-center p-6">

                <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm font-medium">{brand.name}</span>
                </div>


                {/* Loading skeleton */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-16 bg-gray-200 animate-pulse rounded-lg" />
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </div>

            {/* Brand Info */}
            <div className="pl-5 pb-5 pt-2 pr-5 flex flex-col justify-center flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {brand.name}
                    </h3>

                </div>
            </div>
        </Link>
    );
};

// Explore More Card Component
const ExploreCard: React.FC = () => (
    <Link
        href="/brands"
        className="group flex-shrink-0 w-80 h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
    >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                    Discover More
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Explore our complete collection of premium wallpaper brands
                </p>
            </div>

            <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-full text-black font-medium text-sm group-hover:bg-opacity-20 transition-all duration-300">
                View All Brands
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
        </div>
    </Link>
);

// Main Brands Component
const Brands: React.FC<BrandsProps> = ({
    brands = mockBrands,
    className = ""
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.75;

            scrollRef.current.scrollTo({
                left: direction === "left"
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons(); // Initial check

            return () => {
                scrollContainer.removeEventListener('scroll', updateScrollButtons);
            };
        }
    }, []);

    return (
        <section className={`w-full h-screen flex flex-col ${className}`}>
            {/* Header */}
            <div className="px-6 lg:px-12 py-8 lg:py-10">
                <div className="max-w-10xl mx-auto">
                    <Link
                        href="/brands"
                        className="group inline-flex items-center mb-0 hover:text-blue-600 transition-colors duration-300"
                    >
                        <h1 className="text-4xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                            BRANDS
                        </h1>
                        <ExternalLink className="w-4 h-4 lg:w-6 lg:h-6 ml-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                    </Link>
                    <p className="text-black text-lg lg:text-[18px] max-w-5xl">
                        DISCOVER DESIGNS FROM THE MOST PRESTIGIOUS DESIGN HOUSES
                    </p>
                </div>
            </div>

            {/* Scrollable Brands Section */}
            <div className="flex-1 relative px-6 lg:px-12">
                <div className="max-w-9xl mx-auto relative h-full">
                    {/* Left Scroll Button */}
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 top-1/3 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${canScrollLeft
                            ? 'bg-white/90 hover:bg-white border-gray-200 hover:shadow-xl'
                            : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                            }`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className={`w-6 h-6 mx-auto ${canScrollLeft ? 'text-gray-700' : 'text-gray-400'
                            }`} />
                    </button>

                    {/* Brands Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-5 px-16"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

                        {brands.map((brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}

                        <ExploreCard />
                    </div>

                    {/* Right Scroll Button */}
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`absolute right-0 top-1/3 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${canScrollRight
                            ? 'bg-white/90 hover:bg-white border-gray-200 hover:shadow-xl'
                            : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50'
                            }`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className={`w-6 h-6 mx-auto ${canScrollRight ? 'text-gray-700' : 'text-gray-400'
                            }`} />
                    </button>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="px-6 lg:px-12 pb-80">
                <div className="max-w-9xl mx-auto">
                    <div className="relative h-32 lg:h-32 rounded-2xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center justify-center px-6">
                            <div className="text-center">
                                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                                    The names you know. The quality you expect.
                                </h2>
                                <p className="text-gray-300 text-sm lg:text-base">
                                    Premium wallpapers from trusted brands worldwide
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;
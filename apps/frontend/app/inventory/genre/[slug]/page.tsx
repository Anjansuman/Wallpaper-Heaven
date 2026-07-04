"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import { GET_TAGS_URL, GET_PRODUCTS_BY_TAG_URL } from "@/routes/routes";

type Tag = { id: number; name: string; image?: string };
type Product = { id: number; name: string; images: string[]; tags?: { name: string }[]; brand?: { name: string } };

const PALETTE = ["#C5B4E3","#FFD9A6","#B3E5FC","#F3CBB7","#A8E6CF","#F8BBD0","#F6E2A1","#CFD8DC","#EBD5B3","#FADBD8","#D5E8D4","#DAE8FC","#FFF2CC","#F8CECC","#E0E0E0"];

const DEMO_PRODUCTS: Product[] = [
    { id: -1,  name: "Forest Fern",         images: ["https://picsum.photos/seed/gp1/400/600"] },
    { id: -2,  name: "Monstera Cascade",    images: ["https://picsum.photos/seed/gp2/400/600"] },
    { id: -3,  name: "Wild Meadow",         images: ["https://picsum.photos/seed/gp3/400/600"] },
    { id: -4,  name: "Palm Frond",          images: ["https://picsum.photos/seed/gp4/400/600"] },
    { id: -5,  name: "Moss & Bark",         images: ["https://picsum.photos/seed/gp5/400/600"] },
    { id: -6,  name: "Trailing Vine",       images: ["https://picsum.photos/seed/gp6/400/600"] },
    { id: -7,  name: "Orchid Study",        images: ["https://picsum.photos/seed/gp7/400/600"] },
    { id: -8,  name: "River Reed",          images: ["https://picsum.photos/seed/gp8/400/600"] },
    { id: -9,  name: "Bamboo Grove",        images: ["https://picsum.photos/seed/gp9/400/600"] },
    { id: -10, name: "Cherry Blossom",      images: ["https://picsum.photos/seed/gp10/400/600"] },
    { id: -11, name: "Wildflower Field",    images: ["https://picsum.photos/seed/gp11/400/600"] },
    { id: -12, name: "Autumn Maple",        images: ["https://picsum.photos/seed/gp12/400/600"] },
    { id: -13, name: "Sage & Stone",        images: ["https://picsum.photos/seed/gp13/400/600"] },
    { id: -14, name: "Lotus Pond",          images: ["https://picsum.photos/seed/gp14/400/600"] },
    { id: -15, name: "Eucalyptus Walk",     images: ["https://picsum.photos/seed/gp15/400/600"] },
];

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-neutral-100" />
                    <div className="mt-3 h-3.5 w-2/3 rounded-full bg-neutral-100" />
                </div>
            ))}
        </div>
    );
}

export default function GenreDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();
    const gridRef = useRef<HTMLDivElement>(null);

    const [tag, setTag] = useState<Tag | null>(null);
    const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [tagIndex, setTagIndex] = useState(0);

    const DEMO_GENRES: Tag[] = [
        { id: -1, name: "Botanical" }, { id: -2, name: "Abstract" }, { id: -3, name: "Geometric" },
        { id: -4, name: "Marble" }, { id: -5, name: "Tropical" }, { id: -6, name: "Minimalist" },
        { id: -7, name: "Floral" }, { id: -8, name: "Architecture" }, { id: -9, name: "Celestial" },
        { id: -10, name: "Vintage" }, { id: -11, name: "Noir" }, { id: -12, name: "Art Deco" },
        { id: -13, name: "Wabi-Sabi" }, { id: -14, name: "Jungle" }, { id: -15, name: "Coastal" },
        { id: -16, name: "Nordic" },
    ];

    useEffect(() => {
        if (!slug) return;
        const fallbackName = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

        axios.get(GET_TAGS_URL).then(async ({ data }) => {
            const tags: Tag[] = data.tags ?? [];
            const allTags = tags.length > 0 ? tags : DEMO_GENRES;

            const idx = allTags.findIndex(
                t => t.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
            );
            const match = idx >= 0 ? allTags[idx] : undefined;
            setTagIndex(Math.max(0, idx));

            // Always set a tag so the header renders
            setTag(match ?? { id: -99, name: fallbackName });

            if (match && match.id > 0) {
                const { data: pd } = await axios.get(`${GET_PRODUCTS_BY_TAG_URL}?tagId=${match.id}`);
                const result = pd.products ?? [];
                setProducts(result.length > 0 ? result : DEMO_PRODUCTS);
            }
            // negative id = demo genre, keep DEMO_PRODUCTS
        })
        .catch(() => setTag({ id: -99, name: fallbackName }))
        .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (loading || !gridRef.current) return;
        gsap.fromTo(
            gridRef.current.querySelectorAll(".product-card"),
            { opacity: 0, scale: 0.96, y: 20 },
            { opacity: 1, scale: 1, y: 0, stagger: 0.045, duration: 0.5, ease: "power3.out" }
        );
    }, [products, loading]);

    const genreName = tag?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const accentColor = PALETTE[tagIndex % PALETTE.length];

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FAFAF9" }}>
            <NavbarMain />

            <div className="pt-[72px]">
                {/* Hero header — colored, matches bento style */}
                <div className="relative overflow-hidden" style={{ backgroundColor: accentColor, minHeight: "340px" }}>
                    {tag?.image && (
                        <Image src={tag.image} alt={genreName} fill className="object-cover opacity-40" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
                        <button
                            onClick={() => router.push("/inventory/genre")}
                            className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black/80 transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Genres
                        </button>

                        <div className="w-3 h-3 rounded-full bg-white/50 mb-5" />

                        <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight leading-none text-white drop-shadow-lg">
                            {genreName}
                        </h1>
                        <p className="mt-4 text-white/70 text-lg">
                            {loading ? "Loading…" : `${products.length} wallpaper${products.length !== 1 ? "s" : ""} in this genre`}
                        </p>
                    </div>
                </div>

                {/* Products */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {loading ? (
                        <SkeletonGrid />
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="text-5xl mb-4">🎭</div>
                            <p className="text-xl font-semibold text-neutral-700">No products yet</p>
                            <p className="text-neutral-400 mt-2">Products tagged as {genreName} will appear here.</p>
                        </div>
                    ) : (
                        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="product-card group cursor-pointer"
                                    onClick={() => router.push(`/product/${product.id}`)}
                                >
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                                        <Image
                                            src={product.images[0] || "/col1.jpeg"}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <p className="text-white font-semibold text-sm line-clamp-1">{product.name}</p>
                                            {product.brand && (
                                                <p className="text-white/60 text-xs mt-0.5">{product.brand.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-2.5 text-sm font-medium text-neutral-800 line-clamp-1 px-0.5">{product.name}</p>
                                    {product.tags && product.tags.length > 0 && (
                                        <p className="text-xs text-neutral-400 mt-0.5 px-0.5 line-clamp-1">
                                            {product.tags.map(t => t.name).join(" · ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

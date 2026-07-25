"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowLeft, ChevronRight } from "lucide-react";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import { GET_PRODUCT_TYPES_URL, PRODUCTS_BY_TYPE_URL } from "@/routes/routes";

type Product = { id: number; name: string; images: string[]; tags?: { name: string }[] };
type ProductType = { id: number; name: string };

const DEMO_PRODUCTS: Product[] = [
    { id: -1,  name: "Nordic Minimal",     images: ["https://picsum.photos/seed/cp1/400/600"] },
    { id: -2,  name: "Tokyo Bloom",        images: ["https://picsum.photos/seed/cp2/400/600"] },
    { id: -3,  name: "Abstract Horizon",   images: ["https://picsum.photos/seed/cp3/400/600"] },
    { id: -4,  name: "Velvet Dusk",        images: ["https://picsum.photos/seed/cp4/400/600"] },
    { id: -5,  name: "Coastal Breeze",     images: ["https://picsum.photos/seed/cp5/400/600"] },
    { id: -6,  name: "Marble Luxe",        images: ["https://picsum.photos/seed/cp6/400/600"] },
    { id: -7,  name: "Sakura Dreams",      images: ["https://picsum.photos/seed/cp7/400/600"] },
    { id: -8,  name: "Urban Grid",         images: ["https://picsum.photos/seed/cp8/400/600"] },
    { id: -9,  name: "Golden Ratio",       images: ["https://picsum.photos/seed/cp9/400/600"] },
    { id: -10, name: "Midnight Foliage",   images: ["https://picsum.photos/seed/cp10/400/600"] },
    { id: -11, name: "Desert Nomad",       images: ["https://picsum.photos/seed/cp11/400/600"] },
    { id: -12, name: "Parisian Classic",   images: ["https://picsum.photos/seed/cp12/400/600"] },
    { id: -13, name: "Tropical Canopy",    images: ["https://picsum.photos/seed/cp13/400/600"] },
    { id: -14, name: "Silhouette Study",   images: ["https://picsum.photos/seed/cp14/400/600"] },
    { id: -15, name: "Travertine Blush",   images: ["https://picsum.photos/seed/cp15/400/600"] },
    { id: -16, name: "Ink & Stone",        images: ["https://picsum.photos/seed/cp16/400/600"] },
];

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-neutral-100" />
                    <div className="mt-3 h-3.5 w-2/3 rounded-full bg-neutral-100" />
                </div>
            ))}
        </div>
    );
}

export default function CollectionTypePage() {
    const { type: typeSlug } = useParams<{ type: string }>();
    const router = useRouter();
    const gridRef = useRef<HTMLDivElement>(null);

    const DEMO_TYPES: ProductType[] = [
        { id: -1, name: "Wallpapers" }, { id: -2, name: "Curtains" },
        { id: -3, name: "Blinds" }, { id: -4, name: "Rugs" }, { id: -5, name: "Cushions" },
    ];

    const [productType, setProductType] = useState<ProductType | null>(null);
    const [allTypes, setAllTypes] = useState<ProductType[]>(DEMO_TYPES);
    const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!typeSlug) return;
        const slugToName = typeSlug.replace(/-/g, " ");

        axios.get(GET_PRODUCT_TYPES_URL)
            .then(async ({ data }) => {
                const types: ProductType[] = data.productTypes ?? [];
                const typesWithFallback = types.length > 0 ? types : DEMO_TYPES;
                setAllTypes(typesWithFallback);

                const match = typesWithFallback.find(
                    t => t.name.toLowerCase().replace(/\s+/g, "-") === typeSlug.toLowerCase()
                ) ?? typesWithFallback.find(
                    t => t.name.toLowerCase() === slugToName.toLowerCase()
                );

                // Always set the type name — fall back to slug if no DB match
                setProductType(match ?? { id: -99, name: slugToName.replace(/\b\w/g, c => c.toUpperCase()) });

                if (!match || match.id < 0) {
                    // Demo type — just show demo products
                    setLoading(false);
                    return;
                }

                const { data: pd } = await axios.get(`${PRODUCTS_BY_TYPE_URL}?productTypeId=${match.id}`);
                const result = pd.products ?? [];
                setProducts(result.length > 0 ? result : DEMO_PRODUCTS);
            })
            .catch(() => {
                setProductType({ id: -99, name: slugToName.replace(/\b\w/g, c => c.toUpperCase()) });
            })
            .finally(() => setLoading(false));
    }, [typeSlug]);

    useEffect(() => {
        if (loading || !gridRef.current) return;
        gsap.fromTo(
            gridRef.current.querySelectorAll(".product-card"),
            { opacity: 0, y: 28, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.045, duration: 0.5, ease: "power3.out" }
        );
    }, [products, loading]);

    const typeName = productType?.name ?? typeSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="min-h-screen bg-white">
            <NavbarMain />

            <div className="pt-[72px]">
                {/* Hero header */}
                <div className="bg-neutral-950 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8 sm:pb-10">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
                            <button onClick={() => router.push("/inventory/collections")} className="hover:text-white/70 transition-colors flex items-center gap-1">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Collections
                            </button>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-white/70">{typeName}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-none">
                            {typeName}
                        </h1>
                        <p className="text-white/40 mt-3 text-base">
                            {loading ? "Loading…" : `${products.length} wallpaper${products.length !== 1 ? "s" : ""}`}
                        </p>

                        {/* Sibling type pills */}
                        {allTypes.length > 1 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {allTypes.map(t => {
                                    const slug = t.name.toLowerCase().replace(/\s+/g, "-");
                                    const active = slug === typeSlug;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => router.push(`/inventory/collections/${slug}`)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                                active ? "bg-white text-black" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                                            }`}
                                        >
                                            {t.name}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {loading ? (
                        <SkeletonGrid />
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center">
                            <div className="text-5xl mb-4">🎨</div>
                            <p className="text-xl font-semibold text-neutral-700">Nothing here yet</p>
                            <p className="text-neutral-400 mt-2">Products in this collection will appear here.</p>
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
                                            <p className="text-white font-semibold text-sm leading-snug">{product.name}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2.5 text-sm font-medium text-neutral-800 line-clamp-1 px-0.5">{product.name}</p>
                                    {product.tags && product.tags.length > 0 && (
                                        <p className="text-xs text-neutral-400 mt-0.5 px-0.5">{product.tags.map(t => t.name).join(" · ")}</p>
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

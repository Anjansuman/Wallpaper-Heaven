"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import { GET_BRANDS_URL, GET_PRODUCTS_BY_BRAND_URL } from "@/routes/routes";

type Brand = { id: number; name: string; about: string; description?: string; image?: string; rank?: number | null };
type Product = { id: number; name: string; images: string[]; tags?: { name: string }[]; ProductType?: { name: string } };

const DEMO_BRANDS: Brand[] = [
    { id: -1,  name: "Arte Milano",      about: "Italian luxury wallcoverings since 1956",     image: "https://picsum.photos/seed/br1/900/600",  rank: 1 },
    { id: -2,  name: "Élitis Paris",     about: "Avant-garde textures from the French atelier", image: "https://picsum.photos/seed/br2/900/600",  rank: 2 },
    { id: -3,  name: "Nobilis",          about: "Timeless patterns for modern interiors",       image: "https://picsum.photos/seed/br3/900/600",  rank: 3 },
    { id: -4,  name: "De Gournay",       about: "Hand-painted silk wallcoverings",              image: "https://picsum.photos/seed/br4/900/600",  rank: 4 },
    { id: -5,  name: "Osborne & Little", about: "British heritage prints & weaves",             image: "https://picsum.photos/seed/br5/900/600",  rank: 5 },
    { id: -6,  name: "Designers Guild",  about: "Bold colour and contemporary pattern",         image: "https://picsum.photos/seed/br6/900/600",  rank: 6 },
    { id: -7,  name: "Farrow & Ball",    about: "Richly pigmented paints and papers",           image: "https://picsum.photos/seed/br7/900/600" },
    { id: -8,  name: "Borastapeter",     about: "Swedish craftsmanship, Nordic sensibility",    image: "https://picsum.photos/seed/br8/900/600" },
    { id: -9,  name: "Harlequin",        about: "Joyful and playful contemporary designs",     image: "https://picsum.photos/seed/br9/900/600" },
    { id: -10, name: "Rasch",            about: "Affordable elegance, made in Germany",         image: "https://picsum.photos/seed/br10/900/600" },
    { id: -11, name: "Graham & Brown",   about: "Innovative prints for every room",             image: "https://picsum.photos/seed/br11/900/600" },
    { id: -12, name: "Cole & Son",       about: "Archival English wallpaper since 1873",        image: "https://picsum.photos/seed/br12/900/600" },
    { id: -13, name: "Sandberg",         about: "Scandinavian patterns with soul",              image: "https://picsum.photos/seed/br13/900/600" },
    { id: -14, name: "Muralunique",      about: "Bespoke photographic murals",                  image: "https://picsum.photos/seed/br14/900/600" },
    { id: -15, name: "Zinc Textile",     about: "Natural fibres and organic textures",          image: "https://picsum.photos/seed/br15/900/600" },
];

const DEMO_PRODUCTS: Product[] = [
    { id: -1,  name: "Silk Damask Panel",    images: ["https://picsum.photos/seed/bp1/400/600"] },
    { id: -2,  name: "Grand Floral Roll",    images: ["https://picsum.photos/seed/bp2/400/600"] },
    { id: -3,  name: "Venetian Trellis",     images: ["https://picsum.photos/seed/bp3/400/600"] },
    { id: -4,  name: "Bespoke Stripe",       images: ["https://picsum.photos/seed/bp4/400/600"] },
    { id: -5,  name: "Heritage Toile",       images: ["https://picsum.photos/seed/bp5/400/600"] },
    { id: -6,  name: "Marble Inlay",         images: ["https://picsum.photos/seed/bp6/400/600"] },
    { id: -7,  name: "Linen Weave No.3",     images: ["https://picsum.photos/seed/bp7/400/600"] },
    { id: -8,  name: "Art Nouveau Sprig",    images: ["https://picsum.photos/seed/bp8/400/600"] },
    { id: -9,  name: "Parquet Texture",      images: ["https://picsum.photos/seed/bp9/400/600"] },
    { id: -10, name: "Ombre Cloud",          images: ["https://picsum.photos/seed/bp10/400/600"] },
    { id: -11, name: "Botanical Fresco",     images: ["https://picsum.photos/seed/bp11/400/600"] },
    { id: -12, name: "Lacquer Panel",        images: ["https://picsum.photos/seed/bp12/400/600"] },
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

export default function BrandDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const [brand, setBrand] = useState<Brand | null>(null);
    const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fallbackName = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

        // Resolve slug → brand via GET /get-brands
        axios.get(GET_BRANDS_URL).then(async ({ data }) => {
            const brands: Brand[] = data.brands ?? [];

            // Try to find in DB brands first, then demo brands
            const allBrands = brands.length > 0 ? brands : DEMO_BRANDS;
            const match = allBrands.find(
                b => b.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
            );

            if (match) {
                setBrand(match);
                // Only fetch real products if it's a real DB brand (positive id)
                if (match.id > 0) {
                    const { data: pd } = await axios.get(`${GET_PRODUCTS_BY_BRAND_URL}?brandId=${match.id}`);
                    const result = pd.products ?? [];
                    setProducts(result.length > 0 ? result : DEMO_PRODUCTS);
                }
                // Negative id = demo brand, keep DEMO_PRODUCTS
            } else {
                // Completely unknown slug — synthesise a brand from the slug name
                setBrand({ id: -99, name: fallbackName, about: "Luxury wallcoverings" });
            }
        })
        .catch(() => {
            setBrand({ id: -99, name: fallbackName, about: "Luxury wallcoverings" });
        })
        .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.fromTo(
            headerRef.current.querySelectorAll(".fade-up"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }
        );
    }, [brand]);

    useEffect(() => {
        if (loading || !gridRef.current) return;
        gsap.fromTo(
            gridRef.current.querySelectorAll(".product-card"),
            { opacity: 0, y: 28, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: "power3.out" }
        );
    }, [products, loading]);

    const brandName = brand?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    return (
        <div className="min-h-screen bg-white">
            <NavbarMain />

            <div className="pt-[72px]">
                {/* Hero */}
                <div className="relative h-[60vh] min-h-[400px] overflow-hidden bg-neutral-900">
                    {brand?.image ? (
                        <Image src={brand.image} alt={brandName} fill className="object-cover opacity-60" unoptimized />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div ref={headerRef} className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <button
                            onClick={() => router.push("/inventory/brands")}
                            className="fade-up self-start flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Brands
                        </button>

                        {brand?.rank != null && brand.rank <= 6 && (
                            <div className="fade-up inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                                Ranked #{brand.rank} Brand
                            </div>
                        )}

                        <h1 className="fade-up text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-none">
                            {brandName}
                        </h1>

                        {brand?.about && (
                            <p className="fade-up text-white/60 mt-3 text-base sm:text-lg max-w-xl leading-relaxed">
                                {brand.about}
                            </p>
                        )}

                        <div className="fade-up flex items-center gap-4 mt-6">
                            <span className="text-white/40 text-sm">
                                {loading ? "Loading…" : `${products.length} product${products.length !== 1 ? "s" : ""}`}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-white/30" />
                            <span className="text-white/40 text-sm">
                                {brand?.description ?? "Luxury wallcoverings"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-2xl font-semibold">Collection</h2>
                        <p className="text-sm text-neutral-400">{products.length} items</p>
                    </div>

                    {loading ? (
                        <SkeletonGrid />
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="text-5xl mb-4">🏷️</div>
                            <p className="text-xl font-semibold text-neutral-700">No products yet</p>
                            <p className="text-neutral-400 mt-2">This brand&apos;s products will appear here.</p>
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
                                        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowUpRight className="w-4 h-4 text-black" />
                                        </div>
                                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <p className="text-white text-sm font-semibold line-clamp-1">{product.name}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2.5 text-sm font-medium text-neutral-800 line-clamp-1 px-0.5">{product.name}</p>
                                    {product.ProductType && (
                                        <p className="text-xs text-neutral-400 mt-0.5 px-0.5">{product.ProductType.name}</p>
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

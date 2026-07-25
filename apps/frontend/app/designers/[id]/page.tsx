"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import { GET_PRODUCTS_BY_CREATOR_URL } from "@/routes/routes";

type Designer = { id: number; name: string; about: string; description?: string; image?: string };
type Product = { id: number; name: string; images: string[]; ProductType?: { name: string }; brand?: { name: string } };

const DEMO_DESIGNERS: Designer[] = [
    { id: -1,  name: "Priya Mehta",       about: "Interior Stylist",            description: "Crafting immersive spaces that blend aesthetics with functionality.", image: "https://picsum.photos/seed/ds1/400/600" },
    { id: -2,  name: "Arjun Sharma",      about: "Wallpaper Illustrator",       description: "Hand-painting motifs inspired by Mughal architecture and geometry.",   image: "https://picsum.photos/seed/ds2/400/600" },
    { id: -3,  name: "Léa Fontaine",      about: "French Pattern Designer",     description: "Trained at the École Camondo; known for graphic botanical prints.",    image: "https://picsum.photos/seed/ds3/400/600" },
    { id: -4,  name: "Kenji Mori",        about: "Japanese Textile Artist",     description: "Fusing wabi-sabi philosophy with contemporary repeat patterns.",       image: "https://picsum.photos/seed/ds4/400/600" },
    { id: -5,  name: "Simran Kaur",       about: "Colour & Mood Specialist",    description: "10 years creating palettes that transform how rooms feel.",            image: "https://picsum.photos/seed/ds5/400/600" },
    { id: -6,  name: "Marcus Webb",       about: "3D Visualisation Artist",     description: "Bringing photorealistic wallpaper concepts to life before print.",     image: "https://picsum.photos/seed/ds6/400/600" },
    { id: -7,  name: "Amara Diallo",      about: "Surface & Texture Designer",  description: "West African weaving traditions translated into modern wallcoverings.", image: "https://picsum.photos/seed/ds7/400/600" },
    { id: -8,  name: "Sofia Reyes",       about: "Architect & Wall Artist",     description: "Architecture background shapes her love of grid and negative space.",   image: "https://picsum.photos/seed/ds8/400/600" },
    { id: -9,  name: "David Chen",        about: "Digital Muralist",            description: "Large-format digital murals for hospitality and residential spaces.",   image: "https://picsum.photos/seed/ds9/400/600" },
    { id: -10, name: "Nadia Petrov",      about: "Illustrative Print Maker",    description: "Ink drawings digitised into seamless repeat patterns.",                image: "https://picsum.photos/seed/ds10/400/600" },
    { id: -11, name: "Oliver Grant",      about: "Minimalist Art Director",     description: "Less is more — every line earns its place on the wall.",               image: "https://picsum.photos/seed/ds11/400/600" },
    { id: -12, name: "Yuki Tanaka",       about: "Nature & Watercolour Artist", description: "Loose watercolour botanicals with Japanese restraint.",                image: "https://picsum.photos/seed/ds12/400/600" },
    { id: -13, name: "Fatima Al-Rashid",  about: "Geometric Pattern Expert",    description: "Islamic geometric art reinterpreted for contemporary living spaces.",   image: "https://picsum.photos/seed/ds13/400/600" },
    { id: -14, name: "Ravi Nair",         about: "Heritage & Archive Reviver",  description: "Restoring 19th-century Indian textile patterns for modern walls.",     image: "https://picsum.photos/seed/ds14/400/600" },
    { id: -15, name: "Elena Rossi",       about: "Luxury Lifestyle Designer",   description: "Her collections are worn by the walls of five-star hotels in Milan.",  image: "https://picsum.photos/seed/ds15/400/600" },
    { id: -16, name: "Tom Ashford",       about: "Graphic & Pop Art Creator",   description: "Punchy, colour-saturated prints that make a statement.",               image: "https://picsum.photos/seed/ds16/400/600" },
];

const DEMO_PRODUCTS: Product[] = [
    { id: -1,  name: "Morning Mist",        images: ["https://picsum.photos/seed/dp1/400/600"] },
    { id: -2,  name: "Terracotta Study",    images: ["https://picsum.photos/seed/dp2/400/600"] },
    { id: -3,  name: "Indigo Waves",        images: ["https://picsum.photos/seed/dp3/400/600"] },
    { id: -4,  name: "Rust & Cream",        images: ["https://picsum.photos/seed/dp4/400/600"] },
    { id: -5,  name: "Sage Linen",          images: ["https://picsum.photos/seed/dp5/400/600"] },
    { id: -6,  name: "Ochre Geometry",      images: ["https://picsum.photos/seed/dp6/400/600"] },
    { id: -7,  name: "Dusk Palette",        images: ["https://picsum.photos/seed/dp7/400/600"] },
    { id: -8,  name: "Woven Texture",       images: ["https://picsum.photos/seed/dp8/400/600"] },
];

function Initials({ name }: { name: string }) {
    const letters = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300">
            <span className="font-bold text-neutral-500 text-7xl">{letters}</span>
        </div>
    );
}

function SkeletonGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-neutral-100" />
                    <div className="mt-3 h-3.5 w-2/3 rounded-full bg-neutral-100" />
                </div>
            ))}
        </div>
    );
}

export default function DesignerDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const photoRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const [designer, setDesigner] = useState<Designer | null>(null);
    const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const numId = parseInt(id, 10);

        if (numId < 0) {
            const demo = DEMO_DESIGNERS.find(d => d.id === numId);
            if (demo) setDesigner(demo);
            setLoading(false);
            return;
        }

        axios.get(`${GET_PRODUCTS_BY_CREATOR_URL}?creatorId=${id}`)
            .then(({ data }) => {
                setDesigner(data.creator);
                const result = data.products ?? [];
                setProducts(result.length > 0 ? result : DEMO_PRODUCTS);
            })
            .catch(() => setProducts(DEMO_PRODUCTS))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!headerRef.current) return;
        gsap.fromTo(
            headerRef.current.querySelectorAll(".fade-up"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }
        );
    }, [designer]);

    useEffect(() => {
        if (loading || !gridRef.current) return;
        gsap.fromTo(
            gridRef.current.querySelectorAll(".product-card"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power3.out" }
        );
    }, [products, loading]);

    // 3D tilt on photo
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = photoRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        el.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg) scale(1.02)`;
        el.style.transition = "transform 0.1s ease";
    }, []);
    const handleMouseLeave = useCallback(() => {
        if (!photoRef.current) return;
        photoRef.current.style.transform = "";
        photoRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#FAF9F7" }}>
            <NavbarMain />

            <div className="pt-[72px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Back */}
                    <button
                        onClick={() => router.push("/designers")}
                        className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        All Designers
                    </button>

                    {/* Profile block */}
                    <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                        {/* Photo */}
                        <div
                            ref={photoRef}
                            className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl cursor-default"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {designer?.image ? (
                                <Image src={designer.image} alt={designer?.name ?? "Designer"} fill className="object-cover" unoptimized />
                            ) : (
                                <Initials name={designer?.name ?? "?"} />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center gap-6 lg:pt-8">
                            <div className="fade-up inline-flex items-center gap-2 bg-neutral-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest self-start">
                                Designer
                            </div>
                            <h1 className="fade-up text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
                                {designer?.name ?? "Loading…"}
                            </h1>
                            {designer?.about && (
                                <p className="fade-up text-lg text-neutral-500 font-light">{designer.about}</p>
                            )}
                            {designer?.description && (
                                <p className="fade-up text-neutral-600 leading-relaxed max-w-lg">{designer.description}</p>
                            )}
                            <div className="fade-up w-16 h-0.5 bg-neutral-900 rounded-full" />
                            <p className="fade-up text-sm text-neutral-400">
                                {loading ? "Loading products…" : `${products.length} product${products.length !== 1 ? "s" : ""} in this collection`}
                            </p>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-8">
                            {designer ? `Works by ${designer.name.split(" ")[0]}` : "Works"}
                        </h2>

                        {loading ? (
                            <SkeletonGrid />
                        ) : products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="text-5xl mb-4">✏️</div>
                                <p className="text-xl font-semibold text-neutral-700">No products yet</p>
                                <p className="text-neutral-400 mt-2">This designer&apos;s works will appear here.</p>
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
        </div>
    );
}

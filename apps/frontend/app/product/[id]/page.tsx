"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import UserPageNavbar from "@/Components/Nav-Bar/UserPageNavbar";
import axios from "axios";
import { toast } from "sonner";
import { PRODUCT_DETAILS_URL, SUBMIT_QUERY_URL } from "@/routes/routes";
import { useParams } from "next/navigation";
import { Send, ChevronRight } from "lucide-react";

interface Tag { id: number; name: string }
interface ProductType { id: number; name: string }
interface Brand { id: number; name: string }
interface Creator { id: number; name: string; image?: string }

interface Product {
    id: number;
    name: string;
    description: string;
    images: string[];
    addedAt: string;
    tags: Tag[];
    ProductType: ProductType;
    brand?: Brand;
    creator?: Creator;
}

const DEMO_PRODUCTS: Product[] = [
    { id: -1,  name: "Nordic Minimal",    description: "Clean Scandinavian lines with a restrained palette. Perfect for modern bedrooms.", images: ["https://picsum.photos/seed/cp1/800/1000","https://picsum.photos/seed/cp1b/800/1000","https://picsum.photos/seed/cp1c/800/1000"], addedAt: "2025-01-10", tags: [{ id: -1, name: "Minimalist" }, { id: -2, name: "Nordic" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -2,  name: "Tokyo Bloom",       description: "Cherry blossom motifs layered over a muted stone background.", images: ["https://picsum.photos/seed/cp2/800/1000","https://picsum.photos/seed/cp2b/800/1000"], addedAt: "2025-02-14", tags: [{ id: -3, name: "Floral" }, { id: -4, name: "Japanese" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -3,  name: "Abstract Horizon",  description: "Fluid brushwork in terracotta and slate — a statement wall made easy.", images: ["https://picsum.photos/seed/cp3/800/1000","https://picsum.photos/seed/cp3b/800/1000"], addedAt: "2025-03-01", tags: [{ id: -5, name: "Abstract" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -4,  name: "Velvet Dusk",       description: "Deep jewel tones reminiscent of a twilight sky over the Adriatic.", images: ["https://picsum.photos/seed/cp4/800/1000"], addedAt: "2025-03-20", tags: [{ id: -6, name: "Moody" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -5,  name: "Coastal Breeze",    description: "Soft watercolour washes of cerulean and seafoam, evoking open horizons.", images: ["https://picsum.photos/seed/cp5/800/1000","https://picsum.photos/seed/cp5b/800/1000"], addedAt: "2025-04-05", tags: [{ id: -7, name: "Coastal" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -6,  name: "Marble Luxe",       description: "Precision-printed Carrara marble veining for a high-end look without the price.", images: ["https://picsum.photos/seed/cp6/800/1000"], addedAt: "2025-04-18", tags: [{ id: -8, name: "Marble" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -7,  name: "Sakura Dreams",     description: "Soft pink petals scatter across a creamy ground — timeless and romantic.", images: ["https://picsum.photos/seed/cp7/800/1000","https://picsum.photos/seed/cp7b/800/1000"], addedAt: "2025-05-02", tags: [{ id: -3, name: "Floral" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -8,  name: "Urban Grid",        description: "Architectural grid in charcoal and white — a nod to the city skyline.", images: ["https://picsum.photos/seed/cp8/800/1000"], addedAt: "2025-05-15", tags: [{ id: -9, name: "Geometric" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -9,  name: "Golden Ratio",      description: "Sacred geometry rendered in burnished gold on a deep navy ground.", images: ["https://picsum.photos/seed/cp9/800/1000","https://picsum.photos/seed/cp9b/800/1000"], addedAt: "2025-06-01", tags: [{ id: -9, name: "Geometric" }, { id: -10, name: "Art Deco" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -10, name: "Midnight Foliage",  description: "Oversized botanical leaves in ink-black with copper highlights.", images: ["https://picsum.photos/seed/cp10/800/1000"], addedAt: "2025-06-20", tags: [{ id: -11, name: "Botanical" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -11, name: "Desert Nomad",      description: "Sand-swept dunes and warm ochres — brings the desert indoors.", images: ["https://picsum.photos/seed/cp11/800/1000","https://picsum.photos/seed/cp11b/800/1000"], addedAt: "2025-07-08", tags: [{ id: -12, name: "Earthy" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -12, name: "Parisian Classic",  description: "Haussmann-era toile de Jouy redrawn for the 21st century.", images: ["https://picsum.photos/seed/cp12/800/1000"], addedAt: "2025-07-22", tags: [{ id: -13, name: "Vintage" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -13, name: "Tropical Canopy",   description: "Lush jungle leaves in vivid emerald — for those who want their walls to breathe.", images: ["https://picsum.photos/seed/cp13/800/1000","https://picsum.photos/seed/cp13b/800/1000"], addedAt: "2025-08-05", tags: [{ id: -14, name: "Tropical" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -14, name: "Silhouette Study",  description: "Delicate bird silhouettes on a warm linen ground, understated and elegant.", images: ["https://picsum.photos/seed/cp14/800/1000"], addedAt: "2025-08-19", tags: [{ id: -11, name: "Botanical" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -15, name: "Travertine Blush",  description: "Natural stone texture in warm blush tones — tactile warmth for any room.", images: ["https://picsum.photos/seed/cp15/800/1000","https://picsum.photos/seed/cp15b/800/1000"], addedAt: "2025-09-01", tags: [{ id: -8, name: "Marble" }], ProductType: { id: -1, name: "Wallpapers" } },
    { id: -16, name: "Ink & Stone",       description: "East Asian ink wash painting translated into a seamless repeat.", images: ["https://picsum.photos/seed/cp16/800/1000"], addedAt: "2025-09-15", tags: [{ id: -5, name: "Abstract" }], ProductType: { id: -1, name: "Wallpapers" } },
];

export default function ProductPage() {
    const params = useParams();
    const productId = params?.id;

    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<{ id: number; name: string; images: string[] }[]>([]);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const zoomRef = useRef<HTMLDivElement>(null);

    // Enquiry form
    const [enquiryName, setEnquiryName] = useState("");
    const [enquiryEmail, setEnquiryEmail] = useState("");
    const [enquiryPhone, setEnquiryPhone] = useState("");
    const [enquiryMessage, setEnquiryMessage] = useState("");
    const [enquirySending, setEnquirySending] = useState(false);
    const [enquirySent, setEnquirySent] = useState(false);

    useEffect(() => {
        if (!productId) return;
        const numId = parseInt(String(productId), 10);

        if (numId < 0) {
            const demo = DEMO_PRODUCTS.find(p => p.id === numId) ?? DEMO_PRODUCTS[0];
            setProduct(demo);
            setSelectedImage(demo.images[0] ?? "");
            setSimilarProducts(DEMO_PRODUCTS.filter(p => p.id !== numId).slice(0, 4));
            setEnquiryMessage(`Hi, I'm interested in "${demo.name}". Could you provide more details?`);
            setLoading(false);
            return;
        }

        axios
            .get(`${PRODUCT_DETAILS_URL}?productId=${productId}`)
            .then((res) => {
                const p: Product = res.data.product;
                setProduct(p);
                setSelectedImage(p.images[0] ?? "");
                setSimilarProducts(res.data.similarProducts ?? []);
                setEnquiryMessage(`Hi, I'm interested in "${p.name}". Could you provide more details?`);
            })
            .catch(() => console.error("Failed to fetch product"))
            .finally(() => setLoading(false));
    }, [productId]);

    const handleEnquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!enquiryName.trim() || !enquiryEmail.trim() || !enquiryMessage.trim()) {
            toast.error("Please fill in name, email, and message.");
            return;
        }
        setEnquirySending(true);
        try {
            await axios.post(SUBMIT_QUERY_URL, {
                name: enquiryName.trim(),
                email: enquiryEmail.trim(),
                phone: enquiryPhone.trim() || undefined,
                message: enquiryMessage.trim(),
            });
            setEnquirySent(true);
            toast.success("Your enquiry has been sent!");
        } catch {
            toast.error("Failed to send enquiry. Please try again.");
        } finally {
            setEnquirySending(false);
        }
    };

    const handleSmallBlockHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomRef.current) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
    };

    const resetZoom = () => {
        if (zoomRef.current) {
            zoomRef.current.style.backgroundSize = "contain";
            zoomRef.current.style.backgroundPosition = "center";
        }
    };

    const activateZoom = () => {
        if (zoomRef.current) {
            zoomRef.current.style.backgroundImage = `url(${selectedImage})`;
            zoomRef.current.style.backgroundSize = "200%";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F7] text-black">
            <UserPageNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[88px] pb-20">

                {/* Product section */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-10">

                    {/* Thumbnails — horizontal on mobile, vertical on desktop */}
                    <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
                        {product.images.map((src, idx) => {
                            const isActive = src === selectedImage;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(src)}
                                    onMouseMove={isActive ? handleSmallBlockHover : undefined}
                                    onMouseEnter={isActive ? activateZoom : undefined}
                                    onMouseLeave={isActive ? resetZoom : undefined}
                                    className={`relative flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-full rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${isActive ? "border-neutral-900 scale-[1.02]" : "border-transparent hover:border-neutral-300"}`}
                                >
                                    <Image src={src} alt={product.name} fill className="object-cover" unoptimized />
                                </div>
                            );
                        })}
                    </div>

                    {/* Main image + info */}
                    <div className="flex flex-col gap-6">
                        {/* Main image */}
                        <div
                            ref={zoomRef}
                            className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 bg-center bg-no-repeat bg-contain border border-neutral-200"
                            style={{ backgroundImage: `url(${selectedImage})` }}
                        >
                            <Image src={selectedImage} alt={product.name} fill className="opacity-0" priority unoptimized />
                        </div>

                        {/* Info */}
                        <div>
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{product.name}</h1>
                                    {product.ProductType && (
                                        <span className="inline-block mt-2 text-xs text-neutral-500 bg-neutral-100 rounded-full px-3 py-1">
                                            {product.ProductType.name}
                                        </span>
                                    )}
                                </div>
                                {/* Enquire CTA — top-right on desktop */}
                                <a
                                    href="#enquire"
                                    className="hidden sm:inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-neutral-700 transition-colors flex-shrink-0"
                                >
                                    Enquire about this
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            <p className="text-neutral-600 mt-4 leading-relaxed text-sm sm:text-base">{product.description}</p>

                            {product.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {product.tags.map((tag) => (
                                        <span key={tag.id} className="text-xs bg-[#6DA165]/15 text-[#3D5A40] rounded-full px-3 py-1 font-medium">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500">
                                {product.brand && <span>Brand: <span className="font-medium text-neutral-800">{product.brand.name}</span></span>}
                                {product.creator && <span>Designer: <span className="font-medium text-neutral-800">{product.creator.name}</span></span>}
                            </div>

                            {/* Mobile enquire button */}
                            <a
                                href="#enquire"
                                className="sm:hidden mt-5 flex items-center justify-center gap-2 bg-neutral-900 text-white text-sm font-medium w-full py-3 rounded-full hover:bg-neutral-700 transition-colors"
                            >
                                Enquire about this
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">You may also like</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {similarProducts.map((sp) => (
                                <a key={sp.id} href={`/product/${sp.id}`} className="flex flex-col gap-2 group">
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200">
                                        {sp.images[0] && (
                                            <Image src={sp.images[0]} alt={sp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                                        )}
                                    </div>
                                    <p className="text-sm text-center text-neutral-700 font-medium">{sp.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Enquiry section */}
                <div id="enquire" className="mt-20 scroll-mt-24">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Get in touch</p>
                            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Interested in this piece?</h2>
                            <p className="text-neutral-500 mt-2 text-sm leading-relaxed">
                                We&apos;re happy to answer any questions — availability, sizing, customisation, or anything else.
                            </p>
                        </div>

                        {enquirySent ? (
                            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
                                <div className="w-14 h-14 rounded-full bg-[#6DA165]/10 flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-6 h-6 text-[#3D5A40]" />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-800">Enquiry sent!</h3>
                                <p className="text-neutral-500 mt-2 text-sm">We&apos;ll get back to you as soon as possible.</p>
                                <button
                                    onClick={() => { setEnquirySent(false); setEnquiryName(""); setEnquiryEmail(""); setEnquiryPhone(""); }}
                                    className="mt-5 text-sm text-neutral-400 hover:text-neutral-700 underline underline-offset-2 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleEnquiry} className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Name *</label>
                                        <input
                                            value={enquiryName}
                                            onChange={e => setEnquiryName(e.target.value)}
                                            placeholder="Your name"
                                            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-neutral-50 transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Email *</label>
                                        <input
                                            type="email"
                                            value={enquiryEmail}
                                            onChange={e => setEnquiryEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-neutral-50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Phone <span className="normal-case font-normal">(optional)</span></label>
                                    <input
                                        value={enquiryPhone}
                                        onChange={e => setEnquiryPhone(e.target.value)}
                                        placeholder="+91 ..."
                                        className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-neutral-50 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Message *</label>
                                    <textarea
                                        rows={4}
                                        value={enquiryMessage}
                                        onChange={e => setEnquiryMessage(e.target.value)}
                                        className="border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 bg-neutral-50 transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={enquirySending}
                                    className="flex items-center justify-center gap-2 bg-neutral-900 text-white rounded-full py-3 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {enquirySending ? "Sending…" : <>Send Enquiry <Send className="w-4 h-4" /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

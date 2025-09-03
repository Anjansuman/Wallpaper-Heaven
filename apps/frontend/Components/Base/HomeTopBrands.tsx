import { ChevronRight } from "lucide-react";

interface BrandCardProps {
    name: string;
    image: string;
}

function BrandCard({ name, image }: BrandCardProps) {
    return (
        <div
            className="relative w-full h-full rounded-xl overflow-hidden shadow-lg shadow-neutral-300 hover:-translate-y-0.5 transition-all transform duration-200"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute bottom-0 bg-black/5 h-full w-full"/>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white z-40 ">
                <span className="text-xl font-semibold drop-shadow-2xl">{name}</span>
                <button className="bg-black/70 p-2 rounded-full flex items-center shadow-sm justify-center hover:bg-black/80 hover:scale-105 transition transform duration-200">
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="absolute inset-0 bg-black/20"></div>
        </div>
    );
}

export default function HomeTopBrand() {
    const brands = [
        "/images/curtains.png",
        "/images/home.png",
        "/images/decor-items.png",
        "/images/curtains.png",
        "/images/home.png",
        "/images/decor-items.png",
    ];

    const brandNames = [
        "Brand 1",
        "Brand 2",
        "Brand 3",
        "Brand 4",
        "Brand 5",
        "Brand 6",
    ];

    return (
        <div className="flex flex-col h-[1000px] w-full max-w-7xl mt-30 mx-auto gap-y-8">
            
            <div className="flex justify-between">
                <div className="text-6xl flex flex-col gap-y-3">
                    <span>Explore our top</span>
                    <span>brands</span>
                </div>

                <div className="flex flex-col max-w-xl justify-around">
                    <div className="flex w-full justify-end">
                        <button className="bg-black text-white flex px-4 py-2 items-center justify-center rounded-full group gap-x-2">
                            View all brands
                            <ChevronRight className="h-full flex justify-center items-center group-hover:translate-x-0.5 size-5 transition-transform duration-150" />
                        </button>
                    </div>
                    <div className="flex justify-end items-end text-end max-w-sm mt-2">
                        Shop from a handpicked collection of trusted brands designed to bring you quality and style
                    </div>
                </div>
            </div>

            <div className="w-full h-full flex gap-x-4">
                <div className="w-full h-full flex flex-col gap-y-4">
                    <div className="h-[40%]">
                        <BrandCard name={brandNames[0]} image={brands[0]} />
                    </div>
                    <div className="h-[60%]">
                        <BrandCard name={brandNames[1]} image={brands[1]} />
                    </div>
                </div>

                
                <div className="w-full h-full flex flex-col gap-y-4">
                    <div className="h-[60%]">
                        <BrandCard name={brandNames[2]} image={brands[2]} />
                    </div>
                    <div className="h-[40%]">
                        <BrandCard name={brandNames[3]} image={brands[3]} />
                    </div>
                </div>

            
                <div className="w-full h-full flex flex-col gap-y-4">
                    <div className="h-[40%]">
                        <BrandCard name={brandNames[4]} image={brands[4]} />
                    </div>
                    <div className="h-[60%]">
                        <BrandCard name={brandNames[5]} image={brands[5]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";

interface ObjectProps {
    id: number;
    title: string;
    imageUrl: string;
}

export default function ProductObject({ id, title, imageUrl }: ObjectProps) {
    return (
        <Link href={`/product/${id}`} className="flex flex-col gap-y-2 group">
            <div className="relative h-36 sm:h-44 md:h-48 lg:h-56 w-full rounded-lg overflow-hidden border border-gray-200">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        No image
                    </div>
                )}
            </div>
            <div className="px-1 text-xs sm:text-sm md:text-[16px] text-center text-gray-700 group-hover:text-black transition-colors">
                {title}
            </div>
        </Link>
    );
}

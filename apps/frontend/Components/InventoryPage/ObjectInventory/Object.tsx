import Image from "next/image";
import image from "../../../public/tree.jpeg";

interface ObjectProps {
    title: String
}

export default function Object({ title }: ObjectProps) {
    return <div className="flex flex-col gap-y-2 ">
        <Image src={image} alt="image" className="rounded-lg object-cover " />
        <div className="px-1 text-xs md:text-[16px] lg:text text-center ">
            Pakhi Chinoiserie Design Customised Wallpaper for Rooms
        </div>
    </div>
}
import Image from "next/image";
import image from "../../../public/tree.jpeg";

export default function Object() {
    return <div className="flex flex-col gap-y-2 ">
        <Image src={image} alt="image" className="rounded-lg object-cover " />
        <div className="px-1 text-lg ">
            Pakhi Chinoiserie Design Customised Wallpaper for Rooms
        </div>
    </div>
}
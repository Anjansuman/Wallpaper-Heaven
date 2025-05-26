import Image from "next/image";
import image from "../../../public/tree.jpeg";

export default function ObjectInventory() {
    return <div className="grid grid-cols-3 gap-26mm ">
        {["Image", "video", "phone"].map((e) => (
            <div className="">
                <Image src={image} alt="image" />
            </div>
        ))}
    </div>
}
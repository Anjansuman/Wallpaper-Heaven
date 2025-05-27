import Image from "next/image";
import image from "../../../public/tree.jpeg";

export default function Object() {
    return <div className="">
        <Image src={image} alt="image" className="rounded-lg object-cover " />
    </div>
}
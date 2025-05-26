import Image from "next/image";

import topImage from "../../../public/tree.jpeg";

export default function Top() {
    return <div className="lg:flex pt-30 items-center justify-center gap-x-10 ">
        <div className="w-[50%] ">
            <div className="text-4xl font-semibold ">
                Trendy Living Room, Drawing Room and Hall Wallpapers
            </div>
            <p className="text-[#b1a69b] ">
                A place which reflects your whole house is living room. Make your living room space more welcoming for your guest and reflect warmth with our life n colors wallpapers collection. It can create a warm, elegant, or welcoming atmosphere. Find the perfect wallpaper in our collection.
            </p>
        </div>
        <div className="w-[50%]" >
            <Image src={topImage} alt="inventory" className="h-full w-full rounded-xl " />
        </div>
    </div>
}
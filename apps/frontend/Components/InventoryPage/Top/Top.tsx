import Image from "next/image";

import topImage from "../../../public/tree.jpeg";

export default function Top() {
    return <div className="flex flex-col-reverse md:flex-row pt-30 items-center justify-center gap-x-10 gap-y-6 ">
        <div className="md:w-[50%] w-full ">
            <div className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg text-xl font-semibold ">
                Trendy Living Room, Drawing Room and Hall Wallpapers
            </div>
            <p className="text-[#b1a69b] md:text-normal text-xs ">
                A place which reflects your whole house is living room. Make your living room space more welcoming for your guest and reflect warmth with our life n colors wallpapers collection. It can create a warm, elegant, or welcoming atmosphere. Find the perfect wallpaper in our collection.
            </p>
        </div>
        <div className="md:w-[50%] w-full " >
            <Image src={topImage} alt="inventory" className="h-full w-full rounded-xl " />
        </div>
    </div>
}
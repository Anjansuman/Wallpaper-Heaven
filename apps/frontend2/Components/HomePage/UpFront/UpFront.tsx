import Image from "next/image";
import homePage from "../../../public/upfront.jpeg";


export default function UpFront() {
    return <div className="w-full text-[#0B2814] relative " >
        <Image
            src={homePage}
            alt="Home"
            className="w-full  max-h-[1000px] object-cover object-center relative "
            unoptimized
        />
        <div className="absolute inset-0 top-10 bg-black/20 z-10 pointer-events-none" />

        <div className=" h-40 z-20 w-fit absolute top-1/2 left-1/12 -translate-y-1/2 flex flex-col gap-y-3 ">
            <div>
                <div className="text-xl text-[#d8d8d8] md:text-2xl lg:text-4xl xl:text-7xl font-extrabold ">
                    Wallpaper heaven
                </div>
                <div className="text-sm xl:text-3xl text-[#cfcbb9] font-bold ">
                    Give your home a <span className="text-[#ceb630]">heavenly</span> vibe.
                </div>
            </div>
            <div className="w-fit md:py-2 md:px-4 py-1 px-2 text-md md:text-md font-medium md:rounded-md rounded-sm bg-[#4e7c47] hover:bg-[#466d40] transition-colors duration-250 shadow-xl shadow-[#000000] cursor-pointer text-[#000000] ">
                See our Designs
            </div>
        </div>
    </div>
}
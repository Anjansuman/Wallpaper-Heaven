import Image from "next/image";
import homePage from "../../../public/home3.png";
import footer from "../../../public/footer.jpeg";


export default function UpFront() {
    return <div className="w-full text-[#0B2814] relative " >
        <Image src={homePage} alt="Home" className="w-full max-h-[1000px] object-cover object-center relative top-10 " />
        <div className=" h-30 w-fit absolute top-1/2 left-1/12 -translate-y-1/2 flex flex-col gap-y-3 ">
            <div>
                <div className="text-6xl font-extrabold ">
                    Wallpaper heaven
                </div>
                <div className="text-xl text-[#E6E0C5] font-bold ">
                    Give your home a heavenly vibe.
                </div>
            </div>
            <div className="w-fit py-2 px-4 font-medium rounded-md bg-[#6DA165] hover:bg-[#5e8b57] transition-colors cursor-pointer text-[#E6E0C5] ">
                See our Designs
            </div>
        </div>
    </div>
}
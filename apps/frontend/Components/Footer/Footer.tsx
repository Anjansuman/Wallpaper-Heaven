import Image from "next/image";
import BrandName from "../ui/Customs/BrandName";
import { Feedback } from "@/components/ui/FeedbackCard";

export default function Footer() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-[#000] to-[#0d0833] relative overflow-hidden text-stone-300 ">
      {/* Background image using next/image */}
      {/* <Image
        src="/footer.jpeg"
        alt="footer"
        fill
        className="object-cover z-0 scale-x-[-1]"
        style={{ objectPosition: 'center -800px' }}
        /> */}

      {/* Content on top of image */}
      <div className="w-fit relative z-10">
        <BrandName size="lg" />
        <div className=" flex text-[20px] justify-center items-center font-normal mt-2 text-[#E6E0C5] ">
          YOU SAY - WE MAKE
        </div>
      </div>

      <div className="h-80 w-full rounded-2xl px-10 py-5 bg-white/10 backdrop-blur-xs border-2 border-[#6DA165] flex justify-between relative z-10 mt-4">
        
        {/* Connect center */}
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-xl font-bold ">Connect</div>
          {["Call", "Whatsapp", "E-mail", "Address"].map((tags, key) => (
            <div key={key} className="w-fit text-md font-medium hover:underline cursor-pointer" >
              {tags}
            </div>
          ))}
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-xl font-bold ">Shop Links</div>
          {["Designers Collection", "Shop by Brand", "Shop by Design", "Shop by Genre", "Trending Collecitons", "Custom Wallpapers"].map((tags, key) => (
            <div key={key} className="w-fit text-md font-medium hover:underline cursor-pointer" >
              {tags}
            </div>
          ))}
        </div>

        {/* Help Center */}
        <div className="flex flex-col gap-y-2 w-full">
          <div className="text-xl font-bold ">Help</div>
          {["Contract Us", "Privacy Policy", "Terms & Conditions", "Installation Guidlines"].map((tags, key) => (
            <div key={key} className="w-fit text-md font-medium hover:underline cursor-pointer" >
              {tags}
            </div>
          ))}
        </div>
        <div className="flex justify-end items-end pr-25 pb-2">
          <Feedback/>
        </div>
      </div>
    </div>
  );
}

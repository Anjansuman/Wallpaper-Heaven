import Image from "next/image";
import BrandName from "../ui/Customs/BrandName";
import { LinkTabsAnimation } from "./LinkTabsAnimation";

export default function Footer() {
  return (
    <div className="w-full rounded-2xl p-4 bg-[#51794b] relative overflow-hidden">
      {/* Background image using next/image */}
      <Image
        src="/footer.jpeg"
        alt="footer"
        fill
        className="object-cover z-0 scale-x-[-1]"
        style={{ objectPosition: 'center -800px' }}
        />

      {/* Content on top of image */}
      <div className="relative z-10">
        <BrandName size="lg" />
        <div className="w-full flex items-center text-white font-semibold mt-2">
          YOU SAY AND WE MAKE
        </div>
      </div>

      <div className="h-80 w-full rounded-2xl bg-white/10 backdrop-blur-xs border-2 border-[#6DA165] relative z-10 mt-4">
        <LinkTabsAnimation />
      </div>
    </div>
  );
}

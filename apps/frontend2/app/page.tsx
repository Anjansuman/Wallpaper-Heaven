import NavBar from "../Components/Nav-Bar/NavBar";
import Image from "next/image";
import homePage from "../public/home.jpeg";
import BrickGrid from "../Components/Grids/BrickGrid";
import Footer from "../Components/Footer/Footer";
import { NavBar2 } from "@/Components/Nav-Bar/NavBar2";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import BrandName from "@/Components/ui/Customs/BrandName";
import Creators from "@/Components/Creators/Creators";
import Genre from "@/Components/Genre/Genre";
import Designs from "@/Components/Designs/Designs";

export default function Home() {
  return (
    <div className=" h-full bg-[#E4E4E4] ">
      <NavBar2 />
      <div className="w-full flex justify-center " >
        <Image src={homePage} alt="Home" className="w-full max-h-[800px] object-cover object-center z-0 " />
      </div>
      <div className="w-full flex flex-col items-start mt-7 px-10 gap-7 ">
        <div className="w-full flex justify-center items-center font-semibold text-lg text-[#0B2814]">
          Give your home a heavenly vibe.
        </div>
        <Designs />
        <Genre />
        <Creators />
      </div>
      <Footer />
    </div>
  );
}

/*

return (
    <div className=" h-full p-4 flex flex-col gap-4 bg-[#E6E0C5] items-center ">
      <NavBar />
      <div className="w-full flex justify-center mt-7 ">
        <Image src={homePage} alt="Home" className="rounded-2xl w-[80%] " />
      </div>
      <div className="flex justify-center items-center font-semibold text-lg text-[#0B2814]">
        Give your home a heavenly vibe.
      </div>
        <BrickGrid />
        <Footer />
    </div>
  );

*/

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
    <div className=" h-full px-10 pt-5 flex flex-col gap-7 bg-[#E4E4E4] items-center ">
      <NavBar2 />
      <div className="w-full flex justify-center mt-14 ">
        <Image src={homePage} alt="Home" className="rounded-2xl w-[80%] " />
      </div>
      <div className="flex justify-center items-center font-semibold text-lg text-[#0B2814]">
        Give your home a heavenly vibe.
      </div>
      <Designs />
      <Genre />
      <Creators />
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

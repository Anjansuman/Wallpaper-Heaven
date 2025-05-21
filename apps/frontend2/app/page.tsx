import NavBar from "../Components/Nav-Bar/NavBar";
import Image from "next/image";
import homePage from "../public/home.jpeg";
import BrickGrid from "../Components/Grids/BrickGrid";
import Footer from "../Components/Footer/Footer";
import { NavBar2 } from "@/Components/Nav-Bar/NavBar2";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";
import BrandName from "@/Components/ui/Customs/BrandName";

export default function Home() {
  return <div className="h-full w-full">
    <NavBar />

    <main className=" flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
      <div className="h-[80%] w-full flex justify-center items-center mt-14 ">
        <Image src={homePage} alt="home page" className="w-full rounded-lg" />
      </div>
    </main>
  </div>
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

import Footer from "../Components/Footer/Footer";
import { NavBar2 } from "@/Components/Nav-Bar/NavBar2";
import Creators from "@/Components/HomePage/Creators/Creators";
import Genre from "@/Components/HomePage/Genre/Genre";
import Designs from "@/Components/HomePage/Designs/Designs";
import UpFront from "@/Components/HomePage/UpFront/UpFront";
import Brands from "@/Components/HomePage/Brands/Brands";

export default function Home() {
  return (
    <div className=" h-full ">
      <UpFront />
      <div className="w-full flex flex-col items-start mt-7 md:px-16 lg:px-20 sm:px-10 px-5 gap-7 ">
        <div className="w-full flex justify-center items-center font-semibold text-lg text-[#0B2814]">
          Give your home a heavenly vibe.
        </div>
        <Designs />
        <Genre />
        <Brands />
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

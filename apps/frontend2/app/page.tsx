import Creators from "@/Components/HomePage/Creators/Creators";
import Genre from "@/Components/HomePage/Genre/Genre";
import Designs from "@/Components/HomePage/Designs/Designs";
import UpFront from "@/Components/HomePage/UpFront/UpFront";
import Brands from "@/Components/HomePage/Brands/Brands";
import About from "@/Components/HomePage/About/About";

export default function Home() {
  return (
    <div className=" h-full ">
      <UpFront />
      <div className="w-full flex flex-col items-start mt-7 md:px-14 sm:px-10 px-5 gap-y-7 ">
        <div className="w-full flex justify-center items-center font-serif tracking-wide text-xl text-[#0B2814] pb-5">
          Give your home a heavenly vibe.
        </div>
        <Genre />
        <Brands />
        <Creators />
        <Designs />
        <About/>
      </div>                  
    </div>
  );
}
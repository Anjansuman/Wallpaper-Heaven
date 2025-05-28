import Creators from "@/Components/HomePage/Creators/Creators";
import Genre from "@/Components/HomePage/Genre/Genre";
import Designs from "@/Components/HomePage/Designs/Designs";
import UpFront from "@/Components/HomePage/UpFront/UpFront";
import Brands from "@/Components/HomePage/Brands/Brands";

export default function Home() {
  return (
    <div className=" h-full ">
      <UpFront />
      <div className="w-full flex flex-col items-start mt-7 md:px-14 lg:px-20 sm:px-10 px-5 gap-y-7 ">
        <div className="w-full flex justify-center items-center font-semibold text-lg text-[#0B2814]">
          Give your home a heavenly vibe.
        </div>
        <Designs />
        <Genre />
        <Brands />
        <Creators />
      </div>                  
    </div>
  );
}
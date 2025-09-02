import Creators from "@/Components/HomePage/Creators/Creators";
import Designs from "@/Components/HomePage/Designs/Designs";
import UpFront from "@/Components/HomePage/UpFront/UpFront";
import Brands from "@/Components/HomePage/Brands/Brands";
import About from "@/Components/HomePage/About/About";
import TopCollections from "@/Components/Collections/Collections";
import Testimonials from "@/Components/Testimonials/Testimonials";
import Navbar2 from "@/Components/Nav-Bar/NavBar2";

export default function Home() {
  return (
    <div className=" h-full ">
      <Navbar2 />

      <UpFront />
      <div className="w-full flex flex-col items-center justify-center mt-7 md:px-14 sm:px-10 px-5 gap-y-7">
        <div className="w-full flex justify-center items-center font-serif tracking-wide text-xl text-[#0B2814] pb-5">
          Give your home a heavenly vibe.
        </div>
        <TopCollections />
        <Brands />
        <Creators />
        <Designs />
        <Testimonials />
        <About />
      </div>
    </div>
  );
}
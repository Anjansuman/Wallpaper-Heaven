import NavBar from "../Components/Nav-Bar/NavBar";
import Image from 'next/image';
import homeImage from "../public/home.jpeg";
import BrickGrid from "../Components/Grids/BrickGrid";
import Footer from "../Components/Footer/Footer";

export default function Home() {
  return (
    <div className="w-screen h-full p-4 flex flex-col gap-4 bg-[#E6E0C5] ">
      <NavBar />
      <div className="flex justify-center ">
        <Image src={homeImage} alt="Home" className="rounded-2xl w-[80%] " />
      </div>
      <div className="flex justify-center items-center font-semibold text-lg text-[#0B2814]">
        Give your home a heavenly vibe.
      </div>
      <div className="flex justify-center ">
        <BrickGrid />
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

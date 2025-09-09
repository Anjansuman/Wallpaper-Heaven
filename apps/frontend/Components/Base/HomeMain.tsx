"use client";
import HomeEnlargedImage from "@/Components/Base/HomeEnlargedImage";
import Hero from "@/Components/Base/Hero";
import TopCollections from "@/Components/Collections/Collections";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";
import HomeTopBrand from "@/Components/Base/HomeTopBrands";
import Testimonials from "@/Components/Testimonials/Testimonials";
import HomeGenre from "@/Components/Base/HomeGenre";
import HomeDesigners from "@/Components/Base/HomeDesigners";

export default function HomeMain() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-[#EFEFEF] overflow-hidden select-none">
      <NavbarMain />

      <div className="absolute top-0 left-0 w-full h-screen">
        <div
          className="w-full h-full bg-gradient-to-r from-[#9573E1]/70 via-pink-300/50 to-[#9573E1]/70 opacity-60 blur-3xl animate-wave"
        />
      </div>

      <div className="relative z-10 w-full flex flex-col max-w-7xl pt-20">
        <Hero />

      </div>

      <HomeEnlargedImage />
      <TopCollections />
      <HomeTopBrand />
      <HomeGenre />
      <HomeDesigners />
      <Testimonials />

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-25%); }
          50% { transform: translateX(25%); }
          100% { transform: translateX(-25%); }
        }

        .animate-wave {
          animation: wave 12s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}

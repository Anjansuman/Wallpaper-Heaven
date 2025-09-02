"use client";
import { HomeCustomerReviews } from "@/Components/Base/HomeCustomerReviews";
import HomeEnlargedImage from "@/Components/Base/HomeEnlargedImage";
import Hero from "@/Components/Base/Hero";
import HomeImageChangingBanner from "@/Components/Base/HomeImageChangingBanner";
import TopCollections from "@/Components/Collections/Collections";
import NavbarMain from "@/Components/Nav-Bar/NavbarMain";

export default function NewPage() {
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
            <HomeImageChangingBanner />
            <HomeCustomerReviews />

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

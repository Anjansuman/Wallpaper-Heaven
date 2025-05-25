"use client"

import { IconSearch } from "@tabler/icons-react";
import BrandName from "../ui/Customs/BrandName";
import { useState } from "react";
import { SearchBar } from "../ui/Customs/SearchBar";

export const NavBar2 = () => {

    const [searchPanel, setSearchPanel] = useState<boolean>();

    return (
        <div className="w-screen bg-[#E4E4E4] p-5 fixed z-50 flex justify-between items-center shadow-lg">

            <div className="hidden md:flex ">
                <BrandName size={"sm"} />
            </div>
            <div className="md:hidden">
                <BrandName size={"xs"} />
            </div>

            <div className="flex items-center gap-x-3 relative">
                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center items-center gap-x-6 text-[#0B2814] font-semibold">
                    {["Designs", "Genre", "Brands", "Designers"].map((e, key) => (
                        <div className="hover:underline cursor-pointer" key={key}>
                            {e}
                        </div>
                    ))}
                    <div className="">
                        <IconSearch onClick={() => setSearchPanel((value) => !value)} />
                        {
                            searchPanel ? <div className="absolute right-0 top-16 ">
                            <SearchBar />
                        </div> : ""
                        }
                    </div>
                    <div className="h-7 w-7 border-2 border-red-500 rounded-full "></div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden cursor-pointer">
                    {/* Replace with an icon (e.g., from Lucide or Heroicons) if desired */}
                    ☰
                </div>
            </div>
        </div>
    );
};

"use client"

import BrandName from "@/Components/ui/Customs/BrandName";
import { IconFilter, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export default function PhoneFilterTab() {

  const [filterTab, setFilterTab] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [showFilter, setShowFilter] = useState(false);


  useEffect(() => {
    if (filterRef.current) {
      if (filterTab) {
        gsap.fromTo(
          filterRef.current,
          { x: "100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(filterRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [filterTab]);

  useEffect(() => {
    if (filterTab) {
      setShowFilter(true);
    } else {
      // Delay removal to let animation play
      setTimeout(() => setShowFilter(false), 300);
    }
  }, [filterTab]);



  return <div className="lg:hidden border border-[#0B2814] rounded-md px-2 py-1 flex justify-between items-center ">
    <div
      className="w-full flex justify-between items-center"
      onClick={() => setFilterTab(v => !v)}
    >
      <div className="">
        Filter
      </div>
      <IconFilter className="size:3 md:size:4 " />
    </div>
    {filterTab ? <div
      ref={filterRef}
      className="md:hidden h-screen w-full sm:w-[50%] absolute z-50 top-0 right-0 ">
      <PhoneFilterElements close={() => setFilterTab(false)} />
    </div> : ""}
  </div>
}

interface PhoneFilterElementsProps {
  close: () => void
}

const PhoneFilterElements = ({ close }: PhoneFilterElementsProps) => {

  const options = ["flora", "3D", "Pichwai"];


  return <div className="h-screen w-full bg-[#faf0e6] py-3 md:py-5 px-6 flex flex-col justify-between gap-6">
    <div>
      <div className="w-full flex justify-between">
        <div className="sm:hidden">
          <BrandName size={"xs"} />
        </div>
        <div></div>
        <button onClick={close} aria-label="Close Menu">
          <IconX size={28} />
        </button>
      </div>

      <div className="w-full max-w-[25%] hidden lg:flex flex-col pt-7 p-4 ">
        <div className="text-2xl font-medium mb-4">Filter</div>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer ">
              <input
                type="checkbox"
                value={option}
                className="peer hidden"
                id={`checkbox-${index}`}
              />
              <div className="w-4 h-4 border-2 border-[#0B2814] peer-checked:bg-[#0B2814] rounded-xs "></div>
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
}
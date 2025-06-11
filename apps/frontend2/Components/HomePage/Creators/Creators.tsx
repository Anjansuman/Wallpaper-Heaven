import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { GiantSlider } from "../../Slider/GiantSlider";
import CreatorCard from "@/Components/creatorCard/CreatorCard";

const people = [
  {
    id: 1,
    name: "John Doe",
    brand: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    brand: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    brand: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    brand: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    brand: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    brand: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

export default function Creators() {
  return <div className="w-full flex flex-col items-start gap-y-3 mb-7 px-10">
    <div className="w-full flex justify-between mb-5">
      <div className="text-lg md:text-3xl border-b-2 border-b-blue-500 text-[#0B2814] font-bold">
        OUR TOP CREATORS
      </div>
      <div className="flex">
        <span className="text-[25px] tracking-widest font-light text-blue-500 px-4 py-1 md:text-md">
          --------------------------------------------------------
        </span>
      <div className="text-[24px] tracking-wider font-light bg-blue-500/80 px-4 py-1 md:text-md text-[#000000]">
        THE MINDS BEHIND THE MASTERPIECES
      </div>
      </div>
    </div>
    <div className="flex flex-row items-center w-full">
      {/* <AnimatedTooltip items={people} /> */}

    </div>
    <div className="flex flex-wrap gap-6 justify-center px-0">
      {people.map((creator, i) => (
        <CreatorCard
          key={i}
          image={creator.image}
          name={creator.name}
          brand={creator.brand}
        />
      ))}
    </div>
    {/* <GiantSlider /> */}
  </div>
}
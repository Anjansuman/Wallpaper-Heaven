import Link from "next/link";
import Genre2 from "../HomePage/Genre/Genre2";
import { IconCaretRightFilled } from "@tabler/icons-react";
import Image from "next/image";
import homePage from "../../public/home.jpeg";


// Type definition for tabs
export type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

// TabSwitcher wrapper for homepage
export function TabSwitcher() {
  const tabs: Tab[] = [
    { title: "Pichwai", value: "Pichwai", content: <Content title="Pichwai" /> },
    { title: "3D", value: "3D", content: <Content title="3D" /> },
    { title: "Space", value: "Space", content: <Content title="Space" /> },
    { title: "Floral", value: "Floral", content: <Content title="Floral" /> },
    { title: "Tropical", value: "Tropical", content: <Content title="Tropical" /> },
    { title: "something1", value: "something1", content: <Content title="something1" /> },
    { title: "something2", value: "something2", content: <Content title="something2" /> },
    { title: "something3", value: "something3", content: <Content title="something3" /> },
    { title: "something4", value: "something4", content: <Content title="something4" /> },
    { title: "something5", value: "something5", content: <Content title="something5" /> },
    { title: "something6", value: "something6", content: <Content title="something6" /> },
  ];

  return (
    <div className="relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start">
      <Genre2 tabs={tabs} />
    </div>
  );
}

// Content component used inside each tab
const Content = ({ title }: { title: string }) => {
  return (
    <div className="md:h-96 h-60 w-full rounded-lg overflow-hidden hover:bg-[#c6beb6] transition-colors ">
      <Link href={`/inventory/genre/${title}`} >
        <div className="w-fit px-3 py-1 rounded-full md:text-lg font-semibold flex items-center justify-start ">
          <span>{title}</span>
          <IconCaretRightFilled className="size-4 md:size-5 ml-2" />
        </div>
        <Image
          src={homePage}
          alt={title}
          className="rounded-lg h-full w-full object-cover"
        />
      </Link>
    </div>
  );
};
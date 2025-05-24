"use client";

import Image from "next/image";
import { Tabs } from "../../components/ui/tabs";
import homePage from "../../public/home.jpeg";

export function TabSwitcher() {
  const tabs = [
    {
      title: "Pichwai",
      value: "Pichwai",
      content: (
          <Content title={"Pichwai"} />
      ),
    },
    {
      title: "3D",
      value: "3D",
      content: (
          <Content title={"3D"} />
      ),
    },
    {
      title: "Space",
      value: "Space",
      content: (
          <Content title={"Space"} />
      ),
    },
    {
      title: "Floral",
      value: "Floral",
      content: (
          <Content title={"Floral"} />
      ),
    },
    {
      title: "Tropical",
      value: "Tropical",
      content: (
          <Content title={"Tropical"} />
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start ">
      <Tabs tabs={tabs} />
    </div>
  );
}

const Content = ({ title }: { title: String }) => {

  return <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6DA165] to-[#0B2814]">
    <p>{title}</p>
    <Image
      src={homePage}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  </div>
};

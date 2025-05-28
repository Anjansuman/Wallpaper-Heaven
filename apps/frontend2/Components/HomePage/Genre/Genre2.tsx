"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export default function Genre2({
  tabs,
  containerClassName,
  tabButtonClassName,
  activeTabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  tabButtonClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const active = tabs.find((t) => t.value === activeTab)!;

  return (
    <div className={cn("h-full w-full flex flex-col md:flex-row justify-between items-center gap-y-3 gap-x-6", containerClassName)}>
      {/* content tab */}
      <div className={cn("md:h-96 h-60 w-full overflow-hidden", contentClassName)}>
        {active.content}
      </div>

      {/* tags as filled input tabs */}
      <div className="w-full grid grid-cols-3 gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "h-10 md:h-20 relative px-3 py-0.5 md:px-6 md:py-3 rounded-sm md:rounded-lg text-sm sm:text-[16px] flex justify-center items-center text-center text-gray-800 font-medium border border-green-300 backdrop-blur-lg bg-white/40 dark:bg-white/10 transition-all cursor-pointer",
              tabButtonClassName,
              activeTab === tab.value &&
                cn("bg-green-100/60 border-green-500 shadow-md", activeTabClassName)
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
}

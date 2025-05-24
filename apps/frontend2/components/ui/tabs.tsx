"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

export const Tabs = ({
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
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const active = tabs.find((t) => t.value === activeTab)!;

  return (
    <div
      className={cn(
        "h-full flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto",
        containerClassName
      )}
    >
      {/* Tag content on left */}
      <div className={cn("w-full md:w-2/3", contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-xl bg-white/40 dark:bg-white/10"
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs buttons on right */}
<div className="flex flex-col gap-3 w-full md:w-1/3">
  {tabs.map((tab) => (
    <button
      key={tab.value}
      onClick={() => setActiveTab(tab.value)}
      className={cn(
        "h-16 relative px-6 py-3 rounded-xl text-left text-gray-800 font-medium border border-green-300 backdrop-blur-lg bg-white/40 dark:bg-white/10 transition-all",
        tabButtonClassName,
        activeTab === tab.value &&
          cn(
            "bg-green-100/60 border-green-500 shadow-md",
            activeTabClassName
          )
      )}
    >
      {tab.title}
    </button>
  ))}
</div>


    </div>
  );
};


export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => tab.value === tabs[0].value;

  return (
    <div className={cn("relative", className)}>
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

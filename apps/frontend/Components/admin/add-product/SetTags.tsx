"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function SetTags() {
  const [tags, setTags] = useState<string[]>(["Pichwai"]);
  const [input, setInput] = useState("");
  const defaultTag = "Tags";

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed) && trimmed !== defaultTag) {
      setTags([...tags, trimmed]);
    }
    setInput("");
  };

  const removeTag = (name: string) => {
    setTags(tags.filter((tag) => tag !== name));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="text-[#3D5A40] bg-[#F9FAF8] p-6 rounded-xl shadow-sm">
      <div className="flex flex-col items-start mb-6">
        <div className="font-bold text-3xl text-[#3D5A40]">Set Tags</div>
        <div className="text-[#6D7278] text-base mt-1">
          Give your product a final touch.
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* input field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter"
          className="px-4 py-3 border border-[#D1D5DB] rounded-md bg-[#FFF] text-[#3D5A40] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all text-base"
        />

        {/* tags display */}
        <div className="flex flex-wrap gap-3 mt-1 border border-[#D1D5DB] rounded-lg bg-[#FFFFFF] p-4">
          <Tag name={defaultTag} removable={false} />
          {tags.map((tag, i) => (
            <Tag key={i} name={tag} remove={() => removeTag(tag)} removable />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TagProps {
  name: string;
  remove?: () => void;
  removable?: boolean;
}

const Tag = ({ name, remove, removable = true }: TagProps) => {
  const baseStyle =
    "flex items-center rounded-full px-5 py-2 text-base font-semibold transition-all";
  const removableStyle =
    "bg-[#6DA165] text-white hover:bg-[#5a914e]";
  const fixedStyle =
    "bg-[#E6E0C5] text-[#3D5A40] cursor-default";

  return (
    <div
      className={`${baseStyle} ${
        removable ? removableStyle : fixedStyle
      } group`}
    >
      <span className="mr-2">{name}</span>
      {removable && (
        <button
          onClick={remove}
          className="hover:text-red-400 transition-colors"
          aria-label="Remove tag"
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  );
};

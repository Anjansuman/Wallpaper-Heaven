import { IconX } from "@tabler/icons-react";
import Link from "next/link";

interface PhoneNavElementsProps {
  close: () => void;
}

export default function PhoneNavElements({ close }: PhoneNavElementsProps) {
  return (
    <div className="h-full w-[80%] max-w-sm bg-[#faf0e6] py-5 px-6 flex flex-col gap-6 ">
      {/* Close button */}
      <div className="flex justify-end">
        <button onClick={close} aria-label="Close Menu">
          <IconX size={28} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-5 text-lg font-semibold text-gray-800">
        {["Designs", "Genre", "Brands", "Designers"].map((item, i) => (
          <div key={i} className="hover:text-black cursor-pointer">
            {item}
          </div>
        ))}
        <Link href="/" className="text-blue-600 underline">
          Home
        </Link>
      </nav>
    </div>
  );
}

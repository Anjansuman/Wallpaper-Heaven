import { IconBrandWhatsapp, IconPhone, IconX } from "@tabler/icons-react";
import Link from "next/link";

interface PhoneNavElementsProps {
    close: () => void;
}

export default function PhoneNavElements({ close }: PhoneNavElementsProps) {
  return (
    <div className="h-screen w-full bg-[#faf0e6] py-5 px-6 flex flex-col justify-between gap-6">
      <div>
        {/* Close button */}
        <div className="w-full flex justify-end">
          <button onClick={close} aria-label="Close Menu">
            <IconX size={28} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-5 text-lg font-medium text-gray-800">
          {["Designs", "Genre", "Brands", "Designers"].map((item, i) => (
            <div key={i}>
              <div className="hover:text-black cursor-pointer">
                {item}
              </div>
              <div className="w-full border-t border-[#0B2814] "></div>
            </div>
          ))}
          <Link href="/" className="text-blue-600 underline">
            Home
          </Link>
        </nav>
      </div>

      <div className="flex justify-between">
        <div>Contact Us</div>
        <div className="flex gap-3">
          <Link href={`tel:8882448998`} target="_blank">
            <IconPhone />
          </Link>
          <Link href={`https://wa.me/918882448998`} target="_blank">
            <IconBrandWhatsapp />
          </Link>
        </div>
      </div>
    </div>
  );
}

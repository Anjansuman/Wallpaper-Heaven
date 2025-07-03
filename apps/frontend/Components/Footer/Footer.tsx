import Image from "next/image";
import BrandName from "../ui/Customs/BrandName";
import Feedback from "../ui/FeedbackCard";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full p-4 bg-gradient-to-br from-[#000] to-[#0d0833] relative overflow-hidden text-stone-300">
      {/* Brand */}
      <div className="relative z-10 w-fit mb-6">
        <BrandName size="lg" />
        <div className="text-[20px] text-[#E6E0C5] mt-2 font-normal">
          YOU SAY - WE MAKE
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mt-4 rounded-2xl border-2 border-[#6DA165] bg-white/10 backdrop-blur-xs px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connect */}
          <div className="flex flex-col gap-y-2">
            <div className="text-xl font-bold">Connect</div>
            {["Call", "Whatsapp", "E-mail", "Address"].map((tag, key) => (
              <div
                key={key}
                className="text-md font-medium hover:underline cursor-pointer w-fit"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-y-2">
            <div className="text-xl font-bold">Shop Links</div>
            {[
              "Designers Collection",
              "Shop by Brand",
              "Shop by Design",
              "Shop by Genre",
              "Trending Collections",
              "Custom Wallpapers",
            ].map((tag, key) => (
              <div
                key={key}
                className="text-md font-medium hover:underline cursor-pointer w-fit"
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Help */}
          <div className="flex flex-col gap-y-2">
            <div className="text-xl font-bold">Help</div>
            {[
              {label: "Contact Us", href: "/contact"},
              {label: "Privacy Policy", href: "/privacy"},
              {label: "Terms & Conditions", href: "/terms&conditions/main" },
              {label: "Installation Guidelines", href: "/installation"},
            ].map((item, key) => (
              <Link
                key={key}
                href={item.href}
                className="text-md font-medium hover:underline cursor-pointer w-fit"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Feedback */}
          <div className="flex justify-end items-end">
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}

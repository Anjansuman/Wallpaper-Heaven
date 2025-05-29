import Image from "next/image";
import Link from "next/link";
import React from "react";

import PrintImage from "../../../public/tree.jpeg";

interface SliderBlockProps {
  title?: String,
  image?: String, // ? -> for the last element which doesn't have any image
  children?: React.ReactNode // ? -> only last element has the children
}

export const SliderBlock = ({ title, image, children }: SliderBlockProps) => {
  return (
      <div className="h-50 w-50 md:h-80 md:w-80 relative flex justify-center items-center flex-shrink-0 rounded-lg overflow-hidden shadow-md">
        {
          (image && title) && !children ? <BrandImage title={title} image={image} />
            : <BrandChildren children={children} />
        }
      </div>
  );
};

interface BrandImageProps {
  title: String,
  image: String
}

const BrandImage = ({ title, image }: BrandImageProps) => {
  return <Link href={`/inventory/brands/${title}`} >
    <div className="h-50 w-50 md:h-80 md:w-80 relative flex justify-center items-center flex-shrink-0 rounded-lg overflow-hidden shadow-md">
      <Image src={PrintImage} alt="image" className="w-full h-full object-cover" />
      <div className="absolute bottom-0 z-10 text-xl px-2 py-2 bg-black/30 text-[#E6E0C5] w-full flex justify-center ">
        {title}
      </div>
    </div>
  </Link>
}

interface BrandChildrenProps {
  children: React.ReactNode
}

const BrandChildren = ({ children }: BrandChildrenProps) => {
  return <div className="h-50 w-50 md:h-80 md:w-80 relative flex justify-center items-center flex-shrink-0 rounded-lg overflow-hidden bg-white/40 border border-green-300 shadow-md">
    {children}
  </div>
}

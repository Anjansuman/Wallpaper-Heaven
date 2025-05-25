import Image, { StaticImageData } from "next/image";
import React from "react";

type SliderBlockProps =
  | { image: StaticImageData; children?: never }
  | { children: React.ReactNode; image?: never };

export const SliderBlock = (props: SliderBlockProps) => {
  return (
    <div className="h-80 w-80 flex justify-center items-center flex-shrink-0 rounded-lg overflow-hidden bg-white shadow-md">
      {"image" in props ? (
        <Image src={props.image} alt="image" className="w-full h-full object-cover" />
      ) : (
        props.children
      )}
    </div>
  );
};

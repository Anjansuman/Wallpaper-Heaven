type Size = "xs" | "sm" | "md" | "lg";

interface BrandNameProps {
  size: Size;
}

const sizing: Record<Size, string> = {
  xs: "w-40 text-md px-4 py-1.5",
  sm: "w-50 text-lg px-4 py-2",
  md: "w-60 text-xl px-4 py-2.5 ",
  lg: "w-70 text-2xl px-5 py-3 "
};

export default function BrandName({ size }: BrandNameProps) {
  return (
    <div
      className={`rounded-full bg-[#0B2814] flex gap-x-1 justify-center items-center font-bold cursor-pointer ${sizing[size]}`}
    >
      <div className="text-[#E6E0C5]">Wallpaper</div>
      <div className="text-[#6DA165]">Heaven</div>
    </div>
  );
}

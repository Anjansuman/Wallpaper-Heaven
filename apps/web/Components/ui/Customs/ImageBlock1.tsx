import Image from "next/image";

interface ImageBlock1Props {
    NoLrounded?: boolean,
    NoRrounded?: boolean,
    content: React.ReactNode,
    widthRatio: number,
    glassmorphism?: boolean
}

export default function ImageBlock1({ NoLrounded, NoRrounded, content, widthRatio, glassmorphism }: ImageBlock1Props) {

    const calculatedWidth = widthRatio * 90;

    return <div className={`h-60 w-90 bg-[#E6E0C5] p-2  ${NoLrounded ? "pl-0 rounded-r-xl": "rounded-l-xl"} ${NoRrounded ? "pr-0 rounded-l-xl" : "rounded-r-xl"} `}
        style={{
            width: `${widthRatio * 360}px`
        }}
    >
        <div className={`h-full rounded-xl ${NoLrounded ? "rounded-l-none": ""} ${NoRrounded ? "rounded-r-none" : ""} overflow-hidden ${glassmorphism ? "backdrop-blur-2xl flex justify-center items-center pl-5 bg-white/50 border-2 border-l-0 border-white" : ""}`} >
                {content}
        </div>
    </div>
}
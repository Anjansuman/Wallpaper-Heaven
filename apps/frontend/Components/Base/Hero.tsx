export default function Hero() {
    return (
        <div className="w-full h-full flex flex-col py-2 items-center gap-y-4">
            <span className="border border-black px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-3xl">
                Luxury you can live within
            </span>

            <div className="w-full flex flex-col items-center text-[70px] font-semibold leading-18 ">
                <span>Every home deserves</span>
                <span className="text-[70px]">a masterpiece</span>
            </div>
            <div className="w-full flex flex-col items-center">
                <span>Bring your interiors to life with designs that inspire,</span>
                <span>impress, and elevate your space.</span>
            </div>
        </div>
    )
}
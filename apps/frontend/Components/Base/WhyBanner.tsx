
export default function WhyBanner() {
    return (
        <div className="h-[300px] w-full bg-[#e0e0e0] flex flex-col">
            <div className="h-[30%] w-full border-b-4 flex justify-center items-center text-4xl tracking-wide font-normal text-[#000000]">
                Why choose Wallpaper Heaven?
            </div>

            <div className="h-[70%] w-full flex justify-around px-8">
                <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-icons"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.5 6.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" /><path d="M2.5 21h8l-4 -7z" /><path d="M14 3l7 7" /><path d="M14 10l7 -7" /><path d="M14 14h7v7h-7z" /></svg>
                    </div>

                    <div className="text-xl text-[#000000]">
                        Immersive storyled designs
                    </div>
                </div>

                <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-artboard"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" /><path d="M3 8l1 0" /><path d="M3 16l1 0" /><path d="M8 3l0 1" /><path d="M16 3l0 1" /><path d="M20 8l1 0" /><path d="M20 16l1 0" /><path d="M8 20l0 1" /><path d="M16 20l0 1" /></svg>
                    </div>

                    <div className="text-xl ">
                        Art in every Pixel
                    </div>
                </div>
                <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11 21h-2.426a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.109 .707" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /><path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" /></svg>
                    </div>

                    <div className="text-xl ">
                        Customizable orders
                    </div>
                </div>
                <div className="w-full h-full flex flex-col items-center gap-y-4 justify-center">
                    <div>
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="80"  height="80"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chart-covariate"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 11h.009" /><path d="M14 15h.009" /><path d="M12 6h.009" /><path d="M8 10h.009" /><path d="M3 21l17 -17" /><path d="M3 3v18h18" /></svg>
                    </div>

                    <div className="text-xl ">
                        Innovative concepts
                    </div>
                </div>
            </div>
        </div>
    )
}
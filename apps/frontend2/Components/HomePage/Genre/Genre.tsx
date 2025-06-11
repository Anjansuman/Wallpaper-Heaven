import Link from "next/link";
import { TabSwitcher } from "../../Slider/TabSwitcher";
import { IconCaretRightFilled } from "@tabler/icons-react";


export default function Genre() {
    return <div className="h-auto pb-30 w-full flex flex-col items-start">
        <div className="px-10 w-full">
            <div className="text-lg md:text-3xl text-[#0B2814] font-bold ">
                <Link href={`/inventory/genre`} className="w-full flex justify-between items-center ">
                    <>
                        <div className="text-3xl border-b-2 border-b-green-500">
                            GENRE
                        </div>
                        {/* <IconCaretRightFilled className="size-4 md:size-5 ml-2" /> */}
                    </>
                    <div className="flex">
                        {/* <span className="text-[25px] tracking-widest font-light text-green-400 px-4 py-1 md:text-md">
                        -----------------------------------------------------------------
                        </span> */}
                        <div className="text-[24px] tracking-wider font-light bg-green-500 px-4 py-1 md:text-md text-[#000000]  ">
                            CHOOSE THE LOOK THAT MATCHES YOUR VIBE
                        </div>
                    </div>
                </Link>

            </div>

        </div>
        <div className="mt-[50px] px-10">
            <TabSwitcher />
        </div>
    </div>
}
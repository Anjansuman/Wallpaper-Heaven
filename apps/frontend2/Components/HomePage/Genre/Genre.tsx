import Link from "next/link";
import { TabSwitcher } from "../../Slider/TabSwitcher";
import { IconCaretRightFilled } from "@tabler/icons-react";


export default function Genre() {
    return <div className="h-full pb-50 w-full flex flex-col items-start">
        <div className="px-10">
            <div className="text-lg md:text-3xl text-[#0B2814] font-bold ">
                <Link href={`/inventory/genre`} className="flex justify-start items-center ">
                    <div className="text-3xl">
                        GENRE
                    </div>
                    <IconCaretRightFilled className="size-4 md:size-5 ml-2" />
                </Link>

            </div>
            <div className="text-md md:text-md text-[#0B2814]  ">
                CHOOSE THE LOOK THAT MATCHES YOUR VIBE
            </div>
        </div>
        <div className="mt-[100px] px-10">
            <TabSwitcher />
        </div>
    </div>
}
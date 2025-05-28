import Link from "next/link";
import { TabSwitcher } from "../../Slider/TabSwitcher";
import { IconCaretRightFilled } from "@tabler/icons-react";


export default function Genre() {
    return <div className="h-full w-full flex flex-col items-start ">
        <div>
            <div className="text-lg md:text-3xl text-[#0B2814] font-bold ">
                <Link href={`/inventory/genre`} className="flex justify-start items-center ">
                    <div>
                        GENRE
                    </div>
                    <IconCaretRightFilled className="size-4 md:size-5 ml-2" />
                </Link>

            </div>
            <div className="text-xs md:text-md text-[#0B2814]  ">
                CHOOSE THE LOOK THAT MATCHES YOUR VIBE
            </div>
        </div>
        <TabSwitcher />
    </div>
}
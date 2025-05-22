import { TabSwitcher } from "../Slider/TabSwitcher";


export default function Genre() {
    return <div className="w-full flex flex-col items-start justify-start mb-7">
        <div className="text-3xl text-[#0B2814] font-bold">
            GENRE
        </div>
        <div className="text-md text-[#0B2814]  ">
            CHOOSE THE LOOK THAT MATCHES YOUR VIBE
        </div>
        <TabSwitcher />
    </div>
}
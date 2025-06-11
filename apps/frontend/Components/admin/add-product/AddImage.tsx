import { IconPlus } from "@tabler/icons-react";


export default function AddImage() {
    return <div className="text-[#6DA165] ">
        <div className="flex flex-col items-start mb-6 ">
            <div className="font-semibold text-3xl">Select Images</div>
            <div className="">Choose Images that suits your product well.</div>
        </div>
        <div className="flex items-end justify-start gap-x-6 ">
            <div className="h-70 w-70 border border-[#6DA165] bg-white/40 rounded-lg flex justify-center items-center ">
                <IconPlus />
            </div>
            <div className="h-30 w-30 border border-[#6DA165] bg-white/40 rounded-lg flex justify-center items-center ">
                <IconPlus />
            </div>
            <div>
                Select atleast two images for product clarity.
            </div>
        </div>
    </div>
}
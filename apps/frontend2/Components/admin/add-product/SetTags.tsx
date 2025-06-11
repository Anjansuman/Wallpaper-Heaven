"use client"

import { IconX } from "@tabler/icons-react"

export default function SetTags() {
    return <div className="text-[#6DA165] ">
        <div className="flex flex-col items-start mb-6 ">
            <div className="font-semibold text-3xl">Set Tags</div>
            <div className="">Give your product a final touch.</div>
        </div>
        <div className="flex flex-col">
            {/* Tags pool */}
            <div className="h-auto border border-[#6DA165] rounded-lg bg-white/40 flex gap-2 p-4 ">
                <Tag name={"Pichwai"} remove={() => { }} />
            </div>
        </div>
    </div>
}

interface TagProps {
    name: String,
    remove: () => void
}

const Tag = ({ name, remove }: TagProps) => {

    // add grouping in the styling for hover border effect

    return <div className="w-auto pl-4 bg-[#6DA165] border border-transparent text-white rounded-md flex items-center justify-between "
        style={{

        }}
    >
        <div className="flex items-center justify-center text-center mr-4 py-2 ">
            {name}
        </div>
        <div
            className="flex justify-end items-center mr-2 hover:text-[red] transition-colors ease-in-out duration-200 py-2 cursor-pointer "
            onClick={remove}
        >
            <IconX className=" " />
        </div>
    </div>
}
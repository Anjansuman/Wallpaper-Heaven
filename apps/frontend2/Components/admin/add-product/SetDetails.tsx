

export default function SetDetails() {

    const search = () => {

    }

    return <div className="text-[#6DA165] ">
        <div className="flex flex-col items-start mb-6 ">
            <div className="font-semibold text-3xl">Set Details</div>
            <div className="">Give your product some details.</div>
        </div>
        <div className="flex flex-col gap-y-3">
            <div className="w-full">
                <div className="font-semibold">Title</div>
                <input type="text" placeholder="Product title" className="w-[500px] border border-[#6DA165] bg-white/40 rounded-full px-5 py-2 " />
            </div>
            {/* add an input bax for description */}
            <div className="w-full">
                <div className="font-semibold">Brand Name</div>
                <div className="flex gap-x-1 ">
                    <input
                        type="text"
                        placeholder="Product Brand"
                        className="w-[376px] border border-[#6DA165] bg-white/40 rounded-l-full px-5 py-2 "
                        // capture enter key and on typing send backend call with debouncing
                    />
                    <div
                        className="w-[120px] bg-[#6DA165] rounded-r-full text-white flex justify-center items-center "
                        onClick={search}
                    >
                        Search
                    </div>
                </div>
            </div>
        </div>
    </div>
}
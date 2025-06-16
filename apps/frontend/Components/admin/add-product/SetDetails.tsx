"use client";

export default function SetDetails() {
    const search = () => {
        // Search logic here
    };

    return (
        <div className="text-[#3D5A40] bg-[#F9FAF8] p-6 rounded-xl shadow-sm w-full max-w-2xl">
            <div className="flex flex-col items-start mb-6">
                <div className="font-bold text-3xl">Set Details</div>
                <div className="text-[#6D7278] text-base mt-1">
                    Give your product some details.
                </div>
            </div>

            <div className="flex flex-col gap-y-4">
                {/* Title Input */}
                <div className="w-full">
                    <label className="font-semibold text-[#3D5A40] mb-1 block">Title</label>
                    <input
                        type="text"
                        placeholder="Product title"
                        className="w-full border border-[#D1D5DB] bg-white text-[#3D5A40] placeholder-gray-400 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all"
                    />
                </div>

                {/* Description Input */}
                <div className="w-full">
                    <label className="font-semibold text-[#3D5A40] mb-1 block">Description</label>
                    <textarea
                        placeholder="Write a short description..."
                        className="w-full border border-[#D1D5DB] bg-white text-[#3D5A40] placeholder-gray-400 rounded-lg px-5 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all"
                        rows={4}
                    ></textarea>
                </div>

                {/* Brand Name Input */}
                <div className="w-full">
                    <label className="font-semibold text-[#3D5A40] mb-1 block">Brand Name</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                            type="text"
                            placeholder="Product Brand"
                            className="flex-1 border border-[#D1D5DB] bg-white text-[#3D5A40] placeholder-gray-400 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#6DA165] transition-all"
                        // Add debounce + enter key handler here
                        />
                        <button
                            onClick={search}
                            className="w-full sm:w-[120px] bg-[#6DA165] text-white px-5 py-3 rounded-full cursor-pointer font-medium hover:bg-[#5a914e] transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

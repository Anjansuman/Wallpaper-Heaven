import { IconPlus } from "@tabler/icons-react";

export default function AddImage() {
    return (
        <div className="text-[#3D5A40] bg-[#F9FAF8] p-6 rounded-xl shadow-sm w-full max-w-3xl">
            <div className="flex flex-col items-start mb-6">
                <div className="font-bold text-3xl">Select Images</div>
                <div className="text-[#6D7278] text-base mt-1">
                    Choose images that suit your product well.
                </div>
            </div>

            <div className="flex flex-wrap gap-6 items-end">
                
                {/* image slots */}
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-48 w-48 border-2 border-dashed border-[#6DA165] bg-white rounded-lg flex justify-center items-center hover:bg-[#eef4ec] transition-all cursor-pointer"
                    >
                        <IconPlus size={28} className="text-[#6DA165]" />
                    </div>
                ))}

                <div className="text-sm text-[#6D7278] max-w-xs">
                    Select at least <span className="font-semibold text-[#3D5A40]">two images</span> for product clarity.
                </div>
            </div>
        </div>
    );
}


/*

use something like,
[
    "Design": ["Pichwai", "3d", "Flora"...],
    "Genre": ["Kids", "Romantic"...],
    ...
]

*/

export default function Filter() {
    const options = ["flora", "3D", "Pichwai"];

    return (
        <div className="w-full max-w-[25%] hidden lg:flex flex-col pt-7 p-4 ">
            <div className="text-2xl font-medium mb-4">Filter</div>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer ">
                        <input
                            type="checkbox"
                            value={option}
                            className="peer hidden"
                            id={`checkbox-${index}`}
                        />
                        <div className="w-4 h-4 border-2 border-[#0B2814] peer-checked:bg-[#0B2814] rounded-xs "></div>
                        <span className="capitalize">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}


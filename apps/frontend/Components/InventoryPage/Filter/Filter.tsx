
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
        <div className="w-full lg:w-[220px] lg:min-w-[180px] lg:max-w-[240px] hidden lg:flex flex-col pt-7 p-4">
            <div className="text-2xl font-medium mb-4">Filter</div>
            <div className="w-fit space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="w-fit flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            value={option}
                            className="w-fit peer hidden"
                            id={`checkbox-${index}`}
                        />
                        <div className="w-4 h-4 border-2 border-[#0B2814] peer-checked:bg-[#0B2814] rounded-xs"></div>
                        <span className="capitalize w-fit">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

import BrandName from "../ui/Customs/BrandName";


export default function NavBar() {
    return <div className="flex justify-between items-center">
        <BrandName size={"sm"} />
        <div className="flex justify-center items-center gap-x-4 text-[#0B2814] font-semibold ">
            {["Designs", "Genre", "Brands", "Designers"].map((e, key) => (
                <div className="hover:underline cursor-pointer " key={key} >
                    {e}
                </div>
            ))}
            <div className="h-7 w-7 border-2 rounded-full ">

            </div>
        </div>
    </div>
}
import BrandName from "../ui/Customs/BrandName"


export const NavBar2 = () => {
    return <div className="w-screen fixed flex justify-between items-center px-5 ">
        <BrandName size={"sm"} />
        <div className="flex justify-center items-center gap-x-3 ">
            <div className="flex justify-center items-center gap-x-6 text-[#0B2814] font-semibold ">
                {["Designs", "Genre", "Brands", "Designers"].map((e, key) => (
                    <div className="hover:underline cursor-pointer " key={key} >
                        {e}
                    </div>
                ))}
                <div className="h-7 w-7 border-2 rounded-full ">

                </div>
            </div>
        </div>
    </div>
}
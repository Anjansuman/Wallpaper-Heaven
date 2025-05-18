import BrandName from "../ui/Customs/BrandName";


export default function Footer() {
    return <div className="w-[90%] rounded-2xl p-4 bg-[#51794b] ">
        <div className="">
            <BrandName size={"lg"} />
            <div className="w-full flex items-center">YOU SAY AND WE MAKE</div>
        </div>
        <div className="h-80 w-full rounded-2xl bg-white/50 backdrop-blur-2xl border-2 border-[#6DA165] ">

        </div>  
    </div>
}
import ChooseProduct from "@/Components/admin/add-product/ChooseProduct";


export default function addProduct() {
    return <div className="h-screen flex items-center justify-between pt-30 ">
        <div className="h-full w-[20%] hidden md:flex bg-red-500 ">
            
        </div>
        <div className="h-full w-[80%]  ">
            <ChooseProduct />
        </div>
    </div>
}
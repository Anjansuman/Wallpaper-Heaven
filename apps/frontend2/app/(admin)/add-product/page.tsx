import AddImage from "@/Components/admin/add-product/AddImage";
import ChooseProduct from "@/Components/admin/add-product/ChooseProduct";
import SetDetails from "@/Components/admin/add-product/SetDetails";
import SetTags from "@/Components/admin/add-product/SetTags";


export default function addProduct() {
    return <div className="flex items-center justify-between pt-30 ">
        <div className="h-full w-[20%] hidden md:flex bg-red-500 ">
            
        </div>
        <div className="h-full w-[80%] flex flex-col gap-y-10 px-6 ">
            <ChooseProduct />
            <AddImage />
            <SetDetails />
            <SetTags />
        </div>
    </div>
}
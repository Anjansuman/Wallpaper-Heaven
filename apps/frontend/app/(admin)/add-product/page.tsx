"use client"
import AddImage from "@/Components/admin/add-product/AddImage";
import ButtonArea from "@/Components/admin/add-product/ButtonArea";
import ChooseProduct from "@/Components/admin/add-product/ChooseProduct";
import SetDetails from "@/Components/admin/add-product/SetDetails";
import SetTags from "@/Components/admin/add-product/SetTags";
import UserPageNavbar from "@/Components/Nav-Bar/UserPageNavbar";
import Button from "@/components/ui/Button";


export default function addProduct() {


    const handleClick = () => {
        console.log("handle click");
    }

    return <div className="w-full h-full">
        <UserPageNavbar/>
        <div className="flex items-center justify-between pt-30 ">
            <div className="h-full w-[20%] hidden md:flex ">

            </div>
            <div className="h-full w-[80%] flex flex-col gap-y-10 px-6 mb-20">
                <ChooseProduct />
                <AddImage />
                <SetDetails />
                <SetTags />
                <div className="max-w-2xl flex justify-center items-center">
                    <ButtonArea/>
                </div>
            </div>
        </div>
    </div>

}
import Filter from "@/Components/InventoryPage/Filter/Filter";
import PhoneFilterTab from "@/Components/InventoryPage/Filter/PhoneFilterTab";
import ObjectInventory from "@/Components/InventoryPage/ObjectInventory/ObjectInventory";
import Top from "@/Components/InventoryPage/Top/Top";
import UserPageNavbar from "@/Components/Nav-Bar/UserPageNavbar";


export default function Page() {

    // backend call for content of the page

    return <div className="h-full w-full">
        <UserPageNavbar/>
        <div className="h-full w-full flex flex-col gap-y-5 md:px-16 lg:px-20 sm:px-10 px-5 mb-20">
            <Top />
            <PhoneFilterTab />
            <div className="flex justify-between lg:pt-10" >
                <Filter />
                <ObjectInventory />
            </div>
        </div>
    </div>
}
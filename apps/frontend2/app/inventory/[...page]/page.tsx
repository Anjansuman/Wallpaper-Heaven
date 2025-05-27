import Filter from "@/Components/InventoryPage/Filter/Filter";
import ObjectInventory from "@/Components/InventoryPage/ObjectInventory/ObjectInventory";
import Top from "@/Components/InventoryPage/Top/Top";


export default function Page() {

    // backend call for content of the page

    return <div className="h-full w-full ">
        <Top />
        <div className="flex justify-between pt-10 " >
            <Filter />
            <ObjectInventory />
        </div>
    </div>
}
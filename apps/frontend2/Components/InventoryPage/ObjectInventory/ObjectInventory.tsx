import Object from "./Object";


export default function ObjectInventory() {
    return <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
        {["Image", "video", "phone"].map((e, index) => (
            <Object key={index} />
        ))}
    </div>
}
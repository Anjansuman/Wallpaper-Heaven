import Object from "./Object";


export default function ObjectInventory() {

    // get the data from the backend with all the objects with details and tags for filter

    return <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 ">
        {["Image", "video", "phone", "Image", "video", "phone", "Image", "video", "phone", "Image", "video", "phone", "Image", "video", "phone"].map((e, index) => (
            <Object title={e} key={index} />
        ))}
    </div>
}
import Button from "@/components/ui/Button";

export default function ButtonArea() {

    const handleClick = () => {
        console.log("handle click")
    }

    return <div className="">
        <Button text="Submit" onClick={handleClick} />
    </div>
}
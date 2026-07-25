import ProductObject from "./Object";

interface Product {
    id: number;
    name: string;
    images: string[];
}

interface ObjectInventoryProps {
    products: Product[];
}

export default function ObjectInventory({ products }: ObjectInventoryProps) {
    if (products.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400 py-20">
                No products found.
            </div>
        );
    }

    return (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 sm:gap-y-8">
            {products.map((product) => (
                <ProductObject
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    imageUrl={product.images[0] ?? ""}
                />
            ))}
        </div>
    );
}

import { create } from 'zustand';

interface Product {
    productType: string;
    Images: string[];
    title: string;
    description: string;
    brandName: string;
    tags: string[];
}

interface AddProductStore {
    product: Product | null;
    updateProduct: (product: Partial<Product>) => void;
}

export const useAddProductStore = create<AddProductStore>((set) => ({
    product: null,
    updateProduct: (newProduct) =>
        set((state) => ({
            product: state.product
                ? { ...state.product, ...newProduct }
                : (newProduct as Product),
        })),
}));

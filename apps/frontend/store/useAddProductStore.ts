import { create } from 'zustand';

interface Product {
    productTypeId: number | null;
    productTypeName: string;
    images: string[];
    title: string;
    description: string;
    brandId: number | null;
    brandName: string;
    tagIds: number[];
    tagNames: string[];
    creatorId: number | null;
}

interface AddProductStore {
    product: Product;
    updateProduct: (update: Partial<Product>) => void;
    resetProduct: () => void;
}

const defaultProduct: Product = {
    productTypeId: null,
    productTypeName: '',
    images: [],
    title: '',
    description: '',
    brandId: null,
    brandName: '',
    tagIds: [],
    tagNames: [],
    creatorId: null,
};

export const useAddProductStore = create<AddProductStore>((set) => ({
    product: defaultProduct,
    updateProduct: (update) =>
        set((state) => ({ product: { ...state.product, ...update } })),
    resetProduct: () => set({ product: defaultProduct }),
}));

import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function getProductDataController(req: Request, res: Response) {
    try {

        const productId = parseInt(req.query.productId as string);

        if (!productId || isNaN(productId)) {
            res.status(400).json({
                message: "Missing or invalid product id",
            });
            return;
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: {
                id: true,
                name: true,
                description: true,
                images: true,
                addedAt: true,
                creator: true,
                brand: true,
                tags: true,
                ProductType: true,
            }
        });

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        const similarProducts = await prisma.product.findMany({
            where: {
                productTypeId: product.ProductType.id,
                id: { not: productId },
            },
            take: 10,
            select: {
                id: true,
                name: true,
                images: true,
            },
        });

        res.status(200).json({
            message: "Product details fetched successfully",
            product,
            similarProducts,
        });
        return;

    } catch (error) {
        console.error("Error while fetching product data: ", error);
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
}

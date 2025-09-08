import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function getProductDataController(req: Request, res: Response) {
    try {

        const { productId } = req.body;

        if (!productId || typeof productId !== 'number') {
            res.status(400).json({
                message: "Missing product id",
            });
            return;
        }

        const data = await prisma.$transaction(async (tx) => {
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    images: true,
                    addedAt: true,
                    creator: true,
                    tags: true,
                    ProductType: true,
                }
            });

            const similarProducts = await prisma.product.findMany({
                where: {
                    ProductType: product?.ProductType
                },
                skip: product?.id,
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            });

            return {
                product,
                similarProducts,
            };
        });

        res.status(200).json({
            message: "Product details fetched successfully",
            product: data.product,
            similarProducts: data.similarProducts,
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
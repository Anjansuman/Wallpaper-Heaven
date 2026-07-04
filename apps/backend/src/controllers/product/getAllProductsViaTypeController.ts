import { prisma } from "@repo/db";
import { Request, Response } from "express";



export default async function getAllProductsViaTypeController(req: Request, res: Response) {
    try {

        const productTypeId = parseInt(req.query.productTypeId as string);

        if (!productTypeId || isNaN(productTypeId)) {
            res.status(400).json({
                message: "productTypeId not provided or invalid",
            });
            return;
        }

        const products = await prisma.product.findMany({
            where: {
                productTypeId,
            },
            take: 15,
            orderBy: { addedAt: "desc" },
            select: {
                id: true,
                name: true,
                images: true,
                tags: true,
                brand: true,
                creator: true,
                ProductType: true,
            },
        });

        res.status(200).json({
            message: "Fetched data",
            products,
        });
        return;

    } catch (error) {
        console.error("Error while getting products: ", error);
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
}

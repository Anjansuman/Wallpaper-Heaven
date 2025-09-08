import { prisma } from "@repo/db";
import { Request, Response } from "express";



export default async function getAllProductsViaTypeController(req: Request, res: Response) {
    try {

        const { productType } = req.body;

        if (!productType) {
            res.status(400).json({
                message: "product type not provided",
            });
            return;
        }

        const products = await prisma.product.findMany({
            where: {
                ProductType: productType
            },
            take: 15,
        });

        res.status(200).json({
            message: "Fetched data",
            products: products,
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
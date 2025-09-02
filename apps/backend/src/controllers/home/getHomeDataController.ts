import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function getHomeDataConroller(req: Request, res: Response) {
    try {

        const productTypes = await prisma.productType.findMany();

        const data = await Promise.all(
            productTypes.map(async (type) => {
                const products = await prisma.product.findMany({
                    where: {
                        productTypeId: type.id
                    },
                    take: 10,
                    orderBy: { addedAt: 'desc' },
                    select: {
                        id: true,
                        brand: true,
                        name: true,
                        tags: true,
                        images: true,
                        ProductType: true,
                        creator: true,
                    },
                });
                return {
                    productType: type,
                    products
                };
            })
        )

        res.status(200).json({
            message: "Home data fetched successfully",
            data,
        });
        return;

    } catch (error) {
        console.error("Error while fetching home data: ", error);
        res.status(500).json({
            message: 'Internal server error',
        });
        return;
    }
}
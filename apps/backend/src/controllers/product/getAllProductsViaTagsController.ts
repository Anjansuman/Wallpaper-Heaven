import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function getAllProductsViaTagsController(req: Request, res: Response) {
    try {
        const { tags } = req.body;

        if (!tags) {
            res.status(400).json({
                message: "No tags provided",
            });
            return;
        }

        const tagsArray = Array.isArray(tags) ? tags : [tags];

        const data = await Promise.all(
            tagsArray.map(async (tag) => {
                const products = await prisma.product.findMany({
                    where: {
                        tags: {
                            some: {
                                name: tag,
                            },
                        },
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        images: true,
                    }
                })
                return {
                    tag: tag,
                    products: products,
                };
            })
        )

        res.status(200).json({
            message: "Products fetched successfully",
            data,
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
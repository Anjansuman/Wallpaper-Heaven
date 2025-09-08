import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function upsertProductTypeController(req: Request, res: Response) {
    try {

        console.log("backend route hit");

        const { id, name } = req.body;

        if (!name && typeof name !== "string") {
            res.status(400).json({
                success: false,
                message: "Invalid name",
            });
            return;
        }

        const data = await prisma.$transaction(async (t) => {

            let existingProductType;

            if (id) {
                existingProductType = await t.productType.findUnique({
                    where: {
                        id: id,
                    },
                });
            }

            if (existingProductType) {
                const updatedProductType = await t.productType.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                });
                return updatedProductType;
            } else {
                const newProductType = await t.productType.create({
                    data: {
                        name: name,
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                });
                return newProductType;
            }
        });

        res.status(200).json({
            success: true,
            message: "new product type added",
            prodductType: data,
        });
        return;

    } catch (error) {
        console.error("Error while upserting product type: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}
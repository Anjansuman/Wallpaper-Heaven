import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function deleteProductTypeController(req: Request, res: Response) {
    try {

        const { id, newName } = req.body;

        if(!id || !newName) {
            res.status(400).json({
                success: false,
                message: "Invalid data",
            });
            return;
        }

        const existingProductType = await prisma.productType.findUnique({
            where: {
                id: id,
            },
        });

        if(!existingProductType) {
            res.status(404).json({
                success: false,
                message: "Product type not found",
            });
            return;
        }

        const updatedExistingProductType = await prisma.productType.update({
            where: {
                id: id,
            },
            data: {
                name: newName,
            },
            select: {
                id: true,
                name: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "product updated successfully",
            productType: updatedExistingProductType,
        });
        return;
        
    } catch (error) {
        console.error("Error while deleting product type: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}
import { Request, Response } from "express";
import { prisma } from "@repo/db";

export default async function removeProductController(req: Request, res: Response) {
    try {
        const { productId } = req.body;

        if (!productId) {
            res.status(400).json({
                message: "Product ID is required"
            });
            return;
        }

        await prisma.$transaction(async (tx) => {

            const existingProduct = await tx.product.findUnique({
                where: { id: Number(productId) },
            });

            if (!existingProduct) {
                throw new Error("Product not found");
            }

            await tx.product.delete({
                where: { id: Number(productId) },
            });

        });

        res.status(200).json({
            message: "Product deleted successfully",
        });
        return;

    } catch (error: any) {
        console.error("Error while removing product:", error);
        res.status(400).json({
            message: error.message || "Internal server error",
        });
        return;
    }
}

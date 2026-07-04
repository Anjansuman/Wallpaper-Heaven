import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getProductTypesController(req: Request, res: Response) {
    try {
        const productTypes = await prisma.productType.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true },
        });

        res.status(200).json({ success: true, productTypes });
        return;
    } catch (error) {
        console.error("Error while fetching product types: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function deleteProductTypeController(req: Request, res: Response) {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "id is required" });
            return;
        }

        await prisma.productType.delete({ where: { id: Number(id) } });

        res.status(200).json({ success: true, message: "Product type deleted successfully" });
        return;
    } catch (error) {
        console.error("Error while deleting product type: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

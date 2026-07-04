import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function updateProductBasicsController(req: Request, res: Response) {
    const { id, name, images } = req.body;
    const adminId = req.adminId;

    if (!adminId) { res.status(401).json({ message: "Unauthorized" }); return; }
    if (!id || !name?.trim() || !Array.isArray(images) || images.length === 0) {
        res.status(400).json({ message: "id, name, and at least one image are required" });
        return;
    }

    try {
        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: { name: name.trim(), images },
            select: { id: true, name: true, images: true },
        });
        res.status(200).json({ success: true, product: updated });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Internal server error";
        console.error("Error updating product basics:", error);
        res.status(400).json({ message: msg });
    }
}

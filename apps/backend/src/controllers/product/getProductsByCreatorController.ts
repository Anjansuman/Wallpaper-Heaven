import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getProductsByCreatorController(req: Request, res: Response) {
    try {
        const creatorId = parseInt(req.query.creatorId as string);
        if (!creatorId || isNaN(creatorId)) {
            res.status(400).json({ message: "creatorId is required" });
            return;
        }

        const [creator, products] = await Promise.all([
            prisma.creator.findUnique({
                where: { id: creatorId },
                select: { id: true, name: true, about: true, description: true, image: true },
            }),
            prisma.product.findMany({
                where: { creatorId },
                orderBy: { addedAt: "desc" },
                select: {
                    id: true, name: true, images: true,
                    tags: { select: { id: true, name: true } },
                    ProductType: { select: { id: true, name: true } },
                    brand: { select: { id: true, name: true } },
                },
            }),
        ]);

        if (!creator) { res.status(404).json({ message: "Designer not found" }); return; }

        res.status(200).json({ success: true, creator, products });
    } catch (error) {
        console.error("Error fetching products by creator:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

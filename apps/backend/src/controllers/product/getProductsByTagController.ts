import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getProductsByTagController(req: Request, res: Response) {
    try {
        const tagId = parseInt(req.query.tagId as string);
        if (!tagId || isNaN(tagId)) {
            res.status(400).json({ message: "tagId is required" });
            return;
        }

        const [tag, products] = await Promise.all([
            prisma.tag.findUnique({
                where: { id: tagId },
                select: { id: true, name: true, image: true },
            }),
            prisma.product.findMany({
                where: { tags: { some: { id: tagId } } },
                orderBy: { addedAt: "desc" },
                select: {
                    id: true, name: true, images: true,
                    tags: { select: { id: true, name: true } },
                    ProductType: { select: { id: true, name: true } },
                    brand: { select: { id: true, name: true } },
                },
            }),
        ]);

        if (!tag) { res.status(404).json({ message: "Genre not found" }); return; }

        res.status(200).json({ success: true, tag, products });
    } catch (error) {
        console.error("Error fetching products by tag:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

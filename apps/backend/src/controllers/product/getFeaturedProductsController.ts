import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getFeaturedProductsController(req: Request, res: Response) {
    try {
        const { tag, limit = "20" } = req.query;

        const products = await prisma.product.findMany({
            where: tag
                ? { tags: { some: { name: tag as string } } }
                : undefined,
            take: parseInt(limit as string),
            orderBy: { addedAt: "desc" },
            select: {
                id: true,
                name: true,
                images: true,
                tags: { select: { id: true, name: true } },
            },
        });

        res.status(200).json({ success: true, products });
        return;
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

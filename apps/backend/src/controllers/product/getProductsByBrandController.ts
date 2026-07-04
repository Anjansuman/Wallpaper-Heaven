import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getProductsByBrandController(req: Request, res: Response) {
    try {
        const brandId = parseInt(req.query.brandId as string);
        if (!brandId || isNaN(brandId)) {
            res.status(400).json({ message: "brandId is required" });
            return;
        }

        const [brand, products] = await Promise.all([
            prisma.brand.findUnique({
                where: { id: brandId },
                select: { id: true, name: true, about: true, description: true, image: true, rank: true },
            }),
            prisma.product.findMany({
                where: { brandId },
                orderBy: { addedAt: "desc" },
                select: {
                    id: true, name: true, images: true,
                    tags: { select: { id: true, name: true } },
                    ProductType: { select: { id: true, name: true } },
                },
            }),
        ]);

        if (!brand) { res.status(404).json({ message: "Brand not found" }); return; }

        res.status(200).json({ success: true, brand, products });
    } catch (error) {
        console.error("Error fetching products by brand:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

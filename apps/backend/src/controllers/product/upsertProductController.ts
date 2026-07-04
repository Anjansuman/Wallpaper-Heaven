import { Request, Response } from "express";
import { prisma } from "@repo/db";

export default async function upsertProductController(req: Request, res: Response) {
    const { id, images, name, description, brandId, creatorId, tagsId, productTypeId } = req.body;
    const addedById = req.adminId;

    try {
        if (!addedById) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!productTypeId || !images || !name || !description || !tagsId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const imageArray = Array.isArray(images) ? images : [images];
        const tagIds = Array.isArray(tagsId) ? tagsId.map(Number) : [Number(tagsId)];
        const productTypeIdNum = Number(productTypeId);
        const brandIdNum = brandId ? Number(brandId) : undefined;
        const creatorIdNum = creatorId ? Number(creatorId) : undefined;

        const result = await prisma.$transaction(async (tx) => {

            const productType = await tx.productType.findUnique({ where: { id: productTypeIdNum } });
            if (!productType) throw new Error("Product type not found");

            if (brandIdNum) {
                const brand = await tx.brand.findUnique({ where: { id: brandIdNum } });
                if (!brand) throw new Error("Brand not found");
            }

            if (creatorIdNum) {
                const creator = await tx.creator.findUnique({ where: { id: creatorIdNum } });
                if (!creator) throw new Error("Creator not found");
            }

            const existingTags = await tx.tag.findMany({ where: { id: { in: tagIds } } });
            if (existingTags.length !== tagIds.length) throw new Error("One or more tags not found");

            if (id) {
                // Update existing product
                const updated = await tx.product.update({
                    where: { id: Number(id) },
                    data: {
                        name,
                        description,
                        images: imageArray,
                        addedAt: new Date(),
                        brandId: brandIdNum,
                        creatorId: creatorIdNum,
                        tags: { set: tagIds.map((tid) => ({ id: tid })) },
                    },
                    include: { tags: true, brand: true, creator: true, ProductType: true },
                });
                return updated;
            } else {
                // Create new product
                const created = await tx.product.create({
                    data: {
                        name,
                        description,
                        images: imageArray,
                        addedAt: new Date(),
                        addedById,
                        brandId: brandIdNum,
                        creatorId: creatorIdNum,
                        productTypeId: productTypeIdNum,
                        tags: { connect: tagIds.map((tid) => ({ id: tid })) },
                    },
                    include: { tags: true, brand: true, creator: true, ProductType: true },
                });
                return created;
            }
        });

        res.status(200).json({
            message: "Product upserted successfully",
            product: result,
        });
        return;
    } catch (error: any) {
        console.error("Error while upserting product:", error);
        res.status(400).json({
            message: error.message || "Internal server error",
        });
        return;
    }
}

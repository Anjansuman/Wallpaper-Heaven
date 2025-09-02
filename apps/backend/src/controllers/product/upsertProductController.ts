import { Request, Response } from "express";
import { prisma } from "@repo/db";

export default async function upsertProductController(req: Request, res: Response) {
    const { productTypeId, images, name, description, brandId, creatorId, tagsId } = req.body;
    const addedById = req.adminId;

    try {
        if (!addedById) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }

        if (!productTypeId || !images || !name || !description || !brandId || !creatorId || !tagsId) {
            res.status(400).json({
                message: "Missing required fields"
            });
            return;
        }

        const imageArray = Array.isArray(images) ? images : [images];
        const tagIds = Array.isArray(tagsId) ? tagsId.map(Number) : [Number(tagsId)];

        const productTypeIdNum = Number(productTypeId);
        const brandIdNum = Number(brandId);
        const creatorIdNum = Number(creatorId);

        const result = await prisma.$transaction(async (tx) => {

            const [productType, brand, creator] = await Promise.all([
                tx.productType.findUnique({ where: { id: productTypeIdNum } }),
                tx.brand.findUnique({ where: { id: brandIdNum } }),
                tx.creator.findUnique({ where: { id: creatorIdNum } }),
            ]);

            if (!productType) throw new Error("Product type not found");
            if (!brand) throw new Error("Brand not found");
            if (!creator) throw new Error("Creator not found");

            const existingTags = await tx.tag.findMany({ where: { id: { in: tagIds } } });
            if (existingTags.length !== tagIds.length) throw new Error("One or more tags not found");

            const product = await tx.product.upsert({
                where: { productTypeId: productTypeIdNum },
                update: {
                    name,
                    description,
                    images: imageArray,
                    addedAt: new Date(),
                    addedById,
                    creatorId: creatorIdNum,
                    brandId: brandIdNum,
                    tags: {
                        set: tagIds.map((id) => ({ id })),
                    },
                },
                create: {
                    name,
                    description,
                    images: imageArray,
                    addedAt: new Date(),
                    addedById,
                    creatorId: creatorIdNum,
                    brandId: brandIdNum,
                    productTypeId: productTypeIdNum,
                    tags: {
                        connect: tagIds.map((id) => ({ id })),
                    },
                },
                include: {
                    tags: true,
                    brand: true,
                    creator: true,
                    ProductType: true,
                    addedBy: true,
                },
            });

            return product;
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

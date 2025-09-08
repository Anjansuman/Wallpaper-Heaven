import { Request, Response } from "express";
import { prisma } from "@repo/db";

export default async function upsertProductController(req: Request, res: Response) {
    const { id, images, name, description, brandId, creatorId, tagsId, productTypeId } = req.body;
    const addedById = req.adminId;

    try {
        if (!addedById) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }

        if (!productTypeId || !images || !name || !description || !tagsId) {
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

        const data = await prisma.$transaction(async (tx) => {
            let existingBrandId;
            let existingCreatorId;
            const productTypeId = await tx.productType.findUnique({
                where: {
                    id: productTypeIdNum
                }
            });

            if (!productTypeId) {
                res.status(404).json({
                    success: false,
                    message: "Product type not found",
                });
                return;
            }

            if (brandIdNum) {
                existingBrandId = await tx.brand.findUnique({
                    where: {
                        id: brandIdNum,
                    },
                    select: {
                        id: true,
                    },
                });
            }

            if (creatorIdNum) {
                existingCreatorId = await tx.creator.findUnique({
                    where: {
                        id: creatorIdNum,
                    },
                    select: {
                        id: true,
                    },
                });
            }

            let existingProduct;

            if (id) {
                existingProduct = await tx.product.findUnique({
                    where: {
                        id: id
                    }
                });
            }

            if(existingProduct) {
                const updatedProduct = await tx.product.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        images: images,
                        description: description,
                        addedAt: new Date(),
                        
                    }
                })
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

import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function upsertBrandController(req: Request, res: Response) {
    try {

        const { id, name, about, description, image } = req.body;

        if (!name || !about) {
            res.status(400).json({
                success: false,
                message: "Invalid data",
            });
            return;
        }

        const data = await prisma.$transaction(async (t) => {

            let existingBrand;

            if (id) {
                existingBrand = await t.brand.findUnique({
                    where: {
                        id: id,
                    },
                });
            }

            if (existingBrand) {
                const updatedBrand = await t.brand.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        about: about,
                        description: description,
                        image: image,
                    },
                    select: {
                        id: true,
                        name: true,
                        about: true,
                        description: true,
                        image: true,
                    },
                });
                return updatedBrand;
            } else {
                const newBrand = await t.brand.create({
                    data: {
                        name: name,
                        about: about,
                        description: description,
                        image: image,
                    },
                    select: {
                        id: true,
                        name: true,
                        about: true,
                        description: true,
                        image: true,
                    },
                });
                return newBrand;
            }
        });


        res.status(200).json({
            success: true,
            message: "brand updated successfully",
            brand: data,
        });
        return;

    } catch (error) {
        console.error("Error while upserting brand: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}
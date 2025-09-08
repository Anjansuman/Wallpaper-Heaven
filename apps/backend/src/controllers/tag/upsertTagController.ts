import { prisma } from "@repo/db";
import { Request, Response } from "express";


export default async function upsertTagController(req: Request, res: Response) {
    try {

        const { id, name } = req.body;

        if (!name) {
            res.status(400).json({
                success: false,
                message: "Invalid data",
            });
            return;
        }

        const data = await prisma.$transaction(async (t) => {

            let existingTag;

            if (id) {
                existingTag = await t.tag.findUnique({
                    where: {
                        id: id,
                    },
                });
            }

            if (existingTag) {
                const updatedTag = await t.tag.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                });
                return updatedTag;
            } else {
                const newTag = await t.tag.create({
                    data: {
                        name: name,
                    },
                    select: {
                        id: true,
                        name: true,
                    }
                });
                return newTag;
            }
        });

        res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            tag: data,
        });
        return;

    } catch (error) {
        console.error("Error while upserting tag: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
}
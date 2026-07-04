import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function upsertCreatorController(req: Request, res: Response) {
    try {
        const { id, name, about, description, image } = req.body;

        if (!name || !about) {
            res.status(400).json({ success: false, message: "name and about are required" });
            return;
        }

        let creator;
        if (id) {
            creator = await prisma.creator.update({
                where: { id: Number(id) },
                data: { name, about, description, image },
                select: { id: true, name: true, about: true, description: true, image: true },
            });
        } else {
            creator = await prisma.creator.create({
                data: { name, about, description, image },
                select: { id: true, name: true, about: true, description: true, image: true },
            });
        }

        res.status(200).json({ success: true, message: "Creator upserted successfully", creator });
        return;
    } catch (error) {
        console.error("Error while upserting creator: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

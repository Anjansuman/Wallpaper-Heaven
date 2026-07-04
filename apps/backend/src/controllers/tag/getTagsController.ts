import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getTagsController(_req: Request, res: Response) {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true, image: true },
        });

        res.status(200).json({ success: true, tags });
        return;
    } catch (error) {
        console.error("Error while fetching tags: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getCreatorsController(_req: Request, res: Response) {
    try {
        const creators = await prisma.creator.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true, about: true, image: true },
        });

        res.status(200).json({ success: true, creators });
        return;
    } catch (error) {
        console.error("Error while fetching creators: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

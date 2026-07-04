import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function upsertSiteSectionController(req: Request, res: Response) {
    try {
        const { key, badge, title, subtitle, description, rootImage, images } = req.body;

        if (!key) {
            res.status(400).json({ message: "key is required" });
            return;
        }

        const section = await prisma.siteSection.upsert({
            where: { key },
            update: { badge, title, subtitle, description, rootImage, images: images ?? [] },
            create: { key, badge, title, subtitle, description, rootImage, images: images ?? [] },
        });

        res.status(200).json({ success: true, section });
        return;
    } catch (error) {
        console.error("Error upserting site section:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

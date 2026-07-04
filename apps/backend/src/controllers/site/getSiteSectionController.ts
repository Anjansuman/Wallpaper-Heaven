import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getSiteSectionController(req: Request, res: Response) {
    try {
        const key = req.query.key as string;
        if (!key) {
            res.status(400).json({ message: "key is required" });
            return;
        }

        const section = await prisma.siteSection.findUnique({ where: { key } });

        res.status(200).json({ success: true, section: section ?? null });
        return;
    } catch (error) {
        console.error("Error fetching site section:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

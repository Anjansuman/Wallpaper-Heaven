import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function removeTagController(req: Request, res: Response) {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "Tag id is required" });
            return;
        }

        await prisma.tag.delete({ where: { id: Number(id) } });

        res.status(200).json({ success: true, message: "Tag removed successfully" });
        return;
    } catch (error) {
        console.error("Error while removing tag: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

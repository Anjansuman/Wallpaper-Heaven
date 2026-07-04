import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function removeCreatorController(req: Request, res: Response) {
    try {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "id is required" });
            return;
        }

        await prisma.creator.delete({ where: { id: Number(id) } });

        res.status(200).json({ success: true, message: "Creator removed successfully" });
        return;
    } catch (error) {
        console.error("Error while removing creator: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

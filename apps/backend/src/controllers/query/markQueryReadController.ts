import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function markQueryReadController(req: Request, res: Response) {
    const adminId = req.adminId;
    if (!adminId) { res.status(401).json({ message: "Unauthorized" }); return; }

    const { id, read } = req.body;
    if (!id) { res.status(400).json({ message: "Query id is required." }); return; }

    try {
        const updated = await prisma.userQuery.update({
            where: { id: Number(id) },
            data: { read: read !== false },
        });
        res.status(200).json({ success: true, query: updated });
    } catch (error) {
        console.error("Error marking query read:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

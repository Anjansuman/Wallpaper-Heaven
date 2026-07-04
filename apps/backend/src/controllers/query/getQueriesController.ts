import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getQueriesController(req: Request, res: Response) {
    const adminId = req.adminId;
    if (!adminId) { res.status(401).json({ message: "Unauthorized" }); return; }

    try {
        const queries = await prisma.userQuery.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({ success: true, queries });
    } catch (error) {
        console.error("Error fetching queries:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

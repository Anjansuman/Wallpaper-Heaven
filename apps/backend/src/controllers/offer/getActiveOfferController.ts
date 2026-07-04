import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getActiveOfferController(_req: Request, res: Response) {
    try {
        const offer = await prisma.offer.findFirst({
            where: { validTill: { gte: new Date() } },
            orderBy: { createdAt: "desc" },
            select: {
                badge: true,
                discount: true,
                productName: true,
                productType: true,
                validTill: true,
            },
        });

        res.status(200).json({ success: true, offer });
        return;
    } catch (error) {
        console.error("Error fetching active offer:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

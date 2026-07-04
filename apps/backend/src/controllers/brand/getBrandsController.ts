import { prisma } from "@repo/db";
import { Request, Response } from "express";

export default async function getBrandsController(_req: Request, res: Response) {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: [{ rank: "asc" }, { name: "asc" }],
            select: { id: true, name: true, about: true, image: true, rank: true },
        });

        res.status(200).json({ success: true, brands });
        return;
    } catch (error) {
        console.error("Error while fetching brands: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
}

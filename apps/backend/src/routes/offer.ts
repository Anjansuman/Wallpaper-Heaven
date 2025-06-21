import { prisma } from "@repo/db";
import express, { Router } from "express"

const router: Router = express.Router();

router.post("/add-offer", async (req, res) => {

    console.log("inside offer");

    const { discount, productName, productType, validTill, badge, addedById } = req.body;
    console.log("inside offer2");

    try {
        console.log("inside offer3");

        const existing = await prisma.offer.findFirst({
            where: {
                validTill: {
                    gt: new Date(),
                },
            },
        });


        if (existing) {
            res.status(400).json({ message: "An active offer already exists" });
            return;
        }


        const offer = await prisma.offer.create({
            data: {
                discount,
                productName,
                productType,
                validTill: new Date(validTill),
                badge,
                addedById,
            }
        })
        console.log("inside offer4");


        if (!offer) {
            res.status(402).json({ message: "Offer creation failed" });
            return;
        }

        res.json({ message: "Offer created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.put("/update-offer", async (req, res) => {
    const { id, discount, productName, productType, validTill, badge, addedById } = req.body;

    try {
        const updateOffer = await prisma.offer.update({
            where: { id },
            data: {
                discount,
                productName,
                productType,
                validTill: new Date(validTill),
                badge,
                addedById
            }
        });

        res.json({ message: "Offer updated successfully" });
    } catch (error) {
        console.error("Offer update failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/delete-offer", async (req, res) => {

    const { id } = req.body;

    try {
        const existingOffer = await prisma.offer.findUnique({
            where: {
                id: id
            }
        })

        if (!existingOffer) {
            res.status(402).json({ message: "No such offer exists" });
            return;
        }

        const offerDelete = await prisma.offer.delete({
            where: { id: id }
        })

        if (!offerDelete) {
            res.status(402).json({ message: "offer deletion failed" });
            return;
        }

        res.json({ message: "Offer deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Inteernal server error" });
        return;
    }

})

router.get("/all-offers", async (req, res) => {
    try {
        const allOffers = await prisma.offer.findMany({
            include: {
                addedBy: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.json(allOffers);
    } catch (error) {
        res.status(500).json({ message: "Offers fetch failed" });
        return;
    }
})

router.get("/active-offer", async (req, res) => {
    try {
        const offer = await prisma.offer.findFirst({
            where: {
                validTill: {
                    gt: new Date(),
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(offer);
    } catch (error) {
        console.error("Fetch active offer error:", error);
        res.status(500).json({ message: "Failed to fetch active offer" });
    }
});


export default router;
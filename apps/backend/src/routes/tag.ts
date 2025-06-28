import { Router } from "express";
import express from "express"
import { prisma } from "@repo/db"


const router: Router = express.Router();

// add admin middleware
router.post("/add-tag", async (req, res) => {
    try {

        const name = req.body.name;

        if (!name) {
            res.status(400).json({
                message: "Provide a valid tag name"
            });
            return;
        }

        const existingTag = await prisma.tag.findUnique({
            where: {
                name: name
            }
        });


        if (existingTag) {
            res.status(409).json({
                message: "tag with this name already exists"
            });
            return;
        }

        const newTag = await prisma.tag.create({
            data: {
                name: name
            }
        })

        if (!newTag) {
            res.status(500).json({
                message: "Tag creation failed due to internal server error"
            });
            return;
        }

        res.status(201).json({
            message: "Tag created successfully"
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.delete("/remove-tag", async (req, res) => {
    try {

        const name = req.body.name;

        const existingTag = await prisma.tag.findUnique({
            where: {
                name: name
            }
        });

        if(!existingTag) {
            res.status(402).json({
                message: "Tag doesn't exist"
            });
            return;
        }

        await prisma.tag.delete({
            where: {
                name: name
            }
        });

        res.status(201).json({
            message: "Tag deleted successfully"
        });
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.put("/edit-tag", async (req, res) => {
    try {
   
        const { name } = req.body;

        const existingTag = await prisma.tag.findUnique({
            where: {
                name: name
            }
        });

        if(!existingTag) {
            res.status(402).json({
                message: "Tag doesn't exist"
            });
            return;
        }

        await prisma.tag.update({
            where: {
                id: existingTag.id
            },
            data: {
                name: name
            }
        });

        res.status(200).json({
            message: "Tag edited successfully"
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

export default router;
import { Router } from "express";
import { prisma } from "@repo/db/prisma";
// const prisma = require("@repo/db/prisma");
import express from "express"

const router: express.Router = express.Router();

// add admin middleware
router.post("/add-tag", async (req, res) => {
    try {

        const name = req.body.name;

        if(!name) {
            res.status(400).json({
                message: "Provide a valid tag name"
            });
            return;
        }

        console.log("name found: ", name);

        const existingTag = await prisma.tag.findUnique({
            where: {
                name: name
            }
        });

        if(existingTag) {
            res.status(409).json({
                message: "tag with this name already exists"
            });
            return;
        }

        console.log("No existing tag");

        const newTag = await prisma.tag.create({
            data: {
                name: name
            }
        })

        if(!newTag) {
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
            message: "Internal server error",
            error: error
        });
        return;
    }
});

export default router;